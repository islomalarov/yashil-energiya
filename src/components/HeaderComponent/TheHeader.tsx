"use client";


import Image from "next/image";
import s from "./TheHeader.module.scss";
import Logo from "public/logo_2.png";
import { useEffect, useLayoutEffect, useState } from "react";
import { TheLanguageSwitcher } from "../ui/LanguageComponent/TheLanguageSwitcher";
import { TheDropdownMenu } from "../ui/DropdownComponent/TheDropdown";
import { menuLinks } from "data/links";
import { TheBurgerMenu } from "../ui/BurgerComponent/TheBurgerMenu";
import { TheBurgerBtn } from "../ui/BurgerComponent/TheBurgerBtn";
import { TheMotionWrapper } from "../MotionWrapper/TheMotionWrapper";
import { Link } from "@/i18n/navigation";
import { useSkipLocaleMotion } from "@/lib/locale-transition";
import { TheSearch } from "../ui/SearchComponent/TheSearch";

export const TheHeader = () => {
  const [showBurgerBtn, setShowBurgerBtn] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isInitialStateSettled, setIsInitialStateSettled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const skipLocaleMotion = useSkipLocaleMotion();
  const handleBurgerBtn = () => {
    setShowBurgerBtn(!showBurgerBtn);
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;

      setIsScrolled(scrollTop > 50);
      setScrollProgress(scrollable > 0 ? Math.min(scrollTop / scrollable, 1) : 0);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useLayoutEffect(() => {
    setIsScrolled(window.scrollY > 50);

    const frame = window.requestAnimationFrame(() => {
      setIsInitialStateSettled(true);
    });

    return () => window.cancelAnimationFrame(frame);
  }, []);

  return (
    <header
      className={`${s.header} ${isScrolled ? s.scrolled : ""} ${
        !isInitialStateSettled || skipLocaleMotion ? s.instantState : ""
      }`}
    >
      {showBurgerBtn && <TheBurgerMenu handleBurgerBtn={handleBurgerBtn} />}
      <div
        id="scroll-indicator"
        className={s.scrollIndicator}
        style={{ transform: `scaleX(${scrollProgress})` }}
      />
      <TheMotionWrapper motionKey="site-header">
        <div className={s.content}>
          <div className={s.logoBlock}>
            <Link href="/">
              <Image
                className={`${s.logo} ${isScrolled ? s.miniLogo : ""}`}
                src={Logo}
                alt="logo"
                priority
              />
            </Link>
          </div>
          <div className={s.menuBlock}>
            {menuLinks.map((menuLink) => (
              <TheDropdownMenu
                key={menuLink.id}
                url={menuLink.url}
                title={menuLink.title}
                subMenu={menuLink.subMenu}
              />
            ))}
          </div>
          <div className={s.actions}>
            <TheSearch />
            <div className={s.languages}>
              <TheLanguageSwitcher />
            </div>
            <TheBurgerBtn handleBurgerBtn={handleBurgerBtn} />
          </div>
        </div>
      </TheMotionWrapper>
    </header>
  );
};
