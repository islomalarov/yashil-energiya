"use client";

import s from "./TheLanguageSwitcher.module.scss";
import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/src/i18n/navigation";
import { routing } from "@/src/i18n/routing";

export const TheLanguageSwitcher = () => {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const t = useTranslations("LocaleSwitcher");

  const handleLanguageChange = (newLocale: string) => {
    router.push(pathname, { locale: newLocale });
  };

  return (
    <div className={s.languageList}>
      {routing.locales.map((cur) => (
        <button
          key={cur}
          onClick={(e) => {
            e.stopPropagation();
            handleLanguageChange(cur);
          }}
          className={`${s.language} ${locale === cur ? s.active : ""}`}
        >
          {t(`${cur}`)}
        </button>
      ))}
    </div>
  );
};
