"use client";

import { TheHero } from "@/components/HeroComponent/TheHero";
import { useLocale, useTranslations } from "next-intl";
import { usePathname } from "@/i18n/navigation";
import { tenders } from "data/tenders";
import { ProcurementBreadcrumbs } from "@/components/ProcurementsComponent/ProcurementBreadcrumbs";
import { ProcurementSubNav } from "@/components/ProcurementsComponent/ProcurementSubNav";
import { ContactPlaque } from "@/components/ProcurementsComponent/ContactPlaque";
import { TendersList } from "@/components/ProcurementsComponent/TendersList";
import { TheReveal } from "@/components/ui/Reveal/TheReveal";
import s from "@/components/ProcurementsComponent/Procurement.module.scss";

export default function TenderPage() {
  const t = useTranslations("TendersPage");
  const pathname = usePathname();
  const tenderNumber = Number(pathname.match(/procurement(\d+)/)?.[1]);
  const record = tenders.find((tender) => tender.id === tenderNumber);
  const { tendersRu = [], tendersEn = [], projectNumber } = record ?? {};
  const locale = useLocale();
  const isRu = locale === "ru";

  const projectName = isRu
    ? record?.projectNameRu ?? ""
    : record?.projectNameEn ?? "";
  const currentName = [projectNumber, projectName].filter(Boolean).join(" · ");

  return (
    <>
      <TheHero title1={t("title")} url1="procurements" />
      <div className="container">
        <ProcurementBreadcrumbs current={currentName || t("noticeTitle")} />
        <div className={s.content}>
          <ProcurementSubNav />

          <TheReveal as="section" className={s.notice} motionKey="notice">
            <h2 className={s.sectionTitle} id="section1">
              {t("noticeTitle")}
            </h2>
            <div className={s.accentLine} aria-hidden="true" />

            {isRu ? (
              <article className={s.doc}>
                <div className={s.docEyebrow}>
                  <p className="description">Республика Узбекистан</p>
                  <p className="description">
                    Распределенная солнечная энергия в Узбекистане
                  </p>
                  <p className="description">Проект развития</p>
                  <p className="description">
                    Идентификационный номер проекта: P000827
                  </p>
                </div>
                <p className="description">
                  Республика Узбекистан получила Специальный фонд подготовки
                  проекта (PPSF), далее именуемый «Грант», в размере,
                  эквивалентном 1 700 000 долл. США, от Азиатского банка
                  инфраструктурных инвестиций (далее – АБИИ) на подготовительные
                  мероприятия по проекту развития государственной распределенной
                  солнечной энергетики в Узбекистане и намерена использовать
                  часть средств на оплату товаров, работ, неконсультационных
                  услуг и консультационных услуг, которые будут закуплены в
                  рамках этого гранта.
                </p>
                <p className="description">
                  Мероприятия в рамках гранта будут включать подготовительные
                  мероприятия по проекту, в том числе технико-экономическое
                  обоснование, экологическую и социальную оценку и подготовку
                  экологических и социальных инструментов, юридическую и
                  нормативную проверку, подготовку тендерной документации и
                  поддержку в тендерном процессе.
                </p>
                <p className="description">
                  Закупки по контрактам, финансируемым АБИИ, будут проводиться в
                  соответствии с процедурами, указанными в{" "}
                  <i>
                    Директиве АБИИ об инструкциях по закупкам для получателей
                    (июль 2024 г.),
                  </i>{" "}
                  и открыты для всех соответствующих требованиям фирм и лиц.
                </p>
                <p className="description">
                  Конкретные уведомления о закупках по контрактам, подлежащим
                  международному открытому конкурсу, будут публиковаться по мере
                  их поступления на внешнем веб-сайте АБИИ и на веб-сайте СП ООО
                  «Yashil Energiya».
                </p>
                <p className="description">
                  Заинтересованные компании и частные лица, имеющие право на
                  участие в тендере и желающие рассмотреть возможность
                  предоставления товаров, работ, неконсультационных и
                  консультационных услуг для вышеупомянутого проекта, или те, кому
                  требуется дополнительная информация, должны связаться с
                  агентством, реализующим проект, по указанному ниже адресу:
                </p>
              </article>
            ) : (
              <article className={s.doc}>
                <div className={s.docEyebrow}>
                  <p className="description">Republic of Uzbekistan</p>
                  <p className="description">
                    Uzbekistan Public Distributed Solar Energy
                  </p>
                  <p className="description">Development Project</p>
                  <p className="description">Project ID No.: P000827</p>
                </div>
                <p className="description">
                  The Republic of Uzbekistan has received Project Preparation
                  Special Fund (PPSF), hereafter referred to as “the Grant”, in
                  the amount of US$ 1,700,000 equivalent from the Asian
                  Infrastructure Investment Bank (hereafter AIIB) toward the
                  project preparatory activities for the Uzbekistan Public
                  Distributed Solar Energy Development Project, and it intends to
                  apply part of the proceeds to payments for goods, works,
                  non-consulting services and consulting services to be procured
                  under this grant.
                </p>
                <p className="description">
                  The activities under the Grant will include project preparatory
                  activities, including feasibility study, environmental and
                  social assessment and preparation of E&S instruments, legal and
                  regulatory due diligence, preparation of bidding documents, and
                  support with the tender process.
                </p>
                <p className="description">
                  Procurement of contracts financed by the AIIB will be conducted
                  through the procedures as specified in{" "}
                  <i>
                    AIIB Directive on Procurement Instructions for Recipients
                    (July 2024)
                  </i>
                  , and is open to all eligible firms and individuals.
                </p>
                <p className="description">
                  Specific procurement notices for contracts subject to
                  international open competitive tender will be announced, as they
                  become available, on the AIIB’s external website and on the
                  website of JV "Yashil Energiya" LLC.
                </p>
                <p className="description">
                  Interested eligible firms and individuals who would wish to be
                  considered for the provision of goods, works, non-consulting
                  services and consulting services for the abovementioned
                  project, or those requiring additional information, should
                  contact the project implementing agency at the address below:
                </p>
              </article>
            )}

            <ContactPlaque
              name={isRu ? "Насретдинов Н.Т." : "N.T. Nasretdinov"}
              role={
                isRu
                  ? "Директор СП ООО «Yashil Energiya»"
                  : "Director of JV “Yashil Energiya” LLC"
              }
              address={
                isRu
                  ? "2Б, ул. Чингиза Айтматова, Юнусабадский район, Ташкент, Узбекистан"
                  : "2B, Bodomzor str., Yunusabad district, Tashkent city, Uzbekistan"
              }
              email="x.alisherov@yashil-energiya.uz"
              website="https://www.yashil-energiya.uz"
            />
          </TheReveal>

          <section className={s.tenders}>
            <h2 className={s.sectionTitle} id="section2">
              {t("tendersTitle")}
            </h2>
            <div className={s.accentLine} aria-hidden="true" />
            <TendersList tenders={isRu ? tendersRu : tendersEn} />
          </section>
        </div>
      </div>
    </>
  );
}
