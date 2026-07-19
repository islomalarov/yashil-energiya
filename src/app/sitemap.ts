import type { MetadataRoute } from "next";
import {
  absoluteUrl,
  languageAlternates,
  localizedPath,
  SeoLocale,
  staticRoutes,
} from "@/lib/seo";
import {
  cmsLocales,
  getSafeSitemapContent,
  getStaticPathLocales,
} from "@/lib/sitemap-utils";

const now = new Date();

export const dynamic = "force-dynamic";
export const revalidate = 3600;

function sitemapEntry(
  locale: SeoLocale,
  path: string,
  alternates: readonly SeoLocale[] = getStaticPathLocales(path),
  lastModified: Date | string = now,
): MetadataRoute.Sitemap[number] {
  return {
    url: absoluteUrl(localizedPath(locale, path)),
    lastModified,
    changeFrequency: path === "/" ? "daily" : "weekly",
    priority: path === "/" ? 1 : 0.7,
    alternates: {
      languages: languageAlternates(path, alternates),
    },
  };
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticEntries = Object.values(staticRoutes).flatMap((path) =>
    getStaticPathLocales(path).map((locale) => sitemapEntry(locale, path)),
  );

  const dynamicEntries = [];

  for (const locale of cmsLocales) {
    const { news, articles, plants, vacancies } =
      await getSafeSitemapContent(locale);

    dynamicEntries.push(
      ...[
        ...news
          .filter((item) => !item.seo?.noIndex)
          .map((item) =>
            sitemapEntry(
              locale,
              `/news/${item.slug}`,
              cmsLocales,
              item.updatedAt ?? now,
            ),
          ),
        ...articles
          .filter((item) => !item.seo?.noIndex)
          .map((item) =>
            sitemapEntry(
              locale,
              `/articles/${item.slug}`,
              cmsLocales,
              item.updatedAt ?? now,
            ),
          ),
        ...plants.map((item) =>
          sitemapEntry(locale, `/plants/${item.id}`, cmsLocales),
        ),
        ...vacancies.map((item) =>
          sitemapEntry(locale, `/vacancies/${item.id}`, cmsLocales),
        ),
      ],
    );
  }

  return [...staticEntries, ...dynamicEntries];
}
