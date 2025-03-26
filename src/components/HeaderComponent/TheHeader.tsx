"use client";

import "@/scss/globals.scss";
import Image from "next/image";
import styles from "./TheHeader.module.scss";
import Logo from "@/public/logo_2.png";
import { useEffect, useState } from "react";
import { TheLanguageSwitcher } from "../ui/LanguageComponent/TheLanguageSwitcher";
import { TheSearch } from "../ui/SearchComponent/TheSearch";
import { TheDropdownMenu } from "../ui/DropdownComponent/TheDropdown";
import { menuLinks } from "@/data/links";
import { TheBurgerMenu } from "../ui/BurgerComponent/TheBurgerMenu";
import { TheBurgerBtn } from "../ui/BurgerComponent/TheBurgerBtn";
import { TheMotionWrapper } from "../MotionWrapper/TheMotionWrapper";
import { Link } from "@/src/i18n/navigation";

export const TheHeader = () => {
  const [showBurgerBtn, setShowBurgerBtn] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const handleBurgerBtn = () => {
    setShowBurgerBtn(!showBurgerBtn);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header className={`${styles.header} ${isScrolled ? styles.scrolled : ""}`}>
      {showBurgerBtn && <TheBurgerMenu handleBurgerBtn={handleBurgerBtn} />}
      <TheMotionWrapper>
        <div className={styles.content}>
          <div className={styles.logoBlock}>
            <Link href="/">
              <Image
                className={`${styles.logo} ${
                  isScrolled ? styles.miniLogo : ""
                }`}
                src={Logo}
                alt="logo"
                priority
              />
            </Link>
          </div>
          <div className={styles.menuBlock}>
            {menuLinks.map((menuLink) => (
              <TheDropdownMenu
                key={menuLink.id}
                url={menuLink.url}
                title={menuLink.title}
                subMenu={menuLink.subMenu}
              />
            ))}
          </div>
          <div className={styles.actions}>
            {/* <TheSearch /> */}
            <TheBurgerBtn handleBurgerBtn={handleBurgerBtn} />
            <TheLanguageSwitcher />
          </div>
        </div>
      </TheMotionWrapper>
    </header>
  );
};
