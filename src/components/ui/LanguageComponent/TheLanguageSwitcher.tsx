"use client";

import styles from "./TheLanguageSwitcher.module.scss";
import { useState, useEffect } from "react";
import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/src/i18n/navigation";
import { routing } from "@/src/i18n/routing";

export const TheLanguageSwitcher = () => {
  const locale = useLocale();
  const [isOpen, setIsOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const t = useTranslations("LocaleSwitcher");

  // Avoid hydration mismatch by only rendering interactive elements after mount
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleLanguageChange = (newLocale: string) => {
    setIsOpen(false);
    router.push(pathname, { locale: newLocale });
  };

  // Render a simplified version during server-side rendering
  if (!isMounted) {
    return (
      <div className={styles.languageMenu}>
        <div className={styles.languageList}>
          {routing.locales.map((cur) => (
            <span
              key={cur}
              className={`${styles.language} ${
                locale === cur ? styles.active : ""
              }`}
            >
              {t(`${cur}`)}
            </span>
          ))}
        </div>
      </div>
    );
  }

  return (
    <button className={styles.languageMenu} onClick={() => setIsOpen(!isOpen)}>
      <div className={`${styles.languageList} ${isOpen ? styles.open : ""}`}>
        {routing.locales.map((cur) => (
          <button
            key={cur}
            onClick={(e) => {
              e.stopPropagation(); // Prevent triggering the outer button
              handleLanguageChange(cur);
            }}
            className={`${styles.language} ${
              locale === cur ? styles.active : ""
            }`}
          >
            {t(`${cur}`)}
          </button>
        ))}
      </div>
    </button>
  );
};
