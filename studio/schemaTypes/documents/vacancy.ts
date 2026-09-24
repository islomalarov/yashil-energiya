import { defineArrayMember, defineField, defineType } from "sanity";
import {
  COMMON_GROUP,
  entryIdField,
  localizedFields,
  localizedGroups,
} from "../fields";
import { localizedPreview } from "../preview";

export const vacancy = defineType({
  name: "vacancy",
  title: "Вакансия",
  type: "document",
  groups: localizedGroups,
  fields: [
    defineField({
      name: "attachments",
      title: "Вложения",
      type: "array",
      group: COMMON_GROUP,
      description: "Общие файлы для всех языков.",
      of: [defineArrayMember({ type: "file" })],
    }),
    entryIdField,
    ...localizedFields([
      defineField({
        name: "title",
        title: "Должность",
        type: "string",
        validation: (rule) => rule.required(),
      }),
      defineField({ name: "references", title: "Требования (кратко)", type: "string" }),
      defineField({ name: "excerpt", title: "Анонс", type: "text", rows: 3 }),
      defineField({
        name: "description",
        title: "Описание",
        type: "richText",
        validation: (rule) => rule.required(),
      }),
    ]),
  ],
  preview: localizedPreview("title"),
});
