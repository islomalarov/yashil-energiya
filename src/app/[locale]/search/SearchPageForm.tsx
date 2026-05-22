"use client";

import { useRouter } from "@/i18n/navigation";
import { FormEvent, useEffect, useState } from "react";
import s from "./page.module.scss";

type SearchPageFormProps = {
  initialQuery: string;
  label: string;
  placeholder: string;
  submit: string;
};

export function SearchPageForm({
  initialQuery,
  label,
  placeholder,
  submit,
}: SearchPageFormProps) {
  const [query, setQuery] = useState(initialQuery);
  const router = useRouter();

  useEffect(() => {
    setQuery(initialQuery);
  }, [initialQuery]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const value = query.trim();

    router.push(value ? `/search?q=${encodeURIComponent(value)}` : "/search");
  };

  return (
    <form className={s.form} role="search" onSubmit={handleSubmit}>
      <input
        className={s.input}
        type="search"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder={placeholder}
        aria-label={label}
      />
      <button className={s.button} type="submit">
        {submit}
      </button>
    </form>
  );
}
