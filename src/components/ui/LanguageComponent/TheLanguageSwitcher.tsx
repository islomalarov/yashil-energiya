"use client";

import Image from "next/image";
import styles from "./page.module.scss";
import { useSelectedLayoutSegments } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import { useLocale } from "next-intl";
import Language from "@/public/language.svg";

interface Option {
  country: string;
  code: string;
}

export const TheLanguageSwitcher = () => {
  const locale = useLocale();
  const [isOpen, setIsOpen] = useState(false);
  const urlSegments = useSelectedLayoutSegments();

  const options: Option[] = [
    { country: "Русский", code: "ru" },
    { country: "O'zbekcha", code: "uz" },
  ];
  return (
    <button className={styles.languageMenu} onClick={() => setIsOpen(!isOpen)}>
      <div className={styles.languageSelect}>
        <Image src={Language} alt="language-icon" priority />
        {locale === "ru" ? (
          <span className={styles.text}>Ru</span>
        ) : (
          <span className={styles.text}>O'z</span>
        )}
      </div>
      {isOpen && (
        <div className={styles.languageList}>
          {options.map((lang) => (
            <Link
              href={`/${lang.code}/${urlSegments.join("/")}`}
              key={lang.code}
              className={styles.language}
            >
              {lang.country}
            </Link>
          ))}
        </div>
      )}
    </button>
  );
};
