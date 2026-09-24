import { LANGUAGES } from "../languages";

type Localized = Partial<Record<(typeof LANGUAGES)[number]["id"], string>>;

// List preview for multilingual documents: the English title (or the first
// filled one) and which languages are filled, e.g. "EN ✓ · RU ✓ · UZ —",
// so untranslated entries are visible at a glance.
export function localizedPreview(titleField = "title", media?: string) {
  return {
    select: {
      ...Object.fromEntries(LANGUAGES.map((l) => [l.id, `${l.id}.${titleField}`])),
      ...(media ? { media } : {}),
    },
    prepare: (selection: Localized & { media?: unknown }) => {
      const title = LANGUAGES.map((l) => selection[l.id]).find(Boolean);
      return {
        title: title || "Без названия",
        subtitle: LANGUAGES.map(
          (l) => `${l.id.toUpperCase()} ${selection[l.id] ? "✓" : "—"}`,
        ).join(" · "),
        media: selection.media as never,
      };
    },
  };
}
