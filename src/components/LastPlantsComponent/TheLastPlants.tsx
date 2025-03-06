import "@/scss/globals.scss";
import styles from "./TheLastPlants.module.scss";
import { Link } from "@/src/i18n/routing";
import { useTranslations } from "next-intl";
import { ThePlantsList } from "../PlantsListComponent/ThePlantsList";
import { TheMotionWrapper } from "../MotionWrapper/TheMotionWrapper";

export const TheLastPlants = () => {
  const t = useTranslations("TheLastPlants");

  return (
    <TheMotionWrapper>
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
      <ThePlantsList begin={0} end={4} />
    </TheMotionWrapper>
  );
};
