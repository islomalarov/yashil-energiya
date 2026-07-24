"use client";

import React, { useEffect, useId, useRef, useState } from "react";
import { usePathname } from "@/i18n/navigation";
import { useLocaleMotionState } from "@/lib/locale-transition";

type RevealTag = "div" | "section" | "ul" | "li" | "article";

interface TheRevealProps {
  children: React.ReactNode;
  /** Adds stagger to direct children instead of animating the block as one. */
  stagger?: boolean;
  className?: string;
  as?: RevealTag;
  motionKey?: string;
}

/**
 * Scroll-reveal wrapper mirroring TheMotionWrapper's paradigm
 * (IntersectionObserver, fires once, skips on locale switch). Reduced-motion
 * is handled entirely in globals.scss via the .reveal / .reveal-stagger rules.
 */
export const TheReveal = ({
  children,
  stagger = false,
  className = "",
  as = "div",
  motionKey,
}: TheRevealProps) => {
  const id = useId();
  const ref = useRef<HTMLElement | null>(null);
  const pathname = usePathname();
  const { skipMotion, markViewed } = useLocaleMotionState(
    `${pathname}:reveal:${motionKey ?? id}`,
  );
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element || isVisible) return;

    if (skipMotion) {
      setIsVisible(true);
      markViewed();
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        setIsVisible(true);
        markViewed();
        observer.disconnect();
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.12 },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [isVisible, markViewed, skipMotion]);

  const base = stagger ? "reveal-stagger" : "reveal";
  const cls = [base, isVisible || skipMotion ? "is-visible" : "", className]
    .filter(Boolean)
    .join(" ");

  const Tag = as as React.ElementType;
  return (
    <Tag ref={ref} className={cls}>
      {children}
    </Tag>
  );
};
