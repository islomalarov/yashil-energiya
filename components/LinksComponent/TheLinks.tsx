import Image from "next/image";
import "../../scss/globals.scss";
import styles from "./page.module.scss";
import Link from "next/link";

interface LinkObj {
  img: string;
  body: string;
  url: string;
}
export const TheLinks = () => {
  const links = [
    {
      img: "/emblems/emblem1.png",
      body: "O'ZBEKISTON RESPUBLIKASI PREZIDENTI VIRTUAL QABULXONASI",
      url: "pm.gov.uz",
    },
    {
      img: "https://lex.uz/assets/img/lex_uz.svg",
      body: "O‘ZBEKISTON RESPUBLIKASI QONUNCHILIK MA’LUMOTLARI MILLIY BAZASI",
      url: "lex.uz",
    },
    {
      img: "/emblems/emblem3.png",
      body: "O‘ZBEKISTON RESPUBLIKASI ENERGETIKA VAZIRLIGI",
      url: "minenergy.uz",
    },
    {
      img: "/emblems/emblem4.png",
      body: "O‘ZBEKISTON RESPUBLIKASI INVESTITSIYALAR VA TASHQI SAVDO VAZIRLIGI",
      url: "www.invest.gov.uz",
    },
    {
      img: "/emblems/emblem5.png",
      body: "OʼZBEKISTON RESPUBLIKASI OLIY MAJLISI QONUNCHILIK PALATASI",
      url: "parliament.gov.uz",
    },
    {
      img: "https://www.soliq.uz/assets/images/logo-flag.svg",
      body: "OʼZBEKISTON RESPUBLIKASI VAZIRLAR MAHKAMASI HUZURIDAGI SOLIQ QO'MITASI",
      url: "www.soliq.uz",
    },
  ];
  return (
    <div className="container">
      <h3 className="title">Foydali havolalar</h3>
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
