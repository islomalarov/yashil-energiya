import "server-only";

import { Redis } from "@upstash/redis";

const redis = Redis.fromEnv();

const NEWS_VIEWS_ZSET_KEY = "news:views";
const NEWS_VIEW_COUNT_PREFIX = "news:views:count:";
const NEWS_VIEW_META_PREFIX = "news:views:meta:";

export type NewsViewTarget = {
  id: string;
  slug: string;
};

export type PopularNewsView = NewsViewTarget & {
  views: number;
};

export async function incrementNewsView({ id, slug }: NewsViewTarget) {
  const viewedAt = new Date().toISOString();

  const results = await redis
    .pipeline()
    .incr(`${NEWS_VIEW_COUNT_PREFIX}${id}`)
    .zincrby(NEWS_VIEWS_ZSET_KEY, 1, id)
    .hset(`${NEWS_VIEW_META_PREFIX}${id}`, {
      id,
      slug,
      updatedAt: viewedAt,
    })
    .exec();

  const views = Number(results[0]);

  return Number.isFinite(views) ? views : 0;
}

export async function getNewsViews(id: string) {
  const views = await redis.get<number>(`${NEWS_VIEW_COUNT_PREFIX}${id}`);

  return views ?? 0;
}

export async function getPopularNewsViews(limit = 10) {
  const ids = await redis.zrange<string[]>(
    NEWS_VIEWS_ZSET_KEY,
    0,
    Math.max(limit - 1, 0),
    {
      rev: true,
    },
  );

  if (!ids.length) {
    return [];
  }

  const pipeline = redis.pipeline();

  ids.forEach((id) => {
    pipeline.get(`${NEWS_VIEW_COUNT_PREFIX}${id}`);
    pipeline.hgetall(`${NEWS_VIEW_META_PREFIX}${id}`);
  });

  const results = await pipeline.exec();

  return ids.reduce<PopularNewsView[]>((acc, id, index) => {
    const views = Number(results[index * 2]);
    const meta = results[index * 2 + 1] as Partial<NewsViewTarget> | null;
    const slug = meta?.slug;

    if (!slug) {
      return acc;
    }

    acc.push({
      id,
      slug,
      views: Number.isFinite(views) ? views : 0,
    });

    return acc;
  }, []);
}
