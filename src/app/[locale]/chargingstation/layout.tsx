import "leaflet/dist/leaflet.css";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { createStaticMetadata, staticPageJsonLd } from "@/lib/seo";
import { TheJsonLd } from "@/components/JsonLd/TheJsonLd";
import type { ContentSection } from "@/components/ContentSectionsComponent/TheContentSections";

async function faqPageJsonLd(locale: string) {
  const t = await getTranslations({
    locale,
    namespace: "ChargingStationPage",
  });

  const sections = t.raw("seoSections") as ContentSection[];
  const faq = sections.find((section) => section.id === "faq");
  const questions = (faq?.body ?? []).flatMap((node) =>
    node.type === "qa"
      ? [
          {
            "@type": "Question",
            name: node.q,
            acceptedAnswer: { "@type": "Answer", text: node.a },
          },
        ]
      : [],
  );

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: questions,
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
