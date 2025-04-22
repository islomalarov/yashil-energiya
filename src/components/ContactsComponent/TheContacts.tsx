import "@/scss/globals.scss";
import styles from "./page.module.scss";
import { useTranslations } from "next-intl";

export const TheContacts = () => {
  const t = useTranslations("ContactsPage");
  return (
    <div>
      <h1 className="title">{t("title")}</h1>
      <div className={styles.info}>
        <div className={styles.block}>
          <h2>{t("phone")}</h2>
          <p>+998 55-514-88-44</p>
        </div>
        <div className={styles.block}>
          <h2>{t("address")}</h2>
          <p>{t("address1")}</p>
        </div>
        <div className={styles.block}>
          <h2>{t("landmark")}</h2>
          <p>{t("landmark1")}</p>
        </div>
        <div className={styles.block}>
          <h2>{t("email")}</h2>
          <p>info@yashil-energiya.uz</p>
        </div>
      </div>
    </div>
  );
};
