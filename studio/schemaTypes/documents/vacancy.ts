import { defineArrayMember, defineField, defineType } from "sanity";
import { entryIdField, languageField } from "../fields";
import { localizedPreview } from "../preview";

export const vacancy = defineType({
  name: "vacancy",
  title: "Вакансия",
  type: "document",
  fields: [
    languageField,
    entryIdField,
    defineField({
      name: "title",
      title: "Должность",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "references",
      title: "Требования (кратко)",
      type: "string",
    }),
    defineField({
      name: "excerpt",
      title: "Анонс",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "description",
      title: "Описание",
      type: "richText",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "attachments",
      title: "Вложения",
      type: "array",
      of: [defineArrayMember({ type: "file" })],
    }),
  ],
  preview: localizedPreview("title"),
});
