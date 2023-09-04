import { TheHero } from "@/components/HeroComponent/TheHero";
import "../../scss/globals.scss";
import Link from "next/link";
import styles from "./page.module.scss";

async function getData() {
  const res = await fetch("https://jsonplaceholder.typicode.com/photos");
  return res.json();
}
export default async function Projects() {
  const projects = await getData();
  return (
    <>
      <TheHero title="Проекты" />
      <div className="container">
        <h1>Projects page</h1>
        <ul>
          {projects.map((project: any) => (
            <li key={project.id}>
              <Link className={styles.anchor} href={`/projects/${project.id}`}>
                {project.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
