
import s from "./TheParagraph.module.scss";
import Link from "next/link";

type RichTextLeaf = {
  text?: string;
  href?: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  superscript?: boolean;
  children?: RichTextLeaf[];
};

type Props = {
  content?: RichTextLeaf[] | null;
};

function classFor(node: RichTextLeaf) {
  const { bold, italic, underline, superscript } = node;

  // Если у тебя есть комбинированный класс — можно оставить как было,
  // но лучше собрать универсально:
  return [
    bold ? s.bold : "",
    italic ? s.italic : "",
    underline ? s.underline : "",
    superscript ? s.superscript : "",
  ]
    .filter(Boolean)
    .join(" ");
}

function renderNodes(nodes: RichTextLeaf[] | undefined, keyPrefix: string) {
  if (!nodes?.length) return null;

  return nodes.map((node, i) => {
    const key = `${keyPrefix}-${i}`;

    // 1) Ссылка: рендерим все children (а не только children[0])
    if (node.href) {
      return (
        <Link
          key={key}
          href={node.href}
          className={[s.link, classFor(node)].filter(Boolean).join(" ")}
          target="_blank"
          rel="noreferrer"
        >
          {node.children?.length ? renderNodes(node.children, key) : node.text ?? ""}
        </Link>
      );
    }

    // 2) Текстовый лист
    if (typeof node.text === "string") {
      return (
        <span key={key} className={classFor(node)}>
          {node.text}
        </span>
      );
    }

    // 3) Контейнер без text/href: просто рекурсивно рендерим детей
    if (node.children?.length) {
      // Важно: не добавляем лишний <span>, чтобы не ломать переносы/пробелы
      return <span key={key}>{renderNodes(node.children, key)}</span>;
    }

    return null;
  });
}

export default function TheParagraph({ content }: Props) {
  if (!content?.length) return null;

  // Если параграф полностью пустой (нет text и нет children с text) — не рендерим
  const hasAnyText = (nodes: RichTextLeaf[]): boolean =>
    nodes.some((n) => typeof n.text === "string" || (n.children ? hasAnyText(n.children) : false));

  if (!hasAnyText(content)) return null;

  return <p className={s.paragraphBlock}>{renderNodes(content, "p")}</p>;
}
