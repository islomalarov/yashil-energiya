import Link from "next/link";
import s from "./richLeaves.module.scss";

export type RichTextLeaf = {
  text?: string;
  href?: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  superscript?: boolean;
  children?: RichTextLeaf[];
};

function classFor(node: RichTextLeaf) {
  const { bold, italic, underline, superscript } = node;

  return [
    bold ? s.bold : "",
    italic ? s.italic : "",
    underline ? s.underline : "",
    superscript ? s.superscript : "",
  ]
    .filter(Boolean)
    .join(" ");
}

// Renders inline rich-text leaves with link support. Shared by paragraphs and
// list items so links inside <li> render as anchors, not flattened text.
export function renderRichLeaves(
  nodes: RichTextLeaf[] | undefined,
  keyPrefix: string,
) {
  if (!nodes?.length) return null;

  return nodes.map((node, i) => {
    const key = `${keyPrefix}-${i}`;

    // 1) Link: render all children (not only children[0]).
    if (node.href) {
      return (
        <Link
          key={key}
          href={node.href}
          className={[s.link, classFor(node)].filter(Boolean).join(" ")}
          target="_blank"
          rel="noreferrer"
        >
          {node.children?.length
            ? renderRichLeaves(node.children, key)
            : node.text ?? ""}
        </Link>
      );
    }

    // 2) Text leaf.
    if (typeof node.text === "string") {
      return (
        <span key={key} className={classFor(node)}>
          {node.text}
        </span>
      );
    }

    // 3) Container without text/href (e.g. list-item-child): recurse.
    if (node.children?.length) {
      return <span key={key}>{renderRichLeaves(node.children, key)}</span>;
    }

    return null;
  });
}

export function richLeavesHaveText(nodes: RichTextLeaf[] | undefined): boolean {
  if (!nodes?.length) return false;

  return nodes.some(
    (node) =>
      typeof node.text === "string" ||
      (node.children ? richLeavesHaveText(node.children) : false),
  );
}
