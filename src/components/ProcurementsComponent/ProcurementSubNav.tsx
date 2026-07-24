"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import s from "./Procurement.module.scss";

const SECTIONS = [
  { id: "section1", labelKey: "tabNotice" },
  { id: "section2", labelKey: "tabTenders" },
] as const;

export const ProcurementSubNav = () => {
  const t = useTranslations("TendersPage");
  const [active, setActive] = useState<string>("section1");

  useEffect(() => {
    const targets = SECTIONS.map((sec) =>
      document.getElementById(sec.id),
    ).filter((el): el is HTMLElement => Boolean(el));

    if (!targets.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setActive(visible.target.id);
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: [0, 0.25, 0.5] },
    );

    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const handleClick =
    (id: string) => (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault();
      const el = document.getElementById(id);
      if (!el) return;
      const reduce = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      const top = el.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top, behavior: reduce ? "auto" : "smooth" });
      setActive(id);
    };

  return (
    <nav className={s.subNav} aria-label={t("tabTenders")}>
      {SECTIONS.map((sec) => (
        <a
          key={sec.id}
          href={`#${sec.id}`}
          onClick={handleClick(sec.id)}
          className={`${s.subNavLink} ${
            active === sec.id ? s.subNavLinkActive : ""
          }`}
          aria-current={active === sec.id ? "true" : undefined}
        >
          {t(sec.labelKey)}
        </a>
      ))}
    </nav>
  );
};
