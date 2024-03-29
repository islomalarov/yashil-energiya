import { TheHero } from "@/components/HeroComponent/TheHero";
import "../../scss/globals.scss";
import { TheFeedback } from "@/components/FeedbackComponent/TheFeedback";

export default function Articles() {
  return (
    <>
      <TheHero title1="Maqolalar" url1="article" />
      <div className="container">
        <h1>Test</h1>
      </div>
      <TheFeedback />
    </>
  );
}
