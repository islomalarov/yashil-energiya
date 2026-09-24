// Shared GROQ projections. They keep the response shapes the components
// already use (url/fileName/width/height/altText, title, …), so pages did not
// have to change when the CMS moved from Hygraph to Sanity.
//
// Content is field-level localized (studio/schemaTypes/fields.ts): one
// document per entry, shared fields at the root and each language in an
// object named after it (`en`, `ru`, `uz`). `@[$locale]` reads that object.

export const CMS_LOCALES = ["en", "ru", "uz"] as const;
export type CmsLocale = (typeof CMS_LOCALES)[number];

/** `$locale` is used as a field name in GROQ — only known locales pass. */
export function cmsLocale(locale?: string): CmsLocale {
  return CMS_LOCALES.includes(locale as CmsLocale) ? (locale as CmsLocale) : "en";
}

/** The entry has this language filled in. */
export const hasLocale = (titleField = "title") => `defined(@[$locale].${titleField})`;

/** Fields of the requested language, spread into the projection. */
export const localized = (fields: string) => `...@[$locale]{ ${fields} }`;

// Shared image (one for all languages) with alt text per language.
export const IMAGE = `{
  "url": asset->url,
  "fileName": asset->originalFilename,
  "width": asset->metadata.dimensions.width,
  "height": asset->metadata.dimensions.height,
  "altText": coalesce(alt[$locale], alt.en)
}`;

// Per-language SEO (inside `localized(...)`).
export const SEO = `seo{
  metaTitle,
  metaDescription,
  noIndex,
  canonicalUrl,
  "ogImage": ogImage{ "url": asset->url }
}`;

// Portable Text of the current language (inside `localized(...)`), with image
// assets resolved into what TheImageModal renders.
export const richText = (field: string) => `${field}[]{
  ...,
  _type == "imageBlock" => {
    "src": asset->url,
    "width": asset->metadata.dimensions.width,
    "height": asset->metadata.dimensions.height,
    "altText": alt
  }
}`;

// Languages the entry is filled in (hreflang, sitemaps).
export const languages = (titleField = "title") =>
  `"languages": [${CMS_LOCALES.map(
    (locale) => `select(defined(${locale}.${titleField}) => "${locale}")`,
  ).join(", ")}][defined(@)]`;

// `entryId` is the id shared by all languages and systems (for migrated
// documents, the former Hygraph id) — it keeps /plants/{id} URLs and news
// view statistics valid.
export const ENTRY_ID = `"id": entryId`;
