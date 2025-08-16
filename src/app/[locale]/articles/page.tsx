import "@/scss/globals.scss";
import { TheHero } from "@/src/components/HeroComponent/TheHero";
import { TheFeedback } from "@/src/components/FeedbackComponent/TheFeedback";
import { TheArticlesList } from "@/src/components/ArticlesList/TheArticlesList";
import { ArticlesService } from "@/services/articles.service";
import { getLocale, getTranslations } from "next-intl/server";

export default async function Articles() {
  const locale = await getLocale();
  const t = await getTranslations("TheArticlesList");
  const articles = await ArticlesService.getAllArticles(locale);

  return (
    <>
      <TheHero title1={t("heroTitle")} url1="articles" />
      <div className="container">
        <TheArticlesList articles={articles} />
      </div>
      <TheFeedback />
    </>
  );
}
