import "../scss/globals.scss";
import { TheAbout } from "@/components/AboutComponent/TheAbout";
import { TheSlider } from "@/components/SliderComponent/TheSlider";
import { TheAdvantages } from "@/components/AdvantagesComponent/TheAdvantages";
import { TheLastProjects } from "@/components/LastProjectsComponent";
import { TheLastNews } from "@/components/LastNewsComponent";
import { TheLinks } from "@/components/LinksComponent/TheLinks";
import { TheFeedback } from "@/components/FeedbackComponent/TheFeedback";

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
