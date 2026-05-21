"use client";

import { ReactNode, useMemo, useState } from "react";
import { Link } from "@/i18n/navigation";
import s from "./ThePaginationControls.module.scss";

interface ThePaginationProps {
  totalPages: number;
  currentPage: number;
  setCurrentPage?: (page: number) => void;
  hrefBase?: string;
  pageParam?: string;
}

type PaginationItem =
  | { type: "page"; page: number }
  | { type: "ellipsis"; id: string; pages: number[] };

function range(start: number, end: number) {
  return Array.from({ length: end - start + 1 }, (_, index) => start + index);
}

function buildPaginationItems(
  totalPages: number,
  currentPage: number,
  expanded: Set<string>,
): PaginationItem[] {
  if (totalPages <= 7) {
    return range(1, totalPages).map((page) => ({ type: "page", page }));
  }

  const visible = new Set([
    1,
    totalPages,
    currentPage,
    currentPage - 1,
    currentPage + 1,
  ]);
  const visiblePages = Array.from(visible)
    .filter((page) => page >= 1 && page <= totalPages)
    .sort((a, b) => a - b);

  const items: PaginationItem[] = [];

  visiblePages.forEach((page, index) => {
    const previousPage = visiblePages[index - 1];

    if (previousPage && page - previousPage > 1) {
      const hiddenPages = range(previousPage + 1, page - 1);
      const id = `${previousPage}-${page}`;

      if (expanded.has(id)) {
        items.push(
          ...hiddenPages.map((hiddenPage) => ({
            type: "page" as const,
            page: hiddenPage,
          })),
        );
      } else {
        items.push({ type: "ellipsis", id, pages: hiddenPages });
      }
    }

    items.push({ type: "page", page });
  });

  return items;
}

export const ThePaginationControls = ({
  totalPages,
  currentPage,
  setCurrentPage,
  hrefBase,
  pageParam = "page",
}: ThePaginationProps) => {
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(new Set());

  const items = useMemo(
    () => buildPaginationItems(totalPages, currentPage, expandedGroups),
    [currentPage, expandedGroups, totalPages],
  );

  const toggleGroup = (id: string) => {
    setExpandedGroups((current) => {
      const next = new Set(current);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const renderPageControl = (
    page: number,
    label: ReactNode,
    options?: {
      disabled?: boolean;
      ariaLabel?: string;
      active?: boolean;
    },
  ) => {
    const className = `${s.pageButton} ${options?.active ? s.active : ""}`;

    if (hrefBase && !options?.disabled) {
      const href = page <= 1 ? hrefBase : `${hrefBase}?${pageParam}=${page}`;

      return (
        <Link
          className={className}
          href={href}
          aria-label={options?.ariaLabel}
          aria-current={options?.active ? "page" : undefined}
          scroll={false}
        >
          {label}
        </Link>
      );
    }

    return (
      <button
        type="button"
        className={className}
        disabled={options?.disabled}
        onClick={() => setCurrentPage?.(page)}
        aria-label={options?.ariaLabel}
        aria-current={options?.active ? "page" : undefined}
      >
        {label}
      </button>
    );
  };

  if (totalPages <= 1) return null;

  return (
    <nav className={s.paginationContainer} aria-label="Pagination">
      {renderPageControl(currentPage - 1, "‹", {
        disabled: currentPage === 1,
        ariaLabel: "Previous page",
      })}

      {items.map((item) =>
        item.type === "page" ? (
          <span key={item.page}>
            {renderPageControl(item.page, item.page, {
              active: currentPage === item.page,
            })}
          </span>
        ) : (
          <button
            key={item.id}
            type="button"
            className={`${s.pageButton} ${s.ellipsis}`}
            onClick={() => toggleGroup(item.id)}
            aria-label={`Show pages ${item.pages[0]} to ${
              item.pages[item.pages.length - 1]
            }`}
          >
            ...
          </button>
        ),
      )}

      {renderPageControl(currentPage + 1, "›", {
        disabled: currentPage === totalPages,
        ariaLabel: "Next page",
      })}
    </nav>
  );
};
