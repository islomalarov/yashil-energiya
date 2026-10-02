// Review helper: overwrites `uz` (and cover alt.uz) with the current
// patches.json in a COPY of the dataset, so corrected translations can be
// checked on localhost again. It refuses to run against `production`,
// where add-uz-translations (setIfMissing only) is the one to use.
//
//   npx sanity migration run refresh-uz-review --project ljlv76fi --dataset uz-review --no-dry-run
import { readFileSync } from "node:fs";
import path from "node:path";
import { at, defineMigration, set, setIfMissing, type Path } from "sanity/migrate";

type AltPatch = { path: Path; value: string };
type UzPatch = { id: string; type: string; uz: Record<string, unknown>; alts: AltPatch[] };

const PATCHES_FILE = path.resolve(process.cwd(), "../scripts/sanity-migration/.data/uz/patches.json");
const patches = new Map(
  (JSON.parse(readFileSync(PATCHES_FILE, "utf8")) as UzPatch[]).map((patch) => [patch.id, patch]),
);

export default defineMigration({
  title: "Review copy only: overwrite uz with the current translations",
  documentTypes: ["news", "article", "plant", "vacancy", "manager"],
  migrate: {
    document(doc, context) {
      const { dataset } = context.client.config();
      if (dataset === "production") {
        throw new Error("refresh-uz-review overwrites uz and must not run on production.");
      }
      const patch = patches.get(doc._id.replace(/^drafts\./, ""));
      if (!patch) return [];
      return [
        at("uz", set(patch.uz)),
        ...patch.alts.flatMap((alt) => [at(alt.path, setIfMissing({})), at([...alt.path, "uz"], set(alt.value))]),
      ];
    },
  },
});
