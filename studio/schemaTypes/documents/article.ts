import { defineField, defineType } from "sanity";
import {
  COMMON_GROUP,
  entryIdField,
  localizedFields,
  localizedGroups,
  sharedImageField,
  slugField,
} from "../fields";
import { localizedPreview } from "../preview";

export const article = defineType({
  name: "article",
  title: "Статья",
  type: "document",
  groups: localizedGroups,
  fields: [
    slugField,
    defineField({
      name: "publishedAt",
      title: "Дата публикации",
      type: "datetime",
      group: COMMON_GROUP,
      initialValue: () => new Date().toISOString(),
      validation: (rule) => rule.required(),
    }),
    sharedImageField("cover", "Обложка", { required: true }),
    entryIdField,
    ...localizedFields([
      defineField({
        name: "title",
        title: "Заголовок",
        type: "string",
        validation: (rule) => rule.required(),
      }),
      defineField({
        name: "excerpt",
        title: "Анонс",
        type: "text",
        rows: 3,
        validation: (rule) => rule.required(),
      }),
      defineField({
        name: "content",
        title: "Текст",
        type: "richText",
        validation: (rule) => rule.required(),
      }),
      defineField({ name: "seo", title: "SEO", type: "seo" }),
    ]),
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
