import { ArticlesService } from "@/services/articles.service";
import s from "./page.module.scss";
import ThePageContent from "@/src/components/PageContentComponent/ThePageContent";
import { getLocale, getTranslations } from "next-intl/server";
import { TheHero } from "@/src/components/HeroComponent/TheHero";
import { Box, CircularProgress } from "@mui/material";
import { TheFeedback } from "@/src/components/FeedbackComponent/TheFeedback";

export default async function ArticlePage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = params;
  const locale = await getLocale();
  const t = await getTranslations("TheArticlesList");
  const article = await ArticlesService.getOneArticle(slug, locale);

  if (!article) {
    return (
      <div className="container">
        <p>Article not found</p>
      </div>
    );
  }

  return (
    <>
      <TheHero title1={t("heroTitle")} url1="articles" />
      <div className="container">
        {!article ? (
          <Box sx={{ display: "flex" }}>
            <CircularProgress />
          </Box>
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
