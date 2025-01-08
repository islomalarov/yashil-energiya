import "@/scss/globals.scss";
import styles from "./page.module.scss";
import { TheHero } from "@/src/components/HeroComponent/TheHero";
import { NewsService } from "@/services/news.service";
import NewsContentComponent from "@/src/components/NewsContentComponent/TheNewsContent";
import { getTranslations, getLocale } from "next-intl/server";

type Props = {
  params: { slug: string };
};

export default async function NewsPage({ params: { slug } }: Props) {
  const t = await getTranslations("TheLastNews");
  const locale = await getLocale();
  const data = await NewsService.getOneNews(slug, locale);

  return (
    <>
      <TheHero title1={t("heroTitle")} url1="news" />
      <div className="newsContainer">
        {!data ? (
          <div>Loading...</div>
        ) : (
          <div className={styles.content}>
            <h1 className={styles.title}>{data.title}</h1>
            <NewsContentComponent content={data.description.raw.children} />
          </div>
        )}
      </div>
    </>
  );
}
