import Image, { StaticImageData } from "next/image";
import "../../scss/globals.scss";
import styles from "./page.module.scss";
import Link from "next/link";
import emblem1 from "@/public/emblems/emblem1.png";
import emblem2 from "@/public/emblems/emblem2.png";
import emblem3 from "@/public/emblems/emblem3.png";
import emblem4 from "@/public/emblems/emblem4.png";
interface LinkObj {
  img: StaticImageData;
  body: string;
  url: string;
}
export const TheLinks = () => {
  const links = [
    {
      img: emblem1,
      body: "Виртуальная приемная Президента Республики Узбекистан",
      url: "pm.gov.uz",
    },
    {
      img: emblem2,
      body: "База данных по законодательству Республики Узбекистан",
      url: "lex.uz",
    },
    {
      img: emblem3,
      body: "Министерство по развитию информационных технологий",
      url: "www.mitc.uz",
    },
    {
      img: emblem4,
      body: "Портал инвестиций Республики Узбекистан",
      url: "www.invest.gov.uz",
    },
    {
      img: emblem1,
      body: "Законодательная палата Олий Мажлиса",
      url: "parliament.gov.uz",
    },
    {
      img: emblem1,
      body: "Государственный Налоговый комитет Республики Узбекистан",
      url: "www.soliq.uz",
    },
  ];
  return (
    <div className="container">
      <h3 className="title">Полезные ссылки</h3>
      <ul className={styles.links}>
        {links.map((link: LinkObj) => (
          <li key={link.body}>
            <Image src={link.img} width={80} height={80} alt="" />
            <p>{link.body}</p>
            <Link href={`https://${link.url}`} passHref>
              {link.url}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
