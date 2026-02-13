import { TheFeedback } from "@/components/FeedbackComponent/TheFeedback";
import { TheHero } from "@/components/HeroComponent/TheHero";
import s from "./page.module.scss";
import { VacancyService } from "services/vacancies.service";
import { getLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

export default async function VacanciesPage() {
  const t = await getTranslations("VacanciesPage");
  const locale = await getLocale();
  const vacancies = (await VacancyService.getAllVacancies(locale)) ?? [];

  return (
    <>
      <TheHero title1={t("title")} url1="vacancies" />

      <div className="container">
        <div className={s.page}>
          <header className={s.header}>
            <div className={s.badge}>{t("title")}</div>
            <h1 className={s.title}>{t("openPositions")}</h1>
            <p className={s.subtitle}>{t("subtitle")}</p>
          </header>

          {vacancies.length ? (
            <section className={s.grid}>
              {vacancies.map((vacancy) => (
                <article key={vacancy.id} className={s.card}>
                  <div className={s.cardTop}>
                    <h2 className={s.cardTitle}>{vacancy.title}</h2>

                    {vacancy.references ? (
                      <div className={s.chip}>{vacancy.references}</div>
                    ) : (
                      <div className={s.chipMuted}>{t("noReferences")}</div>
                    )}
                  </div>

                  <p className={s.excerpt}>{vacancy.excerpt}</p>

                  <div className={s.cardFooter}>
                    <Link
                      className={s.btn}
                      href={`/vacancies/${vacancy.id}`}
                      locale={locale}
                    >
                      {t("detail")}
                    </Link>
                  </div>
                </article>
              ))}
            </section>
          ) : (
            <div className={s.empty}>
              <div className={s.emptyTitle}>{t("emptyTitle")}</div>
              <div className={s.emptyText}>{t("emptyText")}</div>
            </div>
          )}
        </div>
      </div>

      <TheFeedback />
    </>
  );
}
