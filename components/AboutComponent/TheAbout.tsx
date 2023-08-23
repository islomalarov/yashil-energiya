import Image from "next/image";
import "../../scss/globals.scss";
import styles from "./page.module.scss";
import Link from "next/link";

export const TheAbout = () => {
  return (
    <div className="container">
      <div className={styles.content}>
        <div className={styles.info}>
          <h2 className={styles.title}>О компании</h2>
          <div className={styles.line}></div>
          <p className={styles.descr}>
            Hello World!
          </p>
          <Link className={styles.link} href="/about">
            Подробнее
          </Link>
        </div>
        <Image src="/about.png" alt="logo" width={620} height={680} priority />
      </div>
    </div>
  );
};
