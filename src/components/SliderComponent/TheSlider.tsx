
import styles from "./page.module.scss";
import TheVideoPlayer from "../VideoPlayerComponent/TheVideoPlayer";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

export const TheSlider = async () => {
  const t = await getTranslations("HomePage");

  return (
    <>
      <div className={styles.hero}>
        <div className={styles.bgBlock}>
          <TheVideoPlayer />
        </div>
      </div>
      <section className={styles.intro}>
        <div className="container">
          <div className={styles.info}>
            <h1 className={styles.title}>{t("heroTitle")}</h1>
            <p className={styles.descr}>{t("heroSubtitle")}</p>
            <div className={styles.actions}>
              <Link className={styles.primaryLink} href="/contacts">
                {t("ctaContact")}
              </Link>
              <Link className={styles.secondaryLink} href="/plants">
                {t("ctaProjects")}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
