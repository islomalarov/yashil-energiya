import { TheFeedback } from "@/components/FeedbackComponent/TheFeedback";
import { TheHero } from "@/components/HeroComponent/TheHero";
import { getTranslations } from "next-intl/server";
import s from "./page.module.scss";

const steps = ["step1", "step2", "step3", "step4"] as const;
const docs = ["doc1", "doc2", "doc3", "doc4"] as const;

export default async function InstallationRequestPage() {
  const t = await getTranslations("InstallationPage");

  return (
    <>
      <TheHero title1={t("title")} url1="installation-request" />
      <section className={s.page}>
        <div className="container">
          <div className={s.lead}>
            <div className={s.leadContent}>
              <h2 className={s.leadTitle}>{t("title")}</h2>
              <p className={s.intro}>{t("intro")}</p>
            </div>
            <div className={s.contactCard}>
              <span className={s.contactLabel}>{t("contactTitle")}</span>
              <p className={s.contact}>{t("contactText")}</p>
            </div>
          </div>

          <div className={s.grid}>
            <article className={s.stepsPanel}>
              <div className={s.sectionHeader}>
                <span className={s.sectionNumber}>01</span>
                <h2 className={s.title}>{t("stepsTitle")}</h2>
              </div>
              <ol className={s.steps}>
                {steps.map((step, index) => (
                  <li key={step}>
                    <span className={s.stepIndex}>{String(index + 1).padStart(2, "0")}</span>
                    <span>{t(step)}</span>
                  </li>
                ))}
              </ol>
            </article>

            <aside className={s.docsPanel}>
              <div className={s.sectionHeader}>
                <span className={s.sectionNumber}>02</span>
                <h2 className={s.title}>{t("docsTitle")}</h2>
              </div>
              <ul className={s.docs}>
                {docs.map((doc) => (
                  <li key={doc}>{t(doc)}</li>
                ))}
              </ul>
            </aside>
          </div>

          <article className={s.templatePanel}>
            <div className={s.sectionHeader}>
              <span className={s.sectionNumber}>03</span>
              <h2 className={s.title}>{t("templateTitle")}</h2>
            </div>
            <p className={s.template}>{t("templateText")}</p>
          </article>
        </div>
      </section>
      <TheFeedback />
    </>
  );
}
