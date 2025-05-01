"use client";
import "@/scss/globals.scss";
import styles from "./page.module.scss";
import { Link } from "@/src/i18n/navigation";
import { NewResponse } from "@/services/news.service.types";
import TheImage from "../CoverComponent/TheCover";

interface NewsProps {
  news: NewResponse[];
  url: string;
}
export const TheNewsList = ({ news, url }: NewsProps) => {
  return (
    <div>
      <ul className={styles.newsList}>
        {news.map(({ id, cover, date, title, excerpt, slug }: any) => (
          <li className={styles.newsItem} key={id}>
            <Link className={styles.link} href={`/${url}/${slug}`}>
              <TheImage elem={cover} />
              <div className={styles.titleBlock}>
                <p className={styles.date}>{date}</p>
                <h3>{title}</h3>
                <p className={styles.descr}>{excerpt}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
