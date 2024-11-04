import "@/scss/globals.scss";
import { TheHero } from "@/src/components/HeroComponent/TheHero";
import { TheProjectsList } from "@/src/components/ProjectsListComponent/TheProjectsList";
import { TheFeedback } from "@/src/components/FeedbackComponent/TheFeedback";

export default async function Projects() {
  return (
    <>
      <TheHero title1="Loyihalar" url1="projects" />
      <div className="container">
        <TheProjectsList begin={0} end={10} />
      </div>
      <TheFeedback />
    </>
  );
}
