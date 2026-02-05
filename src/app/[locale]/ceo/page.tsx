
import { TheHero } from "@/components/HeroComponent/TheHero";
import { TheFeedback } from "@/components/FeedbackComponent/TheFeedback";
import { TheCeo } from "@/components/CeoComponent/TheCeo";
import { useTranslations } from "next-intl";

export default function Ceo() {
  const t = useTranslations("AboutPage");
  return (
    <>
      <TheHero
        title1={t("heroTitle1")}
        url1="about"
        title2={t("heroTitle2")}
        url2="ceo"
      />
      <div className="container">
        <TheCeo />
      </div>
      <TheFeedback />
    </>
  );
}
