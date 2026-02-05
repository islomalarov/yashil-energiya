"use client";


import { motion } from "motion/react";
import React from "react";

interface TheMotionWrapperProps {
  children: React.ReactNode;
}

export const TheMotionWrapper = ({ children }: TheMotionWrapperProps) => {
  return (
    <motion.div
      className="container"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.2 }} // Запускает анимацию, когда 20% компонента вошло в область просмотра
    >
      {children}
    </motion.div>
  );
};
