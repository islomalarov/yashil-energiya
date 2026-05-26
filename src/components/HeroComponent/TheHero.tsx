"use client";

import Image from "next/image";
import styles from "./TheHero.module.scss";
import hero from "public/hero.png";
import ges from "public/ges.jpg";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

type HeroProps = {
  title1: string;
  url1: string;
  title2?: string;
  url2?: string;
  activeUrl?: string;
};

export const TheHero = ({ title1, title2, url1, url2, activeUrl }: HeroProps) => {
  const t = useTranslations("HomePage");
  const primarySlug = url1.toLowerCase();
  const secondarySlug = url2?.toLowerCase();
  const currentSlug = (activeUrl ?? primarySlug).toLowerCase();
  const heroImage = primarySlug === "microges" ? ges : hero;

  return (
    <div className={styles.hero}>
      <div className={styles.bgBlock}>
        <Image
          className={styles.bgImage}
          src={heroImage}
          alt=""
          fill
          priority
          fetchPriority="high"
          sizes="100vw"
        />
        <div className="container">
          <div className={styles.info}>
            <h3 className={styles.title}>
              {currentSlug === secondarySlug && title2 ? title2 : title1}
            </h3>
            <div className={styles.links}>
              <Link className={styles.link} href="/">
                {t("title")}
              </Link>
              <span> | </span>
              <Link className={styles.link} href={`/${primarySlug}`}>
                {title1}
              </Link>
              {title2 && secondarySlug && (
                <>
                  <span> | </span>
                  <Link className={styles.link} href={`/${secondarySlug}`}>
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
