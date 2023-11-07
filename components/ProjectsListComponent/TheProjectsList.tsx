import Link from "next/link";
import styles from "./page.module.scss";
import "../../scss/globals.scss";
import projects from "../../data/projects.json";
// async function getProjects() {
//   const res = await fetch("https://jsonplaceholder.typicode.com/photos");

//   // const res = await fetch(
//   //   "https://eu5.fusionsolar.huawei.com/thirdData/stations",
//   //   {
//   //     method: "POST",
//   //     headers: {
//   //       "Content-Type": "application/json",
//   //       "xsrf-token":
//   //         "x-9f2p8bvv3yrsrwmphcdgg4lftgphka478bvytdilmog7satjgbpfpdrzs6deuoanbz5f7sak2pun2k5drz1j6nmmvw3vjsdgup48o67w47ek1diq5d2m2kruernthhmp",
//   //     },
//   //     // body: {
//   //     //   pageNo: 1,
//   //     // },
//   //   }
//   // );

//   return res.json();
// }

export default async function TheProjectsList(props: {
  begin: number;
  end: number;
}) {
  // const projects1 = await getProjects();
  const {
    data: { list },
  } = projects;
  const projectsSlice = list.slice(props.begin, props.end);
  return (
    <ul className={styles.projects}>
      {projectsSlice.map((project: any) => (
        <li className={styles.project} key={project.plantCode}>
          <img src={project.url} alt="" />
          <div className={styles.info}>
            <h3>{project.plantName}</h3>
            <p>{project.plantAddress}</p>
            <Link className="link" href={`/projects/${project.plantCode}`}>
              Подробнее
            </Link>
          </div>
        </li>
      ))}
    </ul>
  );
}
