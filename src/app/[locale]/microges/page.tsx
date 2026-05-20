"use client";

import { TheHero } from "@/components/HeroComponent/TheHero";
import { TheFeedback } from "@/components/FeedbackComponent/TheFeedback";
import s from "./page.module.scss";
import { useTranslations } from "next-intl";
import { splitText } from "motion-plus";
import { animate, stagger } from "motion";
import { useEffect, useRef } from "react";
import * as motion from "motion/react-client";
import dynamic from "next/dynamic";
import { useLocaleMotionState } from "@/lib/locale-transition";
import {
  Activity,
  BatteryCharging,
  BriefcaseBusiness,
  CircleDollarSign,
  ClipboardCheck,
  Construction,
  Droplets,
  Leaf,
  type LucideIcon,
} from "lucide-react";

const TheMicroMap = dynamic(
  () =>
    import("@/components/MapComponent/TheMicroMap").then(
      (m) => m.TheMicroMap
    ),
  { ssr: false }
);
export default function MicroGes() {
  const t = useTranslations("MicroGesPage");
  const containerRef = useRef<HTMLDivElement>(null);
  const { skipMotion, markViewed } = useLocaleMotionState("microges:intro");

  const listItems = [
    {
      icon: BatteryCharging,
    },
    {
      icon: Droplets,
    },
    {
      icon: Leaf,
    },
    {
      icon: CircleDollarSign,
    },
  ] satisfies Array<{ icon: LucideIcon }>;

  const ServicesItemIcons = [
    {
      icon: ClipboardCheck,
    },
    {
      icon: BriefcaseBusiness,
    },
    {
      icon: Construction,
    },
    {
      icon: Activity,
    },
  ] satisfies Array<{ icon: LucideIcon }>;

  useEffect(() => {
    if (skipMotion) {
      if (containerRef.current) {
        containerRef.current.style.visibility = "visible";
      }
      return;
    }

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
      markViewed();
    });
  }, [markViewed, skipMotion]);

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
              {listItems.map(({ icon: ItemIcon }, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.8 }}
                  className={s.achievement}
                >
                  <ItemIcon
                    className={s.achievementIcon}
                    aria-hidden="true"
                    strokeWidth={1.75}
                  />
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
              {ServicesItemIcons.map(({ icon: ItemIcon }, index) => (
                <li key={index} className={s.listItem}>
                  <ItemIcon className={s.listIcon} aria-hidden="true" />
                  <span>{t(`servicesItem${index + 1}`)}</span>
                </li>
              ))}
            </ul>
          </div>
            <div className={s.schemaBlock}>
            <div className={s.border}>{t("schemaTitle")}</div>
            <div className={s.border}>{t("schemaDescription1")}</div>
            <div className={s.schemaArrowSlot}>
              <svg className={s.topArrows} viewBox="0 0 90 72" aria-hidden>
                <path className={s.arrowStroke} d="M32 62V14" />
                <path className={s.arrowHead} d="M22 24 32 14l10 10" />
                <path className={s.arrowStroke} d="M58 10v48" />
                <path className={s.arrowHead} d="m48 48 10 10 10-10" />
              </svg>
            </div>
            <div className={s.border}>{t("schemaDescription2")}</div>
            <div className={`${s.border} ${s.bg}`}>
              {t("schemaDescription3")}
            </div>
            <div className={s.schemaArrowSlot}>
              <svg className={s.splitArrows} viewBox="0 0 180 82" aria-hidden>
                <path className={s.arrowStroke} d="M76 8 24 60" />
                <path className={s.arrowHead} d="M26 46 24 60l14-2" />
                <path className={s.arrowStroke} d="M104 8 156 60" />
                <path className={s.arrowHead} d="m142 58 14 2-2-14" />
              </svg>
            </div>
            <div>
              <div className={`${s.border} ${s.bg}`}>
                {t("schemaDescription4")}
              </div>
              <div>
                <svg className={s.rightArrow} viewBox="0 0 96 42" aria-hidden>
                  <path className={s.arrowStroke} d="M12 21h64" />
                  <path className={s.arrowHead} d="m64 9 12 12-12 12" />
                </svg>
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
          <div>
            <h2 className={s.title}>{t("mapTitle")}</h2>
            <TheMicroMap />
          </div>
        </div>
      </div>
      <TheFeedback />
    </>
  );
}
