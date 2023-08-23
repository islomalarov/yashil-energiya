import "../scss/globals.scss";
import { TheAbout } from "@/components/AboutComponent/TheAbout";
import { TheSlider } from "@/components/SliderComponent/TheSlider";
import { TheAdvantages } from "@/components/AdvantagesComponent/TheAdvantages";

export default function Home() {
  return (
    <>
      <TheSlider />
      <TheAbout />
      <TheAdvantages />
    </>
  );
}
