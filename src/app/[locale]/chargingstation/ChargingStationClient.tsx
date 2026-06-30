"use client";

import dynamic from "next/dynamic";
import { useTranslations } from "next-intl";
import { TheFeedback } from "@/components/FeedbackComponent/TheFeedback";
import { TheHero } from "@/components/HeroComponent/TheHero";
import { Link } from "@/i18n/navigation";
import type { EvCharge } from "services/operational-assets.service";
import s from "./page.module.scss";

const TheChSMap = dynamic(
  () =>
    import("@/components/MapComponent/TheChSMap").then((m) => m.TheChSMap),
  { ssr: false },
);

type ChargingStationClientProps = {
  evCharges: EvCharge[];
};

export function ChargingStationClient({
  evCharges,
}: ChargingStationClientProps) {
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
          {statistics.map((need) => (
            <p className="description" key={need}>
              <b>- {t(`${need}.title`)}</b>: {t(`${need}.description`)}
            </p>
          ))}
          <div>
            <h2 className={s.title}>{t("mapTitle")}</h2>
            <TheChSMap stations={evCharges} />
          </div>
          <section className={s.legalNotice}>
            <p>{t("publicOfferNotice")}</p>
            <Link className={s.legalLink} href="/chargingstation/public-offer">
              {t("publicOfferButton")}
            </Link>
          </section>
        </div>
      </div>
      <TheFeedback />
    </>
  );
}
