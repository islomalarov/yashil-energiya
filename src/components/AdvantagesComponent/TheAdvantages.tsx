"use client";

import "@/scss/globals.scss";
import Image from "next/image";
import styles from "./TheAdvantages.module.scss";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { TheMotionWrapper } from "../MotionWrapper/TheMotionWrapper";

export const TheAdvantages = () => {
  const t = useTranslations("TheAdvantages");

  const advantages = [
    "advantage1",
    "advantage2",
    "advantage3",
    "advantage4",
  ] as const;

  return (
    <div className={styles.main}>
      <TheMotionWrapper>
        <h3 className={styles.title}>{t("title")}</h3>
        <div className={styles.advBlock}>
          {advantages.map((advantage: string) => (
            <motion.div
              className={styles.adv}
              key={advantage}
              whileHover={{
                background: `#5cb63f`,
                scale: 1.05,
              }}
              transition={{ duration: 0.3 }}
            >
              <Image
                src={`/${t(`${advantage}.src`)}`}
                alt={t(`${advantage}.description`)}
                width={100}
                height={100}
                className={styles.svgImage}
              />
              <p className={styles.description}>
                {t(`${advantage}.description`)}
              </p>
            </motion.div>
          ))}
        </div>
      </TheMotionWrapper>
    </div>
  );
};
