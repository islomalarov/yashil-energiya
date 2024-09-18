"use client";
import "../../scss/globals.scss";
import Link from "next/link";
import styles from "./page.module.scss";
import Image from "next/image";
import { getDate } from "@/my/date/getDate";

export const TheNewsList = ({ newsArray, url, begin, end }: NewsProps) => {
  console.log(newsArray);

  return (
    <div>
      <ul className={styles.news}>
        {newsArray
          .slice(begin, end)
          .map(({ id, imgUrl, date, title, subTitle }: any) => (
            <li key={title}>
              <Link key={id} className={styles.link} href={`/${url}/page${id}`}>
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
