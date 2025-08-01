import "@/scss/globals.scss";
import s from "./TheParagraph.module.scss";
import Link from "next/link";

export default function TheParagraph({ content }: any) {
  return (
    <p className={s.paragraphBlock}>
      {content.map(
        (
          { text, href, bold, italic, underline, children }: any,
          index: number,
        ) => {
          if (text) {
            return (
              <span
                key={index}
                className={
                  bold && italic
                    ? `${s.bold} ${s.italic}`
                    : bold
                      ? s.bold
                      : italic
                        ? s.italic
                        : underline
                          ? s.underline
                          : ""
                }
              >
                {text}
              </span>
            );
          } else if (href) {
            return (
              <Link
                key={index}
                href={href}
                className={
                  children && children[0]?.italic
                    ? `${s.link} ${s.italic}`
                    : s.link
                }
                target="_blank"
              >
                {children && children[0] && children[0].text}
              </Link>
            );
          }
          return null;
        },
      )}
    </p>
  );
}
