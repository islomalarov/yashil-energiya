"use client";

import styles from "./TheHero.module.scss";
import Image from "next/image";
import hero from "public/hero.png";
import ges from "public/ges.jpg";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";

type HeroProps = {
  title1: string;
  url1: string;
  title2?: string;
  url2?: string;
};

export const TheHero = ({ title1, title2, url1, url2 }: HeroProps) => {
  const t = useTranslations("HomePage");
  const pathname = usePathname().replace("/", "");

  return (
    <div className={styles.hero}>
      <div className={styles.bgBlock}>
        <Image src={pathname === "microGes" ? ges : hero} alt="hero" priority />
        <div className="container">
          <div className={styles.info}>
            <h3 className={styles.title}>
              {pathname === url1 ? title1 : title2}
            </h3>
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
    </div>
  );
};
