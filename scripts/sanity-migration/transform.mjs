// Step 4: build the Sanity dataset (NDJSON) from the Hygraph snapshot.
//
//   node scripts/sanity-migration/transform.mjs
//
// Output: .data/transformed/dataset.ndjson (+ .data/reports/transform.json).
// Offline and deterministic: the same snapshot always yields the same file,
// so `sanity dataset import --replace` can be rerun safely. Exits non-zero
// if any document fails validation — nothing invalid reaches the import.
//
// IDs (see docs/migration-hygraph-to-sanity.md, "ID и роуты"):
//   localized:      <type>-<hygraphId>-<locale>, entryId = hygraphId
//   not localized:  <type>-<hygraphId>
//   translations:   translations-<type>-<hygraphId> (translation.metadata)
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

// Required fields per type; mirrors `validation: rule.required()` in
// studio/schemaTypes. Schema rules run only in Studio, not on import.
const REQUIRED = {
  article: ["language", "entryId", "title", "slug", "publishedAt", "excerpt", "cover", "content"],
  news: ["language", "entryId", "title", "slug", "date", "cover"],
  plant: ["language", "entryId", "title", "address", "power", "date", "production", "coal", "gases", "trees", "coords"],
  vacancy: ["language", "entryId", "title", "description"],
  manager: ["language", "entryId", "name", "jobTitle", "email"],
  evCharge: ["name", "region", "coords", "condition"],
  mhp: ["name", "region", "coords", "condition"],
  plantStatus: ["region", "coords", "plants", "power"],
};

const docId = (type, hygraphId, locale) =>
  locale ? `${type}-${hygraphId}-${locale}` : `${type}-${hygraphId}`;

const stableKey = (...parts) =>
  createHash("sha1").update(parts.join(":")).digest("hex").slice(0, 12);

const isEmpty = (value) =>
  value === undefined ||
  value === null ||
  (typeof value === "string" && value.trim() === "") ||
  (Array.isArray(value) && value.length === 0);

// Drop empty values: Sanity documents should leave unset fields out
// instead of storing null / "" / [].
function compact(object) {
  return Object.fromEntries(Object.entries(object).filter(([, v]) => !isEmpty(v)));
}

const trimmed = (value) => (typeof value === "string" ? value.trim() : value);

function image(asset, key) {
  if (!asset?.url) return undefined;
  return compact({
    _type: "image",
    ...(key ? { _key: key } : {}),
    _sanityAsset: sanityAssetDirective("image", originalAssetUrl(asset.url, asset.handle)),
    alt: trimmed(asset.altText),
  });
}

function file(asset, key) {
  return {
    _type: "file",
    _key: key,
    _sanityAsset: sanityAssetDirective("file", originalAssetUrl(asset.url, asset.handle)),
  };
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
    ogImage: image(value.ogImage),
    noIndex: value.noIndex === true ? true : undefined,
    canonicalUrl: trimmed(value.canonicalUrl),
  });
  // `{ _type }` alone carries nothing — same as leaving SEO unset.
  return Object.keys(result).length > 1 ? result : undefined;
}

function richText(record, field, type, locale, report) {
  const raw = record[field]?.raw;
  if (!raw) return undefined;

  const where = `${docId(type, record.id, locale)}.${field}`;
  const { blocks, issues } = richTextToPortableText(raw, {
    seed: `${type}:${record.id}:${locale}:${field}`,
  });

  validatePortableText(blocks, where).forEach((error) => report.errors.push(error));
  if (!textPreserved(raw, blocks)) report.errors.push(`${where}: text lost in conversion`);
  issues.forEach((issue) => {
    report.issueCounts[issue.type] = (report.issueCounts[issue.type] ?? 0) + 1;
  });
  return blocks;
}

