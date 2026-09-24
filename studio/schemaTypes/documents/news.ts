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

export const news = defineType({
  name: "news",
  title: "Новость",
  type: "document",
  groups: localizedGroups,
  fields: [
    slugField,
    defineField({
      name: "date",
      title: "Дата",
      type: "date",
      group: COMMON_GROUP,
      initialValue: () => new Date().toISOString().slice(0, 10),
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
      defineField({ name: "excerpt", title: "Анонс", type: "text", rows: 3 }),
      defineField({ name: "description", title: "Текст", type: "richText" }),
      defineField({ name: "seo", title: "SEO", type: "seo" }),
    ]),
  ],
  orderings: [
    { title: "Дата, новые", name: "dateDesc", by: [{ field: "date", direction: "desc" }] },
  ],
  preview: localizedPreview("title", "cover"),
});
