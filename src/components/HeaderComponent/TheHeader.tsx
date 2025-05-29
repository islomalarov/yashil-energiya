"use client";

import "@/scss/globals.scss";
import Image from "next/image";
import s from "./TheHeader.module.scss";
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
import { motion, useScroll } from "motion/react";

export const TheHeader = () => {
  const [showBurgerBtn, setShowBurgerBtn] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollYProgress } = useScroll();
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
    <header className={`${s.header} ${isScrolled ? s.scrolled : ""}`}>
      {showBurgerBtn && <TheBurgerMenu handleBurgerBtn={handleBurgerBtn} />}
      <motion.div
        id="scroll-indicator"
        style={{
          scaleX: scrollYProgress,
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          height: 4,
          originX: 0,
          backgroundColor: "#12903e",
          borderRadius: "0 0 5px 5px",
        }}
      />
      <TheMotionWrapper>
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
            {/* <TheSearch /> */}
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
