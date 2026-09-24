import { defineField, defineType } from "sanity";

type Row = { cells?: string[] };

// Table block for rich text: a spreadsheet-like grid from @sanity/table
// (plain-text cells, add/remove rows and columns with buttons) plus a flag
// for the header row — the site renders it as <thead>.
export const dataTable = defineType({
  name: "dataTable",
  title: "Таблица",
  type: "object",
  fields: [
    defineField({
      name: "hasHeaderRow",
      title: "Первая строка — заголовок",
      type: "boolean",
      initialValue: true,
    }),
    defineField({
      name: "table",
      title: "Ячейки",
      type: "table",
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: { rows: "table.rows" },
    prepare: ({ rows }: { rows?: Row[] }) => ({
      title: rows?.[0]?.cells?.filter(Boolean).join(" | ") || "Таблица",
      subtitle: `Таблица: ${rows?.length ?? 0} строк`,
    }),
  },
});
