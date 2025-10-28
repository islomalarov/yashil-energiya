"use client";
import "@/scss/globals.scss";
import { TheHero } from "@/src/components/HeroComponent/TheHero";
import { TheFeedback } from "@/src/components/FeedbackComponent/TheFeedback";
import s from "./page.module.scss";
import { useTranslations } from "next-intl";
import { Icon } from "@iconify/react/dist/iconify.js";
import { splitText } from "motion-plus";
import { animate, stagger } from "motion";
import { useEffect, useRef } from "react";
import * as motion from "motion/react-client";
import { icon } from "leaflet";
import { TheMicroMap } from "@/src/components/MapComponent/TheMicroMap";

export default function MicroGes() {
  const t = useTranslations("MicroGesPage");
  const containerRef = useRef<HTMLDivElement>(null);

  const listItems = [
    {
      icon: "hugeicons:sustainable-energy",
    },
    {
      icon: "hugeicons:water-energy",
    },
    {
      icon: "hugeicons:save-energy-01",
    },
    {
      icon: "hugeicons:cashback",
    },
  ];

  const ServicesItemIcons = [
    {
      icon: "ix:project-server",
    },
    {
      icon: "fa6-solid:business-time",
    },
    {
      icon: "fluent-emoji-high-contrast:building-construction",
    },
    {
      icon: "eos-icons:monitoring",
    },
  ];

  useEffect(() => {
    document.fonts.ready.then(() => {
      if (!containerRef.current) return;

      // Hide the container until the fonts are loaded
      containerRef.current.style.visibility = "visible";

      const { words } = splitText(containerRef.current.querySelector("p")!);

      // Animate the words in the p
      animate(
        words,
        { opacity: [0, 1], y: [10, 0] },
        {
          type: "spring",
          duration: 2,
          bounce: 0,
          delay: stagger(0.05),
        },
      );
    });
  }, []);

  return (
    <>
      <TheHero title1={t("heroTitle")} url1="microGes" />
      <div className="container">
        <div className={s.content}>
          <h1 className={s.title}>{t("title")}</h1>
          <div ref={containerRef}>
            <p className={s.subTitle}>{t("subTitle")}</p>
          </div>
          <div>
            <p className="description">{t("content")}</p>
          </div>
          <div>
            <h2 className={s.title}>{t("listTitle")}</h2>
            <p className="description">{t("listDescription")}</p>
            <div className={s.achievements}>
              {listItems.map((item, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.8 }}
                  className={s.achievement}
                >
                  <Icon icon={item.icon} color="#12903e" fontSize={100} />
                  <p className={s.achievementDescription}>
                    {t(`listItem${index + 1}`)}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
          <div>
            <h2 className={s.title}>{t("servicesTitle")}</h2>
            <ul className={s.list}>
              {ServicesItemIcons.map((item, index) => (
                <li key={index} className={s.listItem}>
                  <div>
                    <Icon
                      icon={item.icon}
                      width="2em"
                      height="2em"
                      style={{ color: "#12903e" }}
                    />
                  </div>
                  <span>{t(`servicesItem${index + 1}`)}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className={s.schemaBlock}>
            <div className={s.border}>{t("schemaTitle")}</div>
            <div className={s.border}>{t("schemaDescription1")}</div>
            <div>
              <Icon
                icon="fontisto:arrow-swap"
                fontSize={50}
                style={{
                  color: "#12903e",
                  rotate: "90deg",
                }}
              />
            </div>
            <div className={s.border}>{t("schemaDescription2")}</div>
            <div className={`${s.border} ${s.bg}`}>
              {t("schemaDescription3")}
            </div>
            <div>
              <Icon
                icon="fontisto:arrow-up-l"
                fontSize={50}
                style={{
                  color: "#12903e",
                  rotate: "-135deg",
                }}
              />
              <Icon
                icon="fontisto:arrow-up-l"
                fontSize={50}
                style={{
                  color: "#12903e",
                  rotate: "-45deg",
                }}
              />
            </div>
            <div>
              <div className={`${s.border} ${s.bg}`}>
                {t("schemaDescription4")}
              </div>
              <div>
                <Icon
                  icon="fontisto:arrow-up-l"
                  fontSize={50}
                  style={{
                    color: "#12903e",
                    rotate: "90deg",
                  }}
                />
              </div>
              <div className={`${s.border} ${s.bg}`}>
                {t("schemaDescription5")}
              </div>
            </div>
          </div>
          <div>
            <h2 className={s.title}>{t("docsTitle")}</h2>
            <p className="description">{t("docsDescription")}</p>
          </div>
          <div>
            <h2 className={s.title}>{t("projectsTitle")}</h2>
            <p className="description">{t("projectsDescription")}</p>
          </div>
          <div>
            <h2 className={s.title}>{t("futuresTitle")}</h2>
            <p className="description">{t("futuresDescription")}</p>
          </div>
        </div>
        <div>
          <h2 className={s.title}>{t("mapTitle")}</h2>
          <TheMicroMap />
        </div>
      </div>
      <TheFeedback />
    </>
  );
}