const MAPPERS = {
  article: (r, locale, report) => ({
    title: r.title,
    slug: { _type: "slug", current: r.slug },
    publishedAt: r.createdAt,
    excerpt: trimmed(r.excerpt),
    cover: image(r.cover),
    content: richText(r, "content", "article", locale, report),
    seo: seo(r.seo),
  }),
  news: (r, locale, report) => ({
    title: r.title,
    slug: { _type: "slug", current: r.slug },
    date: r.date,
    excerpt: trimmed(r.excerpt),
    cover: image(r.cover),
    description: richText(r, "description", "news", locale, report),
    seo: seo(r.seo),
  }),
  plant: (r, locale) => ({
    title: r.title,
    address: r.address,
    power: r.power,
    date: r.date,
    production: r.production,
    coal: r.coal,
    gases: r.gases,
    trees: r.trees,
    coords: geopoint(r.coords),
    pictures: r.pictures.map((p) => image(p, stableKey("plant", r.id, locale, p.id))),
  }),
  vacancy: (r, locale, report) => ({
    title: r.title,
    references: trimmed(r.references),
    excerpt: trimmed(r.excerpt),
    description: richText(r, "description", "vacancy", locale, report),
    attachments: r.attachments.map((a) => file(a, stableKey("vacancy", r.id, locale, a.id))),
  }),
  manager: (r) => ({
    name: r.name,
    jobTitle: r.jobTitle,
    email: trimmed(r.email),
    queue: r.queue ?? undefined,
    photo: image(r.photo),
  }),
  evCharge: (r) => ({
    name: r.name,
    region: r.region,
    regionName: trimmed(r.regionName),
    coords: geopoint(r.coords),
    condition: r.condition,
    capacity: r.capacity ?? undefined,
  }),
  plantStatus: (r) => ({
    region: r.region,
    regionName: trimmed(r.regionName),
    coords: geopoint(r.coords),
    plants: r.plants,
    power: r.power,
  }),
};
MAPPERS.mhp = MAPPERS.evCharge;

// translation.metadata in the exact shape @sanity/document-internationalization
// writes, with strong references (the state after publishing in Studio).
function translationMetadata(type, hygraphId, locales) {
  return {
    _id: `translations-${type}-${hygraphId}`,
    _type: "translation.metadata",
    schemaTypes: [type],
    translations: locales.map((language) => ({
      _key: language,
      _type: "internationalizedArrayReferenceValue",
      language,
      value: { _type: "reference", _ref: docId(type, hygraphId, language) },
    })),
  };
}

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

    for (const field of REQUIRED[doc._type] ?? []) {
      if (isEmpty(doc[field])) report.errors.push(`${doc._id}: missing required ${field}`);
    }

    // slug and entryId must be unique per type + language.
    for (const [field, value] of [
      ["slug", doc.slug?.current],
      ["entryId", doc.entryId],
    ]) {
      if (!value) continue;
      const key = `${doc._type}:${doc.language}:${field}:${value}`;
      if (unique.has(key)) report.errors.push(`${doc._id}: ${field} "${value}" also used by ${unique.get(key)}`);
      unique.set(key, doc._id);
    }
  }

  for (const doc of documents.filter((d) => d._type === "translation.metadata")) {
    for (const { value } of doc.translations) {
      if (!ids.has(value._ref)) report.errors.push(`${doc._id}: dangling reference ${value._ref}`);
    }
  }
}

async function readSnapshot(name) {
  return JSON.parse(await readFile(path.join(extractedDir, `${name}.json`), "utf8"));
}

async function main() {
  const report = { generatedAt: new Date().toISOString(), counts: {}, issueCounts: {}, errors: [] };
  const documents = [];

  for (const model of MODELS) {
    const type = model.key;
    const locales = model.localized ? HYGRAPH_LOCALES : [null];
    const localesById = new Map();

    for (const locale of locales) {
      for (const record of await readSnapshot(`${type}.${locale ?? "all"}`)) {
        documents.push(
          compact({
            _id: docId(type, record.id, locale),
            _type: type,
            // Lists are ordered by creation like in Hygraph (createdAt asc);
            // `sanity dataset import` keeps a provided _createdAt.
            _createdAt: record.createdAt,
            ...(locale ? { language: locale, entryId: record.id } : {}),
            ...MAPPERS[type](record, locale, report),
          }),
        );
        report.counts[type] = (report.counts[type] ?? 0) + 1;
        if (locale) localesById.set(record.id, [...(localesById.get(record.id) ?? []), locale]);
      }
    }

    for (const [hygraphId, recordLocales] of localesById) {
      documents.push(translationMetadata(type, hygraphId, recordLocales));
      report.counts["translation.metadata"] = (report.counts["translation.metadata"] ?? 0) + 1;
    }
  }

  validateDocuments(documents, report);

  await mkdir(reportsDir, { recursive: true });
  await writeFile(path.join(reportsDir, "transform.json"), `${JSON.stringify(report, null, 2)}\n`);

  const total = documents.length;
  process.stdout.write(`${JSON.stringify({ total, ...report, errors: report.errors.length }, null, 2)}\n`);

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
