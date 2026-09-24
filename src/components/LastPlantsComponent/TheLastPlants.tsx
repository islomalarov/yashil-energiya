
import styles from "./TheLastPlants.module.scss";
import { Link } from "@/i18n/navigation";
import { ThePlantsList } from "../PlantsListComponent/ThePlantsList";
import { TheMotionWrapper } from "../MotionWrapper/TheMotionWrapper";
import { getLocale, getTranslations } from "next-intl/server";
import { PlantService } from "services/plants.service";
import { loadWithFallback } from "@/lib/cms-locale";
import type { Locale } from "next-intl";

export const TheLastPlants = async () => {
  const t = await getTranslations("TheLastPlants");
  const locale = await getLocale();
  const { data: lastPlants, contentLocale } = await loadWithFallback(
    locale,
    PlantService.getLastPlants,
    (items) => items.length === 0,
  );

  return (
    <TheMotionWrapper motionKey="last-plants">
      <div className={styles.header}>
        <h3 className="title">{t("title")}</h3>
        <Link href="/plants" className={styles.link}>
          {t("linkTitle")}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="9"
            height="14"
            viewBox="0 0 9 14"
            fill="none"
          >
            <path
              d="M1 13L7.0251 7L1 1"
              stroke="#12903E"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Link>
      </div>
      <ThePlantsList
        plants={lastPlants}
        contentLocale={contentLocale as Locale}
      />
    </TheMotionWrapper>
  );
};
