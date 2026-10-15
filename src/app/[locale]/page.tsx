
import { TheAbout } from "@/components/AboutComponent/TheAbout";
import { TheSlider } from "@/components/SliderComponent/TheSlider";
import { TheAdvantages } from "@/components/AdvantagesComponent/TheAdvantages";
import { TheCalculatorCta } from "@/components/CalculatorCtaComponent/TheCalculatorCta";
import { TheLastNews } from "@/components/LastNewsComponent/TheLastNews";
import { TheLinks } from "@/components/LinksComponent/TheLinks";
import { TheFeedback } from "@/components/FeedbackComponent/TheFeedback";
import { TheLastPlants } from "@/components/LastPlantsComponent/TheLastPlants";
import { setRequestLocale } from "next-intl/server";

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <>
      <TheSlider />
      <TheAbout />
      <TheAdvantages />
      <TheCalculatorCta />
      <TheLastPlants />
      <TheLastNews />
      <TheLinks />
      <TheFeedback />
    </>
  );
}
