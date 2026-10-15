"use client";

import styles from "./TheDropdownMenu.module.scss";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Link } from "@/i18n/navigation";

export type DropdownComponentProps = {
  url: string;
  title: string;
  subMenu?: { id: number; url: string; title: string }[];
};

export const TheDropdownMenu = ({
  url,
  title,
  subMenu,
}: DropdownComponentProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const t = useTranslations("Header");

  return (
    <div
      className={styles.dropdown}
      onMouseEnter={() => subMenu && setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
      // focus moving between the trigger and its sub-links neither opens nor closes
      onFocus={(e) => {
        if (subMenu && !e.currentTarget.contains(e.relatedTarget)) setIsOpen(true);
      }}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) setIsOpen(false);
      }}
      onKeyDown={(e) => {
        if (e.key !== "Escape" || !isOpen) return;
        setIsOpen(false);
        e.currentTarget.querySelector("a")?.focus();
      }}
    >
      <Link
        href={url}
        className={styles.dropBtn}
        aria-haspopup={subMenu ? "true" : undefined}
        aria-expanded={subMenu ? isOpen : undefined}
      >
        <div className={styles.active}>
          <span>{t(title)}</span>
          {subMenu && (
            <span>
              {isOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
            </span>
          )}
        </div>
      </Link>
      {isOpen && (
        <div className={styles.dropdownContent}>
          {subMenu &&
            subMenu.map(({ id, url, title }) => (
              <Link
                key={id}
                href={url}
                className={styles.subLink}
                onClick={() => setIsOpen(false)}
              >
                {t(title)}
              </Link>
            ))}
        </div>
      )}
    </div>
  );
};
