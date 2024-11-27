"use client";

import "@/scss/globals.scss";
import Image from "next/image";
// import Link from "next/link";
import { Link } from "@/src/i18n/routing";
import styles from "./page.module.scss";
import headerLogo from "@/public/logo.svg";

import { useState } from "react";
import { TheLanguage } from "../ui/LanguageComponent/TheLanguage";
import { TheSearch } from "../ui/SearchComponent/TheSearch";

import { TheDropdownMenu } from "../ui/DropdownComponent/TheDropdown";
import { menuLinks } from "@/data/links";
import { TheBurgerMenu } from "../ui/BurgerComponent/TheBurgerMenu";
import { TheBurgerBtn } from "../ui/BurgerComponent/TheBurgerBtn";

export const TheHeader = () => {
  const [status, setStatus] = useState(false);

  return (
    <header className={styles.header}>
      {status && <TheBurgerMenu {...{ status, setStatus }} />}
      <div className={`container`}>
        <div className={styles.content}>
          <div className={styles.logoBlock}>
            <Link href="/">
              <Image
                className={styles.logo}
                src={headerLogo}
                alt="logo"
                priority
              />
            </Link>
          </div>
          <div className={styles.menuBlock}>
            {menuLinks.map(({ id, url, title, subMenu }: any) => (
              <TheDropdownMenu key={id} {...{ url, title, subMenu }} />
            ))}
          </div>
          <div className={styles.actions}>
            {/* <TheSearch /> */}
            <TheBurgerBtn {...{ status, setStatus }} />
            <div className={styles.languageBtn}>
              <TheLanguage />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
