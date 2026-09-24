import type { PortableTextBlock } from "@portabletext/react";

// Rich text is Portable Text (see studio/schemaTypes/objects/richText.ts).
// GROQ projections in services/fragments.ts resolve image assets inline.

export type ImageElem = {
  _type?: "imageBlock";
  _key?: string;
  src: string;
  width: number;
  height: number;
  altText?: string | null;
  title?: string;
};

// Table block: a @sanity/table grid (plain-text cells) + header-row flag.
export type RichTextTableRow = {
  _key: string;
  cells?: string[];
};

export type RichTextTable = {
  _type: "dataTable";
  _key: string;
  hasHeaderRow?: boolean;
  table?: { rows?: RichTextTableRow[] };
};

export type RichTextImage = ImageElem & { _type: "imageBlock"; _key: string };

export type RichText = Array<PortableTextBlock | RichTextImage | RichTextTable>;

export function isImageElem(value: unknown): value is RichTextImage {
  if (typeof value !== "object" || value === null) return false;
  const node = value as Record<string, unknown>;
  return (
    node._type === "imageBlock" &&
    typeof node.src === "string" &&
    typeof node.width === "number" &&
    typeof node.height === "number"
  );
}
