import { use } from "react";
import { TheHero } from "@/components/HeroComponent/TheHero";
import { TheFeedback } from "@/components/FeedbackComponent/TheFeedback";
import { TheBranches } from "@/components/BranchesComponent/TheBranches";
import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";

export default function Branches({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = use(params);
  setRequestLocale(locale);
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
