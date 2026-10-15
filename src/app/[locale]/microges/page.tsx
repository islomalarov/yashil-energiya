import { MhpService } from "services/operational-assets.service";
import { MicroGesClient } from "./MicroGesClient";
import { setRequestLocale } from "next-intl/server";

// Live plant statuses are fetched uncached (revalidate: false) on every view.
export const dynamic = "force-dynamic";

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
