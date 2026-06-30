import type { Metadata } from "next";

export const siteUrl = "https://yashil-energiya.uz";
export const siteName = "Yashil Energiya";
export const defaultOgImage = "/og-image.jpg";
export const supportedLocales = ["en", "ru", "uz"] as const;
export const cmsContentLocales = ["en", "ru"] as const;

export type SeoLocale = (typeof supportedLocales)[number];

export type StaticSeoKey =
  | "home"
  | "about"
  | "ceo"
  | "news"
  | "articles"
  | "procurements"
  | "procurement1"
  | "procurement2"
  | "solarpanels"
  | "microges"
  | "chargingstation"
  | "chargingstationPublicOffer"
  | "installationRequest"
  | "plants"
  | "branches"
  | "documents"
  | "contacts"
  | "vacancies";

type SeoCopy = {
  title: string;
  description: string;
};

export const staticSeo: Record<StaticSeoKey, Record<SeoLocale, SeoCopy>> = {
  home: {
    en: {
      title: "Yashil Energiya - Renewable Energy Solutions in Uzbekistan",
      description:
        "Yashil Energiya develops solar power plants, micro hydro projects and EV charging infrastructure for a cleaner energy future in Uzbekistan.",
    },
    ru: {
      title: "Yashil Energiya - возобновляемая энергетика Узбекистана",
      description:
        "Yashil Energiya развивает солнечные электростанции, микроГЭС и зарядную инфраструктуру для электромобилей в Узбекистане.",
    },
    uz: {
      title: "Yashil Energiya - O'zbekistonda qayta tiklanuvchi energiya",
      description:
        "Yashil Energiya O'zbekistonda quyosh elektr stansiyalari, mikro GES va elektromobil zaryadlash infratuzilmasini rivojlantiradi.",
    },
  },
  about: {
    en: {
      title: "About Yashil Energiya",
      description:
        "Learn about Yashil Energiya, its mission, renewable energy projects, milestones and contribution to Uzbekistan's green economy.",
    },
    ru: {
      title: "О компании Yashil Energiya",
      description:
        "Информация о Yashil Energiya: миссия, проекты возобновляемой энергетики, достижения и вклад в зеленую экономику Узбекистана.",
    },
    uz: {
      title: "Yashil Energiya kompaniyasi haqida",
      description:
        "Yashil Energiya missiyasi, qayta tiklanuvchi energiya loyihalari, yutuqlari va O'zbekiston yashil iqtisodiyotiga qo'shayotgan hissasi.",
    },
  },
  ceo: {
    en: {
      title: "Company Leadership",
      description: "Meet the leadership team of Yashil Energiya.",
    },
    ru: {
      title: "Руководство компании",
      description: "Руководство компании Yashil Energiya.",
    },
    uz: {
      title: "Kompaniya rahbariyati",
      description: "Yashil Energiya kompaniyasi rahbariyati.",
    },
  },
  news: {
    en: {
      title: "News",
      description:
        "Latest news, announcements and updates from Yashil Energiya on renewable energy projects and corporate activity.",
    },
    ru: {
      title: "Новости",
      description:
        "Последние новости, объявления и обновления Yashil Energiya о проектах возобновляемой энергетики и деятельности компании.",
    },
    uz: {
      title: "Yangiliklar",
      description:
        "Yashil Energiya kompaniyasining qayta tiklanuvchi energiya loyihalari va faoliyati bo'yicha so'nggi yangiliklari.",
    },
  },
  articles: {
    en: {
      title: "Articles",
      description:
        "Expert articles and insights from Yashil Energiya on renewable energy, green technologies and sustainable development.",
    },
    ru: {
      title: "Статьи",
      description:
        "Экспертные статьи Yashil Energiya о возобновляемой энергетике, зеленых технологиях и устойчивом развитии.",
    },
    uz: {
      title: "Maqolalar",
      description:
        "Yashil Energiya ekspert maqolalari: qayta tiklanuvchi energiya, yashil texnologiyalar va barqaror rivojlanish.",
    },
  },
  procurements: {
    en: {
      title: "Procurements",
      description:
        "Procurement announcements, tenders and commercial opportunities from Yashil Energiya.",
    },
    ru: {
      title: "Закупки",
      description:
        "Закупочные объявления, тендеры и коммерческие возможности от Yashil Energiya.",
    },
    uz: {
      title: "Xaridlar",
      description:
        "Yashil Energiya xarid e'lonlari, tenderlari va tijorat imkoniyatlari.",
    },
  },
  procurement1: {
    en: {
      title: "Procurement Details",
      description:
        "Detailed procurement information and tender documentation from Yashil Energiya.",
    },
    ru: {
      title: "Детали закупки",
      description:
        "Подробная информация о закупке и тендерная документация Yashil Energiya.",
    },
    uz: {
      title: "Xarid tafsilotlari",
      description:
        "Yashil Energiya xaridlari bo'yicha batafsil ma'lumot va tender hujjatlari.",
    },
  },
  procurement2: {
    en: {
      title: "Procurement Details",
      description:
        "Detailed procurement information and tender documentation from Yashil Energiya.",
    },
    ru: {
      title: "Детали закупки",
      description:
        "Подробная информация о закупке и тендерная документация Yashil Energiya.",
    },
    uz: {
      title: "Xarid tafsilotlari",
      description:
        "Yashil Energiya xaridlari bo'yicha batafsil ma'lumot va tender hujjatlari.",
    },
  },
  solarpanels: {
    en: {
      title: "Solar Power Plants",
      description:
        "Solar photovoltaic power plants by Yashil Energiya: clean electricity for social facilities, government buildings and communities.",
    },
    ru: {
      title: "Солнечные электростанции",
      description:
        "Солнечные фотоэлектрические станции Yashil Energiya для социальной сферы, государственных объектов и населенных пунктов.",
    },
    uz: {
      title: "Quyosh fotoelektr stansiyalari",
      description:
        "Yashil Energiya quyosh fotoelektr stansiyalari: ijtimoiy obyektlar, davlat binolari va hududlar uchun toza elektr energiyasi.",
    },
  },
  microges: {
    en: {
      title: "Micro Hydro Power Plants",
      description:
        "Micro hydro power projects by Yashil Energiya for stable, clean and local electricity generation in Uzbekistan.",
    },
    ru: {
      title: "Микро ГЭС",
      description:
        "Проекты микро ГЭС Yashil Energiya для стабильной, чистой и локальной выработки электроэнергии в Узбекистане.",
    },
    uz: {
      title: "Mikro GES",
      description:
        "Yashil Energiya mikro GES loyihalari O'zbekistonda barqaror, toza va mahalliy elektr energiyasini ishlab chiqarishga xizmat qiladi.",
    },
  },
  chargingstation: {
    en: {
      title: "EV Charging Stations",
      description:
        "EV charging station projects by Yashil Energiya supporting electric mobility and clean transport infrastructure in Uzbekistan.",
    },
    ru: {
      title: "Зарядные станции для электромобилей",
      description:
        "Проекты зарядных станций Yashil Energiya для развития электромобильности и чистой транспортной инфраструктуры Узбекистана.",
    },
    uz: {
      title: "Elektromobil zaryadlash stansiyalari",
      description:
        "Yashil Energiya elektromobil zaryadlash stansiyalari O'zbekistonda ekologik transport infratuzilmasini rivojlantiradi.",
    },
  },
  chargingstationPublicOffer: {
    en: {
      title: "Public Offer | Charging Stations | Yashil Energiya",
      description:
        "Public offer for the provision of electric vehicle charging services through the Yashil Energiya charging station network.",
    },
    ru: {
      title: "Публичная оферта | Charging Stations | Yashil Energiya",
      description:
        "Публичная оферта на оказание услуг по зарядке электрических транспортных средств через сеть зарядных станций Yashil Energiya.",
    },
    uz: {
      title: "Ommaviy oferta | Charging Stations | Yashil Energiya",
      description:
        "Yashil Energiya quvvatlash stansiyalari orqali elektr transport vositalarini quvvatlash xizmatlarini ko‘rsatish bo‘yicha ommaviy oferta.",
    },
  },
  installationRequest: {
    en: {
      title: "How to Become an Installation Site",
      description:
        "Application process, required documents and contacts for organizations that want to host a Yashil Energiya solar power installation.",
    },
    ru: {
      title: "Как стать объектом установки",
      description:
        "Порядок подачи заявки, необходимые документы и контакты для организаций, которые хотят разместить солнечную станцию Yashil Energiya.",
    },
    uz: {
      title: "O'rnatish obyektiga qanday aylanish mumkin",
      description:
        "Yashil Energiya quyosh stansiyasini joylashtirish uchun ariza tartibi, kerakli hujjatlar va kontaktlar.",
    },
  },
  plants: {
    en: {
      title: "PV Power Plant Portfolio",
      description:
        "Explore Yashil Energiya photovoltaic power plants, installed capacity, locations and environmental impact indicators.",
    },
    ru: {
      title: "Список солнечных электростанций",
      description:
        "Солнечные электростанции Yashil Energiya: мощности, адреса, показатели выработки и экологический эффект.",
    },
    uz: {
      title: "QFESlar ro'yxati",
      description:
        "Yashil Energiya quyosh fotoelektr stansiyalari: quvvat, manzil, ishlab chiqarish va ekologik samaradorlik ko'rsatkichlari.",
    },
  },
  branches: {
    en: {
      title: "Regional Service Centers",
      description:
        "Regional service centers of Yashil Energiya across Uzbekistan with contacts and local support information.",
    },
    ru: {
      title: "Региональные сервисные центры",
      description:
        "Региональные сервисные центры Yashil Energiya в Узбекистане: контакты и информация о поддержке.",
    },
    uz: {
      title: "Hududiy servis markazlari",
      description:
        "Yashil Energiya hududiy servis markazlari: O'zbekiston bo'ylab kontaktlar va xizmat ko'rsatish ma'lumotlari.",
    },
  },
  documents: {
    en: {
      title: "Documents",
      description:
        "Official documents, legal references and procurement files related to Yashil Energiya renewable energy activities.",
    },
    ru: {
      title: "Документы",
      description:
        "Официальные документы, нормативные ссылки и закупочные файлы по деятельности Yashil Energiya.",
    },
    uz: {
      title: "Hujjatlar",
      description:
        "Yashil Energiya faoliyatiga oid rasmiy hujjatlar, huquqiy asoslar va xarid fayllari.",
    },
  },
  contacts: {
    en: {
      title: "Contacts",
      description:
        "Contact Yashil Energiya: address in Tashkent, phone number, e-mail and department contacts.",
    },
    ru: {
      title: "Контакты",
      description:
        "Контакты Yashil Energiya: адрес в Ташкенте, телефон, электронная почта и контакты отделов.",
    },
    uz: {
      title: "Kontaktlar",
      description:
        "Yashil Energiya kontaktlari: Toshkentdagi manzil, telefon, elektron pochta va bo'limlar bilan aloqa.",
    },
  },
  vacancies: {
    en: {
      title: "Vacancies",
      description:
        "Open vacancies, requirements and career opportunities at Yashil Energiya.",
    },
    ru: {
      title: "Вакансии",
      description:
        "Открытые вакансии, требования и карьерные возможности в Yashil Energiya.",
    },
    uz: {
      title: "Bo'sh ish o'rinlari",
      description:
        "Yashil Energiya kompaniyasidagi ochiq vakansiyalar, talablar va karyera imkoniyatlari.",
    },
  },
};

