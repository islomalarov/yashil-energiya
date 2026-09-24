// Step 5: verify every asset referenced by the dataset is downloadable and
// non-empty before importing (read-only requests to the Hygraph asset CDN).
//
//   node scripts/sanity-migration/check-assets.mjs
//
// Exits non-zero if any asset is missing, empty or of an unexpected type.
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import { DATA_DIR } from "./lib/paths.mjs";

const CONCURRENCY = 4;
const datasetPath = path.join(DATA_DIR, "transformed", "dataset.ndjson");
const reportsDir = path.join(DATA_DIR, "reports");

function collectDirectives(value, out) {
  if (!value || typeof value !== "object") return;
  if (Array.isArray(value)) return value.forEach((item) => collectDirectives(item, out));
  if (typeof value._sanityAsset === "string") out.add(value._sanityAsset);
  Object.values(value).forEach((child) => collectDirectives(child, out));
}

async function check(directive) {
  const [kind, ...rest] = directive.split("@");
  const url = rest.join("@");
  const response = await globalThis.fetch(url, { method: "HEAD" });
  const type = response.headers.get("content-type") ?? "";
  const length = Number(response.headers.get("content-length") ?? "0");

  const problems = [];
  if (!response.ok) problems.push(`HTTP ${response.status}`);
  if (response.ok && length === 0) problems.push("empty file");
  if (response.ok && kind === "image" && !type.startsWith("image/")) {
    problems.push(`not an image (${type})`);
  }
  return { directive, type, length, problems };
}

async function main() {
  const lines = (await readFile(datasetPath, "utf8")).split("\n").filter(Boolean);
  const directives = new Set();
  lines.forEach((line) => collectDirectives(JSON.parse(line), directives));

  const queue = [...directives];
  const results = [];
  await Promise.all(
    Array.from({ length: CONCURRENCY }, async () => {
      while (queue.length) results.push(await check(queue.shift()));
    }),
  );

  const failed = results.filter((r) => r.problems.length);
  const totalBytes = results.reduce((sum, r) => sum + r.length, 0);
  const summary = {
    checked: results.length,
    failed: failed.length,
    totalMegabytes: Math.round(totalBytes / 1024 / 1024),
  };

  await mkdir(reportsDir, { recursive: true });
  await writeFile(
    path.join(reportsDir, "assets.json"),
    `${JSON.stringify({ ...summary, failed }, null, 2)}\n`,
  );
  process.stdout.write(`${JSON.stringify(summary)}\n`);
  failed.forEach((r) => process.stderr.write(`${r.directive}: ${r.problems.join(", ")}\n`));
  if (failed.length) process.exit(1);
}

main().catch((error) => {
  process.stderr.write(`${error.stack ?? error}\n`);
  process.exit(1);
});
