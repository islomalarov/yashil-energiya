interface NewsItem {
  _id: string;
  id: number;
  title: string;
  subtitle: string;
  date: Date;
  url: string;
}

interface NewsProps {
  newsArray: NewsItem[];
  url: string;
  begin?: number;
  end?: number;
}

interface ProjectProps {
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

interface TheFeedbackProps {
  firstName: string;
  phone: string;
  message: string;
}
