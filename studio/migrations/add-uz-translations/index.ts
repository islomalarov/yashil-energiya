// Adds the Uzbek (`uz`) version to entries that only had en/ru.
//
// Input: scripts/sanity-migration/.data/uz/patches.json, built by
//   node scripts/sanity-migration/uz-export.mjs
//   node scripts/sanity-migration/uz-build.mjs
// (.data is gitignored — run both scripts first on a fresh checkout).
//
// Only fills what is missing: `uz` is set with setIfMissing and the
// documents are filtered by !defined(uz), so anything an editor has
// already written in Studio is never overwritten. Shared cover images
// get `alt.uz` next to the existing `alt.en` / `alt.ru`.
//
//   npx sanity migration run add-uz-translations               # dry run
//   npx sanity migration run add-uz-translations --no-dry-run  # write
import { readFileSync } from "node:fs";
import path from "node:path";
import { at, defineMigration, setIfMissing, type Path } from "sanity/migrate";

type AltPatch = { path: Path; value: string };
type UzPatch = { id: string; type: string; uz: Record<string, unknown>; alts: AltPatch[] };

const PATCHES_FILE = path.resolve(process.cwd(), "../scripts/sanity-migration/.data/uz/patches.json");

function loadPatches(): Map<string, UzPatch> {
  let raw: string;
  try {
    raw = readFileSync(PATCHES_FILE, "utf8");
  } catch {
    throw new Error(`${PATCHES_FILE} not found: run uz-export.mjs and uz-build.mjs first (from the repo root).`);
  }
  const patches = JSON.parse(raw) as UzPatch[];
  return new Map(patches.map((patch) => [patch.id, patch]));
}

const patches = loadPatches();

export default defineMigration({
  title: "Add Uzbek translations to entries without uz",
  documentTypes: ["news", "article", "plant", "vacancy", "manager"],
  filter: "!defined(uz)",
  migrate: {
    document(doc) {
      // Drafts get the same translation as the published document.
      const patch = patches.get(doc._id.replace(/^drafts\./, ""));
      if (!patch) return [];
      return [
        at("uz", setIfMissing(patch.uz)),
        ...patch.alts.flatMap((alt) => [
          at(alt.path, setIfMissing({})),
          at([...alt.path, "uz"], setIfMissing(alt.value)),
        ]),
      ];
    },
  },
});
