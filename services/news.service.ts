import { gql } from "graphql-request";
import { NewsResponse } from "./news.service.types";
import { fetchData } from "@/lib/graphql-client";

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
    return fetchData<NewsResponse>(query, { first, skip, locale });
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
    const data = await fetchData<NewsResponse>(query, { slug, locale });
    return data.news?.[0] || null;
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
    const data = await fetchData<NewsResponse>(query, { locale });
    return data.news;
  },
};
