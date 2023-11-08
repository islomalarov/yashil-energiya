import Image from "next/image";
import "../../scss/globals.scss";
import styles from "./page.module.scss";

export const TheAdvantages = () => {
  return (
    <div className={styles.main}>
      <div className="container">
        <h3 className={styles.title}>BIZNING AFZALLIKLARIMIZ</h3>
        <div className={styles.advBlock}>
          <div className={styles.adv}>
            <Image src="/advantage1.svg" width={100} height={100} alt="" />
            <p className={styles.descr}>Sohada katta tajriba</p>
          </div>
          <div className={styles.adv}>
            <Image src="/advantage2.svg" width={100} height={100} alt="" />
            <p className={styles.descr}>Yuqori sifatli mahsulotlar</p>
          </div>
          <div className={styles.adv}>
            <Image src="/advantage3.svg" width={100} height={100} alt="" />
            <p className={styles.descr}>
              Respublika bo'ylab 20000 dan ortiq ob'ektlar
            </p>
          </div>
          <div className={styles.adv}>
            <Image src="/advantage4.svg" width={100} height={100} alt="" />
            <p className={styles.descr}>Turli xil yechimlar</p>
          </div>
        </div>
      </div>
    </div>
  );
};
