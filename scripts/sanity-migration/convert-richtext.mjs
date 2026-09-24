// Step 3 (prototype): convert every RichText field in the snapshot to
// Portable Text, validate structure and text fidelity, and report.
//
//   node scripts/sanity-migration/convert-richtext.mjs
//
// Output: .data/transformed/richtext/<model>.<locale>.json and
// .data/reports/richtext.json. Exits non-zero on any validation error or
// text loss, so it can gate the real import.
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import { HYGRAPH_LOCALES } from "./lib/hygraph.mjs";
import { MODELS } from "./lib/models.mjs";
import { DATA_DIR } from "./lib/paths.mjs";
import { richTextToPortableText } from "./lib/richtext-to-portable-text.mjs";
import {
  textPreserved,
  validatePortableText,
} from "./lib/validate-portable-text.mjs";

const extractedDir = path.join(DATA_DIR, "extracted");
const outDir = path.join(DATA_DIR, "transformed", "richtext");
const reportsDir = path.join(DATA_DIR, "reports");

async function main() {
  await mkdir(outDir, { recursive: true });
  await mkdir(reportsDir, { recursive: true });

  const report = {
    generatedAt: new Date().toISOString(),
    fields: 0,
    blocks: 0,
    validationErrors: [],
    textMismatches: [],
    issueCounts: {},
    issues: [],
    stats: {},
  };

  for (const model of MODELS.filter((m) => m.richText.length)) {
    for (const locale of HYGRAPH_LOCALES) {
      const file = `${model.key}.${locale}.json`;
      const records = JSON.parse(await readFile(path.join(extractedDir, file), "utf8"));
      const converted = [];

      for (const record of records) {
        for (const field of model.richText) {
          const raw = record[field]?.raw;
          if (!raw) continue;

          const where = { model: model.key, locale, id: record.id, slug: record.slug, field };
          // Seed includes locale: each translation is its own Sanity document.
          const seed = `${model.key}:${record.id}:${locale}:${field}`;
          const { blocks, issues, stats } = richTextToPortableText(raw, { seed });

          report.fields += 1;
          report.blocks += blocks.length;

          for (const error of validatePortableText(blocks, field)) {
            report.validationErrors.push({ ...where, error });
          }
          if (!textPreserved(raw, blocks)) report.textMismatches.push(where);

          for (const issue of issues) {
            report.issueCounts[issue.type] = (report.issueCounts[issue.type] ?? 0) + 1;
            if (issue.type !== "image-missing-alt") report.issues.push({ ...where, ...issue });
          }
          for (const [name, count] of Object.entries(stats)) {
            report.stats[name] = (report.stats[name] ?? 0) + count;
          }

          converted.push({ ...where, blocks });
        }
      }

      await writeFile(path.join(outDir, file), `${JSON.stringify(converted, null, 2)}\n`);
    }
  }

  await writeFile(
    path.join(reportsDir, "richtext.json"),
    `${JSON.stringify(report, null, 2)}\n`,
  );

  const summary = {
    fields: report.fields,
    blocks: report.blocks,
    validationErrors: report.validationErrors.length,
    textMismatches: report.textMismatches.length,
    issueCounts: report.issueCounts,
    stats: report.stats,
  };
  process.stdout.write(`${JSON.stringify(summary, null, 2)}\n`);
  report.issues.forEach((issue) => process.stdout.write(`issue: ${JSON.stringify(issue)}\n`));

  if (report.validationErrors.length || report.textMismatches.length) {
    report.validationErrors.slice(0, 20).forEach((e) =>
      process.stderr.write(`invalid: ${JSON.stringify(e)}\n`),
    );
    report.textMismatches.slice(0, 20).forEach((e) =>
      process.stderr.write(`text mismatch: ${JSON.stringify(e)}\n`),
    );
    process.exit(1);
  }
}

main().catch((error) => {
  process.stderr.write(`${error.stack ?? error}\n`);
  process.exit(1);
});
