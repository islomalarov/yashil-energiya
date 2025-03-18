import "@/scss/globals.scss";
import styles from "./page.module.scss";
import { Link } from "@/src/i18n/routing";
import projects from "@/data/projects.json";
import { useTranslations } from "next-intl";
import TheCover from "../CoverComponent/TheCover";

export const ThePlantsList = ({ begin, end }: ProjectProps) => {
  const t = useTranslations("TheLastPlants");
  const {
    data: { list },
  } = projects;
  const projectsSlice = list.slice(begin, end);

  return (
    <ul className={styles.projects}>
      {projectsSlice.map(({ plantCode, plantName, plantAddress, imgUrl }) => (
        <li className={styles.project} key={plantCode}>
          <TheCover
            elem={{
              url: imgUrl,
              fileName: plantName,
              width: 1280,
              height: 720,
            }}
          />
          <div className={styles.info}>
            <h3 className={styles.projectTitle}>{plantName}</h3>
            <p>{plantAddress}</p>
            <Link
              className={`${styles.link} link`}
              href={`/plants/${plantCode}`}
            >
              {t("link")}
            </Link>
          </div>
        </li>
      ))}
    </ul>
  );
};
