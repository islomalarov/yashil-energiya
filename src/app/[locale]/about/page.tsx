"use client";

import s from "./page.module.scss";
import { TheHero } from "@/components/HeroComponent/TheHero";
import { TheFeedback } from "@/components/FeedbackComponent/TheFeedback";
import { useTranslations } from "next-intl";
import Image from "next/image";
import {
  BadgeCheck,
  Building2,
  Handshake,
  Leaf,
  Rocket,
  Sprout,
  SunMedium,
  Zap,
  type LucideIcon,
} from "lucide-react";
import huawei from "public/partners/huawei.webp";
import solarMan from "public/partners/solarMan.jpg";
import foxEss from "public/partners/foxEss.jpg";
import tosh from "public/partners/tosh.jpg";
import tw from "public/partners/tw.jpg";
import { motion } from "motion/react";
import { useLocaleMotionState } from "@/lib/locale-transition";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";

const eventIcons: Record<string, LucideIcon> = {
  event1: Sprout,
  event2: Zap,
  event3: Handshake,
  event4: Rocket,
};

export default function About() {
  const t = useTranslations("AboutPage");
  const { skipMotion, markViewed } = useLocaleMotionState("about:partners");
  const projects = ["project1", "project2", "project3"] as const;
  const events = ["event1", "event2", "event3", "event4"] as const;
  const achievements = [
    { key: "achievement1", icon: BadgeCheck },
    { key: "achievement2", icon: SunMedium },
    { key: "achievement3", icon: Building2 },
    { key: "achievement4", icon: Leaf },
  ] satisfies Array<{ key: string; icon: LucideIcon }>;

  return (
    <>
      <TheHero
        title1={t("heroTitle1")}
        url1="about"
        title2={t("heroTitle2")}
        url2="ceo"
      />
      <main className={s.page}>
        <section className={s.overview}>
          <div className="container">
            <div className={s.overviewGrid}>
              <div className={s.overviewIntro}>
                <h1 className={s.pageTitle}>{t("heroTitle1")}</h1>
                <p>{t("paragraph1")}</p>
              </div>
              <div className={s.missionPanel}>
                <h3>{t("title1")}</h3>
                <p>{t("paragraph2")}</p>
              </div>
            </div>
          </div>
        </section>

        <section className={s.projectsSection}>
          <div className="container">
            <div className={s.sectionHeader}>
              <h2 className={s.title}>{t("title2")}</h2>
            </div>
            <ul className={s.projectsList}>
              {projects.map((project) => {
                const projectSrc = t(`${project}.src`);
                const projectImageSrc = `/aboutPage/${projectSrc}`;
                return (
                  <li key={project} className={s.projectsItem}>
                    <div className={s.projectMedia}>
                      <Image
                        src={projectImageSrc}
                        alt={projectSrc}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    </div>
                    <div className={s.projectBody}>
                      <p>{t(`${project}.title`)}</p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </section>

        <section className={s.timelineSection}>
          <div className="container">
            <div className={s.sectionHeader}>
              <h2 className={s.title}>{t("timelineTitle")}</h2>
            </div>
            <VerticalTimeline
              animate
              layout="1-column-left"
              lineColor="rgba(18, 144, 62, 0.24)"
              className={s.timeline}
            >
              {events.map((event, eventIndex) => {
                const year = t(`${event}.year`);
                const eventData = t.raw(`${event}.event`);
                const EventIcon = eventIcons[event];

                return (
                  <VerticalTimelineElement
                    key={event}
                    contentArrowStyle={{ borderRightColor: "#ffffff" }}
                    icon={<EventIcon aria-hidden="true" strokeWidth={1.8} />}
                    iconClassName={s.timelineIcon}
                    visible={eventIndex === 0}
                  >
                    <h3 className={s.eventTitle}>{year}</h3>
                    {eventData.length > 0 && (
                      <ul className={s.eventList}>
                        {eventData.map(
                          (ev: { description: string }, index: number) => (
                            <li key={index}>{ev.description}</li>
                          ),
                        )}
                      </ul>
                    )}
                  </VerticalTimelineElement>
                );
              })}
            </VerticalTimeline>
          </div>
        </section>

        <section className={s.achievementsSection}>
          <div className="container">
            <div className={s.sectionHeader}>
              <h2 className={s.title}>{t("title3")}</h2>
            </div>
            <div className={s.achievements}>
              {achievements.map(({ key, icon: AchievementIcon }) => (
                <div key={key} className={s.achievement}>
                  <div className={s.achievementIconWrap}>
                    <AchievementIcon
                      className={s.achievementIcon}
                      aria-hidden="true"
                      strokeWidth={1.8}
                    />
                  </div>
                  <p className={s.achievementDescription}>
                    {t(`${key}.description`)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className={s.partnersSection}>
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
            <div className="container">
              <div className={s.sectionHeader}>
                <h2 className={s.title}>{t("title4")}</h2>
              </div>
              <div className={s.partners}>
                <Image src={tw} alt="tw" />
                <Image src={foxEss} alt="foxEss" />
                <Image src={huawei} alt="huawei" />
                <Image src={tosh} alt="tosh" />
                <Image src={solarMan} alt="solarMan" />
              </div>
            </div>
          </motion.div>
        </section>
      </main>
      <TheFeedback />
    </>
  );
}
