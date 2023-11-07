import Link from "next/link";
import styles from "./page.module.scss";
import "../../scss/globals.scss";

import news from "../../data/news.js";

export default function TheNewsList(props: { begin?: number; end?: number }) {
  const newsSlice = news.slice(props.begin, props.end);
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
}
