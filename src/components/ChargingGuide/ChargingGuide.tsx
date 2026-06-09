"use client";

import Image from "next/image";
import type { CSSProperties } from "react";
import { useTranslations } from "next-intl";
import cn from "classnames";
import s from "./ChargingGuide.module.scss";

const appUrl = "https://app.yashil-energiya.uz/";

type ChargingGuideStep = {
  number: number;
  image: string;
  title: string;
  description: string;
};

type Props = {
  compact?: boolean;
};

export function ChargingGuide({ compact = false }: Props) {
  const t = useTranslations("ChargingGuide");

  const steps: ChargingGuideStep[] = [
    {
      number: 1,
      image: "/images/charging-guide/step-1.webp",
      title: t("step1.title"),
      description: t("step1.description"),
    },
    {
      number: 2,
      image: "/images/charging-guide/step-2.webp",
      title: t("step2.title"),
      description: t("step2.description"),
    },
    {
      number: 3,
      image: "/images/charging-guide/step-3.webp",
      title: t("step3.title"),
      description: t("step3.description"),
    },
    {
      number: 4,
      image: "/images/charging-guide/step-4.webp",
      title: t("step4.title"),
      description: t("step4.description"),
    },
    {
      number: 5,
      image: "/images/charging-guide/step-5.webp",
      title: t("step5.title"),
      description: t("step5.description"),
    },
    {
      number: 6,
      image: "/images/charging-guide/step-6.webp",
      title: t("step6.title"),
      description: t("step6.description"),
    },
    {
      number: 7,
      image: "/images/charging-guide/step-7.webp",
      title: t("step7.title"),
      description: t("step7.description"),
    },
  ];

  return (
    <section
      className={cn(s.section, { [s.compact]: compact })}
      aria-labelledby="charging-guide-title"
    >
      <div className={compact ? s.inner : "container"}>
        {!compact && (
          <div className={s.header}>
            <p className={s.eyebrow}>{t("eyebrow")}</p>
            <h2 id="charging-guide-title" className={s.title}>
              {t("title")}
            </h2>
            <p className={s.subtitle}>{t("subtitle")}</p>
          </div>
        )}

        {compact && (
          <h2 id="charging-guide-title" className={s.visuallyHidden}>
            {t("title")}
          </h2>
        )}

        <ol className={s.grid} itemScope itemType="https://schema.org/HowTo">
          {steps.map((step, index) => {
            const image = (
              <div className={s.imageWrap}>
                <Image
                  className={s.image}
                  src={step.image}
                  alt={step.title}
                  fill
                  loading="lazy"
                  sizes="(max-width: 640px) 86vw, (max-width: 1024px) 42vw, 232px"
                />
              </div>
            );

            return (
              <li
                className={s.card}
                key={step.number}
                itemProp="step"
                itemScope
                itemType="https://schema.org/HowToStep"
                style={{ "--delay": `${index * 80}ms` } as CSSProperties}
              >
                <meta itemProp="position" content={String(step.number)} />
                <h3 className={s.visuallyHidden} itemProp="name">
                  {step.title}
                </h3>
                {step.number === 1 ? (
                  <a
                    className={s.imageLink}
                    href={appUrl}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={step.title}
                  >
                    {image}
                  </a>
                ) : (
                  image
                )}
                <p className={s.description} itemProp="text">
                  {step.description}
                </p>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
