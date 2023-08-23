import Image from "next/image";
import "../../scss/globals.scss";
import styles from "./page.module.scss";
import Link from "next/link";

export const TheAdvantages = () => {
  return (
    <div className={styles.main}>
      <div className="container">
        <h3 className={styles.title}>Наши преимущества</h3>
        <div className={styles.advBlock}>
          <div className={styles.adv}>
            <Image src="/advantage1.svg" width={100} height={100} alt="" />
            <p className={styles.descr}>Большой опыт работы в сфере</p>
          </div>
          <div className={styles.adv}>
            <Image src="/advantage2.svg" width={100} height={100} alt="" />
            <p className={styles.descr}>Высокое качество продукции</p>
          </div>
          <div className={styles.adv}>
            <Image src="/advantage3.svg" width={100} height={100} alt="" />
            <p className={styles.descr}>
              Более 20 000 объектов по всей республике
            </p>
          </div>
          <div className={styles.adv}>
            <Image src="/advantage4.svg" width={100} height={100} alt="" />
            <p className={styles.descr}>Широкий выбор решений</p>
          </div>
        </div>
      </div>
    </div>
  );
};
