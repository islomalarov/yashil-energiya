"use client";

import "@/scss/globals.scss";
import { TheHero } from "@/components/HeroComponent/TheHero";
import { ThePlantsList } from "@/components/PlantsListComponent/ThePlantsList";
import { TheFeedback } from "@/components/FeedbackComponent/TheFeedback";
import { useLocale, useTranslations } from "next-intl";
import { Plant, PlantService } from "services/plants.service";
import { useEffect, useState } from "react";
import { ThePaginationControls } from "@/components/PaginationComponent/ThePaginationControls";

export default function Plants() {
  const t = useTranslations("TheLastPlants");
  const locale = useLocale();
  const [plants, setPlants] = useState<Plant[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState<string | null>(null);

  const DEFAULT_PAGE_SIZE = 6;
  const skip = DEFAULT_PAGE_SIZE * (currentPage - 1);

  useEffect(() => {
    const fetchPlants = async () => {
      try {
        const {
          plants,
          plantsConnection: { aggregate },
        } = await PlantService.getAllPlants(DEFAULT_PAGE_SIZE, skip, locale);

        setPlants(plants);

        const totalPages = Math.ceil(aggregate.count / DEFAULT_PAGE_SIZE);

        setTotalPages(totalPages);
      } catch (err) {
        setError("Failed to load news data. Please try again later.");
      }
    };

    fetchPlants();
  }, [currentPage, locale, skip]);

  if (error) return <div>{error}</div>;

  return (
    <>
      <TheHero title1={t("heroTitle")} url1="plants" />
      <div className="container">
        <ThePlantsList plants={plants} />
        <ThePaginationControls
          totalPages={totalPages}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
      <TheFeedback />
    </>
  );
}
