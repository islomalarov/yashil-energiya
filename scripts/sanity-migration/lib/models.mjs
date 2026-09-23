// Hygraph models in migration scope, with the full field selection to extract.
// Selections are a superset of what services/*.service.ts query, taken from
// schema introspection, so the snapshot is complete for the migration.
// Out of scope: DemoComponent (unused by the site), system models.

const ASSET = "id url fileName mimeType size width height handle altText";

const SYSTEM = "id createdAt updatedAt publishedAt";

const SEO = `seo {
  metaTitle
  metaDescription
  noIndex
  canonicalUrl
  ogImage { ${ASSET} }
}`;

export const MODELS = [
  {
    key: "article",
    field: "articles",
    localized: true,
    richText: ["content"],
    selection: `${SYSTEM} locale title excerpt slug
      content { raw }
      cover { ${ASSET} }
      ${SEO}`,
  },
  {
    key: "news",
    field: "news",
    localized: true,
    richText: ["description"],
    selection: `${SYSTEM} locale title date excerpt slug
      description { raw }
      cover { ${ASSET} }
      ${SEO}`,
  },
  {
    key: "plant",
    field: "plants",
    localized: true,
    richText: [],
    selection: `${SYSTEM} locale title address power date production coal gases trees coords
      pictures { ${ASSET} }`,
  },
  {
    key: "vacancy",
    field: "vacancies",
    localized: true,
    richText: ["description"],
    selection: `${SYSTEM} locale title references excerpt
      description { raw }
      attachments { ${ASSET} }`,
  },
  {
    key: "manager",
    field: "managers",
    localized: true,
    richText: [],
    selection: `${SYSTEM} locale name jobTitle email queue
      photo { ${ASSET} }`,
  },
  {
    key: "evCharge",
    field: "evCharges",
    localized: false,
    richText: [],
    selection: `${SYSTEM} regionName name coords capacity region condition`,
  },
  {
    key: "mhp",
    field: "mhps",
    localized: false,
    richText: [],
    selection: `${SYSTEM} regionName name coords capacity region condition`,
  },
  {
    key: "plantStatus",
    field: "plantStatuses",
    localized: false,
    richText: [],
    selection: `${SYSTEM} regionName coords plants power region`,
  },
];

export const ENUMS = ["Region", "Condition"];
