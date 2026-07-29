import { EvChargeService } from "services/operational-assets.service";
import { ChargingStationClient } from "./ChargingStationClient";

export default async function ChargingStationPage() {
  const evCharges = await EvChargeService.getEvCharges();

  return <ChargingStationClient evCharges={evCharges} />;
}
