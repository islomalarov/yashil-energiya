import { defineField, defineType } from "sanity";
import { coordsField } from "../fields";
import { CONDITIONS, REGIONS } from "../regions";

// Map markers are language-neutral: names come from the data, labels for
// regions and statuses from the site dictionaries.
const regionField = defineField({
  name: "region",
  title: "Регион",
  type: "string",
  options: { list: REGIONS },
  validation: (rule) => rule.required(),
});

const regionNameField = defineField({
  name: "regionName",
  title: "Название региона",
  type: "string",
});

const operationalAssetFields = [
  defineField({
    name: "name",
    title: "Название",
    type: "string",
    validation: (rule) => rule.required(),
  }),
  regionField,
  regionNameField,
  coordsField,
  defineField({
    name: "condition",
    title: "Статус",
    type: "string",
    options: { list: CONDITIONS, layout: "radio" },
    validation: (rule) => rule.required(),
  }),
  defineField({
    name: "capacity",
    title: "Мощность, кВт",
    type: "number",
    validation: (rule) => rule.min(0),
  }),
];

const assetPreview = {
  select: { title: "name", subtitle: "regionName" },
};

export const evCharge = defineType({
  name: "evCharge",
  title: "Зарядная станция",
  type: "document",
  fields: operationalAssetFields,
  preview: assetPreview,
});

export const mhp = defineType({
  name: "mhp",
  title: "МикроГЭС",
  type: "document",
  fields: operationalAssetFields,
  preview: assetPreview,
});

export const plantStatus = defineType({
  name: "plantStatus",
  title: "СЭС по региону",
  type: "document",
  fields: [
    regionField,
    regionNameField,
    coordsField,
    defineField({
      name: "plants",
      title: "Количество СЭС",
      type: "number",
      validation: (rule) => rule.required().integer().min(0),
    }),
    defineField({
      name: "power",
      title: "Суммарная мощность, кВт",
      type: "number",
      validation: (rule) => rule.required().min(0),
    }),
  ],
  preview: { select: { title: "regionName", subtitle: "region" } },
});
