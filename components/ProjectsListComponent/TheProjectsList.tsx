import "../../scss/globals.scss";
import styles from "./page.module.scss";
import Link from "next/link";
import projects from "../../data/projects.json";
import Image from "next/image";

export const TheProjectsList = ({ begin, end }: ProjectProps) => {
  const {
    data: { list },
  } = projects;
  const projectsSlice = list.slice(begin, end);

  return (
    <ul className={styles.projects}>
      {projectsSlice.map(
        ({ plantCode, plantName, plantAddress, imgUrl }: any) => (
          <li className={styles.project} key={plantCode}>
            <Image
              width={400}
              height={400}
              src={imgUrl}
              alt={imgUrl}
              style={{
                display: "flex",
                width: "100%",
                height: "auto",
                objectFit: "cover",
              }}
            />
            <div className={styles.info}>
              <h3 className={styles.projectTitle}>{plantName}</h3>
              <p>{plantAddress}</p>
              <Link
                className={`${styles.link} link`}
                href={`/projects/${plantCode}`}
              >
                Batafsil
              </Link>
            </div>
          </li>
        )
      )}
    </ul>
  );
};
