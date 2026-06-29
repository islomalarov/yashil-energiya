export type PublicOfferLocale = "ru" | "uz" | "en";

export type PublicOfferSection = {
  id: string;
  title: string;
  paragraphs: string[];
};

export type PublicOfferContent = {
  title: string;
  subtitle: string;
  project: string;
  executor: string;
  version: string;
  publicationDate: string;
  effectiveDate: string;
  pdfUrl: string;
  priorityNotice: string;
  serviceNotice: string;
  labels: {
    project: string;
    version: string;
    publicationDate: string;
    effectiveDate: string;
    executor: string;
    downloadPdf: string;
    documentFormat: string;
    information: string;
    toc: string;
    archive: string;
    archiveEntry: string;
    backToChargingStations: string;
  };
  seo: {
    title: string;
    description: string;
  };
  preamble: string[];
  sections: PublicOfferSection[];
};
