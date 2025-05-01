import "@/scss/globals.scss";
import getData from "@/lib/getData";
import { TheHero } from "@/src/components/HeroComponent/TheHero";
import { TheFeedback } from "@/src/components/FeedbackComponent/TheFeedback";
import { TheArticlesList } from "@/src/components/ArticlesList/TheArticlesList";

interface SearchProps {
  searchParams: {
    page: string;
  };
}

export default async function Articles({ searchParams }: SearchProps) {
  let page = parseInt(searchParams.page, 10);
  page = !page || page < 1 ? 1 : page;

  const perPage = 9;
  // const offsetNumber = 3;

  const { data } = await getData("media", "articles", perPage, page);

  const articles = data.map((article) => ({
    id: article.id,
    imgUrl: article.imgUrl,
    date: article.date,
    title: article.title,
    subTitle: article.subTitle,
  }));
  return (
    <>
      <TheHero title1="Maqolalar" url1="articles" />
      <div className="container">
        <TheArticlesList articles={articles} url="articles" />
      </div>
      <TheFeedback />
    </>
  );
}
