import { defineArrayMember, defineField, defineType } from "sanity";
import { altField, coordsField, entryIdField, languageField } from "../fields";
import { localizedPreview } from "../preview";

// Metric fields were free-form strings in Hygraph ("1 234 кВт", "12.5 т");
// the site parses them in src/lib/plant-metrics.ts. Kept as strings for the
// migration; converting them to numbers is a separate task.
const metric = (name: string, title: string) =>
  defineField({
    name,
    title,
    type: "string",
    validation: (rule) => rule.required(),
  });

export const plant = defineType({
  name: "plant",
  title: "СЭС",
  type: "document",
  fields: [
    languageField,
    entryIdField,
    defineField({
      name: "title",
      title: "Название",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "address",
      title: "Адрес",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    metric("power", "Мощность"),
    metric("date", "Дата подключения"),
    metric("production", "Среднегодовая выработка"),
    metric("coal", "Сэкономлено угля"),
    metric("gases", "Снижение выбросов CO₂"),
    metric("trees", "Сохранено деревьев"),
    coordsField,
    defineField({
      name: "pictures",
      title: "Фотографии",
      type: "array",
      of: [
        defineArrayMember({
          type: "image",
          options: { hotspot: true },
          fields: [altField],
        }),
      ],
    }),
  ],
  preview: localizedPreview("title", "pictures.0"),
});
