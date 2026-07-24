import styles from "./documents.module.scss";
import NextLink from "next/link";
import { Link } from "@/i18n/navigation";
import { TheHero } from "@/components/HeroComponent/TheHero";
import { TheReveal } from "@/components/ui/Reveal/TheReveal";
import { getTranslations } from "next-intl/server";
import { FileText, ExternalLink } from "lucide-react";

type Translations = Awaited<ReturnType<typeof getTranslations>>;

// Temporary front-end fix for broken lex.uz URLs stored in the dictionaries
// (e.g. "https://lex/ru/docs/..." with the domain suffix dropped).
// TODO: исправить в Hygraph / словарях — см. отчёт по дефектам данных.
function normalizeUrl(url: string): { href: string; wasBroken: boolean } {
  const fixed = url.replace(/^(https?:\/\/)lex\//i, "$1lex.uz/");
  return { href: fixed, wasBroken: fixed !== url };
}

function getDomain(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return "";
  }
}

// Collapse rendering artifacts (repeated whitespace) without editing source data.
function cleanTitle(title: string): string {
  return title.replace(/\s+/g, " ").trim();
}

export default async function DocumentsPage() {
  const t = await getTranslations("DocumentsPage");

  const pvDocuments = Array.from({ length: 13 }, (_, i) => ({
    key: `document${i + 1}`,
  }));
  const mgDocuments = [{ key: "mgDoc1" }];
  const chSDocument = ["chsDoc1", "chsDoc2", "chsDoc3", "chsDoc4", "chsDoc5"].map(
    (key) => ({ key }),
  );
  const chSInternalDocuments = [
    { key: "chsPublicOffer", href: "/chargingstation/public-offer", isInternal: true },
  ];

  return (
    <>
      <TheHero title1={t("title")} url1="documents" />
      <div className="container">
        <div className={styles.content}>
          <DocumentSection title="direction1" docs={pvDocuments} t={t} />
          <DocumentSection title="direction2" docs={mgDocuments} t={t} />
          <DocumentSection
            title="direction3"
            docs={[...chSInternalDocuments, ...chSDocument]}
            t={t}
          />
        </div>
      </div>
    </>
  );
}

interface DocumentSectionProps {
  title: string;
  docs: DocumentLinkItem[];
  t: Translations;
}

type DocumentLinkItem = {
  key: string;
  href?: string;
  isInternal?: boolean;
};

const DocumentSection = ({ title, docs, t }: DocumentSectionProps) => {
  return (
    <section className={styles.section}>
      <TheReveal className={styles.sectionHead}>
        <h2 className={styles.sectionTitle}>{t(title)}</h2>
        <span className={styles.accentLine} aria-hidden="true" />
      </TheReveal>

      <TheReveal stagger as="ul" className={styles.grid} motionKey={title}>
        {docs.map((doc) => {
          const linkTitle = cleanTitle(t(`${doc.key}.title`));

          if (doc.isInternal && doc.href) {
            return (
              <li key={doc.key} className={styles.cardWrap}>
                <Link className={styles.card} href={doc.href}>
                  <span className={styles.icon}>
                    <FileText size={22} aria-hidden="true" />
                  </span>
                  <span className={styles.body}>
                    <span className={styles.cardTitle}>{linkTitle}</span>
                    <span className={styles.source}>yashil-energiya.uz</span>
                  </span>
                </Link>
              </li>
            );
          }

          const rawUrl = t(`${doc.key}.url`);
          const { href, wasBroken } = normalizeUrl(rawUrl);
          if (wasBroken) {
            console.warn(
              `[documents] normalized broken URL for "${doc.key}": ${rawUrl} -> ${href}`,
            );
          }
          const domain = getDomain(href);

          return (
            <li key={doc.key} className={styles.cardWrap}>
              <NextLink
                className={styles.card}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className={styles.icon}>
                  <FileText size={22} aria-hidden="true" />
                </span>
                <span className={styles.body}>
                  <span className={styles.cardTitle}>{linkTitle}</span>
                  <span className={styles.source}>
                    {domain}
                    <ExternalLink size={13} aria-hidden="true" />
                  </span>
                </span>
              </NextLink>
            </li>
          );
        })}
      </TheReveal>
    </section>
  );
};
