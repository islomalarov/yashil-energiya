import { gql } from "graphql-request";
import { NewsResponse } from "./news.service.types";
import { fetchData } from "lib/graphql-client";
import { resolveCmsLocale } from "@/lib/cms-locale";

export const NewsService = {
  getAllNews: async (first?: number, skip?: number, locale?: string) => {
    const query = gql`
      query GetNews($first: Int, $skip: Int, $locale: Locale!) {
        news(
          first: $first
          skip: $skip
          orderBy: date_DESC
          locales: [$locale]
        ) {
          date
          id
          slug
          title
          excerpt
          description {
            raw
          }
          cover {
            url
            fileName
            height
            width
          }
        }
        newsConnection(locales: [$locale]) {
          aggregate {
            count
          }
        }
      }
    `;
    return fetchData<NewsResponse>(query, {
      first,
      skip,
      locale: resolveCmsLocale(locale),
    });
  },

  getOneNews: async (slug: string, locale: string) => {
    const query = gql`
      query GetOneNews($slug: String!, $locale: Locale!) {
        news(where: { slug: $slug }, locales: [$locale]) {
          date
          id
          slug
          title
          excerpt
          description {
            raw
          }
          cover {
            url
            fileName
            height
            width
          }
        }
      }
    `;
    const data = await fetchData<NewsResponse>(query, {
      slug,
      locale: resolveCmsLocale(locale),
    });
    return data.news?.[0] || null;
  },

  getNewsByIds: async (ids: string[], locale: string) => {
    if (!ids.length) {
      return [];
    }

    const query = gql`
      query GetNewsByIds($ids: [ID!], $locale: Locale!) {
        news(where: { id_in: $ids }, locales: [$locale]) {
          date
          id
          slug
          title
          excerpt
          description {
            raw
          }
          cover {
            url
            fileName
            height
            width
          }
        }
      }
    `;
    const data = await fetchData<NewsResponse>(query, {
      ids,
      locale: resolveCmsLocale(locale),
    });

    return data.news;
  },

  getLastNews: async (locale: string) => {
    const query = gql`
      query GetLastNews($locale: Locale!) {
        news(first: 3, orderBy: date_DESC, locales: [$locale]) {
          date
          id
          slug
          title
          excerpt
          description {
            raw
          }
          cover {
            url
            fileName
            height
            width
          }
        }
      }
    `;
    const data = await fetchData<NewsResponse>(query, {
      locale: resolveCmsLocale(locale),
    });
    return data.news;
  },
};
