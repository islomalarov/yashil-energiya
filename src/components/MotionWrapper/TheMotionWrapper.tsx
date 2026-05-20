"use client";

import { usePathname } from "@/i18n/navigation";
import { useLocaleMotionState } from "@/lib/locale-transition";
import { motion } from "motion/react";
import React, { useId } from "react";

interface TheMotionWrapperProps {
  children: React.ReactNode;
  motionKey?: string;
}

export const TheMotionWrapper = ({
  children,
  motionKey,
}: TheMotionWrapperProps) => {
  const id = useId();
  const pathname = usePathname();
  const { skipMotion, markViewed } = useLocaleMotionState(
    `${pathname}:motion-wrapper:${motionKey ?? id}`,
  );

  return (
    <motion.div
      className="container"
      initial={skipMotion ? false : { opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={
        skipMotion ? { duration: 0 } : { duration: 0.8, ease: "easeOut" }
      }
      viewport={{ once: true, amount: 0.2 }}
      onViewportEnter={markViewed}
    >
      {children}
    </motion.div>
  );
};
