import "server-only";
import { Redis } from "@upstash/redis";
import { ArticlesService } from "services/articles.service";
import { NewsService } from "services/news.service";
import { resolveCmsLocale } from "@/lib/cms-locale";
import { getChildren, getText, isRecord } from "@/types/richtext";
import { COMPANY_CONTACTS, SITE_PAGES } from "@/lib/assistant/site-map";

/**
 * Knowledge-base layer for the virtual assistant.
 *
 * Aggregates the site's content (static navigation + CMS articles/news from
 * Hygraph) into a single compact text digest that is stuffed into the model's
 * system prompt. For a site this size a vector store is unnecessary; the digest
 * fits comfortably in Gemini's context window.
 *
 * The digest is cached in Upstash Redis (keyed by CMS locale) so we don't hit
 * Hygraph on every chat message. Note: Hygraph has no `uz` locale, so uz users
 * get the `en` digest as source material — the model still answers in uz.
 */

const KB_CACHE_PREFIX = "assistant:kb:v3";
const KB_CACHE_TTL_SECONDS = 3600;

// Prompt-size budget. Smaller digest => smaller input => faster time-to-first
// -token from Gemini. These caps keep the assistant grounded without bloating
// the request; raise them only if answers start missing content.
/** Max plain-text characters kept per CMS item. */
const MAX_ITEM_CHARS = 280;
/** Newest N news items to include. */
const NEWS_LIMIT = 6;
/** Max articles to include. */
const ARTICLES_LIMIT = 10;

const redis = Redis.fromEnv();

/** Flatten a Hygraph RichText `raw` tree into collapsed plain text. */
export function richTextToPlainText(raw: unknown): string {
  const parts: string[] = [];

  const walk = (node: unknown) => {
    const text = getText(node);
    if (text) parts.push(text);
    for (const child of getChildren(node)) walk(child);
  };

  // `raw` may be the root object `{ children: [...] }` or already an array.
  if (Array.isArray(raw)) {
    for (const node of raw) walk(node);
  } else if (isRecord(raw)) {
    walk(raw);
  }

  return parts.join(" ").replace(/\s+/g, " ").trim();
}

function truncate(value: string, max = MAX_ITEM_CHARS): string {
  if (value.length <= max) return value;
  return `${value.slice(0, max).trimEnd()}…`;
}

/** Prefix a locale-agnostic site path with the active locale segment. */
function localizedUrl(locale: string, path: string): string {
  if (path === "/") return `/${locale}`;
  return `/${locale}${path}`;
}

function buildNavigationSection(locale: string): string {
  const lines = SITE_PAGES.map(
    (page) =>
      `- ${page.title} (${localizedUrl(locale, page.path)}): ${page.description}`,
  );
  return `## Site pages\n${lines.join("\n")}`;
}

async function buildArticlesSection(
  locale: string,
  cmsLocale: string,
): Promise<string> {
  try {
    const articles = await ArticlesService.getAllArticles(cmsLocale);
    if (!articles?.length) return "";

    const lines = articles.slice(0, ARTICLES_LIMIT).map((article) => {
      const url = localizedUrl(locale, `/articles/${article.slug}`);
      const body =
        article.excerpt?.trim() ||
        truncate(richTextToPlainText(article.content?.raw?.children));
      return `- ${article.title} (${url}): ${truncate(body)}`;
    });

    return `## Articles\n${lines.join("\n")}`;
  } catch (error) {
    console.error("[assistant] Failed to load articles for KB:", error);
    return "";
  }
}

async function buildNewsSection(
  locale: string,
  cmsLocale: string,
): Promise<string> {
  try {
    const data = await NewsService.getAllNews(NEWS_LIMIT, 0, cmsLocale);
    const news = data?.news ?? [];
    if (!news.length) return "";

    const lines = news.map((item) => {
      const url = localizedUrl(locale, `/news/${item.slug}`);
      const date = item.date ? ` [${item.date}]` : "";
      const body =
        item.excerpt?.trim() ||
        truncate(richTextToPlainText(item.description?.raw?.children));
      return `- ${item.title}${date} (${url}): ${truncate(body)}`;
    });

    return `## News (latest ${news.length})\n${lines.join("\n")}`;
  } catch (error) {
    console.error("[assistant] Failed to load news for KB:", error);
    return "";
  }
}

/**
 * Build (or read from cache) the knowledge digest for a given user locale.
 * `locale` is the user's UI locale (en | ru | uz) and is used for links;
 * CMS content is fetched in the resolved Hygraph locale.
 */
export async function buildKnowledgeBase(locale: string): Promise<string> {
  const cmsLocale = resolveCmsLocale(locale);
  const cacheKey = `${KB_CACHE_PREFIX}:${locale}`;

  try {
    const cached = await redis.get<string>(cacheKey);
    if (cached) return cached;
  } catch (error) {
    console.error("[assistant] KB cache read failed:", error);
  }

  const [navigation, articles, news] = await Promise.all([
    Promise.resolve(buildNavigationSection(locale)),
    buildArticlesSection(locale, cmsLocale),
    buildNewsSection(locale, cmsLocale),
  ]);

  const contacts = `## Company contacts\n${COMPANY_CONTACTS}`;

  const digest = [contacts, navigation, articles, news]
    .filter(Boolean)
    .join("\n\n");

  try {
    await redis.set(cacheKey, digest, { ex: KB_CACHE_TTL_SECONDS });
  } catch (error) {
    console.error("[assistant] KB cache write failed:", error);
  }

  return digest;
}
