import Image from "next/image";
import "../../scss/globals.scss";
import styles from "./page.module.scss";
import Link from "next/link";

export const TheHero = (props: { title: string; title2?: string }) => {
  return (
    <div className={styles.hero}>
      <img className={styles.bg} src="hero1.png" alt="" />
      <div className="container">
        <div className={styles.info}>
          <h1 className={styles.title}>{props.title}</h1>
          <div className={styles.descr}>
            <Link href="/">Главная</Link>
            <span> | </span> <p>{props.title}</p>
            {props.title2 ? (
              <>
                <span> | </span> <Link href="/ceo">{props.title2}</Link>
              </>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
