import { TheFeedback } from "@/components/FeedbackComponent/TheFeedback";
import { TheHero } from "@/components/HeroComponent/TheHero";

import s from "./page.module.scss";
import { VacancyService } from "services/vacancies.service";
import { getLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

export default async function VacanciesPage() {
  const t = await getTranslations("VacanciesPage");
  const locale = await getLocale();
  const vacancies = await VacancyService.getAllVacancies(locale);

  return (
    <>
      <TheHero title1={t("title")} url1="vacancies" />
      <div className="container">
        <div className={s.content}>
          {vacancies.map((vacancy) => (
            <div key={vacancy.id} className={s.vacancy}>
              <h2>{vacancy.title}</h2>
              <p className="description">{vacancy.excerpt}</p>
              <Link href={`/vacancies/${vacancy.id}`}>{t("detail")}</Link>
            </div>
          ))}
        </div>
      </div>
      <TheFeedback />
    </>
  );
}
