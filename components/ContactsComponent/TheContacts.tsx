import "../../scss/globals.scss";
import styles from "./page.module.scss";

export const TheContacts = () => {
  return (
    <div>
      <h1 className="title">Kontaktlar</h1>
      <div className={styles.info}>
        <div className={styles.block}>
          <h2>Telefon raqami</h2>
          <p>+998 90 830-20-00</p>
        </div>
        <div className={styles.block}>
          <h2>Manzil</h2>
          <p>Toshkent shahri, Yashnobod tumani, Istiqbol ko'chasi, 21-uy</p>
        </div>
        <div className={styles.block}>
          <h2>Mo'ljal</h2>
          <p>Westminster chorraxasi</p>
        </div>
        <div className={styles.block}>
          <h2>Email</h2>
          <p>info@yashil-energiya.uz</p>
        </div>
      </div>
    </div>
  );
};
