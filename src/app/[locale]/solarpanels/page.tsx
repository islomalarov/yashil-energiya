"use client";

import { TheHero } from "@/components/HeroComponent/TheHero";
import { TheFeedback } from "@/components/FeedbackComponent/TheFeedback";
import s from "./page.module.scss";
import { useTranslations } from "next-intl";
import dynamic from "next/dynamic";
import { TheChart } from "@/components/ChartComponent/TheChart";
import { Icon } from "@iconify/react/dist/iconify.js";
import Image from "next/image";

const ThePlantsMap = dynamic(
  () => import("@/components/MapComponent/ThePlantsMap").then((m) => m.ThePlantsMap),
  { ssr: false }
);

export default function SolarPanels() {
  const t = useTranslations("SolarPanelsPage");
  const itemIcons = [
    "hugeicons:eco-energy",
    "hugeicons:renewable-energy",
    "hugeicons:cashback",
  ];
  return (
    <>
      <TheHero title1={t("heroTitle")} url1="solarPanels" />
      <div className="container">
        <div className={s.content}>
          <h1 className={s.title}>{t("title")}</h1>
          <p className="description">{t("list")}</p>
          <ul className={s.list}>
            {itemIcons.map((icon, index) => (
              <li key={index} className={s.listItem}>
                <div>
                  <Icon
                    icon={icon}
                    width="2em"
                    height="2em"
                    style={{ color: "#5cb63f" }}
                  />
                </div>
                <span>{t(`listItem${index + 1}`)}</span>
              </li>
            ))}
          </ul>
          <p className="description">{t("content.description1")}</p>
          <p className="description">{t("content.description2")}</p>
          <h2 className={s.title}>{t("systemTitle")}</h2>
          <div className={s.systemsBlock}>
            <p className="description">
              <b> {t("system1.title")} </b> - {t("system1.description")}
            </p>
            <div>
              <Image
                src="/solarPanelsPage/on-grid.png"
                alt="system1"
                width={300}
                height={300}
                className={s.image}
              />
            </div>

            <p className="description">
              <b>{t("system2.title")}</b> - {t("system2.description")}
            </p>
            <div>
              <Image
                src="/solarPanelsPage/off-grid.avif"
                alt="system1"
                width={300}
                height={300}
                className={s.image}
              />
            </div>
            <p className="description">
              <b>{t("system3.title")}</b> - {t("system3.description")}
            </p>
          </div>
          <div>
            <h2 className={s.title}>{t("mapTitle")}</h2>
            <ThePlantsMap />
          </div>
          <div>
            <p className="description">{t("chartDescription")}</p>
            <div style={{ width: "100%", height: 360 }}>
            <TheChart unit={t("chartLabelUnit")} />
            </div>
          </div>
        </div>
      </div>
      <TheFeedback />
    </>
  );
}
