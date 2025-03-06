"use client";

import "@/scss/globals.scss";
import styles from "./page.module.scss";
import { useState } from "react";
import { Volume2, VolumeOff } from "lucide-react";
import { motion } from "framer-motion";

const TheVideoPlayer = () => {
  const [volume, setVolume] = useState(true);

  return (
    <motion.div
      className={styles.video}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: "backOut" }}
      viewport={{ once: true, amount: 0.2 }}
    >
      <video
        src="/video/servis__77pct_smaller.mp4"
        width="100%"
        height="100%"
        autoPlay
        loop
        muted={volume}
        playsInline
      />
      <button
        className={styles.volumeBtn}
        id="volumeBtn"
        title="volumeBtn"
        onClick={() => setVolume(!volume)}
      >
        <motion.div whileHover={{ scale: 1.2 }} transition={{ duration: 0.3 }}>
          {volume ? <VolumeOff color="white" /> : <Volume2 color="white" />}
        </motion.div>
      </button>
    </motion.div>
  );
};
export default TheVideoPlayer;
