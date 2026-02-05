import s from "./page.module.scss";
import { TheHero } from "@/components/HeroComponent/TheHero";
import { TheFeedback } from "@/components/FeedbackComponent/TheFeedback";
import { EmblaOptionsType } from "embla-carousel";
import TheCarousel from "@/components/CarouselComponent/TheCarousel";
import { PlantService } from "services/plants.service";
import { getLocale, getTranslations } from "next-intl/server";

type Props = {
  params: {
    id: string;
  };
};

export default async function Plant({ params: { id } }: Props) {
  const locale = await getLocale();
  const t = await getTranslations("PlantDetail");
  const {
    title,
    address,
    power,
    date,
    production,
    coal,
    gases,
    trees,
    pictures,
  } = await PlantService.getPlantById(id, locale);

  const OPTIONS: EmblaOptionsType = { align: "start", loop: true };

  return (
    <>
      <TheHero title1={t("heroTitle")} url1="plants" />
      <div className="container">
        <h2 className={s.title}>{title}</h2>
        <div className={s.content}>
          <TheCarousel pictures={pictures} options={OPTIONS} />
          <div className={s.infoBlock}>
            <div className={s.addressBlock}>
              <b>{t("location")}</b>
              <span>{address}</span>
            </div>
            <div className={s.addressBlock}>
              <b>{t("power")}</b>
              <p>{power}</p>
            </div>
            <div className={s.addressBlock}>
              <b>{t("gridConnection")}</b>
              <span>{date}</span>
            </div>
            <div className={s.addressBlock}>
              <b>{t("averageAnnualProduction")}</b>
              <p>{production}</p>
            </div>
            <div className={s.addressBlock}>
              <b>{t("coalSaved")}</b>
              <p>{coal}</p>
            </div>
            <div className={s.addressBlock}>
              <b>{t("co2Saved")}</b>
              <p>{gases}</p>
            </div>
            <div className={s.addressBlock}>
              <b>{t("treesSaved")}</b>
              <p>{trees}</p>
            </div>
          </div>
        </div>
      </div>
      <TheFeedback />
    </>
  );
}
