
import s from "./page.module.scss";
import { TheHero } from "@/components/HeroComponent/TheHero";
import { NewsService } from "services/news.service";
import { getTranslations, getLocale } from "next-intl/server";
import Link from "next/link";
import ThePageContent from "@/components/PageContentComponent/ThePageContent";
import { notFound } from "next/navigation";
import type { Locale } from "next-intl";

type Props = {
  params: Promise<{ locale: Locale; slug: string }>;
};

export default async function NewsPage({ params }: Props) {
  const p = await params;
  console.log("NEWS params =", p);

const slug = p.slug;
  if (!slug) {
    throw new Error(`NEWS: slug is missing. params=${JSON.stringify(p)}`);
  }

  const t = await getTranslations("TheLastNews");
  const locale = await getLocale();

  const news = await NewsService.getOneNews(slug, locale);
  const lastNews = await NewsService.getLastNews(locale);

  if (!news) notFound();


  return (
    <>
      <TheHero title1={t("heroTitle")} url1="news" />
      <div className="container">
          <div className={s.newsPage}>
            <div className={s.content}>
              <h1 className={s.title}>{news.title}</h1>
              <ThePageContent content={news.description.raw.children} />
            </div>
            <div className={s.separator}></div>
            <div className={s.lastNews}>
              <div className={s.lastNewsContent}>
                <h2 className={s.lastNewsTitle}>{t("lastNewsTitle")}</h2>
                <ul className={s.list}>
                  {lastNews.map(({ id, title, slug, date }) => (
                    <li key={id}>
                      <Link className={s.link} href={`/${locale}/news/${slug}`}>
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
      </div>
    </>
  );
}
