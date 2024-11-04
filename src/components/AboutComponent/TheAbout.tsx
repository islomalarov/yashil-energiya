import "@/scss/globals.scss";
import styles from "./page.module.scss";
// import Link from "next/link";
import { Link } from "@/src/i18n/routing";
import Image from "next/image";
import about from "@/public/about.jpg";
import { useTranslations } from "next-intl";
import { goals } from "@/data/goals";

export const TheAbout = () => {
  const t = useTranslations("AboutPage");
  return (
    <div className="container">
      <div className={styles.content}>
        <div className={styles.info}>
          <h2 className="title">{t("title")}</h2>
          <div className={styles.line}></div>
          <p className={styles.descr}>
            "Yashil Energiya" MChJ O‘zbekiston Respublikasi Prezidentining
            2023-yil 16-fevraldagi "2023-yilda qayta tiklanuvchi energiya
            manbalarini va energiya tejovchi texnologiyalarni joriy etishni
            jadallashtirish chora-tadbirlari to‘g‘risida"gi PQ-57-sonli qaroriga
            asosan tashkil etilgan.
          </p>
          <p className={styles.descr}>
            "Yashil Energiya" MChJ tashkil etilishidan asosiy maqsad:
          </p>
          {goals.map((goal) => (
            <p key={goal.title} className={styles.descr}>
              - {goal.title}
            </p>
          ))}
          <Link className={`${styles.link} link`} href="/about">
            {t("link")}
          </Link>
        </div>
        <div className={styles.imgBlock}>
          <Image className={styles.img} src={about} alt="about" />
        </div>
      </div>
    </div>
  );
};
