import styles from "./documents.module.scss";
import Link from "next/link";
import { TheHero } from "@/components/HeroComponent/TheHero";
import { getTranslations } from "next-intl/server";
import { FileText } from "lucide-react";

type Translations = Awaited<ReturnType<typeof getTranslations>>;

export default async function DocumentsPage() {
  const t = await getTranslations("DocumentsPage");
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
          <DocumentLinks title="direction1" docs={[...pvDocuments]} t={t} />
          <DocumentLinks title="direction2" docs={[...mgDocuments]} t={t} />
          <DocumentLinks title="direction3" docs={[...chSDocument]} t={t} />
        </div>
      </div>
    </>
  );
}

interface DocumentLinksProps {
  title: string;
  docs: string[];
  t: Translations;
}

const DocumentLinks = ({ title, docs, t }: DocumentLinksProps) => {
  return (
    <div className={styles.linksBlock}>
      <h2 className={styles.linkBlockTitle}>{t(title)}</h2>
      <ul className={styles.linksList}>
        {docs.map((doc: string) => (
          <li className={styles.linkItem} key={doc}>
            <div className={styles.linkIcon}>
              <FileText className={styles.badge} />
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
