"use client";
import "@/scss/globals.scss";
import s from "./TheNewsList.module.scss";
import { Link } from "@/src/i18n/navigation";
import { NewResponse } from "@/services/news.service.types";
import TheImage from "../CoverComponent/TheCover";

interface NewsProps {
  news: NewResponse[];
}
export const TheNewsList = ({ news }: NewsProps) => {
  return (
    <div>
      <ul className={s.newsList}>
        {news.map(({ id, cover, date, title, excerpt, slug }: any) => (
          <li className={s.newsItem} key={id}>
            <Link className={s.link} href={`/news/${slug}`}>
              <TheImage elem={cover} />
              <div className={s.titleBlock}>
                <p className={s.date}>{date}</p>
                <h3>{title}</h3>
                <p className={s.description}>{excerpt}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
