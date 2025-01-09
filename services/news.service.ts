import { request, gql } from "graphql-request";

const graphqlAPI = process.env.NEXT_PUBLIC_HYGRAPH_ENDPOINT;

if (!graphqlAPI) {
  throw new Error("Invalid/Missing environment variable: HYGRAPH_ENDPOINT");
}
export interface NewResponse {
  new: {
    date: string;
    id: string;
    slug: string;
    title: string;
    excerpt: string;
    description: {
      raw: {
        children: [{}];
      };
    };
    cover: {
      url: string;
      fileName: string;
      height: number;
      width: number;
    };
  };
}
export interface NewsResponse {
  news: NewResponse[];
  newsConnection: {
    pageInfo: {
      hasNextPage: boolean;
      hasPreviousPage: boolean;
      pageSize: number;
      startCursor: string;
      endCursor: string;
    };
    aggregate: {
      count: number;
    };
  };
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
        newsConnection {
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
        new(where: { slug: "${slug}" }, locales: ${locale}) {
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
    const response = await request<NewResponse>(graphqlAPI, query);
    return response.new;
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
    return response;
  },
};
