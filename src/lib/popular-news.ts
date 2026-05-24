import "server-only";

import { NewsService } from "services/news.service";
import type { NewResponse } from "services/news.service.types";
import { getPopularNewsViews } from "@/lib/news-views";

const POPULAR_NEWS_LIMIT = 6;

export type PopularNewsItem = NewResponse & {
  views: number;
};

export function getPopularNewsLabels(locale: string) {
  if (locale === "ru") {
    return {
      eyebrow: "В тренде",
      title: "Популярные новости",
    };
  }

  if (locale === "uz") {
    return {
      eyebrow: "Trend",
      title: "Ommabop yangiliklar",
    };
  }

  return {
    eyebrow: "Trending",
    title: "Popular news",
  };
}

export async function getPopularNews(
  locale: string,
  excludeId?: string,
): Promise<PopularNewsItem[]> {
  try {
    const popularViews = await getPopularNewsViews(POPULAR_NEWS_LIMIT + 1);
    const filteredViews = excludeId
      ? popularViews.filter((item) => item.id !== excludeId)
      : popularViews;
    const ids = filteredViews
      .slice(0, POPULAR_NEWS_LIMIT)
      .map(({ id }) => id);

    if (!ids.length) {
      return [];
    }

    const popularNews = await NewsService.getNewsByIds(ids, locale);
    const viewsById = new Map(filteredViews.map((item) => [item.id, item.views]));
    const newsById = new Map(popularNews.map((item) => [item.id, item]));

    return ids.reduce<PopularNewsItem[]>((acc, id) => {
      const item = newsById.get(id);

      if (!item) {
        return acc;
      }

      acc.push({
        ...item,
        views: viewsById.get(id) ?? 0,
      });

      return acc;
    }, []);
  } catch (error) {
    console.error("Failed to load popular news:", error);

    return [];
  }
}
