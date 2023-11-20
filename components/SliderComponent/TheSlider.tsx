import "../../scss/globals.scss";
import styles from "./page.module.scss";
import Image from "next/image";
import ExportedImage from "next-image-export-optimizer";
export const TheSlider = () => {
  return (
    <div className={styles.hero}>
      <div className={styles.bgBlock}>
        <Image
          src="/hero.png"
          width={1920}
          height={700}
          alt="silder-bg"
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
          priority
        />
      </div>
      <div className="container">
        <div className={styles.info}>
          <h1 className={styles.title}>Yuqori sifatli</h1>
          <p className={styles.descr}>energiya mahsulotlari</p>
        </div>
      </div>
    </div>
  );
};
