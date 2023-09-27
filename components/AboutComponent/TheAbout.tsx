import Image from "next/image";
import "../../scss/globals.scss";
import styles from "./page.module.scss";
import Link from "next/link";

export const TheAbout = () => {
  return (
    <div className="container">
      <div className={styles.content}>
        <div className={styles.info}>
          <h2 className="title">О компании</h2>
          <div className={styles.line}></div>
          <p className={styles.descr}>
            "Yashil Energiya" МЧЖ Узбекистон Республикаси Президентининг 2023
            йил 16 февралдаги "2023 йилда кайта тикланувчи энергия манбаларини
            ва энергия тежовчи технологияларни жорий этишни жадаллаштириш
            чора-тадбирлари тугрисида"ги ПК-57-сонли карорига асосан ташкил
            этилган.
          </p>
          <p className={styles.descr}>
            "Yashil Energiya" МЧЖ ташкил этишдан асосий максад:
            <br />
            <span>
              - кайта тикланувчи энергия манбалари курилмаларини урнатиш ва
              уларни эксплкатация килиш;
            </span>
            <br />
            <span>
              - кайта тикланувчи энергия манбалари курилмалари оркали ишлаб
              чикарилган электр энергиясини истеъмолчиларга етказиш;
            </span>
            <br />
            <span>
              - республика худудларида урнатилган кайта тикланувчи энергия
              манбалари курилмаларига сервис ва техник хизмат курсатиш.
            </span>
          </p>
          <Link className={styles.link} href="/about">
            Подробнее
          </Link>
        </div>
        <Image src="/about.png" alt="logo" width={620} height={680} priority />
      </div>
    </div>
  );
};
