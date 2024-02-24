import "../../scss/globals.scss";
import styles from "./page.module.scss";

const ceo = [
  {
    name: "Mirzayev Bexzod Mirzaaliyevich",
    jobTitle: "Direktor",
    phone: "(+998 90) 90 830-31-33",
    mail: "b.mirzayev@yashil-energiya.uz",
  },
  // {
  //   name: "Mirzayev Bexzod Mirzaaliyevich",
  //   jobTitle: "Direktor o'rinbosari",
  //   phone: "(+998 90) 90 830-31-33",
  //   mail: "b.mirzayev@yashil-energiya.uz",
  // },
  {
    name: "Sharifjonov Ikrom Ilhomboy o'g'li",
    jobTitle: "Texnik masalalar bosh boshqarmasi boshlig'i",
    phone: "(+998 90) 90 830-31-16",
    mail: "i.sharifjonov@yashil-energiya.uz",
  },
  {
    name: "Nazirxanov Jaxongir Jalaliddinovich",
    jobTitle: "Mijozlar bilan ishlash xizmati boshlig'i",
    phone: "(+998 90) 90 830-31-39",
    mail: "j.nazirxanov@yashil-energiya.uz",
  },
];

export const TheCeo = () => {
  return (
    <div className={styles.content}>
      {ceo.map(({ name, jobTitle, phone, mail }: any) => (
        <div className={styles.ceo} key={mail}>
          <h1 className={styles.ceoName}>{name}</h1>
          <div className={styles.block}>
            <p className={styles.descr}>Должность: </p>
            <h3 className={styles.title}>{jobTitle}</h3>
          </div>
          <div className={styles.block}>
            <p className={styles.descr}>Телефон: </p>
            <h3 className={styles.title}>{phone}</h3>
          </div>
          <div className={styles.block}>
            <p className={styles.descr}>Электронная почта: </p>
            <h3 className={styles.title}>{mail}</h3>
          </div>
        </div>
      ))}
    </div>
  );
};
