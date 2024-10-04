"use client";
import "../../scss/globals.scss";
import styles from "./page.module.scss";
import Link from "next/link";
import Image from "next/image";
import { getDate } from "@/my/date/getDate";
import { NewResponse } from "@/services/news.service";

interface NewsProps {
  news: NewResponse[];
  url: string;
}
export const TheNewsList = ({ news, url }: NewsProps) => {
  return (
    <div>
      <ul className={styles.news}>
        {news.map(({ id, cover, date, title, excerpt, slug }: any) => (
          <li key={id}>
            <Link className={styles.link} href={`/${url}/${slug}`}>
              <div className={styles.imgBlock}>
                <Image
                  width={720}
                  height={315}
                  src={cover.url}
                  alt={cover.fileName}
                />
              </div>
              <div className={styles.titleBlock}>
                {date && <p className={styles.date}>{getDate(date)}</p>}
                <h3>{title}</h3>
                <p>{excerpt}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
