
import { useTranslations } from "next-intl";
import styles from "./TheFeedback.module.scss";
import { TheContacts } from "../ContactsComponent/TheContacts";
import { TheMotionWrapper } from "../MotionWrapper/TheMotionWrapper";
import { TheFeedbackFormLoader } from "./TheFeedbackFormLoader";

export const TheFeedback = () => {
  const t = useTranslations("FeedbackPage");

  return (
    <div className={styles.main}>
      <TheMotionWrapper motionKey="feedback">
        <div className={styles.card}>
          <div className={styles.grid}>
            <aside className={styles.info}>
              <h2 className={styles.heading}>{t("title")}</h2>
              <p className={styles.subtitle}>{t("subtitle")}</p>
              <div className={styles.contacts}>
                <TheContacts />
              </div>
            </aside>
            <section className={styles.formPane}>
              <TheFeedbackFormLoader />
            </section>
          </div>
        </div>
      </TheMotionWrapper>
    </div>
  );
};
