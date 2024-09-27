import "../../scss/globals.scss";
import { TheHero } from "@/components/HeroComponent/TheHero";
import { TheNewsList } from "@/components/NewsListComponent/TheNewsList";
import { ThePagination } from "@/components/ui/PaginationComponent/ThePagination";
import { TheFeedback } from "@/components/FeedbackComponent/TheFeedback";
import { NewsService } from "@/services/news.service";
import getData from "@/lib/getData";
import { getPageNumbers } from "@/my/pageNumbers/getPageNumbers";
import { getTotalPages } from "@/my/pageCounts/getTotalPages";

export interface SearchProps {
  searchParams: { page: string };
}
export default async function News({ searchParams }: SearchProps) {
  let page = parseInt(searchParams.page, 10);
  page = !page || page < 1 ? 1 : page;
  const newsPerPage = 9;
  const offsetNumber = 2;

  // const { processedData, itemsCount } = await getData(
  //   "media",
  //   "news",
  //   perPage,
  //   page
  // );
  // console.log(processedData, itemsCount);
  const skip = newsPerPage * (page - 1);
  const { news, newsConnection } = await NewsService.getAllNews(
    newsPerPage,
    skip
  );

  const { count: newsCount } = newsConnection.aggregate;
  const totalPages = getTotalPages(newsCount, newsPerPage);
  const pageNumbers = getPageNumbers(page, offsetNumber, totalPages);

  return (
    <>
      <TheHero title1="Yangiliklar" url1="news" />
      <div className="container">
        <TheNewsList news={news} url="news" />
        <ThePagination
          page={page}
          totalPages={totalPages}
          pageNumbers={pageNumbers}
        />
      </div>
      <TheFeedback />
    </>
  );
}
