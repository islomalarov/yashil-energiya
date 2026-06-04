"use client";

import cn from "classnames";
import { useLocale } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import { markLocaleTransition } from "@/lib/locale-transition";
import { useEffect, useTransition } from "react";
import s from "./page.module.scss";

type Locale = "en" | "ru" | "uz";

const locales: Locale[] = ["ru", "uz", "en"];
const localeLabels: Record<Locale, string> = {
  ru: "RU",
  uz: "UZ",
  en: "EN",
};

export function TaplinkLocaleSwitcher() {
  const locale = useLocale() as Locale;
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    if (!isPending) {
      window.setTimeout(() => {
        document.documentElement.classList.remove("taplink-locale-transition");
      }, 180);
    }
  }, [isPending]);

  const handleLocaleChange = (nextLocale: Locale) => {
    if (nextLocale === locale || isPending) return;

    document.documentElement.classList.add("taplink-locale-transition");
    markLocaleTransition();

    startTransition(() => {
      router.replace(
        {
          pathname: "/taplink",
        },
        {
          locale: nextLocale,
          scroll: false,
        },
      );
    });
  };

  return (
    <div className={s.localeSwitcher} aria-label="Language">
      {locales.map((cur) => (
        <button
          className={cn({ [s.activeLocale]: cur === locale })}
          disabled={isPending}
          key={cur}
          onClick={() => handleLocaleChange(cur)}
          type="button"
          aria-current={cur === locale ? "page" : undefined}
        >
          {localeLabels[cur]}
        </button>
      ))}
    </div>
  );
}
