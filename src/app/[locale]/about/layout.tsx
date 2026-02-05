import "@/scss/globals.scss";

interface MetadataProps {
  params: { locale?: string };
}
const SUPPORTED_LOCALES = ["en", "ru", "uz"] as const;
type SupportedLocale = (typeof SUPPORTED_LOCALES)[number];

export const generateMetadata = async ({ params }: MetadataProps) => {
  // const { AboutPage } = await import(`messages/${params.locale}.json`);
  // <-- 2) нормализуй locale
  const locale = (SUPPORTED_LOCALES.includes(params.locale as any)
    ? params.locale
    : "en") as SupportedLocale;

  // <-- 3) импорт уже безопасный
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
