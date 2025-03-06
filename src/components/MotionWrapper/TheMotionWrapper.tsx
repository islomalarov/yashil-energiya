"use client";

import "@/scss/globals.scss";
import { motion } from "framer-motion";
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
      viewport={{ once: true, amount: 0.2 }}
    >
      {children}
    </motion.div>
  );
};
