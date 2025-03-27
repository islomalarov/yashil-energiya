import { usePathname } from "@/src/i18n/navigation";
import { useTranslations } from "next-intl";
import { ChevronDown, ChevronUp } from "lucide-react";
import s from "./TheBurger.module.scss";
import Link from "next/link";

interface BurgerMenuItemProps {
  title: string;
  url: string;
  subMenu?: { id: number; url: string; title: string }[];
  isVisible: boolean;
  isOpen: boolean;
  handleClose: () => void;
  setActiveSubMenu: (title: string | null) => void;
}

export const BurgerMenuItem = ({
  title,
  url,
  subMenu,
  isVisible,
  isOpen,
  handleClose,
  setActiveSubMenu,
}: BurgerMenuItemProps) => {
  const pathName = usePathname();
  const t = useTranslations("Header");
  const isActive = (link: string) =>
    pathName === link ? `${s.description} ${s.active}` : s.description;

  const handleSubMenuToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveSubMenu(isOpen ? null : title);
  };

  return (
    <div className={`${s.burgerLink} ${isVisible ? s.visible : ""}`}>
      <div onClick={handleSubMenuToggle} className={s.menuItem}>
        {subMenu ? (
          <span className={isActive(url)}>
            {t(title)}
            {isOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          </span>
        ) : (
          <Link href={url} className={isActive(url)} onClick={handleClose}>
            {t(title)}
          </Link>
        )}
      </div>
      {isOpen && (
        <div className={s.subMenu}>
          {subMenu?.map(({ id, url, title }) => (
            <Link
              key={id}
              href={url}
              className={isActive(url)}
              onClick={handleClose}
            >
              {t(title)}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};
