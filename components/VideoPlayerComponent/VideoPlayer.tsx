// "use client";
import "../../scss/globals.scss";
import styles from "./page.module.scss";

const VideoPlayer = ({ volume }: { volume: boolean }) => {
  return (
    <div className={styles.video}>
      <video
        width="100%"
        height="100%"
        autoPlay
        muted={volume}
        loop
        // controls
        src="video/servis.mp4"
      >
        {/* <source src="video/servis.mp4" type="video/mp4" />
        Your browser does not support the video tag. */}
      </video>
    </div>
  );
};
export default VideoPlayer;
