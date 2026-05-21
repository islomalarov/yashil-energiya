import type { Metadata } from "next";
import { createStaticMetadata, staticPageJsonLd } from "@/lib/seo";
import { TheJsonLd } from "@/components/JsonLd/TheJsonLd";

type MetadataProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: MetadataProps): Promise<Metadata> {
  const { locale } = await params;

  return createStaticMetadata(locale, "solarpanels");
}

export default function SolarPanelsLayout({
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

  return <TheJsonLd data={staticPageJsonLd(locale, "solarpanels")} />;
}
