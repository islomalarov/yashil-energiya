
import { TheHero } from "@/components/HeroComponent/TheHero";
import { TheFeedback } from "@/components/FeedbackComponent/TheFeedback";
import { TheCeo } from "@/components/CeoComponent/TheCeo";
import { getLocale, getTranslations } from "next-intl/server";
import { redirect } from "@/i18n/navigation";

export default async function Ceo() {
  const locale = await getLocale();
  if (locale === "uz") {
    redirect({ href: "/ceo", locale: "en" });
  }

  const t = await getTranslations("AboutPage");
  return (
    <>
      <TheHero
        title1={t("heroTitle1")}
        url1="about"
        title2={t("heroTitle2")}
        url2="ceo"
        activeUrl="ceo"
      />
      <div className="container">
        <TheCeo />
      </div>
      <TheFeedback />
    </>
  );
}
