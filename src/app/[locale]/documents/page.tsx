"use client";

import styles from "./documents.module.scss";
import Link from "next/link";
import { TheHero } from "@/src/components/HeroComponent/TheHero";
import { useTranslations } from "next-intl";
import { IoDocumentTextOutline } from "react-icons/io5";

export default function DocumentsPage() {
  const t = useTranslations("DocumentsPage");
  const pvDocuments = [
    "document1",
    "document2",
    "document3",
    "document4",
    "document5",
    "document6",
    "document7",
    "document8",
    "document9",
    "document10",
    "document11",
    "document12",
    "document13",
  ] as const;

  const mgDocuments = ["mgDoc1"] as const;

  const chSDocument = [
    "chsDoc1",
    "chsDoc2",
    "chsDoc3",
    "chsDoc4",
    "chsDoc5",
  ] as const;

  return (
    <>
      <TheHero title1={t("title")} url1="documents" />
      <div className="container">
        <div className={styles.content}>
          <DocumentLinks title="direction1" docs={[...pvDocuments]} />
          <DocumentLinks title="direction2" docs={[...mgDocuments]} />
          <DocumentLinks title="direction3" docs={[...chSDocument]} />
        </div>
      </div>
    </>
  );
}

interface DocumentLinksProps {
  title: string;
  docs: string[];
}

const DocumentLinks = ({ title, docs }: DocumentLinksProps) => {
  const t = useTranslations("DocumentsPage");
  return (
    <div className={styles.linksBlock}>
      <h2 className={styles.linkBlockTitle}>{t(title)}</h2>
      <ul className={styles.linksList}>
        {docs.map((doc: string) => (
          <li className={styles.linkItem} key={doc}>
            <div className={styles.linkIcon}>
              <IoDocumentTextOutline size={22} color="black" />
            </div>
            <Link
              className={styles.linkTitle}
              href={t(`${doc}.url`)}
              target="_blank"
            >
              {t(`${doc}.title`)}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
