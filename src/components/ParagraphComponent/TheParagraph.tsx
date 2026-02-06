import type { RichTextNode } from "@/types/richtext";
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

export default function TheParagraph({ content }: Props) {
  if (!content?.length) return null;

  return (
    <p className={s.paragraphBlock}>
      {content.map((node, index) => {
        const { text, href, bold, italic, underline, children, superscript } =
          node;

        if (text) {
          const className =
            bold && italic && superscript
              ? `${s.bold} ${s.italic} ${s.superscript}`
              : bold
                ? s.bold
                : italic
                  ? s.italic
                  : underline
                    ? s.underline
                    : superscript
                      ? s.superscript
                      : "";

          return (
            <span key={index} className={className}>
              {text}
            </span>
          );
        }

        if (href) {
          const child0 = children?.[0];
          const linkText = child0?.text ?? "";

          return (
            <Link
              key={index}
              href={href}
              className={child0?.italic ? `${s.link} ${s.italic}` : s.link}
              target="_blank"
              rel="noreferrer"
            >
              {linkText}
            </Link>
          );
        }

        return null;
      })}
    </p>
  );
}
