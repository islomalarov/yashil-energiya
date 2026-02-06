"use client";


import styles from "./TheVideoPlayer.module.scss";
import { useState } from "react";
import { motion } from "motion/react";

const TheVideoPlayer = () => {
  const [volume] = useState(true);

  return (
    <motion.div
      className={styles.video}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: "backOut" }}
      viewport={{ once: true, amount: 0.2 }}
    >
      <video
        src="/video/YASHIL_ENERGY_FINAL11_01_2026.mp4"
        width="100%"
        height="100%"
        autoPlay
        loop
        muted={volume}
        playsInline
        controls
        controlsList="nodownload"
      />
    </motion.div>
  );
};
export default TheVideoPlayer;
