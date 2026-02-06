import s from "./TheList.module.scss";

type ListType = "bulleted-list" | "numbered-list";
type Props = {
  content: unknown[];
  type: ListType;
};


function isRecord(v: unknown): v is Record<string, unknown> {
  return typeof v === "object" && v !== null;
}
function getChildrenArray(v: unknown): unknown[] {
  if (!isRecord(v)) return [];
  const ch = v["children"];
  return Array.isArray(ch) ? ch : [];
}

function renderNode(node: unknown) {
  if (!isRecord(node)) return null;
  const type = node.type;
  if (typeof type !== "string") return null;
}

export default function TheList({ content, type }: Props) {
  const Tag = type === "bulleted-list" ? "ul" : "ol";
  const className = type === "bulleted-list" ? s.bulleted : s.numbered;

  return (
    <Tag className={className}>
      {content.map((item, index) => (
        <li key={index} className={s.listItem}>
          {getChildrenArray(item).map((child) =>
            getChildrenArray(child).map((sub) =>
              renderNode(sub),
            ),
          )}
        </li>
      ))}
    </Tag>
  );
}

