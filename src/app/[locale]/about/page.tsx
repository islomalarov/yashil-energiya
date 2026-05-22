"use client";

import s from "./page.module.scss";
import { TheHero } from "@/components/HeroComponent/TheHero";
import { TheFeedback } from "@/components/FeedbackComponent/TheFeedback";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { Icon } from "@iconify/react";
import huawei from "public/partners/huawei.webp";
import solarMan from "public/partners/solarMan.jpg";
import foxEss from "public/partners/foxEss.jpg";
import tosh from "public/partners/tosh.jpg";
import tw from "public/partners/tw.jpg";
import { motion } from "motion/react";
import { useLocaleMotionState } from "@/lib/locale-transition";

export default function About() {
  const t = useTranslations("AboutPage");
  const { skipMotion, markViewed } = useLocaleMotionState("about:partners");
  const projects = ["project1", "project2", "project3"] as const;
  const achievements = [
    "achievement1",
    "achievement2",
    "achievement3",
    "achievement4",
  ] as const;

  return (
    <>
      <TheHero
        title1={t("heroTitle1")}
        url1="about"
        title2={t("heroTitle2")}
        url2="ceo"
      />
      <div className="container">
        <div className={s.content}>
          <div className={s.titleBlock}>
            <p>{t("paragraph1")}</p>
          </div>
          <div className={s.descriptionBlock}>
            <h2 className={s.title}>{t("title1")}:</h2>
            <p>{t("paragraph2")}</p>
          </div>
          <div className={s.projectsBlock}>
            <h2 className={s.title}>{t("title2")}</h2>
            <ul className={s.projectsList}>
              {projects.map((project) => {
                const projectSrc = t(`${project}.src`);
                const projectImageSrc = `/aboutPage/${projectSrc}`; 
                return (
                  <li key={project} className={s.projectsItem}>
                    <div>
                      <Image
                        className={s.projectAva}
                        src={projectImageSrc}
                        alt={projectSrc}
                        width={300}
                        height={200}
                      />
                    </div>
                    <p>{t(`${project}.title`)}</p>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className={s.achievementsBlock}>
            <h2 className={s.title}>{t("title3")}</h2>
            <div className={s.achievements}>
              {achievements.map((achievement) => (
                <div key={achievement} className={s.achievement}>
                  <Icon
                    className={s.achievementIcon}
                    icon={t(`${achievement}.src`)}
                    aria-hidden="true"
                  />
                  <p className={s.achievementDescription}>
                    {t(`${achievement}.description`)}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <motion.div
            className={s.partnersBlock}
            initial={skipMotion ? false : { opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={
              skipMotion ? { duration: 0 } : { duration: 0.8, ease: "easeOut" }
            }
            viewport={{ once: true, amount: 0.2 }}
            onViewportEnter={markViewed}
          >
            <h3 className={s.title}>{t("title4")}</h3>
            <div className={s.partners}>
              <Image src={tw} alt="tw" />
              <Image src={foxEss} alt="foxEss" />
              <Image src={huawei} alt="huawei" />
              <Image src={tosh} alt="tosh" />
              <Image src={solarMan} alt="solarMan" />
            </div>
          </motion.div>
        </div>
      </div>
      <TheFeedback />
    </>
  );
}
