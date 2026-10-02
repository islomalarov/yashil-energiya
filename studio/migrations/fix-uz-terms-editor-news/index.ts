// Brings two news entries translated by editors in Studio in line with the
// Uzbek glossary (QFES, elektromobillarni quvvatlash, no SES/QES/PV/EV).
//
// Replaces only the listed fragments inside the uz excerpt, text spans and
// image alts, and only where the old fragment is still present — anything
// edited since is left as it is. Running it twice changes nothing.
//
//   npx sanity migration run fix-uz-terms-editor-news --project ljlv76fi --dataset production               # dry run
//   npx sanity migration run fix-uz-terms-editor-news --project ljlv76fi --dataset production --no-dry-run  # write
import { at, defineMigration, set, type NodePatch } from "sanity/migrate";

type Fix = [from: string, to: string];

// The editors' texts use the ‘ apostrophe, so the replacements keep it.
const FIXES: Record<string, Fix[]> = {
  "66d1ab7e-5c7e-4379-a355-aa78d9d7bf80": [
    ["davlatlar PV sohasidagi", "davlatlar quyosh fotoelektr energetikasi sohasidagi"],
    ["uchta floating PV (suzuvchi quyosh panellari) texnologiyasi", "uchta suzuvchi quyosh paneli texnologiyasi"],
    [
      "utility-scale PV (sanoat miqyosidagi quyosh elektr stansiyalari) tannarxini",
      "sanoat miqyosidagi quyosh fotoelektr stansiyalari tannarxini",
    ],
    ["Buyuk Britaniyada ham PV sohasidagi", "Buyuk Britaniyada ham quyosh fotoelektr energetikasi sohasidagi"],
    ["quyosh elektr stansiyasini", "quyosh fotoelektr stansiyasini"],
    ["energiya saqlash tizimi", "energiya to‘plash tizimi"],
    ["Nurota QESda", "Nurota QFESda"],
    ["Buyurtmachi QES qurilishiga", "Buyurtmachi QFES qurilishiga"],
  ],
  "7bbd7872-f3ab-400e-a8e8-3b6d9a21b60d": [
    [
      "quyosh elektr stansiyalari, elektromobillar uchun zaryadlash tarmog'i va mikro-GES",
      "quyosh fotoelektr stansiyalari, elektromobillarni quvvatlash tarmog'i va mikro GES",
    ],
  ],
};

// Uzbek cover alt left in English by mistake.
const COVER_ALT_FIXES: Record<string, Fix> = {
  "66d1ab7e-5c7e-4379-a355-aa78d9d7bf80": ["solar energy", "quyosh energetikasi"],
};

const applyFixes = (text: string, fixes: Fix[]) =>
  fixes.reduce((acc, [from, to]) => acc.split(from).join(to), text);

type Span = { _key: string; _type: string; text?: string };
type Block = { _key: string; _type: string; children?: Span[] };
type UzNews = { excerpt?: string; description?: Block[] };

export default defineMigration({
  title: "Uzbek glossary fixes in two editor-translated news",
  documentTypes: ["news"],
  migrate: {
    document(doc) {
      const id = doc._id.replace(/^drafts\./, "");
      const fixes = FIXES[id];
      if (!fixes) return [];
      const uz = (doc.uz ?? {}) as UzNews;
      const patches: NodePatch[] = [];

      if (typeof uz.excerpt === "string") {
        const fixed = applyFixes(uz.excerpt, fixes);
        if (fixed !== uz.excerpt) patches.push(at(["uz", "excerpt"], set(fixed)));
      }

      for (const block of uz.description ?? []) {
        if (block._type !== "block") continue;
        for (const span of block.children ?? []) {
          if (typeof span.text !== "string") continue;
          const fixed = applyFixes(span.text, fixes);
          if (fixed !== span.text) {
            patches.push(
              at(["uz", "description", { _key: block._key }, "children", { _key: span._key }, "text"], set(fixed)),
            );
          }
        }
      }

      const coverFix = COVER_ALT_FIXES[id];
      const cover = doc.cover as { alt?: { uz?: string } } | undefined;
      if (coverFix && cover?.alt?.uz === coverFix[0]) {
        patches.push(at(["cover", "alt", "uz"], set(coverFix[1])));
      }

      return patches;
    },
  },
});
