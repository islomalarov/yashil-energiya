import type { Metadata } from "next";
import { createStaticMetadata } from "@/lib/seo";

type MetadataProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: MetadataProps): Promise<Metadata> {
  const { locale } = await params;

  return createStaticMetadata(locale, "contacts");
}

export default function ContactsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
