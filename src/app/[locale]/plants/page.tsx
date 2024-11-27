import "@/scss/globals.scss";
import { TheHero } from "@/src/components/HeroComponent/TheHero";
import { ThePlantsList } from "@/src/components/PlantsListComponent/ThePlantsList";
import { TheFeedback } from "@/src/components/FeedbackComponent/TheFeedback";
import { useTranslations } from "next-intl";

export default function Plants() {
  const t = useTranslations("TheLastPlants");
  return (
    <>
      <TheHero title1={t("heroTitle")} url1="plants" />
      <div className="container">
        <ThePlantsList begin={0} end={10} />
      </div>
      <TheFeedback />
    </>
  );
}
