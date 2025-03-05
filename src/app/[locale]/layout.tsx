import "@/scss/globals.scss";
import type { Metadata } from "next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";
import { Roboto } from "next/font/google";
import { TheHeader } from "@/src/components/HeaderComponent/TheHeader";
import { TheFooter } from "@/src/components/FooterComponent/TheFooter";
import Providers from "@/src/components/ProgressBarProviderComponent/ProgressBarProvider";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import ScrollToTopButton from "@/src/components/ui/ScrollButton/ScrollToTopButton";

const roboto = Roboto({
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

export default async function RootLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body className={roboto.className}>
        <div className="wrapper">
          <NextIntlClientProvider messages={messages}>
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
