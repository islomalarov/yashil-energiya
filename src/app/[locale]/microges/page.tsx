import { MhpService } from "services/operational-assets.service";
import { MicroGesClient } from "./MicroGesClient";

export default async function MicroGes() {
  const mhps = await MhpService.getMhps();

  return <MicroGesClient mhps={mhps} />;
}
