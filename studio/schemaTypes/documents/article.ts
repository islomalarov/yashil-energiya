import { defineField, defineType } from "sanity";
import { entryIdField, imageField, languageField, slugField } from "../fields";
import { localizedPreview } from "../preview";

export const article = defineType({
  name: "article",
  title: "Статья",
  type: "document",
  fields: [
    languageField,
    entryIdField,
    defineField({
      name: "title",
      title: "Заголовок",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    slugField,
    defineField({
      name: "publishedAt",
      title: "Дата публикации",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "excerpt",
      title: "Анонс",
      type: "text",
      rows: 3,
      validation: (rule) => rule.required(),
    }),
    imageField("cover", "Обложка", { required: true }),
    defineField({
      name: "content",
      title: "Текст",
      type: "richText",
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "seo", title: "SEO", type: "seo" }),
  ],
  orderings: [
    {
      title: "Дата публикации, новые",
      name: "publishedAtDesc",
      by: [{ field: "publishedAt", direction: "desc" }],
    },
  ],
  preview: localizedPreview("title", "cover"),
});
