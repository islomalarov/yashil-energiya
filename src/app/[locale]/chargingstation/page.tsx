import { EvChargeService } from "services/operational-assets.service";
import { ChargingStationClient } from "./ChargingStationClient";
import { setRequestLocale } from "next-intl/server";

// Live station statuses are fetched uncached (revalidate: false) on every view.
export const dynamic = "force-dynamic";

export default async function ChargingStationPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const evCharges = await EvChargeService.getEvCharges();

  return <ChargingStationClient evCharges={evCharges} />;
}
