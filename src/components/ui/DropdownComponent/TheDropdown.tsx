"use client";
import styles from "./page.module.scss";
// import Link from "next/link";
import { Link } from "@/src/i18n/routing";
import { useTranslations } from "next-intl";
import { useState } from "react";

type DropdownComponent = {
  id: number;
  url: string;
  title: string;
  index: number;
  subMenu: Array<{
    id: number;
    url: string;
    title: string;
  }>;
};

export const TheDropdownMenu = ({
  id,
  url,
  title,
  index,
  subMenu,
}: DropdownComponent) => {
  const [isOpen, setIsOpen] = useState(false);
  const t = useTranslations("Header");
  return (
    <div
      className={styles.dropdown}
      onMouseEnter={() => subMenu && setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <Link href={url} className={styles.dropBtn}>
        <span className={styles.active}>{t(`${title}`)}</span>
      </Link>
      {isOpen && (
        <div className={styles.dropdownContent}>
          {subMenu.map(({ id, url, title }: any) => (
            <Link
              key={id}
              href={url}
              className={styles.subLink}
              onClick={() => setIsOpen(false)}
            >
              {t(`${title}`)}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};
