// Step 4: build the Sanity dataset (NDJSON) from the Hygraph snapshot.
//
//   node scripts/sanity-migration/transform.mjs
//
// Output: .data/transformed/dataset.ndjson (+ .data/reports/transform.json).
// Offline and deterministic: the same snapshot always yields the same file,
// so `sanity dataset import --replace` can be rerun safely. Exits non-zero
// if any document fails validation — nothing invalid reaches the import.
//
// Field-level i18n (see studio/schemaTypes/fields.ts): one document per
// entry, shared fields at the root, each language in an object named after
// it (`en`, `ru`, `uz`). IDs: <type>-<hygraphId>; `entryId` = hygraphId.
// No dots in ids: a dotted id is a private "path" id in Sanity.
import { createHash } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import { originalAssetUrl, sanityAssetDirective } from "./lib/assets.mjs";
import { HYGRAPH_LOCALES } from "./lib/hygraph.mjs";
import { MODELS } from "./lib/models.mjs";
import { DATA_DIR } from "./lib/paths.mjs";
import { richTextToPortableText } from "./lib/richtext-to-portable-text.mjs";
import {
  textPreserved,
  validatePortableText,
} from "./lib/validate-portable-text.mjs";

const extractedDir = path.join(DATA_DIR, "extracted");
const outDir = path.join(DATA_DIR, "transformed");
const reportsDir = path.join(DATA_DIR, "reports");

const BASE_LOCALE = "en";

// Required fields; mirrors `validation: rule.required()` in studio/schemaTypes.
// Schema rules run only in Studio, not on import, so they are checked here.
const REQUIRED = {
  article: { root: ["entryId", "slug", "publishedAt", "cover"], locale: ["title", "excerpt", "content"] },
  news: { root: ["entryId", "slug", "date", "cover"], locale: ["title"] },
  plant: { root: ["entryId", "date", "trees", "coords"], locale: ["title", "address", "power", "production", "coal", "gases"] },
  vacancy: { root: ["entryId"], locale: ["title", "description"] },
  manager: { root: ["entryId", "email"], locale: ["name", "jobTitle"] },
  evCharge: { root: ["name", "region", "coords", "condition"] },
  mhp: { root: ["name", "region", "coords", "condition"] },
  plantStatus: { root: ["region", "coords", "plants", "power"] },
};

const docId = (type, hygraphId) => `${type}-${hygraphId}`;

const stableKey = (...parts) =>
  createHash("sha1").update(parts.join(":")).digest("hex").slice(0, 12);

const isEmpty = (value) =>
  value === undefined ||
  value === null ||
  (typeof value === "string" && value.trim() === "") ||
  (Array.isArray(value) && value.length === 0) ||
  (typeof value === "object" && !Array.isArray(value) && Object.keys(value).length === 0);

// Drop empty values: Sanity documents should leave unset fields out
// instead of storing null / "" / [] / {}.
function compact(object) {
  return Object.fromEntries(Object.entries(object).filter(([, v]) => !isEmpty(v)));
}

const trimmed = (value) => (typeof value === "string" ? value.trim() : value);

const assetDirective = (kind, asset) =>
  sanityAssetDirective(kind, originalAssetUrl(asset.url, asset.handle));

/**
 * Context for one entry: its Hygraph record per locale. Shared values are
 * taken from the base (en) record; a differing value in another locale is
 * reported, since only one can be kept.
 */
function entryContext(type, hygraphId, byLocale, report) {
  const base = byLocale[BASE_LOCALE] ?? Object.values(byLocale)[0];
  const where = docId(type, hygraphId);

  const shared = (name, pick = (r) => r[name]) => {
    const value = trimmed(pick(base));
    for (const [locale, record] of Object.entries(byLocale)) {
      if (JSON.stringify(trimmed(pick(record))) !== JSON.stringify(value)) {
        report.issues.push({ type: "shared-value-differs", id: where, field: name, locale });
      }
    }
    return value;
  };

  // One image for all locales, alt text per locale. `pick` returns the asset
  // of a record; all locales must point to the same asset.
  const sharedImage = (pick, key) => {
    const asset = pick(base);
    if (!asset?.url) return undefined;
    const alt = {};
    for (const [locale, record] of Object.entries(byLocale)) {
      const localized = pick(record);
      if (localized?.id !== asset.id) {
        report.errors.push(`${where}: locale ${locale} uses another asset (${localized?.id})`);
      }
      const text = trimmed(localized?.altText);
      if (text) alt[locale] = text;
    }
    return compact({
      _type: "image",
      ...(key ? { _key: key } : {}),
      _sanityAsset: assetDirective("image", asset),
      // Inline (unnamed) object fields carry no _type in Sanity.
      alt: isEmpty(alt) ? undefined : alt,
    });
  };

  return { base, where, shared, sharedImage };
}

