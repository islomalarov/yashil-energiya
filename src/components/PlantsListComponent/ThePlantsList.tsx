import "@/scss/globals.scss";
import s from "./ThePlantsList.module.scss";
import { Link } from "@/src/i18n/navigation";
import { useTranslations } from "next-intl";
import TheCover from "../CoverComponent/TheCover";
import { plants } from "@/data/plants";

export const ThePlantsList = ({ begin, end }: ProjectProps) => {
  const t = useTranslations("TheLastPlants");

  return (
    <ul className={s.projects}>
      {plants
        .slice(begin, end)
        .map(({ plantCode, plantName, plantAddress }) => (
          <li className={s.project} key={plantCode}>
            <TheCover
              elem={{
                url: `/plants/${plantCode}/photo-1.jpg`,
                fileName: plantName,
                width: 1280,
                height: 720,
              }}
            />
            <div className={s.info}>
              <h3 className={s.projectTitle}>{plantName}</h3>
              <p>{plantAddress}</p>
              <Link className={`${s.link} link`} href={`/plants/${plantCode}`}>
                {t("link")}
              </Link>
            </div>
          </li>
        ))}
    </ul>
  );
};
