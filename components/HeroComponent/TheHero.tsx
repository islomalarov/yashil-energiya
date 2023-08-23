import Image from "next/image";
import "../../scss/globals.scss";
import styles from "./page.module.scss";
import Link from "next/link";

export const TheHero = (props: { title: string }) => {
  return (
    <div className={styles.hero}>
      <img className={styles.bg} src="hero1.png" alt="" />
      <div className="container">
        <div className={styles.info}>
          <h1 className={styles.title}>{props.title}</h1>
          <div className={styles.descr}>
            <Link href="/">Главная</Link>
            <span> | </span> <p>{props.title}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
