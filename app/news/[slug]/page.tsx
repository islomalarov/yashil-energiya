import "../../../scss/globals.scss";
import styles from "./page.module.scss";
import { TheHero } from "@/components/HeroComponent/TheHero";
import { NewsService } from "@/services/news.service";
import { renderContent } from "@/my/render/renderContent";

type Props = {
  params: { slug: string };
};
const NewsPage = async ({ params: { slug } }: Props) => {
  const data = await NewsService.getOneNews(slug);

  let content;
  if (data.description) {
    content = renderContent(data.description.raw.children, styles);
  }
  if (!data) return <div>Loading...</div>;

  return (
    <>
      <TheHero title1="Yangiliklar" url1="news" />
      <div className="newsContainer">
        <div className={styles.content}>
          <h1 className={styles.title}>{data.title}</h1>
          {content ? content : <p>No content</p>}
        </div>
      </div>
    </>
  );
};

export default NewsPage;
