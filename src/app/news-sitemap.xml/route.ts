import {
  cmsLocales,
  escapeXml,
  getSafeSitemapContent,
  unique,
} from "@/lib/sitemap-utils";
import { absoluteUrl, localizedPath, siteName } from "@/lib/seo";

export const dynamic = "force-dynamic";
const NEWS_SITEMAP_MAX_AGE_MS = 48 * 60 * 60 * 1000;

type NewsSitemapItem = {
  url: string;
  title: string;
  date: string;
  language: string;
};

function isRecentNewsDate(date: string) {
  const publishedAt = new Date(date).getTime();
  const ageMs = Date.now() - publishedAt;

  return (
    Number.isFinite(publishedAt) &&
    ageMs >= 0 &&
    ageMs <= NEWS_SITEMAP_MAX_AGE_MS
  );
}

export async function GET() {
  const newsItemsNested = await Promise.all(
    cmsLocales.map(async (locale) => {
      const { news } = await getSafeSitemapContent(locale);

      return news
        .filter((item) => isRecentNewsDate(item.date))
        .map((item) => ({
          url: absoluteUrl(localizedPath(locale, `/news/${item.slug}`)),
          title: item.title,
          date: item.date,
          language: locale,
        }));
    }),
  );

  const newsItems = unique(
    newsItemsNested.flat(),
    (item: NewsSitemapItem) => `${item.language}:${item.url}`,
  );

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
${newsItems
  .map(
    (item) => `  <url>
    <loc>${escapeXml(item.url)}</loc>
    <news:news>
      <news:publication>
        <news:name>${escapeXml(siteName)}</news:name>
        <news:language>${escapeXml(item.language)}</news:language>
      </news:publication>
      <news:publication_date>${escapeXml(item.date)}</news:publication_date>
      <news:title>${escapeXml(item.title)}</news:title>
    </news:news>
  </url>`,
  )
  .join("\n")}
</urlset>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=1800, stale-while-revalidate=86400",
    },
  });
}
