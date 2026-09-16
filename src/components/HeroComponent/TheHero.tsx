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
  // Heading level for the hero title. Defaults to "h3" (visual style is
  // class-based, so the level is purely semantic). Pass "h1" on pages where
  // the hero title is the page's main heading and no other h1 exists.
  titleTag?: "h1" | "h2" | "h3";
};

export const TheHero = ({
  title1,
  title2,
  url1,
  url2,
  activeUrl,
  titleTag = "h3",
}: HeroProps) => {
  const t = useTranslations("HomePage");
  const primarySlug = url1.toLowerCase();
  const secondarySlug = url2?.toLowerCase();
  const currentSlug = (activeUrl ?? primarySlug).toLowerCase();
  const heroImage = primarySlug === "microges" ? ges : hero;
  const TitleTag = titleTag;

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
            <TitleTag className={styles.title}>
              {currentSlug === secondarySlug && title2 ? title2 : title1}
            </TitleTag>
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
