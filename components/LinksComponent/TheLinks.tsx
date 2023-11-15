import "../../scss/globals.scss";
import styles from "./page.module.scss";
import Link from "next/link";
import { links } from "@/data/links";

interface LinkObj {
  img: string;
  body: string;
  url: string;
}
export const TheLinks = () => {
  return (
    <div className="container">
      <h3 className="title">Foydali havolalar</h3>
      <ul className={styles.links}>
        {links.map(({ body, img, url }: LinkObj) => (
          <li key={body}>
            <img src={img} alt="" />
            <p>{body}</p>
            <Link href={`https://${url}`} passHref>
              {url}
            </Link>
          </li>
        ))}
      </ul>
      <div></div>
    </div>
  );
};
