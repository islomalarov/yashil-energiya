import s from "./TheBurger.module.scss";
import { TheLanguageSwitcher } from "../LanguageComponent/TheLanguageSwitcher";
import { menuLinks } from "@/data/links";
import Image from "next/image";
import Logo from "@/public/logo_2.png";
import { useEffect, useState } from "react";
import { BurgerMenuItem } from "./TheBurgerMenuItem";
import { CircleX } from "lucide-react";

export type BurgerMenuProps = {
  handleBurgerBtn: () => void;
};

export const TheBurgerMenu = ({ handleBurgerBtn }: BurgerMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [activeSubMenu, setActiveSubMenu] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => setIsVisible(true), 100); // Задержка для анимации ссылок
    } else {
      setIsVisible(false);
    }
  }, [isOpen]);

  useEffect(() => {
    setIsOpen(true); // Открываем меню при монтировании
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    setTimeout(handleBurgerBtn, 300); // Закрываем меню после завершения анимации
  };

  return (
    <div className={`${s.burgerMenu} ${isOpen ? s.open : ""}`}>
      <div className={s.burgerMenuHeader}>
        <Image className={s.burgerLogo} src={Logo} alt="logo" />
        <div className={s.actions}>
          <TheLanguageSwitcher />
          <button className={s.closeBtn} onClick={handleClose}>
            <CircleX size={31} color="green" />
          </button>
        </div>
      </div>
      {menuLinks.map((menuLink) => (
        <BurgerMenuItem
          key={menuLink.title}
          title={menuLink.title}
          url={menuLink.url}
          subMenu={menuLink.subMenu}
          isVisible={isVisible}
          handleClose={handleClose}
          activeSubMenu={activeSubMenu}
          setActiveSubMenu={setActiveSubMenu}
        />
      ))}
    </div>
  );
};
