import "@/scss/globals.scss";
import s from "./ThePlantsList.module.scss";
import { Link } from "@/src/i18n/navigation";
import { useTranslations } from "next-intl";
import { plants } from "@/data/plants";
import cn from "classnames";
import Image from "next/image";

export const ThePlantsList = ({ begin, end }: ProjectProps) => {
  return (
    <ul className={s.projects}>
      {plants.slice(begin, end).map((plant) => (
        <PlantItem key={plant.plantCode} plant={plant} />
      ))}
    </ul>
  );
};

type PlantItemProps = {
  plant: {
    plantCode: string;
    plantName: string;
    plantAddress: string;
    plantPower: string;
  };
};

export const PlantItem = ({ plant }: PlantItemProps) => {
  const { plantCode, plantName, plantAddress, plantPower } = plant;
  const t = useTranslations("TheLastPlants");

  return (
    <li className={s.project}>
      <div className={s.coverWrapper}>
        <div className={s.cover}>
          <p>{plantPower} kW</p>
        </div>
        <Image
          className={s.coverImage}
          src={`/plants/${plantCode}/photo-1.jpg`}
          alt={plantName}
          width={1280}
          height={720}
        />
      </div>

      <div className={s.info}>
        <h3 className={s.projectTitle}>{plantName}</h3>
        <p>{plantAddress}</p>

        <Link className={cn(s.link, "link")} href={`/plants/${plantCode}`}>
          {t("link")}
        </Link>
      </div>
    </li>
  );
};
