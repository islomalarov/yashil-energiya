import "@/scss/globals.scss";
import { TheAbout } from "@/src/components/AboutComponent/TheAbout";
import { TheSlider } from "@/src/components/SliderComponent/TheSlider";
import { TheAdvantages } from "@/src/components/AdvantagesComponent/TheAdvantages";
import { TheLastNews } from "@/src/components/LastNewsComponent/TheLastNews";
import { TheLinks } from "@/src/components/LinksComponent/TheLinks";
import { TheFeedback } from "@/src/components/FeedbackComponent/TheFeedback";
import { TheLastPlants } from "@/src/components/LastPlantsComponent/TheLastPlants";

export default function Home() {
  return (
    <>
      <TheSlider />
      <TheAbout />
      <TheAdvantages />
      <TheLastPlants />
      <TheLastNews />
      <TheLinks />
      <TheFeedback />
    </>
  );
}
