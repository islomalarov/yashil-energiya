import Image from "next/image";
import "../../scss/globals.scss";
import styles from "./page.module.scss";
import Link from "next/link";

export const TheAbout = () => {
  return (
    <div className="container">
      <div className={styles.content}>
        <div className={styles.info}>
          <h2 className="title">О компании</h2>
          <div className={styles.line}></div>
          <p className={styles.descr}>
            Sed ut perspiciatis, unde omnis iste natus error sit voluptatem
            accusantium doloremque laudantium, totam rem aperiam eaque ipsa,
            quae ab illo inventore veritatis et quasi architecto beatae vitae
            dicta sunt, explicabo. Nemo enim ipsam voluptatem, quia voluptas
            sit, aspernatur aut odit aut fugit, sed quia consequuntur magni
            dolores eos, qui ratione voluptatem sequi nesciunt, neque porro
            quisquam est, qui dolorem ipsum, quia dolor sit, amet, consectetur,
            adipisci velit, sed quia non numquam eius modi tempora incidunt, ut
            labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad
            minima veniam, quis nostrum exercitationem ullam corporis suscipit
            laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem
            vel eum iure reprehenderit, qui in ea voluptate velit esse, quam
            nihil molestiae consequatur, vel illum, qui dolorem eum fugiat, quo
            voluptas nulla pariatur?
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
