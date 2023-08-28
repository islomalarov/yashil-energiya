import "../scss/globals.scss";
import { TheAbout } from "@/components/AboutComponent/TheAbout";
import { TheSlider } from "@/components/SliderComponent/TheSlider";
import { TheAdvantages } from "@/components/AdvantagesComponent/TheAdvantages";
import { TheProjects } from "@/components/ProjectsComponent/TheProjects";
import { TheLinks } from "@/components/LinksComponent/TheLinks";

export default function Home() {
  return (
    <>
      <TheSlider />
      <TheAbout />
      <TheAdvantages />
      <TheProjects />
      <TheLinks />
    </>
  );
}
