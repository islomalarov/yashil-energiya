// Shared preview for localized documents: title plus a language badge.
export function localizedPreview(title = "title", media?: string) {
  return {
    select: { title, language: "language", ...(media ? { media } : {}) },
    prepare: ({
      title,
      language,
      media,
    }: {
      title?: string;
      language?: string;
      media?: unknown;
    }) => ({
      title: title || "Без названия",
      subtitle: language ? language.toUpperCase() : "язык не задан",
      media: media as never,
    }),
  };
}
