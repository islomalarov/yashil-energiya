"use client";

import { useEffect, useState } from "react";
import { ArrowUpCircle } from "lucide-react";
import styles from "./ScrollToTopButton.module.scss";

export default function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > window.innerHeight);
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`${styles.scrollToTop} ${isVisible ? styles.visible : ""}`}
      aria-label="Scroll to top"
    >
      <ArrowUpCircle size={32} />
    </button>
  );
}
