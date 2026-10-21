
import s from "./page.module.scss";
import { TheHero } from "@/components/HeroComponent/TheHero";
import { ArticlesService } from "services/articles.service";
import { getTranslations, setRequestLocale } from "next-intl/server";
import ThePageContent from "@/components/PageContentComponent/ThePageContent";
import { TheFeedback } from "@/components/FeedbackComponent/TheFeedback";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { redirect } from "@/i18n/navigation";
import {
  articleJsonLd,
  breadcrumbJsonLd,
  buildDescription,
  buildTitle,
  cmsAlternateLocales,
  createMetadata,
  optimizedOgImagePath,
} from "@/lib/seo";
import { TheJsonLd } from "@/components/JsonLd/TheJsonLd";
import { formatPublicationDate } from "@/lib/format-date";

type Props = {
  params: Promise<{ slug: string; locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, locale } = await params;
  const article = await ArticlesService.getOneArticle(slug, locale);

  if (!article) {
    return {};
  }

  const t = await getTranslations({ locale, namespace: "TheArticlesList" });

  const seo = article.seo;

  return createMetadata({
    locale,
    path: `/articles/${slug}`,
    title: buildTitle(seo?.metaTitle, article.title),
    absoluteTitle: true,
    description: buildDescription(
      seo?.metaDescription,
      article.excerpt,
      article.content,
    ),
    image: optimizedOgImagePath(seo?.ogImage?.url ?? article.cover?.url, {
      title: article.title,
      cta: t("ogCta"),
    }),
    type: "article",
    modifiedTime: article.updatedAt,
    noIndex: seo?.noIndex ?? false,
    canonicalOverride: seo?.canonicalUrl ?? undefined,
    alternateLocales: cmsAlternateLocales(article.languages),
  });
}

export default async function ArticlePage({ params }: Props) {
  const { slug, locale } = await params;
  setRequestLocale(locale);

  if (!slug) notFound();
  const t = await getTranslations("TheArticlesList");
  const article = await ArticlesService.getOneArticle(slug, locale);

  if (!article) {
    // uz is translated gradually: without a uz version, use the English page.
    if (locale === "uz") {
      redirect({ href: `/articles/${slug}`, locale: "en" });
    }
    notFound();
  }

  return (
    <>
      <TheJsonLd
        data={[
          articleJsonLd({
            locale,
            path: `/articles/${slug}`,
            title: article.title,
            description: article.excerpt,
            image: optimizedOgImagePath(
              article.seo?.ogImage?.url ?? article.cover?.url,
              {
                title: article.title,
                cta: t("ogCta"),
              },
            ),
            modifiedTime: article.updatedAt,
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
          {article.createdAt && (
            <time className={s.publishDate} dateTime={article.createdAt}>
              {formatPublicationDate(article.createdAt, locale)}
            </time>
          )}
          <ThePageContent content={article.content} />
        </div>
      </div>
      <TheFeedback />
    </>
  );
}
