import "../../scss/globals.scss";
import { TheHero } from "@/components/HeroComponent/TheHero";
import { TheForm } from "@/pages/TheForm";
import styles from "./page.module.scss";

const departments = [
  {
    department: "Moliyaviy rivojlanish bo'limi",
    phone: "(+998 90) 830-31-09",
    mail: "info@yashil-energiya.uz",
  },
  {
    department: "Marketing va xaridlar bo'limi",
    phone: "(+998 90) 830-31-36",
    mail: "info@yashil-energiya.uz",
  },
  {
    department: "Mijozlar bilan ishlash xizmati",
    phone: "(+998 90) 830-31-39",
    mail: "info@yashil-energiya.uz",
  },
];
export default function Contacts() {
  return (
    <>
      <TheHero title1={"Kontaktlar"} url1="contacts" />
      <div className="container">
        <div className={styles.content}>
          <div className={styles.map}>
            <div className={styles.companyInfo}>
              <h1>Офис в Ташкенте</h1>
              <div>
                <div className={styles.descr}>Adres:</div>
                <div className={styles.info}>
                  Toshkent shahri, Yashnobod tumani, ISTIQBOL KO'CHASI, 21-UY
                </div>
              </div>
              <div>
                <div className={styles.descr}>Telefon raqam:</div>
                <div className={styles.info}>+998 90 830-20-00</div>
              </div>
              <div>
                <div className={styles.descr}>Elektron pochta:</div>
                <div className={styles.info}>info@yashil-energiya.uz</div>
              </div>
            </div>
            <div className={styles.frameBlock}>
              <iframe
                className={styles.frame}
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d374.6370159083452!2d69.28471608621962!3d41.30677237355712!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38ae8b5d95666d57%3A0x3ca78619122addda!2z0JzQuNC90LjRgdGC0LXRgNGB0YLQstC-INCt0L3QtdGA0LPQtdGC0LjQutC4!5e0!3m2!1sru!2s!4v1699620247141!5m2!1sru!2s"
                loading="lazy"
                frameBorder="none"
              ></iframe>
            </div>
          </div>
          <div className={styles.departments}>
            {departments.map(({ department, phone, mail }) => (
              <div className={styles.department} key={phone}>
                <h3 className={styles.title}>{department}</h3>
                <div>
                  <div className={styles.descr}>Telefon raqami:</div>
                  <div className={styles.info}>{phone}</div>
                </div>
                <div>
                  <div className={styles.descr}>Elektron pochta:</div>
                  <div className={styles.info}>{mail}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className={styles.main}>
        <div className="container">
          <div className={styles.block}>
            <TheForm />
          </div>
        </div>
      </div>
    </>
  );
}
