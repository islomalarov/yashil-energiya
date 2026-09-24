import {
  defineField,
  type FieldDefinition,
  type FieldGroupDefinition,
} from "sanity";
import { BASE_LANGUAGE, LANGUAGES } from "../languages";
import { isUniqueEntryId } from "./validation";

// One document per entry, all languages inside it (field-level i18n):
// shared fields live in the "Общее" tab, each language has its own tab with
// an object field named after the language (`en`, `ru`, `uz`). Publishing
// the document publishes every language at once.
export const COMMON_GROUP = "common";

export const localizedGroups: FieldGroupDefinition[] = [
  { name: COMMON_GROUP, title: "Общее", default: true },
  ...LANGUAGES.map((language) => ({ name: language.id, title: language.title })),
];

/**
 * One object field per language holding that language's fields. English is
 * required; a missing ru/uz translation is a warning, so older entries that
 * are not translated yet can still be edited and published.
 */
export function localizedFields(fields: FieldDefinition[]) {
  return LANGUAGES.map((language) =>
    defineField({
      name: language.id,
      title: language.title,
      type: "object",
      group: language.id,
      options: { collapsible: false },
      fields,
      validation: (rule) => {
        const check = rule.custom((value: Record<string, unknown> | undefined) => {
          const filled =
            value && Object.values(value).some((v) => v !== undefined && v !== "");
          return filled
            ? true
            : language.id === BASE_LANGUAGE
              ? "Заполните английскую версию"
              : `Нет перевода: ${language.title}`;
        });
        return language.id === BASE_LANGUAGE ? check : check.warning();
      },
    }),
  );
}

// Id shared by the entry across languages and systems. It is the public id
// in /plants/{id} and /vacancies/{id}, the key for news view statistics and,
// for migrated documents, the original Hygraph id. Never change it.
export const entryIdField = defineField({
  name: "entryId",
  title: "ID записи",
  type: "string",
  group: COMMON_GROUP,
  description:
    "Используется в адресе страницы и в статистике просмотров. Заполняется автоматически.",
  readOnly: true,
  initialValue: () => crypto.randomUUID(),
  validation: (rule) => rule.required().custom(isUniqueEntryId),
});

export const slugField = defineField({
  name: "slug",
  title: "Адрес (slug)",
  type: "slug",
  group: COMMON_GROUP,
  description:
    "Часть URL, одна для всех языков. Нажмите «Generate» — адрес создастся из английского заголовка. После публикации не меняйте.",
  options: { source: `${BASE_LANGUAGE}.title`, maxLength: 200 },
  validation: (rule) => rule.required(),
});

// Alt text inside a language tab (rich-text images) is a plain string.
export const altField = defineField({
  name: "alt",
  title: "Alt-текст",
  type: "string",
  description: "Что изображено — для незрячих пользователей и поисковиков.",
  validation: (rule) => rule.required().warning("Заполните alt-текст"),
});

// Shared images (cover, photos) are uploaded once for all languages; only
// their alt text is per language.
export const localizedAltField = defineField({
  name: "alt",
  title: "Alt-текст",
  type: "object",
  description: "Что изображено — на каждом языке.",
  options: { columns: 3 },
  fields: LANGUAGES.map((language) =>
    defineField({ name: language.id, title: language.title, type: "string" }),
  ),
  validation: (rule) =>
    rule
      .custom((value: Record<string, string | undefined> | undefined) => {
        const missing = LANGUAGES.filter((l) => !value?.[l.id]?.trim()).map((l) =>
          l.id.toUpperCase(),
        );
        return missing.length ? `Нет alt-текста: ${missing.join(", ")}` : true;
      })
      .warning(),
});

export function sharedImageField(
  name: string,
  title: string,
  { required = false }: { required?: boolean } = {},
) {
  return defineField({
    name,
    title,
    type: "image",
    group: COMMON_GROUP,
    description: "Одно изображение для всех языков.",
    options: { hotspot: true },
    fields: [localizedAltField],
    validation: required ? (rule) => rule.required() : undefined,
  });
}

export const coordsField = defineField({
  name: "coords",
  title: "Координаты",
  type: "geopoint",
  validation: (rule) => rule.required(),
});
