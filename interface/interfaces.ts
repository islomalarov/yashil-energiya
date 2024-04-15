interface NewsProps {
  newsArray: [];
  url: string;
  begin?: number;
  end?: number;
}
interface HeroProps {
  title1: string;
  url1: string;
  title2?: string;
  url2?: string;
}
interface LinkObj {
  img: string;
  body: string;
  url: string;
}
interface Url {
  body: {
    name: string;
    phone: string;
    msg: string;
  };
}
interface CeoProps {
  id: number;
  name: string;
  jobTitle: string;
  email: string;
}
interface EmailTemplateProps {
  firstName: string;
  phone: string;
  msg: string;
}
interface PaginationProps {
  page: number;
  totalPage: number;
  prevPage: number;
  nextPage: number;
  pageNumbers: number[];
}
interface SearchProps {
  searchParams: { page: string };
}