function geopoint(coords) {
  if (!Array.isArray(coords) || coords.length < 2) return undefined;
  const [lat, lng] = coords;
  return { _type: "geopoint", lat, lng };
}

function seo(value) {
  if (!value) return undefined;
  const result = compact({
    _type: "seo",
    metaTitle: trimmed(value.metaTitle),
    metaDescription: trimmed(value.metaDescription),
    ogImage: value.ogImage?.url
      ? { _type: "image", _sanityAsset: assetDirective("image", value.ogImage) }
      : undefined,
    noIndex: value.noIndex === true ? true : undefined,
    canonicalUrl: trimmed(value.canonicalUrl),
  });
  // `{ _type }` alone carries nothing — same as leaving SEO unset.
  return Object.keys(result).length > 1 ? result : undefined;
}

function richText(record, field, type, locale, report) {
  const raw = record[field]?.raw;
  if (!raw) return undefined;

  const where = `${docId(type, record.id)}.${locale}.${field}`;
  const { blocks, issues } = richTextToPortableText(raw, {
    seed: `${type}:${record.id}:${locale}:${field}`,
  });

  validatePortableText(blocks, where).forEach((error) => report.errors.push(error));
  if (!textPreserved(raw, blocks)) report.errors.push(`${where}: text lost in conversion`);
  issues.forEach((issue) => {
    report.issueCounts[issue.type] = (report.issueCounts[issue.type] ?? 0) + 1;
    if (issue.type !== "image-missing-alt") report.issues.push({ id: where, ...issue });
  });
  return blocks;
}

// Localized types: `shared` builds root fields, `localized` one language.
const LOCALIZED = {
  article: {
    shared: ({ shared, sharedImage }) => ({
      slug: { _type: "slug", current: shared("slug") },
      publishedAt: shared("createdAt"),
      cover: sharedImage((r) => r.cover),
    }),
    localized: (r, locale, report) => ({
      title: trimmed(r.title),
      excerpt: trimmed(r.excerpt),
      content: richText(r, "content", "article", locale, report),
      seo: seo(r.seo),
    }),
  },
  news: {
    shared: ({ shared, sharedImage }) => ({
      slug: { _type: "slug", current: shared("slug") },
      date: shared("date"),
      cover: sharedImage((r) => r.cover),
    }),
    localized: (r, locale, report) => ({
      title: trimmed(r.title),
      excerpt: trimmed(r.excerpt),
      description: richText(r, "description", "news", locale, report),
      seo: seo(r.seo),
    }),
  },
  plant: {
    shared: ({ base, shared, sharedImage }) => ({
      date: shared("date"),
      trees: shared("trees"),
      coords: geopoint(shared("coords")),
      pictures: base.pictures.map((picture) =>
        sharedImage(
          (r) => r.pictures.find((p) => p.id === picture.id),
          stableKey("plant", base.id, picture.id),
        ),
      ),
    }),
    localized: (r) => ({
      title: trimmed(r.title),
      address: trimmed(r.address),
      power: trimmed(r.power),
      production: trimmed(r.production),
      coal: trimmed(r.coal),
      gases: trimmed(r.gases),
    }),
  },
  vacancy: {
    shared: ({ base }) => ({
      attachments: base.attachments.map((file) => ({
        _type: "file",
        _key: stableKey("vacancy", base.id, file.id),
        _sanityAsset: assetDirective("file", file),
      })),
    }),
    localized: (r, locale, report) => ({
      title: trimmed(r.title),
      references: trimmed(r.references),
      excerpt: trimmed(r.excerpt),
      description: richText(r, "description", "vacancy", locale, report),
    }),
  },
  manager: {
    shared: ({ shared, sharedImage }) => ({
      email: shared("email"),
      queue: shared("queue") ?? undefined,
      photo: sharedImage((r) => r.photo),
    }),
    localized: (r) => ({
      name: trimmed(r.name),
      jobTitle: trimmed(r.jobTitle),
    }),
  },
};

// Language-neutral map data: one Hygraph record, one document.
const operationalAsset = (r) => ({
  name: r.name,
  region: r.region,
  regionName: trimmed(r.regionName),
  coords: geopoint(r.coords),
  condition: r.condition,
  capacity: r.capacity ?? undefined,
});

const NOT_LOCALIZED = {
  evCharge: operationalAsset,
  mhp: operationalAsset,
  plantStatus: (r) => ({
    region: r.region,
    regionName: trimmed(r.regionName),
    coords: geopoint(r.coords),
    plants: r.plants,
    power: r.power,
  }),
};

function hasNull(value) {
  if (value === null) return true;
  if (typeof value !== "object") return false;
  return Object.values(value).some(hasNull);
}