export const staticRoutes: Record<StaticSeoKey, string> = {
  home: "/",
  about: "/about",
  ceo: "/ceo",
  news: "/news",
  articles: "/articles",
  procurements: "/procurements",
  procurement1: "/procurements/procurement1",
  procurement2: "/procurements/procurement2",
  solarpanels: "/solarpanels",
  microges: "/microges",
  chargingstation: "/chargingstation",
  chargingstationPublicOffer: "/chargingstation/public-offer",
  installationRequest: "/installation-request",
  plants: "/plants",
  branches: "/branches",
  documents: "/documents",
  contacts: "/contacts",
  vacancies: "/vacancies",
};

export function normalizeLocale(locale?: string): SeoLocale {
  return supportedLocales.includes(locale as SeoLocale)
    ? (locale as SeoLocale)
    : "en";
}

export function isLocaleIncluded(
  locale: SeoLocale,
  locales: readonly SeoLocale[],
) {
  return locales.includes(locale);
}

export function localizedPath(locale: string, path = "/") {
  const currentLocale = normalizeLocale(locale);
  const normalizedPath = path === "/" ? "" : path;
  return `/${currentLocale}${normalizedPath}`;
}

export function absoluteUrl(path = "/") {
  return new URL(path, siteUrl).toString();
}

