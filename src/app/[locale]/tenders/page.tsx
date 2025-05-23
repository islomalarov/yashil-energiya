"use client";

import { TheFeedback } from "@/src/components/FeedbackComponent/TheFeedback";
import { TheHero } from "@/src/components/HeroComponent/TheHero";
import { useTranslations } from "next-intl";
import s from "./page.module.scss";
import Link from "next/link";
import { useState } from "react";
import { tenders } from "@/data/tenders";

export default function TendersPage() {
  const t = useTranslations("TendersPage");
  const [language, setLanguage] = useState("eng");

  return (
    <>
      <TheHero title1={t("title")} url1="tenders" />
      <div className={`${s.container} container`}>
        <div className={s.languageBtn}>
          <select
            name=""
            id=""
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
          >
            <option value="ru">Ru</option>
            <option value="eng">Eng</option>
          </select>
        </div>
        <div className={s.tendersList}>
          {tenders.map((tender) => (
            <Link
              key={tender.id}
              href={`/tenders/tender${tender.id}?lang=${language}`}
              className={s.tenderItem}
            >
              <div>
                <h2>{tender.projectNumber}</h2>
                <p>
                  {language === "eng"
                    ? tender.projectNameEn
                    : tender.projectNameRu}
                </p>
                <p>
                  {language === "eng"
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
