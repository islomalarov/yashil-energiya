import { branches } from "@/data/branches";
import "../../scss/globals.scss";
import styles from "./page.module.scss";

export const TheBranches = () => {
  return (
    <div className={styles.content}>
      <h1 className={styles.titleB}>
        "Yashil Energiya" MChJ ning hududiy servis markazlari
      </h1>
      {branches.map(({ title, name, phone, adres, mail }: any) => (
        <div className={styles.ceo} key={mail}>
          <h2 className={styles.ceoName}>{title}</h2>
          <div className={styles.block}>
            <p className={styles.descr}>Filial rahbari: </p>
            <h3 className={styles.title}>{name}</h3>
          </div>
          <div className={styles.block}>
            <p className={styles.descr}>Telefon raqami: </p>
            <h3 className={styles.title}>{phone}</h3>
          </div>
          <div className={styles.block}>
            <p className={styles.descr}>Filial manzili: </p>
            <h3 className={styles.title}>{adres}</h3>
          </div>
          <div className={styles.block}>
            <p className={styles.descr}>Elektron manzil: </p>
            <h3 className={styles.title}>{mail}</h3>
          </div>
        </div>
      ))}
    </div>
  );
};
