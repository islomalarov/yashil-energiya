import Image from "next/image";
import { TrendingUp } from "lucide-react";
import { Link } from "@/i18n/navigation";
import type { PopularNewsItem } from "@/lib/popular-news";
import s from "./ThePopularNews.module.scss";

type PopularNewsLabels = {
  eyebrow: string;
  title: string;
};

type PopularNewsProps = {
  news: PopularNewsItem[];
  labels: PopularNewsLabels;
  locale: string;
};

export function ThePopularNews({ news, labels, locale }: PopularNewsProps) {
  if (!news.length) {
    return null;
  }

  return (
    <section className={s.section} aria-labelledby="popular-news-title">
      <div className={s.header}>
        <div>
          <p className={s.eyebrow}>
            <TrendingUp size={18} aria-hidden />
            {labels.eyebrow}
          </p>
          <h2 id="popular-news-title" className={s.title}>
            {labels.title}
          </h2>
        </div>
      </div>

      <div className={s.grid}>
        {news.map((item) => (
          <Link
            key={item.id}
            className={s.card}
            href={`/news/${item.slug}`}
            locale={locale}
            aria-label={item.title}
          >
            <div className={s.imageWrap}>
              <Image
                className={s.image}
                alt={item.cover ? item.cover.fileName : item.title}
                src={item.cover ? item.cover.url : "/hero-poster.webp"}
                width={item.cover?.width || 1280}
                height={item.cover?.height || 720}
                sizes="(max-width: 768px) 100vw, (max-width: 1180px) 50vw, 33vw"
              />
            </div>

            <div className={s.body}>
              <div className={s.meta}>
                <span>{item.date}</span>
              </div>
              <h3 className={s.cardTitle}>{item.title}</h3>
              <p className={s.excerpt}>{item.excerpt}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
