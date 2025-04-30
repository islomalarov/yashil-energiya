import "@/scss/globals.scss";
import s from "./TheLinks.module.scss";
import Link from "next/link";
import { links } from "@/data/links";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { TheMotionWrapper } from "../MotionWrapper/TheMotionWrapper";

export const TheLinks = () => {
  const t = useTranslations("LinksPage");
  return (
    <TheMotionWrapper>
      <h3 className="title">{t("title")}</h3>
      <ul className={s.links}>
        {links.map(({ body, img, url }: LinkObj) => (
          <li key={body} className={s.link}>
            <Image width={80} height={80} src={img} alt="link-icon" />
            <p style={{ textTransform: "uppercase" }}>{body}</p>
            <Link href={`https://${url}`} target="_blank" passHref>
              {url}
            </Link>
          </li>
        ))}
      </ul>
    </TheMotionWrapper>
  );
};
