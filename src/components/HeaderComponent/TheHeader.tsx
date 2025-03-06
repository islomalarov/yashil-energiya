"use client";

import "@/scss/globals.scss";
import Image from "next/image";
import { Link } from "@/src/i18n/routing";
import styles from "./page.module.scss";
import Logo from "@/public/logo_2.png";
import { useState } from "react";
import { TheLanguageSwitcher } from "../ui/LanguageComponent/TheLanguageSwitcher";
import { TheSearch } from "../ui/SearchComponent/TheSearch";
import {
  DropdownComponentProps,
  TheDropdownMenu,
} from "../ui/DropdownComponent/TheDropdown";
import { menuLinks } from "@/data/links";
import { TheBurgerMenu } from "../ui/BurgerComponent/TheBurgerMenu";
import { TheBurgerBtn } from "../ui/BurgerComponent/TheBurgerBtn";
import { TheMotionWrapper } from "../MotionWrapper/TheMotionWrapper";

interface MenuLinksProps {
  id: number;
}
interface MenuLinksProps extends DropdownComponentProps {
  subMenu?: { id: number; url: string; title: string }[];
}

export const TheHeader = () => {
  const [showBurgerBtn, setShowBurgerBtn] = useState(false);

  const handleBurgerBtn = () => {
    setShowBurgerBtn(!showBurgerBtn);
  };

  return (
    <header className={styles.header}>
      {showBurgerBtn && <TheBurgerMenu handleBurgerBtn={handleBurgerBtn} />}
      <TheMotionWrapper>
        <div className={styles.content}>
          <div className={styles.logoBlock}>
            <Link href="/">
              <Image className={styles.logo} src={Logo} alt="logo" priority />
            </Link>
          </div>
          <div className={styles.menuBlock}>
            {menuLinks.map(({ id, url, title, subMenu }: MenuLinksProps) => (
              <TheDropdownMenu
                key={id}
                url={url}
                title={title}
                subMenu={subMenu}
              />
            ))}
          </div>
          <div className={styles.actions}>
            {/* <TheSearch /> */}
            <TheBurgerBtn handleBurgerBtn={handleBurgerBtn} />
            <div className={styles.languageBtn}>
              <TheLanguageSwitcher />
            </div>
          </div>
        </div>
      </TheMotionWrapper>
    </header>
  );
};
