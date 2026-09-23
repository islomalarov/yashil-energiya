import { defineField } from "sanity";
import { isUniqueEntryIdInLanguage, isUniqueSlugInLanguage } from "./validation";

// Managed by @sanity/document-internationalization.
export const languageField = defineField({
  name: "language",
  type: "string",
  readOnly: true,
  hidden: true,
});

// Shared by every language version of one entry: the plugin copies it when a
// translation is created. It is the public id in /plants/{id} and
// /vacancies/{id}, the key for news view statistics, and — for migrated
// documents — the original Hygraph id. Never change it after publishing.
export const entryIdField = defineField({
  name: "entryId",
  title: "ID записи",
  type: "string",
  description:
    "Общий для всех языковых версий. Используется в адресе страницы и в статистике просмотров. Заполняется автоматически.",
  readOnly: true,
  initialValue: () => crypto.randomUUID(),
  validation: (rule) => rule.required().custom(isUniqueEntryIdInLanguage),
});

export const slugField = defineField({
  name: "slug",
  title: "Адрес (slug)",
  type: "slug",
  description:
    "Часть URL. Должен совпадать во всех языковых версиях — при создании перевода копируется автоматически.",
  options: { source: "title", maxLength: 200, isUnique: isUniqueSlugInLanguage },
  validation: (rule) => rule.required(),
});

export const altField = defineField({
  name: "alt",
  title: "Alt-текст",
  type: "string",
  description: "Что изображено — для незрячих пользователей и поисковиков.",
  validation: (rule) => rule.required().warning("Заполните alt-текст"),
});

export function imageField(
  name: string,
  title: string,
  { required = false }: { required?: boolean } = {},
) {
  return defineField({
    name,
    title,
    type: "image",
    options: { hotspot: true },
    fields: [altField],
    validation: required ? (rule) => rule.required() : undefined,
  });
}

export const coordsField = defineField({
  name: "coords",
  title: "Координаты",
  type: "geopoint",
  validation: (rule) => rule.required(),
});