const defaultOgCta: Record<SeoLocale, string> = {
  en: "Learn more",
  ru: "Подробнее",
  uz: "Batafsil",
};

export function optimizedOgImagePath(
  image?: string | null,
  options?: {
    title?: string;
    cta?: string;
  },
) {
  if (!image) {
    return defaultOgImage;
  }

  try {
    const imageUrl = new URL(image, siteUrl);

    if (
      imageUrl.hostname !== "us-west-2.graphassets.com" &&
      imageUrl.hostname !== new URL(siteUrl).hostname
    ) {
      return image;
    }

    const params = new URLSearchParams({
      src: imageUrl.toString(),
      v: "2",
    });

    if (options?.title) {
      params.set("title", truncateSeoText(options.title, 86));
    }

    if (options?.cta) {
      params.set("cta", options.cta);
    }

    return `/api/og-image?${params.toString()}`;
  } catch {
    return image;
  }
}

export function truncateSeoText(text: string, maxLength: number) {
  const normalizedText = text.replace(/\s+/g, " ").trim();

  if (normalizedText.length <= maxLength) {
    return normalizedText;
  }

  const suffix = "...";
  const limit = maxLength - suffix.length;
  const trimmed = normalizedText.slice(0, limit);
  const lastSpaceIndex = trimmed.lastIndexOf(" ");
  const safeText =
    lastSpaceIndex > Math.floor(limit * 0.6)
      ? trimmed.slice(0, lastSpaceIndex)
      : trimmed;

  return `${safeText.trim()}${suffix}`;
}

