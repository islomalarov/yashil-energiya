
import s from "./page.module.scss";
import { TheHero } from "@/components/HeroComponent/TheHero";
import { ArticlesService } from "services/articles.service";
import { getTranslations } from "next-intl/server";
import ThePageContent from "@/components/PageContentComponent/ThePageContent";
import { TheFeedback } from "@/components/FeedbackComponent/TheFeedback";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { redirect } from "@/i18n/navigation";
import { articleJsonLd, breadcrumbJsonLd, createMetadata } from "@/lib/seo";
import { TheJsonLd } from "@/components/JsonLd/TheJsonLd";

type Props = {
  params: Promise<{ slug: string; locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, locale } = await params;
  const article = await ArticlesService.getOneArticle(slug, locale);

  if (!article) {
    return {};
  }

  return createMetadata({
    locale,
    path: `/articles/${slug}`,
    title: article.title,
    description: article.excerpt,
    image: article.cover?.url,
    type: "article",
    alternateLocales: ["en", "ru"],
  });
}

export default async function ArticlePage({ params }: Props) {
  const { slug, locale } = await params;
  if (locale === "uz") {
    redirect({ href: `/articles/${slug}`, locale: "en" });
  }

  if (!slug) notFound();
  const t = await getTranslations("TheArticlesList");
  const article = await ArticlesService.getOneArticle(slug, locale);

  if (!article) notFound();

  return (
    <>
      <TheJsonLd
        data={[
          articleJsonLd({
            locale,
            path: `/articles/${slug}`,
            title: article.title,
            description: article.excerpt,
            image: article.cover?.url,
            schemaType: "Article",
            section: "Articles",
          }),
          breadcrumbJsonLd(locale, [
            { name: t("heroTitle"), path: "/articles" },
            { name: article.title, path: `/articles/${slug}` },
          ]),
        ]}
      />
      <TheHero title1={t("heroTitle")} url1="articles" />
      <div className="container">
        <div className={s.content}>
          <h1 className={s.title}>{article.title}</h1>
          <ThePageContent content={article.content.raw.children} />
        </div>
      </div>
      <TheFeedback />
    </>
  );
}
