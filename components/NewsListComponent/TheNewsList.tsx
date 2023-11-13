import "../../scss/globals.scss";
import Link from "next/link";
import styles from "./page.module.scss";

import { news } from "../../data/news";
import { Props } from "@/interface/props";

console.log(news);
export const TheNewsList = ({ begin, end }: Props) => {
  const newsSlice = news.slice(begin, end);
  return (
    <ul className={styles.news}>
      {newsSlice.map(({ id, page, imgUrl, date, title, subTitle }: any) => (
        <li key={id}>
          <Link className={styles.link} href={`/news/${page}`}>
            <div className={styles.imgBlock}>
              <img src={imgUrl} alt="" />
            </div>
            <div className={styles.titleBlock}>
              <p className={styles.date}>{date}</p>
              <h3>{title}</h3>
              <p>{subTitle}</p>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
};
