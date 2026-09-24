import { defineArrayMember, defineField, defineType } from "sanity";
import {
  COMMON_GROUP,
  coordsField,
  entryIdField,
  localizedAltField,
  localizedFields,
  localizedGroups,
} from "../fields";
import { localizedPreview } from "../preview";

// Metrics are free-form strings, as in Hygraph ("1500 kW" / "1500 кВт"); the
// site parses them in src/lib/plant-metrics.ts. Values with units are per
// language; converting them to numbers is a separate task.
const localizedMetric = (name: string, title: string) =>
  defineField({ name, title, type: "string", validation: (rule) => rule.required() });

export const plant = defineType({
  name: "plant",
  title: "СЭС",
  type: "document",
  groups: localizedGroups,
  fields: [
    defineField({
      name: "date",
      title: "Дата подключения",
      type: "string",
      group: COMMON_GROUP,
      description: "Например, 2024-05-17.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "trees",
      title: "Сохранено деревьев",
      type: "string",
      group: COMMON_GROUP,
      validation: (rule) => rule.required(),
    }),
    { ...coordsField, group: COMMON_GROUP },
    defineField({
      name: "pictures",
      title: "Фотографии",
      type: "array",
      group: COMMON_GROUP,
      description: "Одни фото для всех языков.",
      of: [
        defineArrayMember({
          type: "image",
          options: { hotspot: true },
          fields: [localizedAltField],
        }),
      ],
    }),
    entryIdField,
    ...localizedFields([
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
      localizedMetric("power", "Мощность"),
      localizedMetric("production", "Среднегодовая выработка"),
      localizedMetric("coal", "Сэкономлено угля"),
      localizedMetric("gases", "Снижение выбросов CO₂"),
    ]),
  ],
  preview: localizedPreview("title", "pictures.0"),
});
