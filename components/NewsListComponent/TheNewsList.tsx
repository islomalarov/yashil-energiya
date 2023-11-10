import "../../scss/globals.scss";
import Link from "next/link";
import styles from "./page.module.scss";

import { news } from "../../data/news.js";
import { Props } from "@/interface/props";

console.log(news);
export const TheNewsList = ({ begin, end }: Props) => {
  const newsSlice = news.slice(begin, end);
  return (
    <ul className={styles.news}>
      {newsSlice.map((news: any) => (
        <li key={news.id}>
          <Link className={styles.link} href={`/news/${news.page}`}>
            <div className={styles.imgBlock}>
              <img src={news.imgUrl} alt="" />
            </div>
            <div className={styles.titleBlock}>
              <p className={styles.date}>{news.date}</p>
              <h3>{news.title}</h3>
              <p>{news.subTitle}</p>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
};
