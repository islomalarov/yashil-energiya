import type { Metadata } from "next";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import Logo from "public/logo2.svg";
import { ChargingGuide } from "@/components/ChargingGuide/ChargingGuide";
import { Link } from "@/i18n/navigation";
import { absoluteUrl, siteName } from "@/lib/seo";
import { TaplinkLocaleSwitcher } from "../taplink/TaplinkLocaleSwitcher";
import s from "../taplink/page.module.scss";

type Locale = "en" | "ru" | "uz";

type Props = {
  params: Promise<{ locale: Locale }>;
};

const copy = {
  en: {
    metaTitle: "EV charging guide",
    metaDescription:
      "Step-by-step guide for charging an electric vehicle through Yashil Energiya.",
    eyebrow: "Charging guide",
    title: "EV charging made simple",
    subtitle:
      "Seven clear steps for finding a station, starting a session and finishing charging safely.",
  },
  ru: {
    metaTitle: "Инструкция по зарядке электромобиля",
    metaDescription:
      "Пошаговая инструкция по зарядке электромобиля через Yashil Energiya.",
    eyebrow: "Инструкция по зарядке",
    title: "Зарядка электромобиля без лишних шагов",
    subtitle:
      "Семь понятных действий: найти станцию, запустить сессию и безопасно завершить зарядку.",
  },
  uz: {
    metaTitle: "Elektromobilni zaryadlash yo'riqnomasi",
    metaDescription:
      "Yashil Energiya orqali elektromobilni zaryadlash bo'yicha bosqichma-bosqich yo'riqnoma.",
    eyebrow: "Zaryadlash yo'riqnomasi",
    title: "Elektromobilni zaryadlash oson",
    subtitle:
      "Stansiyani topish, seansni boshlash va zaryadlashni xavfsiz yakunlash uchun yetti aniq bosqich.",
  },
} satisfies Record<Locale, Record<string, string>>;

const backCopy = {
  en: "Back to links",
  ru: "Назад к ссылкам",
  uz: "Havolalarga qaytish",
} satisfies Record<Locale, string>;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = copy[locale] ?? copy.en;
  const url = absoluteUrl(`/${locale}/ev-guide`);
  const image = absoluteUrl("/images/charging-guide/ev-guide-og.webp");

  return {
    title: t.metaTitle,
    description: t.metaDescription,
    robots: {
      index: false,
      follow: false,
      googleBot: {
        index: false,
        follow: false,
      },
    },
    openGraph: {
      title: t.metaTitle,
      description: t.metaDescription,
      url,
      siteName,
      locale,
      type: "website",
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: t.metaTitle,
          type: "image/webp",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: t.metaTitle,
      description: t.metaDescription,
      images: [image],
    },
  };
}

export default async function EvGuidePage({ params }: Props) {
  const { locale } = await params;
  const t = copy[locale] ?? copy.en;
  const backText = backCopy[locale] ?? backCopy.en;

  return (
    <section className={`${s.page} ev-guide-page`}>
      <div className={s.shell}>
        <div className={s.topBar}>
          <div className={s.topLogo}>
            <Image className={s.logo} src={Logo} alt="Yashil Energiya" priority />
          </div>
          <TaplinkLocaleSwitcher pathname="/ev-guide" />
        </div>

        <div className={s.hero}>
          <p className={s.eyebrow}>{t.eyebrow}</p>
          <h1>{t.title}</h1>
          <p className={s.subtitle}>{t.subtitle}</p>
        </div>

        <ChargingGuide compact />

        <div className={s.evGuideActions}>
          <Link className={s.backLink} href="/taplink">
            <ArrowLeft aria-hidden="true" size={18} />
            <span>{backText}</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
