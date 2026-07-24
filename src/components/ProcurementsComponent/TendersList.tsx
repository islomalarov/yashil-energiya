"use client";

import { useLocale, useTranslations } from "next-intl";
import { Download } from "lucide-react";
import { TheReveal } from "@/components/ui/Reveal/TheReveal";
import s from "./Procurement.module.scss";

export type Tender = {
  id: number;
  title: string;
  status: string;
  deadline: string;
  file?: string;
};

// Status values that mean an active/open procedure across all three locales.
const OPEN_STATUSES = new Set(["открыт", "открыта", "open", "ochiq"]);

function isOpen(status: string) {
  return OPEN_STATUSES.has(status.trim().toLowerCase());
}

// Uzbek (Latin) month names — ICU long-month data for "uz" is unreliable
// (renders as "M05"), so format uz dates manually.
const UZ_MONTHS = [
  "yanvar",
  "fevral",
  "mart",
  "aprel",
  "may",
  "iyun",
  "iyul",
  "avgust",
  "sentyabr",
  "oktyabr",
  "noyabr",
  "dekabr",
];

// Deadlines come as "dd.mm.yyyy" strings — format by locale, keep raw on fail.
function formatDeadline(raw: string, locale: string) {
  const match = raw.trim().match(/^(\d{2})\.(\d{2})\.(\d{4})$/);
  if (!match) return raw;
  const [, dd, mm, yyyy] = match;
  const day = Number(dd);
  const monthIndex = Number(mm) - 1;
  const year = Number(yyyy);
  const date = new Date(year, monthIndex, day);
  if (Number.isNaN(date.getTime())) return raw;
  if (locale.startsWith("uz")) {
    return `${day}-${UZ_MONTHS[monthIndex]}, ${year}-yil`;
  }
  try {
    return new Intl.DateTimeFormat(locale, {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(date);
  } catch {
    return raw;
  }
}

function fileExtension(file?: string) {
  if (!file) return "";
  const ext = file.split(".").pop();
  return ext ? ext.toUpperCase() : "";
}

export const TendersList = ({ tenders }: { tenders: Tender[] }) => {
  const t = useTranslations("TendersPage");
  const locale = useLocale();

  return (
    <TheReveal stagger as="ul" className={s.tendersList} motionKey="tenders">
      <li className={s.tendersHead} aria-hidden="true">
        <span>{t("colTender")}</span>
        <span>{t("colStatus")}</span>
        <span>{t("colDeadline")}</span>
        <span>{t("colDocs")}</span>
      </li>

      {tenders.map((tender) => {
        const open = isOpen(tender.status);
        const ext = fileExtension(tender.file);
        return (
          <li key={tender.id} className={s.tenderRow}>
            <div className={s.cellTitle}>
              <span className={s.cellLabel}>{t("colTender")}</span>
              <span className={s.tenderTitle}>{tender.title}</span>
            </div>

            <div className={s.cellStatus}>
              <span className={s.cellLabel}>{t("colStatus")}</span>
              <span
                className={`${s.pill} ${open ? s.pillOpen : s.pillNeutral}`}
              >
                {open && <span className={s.pillDot} aria-hidden="true" />}
                {tender.status}
              </span>
            </div>

            <div className={s.cellDeadline}>
              <span className={s.cellLabel}>{t("colDeadline")}</span>
              <span className={s.deadline}>
                {formatDeadline(tender.deadline, locale)}
              </span>
            </div>

            <div className={s.cellDocs}>
              <span className={s.cellLabel}>{t("colDocs")}</span>
              {tender.file ? (
                <a
                  className={s.downloadBtn}
                  href={`/documents/${tender.file}`}
                  download
                >
                  <Download size={16} aria-hidden="true" />
                  <span>{t("download")}</span>
                  {ext && <span className={s.fileExt}>{ext}</span>}
                </a>
              ) : (
                <span className={s.noFile}>{t("noAttachment")}</span>
              )}
            </div>
          </li>
        );
      })}
    </TheReveal>
  );
};
