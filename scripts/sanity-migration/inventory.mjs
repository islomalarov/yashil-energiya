// Step 2: content inventory of the extracted snapshot (offline).
//
//   node scripts/sanity-migration/inventory.mjs
//
// Reports counts, translation coverage, RichText node/mark usage, assets and
// slug issues. Writes .data/reports/inventory.json and prints a summary.
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import { URL } from "node:url";
import { DATA_DIR } from "./lib/paths.mjs";
import { HYGRAPH_LOCALES } from "./lib/hygraph.mjs";
import { MODELS } from "./lib/models.mjs";

const extractedDir = path.join(DATA_DIR, "extracted");
const reportsDir = path.join(DATA_DIR, "reports");

async function readJson(name) {
  return JSON.parse(await readFile(path.join(extractedDir, name), "utf8"));
}

function increment(map, key) {
  map[key] = (map[key] ?? 0) + 1;
}

// Walks a Hygraph RichText AST, counting element types and leaf mark flags.
function scanRichText(node, stats) {
  if (!node || typeof node !== "object") return;
  if (Array.isArray(node)) {
    node.forEach((child) => scanRichText(child, stats));
    return;
  }

  if (typeof node.type === "string") {
    increment(stats.nodeTypes, node.type);
  }
  if (typeof node.text === "string") {
    for (const [key, value] of Object.entries(node)) {
      if (key !== "text" && value === true) increment(stats.marks, key);
    }
  }
  if (node.type === "link") {
    const href = String(node.href ?? "");
    increment(
      stats.linkKinds,
      href.startsWith("http") ? new URL(href).hostname : href.slice(0, 1) || "(empty)",
    );
    if (node.openInNewTab !== undefined) increment(stats.marks, "link.openInNewTab");
  }
  scanRichText(node.children, stats);
}

// Collects every asset object reachable in a record (cover, pictures, seo...).
function collectAssets(value, out) {
  if (!value || typeof value !== "object") return;
  if (Array.isArray(value)) {
    value.forEach((item) => collectAssets(item, out));
    return;
  }
  if (typeof value.url === "string" && typeof value.handle === "string") {
    out.push(value);
    return;
  }
  Object.values(value).forEach((child) => collectAssets(child, out));
}

// Collects image nodes embedded inside RichText (not Hygraph Asset entries).
function collectRichTextImages(node, out) {
  if (!node || typeof node !== "object") return;
  if (Array.isArray(node)) {
    node.forEach((child) => collectRichTextImages(child, out));
    return;
  }
  if (node.type === "image" && typeof node.src === "string") out.push(node);
  collectRichTextImages(node.children, out);
}

async function main() {
  const report = {
    generatedAt: new Date().toISOString(),
    models: {},
    richText: { nodeTypes: {}, marks: {}, linkKinds: {} },
    assets: {},
    issues: [],
  };

  const assetsById = new Map();
  const richTextImages = [];

  for (const model of MODELS) {
    const locales = model.localized ? HYGRAPH_LOCALES : ["all"];
    const idsByLocale = {};
    const modelReport = { localized: model.localized, counts: {} };

    for (const locale of locales) {
      const records = await readJson(`${model.key}.${locale}.json`);
      modelReport.counts[locale] = records.length;
      idsByLocale[locale] = new Set(records.map((r) => r.id));

      const slugs = new Map();
      for (const record of records) {
        for (const field of model.richText) {
          scanRichText(record[field]?.raw, report.richText);
          collectRichTextImages(record[field]?.raw, richTextImages);
        }

        const assets = [];
        collectAssets(record, assets);
        for (const asset of assets) {
          const existing = assetsById.get(asset.id);
          if (!existing) assetsById.set(asset.id, { ...asset, locales: [locale] });
          else if (!existing.locales.includes(locale)) existing.locales.push(locale);
        }

        if (record.slug) {
          if (slugs.has(record.slug)) {
            report.issues.push({
              type: "duplicate-slug",
              model: model.key,
              locale,
              slug: record.slug,
              ids: [slugs.get(record.slug), record.id],
            });
          }
          slugs.set(record.slug, record.id);
        }
      }
    }

    if (model.localized) {
      const [a, b] = HYGRAPH_LOCALES;
      modelReport.missingTranslations = {
        [`${a}Only`]: [...idsByLocale[a]].filter((id) => !idsByLocale[b].has(id)),
        [`${b}Only`]: [...idsByLocale[b]].filter((id) => !idsByLocale[a].has(id)),
      };
      modelReport.uniqueEntries = new Set([
        ...idsByLocale[a],
        ...idsByLocale[b],
      ]).size;

      if (model.key === "article" || model.key === "news") {
        const [en, ru] = await Promise.all(
          HYGRAPH_LOCALES.map((l) => readJson(`${model.key}.${l}.json`)),
        );
        const ruById = new Map(ru.map((r) => [r.id, r]));
        modelReport.slugSameAcrossLocales = en.filter(
          (r) => ruById.get(r.id)?.slug === r.slug,
        ).length;
      }
    } else {
      modelReport.uniqueEntries = idsByLocale.all.size;
    }

    report.models[model.key] = modelReport;
  }

  const assets = [...assetsById.values()];
  const hosts = {};
  const mimeTypes = {};
  assets.forEach((a) => {
    increment(hosts, new URL(a.url).hostname);
    increment(mimeTypes, a.mimeType ?? "(unknown)");
  });
  const rtImageHosts = {};
  richTextImages.forEach((img) => increment(rtImageHosts, new URL(img.src).hostname));

  report.assets = {
    uniqueAssetEntries: assets.length,
    totalBytes: assets.reduce((sum, a) => sum + (a.size ?? 0), 0),
    missingAltText: assets.filter((a) => !a.altText).length,
    hosts,
    mimeTypes,
    richTextImages: {
      count: richTextImages.length,
      unique: new Set(richTextImages.map((i) => i.src)).size,
      hosts: rtImageHosts,
    },
  };

  await mkdir(reportsDir, { recursive: true });
  await writeFile(
    path.join(reportsDir, "inventory.json"),
    `${JSON.stringify(report, null, 2)}\n`,
  );

  process.stdout.write(`${JSON.stringify(report, null, 2)}\n`);
}

main().catch((error) => {
  process.stderr.write(`${error.stack ?? error}\n`);
  process.exit(1);
});
