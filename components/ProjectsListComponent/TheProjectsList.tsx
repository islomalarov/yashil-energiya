import Link from "next/link";
import styles from "./page.module.scss";
import "../../scss/globals.scss";
async function getProjects() {
  const res = await fetch("https://jsonplaceholder.typicode.com/photos");
  return res.json();
}
export default async function TheProjectsList(props: {
  begin: number;
  end: number;
}) {
  const projects1 = await getProjects();
  const projects = projects1.slice(props.begin, props.end);
  return (
    <ul className={styles.projects}>
      {projects.map((project: any) => (
        <li className={styles.project} key={project.id}>
          <img src={project.url} alt="" />
          <div className={styles.info}>
            <h3>{project.title}</h3>
            <p>
              Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
              labore et dolore magna aliqua
            </p>
            <Link className="link" href={`/projects/${project.id}`}>
              Подробнее
            </Link>
          </div>
        </li>
      ))}
    </ul>
  );
}
