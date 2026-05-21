import type { Metadata } from "next";
import { createStaticMetadata } from "@/lib/seo";

type MetadataProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: MetadataProps): Promise<Metadata> {
  const { locale } = await params;

  return createStaticMetadata(locale, "plants");
}

export default function PlantsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
