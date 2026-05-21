
import styles from "./page.module.scss";
import TheVideoPlayer from "../VideoPlayerComponent/TheVideoPlayer";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

export const TheSlider = async () => {
  const t = await getTranslations("HomePage");

  return (
    <div className={styles.hero}>
      <div className={styles.bgBlock}>
        {/* <Image
          src={hero}
          alt="silder-bg"
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
          priority
        /> */}
        <TheVideoPlayer />
      </div>
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
    </div>
  );
};
