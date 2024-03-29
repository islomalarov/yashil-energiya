import "../../scss/globals.scss";
import { TheHero } from "@/components/HeroComponent/TheHero";
import { TheFeedback } from "@/components/FeedbackComponent/TheFeedback";
import { TheCeo } from "@/components/CeoComponent/TheCeo";

export default function Ceo() {
  return (
    <>
      <TheHero
        title1="Kompaniya Haqida"
        url1="about"
        title2="Rahbariyat"
        url2="ceo"
      />
      <div className="container">
        <TheCeo />
      </div>
      <TheFeedback />
    </>
  );
}