export function languageAlternates(
  path = "/",
  locales: readonly SeoLocale[] = supportedLocales,
) {
  return {
    ...Object.fromEntries(
      locales.map((locale) => [
        locale,
        absoluteUrl(localizedPath(locale, path)),
      ]),
    ),
    "x-default": absoluteUrl(localizedPath("en", path)),
  };
}

type MetadataOptions = {
  locale: string;
  path: string;
  title: string;
  description: string;
  image?: string | null;
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  alternateLocales?: readonly SeoLocale[];
};

export function createMetadata({
  locale,
  path,
  title,
  description,
  image = defaultOgImage,
  type = "website",
  publishedTime,
  modifiedTime,
  alternateLocales = supportedLocales,
}: MetadataOptions): Metadata {
  const currentLocale = normalizeLocale(locale);
  const shouldIndex = isLocaleIncluded(currentLocale, alternateLocales);
  const canonical = absoluteUrl(localizedPath(currentLocale, path));
  const sourceImage = image === defaultOgImage ? "/hero.png" : image;
  const metadataImage = sourceImage?.startsWith("/api/og-image")
    ? image
    : optimizedOgImagePath(sourceImage, {
        title,
        cta: defaultOgCta[currentLocale],
      });
  const images = metadataImage
    ? [
        {
          url: absoluteUrl(metadataImage),
          width: 1200,
          height: 630,
          alt: title,
        },
      ]
    : undefined;

  return {
    title,
    description,
    alternates: {
      canonical,
      languages: languageAlternates(path, alternateLocales),
    },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName,
      locale: currentLocale,
      type,
      images,
      publishedTime,
      modifiedTime,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: metadataImage ? [absoluteUrl(metadataImage)] : undefined,
    },
    robots: {
      index: shouldIndex,
      follow: true,
      googleBot: {
        index: shouldIndex,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
  };
}

export function createStaticMetadata(
  locale: string,
  key: StaticSeoKey,
): Metadata {
  const currentLocale = normalizeLocale(locale);
  const copy = staticSeo[key][currentLocale];
  const alternateLocales =
    key === "news" ||
    key === "articles" ||
    key === "plants" ||
    key === "vacancies"
      ? cmsContentLocales
      : supportedLocales;

  return createMetadata({
    locale: currentLocale,
    path: staticRoutes[key],
    title: copy.title,
    description: copy.description,
    alternateLocales,
  });
}

export function organizationJsonLd(locale: string) {
  const currentLocale = normalizeLocale(locale);
  const copy = staticSeo.home[currentLocale];

  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteName,
    url: siteUrl,
    logo: absoluteUrl("/logo_2.png"),
    description: copy.description,
    email: "info@yashil-energiya.uz",
    telephone: "+998555148844",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Bodomzor str. 2B, Yunusabad district",
      addressLocality: "Tashkent",
      addressCountry: "UZ",
    },
    sameAs: [
      "https://www.instagram.com/yashilenergiyauz?igsh=MXNuYjFjNmJncmU0Zw%3D%3D&utm_source=qr",
      "https://www.facebook.com/profile.php?id=61590344596892",
      "https://t.me/yashilenergiyauz",
      "https://www.linkedin.com/company/yashil-energiya/",
    ],
  };
}

export function websiteJsonLd(locale: string) {
  const currentLocale = normalizeLocale(locale);
  const copy = staticSeo.home[currentLocale];

  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteUrl}/#website`,
    name: siteName,
    url: siteUrl,
    inLanguage: currentLocale,
    description: copy.description,
    publisher: {
      "@id": `${siteUrl}/#organization`,
    },
  };
}

