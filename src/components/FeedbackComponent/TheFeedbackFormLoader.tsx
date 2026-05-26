"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import styles from "./TheFeedback.module.scss";

const TheForm = dynamic(
  () => import("@/components/FormComponent/TheForm").then((mod) => mod.TheForm),
  {
    ssr: false,
    loading: () => <div className={styles.formPlaceholder} aria-hidden />,
  },
);

export function TheFeedbackFormLoader() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [shouldLoadForm, setShouldLoadForm] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element || shouldLoadForm) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;

        setShouldLoadForm(true);
        observer.disconnect();
      },
      { rootMargin: "520px 0px" },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [shouldLoadForm]);

  return (
    <div ref={ref} className={styles.formLoader}>
      {shouldLoadForm ? (
        <TheForm />
      ) : (
        <div className={styles.formPlaceholder} aria-hidden />
      )}
    </div>
  );
}
