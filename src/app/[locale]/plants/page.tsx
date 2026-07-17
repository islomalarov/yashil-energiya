import s from "./page.module.scss";
import { TheHero } from "@/components/HeroComponent/TheHero";
import { TheFeedback } from "@/components/FeedbackComponent/TheFeedback";
import { PlantService } from "services/plants.service";
import { PlantsExplorer } from "./PlantsExplorer";
import { getLocale, getTranslations } from "next-intl/server";
import { redirect } from "@/i18n/navigation";
import { TheJsonLd } from "@/components/JsonLd/TheJsonLd";
import { absoluteUrl, itemListJsonLd, localizedPath } from "@/lib/seo";
import { summarizePlants } from "@/lib/plant-metrics";
import type { Metadata } from "next";

type PlantsPageProps = {
  searchParams?: Promise<{ page?: string }>;
};

const ALL_PLANTS_LIMIT = 100;

function normalizePage(page?: string) {
  const parsed = Number(page);
  return Number.isInteger(parsed) && parsed > 0 ? parsed : 1;
}

export async function generateMetadata({
  searchParams,
}: PlantsPageProps): Promise<Metadata> {
  const { page } = (await searchParams) ?? {};

  // Pagination was replaced by client-side filters; legacy /plants?page=2
  // links still resolve but stay out of the index.
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

export default async function Plants() {
  const locale = await getLocale();
  if (locale === "uz") {
    redirect({ href: "/plants", locale: "en" });
  }

  const t = await getTranslations("TheLastPlants");
  const tSummary = await getTranslations("PlantsPage.summary");

  const { plants } = await PlantService.getAllPlants(
    ALL_PLANTS_LIMIT,
    0,
    locale,
  );

  const summary = summarizePlants(plants);
  const integerFormat = new Intl.NumberFormat(locale, {
    maximumFractionDigits: 0,
  });
  const decimalFormat = new Intl.NumberFormat(locale, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  const powerValue =
    summary.totalPowerKw > 1000
      ? { value: decimalFormat.format(summary.totalPowerKw / 1000), unit: tSummary("unitMw") }
      : { value: integerFormat.format(summary.totalPowerKw), unit: tSummary("unitKw") };

  const metrics = [
    {
      label: tSummary("plantsLabel"),
      value: integerFormat.format(summary.count),
      unit: null,
    },
    {
      label: tSummary("powerLabel"),
      value: powerValue.value,
      unit: powerValue.unit,
    },
    {
      label: tSummary("productionLabel"),
      value: decimalFormat.format(summary.totalProductionKwh / 1_000_000),
      unit: tSummary("unitGwh"),
    },
    {
      label: tSummary("co2Label"),
      value: integerFormat.format(Math.round(summary.totalCo2Tons)),
      unit: tSummary("unitTons"),
    },
  ];

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
        <section className={s.summary} aria-label={tSummary("label")}>
          {metrics.map((metric) => (
            <article key={metric.label} className={s.summaryCard}>
              <p className={s.summaryLabel}>{metric.label}</p>
              <p className={s.summaryValue}>
                {metric.value}
                {metric.unit && <span>{metric.unit}</span>}
              </p>
            </article>
          ))}
        </section>
        <PlantsExplorer plants={plants} />
      </div>
      <TheFeedback />
    </>
  );
}
