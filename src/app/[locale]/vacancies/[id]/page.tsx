import { TheFeedback } from "@/components/FeedbackComponent/TheFeedback";
import { TheHero } from "@/components/HeroComponent/TheHero";
import { getLocale, getTranslations } from "next-intl/server";
import s from "./page.module.scss";
import { VacancyService } from "services/vacancies.service";
import ThePageContent from "@/components/PageContentComponent/ThePageContent";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ locale: string; id?: string }>;
};

function formatSize(size?: number | null) {
  if (!size || size <= 0) return null;
  const mb = size / 1024 / 1024;
  if (mb >= 1) return `${mb.toFixed(2)} MB`;
  const kb = size / 1024;
  return `${Math.round(kb)} KB`;
}

function pickIcon(mime?: string | null) {
  const m = (mime || "").toLowerCase();
  if (m.includes("pdf")) return "PDF";
  if (m.includes("word") || m.includes("officedocument.wordprocessingml"))
    return "DOC";
  if (m.includes("excel") || m.includes("spreadsheetml")) return "XLS";
  if (m.includes("zip") || m.includes("rar") || m.includes("7z")) return "ZIP";
  return "FILE";
}

export default async function VacancyPage({ params }: Props) {
  const { id } = await params;

  const t = await getTranslations("VacanciesPage");
  const locale = await getLocale();

  if (!id) notFound();

  const vacancy = await VacancyService.getOneVacancy(id, locale);
  if (!vacancy) return <div className="container">{t("notFound")}</div>;

  const { title, description, references, attachments } = vacancy;

  return (
    <>
      <TheHero title1={t("title")} url1="vacancies" />

      <div className="container">
        <div className={s.page}>
          <header className={s.header}>
            <div className={s.badge}>{t("positionTitle")}</div>
            <h1 className={s.title}>{title}</h1>

            {references ? (
              <div className={s.meta}>
                <div className={s.metaLabel}>{t("references")}</div>
                <div className={s.metaValue}>{references}</div>
              </div>
            ) : null}
          </header>

          <section className={s.card}>
            <div className={s.cardHeader}>
              <h2 className={s.sectionTitle}>{t("descriptionTitle")}</h2>
            </div>

            <div className={s.rich}>
              <ThePageContent content={description?.raw?.children ?? []} />
            </div>

            {attachments?.length ? (
              <div className={s.attachments}>
                <h3 className={s.attachTitle}>{t("attachments")}</h3>

                <ul className={s.attachList}>
                  {attachments.map((file) => (
                    <li key={file.id} className={s.attachItem}>
                      <a
                        href={file.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        download
                        className={s.downloadBtn}
                      >
                        <span className={s.fileChip}>
                          {pickIcon(file.mimeType)}
                        </span>

                        <span className={s.fileInfo}>
                          <span className={s.fileName}>{file.fileName}</span>
                          <span className={s.fileMeta}>
                            {file.mimeType ? file.mimeType : ""}
                            {formatSize(file.size)
                              ? ` • ${formatSize(file.size)}`
                              : ""}
                          </span>
                        </span>

                        <span className={s.downloadLabel}>Download</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </section>
        </div>
      </div>

      <TheFeedback />
    </>
  );
}
