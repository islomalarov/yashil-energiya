import "../../scss/globals.scss";
import { TheHero } from "@/components/HeroComponent/TheHero";
import { TheNewsList } from "@/components/NewsListComponent/TheNewsList";
import { ThePagination } from "@/components/ui/PaginationComponent/ThePagination";
import { TheFeedback } from "@/components/FeedbackComponent/TheFeedback";
import getData from "@/lib/getData";
import getPageNumbers from "@/my/pageNumbers/getPageNumbers";
import getPageCounts from "@/my/pageCounts/getPageCounts";

export default async function News({ searchParams }: SearchProps) {
  let page = parseInt(searchParams.page, 10);
  page = !page || page < 1 ? 1 : page;

  const perPage = 9;
  const offsetNumber = 3;

  const { processedData, itemsCount } = await getData(
    "media",
    "news",
    perPage,
    page
  );
  const { totalPage, prevPage, nextPage } = getPageCounts(
    itemsCount,
    perPage,
    page
  );
  const pageNumbers = getPageNumbers(page, offsetNumber, totalPage);

  return (
    <>
      <TheHero title1="Yangiliklar" url1="news" />
      <div className="container">
        <TheNewsList newsArray={processedData as NewsItem[]} url="news" />
        <ThePagination
          page={page}
          totalPage={totalPage}
          prevPage={prevPage}
          nextPage={nextPage}
          pageNumbers={pageNumbers}
        />
      </div>
      <TheFeedback />
    </>
  );
}
