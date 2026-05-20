"use client";


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
import { useLocaleMotionState } from "@/lib/locale-transition";

export const TheAdvantages = () => {
  const t = useTranslations("TheAdvantages");
  const { skipMotion, markViewed } = useLocaleMotionState(
    "home:advantages-counters",
  );

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

  useEffect(() => {
    if (isInView) {
      markViewed();
    }
  }, [isInView, markViewed]);

  return (
    <div className={styles.main} ref={ref}>
      <TheMotionWrapper motionKey="home-advantages">
        <h3 className={styles.title}>{t("title")}</h3>
        {(skipMotion || isInView) && (
          <ul className={styles.advBlock}>
            {advantages.map((adv) => (
              <HTMLContent
                key={adv}
                title={t(`${adv}.title`)}
                total={t(`${adv}.total`)}
                unit={t(`${adv}.unit`)}
                duration={t(`${adv}.duration`)}
                skipMotion={skipMotion}
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
  duration: string;
  skipMotion: boolean;
}
export const HTMLContent = ({
  title,
  unit,
  total,
  duration,
  skipMotion,
}: HTMLContentProps) => {
  const count = useMotionValue(skipMotion ? Number(total) : 0);
  const rounded = useTransform(() => Math.round(count.get()));

  useEffect(() => {
    if (skipMotion) {
      count.set(Number(total));
      return;
    }

    const controls = animate(count, Number(total), {
      duration: Number(duration),
    });
    return () => controls.stop();
  }, [count, duration, skipMotion, total]);

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
