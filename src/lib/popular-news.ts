import "server-only";

import { NewsService } from "services/news.service";
import type { NewResponse } from "services/news.service.types";
import {
  getPopularNewsViews,
  getRecentPopularNewsViews,
} from "@/lib/news-views";
import { loadWithFallback } from "@/lib/cms-locale";

const POPULAR_NEWS_LIMIT = 6;
// Spare candidates cover news that are excluded or no longer published.
const CANDIDATES_LIMIT = POPULAR_NEWS_LIMIT * 2;

export type PopularNewsItem = NewResponse & {
  views: number;
};

export async function getPopularNews(
  locale: string,
  excludeId?: string,
): Promise<PopularNewsItem[]> {
  try {
    const [recentViews, allTimeViews] = await Promise.all([
      getRecentPopularNewsViews(CANDIDATES_LIMIT),
      getPopularNewsViews(CANDIDATES_LIMIT),
    ]);
    // Popularity over the last 30 days comes first; all-time leaders fill
    // the remaining slots without repeating news already picked.
    const viewsById = new Map<string, number>();

    [...recentViews, ...allTimeViews].forEach(({ id, views }) => {
      if (id !== excludeId && !viewsById.has(id)) {
        viewsById.set(id, views);
      }
    });

    const ids = [...viewsById.keys()];

    if (!ids.length) {
      return [];
    }

    // uz is translated gradually: without uz versions, show the English ones.
    const { data: popularNews } = await loadWithFallback(
      locale,
      (contentLocale) => NewsService.getNewsByIds(ids, contentLocale),
      (items) => items.length === 0,
    );
    const newsById = new Map(popularNews.map((item) => [item.id, item]));

    return ids.reduce<PopularNewsItem[]>((acc, id) => {
      const item = newsById.get(id);

      if (!item || acc.length >= POPULAR_NEWS_LIMIT) {
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
