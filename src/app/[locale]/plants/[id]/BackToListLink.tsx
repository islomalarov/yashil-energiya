"use client";

import type { MouseEvent } from "react";
import { ArrowLeft } from "lucide-react";
import { Link, useRouter } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import s from "./BackToListLink.module.scss";

export const BackToListLink = () => {
  const t = useTranslations("PlantDetail");
  const router = useRouter();

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    // Going "back" keeps ?q=&region=&sort= when the visitor came from the
    // filtered list; direct visitors fall through to the plain /plants link.
    if (typeof window === "undefined" || window.history.length <= 1) return;

    let cameFromPlantsList = false;
    try {
      const referrer = document.referrer ? new URL(document.referrer) : null;
      cameFromPlantsList =
        referrer?.origin === window.location.origin &&
        /\/plants\/?$/.test(referrer.pathname);
    } catch {
      cameFromPlantsList = false;
    }

    if (cameFromPlantsList) {
      event.preventDefault();
      router.back();
    }
  };

  return (
    <Link className={s.back} href="/plants" onClick={handleClick}>
      <ArrowLeft aria-hidden="true" />
      {t("backToList")}
    </Link>
  );
};
