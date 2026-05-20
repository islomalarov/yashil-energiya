"use client";

import s from "./TheLanguageSwitcher.module.scss";
import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import cn from "classnames";
import { useTransition } from "react";

const cmsPathPattern =
  /^\/(news|articles|plants|vacancies|ceo)(\/|$)/;

export const TheLanguageSwitcher = () => {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const t = useTranslations("LocaleSwitcher");
  const [isPending, startTransition] = useTransition();

  const handleLanguageChange = (newLocale: string) => {
    if (newLocale === locale) return;

    const targetLocale =
      newLocale === "uz" && cmsPathPattern.test(pathname) ? "en" : newLocale;

    startTransition(() => {
      router.replace({ pathname }, { locale: targetLocale, scroll: false });
    });
  };

  return (
    <div className={s.languageList}>
      {routing.locales.map((cur) => (
        <button
          key={cur}
          type="button"
          disabled={isPending}
          onClick={(e) => {
            e.preventDefault();
            handleLanguageChange(cur);
          }}
          className={cn(s.language, { [s.active]: locale === cur })}
        >
          {t(cur)}
        </button>
      ))}
    </div>
  );
};
