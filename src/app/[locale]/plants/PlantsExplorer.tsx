"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { usePathname, useRouter } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { ListFilter, SearchX, X } from "lucide-react";
import { ThePlantsList } from "@/components/PlantsListComponent/ThePlantsList";
import {
  extractRegion,
  installationTimestamp,
  parsePowerKw,
} from "@/lib/plant-metrics";
import type { Plant } from "services/plants.service";
import s from "./PlantsExplorer.module.scss";

const SORT_VALUES = ["default", "powerDesc", "powerAsc", "date", "name"] as const;
type SortValue = (typeof SORT_VALUES)[number];

const SEARCH_DEBOUNCE_MS = 300;
const SKELETON_COUNT = 6;

function normalizeSort(raw: string | null): SortValue {
  return SORT_VALUES.includes(raw as SortValue) ? (raw as SortValue) : "default";
}

type PlantsExplorerProps = {
  plants: Plant[];
};

export const PlantsExplorer = ({ plants }: PlantsExplorerProps) => {
  const t = useTranslations("PlantsPage.filters");
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const appliedQuery = searchParams.get("q") ?? "";
  const appliedRegion = searchParams.get("region") ?? "";
  const appliedSort = normalizeSort(searchParams.get("sort"));

  const [searchInput, setSearchInput] = useState(appliedQuery);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const skipNextSync = useRef(false);

  useEffect(() => {
    if (skipNextSync.current) {
      skipNextSync.current = false;
      return;
    }
    setSearchInput(appliedQuery);
  }, [appliedQuery]);

  const updateParams = (updates: Record<string, string>) => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("page");
    for (const [key, value] of Object.entries(updates)) {
      if (value && !(key === "sort" && value === "default")) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
    }
    const query = params.toString();
    router.replace(query ? `${pathname}?${query}` : pathname, {
      scroll: false,
    });
  };

  useEffect(() => {
    if (searchInput === appliedQuery) return;

    const timer = window.setTimeout(() => {
      skipNextSync.current = true;
      updateParams({ q: searchInput.trim() });
    }, SEARCH_DEBOUNCE_MS);

    return () => window.clearTimeout(timer);
  }, [searchInput]);

  const regions = useMemo(() => {
    const unique = new Set<string>();
    plants.forEach((plant) => {
      const region = extractRegion(plant.address);
      if (region) unique.add(region);
    });
    return Array.from(unique).sort((a, b) => a.localeCompare(b));
  }, [plants]);

  const filteredPlants = useMemo(() => {
    const query = appliedQuery.trim().toLowerCase();

    const matched = plants.filter((plant) => {
      if (query && !plant.title.toLowerCase().includes(query)) return false;
      if (appliedRegion && extractRegion(plant.address) !== appliedRegion) {
        return false;
      }
      return true;
    });

    switch (appliedSort) {
      case "powerDesc":
        return [...matched].sort(
          (a, b) => (parsePowerKw(b.power) ?? 0) - (parsePowerKw(a.power) ?? 0),
        );
      case "powerAsc":
        return [...matched].sort(
          (a, b) => (parsePowerKw(a.power) ?? 0) - (parsePowerKw(b.power) ?? 0),
        );
      case "date":
        return [...matched].sort(
          (a, b) => installationTimestamp(b.date) - installationTimestamp(a.date),
        );
      case "name":
        return [...matched].sort((a, b) => a.title.localeCompare(b.title));
      default:
        return matched;
    }
  }, [plants, appliedQuery, appliedRegion, appliedSort]);

  const isSearchPending = searchInput.trim() !== appliedQuery.trim();
  const hasActiveFilters =
    Boolean(appliedQuery) || Boolean(appliedRegion) || appliedSort !== "default";

  const resetFilters = () => {
    skipNextSync.current = false;
    setSearchInput("");
    updateParams({ q: "", region: "", sort: "" });
  };

  return (
    <section aria-label={t("panelLabel")}>
      <button
        type="button"
        className={s.filtersToggle}
        aria-expanded={filtersOpen}
        onClick={() => setFiltersOpen((open) => !open)}
      >
        <ListFilter aria-hidden="true" />
        {t("toggle")}
        {hasActiveFilters && <span className={s.toggleDot} aria-hidden="true" />}
      </button>

      <div className={`${s.panel} ${filtersOpen ? s.panelOpen : ""}`}>
        <label className={s.field}>
          <span className={s.fieldLabel}>{t("searchLabel")}</span>
          <input
            type="search"
            className={s.input}
            value={searchInput}
            placeholder={t("searchPlaceholder")}
            onChange={(event) => setSearchInput(event.target.value)}
          />
        </label>

        <label className={s.field}>
          <span className={s.fieldLabel}>{t("regionLabel")}</span>
          <select
            className={s.input}
            value={appliedRegion}
            onChange={(event) => updateParams({ region: event.target.value })}
          >
            <option value="">{t("regionAll")}</option>
            {regions.map((region) => (
              <option key={region} value={region}>
                {region}
              </option>
            ))}
          </select>
        </label>

        <label className={s.field}>
          <span className={s.fieldLabel}>{t("sortLabel")}</span>
          <select
            className={s.input}
            value={appliedSort}
            onChange={(event) => updateParams({ sort: event.target.value })}
          >
            {SORT_VALUES.map((value) => (
              <option key={value} value={value}>
                {t(`sort_${value}`)}
              </option>
            ))}
          </select>
        </label>
      </div>

      {hasActiveFilters && (
        <div className={s.chips}>
          {appliedQuery && (
            <button
              type="button"
              className={s.chip}
              onClick={() => {
                skipNextSync.current = false;
                setSearchInput("");
                updateParams({ q: "" });
              }}
            >
              {t("chipSearch", { query: appliedQuery })}
              <X aria-hidden="true" />
            </button>
          )}
          {appliedRegion && (
            <button
              type="button"
              className={s.chip}
              onClick={() => updateParams({ region: "" })}
            >
              {appliedRegion}
              <X aria-hidden="true" />
            </button>
          )}
          {appliedSort !== "default" && (
            <button
              type="button"
              className={s.chip}
              onClick={() => updateParams({ sort: "" })}
            >
              {t(`sort_${appliedSort}`)}
              <X aria-hidden="true" />
            </button>
          )}
          <button type="button" className={s.reset} onClick={resetFilters}>
            {t("reset")}
          </button>
        </div>
      )}

      <p className={s.resultCount} role="status">
        {t("resultCount", { count: filteredPlants.length })}
      </p>

      {isSearchPending ? (
        <ul className={s.skeletonGrid} aria-hidden="true">
          {Array.from({ length: SKELETON_COUNT }, (_, index) => (
            <li key={index} className={s.skeletonCard}>
              <span className={s.skeletonMedia} />
              <span className={s.skeletonLine} />
              <span className={s.skeletonLineShort} />
            </li>
          ))}
        </ul>
      ) : filteredPlants.length > 0 ? (
        <ThePlantsList plants={filteredPlants} />
      ) : (
        <div className={s.emptyState}>
          <SearchX aria-hidden="true" />
          <p>{t("emptyTitle")}</p>
          <button type="button" className={s.emptyReset} onClick={resetFilters}>
            {t("reset")}
          </button>
        </div>
      )}
    </section>
  );
};
