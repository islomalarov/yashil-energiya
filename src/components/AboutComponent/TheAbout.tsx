"use client";

import "@/scss/globals.scss";
import s from "./TheAbout.module.scss";
import { useTranslations } from "next-intl";
import { motion, useInView } from "motion/react";
import { TheMotionWrapper } from "../MotionWrapper/TheMotionWrapper";
import { useRef } from "react";
import { TheButton } from "../ui/ButtonComponent/TheButton";

export const TheAbout = () => {
  const t = useTranslations("AboutPage");
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true, // Запускаем анимацию один раз
    amount: 0.3, // Запускаем, когда 50% компонента в зоне видимости
    margin: "0px 0px -20% 0px", // Добавляем небольшой отступ
  });
  const events = ["event1", "event2", "event3"] as const;

  return (
    <TheMotionWrapper>
      <div className={s.content} ref={ref}>
        <div className={s.info}>
          <h2 className="title">{t("heroTitle1")}</h2>
          <div className={s.line}></div>
          <p className={s.title}>{t("content")}</p>
          <TheButton title={t("link")} url="about" />
        </div>
        <motion.div
          className={s.events}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1 }}
        >
          {events.map((event) => {
            const year = t(`${event}.year`);
            const eventData = t.raw(`${event}.event`);

            return (
              <div key={event}>
                <div className={s.event}>
                  <p className={s.eventTitle}>{year}</p>
                </div>
                {eventData.length > 0 && (
                  <div className={s.eventInfo}>
                    <div className={s.divide}></div>
                    <div className={s.eventText}>
                      {eventData.map(
                        (ev: { description: string }, index: number) => (
                          <p key={index} className="description">
                            {ev.description}
                          </p>
                        )
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </motion.div>
      </div>
    </TheMotionWrapper>
  );
};
