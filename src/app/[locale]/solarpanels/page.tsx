import { PlantStatusService } from "services/plant-status.service";
import { SolarPanelsClient } from "./SolarPanelsClient";

export default async function SolarPanels() {
  const plantStatuses = await PlantStatusService.getPlantStatuses();

  return <SolarPanelsClient plantStatuses={plantStatuses} />;
}
