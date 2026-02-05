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

const sofia = Sofia_Sans({
  subsets: ["latin"],
  weight: ["100", "400", "700"],
});

export const metadata: Metadata = {
  title: "Yashil Energiya — powering the green economy",
  description:
    "Yashil Energiya is a platform dedicated to promoting a sustainable future through solar, wind, and other renewable energy sources. Discover the latest news, projects, insights, and technologies",
  keywords:
    "yashil energiya, muqobil energiya, quyosh energiyasi, zaryadlash stansiyasi, quyosh panellari, invertor, mikroges, quyosh stansiyasi, quyosh elektr stansiyasi, fotoelektr stansiya, barqaror rivojlanish, ekologik texnologiyalar, energiya samaradorligi, qayta tiklanuvchi energiya, Yashil-energiya.uz, зелёная энергия, альтернативная энергетика, солнечная энергия, зарядная станция, солнечные панели, инвертор, микро-ГЭС, солнечная станция, солнечная электростанция, фотоэлектрическая станция, устойчивое развитие, экологические технологии, энергоэффективность, возобновляемые источники энергии,",
  icons: "/logo_cut.svg",
};

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: Locale }>;
};

export default async function RootLayout({ children, params }: Props) {
  // Providing all messages to the client
  // side is the easiest way to get started
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
    <html lang={locale}>
      <body className={sofia.className}>
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