function validateDocuments(documents, report) {
  const ids = new Set();
  const unique = new Map();

  for (const doc of documents) {
    if (ids.has(doc._id)) report.errors.push(`${doc._id}: duplicate _id`);
    ids.add(doc._id);
    if (doc._id.includes(".")) report.errors.push(`${doc._id}: dot in _id`);
    if (hasNull(doc)) report.errors.push(`${doc._id}: contains null`);

    const required = REQUIRED[doc._type] ?? {};
    for (const field of required.root ?? []) {
      if (isEmpty(doc[field])) report.errors.push(`${doc._id}: missing required ${field}`);
    }
    if (required.locale) {
      if (!doc[BASE_LOCALE]) report.errors.push(`${doc._id}: missing base language ${BASE_LOCALE}`);
      for (const locale of HYGRAPH_LOCALES.filter((l) => doc[l])) {
        for (const field of required.locale) {
          if (isEmpty(doc[locale][field])) {
            report.errors.push(`${doc._id}: missing required ${locale}.${field}`);
          }
        }
      }
    }

    // slug and entryId must be unique per type.
    for (const [field, value] of [
      ["slug", doc.slug?.current],
      ["entryId", doc.entryId],
    ]) {
      if (!value) continue;
      const key = `${doc._type}:${field}:${value}`;
      if (unique.has(key)) report.errors.push(`${doc._id}: ${field} "${value}" also used by ${unique.get(key)}`);
      unique.set(key, doc._id);
    }
  }
}

async function readSnapshot(name) {
  return JSON.parse(await readFile(path.join(extractedDir, `${name}.json`), "utf8"));
}

async function main() {
  const report = {
    generatedAt: new Date().toISOString(),
    counts: {},
    languages: {},
    issueCounts: {},
    issues: [],
    errors: [],
  };
  const documents = [];

  for (const model of MODELS) {
    const type = model.key;

    if (!model.localized) {
      for (const record of await readSnapshot(`${type}.all`)) {
        documents.push(
          compact({
            _id: docId(type, record.id),
            _type: type,
            _createdAt: record.createdAt,
            ...NOT_LOCALIZED[type](record),
          }),
        );
      }
      report.counts[type] = documents.filter((d) => d._type === type).length;
      continue;
    }

    // Group the per-locale Hygraph records by entry.
    const entries = new Map();
    for (const locale of HYGRAPH_LOCALES) {
      for (const record of await readSnapshot(`${type}.${locale}`)) {
        entries.set(record.id, { ...entries.get(record.id), [locale]: record });
      }
    }

    const mapper = LOCALIZED[type];
    for (const [hygraphId, byLocale] of entries) {
      const ctx = entryContext(type, hygraphId, byLocale, report);
      const languages = Object.fromEntries(
        Object.entries(byLocale).map(([locale, record]) => [
          locale,
          compact(mapper.localized(record, locale, report)),
        ]),
      );

      documents.push(
        compact({
          _id: docId(type, hygraphId),
          _type: type,
          // Lists are ordered by creation like in Hygraph (createdAt asc);
          // `sanity dataset import` keeps a provided _createdAt.
          _createdAt: ctx.base.createdAt,
          entryId: hygraphId,
          ...compact(mapper.shared(ctx)),
          ...languages,
        }),
      );

      for (const locale of Object.keys(byLocale)) {
        const key = `${type}.${locale}`;
        report.languages[key] = (report.languages[key] ?? 0) + 1;
      }
    }
    report.counts[type] = entries.size;
  }

  validateDocuments(documents, report);

  await mkdir(reportsDir, { recursive: true });
  await writeFile(path.join(reportsDir, "transform.json"), `${JSON.stringify(report, null, 2)}\n`);

  const total = documents.length;
  process.stdout.write(
    `${JSON.stringify({ total, counts: report.counts, languages: report.languages, issueCounts: report.issueCounts, issues: report.issues.length, errors: report.errors.length }, null, 2)}\n`,
  );
  report.issues
    .filter((i) => i.type !== "table-header-inferred" && i.type !== "link-missing-protocol-fixed")
    .forEach((i) => process.stdout.write(`issue: ${JSON.stringify(i)}\n`));

  if (report.errors.length) {
    report.errors.slice(0, 30).forEach((e) => process.stderr.write(`error: ${e}\n`));
    process.exit(1);
  }

  await mkdir(outDir, { recursive: true });
  await writeFile(
    path.join(outDir, "dataset.ndjson"),
    `${documents.map((doc) => JSON.stringify(doc)).join("\n")}\n`,
  );
  process.stdout.write(`wrote ${total} documents to .data/transformed/dataset.ndjson\n`);
}

main().catch((error) => {
  process.stderr.write(`${error.stack ?? error}\n`);
  process.exit(1);
});
