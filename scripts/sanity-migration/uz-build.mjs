// Uzbek translation, step 2: check translations and build the `uz` objects.
//
//   node scripts/sanity-migration/uz-build.mjs          # all documents must be translated
//   node scripts/sanity-migration/uz-build.mjs --check  # only translated documents (work in progress)
//
// Reads .data/uz/source.json + .data/uz/translations/*.txt (format: see
// uz-export.mjs). Writes .data/uz/patches.json for the Sanity migration
// studio/migrations/add-uz-translations. Exits non-zero on any error:
// a missing or unknown segment, broken tags, a dropped link, Cyrillic text.
import { readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import { DATA_DIR } from "./lib/paths.mjs";
import { blockToMarkup, markupToChildren } from "./lib/pt-markup.mjs";
import { createKeyFactory } from "./lib/richtext-to-portable-text.mjs";
import { validatePortableText } from "./lib/validate-portable-text.mjs";
import { documentSegments } from "./uz-export.mjs";

const UZ_DIR = path.join(DATA_DIR, "uz");
const CHECK_ONLY = process.argv.includes("--check");
const RICH_TEXT_FIELDS = ["content", "description"];

// Same style as messages/uz.json: ASCII apostrophe in o', g' and the tutuq.
const normalizeApostrophes = (text) =>
  text.replace(/(?<=\p{L})[ʻʼ‘’`´](?=\p{L})/gu, "'");

export async function readTranslations() {
  const dir = path.join(UZ_DIR, "translations");
  const files = (await readdir(dir)).filter((f) => f.endsWith(".txt")).sort();
  const byDoc = new Map();
  for (const file of files) {
    const lines = (await readFile(path.join(dir, file), "utf8")).replace(/\r\n/g, "\n").split("\n");
    let current = null;
    const flush = () => {
      if (!current) return;
      const text = current.lines.join("\n").replace(/\n+$/, "");
      const segments = byDoc.get(current.id) ?? new Map();
      if (segments.has(current.key)) throw new Error(`${file}: duplicate ${current.id} ${current.key}`);
      segments.set(current.key, { text, file });
      byDoc.set(current.id, segments);
    };
    for (const line of lines) {
      const header = line.match(/^@@ (\S+) (\S+)$/);
      if (header) {
        flush();
        current = { id: header[1], key: header[2], lines: [] };
      } else if (current) {
        current.lines.push(line);
      } else if (line.trim()) {
        throw new Error(`${file}: text before the first @@ header`);
      }
    }
    flush();
  }
  return byDoc;
}

function buildDocument(doc, translations, report) {
  const errors = [];
  const key = createKeyFactory(`${doc._id}:uz`);
  const segments = new Map(documentSegments(doc));
  const tr = (segmentKey) => {
    const entry = translations.get(segmentKey);
    if (!entry) return undefined;
    const text = normalizeApostrophes(entry.text);
    if (/\p{Script=Cyrillic}/u.test(text)) errors.push(`${segmentKey}: Cyrillic text`);
    if (!text.trim()) errors.push(`${segmentKey}: empty translation`);
    const source = segments.get(segmentKey);
    // Person names are the same in English and Uzbek (both Latin script).
    const expectedSame = segmentKey === "name";
    if (!expectedSame && source && text === source && /[a-z]{3,}\s+[a-z]{3,}/i.test(source.replace(/https?:\S+/g, ""))) {
      report.unchanged.push(`${doc._id} ${segmentKey}`);
    }
    return text;
  };

  for (const segmentKey of segments.keys()) {
    if (!translations.has(segmentKey)) errors.push(`missing ${segmentKey}`);
  }
  for (const segmentKey of translations.keys()) {
    if (!segments.has(segmentKey)) errors.push(`unknown segment ${segmentKey}`);
  }

  const en = doc.en ?? {};
  const uz = {};

  for (const [field, value] of Object.entries(en)) {
    if (typeof value === "string") {
      uz[field] = segments.has(field) ? tr(field) : value;
    }
  }

  if (en.seo) {
    const { metaTitle, metaDescription, ...rest } = en.seo;
    uz.seo = {
      ...rest,
      ...(metaTitle ? { metaTitle: segments.has("seo.metaTitle") ? tr("seo.metaTitle") : metaTitle } : {}),
      ...(metaDescription
        ? { metaDescription: segments.has("seo.metaDescription") ? tr("seo.metaDescription") : metaDescription }
        : {}),
    };
  }

  for (const field of RICH_TEXT_FIELDS) {
    if (!Array.isArray(en[field])) continue;
    uz[field] = en[field].map((block) => {
      const base = `${field}/${block._key}`;
      if (block._type === "block") {
        const { text, links } = blockToMarkup(block);
        const translated = segments.has(base) ? tr(base) : text;
        try {
          const { children, markDefs, missingLinks } = markupToChildren(translated ?? text, links, key);
          if (missingLinks.length) errors.push(`${base}: dropped link tag(s) ${missingLinks.map((n) => `<a${n}>`).join(", ")}`);
          return {
            _type: "block",
            _key: key(),
            style: block.style,
            ...(block.listItem ? { listItem: block.listItem, level: block.level } : {}),
            markDefs,
            children,
          };
        } catch (error) {
          errors.push(`${base}: ${error.message}`);
          return { ...block, _key: key() };
        }
      }
      if (block._type === "imageBlock") {
        const { alt, ...image } = block;
        const altText = segments.has(`${base}/alt`) ? tr(`${base}/alt`) : alt;
        return { ...image, _key: key(), ...(altText ? { alt: altText } : {}) };
      }
      if (block._type === "dataTable") {
        return {
          _type: "dataTable",
          _key: key(),
          hasHeaderRow: block.hasHeaderRow,
          table: {
            _type: "table",
            rows: block.table.rows.map((row, r) => ({
              _type: "tableRow",
              _key: key(),
              cells: row.cells.map((cell, c) => {
                const cellKey = `${base}/r${r}c${c}`;
                return segments.has(cellKey) ? tr(cellKey) : cell;
              }),
            })),
          },
        };
      }
      errors.push(`${base}: unsupported block type ${block._type}`);
      return block;
    });
    validatePortableText(uz[field], `${doc._id}.uz.${field}`).forEach((e) => errors.push(e));
  }

  // Shared images: add the Uzbek alt next to the existing ones.
  const alts = [];
  const addAlt = (segmentKey, pathToAlt) => {
    if (segments.has(segmentKey)) alts.push({ path: pathToAlt, value: tr(segmentKey) });
  };
  addAlt("alt:cover", ["cover", "alt"]);
  addAlt("alt:photo", ["photo", "alt"]);
  for (const picture of doc.pictures ?? []) {
    addAlt(`alt:pictures/${picture._key}`, ["pictures", { _key: picture._key }, "alt"]);
  }

  const titleField = doc._type === "manager" ? "name" : "title";
  if (!uz[titleField]) errors.push(`uz.${titleField} is empty`);

  return { patch: { id: doc._id, type: doc._type, uz, alts }, errors };
}

async function main() {
  const docs = JSON.parse(await readFile(path.join(UZ_DIR, "source.json"), "utf8"));
  const translations = await readTranslations();
  const known = new Set(docs.map((d) => d._id));
  const report = { unchanged: [] };
  const patches = [];
  const errors = [];

  for (const id of translations.keys()) {
    if (!known.has(id)) errors.push(`${id}: not in source.json`);
  }

  for (const doc of docs) {
    const docTranslations = translations.get(doc._id);
    if (!docTranslations) {
      if (!CHECK_ONLY) errors.push(`${doc._id}: not translated`);
      continue;
    }
    const result = buildDocument(doc, docTranslations, report);
    result.errors.forEach((e) => errors.push(`${doc._id} ${e}`));
    patches.push(result.patch);
  }

  const summary = {
    documents: docs.length,
    translated: patches.length,
    segments: [...translations.values()].reduce((n, m) => n + m.size, 0),
    uzChars: [...translations.values()].reduce((n, m) => n + [...m.values()].reduce((s, e) => s + e.text.length, 0), 0),
    unchangedSuspicious: report.unchanged.length,
    errors: errors.length,
  };
  process.stdout.write(`${JSON.stringify(summary, null, 2)}\n`);
  report.unchanged.forEach((u) => process.stdout.write(`same as English: ${u}\n`));
  if (errors.length) {
    errors.slice(0, 40).forEach((e) => process.stderr.write(`error: ${e}\n`));
    process.exit(1);
  }

  if (!CHECK_ONLY) {
    await writeFile(path.join(UZ_DIR, "patches.json"), `${JSON.stringify(patches, null, 2)}\n`);
    process.stdout.write(`wrote ${patches.length} patches to .data/uz/patches.json\n`);
  }
}

main().catch((error) => {
  process.stderr.write(`${error.stack ?? error}\n`);
  process.exit(1);
});
