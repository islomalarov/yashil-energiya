"use client";

import { TheFeedback } from "@/src/components/FeedbackComponent/TheFeedback";
import { TheHero } from "@/src/components/HeroComponent/TheHero";
import { useLocale, useTranslations } from "next-intl";
import s from "./page.module.scss";
import Link from "next/link";
import { tenders } from "@/data/tenders";

export default function TendersPage() {
  const t = useTranslations("TendersPage");
  const locale = useLocale();

  return (
    <>
      <TheHero title1={t("title")} url1="tenders" />
      <div className={`${s.container} container`}>
        <div className={s.tendersList}>
          {tenders.map((tender) => (
            <Link
              key={tender.id}
              href={`/tenders/tender${tender.id}?lang=${locale}`}
              className={s.tenderItem}
            >
              <div>
                <h2>{tender.projectNumber}</h2>
                <p>
                  {locale === "en"
                    ? tender.projectNameEn
                    : tender.projectNameRu}
                </p>
                <p>
                  {locale === "en"
                    ? tender.projectDescriptionEn
                    : tender.projectDescriptionRu}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <TheFeedback />
    </>
  );
}
