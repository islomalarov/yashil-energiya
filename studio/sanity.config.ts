import { documentInternationalization } from "@sanity/document-internationalization";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { dataset, projectId } from "./env";
import { LANGUAGES, LOCALIZED_TYPES } from "./languages";
import { schemaTypes } from "./schemaTypes";
import { structure } from "./structure";

export default defineConfig({
  name: "default",
  title: "Yashil Energiya",
  projectId,
  dataset,
  plugins: [
    structureTool({ structure }),
    // Creating a translation copies the source document, so the shared
    // `entryId` (used in /plants/{id}, /vacancies/{id}) and `slug` carry over.
    documentInternationalization({
      supportedLanguages: LANGUAGES,
      schemaTypes: LOCALIZED_TYPES,
    }),
  ],
  schema: {
    types: schemaTypes,
    // Localized types are created per language via the translations menu,
    // so hide the language-less "new document" templates for them.
    templates: (prev) =>
      prev.filter((template) => !LOCALIZED_TYPES.includes(template.id)),
  },
});
