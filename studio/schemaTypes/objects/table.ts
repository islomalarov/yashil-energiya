import { defineArrayMember, defineField, defineType } from "sanity";

// Portable Text has no native table. Cells hold simple rich text (no lists,
// headings or images) — the same shape the Hygraph tables had.
export const tableCell = defineType({
  name: "tableCell",
  title: "Ячейка",
  type: "object",
  fields: [
    defineField({
      name: "content",
      title: "Содержимое",
      type: "array",
      of: [
        defineArrayMember({
          type: "block",
          styles: [{ title: "Обычный", value: "normal" }],
          lists: [],
          marks: {
            decorators: [
              { title: "Жирный", value: "strong" },
              { title: "Курсив", value: "em" },
              { title: "Подчёркнутый", value: "underline" },
              { title: "Верхний индекс", value: "sup" },
            ],
            annotations: [{ type: "link" }],
          },
        }),
      ],
    }),
  ],
});

export const tableRow = defineType({
  name: "tableRow",
  title: "Строка",
  type: "object",
  fields: [
    defineField({
      name: "isHeader",
      title: "Строка заголовка",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "cells",
      title: "Ячейки",
      type: "array",
      of: [defineArrayMember({ type: "tableCell" })],
    }),
  ],
  preview: {
    select: { isHeader: "isHeader", cells: "cells" },
    prepare: ({ isHeader, cells }) => ({
      title: `${isHeader ? "Заголовок" : "Строка"}: ${cells?.length ?? 0} ячеек`,
    }),
  },
});

export const table = defineType({
  name: "table",
  title: "Таблица",
  type: "object",
  fields: [
    defineField({
      name: "rows",
      title: "Строки",
      type: "array",
      of: [defineArrayMember({ type: "tableRow" })],
      validation: (rule) => rule.required().min(1),
    }),
  ],
  preview: {
    select: { rows: "rows" },
    prepare: ({ rows }) => ({ title: `Таблица: ${rows?.length ?? 0} строк` }),
  },
});
