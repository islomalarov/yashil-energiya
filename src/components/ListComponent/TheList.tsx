"use client";

import s from "./TheList.module.scss";
import {
  renderRichLeaves,
  richLeavesHaveText,
  type RichTextLeaf,
} from "../RichText/renderRichLeaves";

type ListType = "bulleted-list" | "numbered-list";

type Props = {
  content: unknown[];
  type: ListType;
};

function isRecord(v: unknown): v is Record<string, unknown> {
  return typeof v === "object" && v !== null;
}

function getChildren(v: unknown): RichTextLeaf[] {
  if (!isRecord(v)) return [];
  const ch = v["children"];
  return Array.isArray(ch) ? (ch as RichTextLeaf[]) : [];
}

export default function TheList({ content, type }: Props) {
  const Tag = type === "bulleted-list" ? "ul" : "ol";
  const className = type === "bulleted-list" ? s.bulleted : s.numbered;

  return (
    <Tag className={className}>
      {content.map((item, index) => {
        const children = getChildren(item);
        // Skip fully empty list items.
        if (!richLeavesHaveText(children)) return null;

        return (
          <li key={index} className={s.listItem}>
            {renderRichLeaves(children, `li-${index}`)}
          </li>
        );
      })}
    </Tag>
  );
}
