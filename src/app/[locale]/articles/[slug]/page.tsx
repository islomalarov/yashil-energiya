import "@/scss/globals.scss";
import s from "./page.module.scss";
import { TheHero } from "@/components/HeroComponent/TheHero";
import { ArticlesService } from "services/articles.service";
import { getLocale, getTranslations } from "next-intl/server";
import ThePageContent from "@/components/PageContentComponent/ThePageContent";
import { TheFeedback } from "@/components/FeedbackComponent/TheFeedback";
import { notFound } from "next/navigation";

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}) {
  const { slug } = await params;
  if (!slug) notFound();
  const locale = await getLocale();
  const t = await getTranslations("TheArticlesList");
  const article = await ArticlesService.getOneArticle(slug, locale);

  if (!article) notFound();

  return (
    <>
      <TheHero title1={t("heroTitle")} url1="articles" />
      <div className="container">
        {!article ? (
          <div>Loading...</div>
        ) : (
          <div className={s.content}>
            <h1 className={s.title}>{article.title}</h1>
            <ThePageContent content={article.content.raw.children} />
          </div>
        )}
      </div>
      <TheFeedback />
    </>
  );
}
