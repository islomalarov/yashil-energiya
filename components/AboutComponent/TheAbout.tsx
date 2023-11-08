import Image from "next/image";
import "../../scss/globals.scss";
import styles from "./page.module.scss";
import Link from "next/link";

export const TheAbout = () => {
  return (
    <div className="container">
      <div className={styles.content}>
        <div className={styles.info}>
          <h2 className="title">Kompaniya haqida</h2>
          <div className={styles.line}></div>
          <p className={styles.descr}>
            "Yashil Energiya" MCHJ O'zbekiston Respublikasi Prezidentining 2023
            yil 16 fevraldagi "2023 yilda qayta tiklanuvchi energiya manbalarini
            va energiya tejovchi texnologiyalarni joriy etishni jadallashtirish
            chora-tadbirlari tugrisida"gi PQ-57-sonli qaroriga asosan tashkil
            etilgan.
          </p>
          <p className={styles.descr}>
            "Yashil Energiya" MCHJ tashkil etishdan asosiy maqsad:
            <br />
            <span>
              - qayta tiklanuvchi energiya manbalari qurilmalarini o'rnatish va
              ularni ekspluatatsiya qilish;
            </span>
            <br />
            <span>
              - qayta tiklanuvchi energiya manbalari qurilmalari orqali ishlab
              chiqarilgan elektr energiyasini iste’molchilarga yetkazish;
            </span>
            <br />
            <span>
              - respublika xududlarida o'rnatilgan qayta tiklanuvchi energiya
              manbalari qurilmalariga servis va texnik xizmat ko'rsatish.
            </span>
          </p>
          <Link className={styles.link} href="/about">
            Batafsil
          </Link>
        </div>
        <img src="/about.png" alt="logo" />
      </div>
    </div>
  );
};
