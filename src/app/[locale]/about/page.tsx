import "@/scss/globals.scss";
import styles from "./page.module.scss";
import { TheHero } from "@/src/components/HeroComponent/TheHero";
import { TheFeedback } from "@/src/components/FeedbackComponent/TheFeedback";
import Image from "next/image";
import { useTranslations } from "next-intl";
import TheExcerpt from "@/src/components/ExcerptComponent/TheExcerpt";

export default function About() {
  const t = useTranslations("AboutPage");
  return (
    <>
      <TheHero
        title1={t("heroTitle1")}
        url1="about"
        title2={t("heroTitle2")}
        url2="ceo"
      />
      <div className="container">
        <div className={styles.content}>
          <div className={styles.info}>
            <TheExcerpt />
          </div>
          <div className={styles.imgBlock}>
            <Image
              className={styles.img}
              width={1280}
              height={720}
              src="/minenergy.jpg"
              alt="about"
            />
          </div>
        </div>
      </div>
      <TheFeedback />
    </>
  );
}
