"use client";

import { TheHero } from "@/src/components/HeroComponent/TheHero";
import Link from "next/link";
import { useTranslations } from "next-intl";
import s from "./page.module.scss";
import { useState } from "react";
import { TheFeedback } from "@/src/components/FeedbackComponent/TheFeedback";

export default function Jobs1() {
  const t = useTranslations("JobsPage");
  const [language, setLanguage] = useState("eng");
  return (
    <>
      <TheHero title1={t("title")} url1="jobs" />
      <div className={`${s.container} container`}>
        <div className={s.languageBtn}>
          <select
            name=""
            id=""
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
          >
            <option value="ru">Ru</option>
            <option value="eng">Eng</option>
          </select>
        </div>
        {language === "ru" ? (
          <div className={s.content}>
            <h2>
              Позиция: Специалист по управлению закупками (индивидуальный
              консультант)
            </h2>
            <div>
              <p className="description">
                <b>Номер конкурса: № UPDSED-IC-1</b>
              </p>
            </div>

            <div>
              <p className="description">
                Министерство энергетики Республики Узбекистан получило грантовые
                средства, далее именуемый «Грант», в размере 1 700 000 долларов
                США в эквиваленте от Азиатского банка инфраструктурных
                инвестиций (AБИИ) на подготовительные мероприятия по проекту
                «Развитие солнечной энергетики в Узбекистане» (UPDSED) и
                намеревается использовать часть этих средств на консалтинговые
                услуги. гранта.
              </p>
            </div>
            <div>
              <p className="description">
                Основная цель консалтинговых услуг - (i) поддержка
                исполнительного агентства ООО «Yashil Energiya» в рамках
                вышеуказанного Проекта, (ii) обеспечение высококачественных и
                своевременных закупок и заключения контрактов со всеми
                отобранными компаниями и индивидуальными консультантами,
                предусмотренные по Гранту, и (iii) обеспечение исполнения
                ключевых результатов по закупкам и в управлении контрактами.
                Срок действия договора составляет 12 месяцев.
              </p>
            </div>
            <div>
              <p className="description">
                ООО «Yashil Energiya» (Исполнительное агентство) при
                Министерстве энергетики Республики Узбекистан в настоящее время
                приглашает индивидуальных специалистов/экспертов,
                соответствующих требованиям (далее «индивидуальный
                консультант»), подать заявку на вышеуказанную должность.
                Заинтересованные консультанты должны будут представить
                информацию, демонстрируя свою квалификацию и соответствующий
                опыт для исполнения консалтинговых услуг.
              </p>
            </div>
            <div>
              <p className="description">
                Заинтересованные консультанты должны представить достаточную
                информацию (такую как например, резюме, сертификаты и т. д.),
                подтверждающие, что они являются квалифицированными
                специалистами для исполнения контракта и имеют следующую
                квалификацию и опыт:
              </p>
            </div>
            <div>
              <ul className={s.list}>
                <li>
                  Степень бакалавра инженера или степень магистра в области
                  экономики/статистики/финансов/делового
                  администрирования/управления закупками/или других
                  соответствующих дисциплин. Профессиональные квалификации,
                  такие как MCIPS, будут дополнительным преимуществом.
                </li>
                <li>
                  Минимум 10 лет опыта работы, из них 5 лет в частных или
                  государственных организациях в качестве специалиста по
                  закупкам или администратора контрактов или эквивалентных
                  должностях. Опыт закупок в проектах международных банках
                  развития (Всемирный банк, АБР, АБИИ) будет дополнительным
                  преимуществом.
                </li>
                <li>
                  Иметь подтвержденный опыт работы с международными контрактами
                  на категории работ, товаров и услуг. Необходимо иметь четкое
                  понимание национального законодательства и руководств по
                  закупкам международных финансовых институтов.
                </li>
                <li>
                  Опыт подготовки и разработки Планов закупок для
                  государственных проектов, тендерной документации, запросов на
                  подачу предложений и отчетов об оценке в соответствии с
                  требованиями донорских агентств будет являться дополнительным
                  преимуществом.
                </li>
                <li>
                  Предпочтение отдается кандидатам с глубокими знаниями
                  технических, коммерческих и юридических аспектов закупок в
                  рамках проектов, финансируемых правительством и АБИИ.
                </li>
                <li>
                  Умение работать на компьютере, опыт самостоятельной работы.
                </li>
                <li>
                  Отличные коммуникативные навыки на английском языке, как
                  письменном, так и в устном виде.
                </li>
              </ul>
            </div>
            <div>
              <p className="description">
                Отбор проводится в соответствии с Руководствами АБИИ по
                закупочным процедурам для Заемщиков (издание от 26 июля 2024
                г.), с которыми можно ознакомиться по следующему адресу:
                <Link
                  href={`https://www.aiib.org/en/policies-strategies/_download/operational-directive/AIIB-Directive-on-Procurement-Instructions-for-Recipients-July-26-2024.pdf`}
                  target="_blank"
                >
                  {" "}
                  https://www.aiib.org/en/policies-strategies/_download/operational-directive/AIIB-Directive-on-Procurement-Instructions-for-Recipients-July-26-2024.pdf
                </Link>
                .
              </p>
              <p className="description">
                Индивидуальный Консультант будет отобран на основании открытых
                конкурсных торгов по отбору индивидуальных консультантов в
                соответствии с Руководством АБИИ.
              </p>
              <p className="description">
                Заинтересованные консультанты могут ознакомиться с Техническим
                заданием по следующей ссылке:
                <Link
                  href={`https://docs.google.com/document/d/1_y_H5Nkz4i20Rh36d6fDCFNGRcaqBPHN/edit?usp=share_link&ouid=105767425327459642425&rtpof=true&sd=true`}
                  target="_blank"
                >
                  {" "}
                  https://docs.google.com/document/d/1_y_H5Nkz4i20Rh36d6fDCFNGRcaqBPHN/edit?usp=share_link&ouid=105767425327459642425&rtpof=true&sd=true
                </Link>
              </p>
            </div>
            <div>
              <p className="description">
                <b>Заявка</b> с резюме должна быть подписана и подана в
                электронном виде в pdf формате на следующий электронный адрес,
                не позднее{" "}
                <b>15.00 по ташкентскому времени 3 апреля 2025 года:</b>
              </p>
            </div>
            <div>
              <p className="description">Вниманию: Насретдинов Н.Т.</p>
              <p className="description">Директор ООО “Yashil Energiya”</p>
              <p className="description">
                Адрес: Ташкент, Юнусобадский район, 1-й проезд Чынгыза Айтматова
                2B
              </p>
              <p className="description">
                Электронная почта:{" "}
                <Link href={`mailto:aiib@yashil-energiya.uz`}>
                  aiib@yashil-energiya.uz
                </Link>
              </p>
            </div>
          </div>
        ) : (
          <div className={s.content}>
            <h2>
              Position Title: Procurement Management Specialist (Individual
              Consultant)
            </h2>
            <div>
              <p className="description">
                <b>References: No. UPDSED-IC-1</b>
              </p>
            </div>

            <div>
              <p className="description">
                The Ministry of Energy of the Republic of Uzbekistan has
                received Project Preparation Special Fund (PPSF), hereafter
                referred to as “the Grant”, in the amount of US$ 1,700,000
                equivalent from the Asian Infrastructure Investment Bank (AIIB)
                towards the project preparatory activities for of the Uzbekistan
                Public Distributed Solar Energy Development (UPDSED) Project and
                intends to apply part of the proceeds for consulting services.
              </p>
            </div>
            <div>
              <p className="description">
                The main aim of the consultancy services is to (i) support
                Yashil Energiya LLC (Project Implementation Entity-PIE) with the
                overall procurement processing and management for the project
                preparatory activities of the above-mentioned Project, (ii)
                ensure that high quality and timely procurement and contracts
                for all selection of firms and individual consultants required
                under the Grant, and (iii) ensure that all required key
                deliverables on procurement and contract management are
                delivered. The duration of the contract is 12 months.
              </p>
            </div>
            <div>
              <p className="description">
                The “Yashil Energiya” LLC (Project Implementation Entity-PIE)
                under the Ministry of Energy of the Republic of Uzbekistan now
                invites eligible Individual specialists/experts (“Individual
                Consultant”) to submit the Application for the above Position.
                Interested Consultants should provide information demonstrating
                that they have the required qualifications and relevant
                experience to perform the Services.
              </p>
            </div>
            <div>
              <p className="description">
                Interested Consultants must provide sufficient information (such
                as CV, Certificates and etc.) indicating that they are qualified
                to perform the services, demonstrating the following
                qualifications and experiences:
              </p>
            </div>
            <div>
              <ul className={s.list}>
                <li>
                  BSc. in Engineering or Master’s in
                  economics/statistics/finance/business
                  administration/procurement management/ or other relevant
                  subjects. Professional qualifications such as MCIPS would be
                  an added advantage.
                </li>
                <li>
                  Minimum 10 years of working experience with 5 years in private
                  or public organizations in the capacity of Procurement
                  Specialist or Contract Administrator or equivalent positions.
                  Procurement experience in a Multilateral Development Bank
                  (World Bank, ADB, AIIB) would be an added advantage.
                </li>
                <li>
                  Have proven expertise in the use of internationally accepted
                  contract documents for works, goods, and services. Must have a
                  sound understanding of national regulation and international
                  agencies' procurement guidelines.
                </li>
                <li>
                  Experience in preparation of procurement plans for Government
                  projects, tender documents, requests for proposals, and
                  evaluation reports following donor agencies guidelines shall
                  be an added advantage.
                </li>
                <li>
                  In-depth knowledge of technical, commercial, and legal aspects
                  of procurement in development projects financed by the
                  government and the AIIB is preferred.
                </li>
                <li>
                  Ability in computer operation with experience of working
                  independently.
                </li>
                <li>
                  Excellent communication skills in English, both written and
                  spoken.
                </li>
              </ul>
            </div>
            <div>
              <p className="description">
                The selection is conducted in accordance with AIIB’s Directive
                on Procurement Instructions for Recipients (July 26, 2024)
                (“Procurement Directive”, which can be accessed at
                <Link
                  href={`https://www.aiib.org/en/policies-strategies/_download/operational-directive/AIIB-Directive-on-Procurement-Instructions-for-Recipients-July-26-2024.pdf`}
                  target="_blank"
                >
                  {" "}
                  https://www.aiib.org/en/policies-strategies/_download/operational-directive/AIIB-Directive-on-Procurement-Instructions-for-Recipients-July-26-2024.pdf.
                </Link>
                .
              </p>
              <p className="description">
                A Consultant will be selected in accordance with the Open
                Competitive Selection of Individual Consultants (OCSIC) method
                set out in the Procurement Directive.
              </p>
              <p className="description">
                Interested Consultant may access draft Terms of Reference at:
                <Link
                  href={`https://docs.google.com/document/d/1q_HIts4hBckCrT88XKk5czvzllRiBYUy/edit?usp=share_link&ouid=105767425327459642425&rtpof=true&sd=true`}
                  target="_blank"
                >
                  {" "}
                  https://docs.google.com/document/d/1q_HIts4hBckCrT88XKk5czvzllRiBYUy/edit?usp=share_link&ouid=105767425327459642425&rtpof=true&sd=true
                </Link>
              </p>
            </div>
            <div>
              <p className="description">
                <b>The Application Letter,</b> with CV, must be submitted
                electronically in signed pdf format to the following email
                address{" "}
                <b>not later than 15.00 PM Tashkent Time, April 03th, 2025.</b>
              </p>
            </div>
            <div>
              <p className="description">To: Nasretdinov N.T. </p>
              <p className="description">
                Attention: Director of LLC “Yashil Energiya”
              </p>
              <p className="description">
                Address: Tashkent, Yunusobad district, 1st Chyngyz Aitmatov, 2B
              </p>
              <p className="description">
                Email:{" "}
                <Link href={`mailto:aiib@yashil-energiya.uz`}>
                  aiib@yashil-energiya.uz
                </Link>
              </p>
            </div>
          </div>
        )}
      </div>
      <TheFeedback />
    </>
  );
}
