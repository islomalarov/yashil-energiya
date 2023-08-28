import Image from "next/image";
import "../../scss/globals.scss";
import styles from "./page.module.scss";
import Link from "next/link";

export const TheProjects = () => {
  return (
    <div className="container">
      <div className={styles.header}>
        <h3 className="title">Наши проекты</h3>
        <Link href="/projects" className={styles.link}>
          Все проекты
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="9"
            height="14"
            viewBox="0 0 9 14"
            fill="none"
          >
            <path
              d="M1 13L7.0251 7L1 1"
              stroke="#12903E"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </Link>
      </div>
    </div>
  );
};
