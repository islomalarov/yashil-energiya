"use client";
import "@/scss/globals.scss";
import styles from "./page.module.scss";
import { Link } from "@/src/i18n/routing";
import Image from "next/image";
import about from "@/public/about.jpg";
import { useTranslations } from "next-intl";
import TheExcerpt from "../ExcerptComponent/TheExcerpt";
import { motion } from "framer-motion";

export const TheAbout = () => {
  const t = useTranslations("AboutPage");

  return (
    <motion.div
      className="container"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.2 }} // Запускает анимацию, когда 20% компонента вошло в область просмотра
    >
      <div className={styles.content}>
        <div className={styles.info}>
          <h2 className="title">{t("heroTitle1")}</h2>
          <div className={styles.line}></div>
          <TheExcerpt />
          <Link className={`${styles.link} link`} href="/about">
            {t("link")}
          </Link>
        </div>
        <div className={styles.imgBlock}>
          <Image className={styles.img} src={about} alt="about" />
        </div>
      </div>
    </motion.div>
  );
};
