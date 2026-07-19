import type { RichTextNode } from "@/types/richtext";

export interface SeoFields {
  metaTitle?: string | null;
  metaDescription?: string | null;
  ogImage?: { url: string } | null;
  noIndex?: boolean | null;
  canonicalUrl?: string | null;
}

export interface NewResponse {
  date: string;
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  updatedAt?: string;
  seo?: SeoFields | null;
  description: {
    raw: {
      children: RichTextNode[];
    };
  };
  cover: {
    url: string;
    fileName: string;
    height: number;
    width: number;
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
