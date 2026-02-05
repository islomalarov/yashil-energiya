import { TheFeedback } from "@/components/FeedbackComponent/TheFeedback";
import { TheHero } from "@/components/HeroComponent/TheHero";
import { getLocale, getTranslations } from "next-intl/server";
import s from "./page.module.scss";
import { VacancyService } from "services/vacancies.service";
import ThePageContent from "@/components/PageContentComponent/ThePageContent";

type Props = {
  params: { id: string };
};
export default async function VacancyPage({ params: { id } }: Props) {
  const t = await getTranslations("VacanciesPage");
  const locale = await getLocale();
  const vacancy = await VacancyService.getOneVacancy(id, locale);

  if (!vacancy) {
    return <div>{t("notFound")}</div>;
  }

  const { title, description, references } = vacancy;

  return (
    <>
      <TheHero title1={t("title")} url1="vacancies" />
      <div className="container">
        <div className={s.content}>
          <h2 className={s.title}>
            {t("positionTitle")}: {title}
          </h2>
          <p className="description">
            {t("references")}: {references}
          </p>
          <ThePageContent content={description.raw.children} />
        </div>
      </div>
      <TheFeedback />
    </>
  );
}
