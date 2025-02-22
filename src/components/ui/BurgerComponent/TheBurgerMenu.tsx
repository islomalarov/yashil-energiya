import styles from "./page.module.scss";
import { Link } from "@/src/i18n/routing";
import { TheLanguageSwitcher } from "../LanguageComponent/TheLanguageSwitcher";
import { footerMenu } from "@/data/links";
import { useTranslations } from "next-intl";
import { CgCloseR } from "react-icons/cg";
import Image from "next/image";
import Logo from "@/public/logo_2.png";
import { useSelectedLayoutSegments } from "next/navigation";
import { useEffect, useState } from "react";

export type BurgerMenuProps = {
  onclick: () => void;
};

export const TheBurgerMenu = ({ onclick }: BurgerMenuProps) => {
  const t = useTranslations("Header");
  const urlSegments = useSelectedLayoutSegments();
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

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
    setTimeout(onclick, 300); // Закрываем меню после завершения анимации
  };

  return (
    <div className={`${styles.burgerMenu} ${isOpen ? styles.open : ""}`}>
      <div className={styles.burgerMenuHeader}>
        <div className={styles.burgerLogoBlock}>
          <Image className={styles.burgerLogo} src={Logo} alt="logo" />
        </div>
        <div className={styles.actions}>
          <TheLanguageSwitcher />
          <button className={styles.closeBtn} onClick={handleClose}>
            <CgCloseR size={24} color="green" />
          </button>
        </div>
      </div>
      {footerMenu.map(({ url, title }: any) => (
        <Link
          key={title}
          className={`${styles.burgerLink} ${isVisible ? styles.visible : ""}`}
          href={url}
          onClick={handleClose}
        >
          <span
            className={
              `/${urlSegments}` === url
                ? `${styles.description} ${styles.active}`
                : styles.description
            }
          >
            {t(title)}
          </span>
        </Link>
      ))}
    </div>
  );
};
