import { ceo } from "@/data/ceo";
import "@/scss/globals.scss";
import styles from "./page.module.scss";
import { useTranslations } from "next-intl";

export const TheCeo = () => {
  const t = useTranslations("CeoPage");
  return (
    <div className={styles.content}>
      {ceo.map(({ id, name, jobTitle, email }: CeoProps) => (
        <div className={styles.ceo} key={id}>
          <h2 className={styles.ceoName}>{name}</h2>
          <div className={styles.block}>
            <p className={styles.descr}>{t("jobTitle")}:</p>
            <h3 className={styles.title}>{t(jobTitle)}</h3>
          </div>
          <div className={styles.block}>
            <p className={styles.descr}>{t("email")}:</p>
            <h3 className={styles.title}>{email}</h3>
          </div>
        </div>
      ))}
    </div>
  );
};
