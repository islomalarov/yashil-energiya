import styles from "./page.module.scss";
// import Link from "next/link";
import { Link } from "@/src/i18n/routing";

import { TheLanguageSwitcher } from "../LanguageComponent/TheLanguageSwitcher";
import { footerMenu } from "@/data/links";
import { useTranslations } from "next-intl";

export const TheBurgerMenu = ({
  status,
  setStatus,
}: {
  status: boolean;
  setStatus: (status: boolean) => void;
}) => {
  const t = useTranslations("Header");
  return (
    <div className={styles.burgerMenu}>
      <div className={styles.languageBtn}>
        <TheLanguageSwitcher />
      </div>
      {footerMenu.map(({ id, url, title }: any) => (
        <Link
          key={title}
          className={styles.burgerLink}
          href={url}
          onClick={() => setStatus(!status)}
        >
          <span
            className={
              id === 1 ? styles.descr : `${styles.descr} ${styles.active}`
            }
          >
            {t(`${title}`)}
          </span>
        </Link>
      ))}
    </div>
  );
};
