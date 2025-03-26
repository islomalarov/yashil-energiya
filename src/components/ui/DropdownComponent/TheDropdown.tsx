"use client";

import styles from "./TheDropdownMenu.module.scss";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Link } from "@/src/i18n/navigation";

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
    >
      <Link href={url} className={styles.dropBtn}>
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
