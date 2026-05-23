import {
  buildMultilingualStaticUrls,
  buildNewsImageAlt,
  cmsLocales,
  escapeXml,
  getSafeSitemapContent,
  unique,
} from "@/lib/sitemap-utils";
import { absoluteUrl, defaultOgImage, localizedPath, siteName } from "@/lib/seo";

export const dynamic = "force-dynamic";

type ImageItem = {
  pageUrl: string;
  imageUrl: string;
  title: string;
};

export async function GET() {
  const staticImages: ImageItem[] = buildMultilingualStaticUrls().map(
    ({ url }) => ({
      pageUrl: url,
      imageUrl: absoluteUrl(defaultOgImage),
      title: `${siteName} renewable energy`,
    }),
  );

  const cmsImagesNested = await Promise.all(
    cmsLocales.map(async (locale) => {
      const content = await getSafeSitemapContent(locale);

      return [
        ...content.news
          .filter((item) => item.cover?.url)
          .map((item) => ({
            pageUrl: absoluteUrl(localizedPath(locale, `/news/${item.slug}`)),
            imageUrl: item.cover.url,
            title: buildNewsImageAlt(item.title),
          })),
        ...content.articles
          .filter((item) => item.cover?.url)
          .map((item) => ({
            pageUrl: absoluteUrl(
              localizedPath(locale, `/articles/${item.slug}`),
            ),
            imageUrl: item.cover.url,
            title: buildNewsImageAlt(item.title),
          })),
        ...content.plants.flatMap((plant) =>
          plant.pictures
            .filter((picture) => picture.url)
            .map((picture) => ({
              pageUrl: absoluteUrl(localizedPath(locale, `/plants/${plant.id}`)),
              imageUrl: picture.url,
              title: picture.fileName || plant.title,
            })),
        ),
      ];
    }),
  );

  const imageItems = unique(
    [...staticImages, ...cmsImagesNested.flat()],
    (item) => `${item.pageUrl}:${item.imageUrl}`,
  );

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${imageItems
  .map(
    (item) => `  <url>
    <loc>${escapeXml(item.pageUrl)}</loc>
    <image:image>
      <image:loc>${escapeXml(item.imageUrl)}</image:loc>
      <image:title>${escapeXml(item.title)}</image:title>
    </image:image>
  </url>`,
  )
  .join("\n")}
</urlset>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
