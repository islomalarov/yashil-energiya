import "../../scss/globals.scss";
import getData from "@/lib/getData";
import { TheHero } from "@/components/HeroComponent/TheHero";
import { TheFeedback } from "@/components/FeedbackComponent/TheFeedback";
import { TheNewsList } from "@/components/NewsListComponent/TheNewsList";

export default async function Articles({ searchParams }: SearchProps) {
  let page = parseInt(searchParams.page, 10);
  page = !page || page < 1 ? 1 : page;

  const perPage = 9;

  const { processedData, itemsCount } = await getData(
    "articles",
    perPage,
    page
  );

  const totalPage = Math.ceil(itemsCount / perPage);
  const prevPage = page - 1 > 0 ? page - 1 : 1;
  const nextPage = page + 1;

  const pageNumbers = [] as number[];
  const offsetNumber = 3;

  for (let i = page - offsetNumber; i <= page + offsetNumber; i++) {
    if (i >= 1 && i <= totalPage) {
      pageNumbers.push(i);
    }
  }
  return (
    <>
      <TheHero title1="Maqolalar" url1="articles" />
      <div className="container">
        <TheNewsList newsArray={processedData} url="articles" />
      </div>
      <TheFeedback />
    </>
  );
}
