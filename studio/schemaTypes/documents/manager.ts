import { defineField, defineType } from "sanity";
import { entryIdField, imageField, languageField } from "../fields";
import { localizedPreview } from "../preview";

export const manager = defineType({
  name: "manager",
  title: "Руководитель",
  type: "document",
  fields: [
    languageField,
    entryIdField,
    defineField({
      name: "name",
      title: "ФИО",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "jobTitle",
      title: "Должность",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "email",
      title: "E-mail",
      type: "email",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "queue",
      title: "Порядок",
      type: "number",
      description: "Порядок вывода на странице «Руководство» (по возрастанию).",
      validation: (rule) => rule.integer().min(0),
    }),
    imageField("photo", "Фото"),
  ],
  orderings: [
    { title: "Порядок", name: "queueAsc", by: [{ field: "queue", direction: "asc" }] },
  ],
  preview: localizedPreview("name", "photo"),
});
