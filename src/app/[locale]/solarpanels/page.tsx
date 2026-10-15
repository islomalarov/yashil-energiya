import { PlantStatusService } from "services/plant-status.service";
import { SolarPanelsClient } from "./SolarPanelsClient";
import { setRequestLocale } from "next-intl/server";

// Live region statuses are fetched uncached (revalidate: false) on every view.
export const dynamic = "force-dynamic";

export default async function SolarPanels({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const plantStatuses = await PlantStatusService.getPlantStatuses();

  return <SolarPanelsClient plantStatuses={plantStatuses} />;
}
