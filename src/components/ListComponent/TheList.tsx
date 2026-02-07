"use client";

import s from "./TheList.module.scss";

type ListType = "bulleted-list" | "numbered-list";

type Props = {
  content: unknown[];
  type: ListType;
};

function isRecord(v: unknown): v is Record<string, unknown> {
  return typeof v === "object" && v !== null;
}

function getChildren(v: unknown): unknown[] {
  if (!isRecord(v)) return [];
  const ch = v["children"];
  return Array.isArray(ch) ? ch : [];
}

function getText(v: unknown): string {
  if (!isRecord(v)) return "";
  const t = v["text"];
  return typeof t === "string" ? t : "";
}

/**
 * Рекурсивно собирает весь текст из поддерева.
 * В Hygraph text-ноды обычно выглядят как { text: "..." } без поля type.
 */
function collectText(node: unknown): string {
  const self = getText(node);
  const children = getChildren(node);

  if (!children.length) return self;

  return self + children.map(collectText).join("");
}

export default function TheList({ content, type }: Props) {
  const Tag = type === "bulleted-list" ? "ul" : "ol";
  const className = type === "bulleted-list" ? s.bulleted : s.numbered;

  return (
    <Tag className={className}>
      {content.map((item, index) => {
        const text = collectText(item).trim();
        if (!text) return null;

        return (
          <li key={index} className={s.listItem}>
            {text}
          </li>
        );
      })}
    </Tag>
  );
}
