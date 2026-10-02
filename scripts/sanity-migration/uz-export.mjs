// Uzbek translation, step 1: split the English version of every entry that
// has no `uz` yet into translation segments.
//
//   cd studio && npx sanity documents query --api-version v2025-02-19 \
//     '*[_type in ["news","article","plant","vacancy","manager"] && !defined(uz)] | order(_type asc, _createdAt asc)' \
//     > ../scripts/sanity-migration/.data/uz/source.json
//   node scripts/sanity-migration/uz-export.mjs
//
// Output: .data/uz/segments/NN.txt — batches of segments in the format
//   @@ <document id> <segment key>
//   <English text; formatting/links as tags, see lib/pt-markup.mjs>
// Translations are written in the same format to .data/uz/translations/NN.txt.
// Segments with no letters (numbers, dashes) are not exported: they are
// copied unchanged by uz-build.mjs.
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import { DATA_DIR } from "./lib/paths.mjs";
import { blockToMarkup, markupToChildren } from "./lib/pt-markup.mjs";

const UZ_DIR = path.join(DATA_DIR, "uz");
const BATCH_CHARS = 12000;

const STRING_FIELDS = [
  "title",
  "name",
  "jobTitle",
  "excerpt",
  "references",
  "address",
  "power",
  "production",
  "coal",
  "gases",
];
const RICH_TEXT_FIELDS = ["content", "description"];

export const hasLetters = (text) => /\p{L}/u.test(text ?? "");

/** Every translatable segment of one document: [key, englishText][]. */
export function documentSegments(doc) {
  const en = doc.en ?? {};
  const segments = [];
  const add = (key, text) => {
    if (typeof text === "string" && hasLetters(text)) segments.push([key, text]);
  };

  for (const field of STRING_FIELDS) add(field, en[field]);
  add("seo.metaTitle", en.seo?.metaTitle);
  add("seo.metaDescription", en.seo?.metaDescription);

  for (const field of RICH_TEXT_FIELDS) {
    for (const block of en[field] ?? []) {
      if (block._type === "block") add(`${field}/${block._key}`, blockToMarkup(block).text);
      if (block._type === "imageBlock") add(`${field}/${block._key}/alt`, block.alt);
      if (block._type === "dataTable") {
        block.table.rows.forEach((row, r) =>
          row.cells.forEach((cell, c) => add(`${field}/${block._key}/r${r}c${c}`, cell)),
        );
      }
    }
  }

  // Shared images: only the alt text is per language.
  add("alt:cover", doc.cover?.alt?.en);
  add("alt:photo", doc.photo?.alt?.en);
  for (const picture of doc.pictures ?? []) add(`alt:pictures/${picture._key}`, picture.alt?.en);

  return segments;
}

// The exporter must be lossless: tags -> spans must give back the English
// block exactly, or formatting would silently shift in the translation.
function assertRoundTrip(doc) {
  let n = 0;
  const key = () => `t${n++}`;
  for (const field of RICH_TEXT_FIELDS) {
    for (const block of doc.en?.[field] ?? []) {
      if (block._type !== "block") continue;
      const { text, links } = blockToMarkup(block);
      const { children, markDefs } = markupToChildren(text, links, key);
      const href = new Map(markDefs.map((d) => [d._key, d.href]));
      const norm = (spans, hrefOf) =>
        spans
          .filter((s) => s.text)
          .map((s) => ({ text: s.text, marks: s.marks.map(hrefOf).sort() }));
      const origHref = new Map((block.markDefs ?? []).map((d) => [d._key, d.href]));
      const a = JSON.stringify(mergeRuns(norm(block.children, (m) => origHref.get(m) ?? m)));
      const b = JSON.stringify(mergeRuns(norm(children, (m) => href.get(m) ?? m)));
      if (a !== b) throw new Error(`${doc._id}.${field}/${block._key}: markup round-trip differs`);
    }
  }
}

function mergeRuns(spans) {
  const out = [];
  for (const span of spans) {
    const prev = out.at(-1);
    if (prev && prev.marks.join("|") === span.marks.join("|")) prev.text += span.text;
    else out.push({ ...span });
  }
  return out;
}

async function main() {
  const docs = JSON.parse(await readFile(path.join(UZ_DIR, "source.json"), "utf8"));
  const segmentsDir = path.join(UZ_DIR, "segments");
  await mkdir(segmentsDir, { recursive: true });

  const batches = [];
  let current = [];
  let size = 0;
  let total = 0;

  for (const doc of docs) {
    assertRoundTrip(doc);
    const lines = documentSegments(doc).map(([key, text]) => `@@ ${doc._id} ${key}\n${text}`);
    const docText = lines.join("\n");
    total += lines.length;
    // Keep a document within one batch.
    if (size && size + docText.length > BATCH_CHARS) {
      batches.push(current);
      current = [];
      size = 0;
    }
    current.push(docText);
    size += docText.length;
  }
  if (current.length) batches.push(current);

  for (const [i, batch] of batches.entries()) {
    const name = `${String(i + 1).padStart(2, "0")}.txt`;
    await writeFile(path.join(segmentsDir, name), `${batch.join("\n")}\n`);
  }

  process.stdout.write(
    `${docs.length} documents, ${total} segments, ${batches.length} batches in .data/uz/segments/\n`,
  );
}

if (process.argv[1]?.endsWith("uz-export.mjs")) {
  main().catch((error) => {
    process.stderr.write(`${error.stack ?? error}\n`);
    process.exit(1);
  });
}
