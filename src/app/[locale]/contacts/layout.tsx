import type { Metadata } from "next";
import { contactPageJsonLd, createStaticMetadata } from "@/lib/seo";
import { TheJsonLd } from "@/components/JsonLd/TheJsonLd";

export const revalidate = 3600;

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
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  return (
    <>
      <ContactsJsonLd params={params} />
      {children}
    </>
  );
}

async function ContactsJsonLd({ params }: MetadataProps) {
  const { locale } = await params;

  return <TheJsonLd data={contactPageJsonLd(locale)} />;
}
