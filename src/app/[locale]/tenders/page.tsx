import { TheFeedback } from "@/src/components/FeedbackComponent/TheFeedback";
import { TheHero } from "@/src/components/HeroComponent/TheHero";
import { useTranslations } from "next-intl";

export default function TendersPage() {
  const t = useTranslations("TendersPage");
  return (
    <>
      <TheHero title1={t("title")} url1="tenders" />
      <div className="container"></div>
      <TheFeedback />
    </>
  );
}
