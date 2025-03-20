import "@/scss/globals.scss";
import styles from "./page.module.scss";
import Image from "next/image";
import projects from "@/data/projects.json";
import { TheHero } from "@/src/components/HeroComponent/TheHero";
import { TheFeedback } from "@/src/components/FeedbackComponent/TheFeedback";
import { getDate } from "@/my/date/getDate";
import { useTranslations } from "next-intl";
import { MapPin } from "lucide-react";

type Props = {
  params: {
    id: string;
  };
};

export default function Plant({ params: { id } }: Props) {
  const t = useTranslations("TheLastPlants");
  const { list } = projects;
  const plant = list.find(({ plantCode }) => plantCode === id);

  return (
    <>
      <TheHero title1={t("heroTitle")} url1="projects" />
      <div className="container">
        <div className={styles.content}>
          <h2 className={styles.title}>{plant?.plantName}</h2>
          <div className={styles.addressBlock}>
            <MapPin />
            <p>{plant?.plantAddress}</p>
          </div>
          {plant && <p>{getDate(plant.gridConnectionDate)}</p>}
          <div className={styles.imgBlock}>
            <Image
              width={1280}
              height={720}
              src={plant?.imgUrl || "/default-image.jpg"}
              alt={plant?.imgUrl || "Default image description"}
              className={styles.imgClass}
            />
          </div>
        </div>
      </div>
      <TheFeedback />
    </>
  );
}
