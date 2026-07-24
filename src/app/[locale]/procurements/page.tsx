"use client";

import { TheFeedback } from "@/components/FeedbackComponent/TheFeedback";
import { TheHero } from "@/components/HeroComponent/TheHero";
import { TheReveal } from "@/components/ui/Reveal/TheReveal";
import { Link } from "@/i18n/navigation";
import { useLocale, useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";
import s from "./page.module.scss";
import { tenders } from "data/tenders";

export default function TendersPage() {
  const t = useTranslations("TendersPage");
  const locale = useLocale();

  return (
    <>
      <TheHero title1={t("title")} url1="procurements" />
      <div className={`${s.container} container`}>
        <TheReveal className={s.intro}>
          <p>{t("intro")}</p>
        </TheReveal>

        <TheReveal stagger className={s.grid} motionKey="procurements-grid">
          {tenders.map((tender) => {
            const name =
              locale === "en" ? tender.projectNameEn : tender.projectNameRu;
            const description =
              locale === "en"
                ? tender.projectDescriptionEn
                : tender.projectDescriptionRu;
            const count =
              locale === "en"
                ? tender.tendersEn?.length
                : tender.tendersRu?.length;

            return (
              <Link
                key={tender.id}
                href={`/procurements/procurement${tender.id}`}
                className={s.card}
              >
                <span className={s.badge}>
                  {tender.projectNumber || t("generalLabel")}
                </span>
                <h2 className={s.cardTitle}>{name}</h2>
                {description && (
                  <p className={s.cardText}>{description}</p>
                )}
                <span className={s.cardFooter}>
                  {count ? (
                    <span className={s.count}>
                      {t("tendersCount", { count })}
                    </span>
                  ) : (
                    <span />
                  )}
                  <span className={s.more}>
                    {t("more")}
                    <ArrowRight size={16} aria-hidden="true" />
                  </span>
                </span>
              </Link>
            );
          })}
        </TheReveal>
      </div>
      <TheFeedback />
    </>
  );
}
