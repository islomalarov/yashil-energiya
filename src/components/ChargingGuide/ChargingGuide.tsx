"use client";

import Image from "next/image";
import type { CSSProperties } from "react";
import { useLocale, useTranslations } from "next-intl";
import cn from "classnames";
import { ExternalLink } from "lucide-react";
import s from "./ChargingGuide.module.scss";

const appUrl = "https://app.yashil-energiya.uz/";
const topUpUrl = "https://app.yashil-energiya.uz/s/top-up";
const stationsUrl = "https://app.yashil-energiya.uz/s/stations";
const scanQrUrl = "https://app.yashil-energiya.uz/s/scan-qr";

const linkLabels = {
  en: {
    app: "Open app",
    topUp: "Top up balance",
    stations: "Open station map",
    scanQr: "Scan QR",
  },
  ru: {
    app: "Открыть приложение",
    topUp: "Пополнить баланс",
    stations: "Открыть карту станций",
    scanQr: "Сканировать QR",
  },
  uz: {
    app: "Ilovani ochish",
    topUp: "Balansni to'ldirish",
    stations: "Stansiyalar xaritasi",
    scanQr: "QR skanerlash",
  },
};

type ChargingGuideStep = {
  number: number;
  image: string;
  title: string;
  description: string;
  link?: {
    href: string;
    label: string;
  };
};

type Props = {
  compact?: boolean;
};

export function ChargingGuide({ compact = false }: Props) {
  const t = useTranslations("ChargingGuide");
  const locale = useLocale() as keyof typeof linkLabels;
  const labels = linkLabels[locale] ?? linkLabels.en;

  const steps: ChargingGuideStep[] = [
    {
      number: 1,
      image: "/images/charging-guide/step-1-wide.webp",
      title: t("step1.title"),
      description: t("step1.description"),
      link: {
        href: appUrl,
        label: labels.app,
      },
    },
    {
      number: 2,
      image: "/images/charging-guide/step-2-wide.webp",
      title: t("step2.title"),
      description: t("step2.description"),
      link: {
        href: topUpUrl,
        label: labels.topUp,
      },
    },
    {
      number: 3,
      image: "/images/charging-guide/step-3-wide.webp",
      title: t("step3.title"),
      description: t("step3.description"),
      link: {
        href: stationsUrl,
        label: labels.stations,
      },
    },
    {
      number: 4,
      image: "/images/charging-guide/step-4-wide.webp",
      title: t("step4.title"),
      description: t("step4.description"),
    },
    {
      number: 5,
      image: "/images/charging-guide/step-5-wide.webp",
      title: t("step5.title"),
      description: t("step5.description"),
      link: {
        href: scanQrUrl,
        label: labels.scanQr,
      },
    },
    {
      number: 6,
      image: "/images/charging-guide/step-6-wide.webp",
      title: t("step6.title"),
      description: t("step6.description"),
    },
    {
      number: 7,
      image: "/images/charging-guide/step-7-wide.webp",
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
                <div className={s.imageWrap}>
                  <span className={s.stepBadge} aria-hidden="true">
                    {step.number}
                  </span>
                  <Image
                    className={s.image}
                    src={step.image}
                    alt={step.title}
                    fill
                    loading="lazy"
                    sizes="(max-width: 640px) 94vw, (max-width: 1024px) 84vw, 540px"
                  />
                </div>
                <div className={s.cardBody}>
                  <p className={s.description} itemProp="text">
                    {step.description}
                  </p>
                  {step.link && (
                    <a
                      className={s.stepLink}
                      href={step.link.href}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`${step.title}: ${step.link.label}`}
                    >
                      <span>{step.link.label}</span>
                      <ExternalLink aria-hidden="true" size={16} />
                    </a>
                  )}
                </div>
                {step.link && <meta itemProp="url" content={step.link.href} />}
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
