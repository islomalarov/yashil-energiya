"use client";

import { TheHero } from "@/src/components/HeroComponent/TheHero";
import { useLocale, useTranslations } from "next-intl";
import s from "./page.module.scss";
import Link from "next/link";
import { usePathname } from "@/src/i18n/navigation";
import { tenders } from "@/data/tenders";

export default function TenderPage() {
  const t = useTranslations("TendersPage");
  const pathname = usePathname();
  const tenderNumber = Number(pathname.match(/procurement(\d+)/)?.[1]);
  const { tendersRu = [], tendersEn = [] } =
    tenders.find((t) => t.id === tenderNumber) ?? {};

  const locale = useLocale();

  return (
    <>
      <TheHero title1={t("title")} url1="procurements" />
      <div className="container">
        <div className={s.content}>
          <nav className={s.stickyNav}>
            <ul>
              <li>
                <a href="#section1">
                  {locale === "ru"
                    ? "Общее уведомление о закупках"
                    : "General Procurement Notice"}
                </a>
              </li>
              <li>
                <a href="#section2">
                  {locale === "ru" ? "Тендеры" : "Tenders"}
                </a>
              </li>
            </ul>
          </nav>
          <div className={s.separator}></div>
          {locale === "ru" ? (
            <div>
              <div className={s.notice} id="section1">
                <h2>ОБЩЕЕ УВЕДОМЛЕНИЕ О ЗАКУПКАХ</h2>
                <div>
                </div>
                <div>
                  <p className="description">
                    СП ООО «Yashil Energiya» в рамках своей уставной деятельности и реализуемых программ развития планирует использование финансовых средств на оплату товаров, работ, неконсультационных и консультационных услуг, необходимых для подготовки и реализации проектов в сфере распределённой солнечной энергетики.
                  </p>
                </div>
                <div>
                  <p className="description">
                    Планируемые мероприятия включают, в том числе, проведение технико-экономических обоснований, экологических и социальных оценок, разработку соответствующих экологических и социальных инструментов, правовой и нормативной экспертизы, подготовку тендерной документации, а также сопровождение закупочных процедур.
                  </p>
                </div>
                <div>
                  <p className="description">
                    Закупки товаров, работ, неконсультационных и консультационных услуг будут осуществляться в соответствии с действующими внутренними процедурами компании, а также с учётом требований законодательства Республики Узбекистан, принципов прозрачности, открытой конкуренции и равного доступа для потенциальных участников.
                  </p>
                </div>
                <div>
                  <p className="description">
                    Информация о проводимых закупочных процедурах и конкурсах будет публиковаться на официальном веб-сайте СП ООО «Yashil Energiya» по мере их объявления.
                  </p>
                </div>
                <div>
                  <p className="description">
                    Заинтересованные компании и физические лица, обладающие необходимой квалификацией и опытом, и желающие рассмотреть возможность участия в поставке товаров, выполнении работ или оказании услуг, а также лица, заинтересованные в получении дополнительной информации, могут обращаться в СП ООО «Yashil Energiya» по контактным данным, указанным на официальном сайте компании.
                  </p>
                </div>
                <div>
                  <p className="description">
                    <b>Насретдинов Н.Т.</b>
                  </p>
                  <p className="description">Директор СП ООО «Yashil Energiya»</p>
                  <p className="description">
                    2Б, ул. Чингиза Айтматова, Юнусабадский район, Ташкент,
                    Узбекистан
                  </p>
                  <p className="description">
                    электронная почта:{" "}
                    <Link href={`mailto:marketing@yashil-energiya.uz`}>
                      marketing@yashil-energiya.uz
                    </Link>
                  </p>
                  <p className="description">
                    сайт:{" "}
                    <Link
                      href={`https://www.yashil-energiya.uz`}
                      target="\_blank"
                    >
                      https://www.yashil-energiya.uz
                    </Link>
                  </p>
                </div>
              </div>
              <div>
                <h2>ТЕНДЕРЫ</h2>
                <ul className={s.tendersList} id="section2">
                  {tendersRu.map((tender) => (
                    <li key={tender.id} className={s.tenderItem}>
                      <div className={s.tenderItemBlock}>
                        <h3>Заголовок</h3>
                        <p>{tender.title}</p>
                      </div>
                      <div className={s.tenderItemBlock}>
                        <h3>Статус</h3>
                        <p>{tender.status}</p>
                      </div>
                      <div className={s.tenderItemBlock}>
                        <h3>Крайний срок</h3>
                        <p>{tender.deadline}</p>
                      </div>
                      <div className={s.tenderItemBlock}>
                        <h3>Вложение</h3>
                        <a href={`/documents/${tender.file}`} download>
                          Скачать
                        </a>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ) : (
            <div>
              <div className={s.notice} id="section1">
                <h2>GENERAL PROCUREMENT NOTICE</h2>
                <div>
                </div>
                <div>
                  <p className="description">
                    JV LLC “Yashil Energiya”, within the scope of its statutory activities and implemented development programs, plans to utilize financial resources for the procurement of goods, works, non-consulting services, and consulting services required for the preparation and implementation of projects in the field of distributed solar energy.
                  </p>
                </div>
                <div>
                  <p className="description">
                    The planned activities include, inter alia, the preparation of feasibility studies, environmental and social assessments, development of relevant environmental and social instruments, legal and regulatory due diligence, preparation of tender documentation, as well as support throughout the procurement process.
                  </p>
                </div>
                <div>
                  <p className="description">
                    Procurement of goods, works, non-consulting services, and consulting services will be carried out in accordance with the Company’s internal procedures, taking into account the requirements of the legislation of the Republic of Uzbekistan, as well as the principles of transparency, open competition, and equal access for potential participants.
                  </p>
                </div>
                <div>
                  <p className="description">
                    Information on ongoing procurement procedures and tenders will be published on the official website of JV LLC “Yashil Energiya” as they are announced.
                  </p>
                </div>
                <div>
                  <p className="description">
                    Interested companies and individuals possessing the required qualifications and experience, and wishing to consider participation in the supply of goods, execution of works, or provision of services, as well as those seeking additional information, may contact JV LLC “Yashil Energiya” using the contact details provided on the Company’s official website.
                  </p>
                </div>
                <div>
                  <p className="description">
                    <b>N.T. Nasretdinov </b>
                  </p>
                  <p className="description">
                    Director of JV "Yashil Energiya"LLC
                  </p>
                  <p className="description">
                    2B, Chingiz aytmatov str., Yunusabad district, Tashkent
                    city, Uzbekistan
                  </p>
                  <p className="description">
                    e-mail:{" "}
                    <Link href={`mailto:marketing@yashil-energiya.uz`}>
                      marketing@yashil-energiya.uz
                    </Link>
                  </p>
                  <p className="description">
                    website:{" "}
                    <Link
                      href={`https://www.yashil-energiya.uz`}
                      target="\_blank"
                    >
                      https://www.yashil-energiya.uz
                    </Link>
                  </p>
                </div>
              </div>
              <div id="section2">
                <h2>TENDERS</h2>
                <ul className={s.tendersList}>
                  {tendersEn.map((tender) => (
                    <li key={tender.id} className={s.tenderItem}>
                      <div className={s.tenderItemBlock}>
                        <h3>Title</h3>
                        <p>{tender.title}</p>
                      </div>
                      <div className={s.tenderItemBlock}>
                        <h3>Status</h3>
                        <p>{tender.status}</p>
                      </div>
                      <div className={s.tenderItemBlock}>
                        <h3>Deadline</h3>
                        <p>{tender.deadline}</p>
                      </div>
                      <div className={s.tenderItemBlock}>
                        <h3>Attachment</h3>
                        <a href={`/documents/${tender.file}`} download>
                          Download
                        </a>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
