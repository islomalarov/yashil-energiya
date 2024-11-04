"use client";
import "@/scss/globals.scss";
import styles from "./page.module.scss";
// import Link from "next/link";
import { Link } from "@/src/i18n/routing";
import { TheNewsList } from "../NewsListComponent/TheNewsList";
import { NewResponse, NewsService } from "@/services/news.service";
import { useEffect, useState } from "react";

export function TheLastNews() {
  // const { processedData } = await getData("media", "news", 3, 1);
  const [news, setNews] = useState<NewResponse[]>([]);
  useEffect(() => {
    const fetchLastNews = async () => {
      const { news } = await NewsService.getLastNews();
      setNews(news);
    };
    fetchLastNews();
  }, []);
  return (
    <div className="container">
      <div className={styles.header}>
        <h3 className="title">Yangiliklar</h3>
        <Link href="/news" className={styles.link}>
          Barcha yangiliklar
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="9"
            height="14"
            viewBox="0 0 9 14"
            fill="none"
          >
            <path
              d="M1 13L7.0251 7L1 1"
              stroke="#12903E"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Link>
      </div>
      <TheNewsList news={news} url="news" />
    </div>
  );
}
