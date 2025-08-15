import "@/scss/globals.scss";
import s from "./ThePlantsList.module.scss";
import { Link } from "@/src/i18n/navigation";
import cn from "classnames";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Plant } from "@/services/plants.service";

type PlantsListProps = {
  plants: Plant[];
};

export const ThePlantsList = ({ plants }: PlantsListProps) => {
  const t = useTranslations("TheLastPlants");

  return (
    <ul className={s.projects}>
      {plants.map((plant) => (
        <li key={plant.id} className={s.project}>
          <div className={s.coverWrapper}>
            <div className={s.cover}>
              <p>{plant.power}</p>
            </div>
            <Image
              className={s.coverImage}
              src={plant.pictures[0]?.url}
              alt={plant.title}
              width={1280}
              height={720}
            />
          </div>
          <div className={s.info}>
            <h3 className={s.projectTitle}>{plant.title}</h3>
            <p>{plant.address}</p>
            <Link className={cn(s.link, "link")} href={`/plants/${plant.id}`}>
              {t("link")}
            </Link>
          </div>
        </li>
      ))}
    </ul>
  );
};
