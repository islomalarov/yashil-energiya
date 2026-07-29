import { setRequestLocale } from "next-intl/server";
import { EvChargeService } from "services/operational-assets.service";
import { ChargingStationClient } from "./ChargingStationClient";

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
