import styles from "./documents.module.scss";
import NextLink from "next/link";
import { Link } from "@/i18n/navigation";
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
  ].map((key) => ({ key }));

  const mgDocuments = ["mgDoc1"].map((key) => ({ key }));

  const chSDocument = [
    "chsDoc1",
    "chsDoc2",
    "chsDoc3",
    "chsDoc4",
    "chsDoc5",
  ].map((key) => ({ key }));

  const chSInternalDocuments = [
    {
      key: "chsPublicOffer",
      href: "/chargingstation/public-offer",
      isInternal: true,
    },
  ];

  return (
    <>
      <TheHero title1={t("title")} url1="documents" />
      <div className="container">
        <div className={styles.content}>
          <DocumentLinks title="direction1" docs={pvDocuments} t={t} />
          <DocumentLinks title="direction2" docs={mgDocuments} t={t} />
          <DocumentLinks
            title="direction3"
            docs={[...chSInternalDocuments, ...chSDocument]}
            t={t}
          />
        </div>
      </div>
    </>
  );
}

interface DocumentLinksProps {
  title: string;
  docs: DocumentLinkItem[];
  t: Translations;
}

type DocumentLinkItem = {
  key: string;
  href?: string;
  isInternal?: boolean;
};

const DocumentLinks = ({ title, docs, t }: DocumentLinksProps) => {
  return (
    <div className={styles.linksBlock}>
      <h2 className={styles.linkBlockTitle}>{t(title)}</h2>
      <ul className={styles.linksList}>
        {docs.map((doc) => {
          const linkTitle = t(`${doc.key}.title`);
          const href = doc.href ?? t(`${doc.key}.url`);

          return (
            <li className={styles.linkItem} key={doc.key}>
              <div className={styles.linkIcon}>
                <FileText className={styles.badge} />
              </div>
              {doc.isInternal ? (
                <Link className={styles.linkTitle} href={href}>
                  {linkTitle}
                </Link>
              ) : (
                <NextLink
                  className={styles.linkTitle}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {linkTitle}
                </NextLink>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
