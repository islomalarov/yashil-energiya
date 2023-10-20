import Link from "next/link";
import styles from "./page.module.scss";
import "../../scss/globals.scss";
async function getProjects() {
  const res = await fetch("https://jsonplaceholder.typicode.com/photos");

  // const res = await fetch(
  //   "https://eu5.fusionsolar.huawei.com/thirdData/stations",
  //   {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //       "xsrf-token":
  //         "x-9f2p8bvv3yrsrwmphcdgg4lftgphka478bvytdilmog7satjgbpfpdrzs6deuoanbz5f7sak2pun2k5drz1j6nmmvw3vjsdgup48o67w47ek1diq5d2m2kruernthhmp",
  //     },
  //     // body: {
  //     //   pageNo: 1,
  //     // },
  //   }
  // );
  console.log(res);

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
