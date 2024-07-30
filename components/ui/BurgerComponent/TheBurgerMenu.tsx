import styles from "./page.module.scss";
import Link from "next/link";

import { TheLanguage } from "../LanguageComponent/TheLanguage";
import { footerMenu } from "@/data/links";

export const TheBurgerMenu = ({
  status,
  setStatus,
}: {
  status: boolean;
  setStatus: (status: boolean) => void;
}) => {
  return (
    <div className={styles.burgerMenu}>
      <TheLanguage styleName="burgerLang" />
      {footerMenu.map(({ id, url, title }: any) => (
        <Link
          key={title}
          className={styles.burgerLink}
          href={url}
          onClick={() => {
            setStatus(!status);
          }}
        >
          <span
            className={
              id === 1 ? styles.descr : `${styles.descr} ${styles.active}`
            }
          >
            {title}
          </span>
        </Link>
      ))}
    </div>
  );
};
