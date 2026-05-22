
import type { StaticImageData } from "next/image";
import s from "./TheLinks.module.scss";
import Link from "next/link";
import { links as rawLinks } from "data/links";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { TheMotionWrapper } from "../MotionWrapper/TheMotionWrapper";
type LinkObj = {
  labelKey: string;
  img: StaticImageData | string;
  url: string;
};
const links = rawLinks as LinkObj[];

export const TheLinks = () => {
  const t = useTranslations("LinksPage");
  return (
    <TheMotionWrapper motionKey="links">
      <h3 className="title">{t("title")}</h3>
      <ul className={s.links}>
        {links.map(({ labelKey, img, url }) => (
          <li key={labelKey} className={s.link}>
            <Link href={`https://${url}`} target="_blank" className={s.fullLink}>
              <Image width={80} height={80} src={img} alt="" />
              <p style={{ textTransform: "uppercase" }}>{t(labelKey)}</p>
              <span className={s.url}>{url}</span>
            </Link>
          </li>
        ))}
      </ul>
    </TheMotionWrapper>
  );
};
