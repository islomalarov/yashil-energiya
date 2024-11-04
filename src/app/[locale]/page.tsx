import "@/scss/globals.scss";
import { TheAbout } from "@/src/components/AboutComponent/TheAbout";
import { TheSlider } from "@/src/components/SliderComponent/TheSlider";
import { TheAdvantages } from "@/src/components/AdvantagesComponent/TheAdvantages";
import { TheLastProjects } from "@/src/components/LastProjectsComponent/TheLastProjects";
import { TheLastNews } from "@/src/components/LastNewsComponent/TheLastNews";
import { TheLinks } from "@/src/components/LinksComponent/TheLinks";
import { TheFeedback } from "@/src/components/FeedbackComponent/TheFeedback";
import { useTranslations } from "next-intl";

export default function Home() {
  const t = useTranslations("HomePage");
  return (
    <>
      {/* <div>
        <h1>{t("title")}</h1>
      </div> */}
      <TheSlider />
      <TheAbout />
      <TheAdvantages />
      <TheLastProjects />
      <TheLastNews />
      <TheLinks />
      <TheFeedback />
    </>
  );
}
