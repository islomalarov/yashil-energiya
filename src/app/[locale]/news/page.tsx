"use client";

import "@/scss/globals.scss";
import s from "./page.module.scss";
import { TheHero } from "@/src/components/HeroComponent/TheHero";
import { TheNewsList } from "@/src/components/NewsListComponent/TheNewsList";
import { TheFeedback } from "@/src/components/FeedbackComponent/TheFeedback";
import { useTranslations, useLocale } from "next-intl";
import { Pagination } from "@mui/material";
import { usePagination } from "../../../../hooks/usePagination";

export default function News() {
  const t = useTranslations("TheLastNews");
  const locale = useLocale();
  const { error, news, totalPages, currentPage, handlePageChange } =
    usePagination(locale);

  if (error) return <div>{error}</div>;
  return (
    <>
      <TheHero title1={t("heroTitle")} url1="news" />
      <div className="container">
        <TheNewsList news={news} />
        <div className={s.paginationContainer}>
          <Pagination
            className={s.pagination}
            count={totalPages}
            page={currentPage}
            siblingCount={0}
            onChange={(_, value) => handlePageChange(value)}
            variant="outlined"
            shape="rounded"
          />
        </div>
        <TheFeedback />
      </div>
    </>
  );
}
