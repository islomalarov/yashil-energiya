import "@/scss/globals.scss";
import { TheHero } from "@/src/components/HeroComponent/TheHero";
import { TheProjectsList } from "@/src/components/ProjectsListComponent/TheProjectsList";
import { TheFeedback } from "@/src/components/FeedbackComponent/TheFeedback";
import { useTranslations } from "next-intl";

export default function Projects() {
  const t = useTranslations("TheLastProjects");
  return (
    <>
      <TheHero title1={t("heroTitle")} url1="projects" />
      <div className="container">
        <TheProjectsList begin={0} end={10} />
      </div>
      <TheFeedback />
    </>
  );
}
