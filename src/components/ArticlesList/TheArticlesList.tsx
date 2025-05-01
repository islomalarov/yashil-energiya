"use client";

import "@/scss/globals.scss";
import styles from "./page.module.scss";
import Image from "next/image";
import { Link } from "@/src/i18n/navigation";

interface NewsProps {
  articles: {
    id: number;
    imgUrl: string;
    date: string;
    title: string;
    subTitle: string;
  }[];
  url: string;
}
export const TheArticlesList = ({ articles, url }: NewsProps) => {
  return (
    <div>
      <ul className={styles.news}>
        {articles.map(({ id, imgUrl, date, title, subTitle }) => (
          <li key={id}>
            <Link className={styles.link} href={`/${url}/page${id}`}>
              <div className={styles.imgBlock}>
                <Image width={720} height={315} src={imgUrl} alt={imgUrl} />
              </div>
              <div className={styles.titleBlock}>
                {date && <p className={styles.date}>{date}</p>}
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
