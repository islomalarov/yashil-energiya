"use client";

import "@/scss/globals.scss";
import { TheHero } from "@/src/components/HeroComponent/TheHero";
import { TheNewsList } from "@/src/components/NewsListComponent/TheNewsList";
import { TheFeedback } from "@/src/components/FeedbackComponent/TheFeedback";
import { useTranslations, useLocale } from "next-intl";
import { useEffect, useState } from "react";
import { NewResponse } from "@/services/news.service.types";
import { NewsService } from "@/services/news.service";
import { ThePaginationControls } from "@/src/components/PaginationComponent/ThePaginationControls";

export default function News() {
  const t = useTranslations("TheLastNews");
  const locale = useLocale();

  const [fetchedNews, setFetchedNews] = useState<NewResponse[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const DEFAULT_PAGE_SIZE = 9;
  const skip = DEFAULT_PAGE_SIZE * (currentPage - 1);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const {
          news,
          newsConnection: { aggregate },
        } = await NewsService.getAllNews(DEFAULT_PAGE_SIZE, skip, locale);

        setFetchedNews(news);

        const totalPages = Math.ceil(aggregate.count / DEFAULT_PAGE_SIZE);

        setTotalPages(totalPages);
      } catch (err) {
        setError("Failed to load news data. Please try again later.");
      }
    };

    fetchNews();
  }, [currentPage, locale, skip]);

  if (error) return <div>{error}</div>;
  return (
    <>
      <TheHero title1={t("heroTitle")} url1="news" />
      <div className="container">
        <TheNewsList news={fetchedNews} />
        <ThePaginationControls
          totalPages={totalPages}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
      <TheFeedback />
    </>
  );
}
