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
  getAllNews: async (first?: number, skip?: number) => {
    const query = gql`
      query GetNews {
        news(first:${first}, skip:${skip}, orderBy: date_DESC) {
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
  getOneNews: async (slug: string) => {
    const query = gql`
      query getOneNews {
        new(where: { slug: "${slug}" }) {
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
          }
        }
      }
    `;
    const response = await request<NewResponse>(graphqlAPI, query);
    return response.new;
  },
  getLastNews: async () => {
    const query = gql`
      query GetLastNews {
        news(last: 3) {
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
          }
        }
      }
    `;
    const response = await request<NewsResponse>(graphqlAPI, query);
    return response;
  },
};