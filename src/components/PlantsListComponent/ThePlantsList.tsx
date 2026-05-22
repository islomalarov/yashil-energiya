
import s from "./ThePlantsList.module.scss";
import { Link } from "@/i18n/navigation";
import cn from "classnames";
import Image from "next/image";
import { Plant } from "services/plants.service";

type PlantsListProps = {
  plants: Plant[];
  linkLabel: string;
};

export const ThePlantsList = ({ plants, linkLabel }: PlantsListProps) => {
  return (
    <ul className={s.projects}>
      {plants.map((plant) => {
        const cover = plant.pictures[0];
        const altText = `${plant.title}, ${plant.address}`;

        return (
          <li key={plant.id} className={s.project}>
            <div className={s.coverWrapper}>
              <div className={s.cover}>
                <p>{plant.power}</p>
              </div>
              <Image
                className={s.coverImage}
                src={cover?.url}
                alt={altText}
                width={cover?.width || 1280}
                height={cover?.height || 720}
              />
            </div>
            <div className={s.info}>
              <h3 className={s.projectTitle}>{plant.title}</h3>
              <p>{plant.address}</p>
              <Link className={cn(s.link, "link")} href={`/plants/${plant.id}`}>
                {linkLabel}
              </Link>
            </div>
          </li>
        );
      })}
    </ul>
  );
};
