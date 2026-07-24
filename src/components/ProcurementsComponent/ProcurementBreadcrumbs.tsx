"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { ChevronRight } from "lucide-react";
import s from "./Procurement.module.scss";

export const ProcurementBreadcrumbs = ({ current }: { current: string }) => {
  const t = useTranslations("TendersPage");
  const th = useTranslations("HomePage");

  return (
    <nav className={s.breadcrumbs} aria-label={t("breadcrumbAria")}>
      <ol>
        <li>
          <Link href="/">{th("title")}</Link>
          <ChevronRight size={14} aria-hidden="true" />
        </li>
        <li>
          <Link href="/procurements">{t("title")}</Link>
          <ChevronRight size={14} aria-hidden="true" />
        </li>
        <li aria-current="page">
          <span>{current}</span>
        </li>
      </ol>
    </nav>
  );
};
