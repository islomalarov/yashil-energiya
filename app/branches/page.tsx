import "../../scss/globals.scss";
import { TheHero } from "@/components/HeroComponent/TheHero";
import { TheFeedback } from "@/components/FeedbackComponent/TheFeedback";
import { TheBranches } from "@/components/BranchesComponent/TheBranches";
import VideoPlayer from "@/components/VideoPlayerComponent/VideoPlayer";

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
