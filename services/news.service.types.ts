import type { RichText } from "@/types/richtext";

export interface SeoFields {
  metaTitle?: string | null;
  metaDescription?: string | null;
  ogImage?: { url: string } | null;
  noIndex?: boolean | null;
  canonicalUrl?: string | null;
}

export interface CmsImage {
  url: string;
  fileName: string;
  height: number;
  width: number;
  altText?: string | null;
}

export interface NewResponse {
  date: string;
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  updatedAt?: string;
  seo?: SeoFields | null;
  description?: RichText | null;
  cover: CmsImage;
  /** Languages with a published version of this news item. */
  languages?: string[];
}

export interface NewsResponse {
  news: NewResponse[];
  newsConnection: {
    aggregate: {
      count: number;
    };
  };
}
