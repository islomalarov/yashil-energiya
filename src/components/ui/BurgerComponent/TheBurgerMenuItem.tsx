import { Link } from "@/src/i18n/navigation";
import { useTranslations } from "next-intl";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useSelectedLayoutSegments } from "next/navigation";
import s from "./TheBurger.module.scss";

interface BurgerMenuItemProps {
  title: string;
  url: string;
  subMenu?: { id: number; url: string; title: string }[];
  isVisible: boolean;
  handleClose: () => void;
  activeSubMenu: string | null;
  setActiveSubMenu: (title: string | null) => void;
}

export const BurgerMenuItem = ({
  title,
  url,
  subMenu,
  isVisible,
  handleClose,
  activeSubMenu,
  setActiveSubMenu,
}: BurgerMenuItemProps) => {
  const isOpen = activeSubMenu === title;
  const urlSegments = useSelectedLayoutSegments();
  const t = useTranslations("Header");

  const handleSubMenuToggle = (e: React.TouchEvent) => {
    e.stopPropagation();
    setActiveSubMenu(isOpen ? null : title);
  };

  return (
    <div className={`${s.burgerLink} ${isVisible ? s.visible : ""}`}>
      <div onTouchStart={handleSubMenuToggle} className={s.menuItem}>
        {subMenu ? (
          <span
            className={
              `/${urlSegments}` === url
                ? `${s.description} ${s.active}`
                : s.description
            }
          >
            {t(title)}
            {isOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          </span>
        ) : (
          <Link
            href={url}
            className={
              `/${urlSegments}` === url
                ? `${s.description} ${s.active}`
                : s.description
            }
            onClick={handleClose}
          >
            {t(title)}
          </Link>
        )}
      </div>
      {isOpen && (
        <div style={{ display: "grid", gap: "20px" }}>
          {subMenu?.map((subLink) => (
            <Link
              key={subLink.title}
              href={subLink.url}
              className={
                `/${urlSegments}` === subLink.url
                  ? `${s.description} ${s.active}`
                  : s.description
              }
              onClick={handleClose}
            >
              {t(subLink.title)}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};
