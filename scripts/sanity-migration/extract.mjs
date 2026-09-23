// Step 1: snapshot published Hygraph content to disk (read-only).
//
//   node --env-file=.env.local scripts/sanity-migration/extract.mjs
//
// Output: scripts/sanity-migration/.data/extracted/ (gitignored). Transform
// iterations then run offline against this snapshot.
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import { DATA_DIR } from "./lib/paths.mjs";
import {
  HYGRAPH_LOCALES,
  fetchAll,
  fetchEnumValues,
} from "./lib/hygraph.mjs";
import { ENUMS, MODELS } from "./lib/models.mjs";

const outDir = path.join(DATA_DIR, "extracted");

async function writeJson(name, data) {
  await writeFile(path.join(outDir, name), `${JSON.stringify(data, null, 2)}\n`);
}

async function main() {
  await mkdir(outDir, { recursive: true });

  const manifest = { extractedAt: new Date().toISOString(), counts: {} };

  for (const model of MODELS) {
    const locales = model.localized ? HYGRAPH_LOCALES : [null];

    for (const locale of locales) {
      const records = await fetchAll(model.field, model.selection, { locale });
      const suffix = locale ?? "all";
      await writeJson(`${model.key}.${suffix}.json`, records);
      manifest.counts[`${model.key}.${suffix}`] = records.length;
      process.stdout.write(`${model.key}.${suffix}: ${records.length}\n`);
    }
  }

  const enums = {};
  for (const name of ENUMS) {
    enums[name] = await fetchEnumValues(name);
  }
  await writeJson("enums.json", enums);
  await writeJson("manifest.json", manifest);

  const total = Object.values(manifest.counts).reduce((a, b) => a + b, 0);
  process.stdout.write(`total localized records: ${total}\n`);
}

main().catch((error) => {
  process.stderr.write(`${error.stack ?? error}\n`);
  process.exit(1);
});
