import { TheFeedback } from "@/src/components/FeedbackComponent/TheFeedback";
import { TheHero } from "@/src/components/HeroComponent/TheHero";
import { useTranslations } from "next-intl";
import Link from "next/link";
import s from "./page.module.scss";
import { jobs } from "@/data/jobs";

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
