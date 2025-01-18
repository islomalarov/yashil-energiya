import "@/scss/globals.scss";
import styles from "./page.module.scss";
import { branches } from "@/data/branches";
import { useLocale, useTranslations } from "next-intl";

export const TheBranches = () => {
  const t = useTranslations("BranchesPage");
  const locale = useLocale();

  return (
    <div className={styles.content}>
      <h1 className={styles.titleB}>{t("headerTitle")}</h1>
      {branches.map(({ region, name, phone, address, mail }: any) => (
        <div className={styles.branch} key={region}>
          {locale === "uz" ? (
            <h2 className={styles.regionName}>
              {t(`${region}`)} {t("regionTitle")}
            </h2>
          ) : (
            <h2 className={styles.regionName}>
              {t("regionTitle")} {t(`${region}`)}
            </h2>
          )}
          <div className={styles.block}>
            <p className={styles.description}>{t("branchManager")}</p>
            <h3 className={styles.title}>{name}</h3>
          </div>
          <div className={styles.block}>
            <p className={styles.description}>{t("phone")}:</p>
            <h3 className={styles.title}>{phone}</h3>
          </div>
          <div className={styles.block}>
            <p className={styles.description}>{t("address")}:</p>
            <h3 className={styles.title}>{address}</h3>
          </div>
          <div className={styles.block}>
            <p className={styles.description}>{t("email")}:</p>
            <h3 className={styles.title}>{mail}</h3>
          </div>
        </div>
      ))}
    </div>
  );
};
