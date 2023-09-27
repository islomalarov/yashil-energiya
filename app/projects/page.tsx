import { TheHero } from "@/components/HeroComponent/TheHero";
import TheProjectsList from "@/components/ProjectsListComponent/TheProjectsList";
import "../../scss/globals.scss";
import { TheFeedback } from "@/components/FeedbackComponent/TheFeedback";

export default function Projects() {
  return (
    <>
      <TheHero title="Проекты" />
      <div className="container">
        <TheProjectsList begin={0} end={10} />
      </div>
      <TheFeedback />
    </>
  );
}
