import s from "./page.module.scss";
import { TheHero } from "@/components/HeroComponent/TheHero";
import { TheFeedback } from "@/components/FeedbackComponent/TheFeedback";
import { EmblaOptionsType } from "embla-carousel";
import TheCarousel from "@/components/CarouselComponent/TheCarousel";
import { PlantService } from "services/plants.service";
import { getTranslations } from "next-intl/server";
import { redirect } from "@/i18n/navigation";
import type { Metadata } from "next";
import { breadcrumbJsonLd, createMetadata, powerPlantJsonLd } from "@/lib/seo";
import { TheJsonLd } from "@/components/JsonLd/TheJsonLd";

type Props = {
  params: Promise<{
    locale: string;
    id: string;
  }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id, locale } = await params;
  const plant = await PlantService.getPlantById(id, locale);

  if (!plant) {
    return {};
  }

  return createMetadata({
    locale,
    path: `/plants/${id}`,
    title: plant.title,
    description: `${plant.address}. Power: ${plant.power}. Average annual production: ${plant.production}.`,
    image: plant.pictures[0]?.url,
    type: "article",
    alternateLocales: ["en", "ru"],
  });
}

export default async function Plant({ params }: Props) {
  const { id, locale } = await params;
  if (locale === "uz") {
    redirect({ href: `/plants/${id}`, locale: "en" });
  }

  const t = await getTranslations({ locale, namespace: "PlantDetail" });
  
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
      <TheJsonLd
        data={[
          powerPlantJsonLd({
            locale,
            id,
            title,
            address,
            power,
            image: pictures[0]?.url,
          }),
          breadcrumbJsonLd(locale, [
            { name: t("heroTitle"), path: "/plants" },
            { name: title, path: `/plants/${id}` },
          ]),
        ]}
      />
      <TheHero title1={t("heroTitle")} url1="plants" />
      <div className="container">
        <h2 className={s.title}>{title}</h2>
        <div className={s.content}>
          <TheCarousel pictures={pictures} title={title} options={OPTIONS} />
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
