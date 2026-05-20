"use client";


import styles from "./TheVideoPlayer.module.scss";
import { useState } from "react";
import { motion } from "motion/react";
import { useLocaleMotionState } from "@/lib/locale-transition";

const TheVideoPlayer = () => {
  const [volume] = useState(true);
  const { skipMotion, markViewed } = useLocaleMotionState("home:video");

  return (
    <motion.div
      className={styles.video}
      initial={skipMotion ? false : { opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={skipMotion ? { duration: 0 } : { duration: 1, ease: "backOut" }}
      viewport={{ once: true, amount: 0.2 }}
      onViewportEnter={markViewed}
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
