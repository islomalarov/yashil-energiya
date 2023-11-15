"use client";
import "../../scss/globals.scss";
import Link from "next/link";
import styles from "./page.module.scss";

import { news } from "../../data/news";
import { Props } from "@/interface/props";
import Image from "next/image";

export const TheNewsList = ({ begin, end }: Props) => {
  const newsSlice = news
    .sort((a, b) => (Date.parse(a.date) > Date.parse(b.date) ? -1 : 1))
    .slice(begin, end);

  function getData(data: string) {
    return new Intl.DateTimeFormat("ru-RU", {
      dateStyle: "short",
    }).format(new Date(data));
  }

  return (
    <ul className={styles.news}>
      {newsSlice.map(({ id, imgUrl, date, title, subTitle }: any) => (
        <li key={title}>
          <Link key={id} className={styles.link} href={`/news/new${id}`}>
            <div className={styles.imgBlock}>
              <Image
                width={720}
                height={315}
                src={imgUrl}
                alt={imgUrl}
                style={{
                  display: "flex",
                  width: "100%",
                  objectFit: "cover",
                }}
              />
            </div>
            <div className={styles.titleBlock}>
              <p className={styles.date}>{getData(date)}</p>
              <h3>{title}</h3>
              <p>{subTitle}</p>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
};
