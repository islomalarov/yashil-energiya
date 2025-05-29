import "@/scss/globals.scss";
import styles from "./TheParagraph.module.scss";
import Link from "next/link";

export default function TheParagraph({ content }: any) {
  return (
    <div className={styles.paragraphBlock}>
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
                    ? `${styles.bold} ${styles.italic}`
                    : bold
                      ? styles.bold
                      : italic
                        ? styles.italic
                        : underline
                          ? styles.underline
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
        },
      )}
    </div>
  );
}
