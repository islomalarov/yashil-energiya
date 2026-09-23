import { defineField, defineType } from "sanity";

export const seo = defineType({
  name: "seo",
  title: "SEO",
  type: "object",
  options: { collapsible: true, collapsed: true },
  fields: [
    defineField({
      name: "metaTitle",
      title: "Meta title",
      type: "string",
      description: "≤60 символов, тема в начале, без бренда. Пусто → заголовок материала.",
      validation: (rule) => rule.max(60).warning("Длиннее 60 символов — поисковик обрежет"),
    }),
    defineField({
      name: "metaDescription",
      title: "Meta description",
      type: "text",
      rows: 3,
      description: "150–160 символов. Пусто → анонс или первый абзац.",
      validation: (rule) => rule.max(160).warning("Длиннее 160 символов — поисковик обрежет"),
    }),
    defineField({
      name: "ogImage",
      title: "OG-изображение",
      type: "image",
      description: "1200×630. Пусто → обложка материала.",
    }),
    defineField({
      name: "noIndex",
      title: "Скрыть от поисковиков",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "canonicalUrl",
      title: "Canonical URL",
      type: "url",
      description: "Только для перепечаток. Обычно пусто.",
    }),
  ],
});
