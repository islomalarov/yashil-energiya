import "@/scss/globals.scss";
import type { Metadata } from "next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";
import { Sofia_Sans } from "next/font/google";
import { TheHeader } from "@/src/components/HeaderComponent/TheHeader";
import { TheFooter } from "@/src/components/FooterComponent/TheFooter";
import Providers from "@/src/components/ProgressBarProviderComponent/ProgressBarProvider";
import { NextIntlClientProvider, Locale, hasLocale } from "next-intl";
import ScrollToTopButton from "@/src/components/ui/ScrollButton/ScrollToTopButton";
import { routing } from "@/src/i18n/routing";
import { notFound } from "next/navigation";

const sofia = Sofia_Sans({
  subsets: ["latin"],
  weight: ["100", "400", "700"],
});

export const metadata: Metadata = {
  title: "Yashil Energiya - yashil iqtisodiyot dvigateli",
  description:
    "Quyosh, shamol va boshqa muqobil energiya manbalari orqali barqaror kelajakni ta'minlashga bag‘ishlangan platforma. Ekologik toza texnologiyalar, yangiliklar va maslahatlar bilan tanishing.",
  keywords:
    "yashil energiya, muqobil energiya, quyosh energiyasi, zaryadlash stansiyasi, quyosh panellari, invertor, mikroges, quyosh stansiyasi, quyosh elektr stansiyasi, fotoelektr stansiya, barqaror rivojlanish, ekologik texnologiyalar, energiya samaradorligi, qayta tiklanuvchi energiya, Yashil-energiya.uz",
  icons: "logo_cut.svg",
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
              <Providers>
                {children}
                <ScrollToTopButton />
              </Providers>
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
