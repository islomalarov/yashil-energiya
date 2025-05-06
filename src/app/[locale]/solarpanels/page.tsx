"use client";

import "@/scss/globals.scss";
import { TheHero } from "@/src/components/HeroComponent/TheHero";
import { TheFeedback } from "@/src/components/FeedbackComponent/TheFeedback";
import s from "./page.module.scss";
import { useTranslations } from "next-intl";
import { TheMap } from "@/src/components/MapComponent/TheMap";
import { TheChart } from "@/src/components/ChartComponent/TheChart";
import { Icon } from "@iconify/react/dist/iconify.js";
import Image from "next/image";

export default function SolarPanels() {
  const t = useTranslations("SolarPanelsPage");

  return (
    <>
      <TheHero title1={t("heroTitle")} url1="solarPanels" />
      <div className="container">
        <div className={s.content}>
          <h1 className={s.title}>{t("title")}</h1>
          <p className="description">{t("list")}</p>
          <ul className={s.list}>
            <li className={s.listItem}>
              <div>
                <Icon
                  icon="hugeicons:eco-energy"
                  width="2em"
                  height="2em"
                  style={{ color: "#5cb63f" }}
                />
              </div>
              <span>{t("listItem1")}</span>
            </li>
            <li className={s.listItem}>
              <div>
                <Icon
                  icon="hugeicons:renewable-energy"
                  width="2em"
                  height="2em"
                  style={{ color: "#5cb63f" }}
                />
              </div>
              <span>{t("listItem2")}</span>
            </li>
            <li className={s.listItem}>
              <div>
                <Icon
                  icon="hugeicons:cashback"
                  width="2em"
                  height="2em"
                  style={{ color: "#5cb63f" }}
                />
              </div>
              <span>{t("listItem3")}</span>
            </li>
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
          <h2 className={s.title}>{t("mapTitle")}</h2>
          <TheMap />
          <div></div>
          <p className="description">{t("chartDescription")}</p>
          <div>
            <TheChart label={t("chartLabel")} unit={t("chartLabelUnit")} />
          </div>
        </div>
      </div>
      <TheFeedback />
    </>
  );
}
