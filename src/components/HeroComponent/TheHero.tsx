"use client";
import "@/scss/globals.scss";
import styles from "./page.module.scss";
// import Link from "next/link";
import { Link } from "@/src/i18n/routing";
import { usePathname } from "next/navigation";
import Image from "next/image";
import hero from "@/public/hero2.png";
import { useTranslations } from "next-intl";

export const TheHero = ({ title1, title2, url1, url2 }: HeroProps) => {
  const t = useTranslations("HomePage");
  const pathname = usePathname().slice(4);

  return (
    <div className={styles.hero}>
      <div className={styles.bgBlock}>
        <Image width={720} height={315} src={hero} alt="hero-2" priority />
      </div>
      <div className="container">
        <div className={styles.info}>
          {pathname === url1 ? (
            <h1 className={styles.title}>{title1}</h1>
          ) : (
            <h1 className={styles.title}>{title2}</h1>
          )}
          <div className={styles.descr}>
            <Link href="/">{t("title")}</Link>
            <span> | </span>
            <Link href={`/${url1}`}>{title1}</Link>
            {title2 && (
              <>
                <span> | </span> <Link href={`/${url2}`}>{title2}</Link>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
