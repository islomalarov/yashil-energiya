import s from "./TheArticlesList.module.scss";
import { Article, ArticlesResponse } from "services/articles.service";
import { TheClampedText } from "../ClampedText/TheClampedText";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
import type { Locale } from "next-intl";
import { formatPublicationDate } from "@/lib/format-date";

type TheArticlesListProps = ArticlesResponse & {
  linkLabel: string;
  locale?: Locale;
  contentLocale?: Locale;
};

export const TheArticlesList = ({
  articles,
  linkLabel,
  locale,
  contentLocale,
}: TheArticlesListProps) => {
  return (
    <div className={s.articlesList}>
      {articles.map(({ id, cover, title, excerpt, slug, createdAt }: Article) => (
        <article key={id} className={s.card}>
          <Link
            className={s.mediaLink}
            href={`/articles/${slug}`}
            locale={contentLocale}
          >
            <Image
              className={s.mediaImage}
              alt={cover ? cover.fileName : "Article cover image"}
              src={cover ? cover.url : "/hero-poster.webp"}
              width={cover?.width || 1280}
              height={cover?.height || 720}
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          </Link>

          <div className={s.content}>
            {createdAt && (
              <time className={s.date} dateTime={createdAt}>
                {formatPublicationDate(createdAt, locale ?? contentLocale)}
              </time>
            )}
            <h3 className={s.title}>{title}</h3>
            <TheClampedText className={s.excerpt} lines={3}>
              {excerpt}
            </TheClampedText>
          </div>

          <div className={s.actions}>
            <Link
              className={s.actionLink}
              href={`/articles/${slug}`}
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
