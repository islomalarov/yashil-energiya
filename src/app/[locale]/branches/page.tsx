import "@/scss/globals.scss";
import { TheHero } from "@/src/components/HeroComponent/TheHero";
import { TheFeedback } from "@/src/components/FeedbackComponent/TheFeedback";
import { TheBranches } from "@/src/components/BranchesComponent/TheBranches";

export default function Branches() {
  return (
    <>
      <TheHero title1="Filiallar" url1="branches" />
      <div className="container">
        <TheBranches />
      </div>
      <TheFeedback />
    </>
  );
}
