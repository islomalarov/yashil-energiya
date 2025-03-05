import "@/scss/globals.scss";
import { TheHero } from "@/src/components/HeroComponent/TheHero";
import { TheFeedback } from "@/src/components/FeedbackComponent/TheFeedback";
import styles from "./page.module.scss";
import { useTranslations } from "next-intl";

export default function SolarPanels() {
  const t = useTranslations("SolarPanelsPage");
  const systems = ["system1", "system2", "system3"] as const;

  return (
    <>
      <TheHero title1={t("heroTitle")} url1="solarPanels" />
      <div className="container">
        <div className="">
          <p className="description">{t("content")}</p>
          <br />
          {systems.map((system) => (
            <p className="description" key={system}>
              <b>{t(`${system}.title`)}</b> - {t(`${system}.description`)}
            </p>
          ))}
        </div>
      </div>
      <TheFeedback />
    </>
  );
}
