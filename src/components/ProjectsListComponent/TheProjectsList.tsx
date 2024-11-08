import "@/scss/globals.scss";
import styles from "./page.module.scss";
// import Link from "next/link";
import { Link } from "@/src/i18n/routing";
import projects from "@/data/projects.json";
import TheCover from "../CoverComponent/TheCover";
import { useTranslations } from "next-intl";

export const TheProjectsList = ({ begin, end }: ProjectProps) => {
  const t = useTranslations("TheLastProjects");
  const {
    data: { list },
  } = projects;
  const projectsSlice = list.slice(begin, end);

  return (
    <ul className={styles.projects}>
      {projectsSlice.map(
        ({ plantCode, plantName, plantAddress, imgUrl }: any) => (
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
                href={`/projects/${plantCode}`}
              >
                {t("link")}
              </Link>
            </div>
          </li>
        )
      )}
    </ul>
  );
};
