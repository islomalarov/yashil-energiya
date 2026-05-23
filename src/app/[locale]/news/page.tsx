import { TheHero } from "@/components/HeroComponent/TheHero";
import { TheNewsList } from "@/components/NewsListComponent/TheNewsList";
import { TheFeedback } from "@/components/FeedbackComponent/TheFeedback";
import { NewsService } from "services/news.service";
import { ThePaginationControls } from "@/components/PaginationComponent/ThePaginationControls";
import { getLocale, getTranslations } from "next-intl/server";
import { redirect } from "@/i18n/navigation";
import { TheJsonLd } from "@/components/JsonLd/TheJsonLd";
import { absoluteUrl, itemListJsonLd, localizedPath } from "@/lib/seo";
import { ThePopularNews } from "@/components/PopularNewsComponent/ThePopularNews";
import { getPopularNews, getPopularNewsLabels } from "@/lib/popular-news";

type NewsPageProps = {
  searchParams?: Promise<{ page?: string }>;
};

const DEFAULT_PAGE_SIZE = 9;

function normalizePage(page?: string) {
  const parsed = Number(page);
  return Number.isInteger(parsed) && parsed > 0 ? parsed : 1;
}

export default async function News({ searchParams }: NewsPageProps) {
  const locale = await getLocale();
  if (locale === "uz") {
    redirect({ href: "/news", locale: "en" });
  }

  const t = await getTranslations("TheLastNews");
  const { page } = (await searchParams) ?? {};
  const currentPage = normalizePage(page);
  const skip = DEFAULT_PAGE_SIZE * (currentPage - 1);

  const {
    news,
    newsConnection: { aggregate },
  } = await NewsService.getAllNews(DEFAULT_PAGE_SIZE, skip, locale);
  const popularNews = await getPopularNews(locale);

  const totalPages = Math.ceil(aggregate.count / DEFAULT_PAGE_SIZE);

  return (
    <>
      <TheJsonLd
        data={itemListJsonLd(locale, "/news", news, (item) => ({
          name: item.title,
          url: absoluteUrl(localizedPath(locale, `/news/${item.slug}`)),
        }))}
      />
      <TheHero title1={t("heroTitle")} url1="news" />
      <div className="container">
        <TheNewsList news={news} linkLabel={t("link")} />
        <ThePaginationControls
          totalPages={totalPages}
          currentPage={currentPage}
          hrefBase="/news"
        />
        <ThePopularNews
          news={popularNews}
          labels={getPopularNewsLabels(locale)}
        />
      </div>
      <TheFeedback />
    </>
  );
}
