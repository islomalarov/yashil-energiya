"use client";
import "../../scss/globals.scss";
import Link from "next/link";
import styles from "./page.module.scss";
import Image from "next/image";
import { getDate } from "@/my/date/getDate";
// import { NewResponse } from "@/services/news.service";

interface NewsProps {
  articles: any[];
  url: string;
}
export const TheArticlesList = ({ articles, url }: NewsProps) => {
  console.log(articles);

  return (
    <div>
      <ul className={styles.news}>
        {articles.map(({ id, imgUrl, date, title, subTitle }: any) => (
          <li key={id}>
            <Link className={styles.link} href={`/${url}/page${id}`}>
              <div className={styles.imgBlock}>
                <Image width={720} height={315} src={imgUrl} alt={imgUrl} />
              </div>
              <div className={styles.titleBlock}>
                {date && <p className={styles.date}>{getDate(date)}</p>}
                <h3>{title}</h3>
                <p>{subTitle}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};