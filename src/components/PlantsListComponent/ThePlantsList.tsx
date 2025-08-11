import "@/scss/globals.scss";
import s from "./ThePlantsList.module.scss";
import { Link } from "@/src/i18n/navigation";
import cn from "classnames";
import Image from "next/image";
import { PlantService } from "@/services/plants.service";
import { getLocale, getTranslations } from "next-intl/server";
interface ProjectProps {
  begin?: number;
  end?: number;
}
export const ThePlantsList = async ({ begin, end }: ProjectProps) => {
  const locale = await getLocale();
  const t = await getTranslations("TheLastPlants");
  const plants = await PlantService.getAllPlants(locale);

  return (
    <ul className={s.projects}>
      {plants.slice(begin, end).map((plant) => (
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
