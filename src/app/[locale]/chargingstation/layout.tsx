import "leaflet/dist/leaflet.css";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { createStaticMetadata, staticPageJsonLd } from "@/lib/seo";
import { TheJsonLd } from "@/components/JsonLd/TheJsonLd";

const faqKeys = ["q1", "q2", "q3", "q4", "q5", "q6"] as const;

async function faqPageJsonLd(locale: string) {
  const t = await getTranslations({
    locale,
    namespace: "ChargingStationPage",
  });

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqKeys.map((key) => ({
      "@type": "Question",
      name: t(`faq.${key}.question`),
      acceptedAnswer: {
        "@type": "Answer",
        text: t(`faq.${key}.answer`),
      },
    })),
  };
}

type MetadataProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: MetadataProps): Promise<Metadata> {
  const { locale } = await params;

  return createStaticMetadata(locale, "chargingstation");
}

export default function ChargingStationLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  return (
    <>
      <StaticJsonLd params={params} />
      {children}
    </>
  );
}

async function StaticJsonLd({ params }: MetadataProps) {
  const { locale } = await params;

  return (
    <>
      <TheJsonLd data={staticPageJsonLd(locale, "chargingstation")} />
      <TheJsonLd data={await faqPageJsonLd(locale)} />
    </>
  );
}
