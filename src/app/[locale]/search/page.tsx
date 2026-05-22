import { Link } from "@/i18n/navigation";
import { getLocale, getTranslations } from "next-intl/server";
import { ArticlesService } from "services/articles.service";
import { NewsService } from "services/news.service";
import { PlantService } from "services/plants.service";
import s from "./page.module.scss";

type SearchPageProps = {
  searchParams?: Promise<{ q?: string }>;
};

type SearchResult = {
  title: string;
  description: string;
  href: string;
  type: string;
};

const staticPages = [
  { key: "about", href: "/about" },
  { key: "ceo", href: "/ceo" },
  { key: "news", href: "/news" },
  { key: "articles", href: "/articles" },
  { key: "procurements", href: "/procurements" },
  { key: "solarpanels", href: "/solarpanels" },
  { key: "microges", href: "/microges" },
  { key: "chargingstation", href: "/chargingstation" },
  { key: "installationRequest", href: "/installation-request" },
  { key: "plants", href: "/plants" },
  { key: "documents", href: "/documents" },
  { key: "contacts", href: "/contacts" },
  { key: "vacancies", href: "/vacancies" },
] as const;

function matches(result: SearchResult, query: string) {
  const haystack = `${result.title} ${result.description} ${result.type}`.toLowerCase();
  return haystack.includes(query.toLowerCase());
}

async function getCmsResults(locale: string): Promise<SearchResult[]> {
  const cmsLocale = locale === "uz" ? "en" : locale;
  const [news, articles, plants] = await Promise.allSettled([
    NewsService.getAllNews(50, 0, cmsLocale),
    ArticlesService.getAllArticles(cmsLocale),
    PlantService.getAllPlants(50, 0, cmsLocale),
  ]);

  return [
    ...(news.status === "fulfilled"
      ? news.value.news.map((item) => ({
          title: item.title,
          description: item.excerpt,
          href: `/news/${item.slug}`,
          type: "news",
        }))
      : []),
    ...(articles.status === "fulfilled"
      ? articles.value.map((item) => ({
          title: item.title,
          description: item.excerpt,
          href: `/articles/${item.slug}`,
          type: "articles",
        }))
      : []),
    ...(plants.status === "fulfilled"
      ? plants.value.plants.map((item) => ({
          title: item.title,
          description: `${item.address}. ${item.power}`,
          href: `/plants/${item.id}`,
          type: "plants",
        }))
      : []),
  ];
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const locale = await getLocale();
  const t = await getTranslations("SearchPage");
  const { q } = (await searchParams) ?? {};
  const query = q?.trim() ?? "";

  const staticResults: SearchResult[] = staticPages.map((page) => ({
    title: t(`pages.${page.key}.title`),
    description: t(`pages.${page.key}.description`),
    href: page.href,
    type: t("types.page"),
  }));

  const cmsResults = query ? await getCmsResults(locale) : [];
  const results = query
    ? [...staticResults, ...cmsResults].filter((result) => matches(result, query))
    : [];

  return (
    <section className={s.searchPage}>
      <div className="container">
        <div className={s.header}>
          <h1 className={s.title}>{t("title")}</h1>
          <form className={s.form} action={`/${locale}/search`}>
            <input
              className={s.input}
              type="search"
              name="q"
              defaultValue={query}
              placeholder={t("placeholder")}
              aria-label={t("label")}
            />
            <button className={s.button} type="submit">
              {t("submit")}
            </button>
          </form>
          {query && (
            <p className={s.summary}>
              {results.length > 0
                ? t("results", { count: results.length, query })
                : t("empty", { query })}
            </p>
          )}
        </div>

        {results.length > 0 && (
          <ul className={s.results}>
            {results.map((result) => (
              <li className={s.result} key={`${result.href}-${result.title}`}>
                <Link className={s.link} href={result.href}>
                  <span className={s.type}>{result.type}</span>
                  <h2 className={s.resultTitle}>{result.title}</h2>
                  <p className={s.description}>{result.description}</p>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
