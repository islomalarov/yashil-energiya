import { defineArrayMember, defineField, defineType } from "sanity";

export const link = defineType({
  name: "link",
  title: "Ссылка",
  type: "object",
  fields: [
    defineField({
      name: "href",
      title: "URL",
      type: "url",
      validation: (rule) =>
        rule.required().uri({
          scheme: ["http", "https", "mailto", "tel"],
          allowRelative: true,
        }),
    }),
    defineField({
      name: "openInNewTab",
      title: "Открывать в новой вкладке",
      type: "boolean",
      initialValue: true,
    }),
  ],
});

// Rich text body for news, articles and vacancies. The page title is the only
// <h1>, so body headings start at h2.
export const richText = defineType({
  name: "richText",
  title: "Текст",
  type: "array",
  of: [
    defineArrayMember({
      type: "block",
      styles: [
        { title: "Обычный", value: "normal" },
        { title: "Заголовок H2", value: "h2" },
        { title: "Заголовок H3", value: "h3" },
        { title: "Заголовок H4", value: "h4" },
        { title: "Цитата", value: "blockquote" },
      ],
      lists: [
        { title: "Маркированный", value: "bullet" },
        { title: "Нумерованный", value: "number" },
      ],
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
    defineArrayMember({ type: "imageBlock" }),
    defineArrayMember({ type: "table" }),
  ],
});
