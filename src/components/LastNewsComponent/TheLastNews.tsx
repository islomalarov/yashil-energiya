import "@/scss/globals.scss";
import styles from "./TheLastNews.module.scss";
import { Link } from "@/src/i18n/navigation";
import { TheNewsList } from "../NewsListComponent/TheNewsList";
import { NewsService } from "@/services/news.service";
import { TheMotionWrapper } from "../MotionWrapper/TheMotionWrapper";
import { getLocale, getTranslations } from "next-intl/server";

export async function TheLastNews() {
  const t = await getTranslations("TheLastNews");
  const locale = await getLocale();
  const news = await NewsService.getLastNews(locale);

  return (
    <TheMotionWrapper>
      <div className={styles.header}>
        <h3 className="title">{t("title")}</h3>
        <Link href="/news" className={styles.link}>
          {t("linkTitle")}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="9"
            height="14"
            viewBox="0 0 9 14"
            fill="none"
          >
            <path
              d="M1 13L7.0251 7L1 1"
              stroke="#12903E"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Link>
      </div>
      <TheNewsList news={news} />
    </TheMotionWrapper>
  );
}
