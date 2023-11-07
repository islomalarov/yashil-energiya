import { TheHero } from "@/components/HeroComponent/TheHero";
import "../../scss/globals.scss";
import { TheFeedback } from "@/components/FeedbackComponent/TheFeedback";
import TheNewsList from "@/components/NewsListComponent/TheNewsList";

export default function News() {
  return (
    <>
      <TheHero title="Yangiliklar" />
      <div className="container">
        <TheNewsList />
      </div>
      <TheFeedback />
    </>
  );
}
