// Must match the site locales in src/i18n/routing.ts. English is the base
// language: it is required and the slug is generated from it.
export const LANGUAGES = [
  { id: "en", title: "English" },
  { id: "ru", title: "Русский" },
  { id: "uz", title: "Oʻzbekcha" },
] as const;

export type LanguageId = (typeof LANGUAGES)[number]["id"];

export const BASE_LANGUAGE: LanguageId = "en";
