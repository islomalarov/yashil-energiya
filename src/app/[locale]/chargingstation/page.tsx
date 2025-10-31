import "@/scss/globals.scss";
import { TheHero } from "@/src/components/HeroComponent/TheHero";
import { TheFeedback } from "@/src/components/FeedbackComponent/TheFeedback";
import s from "./page.module.scss";
import { useTranslations } from "next-intl";
import { TheChSMap } from "@/src/components/MapComponent/TheChSMap";

export default function ChargingStationPage() {
  const t = useTranslations("ChargingStationPage");
  const needs = ["need1", "need2", "need3"] as const;
  const benefits = ["benefit1", "benefit2", "benefit3", "benefit4"] as const;
  const statistics = ["statistic1", "statistic2", "statistic3"] as const;

  return (
    <>
      <TheHero title1={t("heroTitle")} url1="chargingStation" />
      <div className="container">
        <div className={s.content}>
          <h2 className={s.title}>{t("needsTitle")}</h2>
          {needs.map((need, index) => (
            <p className="description" key={need}>
              <b>
                {index + 1}. {t(`${need}.title`)}
              </b>
              : {t(`${need}.description`)}
            </p>
          ))}
          <h2 className={s.title}>{t("benefitsTitle")}</h2>
          {benefits.map((need, index) => (
            <p className="description" key={need}>
              <b>
                {index + 1}. {t(`${need}.title`)}
              </b>
              : {t(`${need}.description`)}
            </p>
          ))}
          <h2 className={s.title}>{t("statisticsTitle")}</h2>
          {statistics.map((need, index) => (
            <p className="description" key={index}>
              <b>- {t(`${need}.title`)}</b>: {t(`${need}.description`)}
            </p>
          ))}
          <div>
            <h2 className={s.title}>{t("mapTitle")}</h2>
            <TheChSMap />
          </div>
        </div>
      </div>
      <TheFeedback />
    </>
  );
}
