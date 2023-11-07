import "../../scss/globals.scss";
import styles from "./page.module.scss";

export const TheContacts = () => {
  return (
    <div>
      <h1 className="title">Kontaktlar</h1>
      <div className={styles.info}>
        <div className={styles.block}>
          <h3>Telefon raqami</h3>
          <p>+99 893 505 45 05</p>
        </div>
        <div className={styles.block}>
          <h3>Adres</h3>
          <p>Узбекистан, г. ТашкентУл. Темур Малик, дом 17а</p>
        </div>
        <div className={styles.block}>
          <h3>Mo'ljal</h3>
          <p>Перекрёсток Чимган, ориентир Экo базар, кафе Хан Атлас</p>
        </div>
        <div className={styles.block}>
          <h3>Email</h3>
          <p>info@yashil.com</p>
        </div>
      </div>
    </div>
  );
};
