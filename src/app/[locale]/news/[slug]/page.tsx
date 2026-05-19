
import s from "./page.module.scss";
import { TheHero } from "@/components/HeroComponent/TheHero";
import { NewsService } from "services/news.service";
import { getTranslations } from "next-intl/server";
import Link from "next/link";
import ThePageContent from "@/components/PageContentComponent/ThePageContent";
import { notFound } from "next/navigation";
import type { Locale } from "next-intl";
import type { Metadata } from "next";
import { redirect } from "@/i18n/navigation";

type Props = {
  params: Promise<{ locale: Locale; slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const news = await NewsService.getOneNews(slug, locale);

  if (!news) {
    return {};
  }

  return {
    title: news.title,
    description: news.excerpt,
    openGraph: {
      title: news.title,
      description: news.excerpt,
      type: "article",
      images: news.cover?.url ? [news.cover.url] : undefined,
    },
  };
}

export default async function NewsPage({ params }: Props) {
  const { locale, slug } = await params;
  if (locale === "uz") {
    redirect({ href: `/news/${slug}`, locale: "en" });
  }

  if (!slug) {
    notFound();
  }

  const t = await getTranslations("TheLastNews");

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
