import styles from "./page.module.scss";
import "../../scss/globals.scss";

export const TheSlider = () => {
  return (
    <div className={styles.hero}>
      <img className={styles.bg} src="hero.png" alt="" />
      <div className="container">
        <div className={styles.info}>
          <h1 className={styles.title}>Высокое качество</h1>
          <p className={styles.descr}>энергетической продукции</p>
        </div>
      </div>
    </div>
  );
};
