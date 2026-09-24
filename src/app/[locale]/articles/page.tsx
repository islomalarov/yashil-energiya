
import { TheHero } from "@/components/HeroComponent/TheHero";
import { TheFeedback } from "@/components/FeedbackComponent/TheFeedback";
import { TheArticlesList } from "@/components/ArticlesList/TheArticlesList";
import { ArticlesService } from "services/articles.service";
import { getLocale, getTranslations } from "next-intl/server";
import { redirect } from "@/i18n/navigation";
import { TheJsonLd } from "@/components/JsonLd/TheJsonLd";
import { absoluteUrl, itemListJsonLd, localizedPath } from "@/lib/seo";

export default async function Articles() {
  const locale = await getLocale();

  const t = await getTranslations("TheArticlesList");
  const articles = await ArticlesService.getAllArticles(locale);

  // uz is translated gradually: until uz articles exist, use the English list.
  if (locale === "uz" && articles.length === 0) {
    redirect({ href: "/articles", locale: "en" });
  }

  return (
    <>
      <TheJsonLd
        data={itemListJsonLd(locale, "/articles", articles, (item) => ({
          name: item.title,
          url: absoluteUrl(localizedPath(locale, `/articles/${item.slug}`)),
        }))}
      />
      <TheHero title1={t("heroTitle")} url1="articles" titleTag="h1" />
      <div className="container">
        <TheArticlesList articles={articles} linkLabel={t("link")} locale={locale} />
      </div>
      <TheFeedback />
    </>
  );
}
