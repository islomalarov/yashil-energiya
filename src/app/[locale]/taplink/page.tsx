import type { Metadata } from "next";
import Image from "next/image";
import {
  AppWindow,
  Globe2,
  Mail,
  MapPinned,
  Navigation,
} from "lucide-react";
import Logo from "public/logo2.svg";
import { TaplinkLocaleSwitcher } from "./TaplinkLocaleSwitcher";
import s from "./page.module.scss";

type Locale = "en" | "ru" | "uz";

type Props = {
  params: Promise<{ locale: Locale }>;
};

const websiteUrl = "https://yashil-energiya.uz";
const appUrl = "https://app.yashil-energiya.uz/";
const email = "info@yashil-energiya.uz";
const emailUrl = `mailto:${email}`;
const mapsUrl = "https://maps.app.goo.gl/vHe5tCnb4TgP1C2p9";
const latitude = "41.328056596231995";
const longitude = "69.29227614233336";
const yandexRouteUrl = `https://yandex.uz/maps/?rtext=~${latitude}%2C${longitude}&rtt=auto`;
const twoGisRouteUrl = `https://2gis.uz/tashkent/routeSearch/rsType/car/to/${longitude}%2C${latitude}`;
const mapSrc =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d629.8574893084249!2d69.29235218411685!3d41.32791623011573!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38aef502436398eb%3A0xa40ec419e35355df!2sJV%20%22Yashil%20Energiya%22%20LLC!5e0!3m2!1s{locale}!2s!4v1779561905690!5m2!1s{locale}!2s";

const copy = {
  en: {
    metaTitle: "Yashil Energiya links",
    metaDescription:
      "Official links, EV charging app, email and office location of Yashil Energiya.",
    eyebrow: "Official links",
    title: "Yashil Energiya",
    subtitle:
      "Quick access to our website, EV charging app, email and office location.",
    website: "Official website",
    websiteText: "News, projects and company information",
    app: "EV charging app",
    appText: "Find stations and start charging",
    email: "Contact email",
    emailText: email,
    map: "Office on Google Maps",
    mapText: "Open the interactive map",
    routeAppsTitle: "Open route in",
    yandexMaps: "Yandex Maps",
    twoGis: "2GIS",
    locationTitle: "Our office",
    locationText: "Tashkent, Yunusabad district, Bodomzor street, 2B",
    mapTitle: "Yashil Energiya office location in Tashkent",
  },
  ru: {
    metaTitle: "Ссылки Yashil Energiya",
    metaDescription:
      "Официальные ссылки, приложение для зарядных станций, почта и локация офиса Yashil Energiya.",
    eyebrow: "Официальные ссылки",
    title: "Yashil Energiya",
    subtitle:
      "Быстрый доступ к сайту, приложению зарядных станций, почте и локации офиса.",
    website: "Официальный сайт",
    websiteText: "Новости, проекты и информация о компании",
    app: "Приложение зарядных станций",
    appText: "Найдите станцию и начните зарядку",
    email: "Электронная почта",
    emailText: email,
    map: "Офис на Google Maps",
    mapText: "Открыть интерактивную карту",
    routeAppsTitle: "Открыть маршрут в",
    yandexMaps: "Яндекс Картах",
    twoGis: "2GIS",
    locationTitle: "Наш офис",
    locationText: "г. Ташкент, Юнусабадский район, ул. Бодомзор, 2B",
    mapTitle: "Локация офиса Yashil Energiya в Ташкенте",
  },
  uz: {
    metaTitle: "Yashil Energiya havolalari",
    metaDescription:
      "Yashil Energiya rasmiy havolalari, zaryadlash ilovasi, elektron pochta va ofis manzili.",
    eyebrow: "Rasmiy havolalar",
    title: "Yashil Energiya",
    subtitle:
      "Sayt, zaryadlash stansiyalari ilovasi, elektron pochta va ofis manziliga tezkor kirish.",
    website: "Rasmiy sayt",
    websiteText: "Yangiliklar, loyihalar va kompaniya haqida",
    app: "Zaryadlash ilovasi",
    appText: "Stansiyani toping va zaryadlashni boshlang",
    email: "Elektron pochta",
    emailText: email,
    map: "Google Mapsdagi ofis",
    mapText: "Interaktiv xaritani ochish",
    routeAppsTitle: "Yo'nalishni ochish",
    yandexMaps: "Yandex Maps",
    twoGis: "2GIS",
    locationTitle: "Bizning ofis",
    locationText: "Toshkent shahri, Yunusobod tumani, Bodomzor ko'chasi, 2B",
    mapTitle: "Yashil Energiya ofisining Toshkentdagi joylashuvi",
  },
} satisfies Record<Locale, Record<string, string>>;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = copy[locale] ?? copy.en;

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
  };
}

export default async function TaplinkPage({ params }: Props) {
  const { locale } = await params;
  const t = copy[locale] ?? copy.en;
  const mapLocale = locale === "uz" ? "uz" : locale;
  const links = [
    {
      href: websiteUrl,
      title: t.website,
      text: t.websiteText,
      icon: Globe2,
    },
    {
      href: appUrl,
      title: t.app,
      text: t.appText,
      icon: AppWindow,
    },
    {
      href: emailUrl,
      title: t.email,
      text: t.emailText,
      icon: Mail,
    },
    {
      href: mapsUrl,
      title: t.map,
      text: t.mapText,
      icon: MapPinned,
    },
  ];
  const routeApps = [
    {
      href: yandexRouteUrl,
      title: t.yandexMaps,
    },
    {
      href: twoGisRouteUrl,
      title: t.twoGis,
    },
  ];

  return (
    <section className={`${s.page} taplink-page`}>
      <div className={s.shell}>
        <div className={s.topBar}>
          <div className={s.topLogo}>
            <Image className={s.logo} src={Logo} alt="Yashil Energiya" priority />
          </div>
          <TaplinkLocaleSwitcher />
        </div>

        <div className={s.hero}>
          <p className={s.eyebrow}>{t.eyebrow}</p>
          <h1>{t.title}</h1>
          <p className={s.subtitle}>{t.subtitle}</p>
        </div>

        <div className={s.content}>
          <div className={s.links}>
            {links.map(({ href, title, text, icon: Icon }) => (
              <a className={s.linkCard} href={href} key={href} target="_blank">
                <span className={s.icon}>
                  <Icon aria-hidden="true" size={24} strokeWidth={2.2} />
                </span>
                <span className={s.linkText}>
                  <strong>{title}</strong>
                  <span>{text}</span>
                </span>
              </a>
            ))}
          </div>

          <div className={s.mapPanel}>
            <div className={s.mapHeader}>
              <div>
                <h2>{t.locationTitle}</h2>
                <p>{t.locationText}</p>
              </div>
            </div>
            <iframe
              className={s.map}
              src={mapSrc.replaceAll("{locale}", mapLocale)}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title={t.mapTitle}
            />
            <div className={s.routeApps}>
              <p>{t.routeAppsTitle}</p>
              <div>
                {routeApps.map(({ href, title }) => (
                  <a href={href} target="_blank" key={href}>
                    <Navigation aria-hidden="true" size={18} />
                    <span>{title}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
