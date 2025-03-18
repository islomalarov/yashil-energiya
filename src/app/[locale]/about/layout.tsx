import "@/scss/globals.scss";

interface MetadataProps {
  params: { locale: string };
}

export const generateMetadata = async ({ params }: MetadataProps) => {
  const { AboutPage } = await import(`@/messages/${params.locale}.json`);
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
