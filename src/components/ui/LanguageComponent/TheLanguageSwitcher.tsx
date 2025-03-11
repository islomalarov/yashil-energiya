"use client";

import styles from "./TheLanguageSwitcher.module.scss";
import { useSelectedLayoutSegments } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import { useLocale } from "next-intl";

interface Option {
  country: string;
  code: string;
}

export const TheLanguageSwitcher = () => {
  const locale = useLocale();
  const [isOpen, setIsOpen] = useState(false);
  const urlSegments = useSelectedLayoutSegments();

  const options: Option[] = [
    { country: "O'z", code: "uz" },
    { country: "Ru", code: "ru" },
  ];

  return (
    <button className={styles.languageMenu} onClick={() => setIsOpen(!isOpen)}>
      <div className={styles.languageList}>
        {options.map((lang) => (
          <Link
            href={`/${lang.code}/${urlSegments.join("/")}`}
            key={lang.code}
            className={`${styles.language} ${
              locale === lang.code ? styles.active : ""
            }`}
          >
            {lang.country}
          </Link>
        ))}
      </div>
    </button>
  );
};
