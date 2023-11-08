import styles from "./page.module.scss";
import "../../scss/globals.scss";

export const TheSlider = () => {
  return (
    <div className={styles.hero}>
      <div className={styles.bgBlock}>
        <img className={styles.bg} src="hero.png" alt="" />
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
