import "../../scss/globals.scss";
import styles from "./page.module.scss";

export const TheContacts = () => {
  return (
    <div>
      <h1 className="title">Kontaktlar</h1>
      <div className={styles.info}>
        <div className={styles.block}>
          <h3>Telefon raqami</h3>
          <p>+998 90 830-20-00</p>
        </div>
        <div className={styles.block}>
          <h3>Adres</h3>
          <p>Toshkent shahri, Yashnobod tumani, Istiqbol ko'chasi, 21-uy</p>
        </div>
        <div className={styles.block}>
          <h3>Mo'ljal</h3>
          <p>Westminster chorraxasi</p>
        </div>
        <div className={styles.block}>
          <h3>Email</h3>
          <p>info@yashil-energiya.uz</p>
        </div>
      </div>
    </div>
  );
};
