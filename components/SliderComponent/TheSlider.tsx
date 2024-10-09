import "../../scss/globals.scss";
import styles from "./page.module.scss";
import Image from "next/image";
import hero from "@/public/hero.png";
import TheVideoPlayer from "../VideoPlayerComponent/TheVideoPlayer";

export const TheSlider = () => {
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
        {/* <div className={styles.info}>
          <h1 className={styles.title}>Yuqori sifatli</h1>
          <p className={styles.descr}>energiya mahsulotlari</p>
        </div> */}
      </div>
    </div>
  );
};
