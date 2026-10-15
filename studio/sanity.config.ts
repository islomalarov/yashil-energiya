import { ruKZLocale } from "@sanity/locale-ru-kz";
import { table } from "@sanity/table";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { dataset, projectId } from "./env";
import { schemaTypes } from "./schemaTypes";
import { structure } from "./structure";

export default defineConfig({
  name: "default",
  title: "Yashil Energiya",
  projectId,
  dataset,
  plugins: [
    structureTool({ structure }),
    // Spreadsheet-like editor for the `table` type used by the `dataTable` block.
    table(),
    // Russian Studio UI (the only Russian locale published by Sanity).
    ruKZLocale({ title: "Русский" }),
  ],
  schema: {
    types: schemaTypes,
  },
  document: {
    // Duplicate copies the read-only entryId, which then fails the uniqueness
    // check, so the copy can never be published.
    actions: (prev) => prev.filter((a) => a.action !== "duplicate"),
  },
});
