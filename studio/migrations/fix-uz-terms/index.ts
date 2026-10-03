// Applies the Uzbek glossary to every uz text in the CMS: QFES wording,
// "quvvatlash" for EV charging, "energiya to'plash", and one spelling for
// names that editors and the translation import wrote differently.
//
// Walks all string values inside `uz` (titles, excerpts, SEO, text spans,
// image alts, table cells) plus the uz alt of shared images, and replaces
// only the listed fragments. URLs, references and keys are never touched.
// Idempotent: a second run finds nothing to change.
//
//   npx sanity migration run fix-uz-terms --project ljlv76fi --dataset production               # dry run
//   npx sanity migration run fix-uz-terms --project ljlv76fi --dataset production --no-dry-run  # write
import { at, defineMigration, set, type NodePatch, type Path } from "sanity/migrate";

// Longer forms first: the replacements run in this order.
const REPLACEMENTS: [from: string, to: string][] = [
  // Glossary
  ["quyosh elektr stansiya", "quyosh fotoelektr stansiya"],
  ["Quyosh elektr stansiya", "Quyosh fotoelektr stansiya"],
  ["energiya saqlash tizim", "energiya to'plash tizim"],
  ["zaryadla", "quvvatla"],
  ["Zaryadla", "Quvvatla"],
  // One spelling of names, as editors write them
  ["ash-Shimmariyning", "Alshimmarining"],
  ["ash-Shimmariyni", "Alshimmarini"],
  ["ash-Shimmariyga", "Alshimmariga"],
  ["ash-Shimmariy", "Alshimmari"],
  ["Fosten-Arkanj Tuadera", "Faustin-Arxanj Tuadera"],
  ["Gran-Komor", "Grand-Komor"],
  // Board of Directors
  ["Kuzatuv kengashi", "Direktorlar kengashi"],
  // A span right after a link ("Buyuk Britaniya" + "da ham PV …")
  ["da ham PV sohasidagi", "da ham quyosh fotoelektr energetikasi sohasidagi"],
];

const SKIP_KEYS = new Set(["_key", "_type", "_ref", "href", "url", "canonicalUrl"]);

const fix = (text: string) => REPLACEMENTS.reduce((acc, [from, to]) => acc.split(from).join(to), text);

function collect(value: unknown, path: Path, patches: NodePatch[]) {
  if (typeof value === "string") {
    const fixed = fix(value);
    if (fixed !== value) patches.push(at(path, set(fixed)));
    return;
  }
  if (Array.isArray(value)) {
    value.forEach((item, index) => {
      const key = item && typeof item === "object" && "_key" in item ? (item as { _key: string })._key : null;
      collect(item, [...path, key ? { _key: key } : index], patches);
    });
    return;
  }
  if (value && typeof value === "object") {
    for (const [key, child] of Object.entries(value)) {
      if (!SKIP_KEYS.has(key)) collect(child, [...path, key], patches);
    }
  }
}

type Alt = { alt?: { uz?: unknown } };

export default defineMigration({
  title: "Uzbek glossary and name spelling across all uz texts",
  documentTypes: ["news", "article", "plant", "vacancy", "manager"],
  filter: "defined(uz)",
  migrate: {
    document(doc) {
      const patches: NodePatch[] = [];
      collect(doc.uz, ["uz"], patches);
      for (const field of ["cover", "photo"] as const) {
        const alt = (doc[field] as Alt | undefined)?.alt?.uz;
        if (typeof alt === "string") collect(alt, [field, "alt", "uz"], patches);
      }
      for (const picture of (doc.pictures as (Alt & { _key: string })[] | undefined) ?? []) {
        const alt = picture.alt?.uz;
        if (typeof alt === "string") collect(alt, ["pictures", { _key: picture._key }, "alt", "uz"], patches);
      }
      return patches;
    },
  },
});
