"use client";
import "@/scss/globals.scss";
import styles from "./TheHero.module.scss";
import Image from "next/image";
import hero from "@/public/hero.png";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/src/i18n/navigation";

export const TheHero = ({ title1, title2, url1, url2 }: HeroProps) => {
  const t = useTranslations("HomePage");
  const pathname = usePathname().replace("/", "");

  return (
    <div className={styles.hero}>
      <div className={styles.bgBlock}>
        <Image src={hero} alt="hero-2" priority />
      </div>
      <div className="container">
        <div className={styles.info}>
          <h1 className={styles.title}>
            {pathname === url1 ? title1 : title2}
          </h1>
          <div className={styles.links}>
            <Link className={styles.link} href="/">
              {t("title")}
            </Link>
            <span> | </span>
            <Link className={styles.link} href={`/${url1}`}>
              {title1}
            </Link>
            {title2 && (
              <>
                <span> | </span>
                <Link className={styles.link} href={`/${url2}`}>
                  {title2}
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
