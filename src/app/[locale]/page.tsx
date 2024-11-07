import "@/scss/globals.scss";
import { TheAbout } from "@/src/components/AboutComponent/TheAbout";
import { TheSlider } from "@/src/components/SliderComponent/TheSlider";
import { TheAdvantages } from "@/src/components/AdvantagesComponent/TheAdvantages";
import { TheLastProjects } from "@/src/components/LastProjectsComponent/TheLastProjects";
import { TheLastNews } from "@/src/components/LastNewsComponent/TheLastNews";
import { TheLinks } from "@/src/components/LinksComponent/TheLinks";
import { TheFeedback } from "@/src/components/FeedbackComponent/TheFeedback";

export default function Home() {
  return (
    <>
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
