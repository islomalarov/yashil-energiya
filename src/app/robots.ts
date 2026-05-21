import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/api/",
          "/_next/",
          "/_vercel/",
          "/uz/news",
          "/uz/news/",
          "/uz/articles",
          "/uz/articles/",
          "/uz/plants/",
          "/uz/vacancies/",
        ],
      },
    ],
    sitemap: [
      `${siteUrl}/sitemap.xml`,
      `${siteUrl}/image-sitemap.xml`,
      `${siteUrl}/news-sitemap.xml`,
    ],
    host: siteUrl,
  };
}
