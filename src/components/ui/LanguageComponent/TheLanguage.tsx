"use client";

import Image from "next/image";
import styles from "./page.module.scss";
import { usePathname, useSelectedLayoutSegments } from "next/navigation";
import { useState } from "react";
import Link from "next/link";

interface Option {
  country: string;
  code: string;
}
export const TheLanguage = ({ styleName }: { styleName: string }) => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const urlSegments = useSelectedLayoutSegments();

  const options: Option[] = [
    { country: "Русский", code: "ru" },
    { country: "O'zbekcha", code: "uz" },
  ];
  return (
    <div
      className={styles[styleName]}
      onClick={() => setIsOpen(!isOpen)}
      // onMouseEnter={() => setIsOpen(true)}
      // onMouseLeave={() => setIsOpen(false)}
    >
      <button className={styles.languageSelect}>
        <Image src="/language.svg" alt="logo" width={24} height={24} priority />
        {pathname.slice(1, 3) === "ru" ? (
          <span className={styles.text}>Ru</span>
        ) : (
          <span className={styles.text}>O'z</span>
        )}
      </button>
      {isOpen && (
        <div className={styles.languageMenu}>
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
    </div>
  );
};
