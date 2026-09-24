import { fetchData } from "lib/sanity-client";
import { CACHE_TAGS } from "lib/cache-tags";
import type { RichText } from "@/types/richtext";
import {
  ENTRY_ID,
  IMAGE,
  SEO,
  cmsLocale,
  hasLocale,
  languages,
  localized,
  richText,
} from "./fragments";
import type { CmsImage, SeoFields } from "./news.service.types";

export interface Article {
  id: string;
  title: string;
  cover: CmsImage;
  slug: string;
  excerpt: string;
  createdAt?: string;
  updatedAt?: string;
  seo?: SeoFields | null;
  content: RichText;
  /** Languages this article is filled in. */
  languages?: string[];
}

export interface ArticlesResponse {
  articles: Article[];
}

const tags = [CACHE_TAGS.article];

const FILTER = `_type == "article" && ${hasLocale()}`;

const FIELDS = `
  ${ENTRY_ID},
  "slug": slug.current,
  "cover": cover${IMAGE},
  "createdAt": publishedAt,
  "updatedAt": _updatedAt,
  ${languages()}
`;

const LOCALIZED_FIELDS = `title, excerpt, ${richText("content")}`;

export const ArticlesService = {
  getAllArticles: async (locale: string) => {
    // Oldest first — the order the Hygraph query returned (createdAt asc).
    const query = `*[${FILTER}] | order(publishedAt asc, _id asc){
      ${FIELDS},
      ${localized(`${LOCALIZED_FIELDS}, "seo": seo{ noIndex }`)}
    }`;

    return fetchData<Article[]>(query, { locale: cmsLocale(locale) }, { tags });
  },

  getOneArticle: async (slug: string, locale: string) => {
    const query = `*[${FILTER} && slug.current == $slug][0]{
      ${FIELDS},
      ${localized(`${LOCALIZED_FIELDS}, ${SEO}`)}
    }`;

    return fetchData<Article | null>(
      query,
      { slug, locale: cmsLocale(locale) },
      { tags },
    );
  },
};
