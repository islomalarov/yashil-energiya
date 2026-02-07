
import { TheAbout } from "@/components/AboutComponent/TheAbout";
import { TheSlider } from "@/components/SliderComponent/TheSlider";
import { TheAdvantages } from "@/components/AdvantagesComponent/TheAdvantages";
import { TheLastNews } from "@/components/LastNewsComponent/TheLastNews";
import { TheLinks } from "@/components/LinksComponent/TheLinks";
import { TheFeedback } from "@/components/FeedbackComponent/TheFeedback";
import { TheLastPlants } from "@/components/LastPlantsComponent/TheLastPlants";

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
