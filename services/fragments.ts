// Shared GROQ projections. They keep the response shapes the components
// already use (url/fileName/width/height/altText), so pages did not have to
// change when the CMS moved from Hygraph to Sanity.

export const IMAGE = `{
  "url": asset->url,
  "fileName": asset->originalFilename,
  "width": asset->metadata.dimensions.width,
  "height": asset->metadata.dimensions.height,
  "altText": alt
}`;

export const SEO = `seo{
  metaTitle,
  metaDescription,
  noIndex,
  canonicalUrl,
  "ogImage": ogImage{ "url": asset->url }
}`;

// Portable Text with image assets resolved into what TheImageModal renders.
export const richText = (field: string) => `${field}[]{
  ...,
  _type == "imageBlock" => {
    "src": asset->url,
    "width": asset->metadata.dimensions.width,
    "height": asset->metadata.dimensions.height,
    "altText": alt
  }
}`;

// Languages that have a published version of the same entry (hreflang).
export const LANGUAGES = `"languages": *[_type == ^._type && entryId == ^.entryId].language`;

// `entryId` is the id shared by all language versions (for migrated
// documents, the former Hygraph id) — it keeps /plants/{id} URLs and news
// view statistics valid.
export const ENTRY_ID = `"id": entryId`;
