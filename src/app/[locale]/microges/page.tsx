import { setRequestLocale } from "next-intl/server";
import { MhpService } from "services/operational-assets.service";
import { MicroGesClient } from "./MicroGesClient";

export default async function MicroGes({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const mhps = await MhpService.getMhps();

  return <MicroGesClient mhps={mhps} />;
}
