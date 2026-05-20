"use client";

import { useMemo, useState } from "react";
import s from "./ThePaginationControls.module.scss";

interface ThePaginationProps {
  totalPages: number;
  currentPage: number;
  setCurrentPage: (page: number) => void;
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

  if (totalPages <= 1) return null;

  return (
    <nav className={s.paginationContainer} aria-label="Pagination">
      <button
        type="button"
        className={s.pageButton}
        disabled={currentPage === 1}
        onClick={() => setCurrentPage(currentPage - 1)}
        aria-label="Previous page"
      >
        ‹
      </button>

      {items.map((item) =>
        item.type === "page" ? (
          <button
            key={item.page}
            type="button"
            className={`${s.pageButton} ${
              currentPage === item.page ? s.active : ""
            }`}
            onClick={() => setCurrentPage(item.page)}
            aria-current={currentPage === item.page ? "page" : undefined}
          >
            {item.page}
          </button>
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

      <button
        type="button"
        className={s.pageButton}
        disabled={currentPage === totalPages}
        onClick={() => setCurrentPage(currentPage + 1)}
        aria-label="Next page"
      >
        ›
      </button>
    </nav>
  );
};
