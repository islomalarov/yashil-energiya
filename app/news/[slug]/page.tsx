import "../../../scss/globals.scss";
import styles from "./page.module.scss";
import { TheHero } from "@/components/HeroComponent/TheHero";
import { NewsService } from "@/services/news.service";
import NewsContentComponent from "@/components/NewsContentComponent/TheNewsContent";

type Props = {
  params: { slug: string };
};
export default async function NewsPage({ params: { slug } }: Props) {
  const data = await NewsService.getOneNews(slug);
  const content = data.description.raw.children;

  if (!data) return <div>Loading...</div>;

  return (
    <>
      <TheHero title1="Yangiliklar" url1="news" />
      <div className="newsContainer">
        <div className={styles.content}>
          <h1 className={styles.title}>{data.title}</h1>
          <NewsContentComponent content={content} />
        </div>
      </div>
    </>
  );
}
