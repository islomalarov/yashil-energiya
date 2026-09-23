import { fetchData } from "lib/sanity-client";
import { CACHE_TAGS } from "lib/cache-tags";
import { ENTRY_ID, IMAGE, LANGUAGES, SEO, richText } from "./fragments";
import type { NewResponse, NewsResponse } from "./news.service.types";

const tags = [CACHE_TAGS.news];

const FILTER = `_type == "news" && language == $locale`;

const CARD = `
  ${ENTRY_ID},
  "slug": slug.current,
  title,
  date,
  excerpt,
  "cover": cover${IMAGE},
  ${richText("description")}
`;

export const NewsService = {
  getAllNews: async (first?: number, skip = 0, locale = "en") => {
    const paginated = first !== undefined;
    const query = `{
      "news": *[${FILTER}] | order(date desc, _id asc) ${paginated ? "[$start...$end]" : ""} {
        ${CARD},
        "updatedAt": _updatedAt,
        "seo": seo{ noIndex },
        ${LANGUAGES}
      },
      "newsConnection": { "aggregate": { "count": count(*[${FILTER}]) } }
    }`;

    return fetchData<NewsResponse>(
      query,
      paginated ? { locale, start: skip, end: skip + first } : { locale },
      { tags },
    );
  },

  getOneNews: async (slug: string, locale: string) => {
    const query = `*[${FILTER} && slug.current == $slug][0]{
      ${CARD},
      "updatedAt": _updatedAt,
      ${SEO},
      ${LANGUAGES}
    }`;

    return fetchData<NewResponse | null>(query, { slug, locale }, { tags });
  },

  getNewsByIds: async (ids: string[], locale: string) => {
    if (!ids.length) {
      return [];
    }

    const query = `*[${FILTER} && entryId in $ids]{ ${CARD} }`;
    return fetchData<NewResponse[]>(query, { ids, locale }, { tags });
  },

  getLastNews: async (locale: string) => {
    const query = `*[${FILTER}] | order(date desc, _id asc) [0...3]{ ${CARD} }`;
    return fetchData<NewResponse[]>(query, { locale }, { tags });
  },
};
