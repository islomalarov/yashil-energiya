import styles from "./page.module.scss";
import Link from "next/link";
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

export const DropdownMenu = ({
  id,
  url,
  title,
  index,
  subMenu,
}: DropdownComponent) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className={styles.dropdown}
      onMouseEnter={() => subMenu && setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <Link href={url} className={styles.dropBtn}>
        <span className={styles.active}>{title}</span>
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
              {title}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};
