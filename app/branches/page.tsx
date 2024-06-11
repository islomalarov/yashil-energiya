import "../../scss/globals.scss";
import { TheHero } from "@/components/HeroComponent/TheHero";
import { TheFeedback } from "@/components/FeedbackComponent/TheFeedback";
import { TheBranches } from "@/components/BranchesComponent/TheBranches";
import VideoPlayer from "@/components/VideoPlayerComponent/VideoPlayer";
import YouTubePlayer from "@/components/YouTubePlayer/YouTubePlayer";

export default function Branches() {
  return (
    <>
      <TheHero title1="Filiallar" url1="branches" />
      <div className="container">
        {/* <YouTubePlayer videoId="dQw4w9WgXcQ" />
        <VideoPlayer /> */}
        <TheBranches />
      </div>
      <TheFeedback />
    </>
  );
}
