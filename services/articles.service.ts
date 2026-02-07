import { fetchData } from "lib/graphql-client";
import { gql } from "graphql-request";
import type { RichTextNode } from "@/types/richtext";

export interface Article {
  id: string;
  title: string;
  cover: {
    url: string;
    fileName: string;
    height: number;
    width: number;
  };
  slug: string;
  excerpt: string;
  content: {
    raw: {
      children: RichTextNode[];
    };
  };
}

export interface ArticlesResponse {
  articles: Article[];
}
interface ArticleResponse {
  article: Article;
}

export const ArticlesService = {
  getAllArticles: async (locale: string) => {
    const query = gql`
      query GetArticles($locale: Locale!) {
        articles(locales: [$locale]) {
          id
          title
          cover {
            url
            fileName
            height
            width
          }
          slug
          excerpt
          content {
            raw
          }
        }
      }
    `;
    const response = await fetchData<ArticlesResponse>(query, { locale });
    return response.articles;
  },

  getOneArticle: async (slug: string, locale: string) => {
    const query = gql`
      query GetOneArticle($slug: String!, $locale: Locale!) {
        article(where: { slug: $slug }, locales: [$locale]) {
          id
          title
          cover {
            url
            fileName
            height
            width
          }
          slug
          excerpt
          content {
            raw
          }
        }
      }
    `;
    const response = await fetchData<ArticleResponse>(query, { slug, locale });
    return response.article;
  },
};
