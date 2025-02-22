"use client";

import "@/scss/globals.scss";
import Image from "next/image";
import { Link } from "@/src/i18n/routing";
import styles from "./page.module.scss";
import Logo from "@/public/logo_2.png";
import { useState } from "react";
import { TheLanguageSwitcher } from "../ui/LanguageComponent/TheLanguageSwitcher";
import { TheSearch } from "../ui/SearchComponent/TheSearch";
import { TheDropdownMenu } from "../ui/DropdownComponent/TheDropdown";
import { menuLinks } from "@/data/links";
import { TheBurgerMenu } from "../ui/BurgerComponent/TheBurgerMenu";
import { TheBurgerBtn } from "../ui/BurgerComponent/TheBurgerBtn";

export const TheHeader = () => {
  const [showBurgerBtn, setShowBurgerBtn] = useState(false);

  const handleBurgerBtn = () => {
    setShowBurgerBtn(!showBurgerBtn);
  };

  return (
    <header className={styles.header}>
      {showBurgerBtn && <TheBurgerMenu onclick={handleBurgerBtn} />}
      <div className={`container`}>
        <div className={styles.content}>
          <div className={styles.logoBlock}>
            <Link href="/">
              <Image className={styles.logo} src={Logo} alt="logo" priority />
            </Link>
          </div>
          <div className={styles.menuBlock}>
            {menuLinks.map(({ id, url, title, subMenu }: any) => (
              <TheDropdownMenu key={id} {...{ url, title, subMenu }} />
            ))}
          </div>
          <div className={styles.actions}>
            <TheSearch />
            <TheBurgerBtn onclick={handleBurgerBtn} />
            <div className={styles.languageBtn}>
              <TheLanguageSwitcher />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
