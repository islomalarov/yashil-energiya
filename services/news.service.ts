import { request, gql } from "graphql-request";
import { NewsResponse } from "./news.service.types";

const graphqlAPI = process.env.NEXT_PUBLIC_HYGRAPH_ENDPOINT;

if (!graphqlAPI) {
  throw new Error("Invalid/Missing environment variable: HYGRAPH_ENDPOINT");
}

export const NewsService = {
  getAllNews: async (first?: number, skip?: number, locale?: string) => {
    const query = gql`
      query GetNews {
        news(first:${first}, skip:${skip}, orderBy: date_DESC, locales: ${locale}) {
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
        newsConnection(locales: ${locale}) {
          pageInfo {
            hasNextPage
            hasPreviousPage
            pageSize
            startCursor
            endCursor
          }
          aggregate {
            count
          }
        }
      }
    `;
    const response = await request<NewsResponse>(graphqlAPI, query);
    return response;
  },
  getOneNews: async (slug: string, locale: string) => {
    const query = gql`
      query getOneNews {
        news(where: { slug: "${slug}" }, locales: ${locale}) {
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
    const response = await request<NewsResponse>(graphqlAPI, query);
    return response.news[0];
  },
  getLastNews: async (locale: string) => {
    const query = gql`
      query GetLastNews {
        news(first: 3, orderBy: date_DESC, locales: ${locale}) {
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
    const response = await request<NewsResponse>(graphqlAPI, query);
    return response.news;
  },
};
