
import { TheHero } from "@/components/HeroComponent/TheHero";
import { TheFeedback } from "@/components/FeedbackComponent/TheFeedback";
import { TheArticlesList } from "@/components/ArticlesList/TheArticlesList";
import { ArticlesService } from "services/articles.service";
import { getLocale, getTranslations } from "next-intl/server";
import { redirect } from "@/i18n/navigation";

export default async function Articles() {
  const locale = await getLocale();
  if (locale === "uz") {
    redirect({ href: "/articles", locale: "en" });
  }

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
