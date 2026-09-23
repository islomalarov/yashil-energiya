import { defineField, defineType } from "sanity";
import { entryIdField, imageField, languageField, slugField } from "../fields";
import { localizedPreview } from "../preview";

export const news = defineType({
  name: "news",
  title: "Новость",
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
      name: "date",
      title: "Дата",
      type: "date",
      initialValue: () => new Date().toISOString().slice(0, 10),
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "excerpt",
      title: "Анонс",
      type: "text",
      rows: 3,
    }),
    imageField("cover", "Обложка", { required: true }),
    defineField({
      name: "description",
      title: "Текст",
      type: "richText",
    }),
    defineField({ name: "seo", title: "SEO", type: "seo" }),
  ],
  orderings: [
    {
      title: "Дата, новые",
      name: "dateDesc",
      by: [{ field: "date", direction: "desc" }],
    },
  ],
  preview: localizedPreview("title", "cover"),
});
