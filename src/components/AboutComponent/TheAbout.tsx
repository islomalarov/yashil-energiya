"use client";

import s from "./TheAbout.module.scss";
import { useTranslations } from "next-intl";
import { TheMotionWrapper } from "../MotionWrapper/TheMotionWrapper";
import { useEffect, useRef, useState } from "react";
import { TheButton } from "../ui/ButtonComponent/TheButton";
import { useLocaleMotionState } from "@/lib/locale-transition";

export const TheAbout = () => {
  const t = useTranslations("AboutPage");
  const ref = useRef<HTMLDivElement | null>(null);
  const { skipMotion, markViewed } = useLocaleMotionState("home:about-events");
  const [isInView, setIsInView] = useState(false);
  const events = ["event1", "event2", "event3", "event4"] as const;

  useEffect(() => {
    const element = ref.current;
    if (!element || skipMotion || isInView) {
      if (skipMotion) {
        setIsInView(true);
        markViewed();
      }
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;

        setIsInView(true);
        markViewed();
        observer.disconnect();
      },
      { rootMargin: "0px 0px -20% 0px", threshold: 0.3 },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [isInView, markViewed, skipMotion]);

  return (
    <TheMotionWrapper motionKey="home-about">
      <div className={s.content} ref={ref}>
        <div className={s.info}>
          <h2 className="title">{t("heroTitle1")}</h2>
          <div className={s.line}></div>
          <p className={s.title}>{t("content")}</p>
          <TheButton title={t("link")} url="about" />
        </div>
        <div
          className={`${s.events} ${
            isInView || skipMotion ? s.eventsVisible : s.eventsHidden
          }`}
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
                        ),
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </TheMotionWrapper>
  );
};
