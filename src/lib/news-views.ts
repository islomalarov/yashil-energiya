import "server-only";

import { Redis } from "@upstash/redis";

const redis = Redis.fromEnv();

const NEWS_VIEWS_ZSET_KEY = "news:views";
const NEWS_VIEWS_DAY_PREFIX = "news:views:day:";

const RECENT_DAYS = 30;
const DAY_MS = 24 * 60 * 60 * 1000;
// A daily bucket outlives the window by a day, so a full window is always kept.
const DAY_KEY_TTL_SECONDS = ((RECENT_DAYS + 1) * DAY_MS) / 1000;

const dayKey = (time: number) =>
  `${NEWS_VIEWS_DAY_PREFIX}${new Date(time).toISOString().slice(0, 10)}`;

export async function incrementNewsView(id: string) {
  const todayKey = dayKey(Date.now());

  const results = await redis
    .pipeline()
    .zincrby(NEWS_VIEWS_ZSET_KEY, 1, id)
    .zincrby(todayKey, 1, id)
    .expire(todayKey, DAY_KEY_TTL_SECONDS)
    .exec();

  const views = Number(results[0]);

  return Number.isFinite(views) ? views : 0;
}

type RankedNewsView = {
  id: string;
  views: number;
};

// Sorted-set replies with scores are flat: [member, score, member, score, ...].
const toRankedViews = (reply: unknown[]): RankedNewsView[] => {
  const ranked: RankedNewsView[] = [];

  for (let index = 0; index + 1 < reply.length; index += 2) {
    const views = Number(reply[index + 1]);

    ranked.push({
      id: String(reply[index]),
      views: Number.isFinite(views) ? views : 0,
    });
  }

  return ranked;
};

/** Most viewed news of all time. */
export async function getPopularNewsViews(limit = 10) {
  const reply = await redis.zrange<unknown[]>(
    NEWS_VIEWS_ZSET_KEY,
    0,
    Math.max(limit - 1, 0),
    {
      rev: true,
      withScores: true,
    },
  );

  return toRankedViews(reply);
}

/** Most viewed news over the last RECENT_DAYS days (daily buckets summed). */
export async function getRecentPopularNewsViews(limit = 10) {
  const now = Date.now();
  const keys = Array.from({ length: RECENT_DAYS }, (_, day) =>
    dayKey(now - day * DAY_MS),
  );
  const reply = (await redis.zunion(keys.length, keys, {
    withScores: true,
  })) as unknown[];

  return toRankedViews(reply)
    .sort((a, b) => b.views - a.views)
    .slice(0, Math.max(limit, 0));
}
