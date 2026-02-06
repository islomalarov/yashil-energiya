

interface MetadataProps {
  params: { locale?: string };
}
const SUPPORTED_LOCALES = ["en", "ru", "uz"] as const;
type SupportedLocale = (typeof SUPPORTED_LOCALES)[number];

function isSupportedLocale(locale: string): locale is SupportedLocale {
  return SUPPORTED_LOCALES.includes(locale as SupportedLocale);
}

export const generateMetadata = async ({ params }: MetadataProps) => {
  const locale: SupportedLocale =
    params.locale && isSupportedLocale(params.locale)
      ? params.locale
      : "en";

  const { AboutPage } = await import(`messages/${locale}.json`);

  return {
    title: AboutPage.heroTitle1,
    description: AboutPage.content,
  };
};
export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div>{children}</div>;
}
