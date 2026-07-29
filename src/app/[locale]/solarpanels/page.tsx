import { setRequestLocale } from "next-intl/server";
import { PlantStatusService } from "services/plant-status.service";
import { SolarPanelsClient } from "./SolarPanelsClient";

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
