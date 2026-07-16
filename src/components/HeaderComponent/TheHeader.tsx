"use client";


import Image from "next/image";
import s from "./TheHeader.module.scss";
import Logo from "public/logo_2.png";
import { useEffect, useRef, useState } from "react";
import { TheLanguageSwitcher } from "../ui/LanguageComponent/TheLanguageSwitcher";
import { TheDropdownMenu } from "../ui/DropdownComponent/TheDropdown";
import { menuLinks } from "data/links";
import { TheBurgerMenu } from "../ui/BurgerComponent/TheBurgerMenu";
import { TheBurgerBtn } from "../ui/BurgerComponent/TheBurgerBtn";
import { TheMotionWrapper } from "../MotionWrapper/TheMotionWrapper";
import { Link } from "@/i18n/navigation";
import { usePathname } from "@/i18n/navigation";
import { useSkipLocaleMotion } from "@/lib/locale-transition";
import { TheSearch } from "../ui/SearchComponent/TheSearch";

export const TheHeader = () => {
  const pathname = usePathname();
  const hideHeader = pathname === "/taplink" || pathname === "/ev-guide";
  const [showBurgerBtn, setShowBurgerBtn] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isInitialStateSettled, setIsInitialStateSettled] = useState(false);
  const isScrolledRef = useRef(false);
  const scrollIndicatorRef = useRef<HTMLDivElement | null>(null);
  const skipLocaleMotion = useSkipLocaleMotion();
  const handleBurgerBtn = () => {
    setShowBurgerBtn(!showBurgerBtn);
  };

  useEffect(() => {
    let frame = 0;

    const updateScrollState = () => {
      frame = 0;
      const scrollTop = window.scrollY;
      const scrollable =
        document.documentElement.scrollHeight - window.innerHeight;
      const nextIsScrolled = scrollTop > 50;
      const nextProgress =
        scrollable > 0 ? Math.min(scrollTop / scrollable, 1) : 0;

      if (isScrolledRef.current !== nextIsScrolled) {
        isScrolledRef.current = nextIsScrolled;
        setIsScrolled(nextIsScrolled);
      }

      if (scrollIndicatorRef.current) {
        scrollIndicatorRef.current.style.transform = `scaleX(${nextProgress})`;
      }
    };

    const handleScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(updateScrollState);
    };

    updateScrollState();
    setIsInitialStateSettled(true);
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);

    return () => {
      if (frame) {
        window.cancelAnimationFrame(frame);
      }
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  if (hideHeader) {
    return null;
  }

  return (
    <header
      className={`${s.header} ${isScrolled ? s.scrolled : ""} ${
        !isInitialStateSettled || skipLocaleMotion ? s.instantState : ""
      }`}
    >
      {showBurgerBtn && <TheBurgerMenu handleBurgerBtn={handleBurgerBtn} />}
      <div
        id="scroll-indicator"
        ref={scrollIndicatorRef}
        className={s.scrollIndicator}
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
