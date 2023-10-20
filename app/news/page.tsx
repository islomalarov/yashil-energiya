import { TheHero } from "@/components/HeroComponent/TheHero";
import "../../scss/globals.scss";
import { TheFeedback } from "@/components/FeedbackComponent/TheFeedback";
export default function News() {
  return (
    <>
      <TheHero title="Yangiliklar" />
      <div className="container">
        <h1>News page</h1>
      </div>
      <TheFeedback />
    </>
  );
}
