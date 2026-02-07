export type RichTextNode = Record<string, unknown>;

export type ImageElem = RichTextNode & {
  type: "image";
  src: string;
  title?: string;
  height: number;
  width: number;
  // handle?: string;
  // mimeType?: string;
  // children?: RichTextNode[];
};

export function isRecord(v: unknown): v is Record<string, unknown> {
  return typeof v === "object" && v !== null;
}

export function getChildren(v: unknown): RichTextNode[] {
  if (!isRecord(v)) return [];
  const c = v["children"];
  return Array.isArray(c) ? (c.filter(isRecord) as RichTextNode[]) : [];
}

export function getText(v: unknown): string | null {
  if (!isRecord(v)) return null;
  const t = v["text"];
  return typeof t === "string" ? t : null;
}

export function getType(v: unknown): string | null {
  if (!isRecord(v)) return null;
  const t = v["type"];
  return typeof t === "string" ? t : null;
}

export function isImageElem(v: unknown): v is ImageElem {
  if (!isRecord(v)) return false;
  if (v["type"] !== "image") return false;

  const title = v["title"];
  const titleOk = title === undefined || typeof title === "string";

  return (
    typeof v["src"] === "string" &&
    titleOk &&
    typeof v["width"] === "number" &&
    typeof v["height"] === "number"
  );
}


