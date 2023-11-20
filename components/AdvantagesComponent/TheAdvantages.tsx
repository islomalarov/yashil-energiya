import "../../scss/globals.scss";

import Image from "next/image";
import styles from "./page.module.scss";
import ExportedImage from "next-image-export-optimizer";
const advantages = [
  {
    src: "/advantage1.svg",
    descr: "Sohada katta tajriba",
  },
  {
    src: "/advantage2.svg",
    descr: "Yuqori sifatli mahsulotlar",
  },
  {
    src: "/advantage3.svg",
    descr: "Respublika bo'ylab 20000 dan ortiq ob'ektlar",
  },
  {
    src: "/advantage4.svg",
    descr: "Turli xil yechimlar",
  },
];
export const TheAdvantages = () => {
  return (
    <div className={styles.main}>
      <div className="container">
        <h3 className={styles.title}>BIZNING AFZALLIKLARIMIZ</h3>
        <div className={styles.advBlock}>
          {advantages.map(({ src, descr }: any) => (
            <div className={styles.adv} key={descr}>
              <Image src={src} width={100} height={100} alt="" />
              <p className={styles.descr}>{descr}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
