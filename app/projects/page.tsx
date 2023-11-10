import "../../scss/globals.scss";
import { TheHero } from "@/components/HeroComponent/TheHero";
import { TheProjectsList } from "@/components/ProjectsListComponent/TheProjectsList";
import { TheFeedback } from "@/components/FeedbackComponent/TheFeedback";

export default function Projects() {
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
