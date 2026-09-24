import Link from "next/link";
import type { PortableTextComponents } from "@portabletext/react";
import s from "./richLeaves.module.scss";

type LinkMark = { href?: string; openInNewTab?: boolean };

// Inline marks shared by body text and table cells. Class names are the ones
// the Hygraph rich-text renderer used, so the look is unchanged.
export const richTextMarks: PortableTextComponents["marks"] = {
  strong: ({ children }) => <strong className={s.bold}>{children}</strong>,
  em: ({ children }) => <em className={s.italic}>{children}</em>,
  underline: ({ children }) => <span className={s.underline}>{children}</span>,
  sup: ({ children }) => <sup className={s.superscript}>{children}</sup>,
  link: ({ children, value }) => {
    const { href, openInNewTab } = (value ?? {}) as LinkMark;
    if (!href) return <>{children}</>;

    // Migrated links always opened in a new tab; editors can now opt out.
    const newTab = openInNewTab !== false;
    return (
      <Link
        href={href}
        className={s.link}
        target={newTab ? "_blank" : undefined}
        rel={newTab ? "noreferrer" : undefined}
      >
        {children}
      </Link>
    );
  },
};
