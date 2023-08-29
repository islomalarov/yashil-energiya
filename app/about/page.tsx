import "../../scss/globals.scss";
import { TheHero } from "@/components/HeroComponent/TheHero";

export default function About() {
  return (
    <>
      <TheHero title="О компании" />
      <div className="container"></div>
    </>
  );
}
