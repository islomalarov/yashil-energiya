import "@/scss/globals.scss";
import styles from "./TheLinks.module.scss";
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
      <ul className={styles.links}>
        {links.map(({ body, img, url }: LinkObj) => (
          <li key={body}>
            <Image width={80} height={80} src={img} alt="link-icon" />
            <p>{body}</p>
            <Link href={`https://${url}`} passHref>
              {url}
            </Link>
          </li>
        ))}
      </ul>
    </TheMotionWrapper>
  );
};
