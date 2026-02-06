export interface NewResponse {
  date: string;
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  description: {
    raw: {
      children: unknown[];
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
