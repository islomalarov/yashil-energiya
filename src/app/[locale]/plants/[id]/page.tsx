import s from "./page.module.scss";
import { TheHero } from "@/src/components/HeroComponent/TheHero";
import { TheFeedback } from "@/src/components/FeedbackComponent/TheFeedback";
import { useTranslations } from "next-intl";
import { plants } from "@/data/plants";
import { EmblaOptionsType } from "embla-carousel";
import TheCarousel from "@/src/components/CarouselComponent/TheCarousel";

type Props = {
  params: {
    id: string;
  };
};

export default function Plant({ params: { id } }: Props) {
  const t = useTranslations("PlantDetail");
  const plant = plants.find(({ plantCode }) => plantCode === id);
  const {
    plantName,
    plantAddress,
    plantPower,
    plantPowerFactorDate,
    averageAnnualProduction,
    coalSaved,
    unit,
    co2Saved,
    treesSaved,
    slidesCount,
  } = plant || {};

  const OPTIONS: EmblaOptionsType = { align: "start", loop: true };
  const SLIDES = Array.from(Array(slidesCount).keys());

  return (
    <>
      <TheHero title1={t("heroTitle")} url1="plants" />
      <div className="container">
        <h2 className={s.title}>{plantName}</h2>
        <div className={s.content}>
          <TheCarousel plantCode={id} slides={SLIDES} options={OPTIONS} />
          <div className={s.infoBlock}>
            <div className={s.addressBlock}>
              <b>{t("location")}</b>
              <span>{plantAddress}</span>
            </div>
            <div className={s.addressBlock}>
              <b>{t("power")}</b>
              <p>
                {plantPower} {t("powerUnit")}
              </p>
            </div>
            <div className={s.addressBlock}>
              <b>{t("gridConnection")}</b>
              <span>{plantPowerFactorDate}</span>
            </div>
            <div className={s.addressBlock}>
              <b>{t("averageAnnualProduction")}</b>
              <p>
                {averageAnnualProduction} {t("averageAnnualProductionUnit")}
              </p>
            </div>
            <div className={s.addressBlock}>
              <b>{t("coalSaved")}</b>
              <p>
                {coalSaved} {unit && t(`${unit}`)} {t("coalSavedUnit")}
              </p>
            </div>
            <div className={s.addressBlock}>
              <b>{t("co2Saved")}</b>
              <p>
                {co2Saved} {unit && t(`${unit}`)} {t("co2SavedUnit")}
              </p>
            </div>
            <div className={s.addressBlock}>
              <b>{t("treesSaved")}</b>
              <p>{treesSaved}</p>
            </div>
          </div>
        </div>
      </div>
      <TheFeedback />
    </>
  );
}
