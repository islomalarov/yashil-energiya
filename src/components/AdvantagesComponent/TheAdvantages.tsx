"use client";

import "@/scss/globals.scss";
import styles from "./TheAdvantages.module.scss";
import { useTranslations } from "next-intl";
import { TheMotionWrapper } from "../MotionWrapper/TheMotionWrapper";
import { useEffect, useRef } from "react";
import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useTransform,
} from "motion/react";

export const TheAdvantages = () => {
  const t = useTranslations("TheAdvantages");

  const advantages = [
    "advantage1",
    "advantage2",
    "advantage3",
    "advantage4",
  ] as const;

  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true, // Запускаем анимацию один раз
    amount: 0.1, // Запускаем, когда 50% компонента в зоне видимости
    margin: "0px 0px -20% 0px", // Добавляем небольшой отступ
  });

  return (
    <div className={styles.main} ref={ref}>
      <TheMotionWrapper>
        <h3 className={styles.title}>{t("title")}</h3>
        {isInView && (
          <ul className={styles.advBlock}>
            {advantages.map((adv) => (
              <HTMLContent
                key={adv}
                title={t(`${adv}.title`)}
                total={t(`${adv}.total`)}
                unit={t(`${adv}.unit`)}
                duration={1}
              />
            ))}
          </ul>
        )}
      </TheMotionWrapper>
    </div>
  );
};

interface HTMLContentProps {
  title: string;
  unit?: string;
  total: string;
  duration: number;
}
export const HTMLContent = ({
  title,
  unit,
  total,
  duration,
}: HTMLContentProps) => {
  const count = useMotionValue(0);
  const rounded = useTransform(() => Math.round(count.get()));

  useEffect(() => {
    const controls = animate(count, Number(total), {
      duration: duration,
    });
    return () => controls.stop();
  }, [count, duration, total]);

  return (
    <li className={styles.adv}>
      <p className={styles.advTitle}>{title}</p>
      <div className={styles.box}>
        <motion.p className={styles.numb}>{rounded}</motion.p>
        <span className={styles.unit}>
          <sup>+</sup>
          {unit}
        </span>
      </div>
    </li>
  );
};
