import "@/scss/globals.scss";
import s from "./page.module.scss";
import { TheHero } from "@/src/components/HeroComponent/TheHero";
import { NewsService } from "@/services/news.service";
import NewsContentComponent from "@/src/components/NewsContentComponent/TheNewsContent";
import { getTranslations, getLocale } from "next-intl/server";
import Link from "next/link";

type Props = {
  params: { slug: string };
};

export default async function NewsPage({ params: { slug } }: Props) {
  const t = await getTranslations("TheLastNews");
  const locale = await getLocale();
  const news = await NewsService.getOneNews(slug, locale);
  const lastNews = await NewsService.getLastNews(locale);

  return (
    <>
      <TheHero title1={t("heroTitle")} url1="news" />
      <div className="container">
        {!news ? (
          <div>Loading...</div>
        ) : (
          <div className={s.newsPage}>
            <div className={s.content}>
              <h1 className={s.title}>{news.title}</h1>
              <NewsContentComponent content={news.description.raw.children} />
            </div>
            <div className={s.separator}></div>
            <div className={s.lastNews}>
              <div className={s.lastNewsContent}>
                <h2 className={s.lastNewsTitle}>{t("lastNewsTitle")}</h2>
                <ul className={s.list}>
                  {lastNews.map(({ id, title, excerpt, slug, date }) => (
                    <li className="" key={id}>
                      <Link className={s.link} href={`/news/${slug}`}>
                        <div className={s.titleBlock}>
                          <p className={s.date}>{date}</p>
                          <h3>{title}</h3>
                          {/* <p className={s.description}>{excerpt}</p> */}
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
