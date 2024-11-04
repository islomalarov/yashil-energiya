"use client";
import "@/scss/globals.scss";
import { TheHero } from "@/src/components/HeroComponent/TheHero";
import { TheNewsList } from "@/src/components/NewsListComponent/TheNewsList";
import { ThePagination } from "@/src/components/ui/PaginationComponent/ThePagination";
import { TheFeedback } from "@/src/components/FeedbackComponent/TheFeedback";
import { NewResponse, NewsService } from "@/services/news.service";
import { getPageNumbers } from "@/my/pageNumbers/getPageNumbers";
import { getTotalPages } from "@/my/pageCounts/getTotalPages";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export interface SearchProps {
  searchParams: { page: string };
}
export default function News({ searchParams }: SearchProps) {
  const pathname = usePathname();
  console.log(pathname);

  const [news, setNews] = useState<NewResponse[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [pageNumbers, setPageNumbers] = useState<number[]>([]);
  const [error, setError] = useState<string | null>(null);

  let page = parseInt(searchParams.page, 10);
  page = !page || page < 1 ? 1 : page;
  const newsPerPage = 9;
  const offsetNumber = 2;
  const skip = newsPerPage * (page - 1);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const { news, newsConnection } = await NewsService.getAllNews(
          newsPerPage,
          skip
        );
        setNews(news);

        const { count: newsCount } = newsConnection.aggregate;
        const totalPages = getTotalPages(newsCount, newsPerPage);
        setTotalPages(totalPages);

        const pageNumbers = getPageNumbers(page, offsetNumber, totalPages);
        setPageNumbers(pageNumbers);
      } catch (err) {
        setError("Failed to load news data. Please try again later.");
      }
    };

    fetchNews();
  }, [page, skip]);

  if (error) return <div>{error}</div>;
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
