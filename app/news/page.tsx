import "../../scss/globals.scss";
import getData from "@/lib/getData";
import { TheHero } from "@/components/HeroComponent/TheHero";
import { TheNewsList } from "@/components/NewsListComponent/TheNewsList";
import { ThePagination } from "@/components/ui/PaginatonComponent/ThePagination";
import { TheFeedback } from "@/components/FeedbackComponent/TheFeedback";

export default async function News({ searchParams }: SearchProps) {
  let page = parseInt(searchParams.page, 10);
  page = !page || page < 1 ? 1 : page;

  const perPage = 9;

  const { processedData, itemsCount } = await getData("news", perPage, page);

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
      <TheHero title1="Yangiliklar" url1="news" />
      <div className="container">
        <TheNewsList newsArray={processedData} url="news" />
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
