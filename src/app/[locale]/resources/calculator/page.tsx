import { TheHero } from "@/components/HeroComponent/TheHero";
import { SolarCalculator } from "@/components/SolarCalculator/SolarCalculator";
import { getTranslations, setRequestLocale } from "next-intl/server";

export default async function CalculatorPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("CalculatorPage");

  return (
    <>
      <TheHero title1={t("title")} url1="resources/calculator" />
      <SolarCalculator />
    </>
  );
}
