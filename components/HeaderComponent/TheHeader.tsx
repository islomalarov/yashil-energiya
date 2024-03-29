"use client";
import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.scss";
import "../../scss/globals.scss";
import { useState } from "react";
import headerLogo from "@/public/logo.svg";
import { TheLanguage } from "../ui/LanguageComponent/TheLanguage";
import { TheSearch } from "../ui/SearchComponent/TheSearch";
import { TheBurger } from "../ui/BurgerComponent/TheBurger";
import { DropdownMenu } from "../ui/DropdownComponent/TheDropdown";
import { footerMenu, menuLinks } from "@/data/links";

export const TheHeader = () => {
  const [status, setStatus] = useState(false);

  return (
    <header className={styles.header}>
      {status && (
        <div className={styles.burgerMenu}>
          <TheLanguage styleName="burgerLang" />
          {footerMenu.map(({ id, url, title }: any) => (
            <Link
              key={title}
              className={styles.burgerLink}
              href={url}
              onClick={() => {
                setStatus(!status);
              }}
            >
              <span
                className={
                  id === 1 ? styles.descr : `${styles.descr} ${styles.active}`
                }
              >
                {title}
              </span>
            </Link>
          ))}
        </div>
      )}
      <div className={`container`}>
        <div className={styles.content}>
          <div className={styles.logoBlock}>
            <Link href="/">
              <Image className={styles.logo} src={headerLogo} alt="logo" />
            </Link>
          </div>
          <div className={styles.menuBlock}>
            {menuLinks.map(({ id, url, title, subMenu }: any, index) => (
              <DropdownMenu key={id} {...{ id, url, title, index, subMenu }} />
            ))}
          </div>
          <div className={styles.actions}>
            <TheSearch />
            <TheBurger {...{ status, setStatus }} />
            <TheLanguage styleName="actionsLang" />
          </div>
        </div>
      </div>
    </header>
  );
};
