import s from "./TheAbout.module.scss";
import { getTranslations } from "next-intl/server";
import { TheMotionWrapper } from "../MotionWrapper/TheMotionWrapper";
import { TheButton } from "../ui/ButtonComponent/TheButton";
import {
  Handshake,
  Rocket,
  Sprout,
  Zap,
  type LucideIcon,
} from "lucide-react";

const eventIcons: Record<string, LucideIcon> = {
  event1: Sprout,
  event2: Zap,
  event3: Handshake,
  event4: Rocket,
};

export const TheAbout = async () => {
  const t = await getTranslations("AboutPage");
  const events = ["event1", "event2", "event3", "event4"] as const;

  return (
    <TheMotionWrapper motionKey="home-about">
      <section className={s.section}>
        <div className={s.content}>
          <div className={s.info}>
            <h2 className="title">{t("heroTitle1")}</h2>
            <div className={s.line}></div>
            <p className={s.title}>{t("content")}</p>
            <TheButton title={t("link")} url="about" />
          </div>
          <div className={s.timelineWrap}>
            <ol className={s.timeline}>
              {events.map((event) => {
                const year = t(`${event}.year`);
                const eventData = t.raw(`${event}.event`);
                const EventIcon = eventIcons[event];

                return (
                  <li
                    key={event}
                    className={s.timelineItem}
                  >
                    <span className={s.timelineIcon}>
                      <EventIcon aria-hidden="true" strokeWidth={1.8} />
                    </span>
                    <article className={s.timelineCard}>
                      <h3 className={s.eventTitle}>{year}</h3>
                      {eventData.length > 0 && (
                        <ul className={s.eventList}>
                          {eventData.map(
                            (ev: { description: string }, index: number) => (
                              <li key={index}>{ev.description}</li>
                            ),
                          )}
                        </ul>
                      )}
                    </article>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>
      </section>
    </TheMotionWrapper>
  );
};
