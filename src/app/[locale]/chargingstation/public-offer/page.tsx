import type { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import { TheJsonLd } from "@/components/JsonLd/TheJsonLd";
import {
  breadcrumbJsonLd,
  createMetadata,
  webPageJsonLd,
} from "@/lib/seo";
import {
  getPublicOfferContent,
  PUBLIC_OFFER_ROUTE,
} from "@/content/publicOffer";
import s from "./page.module.scss";

type PublicOfferPageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: PublicOfferPageProps): Promise<Metadata> {
  const { locale } = await params;
  const offer = getPublicOfferContent(locale);

  return createMetadata({
    locale,
    path: PUBLIC_OFFER_ROUTE,
    title: offer.seo.title,
    description: offer.seo.description,
  });
}

function isLetteredItem(text: string) {
  return /^[a-c]\)/.test(text);
}

export default async function PublicOfferPage({
  params,
}: PublicOfferPageProps) {
  const { locale } = await params;
  const offer = getPublicOfferContent(locale);

  return (
    <section className={s.page}>
      <TheJsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [
            webPageJsonLd(locale, "chargingstationPublicOffer"),
            breadcrumbJsonLd(locale, [
              { name: offer.project, path: "/chargingstation" },
              { name: offer.title, path: PUBLIC_OFFER_ROUTE },
            ]),
          ],
        }}
      />
      <div className="container">
        <header className={s.hero}>
          <div className={s.heroCopy}>
            <h1 className={s.title}>{offer.title}</h1>
            <p className={s.subtitle}>{offer.subtitle}</p>
          </div>
          <div className={s.metaPanel} aria-label={offer.labels.information}>
            <dl className={s.metaList}>
              <div>
                <dt>{offer.labels.version}</dt>
                <dd>{offer.version}</dd>
              </div>
              <div>
                <dt>{offer.labels.publicationDate}</dt>
                <dd>{offer.publicationDate}</dd>
              </div>
              <div>
                <dt>{offer.labels.effectiveDate}</dt>
                <dd>{offer.effectiveDate}</dd>
              </div>
              <div>
                <dt>{offer.labels.executor}</dt>
                <dd>{offer.executor}</dd>
              </div>
            </dl>
            <a
              className={s.downloadButton}
              href={offer.pdfUrl}
              download
              aria-label={`${offer.labels.downloadPdf}: ${offer.title}`}
            >
              {offer.labels.downloadPdf}
            </a>
            <p className={s.format}>{offer.labels.documentFormat}</p>
          </div>
        </header>

        <div className={s.noticeGrid}>
          <div className={s.infoBlock}>
            <h2>{offer.labels.information}</h2>
            <p>{offer.serviceNotice}</p>
          </div>
          <div className={s.priorityBlock}>
            <p>{offer.priorityNotice}</p>
          </div>
        </div>

        <div className={s.documentLayout}>
          <aside className={s.toc} aria-labelledby="public-offer-toc">
            <h2 id="public-offer-toc">{offer.labels.toc}</h2>
            <nav>
              <ol>
                {offer.sections.map((section) => (
                  <li key={section.id}>
                    <a href={`#${section.id}`}>{section.title}</a>
                  </li>
                ))}
              </ol>
            </nav>
          </aside>

          <article className={s.document}>
            {offer.preamble.map((paragraph) => (
              <p className={s.leadParagraph} key={paragraph}>
                {paragraph}
              </p>
            ))}

            {offer.sections.map((section) => (
              <section
                className={`${s.offerSection} ${
                  section.id === "legal-details" ? s.legalDetails : ""
                }`}
                id={section.id}
                key={section.id}
              >
                <h2>{section.title}</h2>
                {section.paragraphs.map((paragraph, index) => (
                  <p
                    className={`${s.paragraph} ${
                      isLetteredItem(paragraph) ? s.letteredParagraph : ""
                    }`}
                    key={`${section.id}-${index}`}
                  >
                    {paragraph}
                  </p>
                ))}
              </section>
            ))}

            <section className={s.archive} aria-labelledby="version-archive">
              <h2 id="version-archive">{offer.labels.archive}</h2>
              <p>{offer.labels.archiveEntry}</p>
            </section>

            <Link className={s.backLink} href="/chargingstation">
              {offer.labels.backToChargingStations}
            </Link>
          </article>
        </div>
      </div>
    </section>
  );
}
