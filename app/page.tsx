import "../scss/globals.scss";
import { TheAbout } from "@/components/AboutComponent/TheAbout";
import { TheSlider } from "@/components/SliderComponent/TheSlider";
import { TheAdvantages } from "@/components/AdvantagesComponent/TheAdvantages";
import { TheLinks } from "@/components/LinksComponent/TheLinks";
import { TheFeedback } from "@/components/FeedbackComponent/TheFeedback";
import { TheProjects } from "@/components/ProjectsComponent/TheProjects";
import { TheNews } from "@/components/NewsComponent/TheNews";

export default function Home() {
  return (
    <>
      <TheSlider />
      <TheAbout />
      <TheAdvantages />
      <TheProjects />
      <TheNews />
      <TheLinks />
      <TheFeedback />
    </>
  );
}
