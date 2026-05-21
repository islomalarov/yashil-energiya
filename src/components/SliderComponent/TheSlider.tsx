
import styles from "./page.module.scss";
import TheVideoPlayer from "../VideoPlayerComponent/TheVideoPlayer";
import { getTranslations } from "next-intl/server";

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
        </div>
      </div>
    </div>
  );
};
