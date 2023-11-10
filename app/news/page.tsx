import { TheHero } from "@/components/HeroComponent/TheHero";
import "../../scss/globals.scss";
import { TheFeedback } from "@/components/FeedbackComponent/TheFeedback";
import { TheNewsList } from "@/components/NewsListComponent/TheNewsList";

export default function News() {
  return (
    <>
      <TheHero title1="Yangiliklar" url1="news" />
      <div className="container">
        <TheNewsList />
      </div>
      <TheFeedback />
    </>
  );
}
