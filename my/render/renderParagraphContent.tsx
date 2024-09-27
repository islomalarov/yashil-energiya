import Link from "next/link";
import React from "react";

interface ChildProps {
  text?: string;
  href?: string;
  title?: string;
  bold?: boolean;
  italic?: boolean;
  children?: ChildProps[];
}

interface stylesProps {
  bold: string;
  italic: string;
  link: string;
}

export const renderParagraphContent = (
  index: number,
  styles: stylesProps,
  children: ChildProps[]
) => {
  return (
    <div key={index}>
      {children.map(
        (
          { text, href, title, bold, italic, children }: ChildProps,
          idx: number
        ) => {
          if (text) {
            return (
              <span
                key={idx}
                className={
                  bold && italic
                    ? `${styles.bold} ${styles.italic}`
                    : bold
                    ? styles.bold
                    : italic
                    ? styles.italic
                    : ""
                }
              >
                {text}
              </span>
            );
          } else if (href) {
            return (
              <Link
                key={idx}
                href={href}
                className={
                  children && children[0]?.italic
                    ? `${styles.link} ${styles.italic}`
                    : styles.link
                }
                target="_blank"
              >
                {children && children[0] && children[0].text}
              </Link>
            );
          }
          return null;
        }
      )}
    </div>
  );
};
