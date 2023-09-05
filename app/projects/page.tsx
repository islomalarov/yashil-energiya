import { TheHero } from "@/components/HeroComponent/TheHero";
import TheProjectsList from "@/components/ProjectsListComponent/TheProjectsList";
import "../../scss/globals.scss";

export default function Projects() {
  return (
    <>
      <TheHero title="Проекты" />
      <div className="container">
        <TheProjectsList />
      </div>
    </>
  );
}
