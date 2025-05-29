import { useEffect, useState } from "react";
import { NewsService } from "@/services/news.service";
import { NewResponse } from "@/services/news.service.types";

type IUsePaginationProps = string;

const DEFAULT_PAGE_SIZE = 9;

export const usePagination = (locale: IUsePaginationProps) => {
  const [news, setNews] = useState<NewResponse[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (value: number) => {
    setCurrentPage(value);
  };

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const {
          news,
          newsConnection: { aggregate },
        } = await NewsService.getAllNews(
          DEFAULT_PAGE_SIZE,
          DEFAULT_PAGE_SIZE * (currentPage - 1),
          locale,
        );
        setNews(news);

        const totalPosts = aggregate.count;
        const totalPages = Math.ceil(totalPosts / DEFAULT_PAGE_SIZE);
        setTotalPages(totalPages);
      } catch (err) {
        setError("Failed to load news data. Please try again later.");
      }
    };

    fetchNews();
  }, [currentPage, locale]);

  return {
    news,
    totalPages,
    error,
    currentPage,
    handlePageChange,
  };
};
