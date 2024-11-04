import "@/scss/globals.scss";
import getData from "@/lib/getData";
import { TheHero } from "@/src/components/HeroComponent/TheHero";
import { TheFeedback } from "@/src/components/FeedbackComponent/TheFeedback";
import { SearchProps } from "../news/page";
import { TheArticlesList } from "@/src/components/ArticlesList/TheArticlesList";

export default async function Articles({ searchParams }: SearchProps) {
  let page = parseInt(searchParams.page, 10);
  page = !page || page < 1 ? 1 : page;

  const perPage = 9;
  // const offsetNumber = 3;

  const { processedData } = await getData("media", "articles", perPage, page);

  return (
    <>
      <TheHero title1="Maqolalar" url1="articles" />
      <div className="container">
        <TheArticlesList articles={processedData} url="articles" />
      </div>
      <TheFeedback />
    </>
  );
}