export function breadcrumbJsonLd(
  locale: string,
  items: { name: string; path: string }[],
) {
  const currentLocale = normalizeLocale(locale);

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: staticSeo.home[currentLocale].title,
        item: absoluteUrl(localizedPath(currentLocale, "/")),
      },
      ...items.map((item, index) => ({
        "@type": "ListItem",
        position: index + 2,
        name: item.name,
        item: absoluteUrl(localizedPath(currentLocale, item.path)),
      })),
    ],
  };
}

export function webPageJsonLd(locale: string, key: StaticSeoKey) {
  const currentLocale = normalizeLocale(locale);
  const copy = staticSeo[key][currentLocale];
  const path = staticRoutes[key];

  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${absoluteUrl(localizedPath(currentLocale, path))}#webpage`,
    url: absoluteUrl(localizedPath(currentLocale, path)),
    name: copy.title,
    description: copy.description,
    inLanguage: currentLocale,
    isPartOf: {
      "@id": `${siteUrl}/#website`,
    },
    publisher: {
      "@id": `${siteUrl}/#organization`,
    },
  };
}

export function staticPageJsonLd(locale: string, key: StaticSeoKey) {
  const currentLocale = normalizeLocale(locale);
  const copy = staticSeo[key][currentLocale];
  const path = staticRoutes[key];

  if (key === "home") {
    return [webPageJsonLd(currentLocale, key)];
  }

  return [
    webPageJsonLd(currentLocale, key),
    breadcrumbJsonLd(currentLocale, [{ name: copy.title, path }]),
  ];
}

type ArticleJsonLdOptions = {
  locale: string;
  path: string;
  title: string;
  description: string;
  image?: string | null;
  publishedTime?: string;
  modifiedTime?: string;
  schemaType?: "Article" | "NewsArticle";
  section?: string;
};

export function articleJsonLd({
  locale,
  path,
  title,
  description,
  image,
  publishedTime,
  modifiedTime,
  schemaType = "Article",
  section,
}: ArticleJsonLdOptions) {
  const currentLocale = normalizeLocale(locale);
  const canonical = absoluteUrl(localizedPath(currentLocale, path));

  return {
    "@context": "https://schema.org",
    "@type": schemaType,
    "@id": `${canonical}#article`,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": canonical,
    },
    headline: title,
    description,
    image: image ? [absoluteUrl(image)] : [absoluteUrl(defaultOgImage)],
    datePublished: publishedTime,
    dateModified: modifiedTime || publishedTime,
    articleSection: section,
    inLanguage: currentLocale,
    author: {
      "@type": "Organization",
      name: siteName,
      url: siteUrl,
    },
    publisher: {
      "@id": `${siteUrl}/#organization`,
    },
  };
}

export function itemListJsonLd<T>(
  locale: string,
  path: string,
  items: T[],
  getItem: (item: T, index: number) => { name: string; url: string },
) {
  const currentLocale = normalizeLocale(locale);

  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    url: absoluteUrl(localizedPath(currentLocale, path)),
    numberOfItems: items.length,
    itemListElement: items.map((item, index) => {
      const listItem = getItem(item, index);

      return {
        "@type": "ListItem",
        position: index + 1,
        name: listItem.name,
        url: listItem.url,
      };
    }),
  };
}

export function powerPlantJsonLd({
  locale,
  id,
  title,
  address,
  image,
  power,
}: {
  locale: string;
  id: string;
  title: string;
  address: string;
  image?: string | null;
  power?: string;
}) {
  const currentLocale = normalizeLocale(locale);
  const canonical = absoluteUrl(localizedPath(currentLocale, `/plants/${id}`));

  return {
    "@context": "https://schema.org",
    "@type": "Place",
    "@id": `${canonical}#place`,
    name: title,
    url: canonical,
    image: image ? absoluteUrl(image) : absoluteUrl("/hero.png"),
    description: power ? `${title}. Power: ${power}` : title,
    address: {
      "@type": "PostalAddress",
      streetAddress: address,
      addressCountry: "UZ",
    },
  };
}

export function contactPageJsonLd(locale: string) {
  const currentLocale = normalizeLocale(locale);

  return [
    ...staticPageJsonLd(currentLocale, "contacts"),
    {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "@id": `${siteUrl}/#localbusiness`,
      name: siteName,
      url: siteUrl,
      image: absoluteUrl("/logo_2.png"),
      telephone: "+998555148844",
      email: "info@yashil-energiya.uz",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Bodomzor str. 2B, Yunusabad district",
        addressLocality: "Tashkent",
        addressCountry: "UZ",
      },
    },
  ];
}
