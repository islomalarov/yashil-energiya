"use client";

import { usePathname } from "@/i18n/navigation";
import { useLocaleMotionState } from "@/lib/locale-transition";
import React, { useEffect, useId, useRef, useState } from "react";

interface TheMotionWrapperProps {
  children: React.ReactNode;
  motionKey?: string;
}

export const TheMotionWrapper = ({
  children,
  motionKey,
}: TheMotionWrapperProps) => {
  const id = useId();
  const ref = useRef<HTMLDivElement | null>(null);
  const pathname = usePathname();
  const { skipMotion, markViewed } = useLocaleMotionState(
    `${pathname}:motion-wrapper:${motionKey ?? id}`,
  );
  const [isVisible, setIsVisible] = useState(motionKey === "site-header");

  useEffect(() => {
    const element = ref.current;
    if (!element || skipMotion || isVisible) {
      if (skipMotion) {
        setIsVisible(true);
        markViewed();
      }
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;

        setIsVisible(true);
        markViewed();
        observer.disconnect();
      },
      { rootMargin: "0px 0px -15% 0px", threshold: 0.15 },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [isVisible, markViewed, skipMotion]);

  return (
    <div
      ref={ref}
      className={`container motion-wrapper ${
        isVisible || skipMotion ? "motion-wrapper--visible" : ""
      }`}
    >
      {children}
    </div>
  );
};
