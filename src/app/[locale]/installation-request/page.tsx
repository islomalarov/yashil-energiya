import { TheFeedback } from "@/components/FeedbackComponent/TheFeedback";
import { TheHero } from "@/components/HeroComponent/TheHero";
import { getTranslations } from "next-intl/server";
import s from "./page.module.scss";

const steps = ["step1", "step2", "step3", "step4", "step5"] as const;
const docs = ["doc1", "doc2", "doc3", "doc4"] as const;

export default async function InstallationRequestPage() {
  const t = await getTranslations("InstallationPage");

  return (
    <>
      <TheHero title1={t("title")} url1="installation-request" />
      <section className={s.page}>
        <div className="container">
          <p className={s.intro}>{t("intro")}</p>
          <div className={s.grid}>
            <article className={s.panel}>
              <h2 className={s.title}>{t("stepsTitle")}</h2>
              <ol className={s.steps}>
                {steps.map((step) => (
                  <li key={step}>{t(step)}</li>
                ))}
              </ol>
            </article>
            <aside className={s.panel}>
              <h2 className={s.title}>{t("docsTitle")}</h2>
              <ul className={s.docs}>
                {docs.map((doc) => (
                  <li key={doc}>{t(doc)}</li>
                ))}
              </ul>
            </aside>
          </div>
          <article className={s.panel}>
            <h2 className={s.title}>{t("templateTitle")}</h2>
            <p className={s.template}>{t("templateText")}</p>
            <h2 className={s.title}>{t("contactTitle")}</h2>
            <p className={s.contact}>{t("contactText")}</p>
          </article>
        </div>
      </section>
      <TheFeedback />
    </>
  );
}
