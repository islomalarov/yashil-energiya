"use client";

import Image from "next/image";
import styles from "./page.module.scss";
import SearchIcon from "public/search.svg";
import { FormEvent, useState } from "react";
import { useRouter } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import cn from "classnames";

type TheSearchProps = {
  variant?: "header" | "burger";
};

export const TheSearch = ({ variant = "header" }: TheSearchProps) => {
  const [query, setQuery] = useState("");
  const router = useRouter();
  const t = useTranslations("SearchPage");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const value = query.trim();

    if (value) {
      router.push(`/search?q=${encodeURIComponent(value)}`);
    }
  };

  return (
    <form
      className={cn(styles.search, {
        [styles.burgerSearch]: variant === "burger",
      })}
      role="search"
      onSubmit={handleSubmit}
    >
      <label className={styles.label}>
        <span className={styles.visuallyHidden}>{t("label")}</span>
        <input
          className={styles.input}
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder={t("placeholder")}
          aria-label={t("label")}
        />
      </label>
      <button className={styles.searchBtn} type="submit" aria-label={t("submit")}>
        <Image src={SearchIcon} alt="" width={18} height={18} />
      </button>
    </form>
  );
};
