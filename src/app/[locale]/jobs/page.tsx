import { TheFeedback } from "@/src/components/FeedbackComponent/TheFeedback";
import { TheHero } from "@/src/components/HeroComponent/TheHero";
import { useTranslations } from "next-intl";
import Link from "next/link";
import s from "./page.module.scss";

export const jobs = [
  {
    id: 1,
    title: "Специалист по управлению закупками (индивидуальный консультант)",
    description:
      "Министерство энергетики Республики Узбекистан получило грантовые средства, далее именуемый «Грант», в размере 1 700 000 долларов США в эквиваленте от Азиатского банка инфраструктурных инвестиций (AБИИ) на подготовительные мероприятия по проекту «Развитие солнечной энергетики в Узбекистане» (UPDSED) и намеревается использовать часть этих средств на консалтинговые услуги.",
    url: "url1",
  },
];
export default function JobsPage() {
  const t = useTranslations("JobsPage");
  return (
    <>
      <TheHero title1={t("title")} url1="jobs" />
      <div className="container">
        <div className={s.content}>
          {jobs.map((job) => (
            <div key={job.id}>
              <h2>{job.title}</h2>
              <p>{job.description}</p>
              <Link href={`/jobs/job${job.id}`}>Подробно</Link>
            </div>
          ))}
        </div>
      </div>
      <TheFeedback />
    </>
  );
}
