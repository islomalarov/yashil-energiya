import "leaflet/dist/leaflet.css";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";
import "@/scss/globals.scss";
import type { Metadata } from "next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";
import { Sofia_Sans } from "next/font/google";
import { TheHeader } from "@/components/HeaderComponent/TheHeader";
import { TheFooter } from "@/components/FooterComponent/TheFooter";
import { NextIntlClientProvider, Locale, hasLocale } from "next-intl";
import ScrollToTopButton from "@/components/ui/ScrollButton/ScrollToTopButton";
import { routing } from "@/i18n/routing";
import { notFound } from "next/navigation";
import {
  createStaticMetadata,
  organizationJsonLd,
  siteUrl,
} from "@/lib/seo";

const sofia = Sofia_Sans({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "700"],
  display: "swap",
});

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: Locale }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const metadata = createStaticMetadata(locale, "home");

  return {
    ...metadata,
    metadataBase: new URL(siteUrl),
    title: {
      default: String(metadata.title),
      template: "%s | Yashil Energiya",
    },
    applicationName: "Yashil Energiya",
    generator: "Next.js",
    keywords: [
      "Yashil Energiya",
      "renewable energy Uzbekistan",
      "solar power plants",
      "micro hydro power",
      "EV charging stations",
      "qayta tiklanuvchi energiya",
      "quyosh energiyasi",
      "зелёная энергетика",
      "солнечные электростанции",
    ],
    icons: {
      icon: "/logo_cut.svg",
      shortcut: "/favicon.ico",
      apple: "/logo_2.png",
    },
  };
}

export default async function RootLayout({ children, params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
    <html lang={locale}>
      <body className={sofia.className}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd(locale)),
          }}
        />
        <div className="wrapper">
          <NextIntlClientProvider>
            <TheHeader />
            <main className="main">
              {children}
              <ScrollToTopButton />
            </main>
            <TheFooter />
          </NextIntlClientProvider>
        </div>
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
