"use client";

import dynamic from "next/dynamic";
import { useTranslations } from "next-intl";
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
import { TheFeedback } from "@/components/FeedbackComponent/TheFeedback";
import { TheHero } from "@/components/HeroComponent/TheHero";
import type { Mhp } from "services/operational-assets.service";
import s from "./page.module.scss";

const TheMicroMap = dynamic(
  () =>
    import("@/components/MapComponent/TheMicroMap").then(
      (m) => m.TheMicroMap,
    ),
  { ssr: false },
);

type MicroGesClientProps = {
  mhps: Mhp[];
};

export function MicroGesClient({ mhps }: MicroGesClientProps) {
  const t = useTranslations("MicroGesPage");

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

  return (
    <>
      <TheHero title1={t("heroTitle")} url1="microGes" />
      <div className="container">
        <div className={s.content}>
          <h1 className={s.title}>{t("title")}</h1>
          <div>
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
                <div key={index} className={s.achievement}>
                  <ItemIcon
                    className={s.achievementIcon}
                    aria-hidden="true"
                    strokeWidth={1.75}
                  />
                  <p className={s.achievementDescription}>
                    {t(`listItem${index + 1}`)}
                  </p>
                </div>
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
            <TheMicroMap plants={mhps} />
          </div>
        </div>
      </div>
      <TheFeedback />
    </>
  );
}
