import s from "./TheArticlesList.module.scss";
import { Article, ArticlesResponse } from "services/articles.service";
import { TheClampedText } from "../ClampedText/TheClampedText";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
import type { Locale } from "next-intl";

type TheArticlesListProps = ArticlesResponse & {
  linkLabel: string;
  contentLocale?: Locale;
};

export const TheArticlesList = ({
  articles,
  linkLabel,
  contentLocale,
}: TheArticlesListProps) => {
  return (
    <div className={s.articlesList}>
      {articles.map(({ id, cover, title, excerpt, slug }: Article) => (
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
            <h3 className={s.title}>{title}</h3>
            <TheClampedText className={s.excerpt} lines={4}>
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
