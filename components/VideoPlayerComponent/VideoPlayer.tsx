import "../../scss/globals.scss";
import styles from "./page.module.scss";

const VideoPlayer = () => {
  return (
    <div className={styles.video}>
      <video width="1000" controls>
        <source src="video/servis.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};
export default VideoPlayer;
