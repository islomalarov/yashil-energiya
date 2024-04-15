import "../../scss/globals.scss";
import styles from "./page.module.scss";
import Link from "next/link";
import getData from "@/lib/getData";
import { TheNewsList } from "../NewsListComponent/TheNewsList";

export const TheNews = async () => {
  const { processedData } = await getData("news", 3, 1);
  // Ensure processedData is an array of NewsItem objects
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
      <TheNewsList newsArray={processedData} url="news" begin={0} end={3} />
    </div>
  );
};
