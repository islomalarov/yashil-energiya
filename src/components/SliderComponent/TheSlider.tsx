
import styles from "./page.module.scss";
import TheVideoPlayer from "../VideoPlayerComponent/TheVideoPlayer";
import { getTranslations } from "next-intl/server";

export const TheSlider = async () => {
  const t = await getTranslations("HomePage");
  const tHeader = await getTranslations("Header");

  return (
    <section className={styles.hero}>
      <div className={styles.bgBlock}>
        <TheVideoPlayer
          title={t("heroTitle")}
          subtitle={t("heroSubtitle")}
          contactLabel={t("ctaContact")}
          projectsLabel={t("ctaProjects")}
          calculatorLabel={tHeader("calculator")}
        />
      </div>
    </section>
  );
};
