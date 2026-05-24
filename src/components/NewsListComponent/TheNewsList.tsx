import s from "./TheNewsList.module.scss";
import { NewResponse } from "services/news.service.types";
import { TheClampedText } from "../ClampedText/TheClampedText";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
import type { Locale } from "next-intl";

interface NewsProps {
  news: NewResponse[];
  linkLabel: string;
  contentLocale?: Locale;
}

export const TheNewsList = ({ news, linkLabel, contentLocale }: NewsProps) => {
  return (
    <div className={s.newsList}>
      {news.map(({ id, cover, date, title, excerpt, slug }: NewResponse) => (
        <article key={id} className={s.card}>
          <Link
            className={s.mediaLink}
            href={`/news/${slug}`}
            locale={contentLocale}
          >
            <Image
              className={s.mediaImage}
              alt={cover ? cover.fileName : "News cover image"}
              src={cover ? cover.url : "/hero-poster.webp"}
              width={cover?.width || 1280}
              height={cover?.height || 720}
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          </Link>

          <div className={s.content}>
            <time className={s.date}>{date}</time>
            <h3 className={s.title}>{title}</h3>
            <TheClampedText className={s.excerpt} lines={3}>
              {excerpt}
            </TheClampedText>
          </div>

          <div className={s.actions}>
            <Link
              className={s.actionLink}
              href={`/news/${slug}`}
              locale={contentLocale}
            >
              {linkLabel}
            </Link>
          </div>
        </article>
      ))}
    </div>
  );
};
