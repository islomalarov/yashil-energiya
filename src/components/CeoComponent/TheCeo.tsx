import { ceo } from "@/data/ceo";
import "@/scss/globals.scss";
import styles from "./page.module.scss";

export const TheCeo = () => {
  return (
    <div className={styles.content}>
      {ceo.map(({ id, name, jobTitle, email }: CeoProps) => (
        <div className={styles.ceo} key={id}>
          <h2 className={styles.ceoName}>{name}</h2>
          <div className={styles.block}>
            <p className={styles.descr}>Lavozimi:</p>
            <h3 className={styles.title}>{jobTitle}</h3>
          </div>
          <div className={styles.block}>
            <p className={styles.descr}>Elektron manzil:</p>
            <h3 className={styles.title}>{email}</h3>
          </div>
        </div>
      ))}
    </div>
  );
};
