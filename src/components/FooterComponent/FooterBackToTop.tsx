"use client";

import { ArrowUp } from "lucide-react";
import s from "./TheFooter.module.scss";

export const FooterBackToTop = ({ label }: { label: string }) => {
  const scrollToTop = () => {
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
  };

  return (
    <button type="button" className={s.backToTop} onClick={scrollToTop}>
      <span>{label}</span>
      <ArrowUp size={16} aria-hidden="true" />
    </button>
  );
};
