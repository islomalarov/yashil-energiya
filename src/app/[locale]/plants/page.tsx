import { TheHero } from "@/components/HeroComponent/TheHero";
import { ThePlantsList } from "@/components/PlantsListComponent/ThePlantsList";
import { TheFeedback } from "@/components/FeedbackComponent/TheFeedback";
import { PlantService } from "services/plants.service";
import { ThePaginationControls } from "@/components/PaginationComponent/ThePaginationControls";
import { getLocale, getTranslations } from "next-intl/server";
import { redirect } from "@/i18n/navigation";
import { TheJsonLd } from "@/components/JsonLd/TheJsonLd";
import { absoluteUrl, itemListJsonLd, localizedPath } from "@/lib/seo";
import type { Metadata } from "next";

type PlantsPageProps = {
  searchParams?: Promise<{ page?: string }>;
};

const DEFAULT_PAGE_SIZE = 6;

function normalizePage(page?: string) {
  const parsed = Number(page);
  return Number.isInteger(parsed) && parsed > 0 ? parsed : 1;
}

export async function generateMetadata({
  searchParams,
}: PlantsPageProps): Promise<Metadata> {
  const { page } = (await searchParams) ?? {};

  if (normalizePage(page) <= 1) {
    return {};
  }

  return {
    robots: {
      index: false,
      follow: true,
      googleBot: {
        index: false,
        follow: true,
      },
    },
  };
}

export default async function Plants({ searchParams }: PlantsPageProps) {
  const locale = await getLocale();
  if (locale === "uz") {
    redirect({ href: "/plants", locale: "en" });
  }

  const t = await getTranslations("TheLastPlants");
  const { page } = (await searchParams) ?? {};
  const currentPage = normalizePage(page);
  const skip = DEFAULT_PAGE_SIZE * (currentPage - 1);

  const {
    plants,
    plantsConnection: { aggregate },
  } = await PlantService.getAllPlants(DEFAULT_PAGE_SIZE, skip, locale);

  const totalPages = Math.ceil(aggregate.count / DEFAULT_PAGE_SIZE);

  return (
    <>
      <TheJsonLd
        data={itemListJsonLd(locale, "/plants", plants, (item) => ({
          name: item.title,
          url: absoluteUrl(localizedPath(locale, `/plants/${item.id}`)),
        }))}
      />
      <TheHero title1={t("heroTitle")} url1="plants" />
      <div className="container">
        <ThePlantsList plants={plants} linkLabel={t("link")} />
        <ThePaginationControls
          totalPages={totalPages}
          currentPage={currentPage}
          hrefBase="/plants"
        />
      </div>
      <TheFeedback />
    </>
  );
}
