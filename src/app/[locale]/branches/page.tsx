import "@/scss/globals.scss";
import { TheHero } from "@/components/HeroComponent/TheHero";
import { TheFeedback } from "@/components/FeedbackComponent/TheFeedback";
import { TheBranches } from "@/components/BranchesComponent/TheBranches";
import { useTranslations } from "next-intl";

export default function Branches() {
  const t = useTranslations("BranchesPage");
  return (
    <>
      <TheHero title1={t("title")} url1="branches" />
      <div className="container">
        <TheBranches />
      </div>
      <TheFeedback />
    </>
  );
}
