import { defineField, defineType } from "sanity";
import {
  COMMON_GROUP,
  entryIdField,
  localizedFields,
  localizedGroups,
  sharedImageField,
} from "../fields";
import { localizedPreview } from "../preview";

export const manager = defineType({
  name: "manager",
  title: "Руководитель",
  type: "document",
  groups: localizedGroups,
  fields: [
    defineField({
      name: "email",
      title: "E-mail",
      type: "email",
      group: COMMON_GROUP,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "queue",
      title: "Порядок",
      type: "number",
      group: COMMON_GROUP,
      description: "Порядок вывода на странице «Руководство» (по возрастанию).",
      validation: (rule) => rule.integer().min(0),
    }),
    sharedImageField("photo", "Фото"),
    entryIdField,
    ...localizedFields([
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
    ]),
  ],
  orderings: [
    { title: "Порядок", name: "queueAsc", by: [{ field: "queue", direction: "asc" }] },
  ],
  preview: localizedPreview("name", "photo"),
});
