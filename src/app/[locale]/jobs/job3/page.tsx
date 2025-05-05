"use client";

import { TheHero } from "@/src/components/HeroComponent/TheHero";
import Link from "next/link";
import { useTranslations } from "next-intl";
import s from "./page.module.scss";
import { useState } from "react";
import { TheFeedback } from "@/src/components/FeedbackComponent/TheFeedback";

export default function Jobs3() {
  const t = useTranslations("JobsPage");
  const [language, setLanguage] = useState("eng");
  return (
    <>
      <TheHero title1={t("title")} url1="jobs" />
      <div className={`${s.container} container`}>
        {/* <div className={s.languageBtn}>
          <select
            name=""
            id=""
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
          >
            <option value="ru">Ru</option>
            <option value="eng">Eng</option>
          </select>
        </div> */}
        {language === "ru" ? (
          <div className={s.content}>
            <h2>
              Позиция: Специалист по финансам (индивидуальный консультант)
            </h2>
            <div>
              <p className="description">
                <b>Номер конкурса: № UPDSED-IC-2</b>
              </p>
            </div>

            <div>
              <p className="description">
                Министерство энергетики Республики Узбекистан получило
                Специальный фонд подготовки проекта (PPSF), далее именуемый
                «Грант», в размере эквивалента 1 700 000 долларов США от
                Азиатского банка инфраструктурных инвестиций (AIIB) на
                подготовительные мероприятия по проекту «Развитие
                государственной распределенной солнечной энергетики в
                Узбекистане» (UPDSED) и намеревается к применять часть из
                выручка за консультационные услуги.
              </p>
            </div>
            <div>
              <p className="description">
                Основной целью консультационных услуг является оказание
                поддержки ООО «Яшил Энергия» (Организация по реализации проекта
                - СИП) по внедрению системы финансового управления для учета и
                контроля расходования грантовых средств и средств
                софинансирующих организаций, обеспечения соответствующего
                мониторинга и предоставления рекомендаций руководству СИП по
                вопросам, связанным с наличием и расходованием финансовых
                ресурсов АБИИ и Правительства Узбекистана. продолжительность
                Срок действия договора составляет 12 месяцев.
              </p>
            </div>
            <div>
              <p className="description">
                ООО «Яшил Энергия» (Организация по реализации проекта-ППП) в
                рамках Министерство энергетики Республика из Узбекистан в
                настоящее время приглашает соответствующих требованиям
                индивидуальных специалистов/экспертов («индивидуальный
                консультант») подать заявку на вышеуказанную должность.
                Интересно Консультанты должен предоставлять информация
                демонстрируя что они есть необходимый квалификации и
                соответствующий опыт к выполнять Услуги.
              </p>
            </div>
            <div>
              <p className="description">
                Заинтересованные консультанты должен предоставлять достаточный
                информация ( например, резюме, сертификаты и т. д.), указывающая
                что они являются квалифицированный к выполнять услуги,
                демонстрируя следующую квалификацию и опыт:
              </p>
            </div>
            <div>
              <ul className={s.list}>
                <li>
                  Высшее образование в области бухгалтерского учета, финансов,
                  экономики или соответствующей области (минимум степень
                  бакалавра, степень магистра будет предпочтительнее);
                </li>
                <li>
                  Не менее трех лет опыта работы в качестве финансового
                  менеджера, финансового специалиста и финансового консультанта,
                  непосредственно занимающегося вопросами финансового управления
                  и распределения средств в проектах, финансируемых такими
                  международными финансовыми институтами, как Всемирный банк,
                  Азиатский банк развития и АБИИ.
                </li>
                <li>
                  Не менее пяти лет опыта работы в сфере финансов или
                  бухгалтерского учета в любой авторитетной организации;
                </li>
                <li>
                  Знание местных правил и положений, касающихся реализации
                  инвестиционных проектов, приветствуется;
                </li>
                <li>
                  Отличное знание национальных стандартов бухгалтерского учета и
                  желательно знание международных стандартов финансовой
                  отчетности;
                </li>
                <li>
                  Кандидат должен быть опытным пользователем программы 1С и
                  иметь высокий уровень знаний компьютера;
                </li>
                <li>
                  Кандидат должен обладать отличными письменными и устными
                  навыками узбекского и английского языков;
                </li>
                <li>
                  Отличная способность работать в команде и самостоятельно.
                  Нацеленность на результат с возможностью представления
                  результатов в короткие сроки.
                </li>
              </ul>
            </div>
            <div>
              <p className="description">
                Отбор проводится в соответствии с Директива АБИИ по закупочным
                инструкциям для получателей (26 июля 2024 г.) ("Приобретение
                Директива», доступ к которой можно получить по адресу
                <Link
                  href="https://www.aiib.org/en/policies-strategies/_download/operational-directive/AIIB-Directive-on-Procurement-Instructions-for-Recipients-July-26-2024.pdf "
                  target="_blank"
                >
                  {" "}
                  https://www.aiib.org/en/policies-strategies/_download/operational-directive/AIIB-Directive-on-Procurement-Instructions-for-Recipients-July-26-2024.pdf
                </Link>
                .
              </p>
              <p className="description">
                Консультант будет выбран в соответствии с методом открытого
                конкурсного отбора индивидуальных консультантов (OCSIC). набор
                вне в Директива о закупках.
              </p>
              <p className="description">
                Заинтересованный консультант может ознакомиться с проектом
                Технического задания по адресу:
                <Link
                  href="https://docs.google.com/document/d/1-ACtDK1eEf8xDZsaEsIk1Wtt75ihkHEg/edit?usp=sharing&ouid=110072539268674771345&rtpof=true&sd=true"
                  target="_blank"
                >
                  {" "}
                  https://docs.google.com/document/d/1-ACtDK1eEf8xDZsaEsIk1Wtt75ihkHEg/edit?usp=sharing&ouid=110072539268674771345&rtpof=true&sd=true
                </Link>
              </p>
            </div>
            <div>
              <p className="description">
                <b>Письмо</b> - заявление с резюме должно быть подано в
                электронном виде. в подписанном pdf-файле формат к следующий
                электронная почта адрес{" "}
                <b>
                  электронная почта адрес не позже чем 15.00 премьер-министр
                  Ташкентское время, 18 апреля 2025 года. электронная почта
                  адрес{" "}
                </b>
              </p>
            </div>
            <div>
              <p className="description">Кому: Насретдинов Н.Т.</p>
              <p className="description">
                Вниманию: Директор ООО “Yashil Energiya”
              </p>
              <p className="description">
                Адрес: г. Ташкент, Юнусабадский район, 1-я Чынгызская Айтматова
                , 2Б
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
              National Environmental and Social Specialist (Individual
              Consultant)
            </h2>
            <div>
              <p className="description">
                <b>References: No. UPDSED-IC-3</b>
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
                The main aim of the consultancy services is to support Yashil
                Energiya LLC (Project Implementation Entity-PIE) and the Project
                Manager in monitoring and ensuring that all project-related
                instruments and activities adhere to the requirements of the
                AIIB’s Environment and Social Policy (ESP) and national
                legislation and regulations.
              </p>
            </div>
            <div>
              <p className="description">
                In achieving the main aim of the assignment, the primary
                objectives of the consulting services are as follows, but not
                limited to:
              </p>
            </div>
            <div>
              <p className="description">
                a) Review AIIB’s ESP and determine the environmental and social
                standards that will apply to the Project;
              </p>
            </div>
            <div>
              <p className="description">
                b) Identify and review the environment and health and safety
                legislation adopted in the Republic of Uzbekistan that are
                relevant to the Project, including but not limited to
                occupational health and safety laws and waste management
                regulations;
              </p>
            </div>
            <div>
              <p className="description">
                c) Ensure and guide the contractors/suppliers to prepare the
                site-specific Environmental and Social Management Plans (ESMPs),
                ensuring that the ESMPs/ESMP Checklist, subproject-specific
                Stakeholder Engagement Plans (SEPs), Occupational Health and
                Safety (OHS) Plan, including relevant trainings and GRM are
                prepared according to AIIB’s Environmental and Social Framework
                and relevant national/international regulations;
              </p>
            </div>
            <div>
              <p className="description">
                d) Supervise and monitor the environmental and social (E&S)
                performance of the Project activities against agreed E&S
                objectives and risk management measures. This includes
                monitoring the implementation of the adopted site-specific ESMPs
                and ensuring that all project activities are conducted in
                compliance with the ESMPs/ESMP Checklist, subproject-specific
                SEPs, and OHS Plan and relevant national/international
                regulations;
              </p>
            </div>
            <div>
              <p className="description">
                e) Assist the PIE and the Project Manager in coordinating with
                various government agencies to ensure that all necessary
                licenses or environmental permits are obtained, and all E&S
                issues are addressed;
              </p>
            </div>
            <div>
              <p className="description">
                f) Conduct site visits for the assessment, supervision and
                monitoring of the E&S issues of the Project;
              </p>
            </div>
            <div>
              <p className="description">
                g) Participate in AIIB`s preparation and supervision missions,
                if necessary, and submit special and technical progress reports
                from time to time to the AIIB, as necessary;
              </p>
            </div>
            <div>
              <p className="description">
                h) Coordinate with AIIB Environmental and Social Specialists
                regarding E&S issues of the AIIB-funded projects and timely
                inform about these issues and mitigation plans/results if any;
              </p>
            </div>
            <div>
              <p className="description">
                i) Review E&S documents/reports (such as contractors’
                site-specific ESMPs, monitoring reports, etc.), prepare
                comments/recommendations to the PIE’s management and relevant
                stakeholders, and take necessary actions to ensure the required
                quality of these documents/reports before submitting to the
                Bank;
              </p>
            </div>
            <div>
              <p className="description">
                j) Support the PIE to understand and follow AIIB ESF
                requirements throughout the Project implementation;
              </p>
            </div>
            <div>
              <p className="description">
                k) Support the PIE and the Project Manager in the establishment
                and monitoring ES ES-related grievances submitted through
                project-specific GRM, and prepare relevant reports in compliance
                with AIIB ESP;
              </p>
            </div>
            <div>
              <p className="description">
                l) Provide quality and timely input to the PIE’s regular project
                implementation progress reports on the project’s E&S compliance
                status, including any incidents or non-compliance, as necessary;
              </p>
            </div>
            <div>
              <p className="description">
                m) Facilitate stakeholder engagement processes, including public
                consultations, to ensure transparency and community
                participation in project planning and implementation;
              </p>
            </div>
            <div>
              <p className="description">
                n) Ensure establishment and effective implementation of the
                project-specific Grievance Redress Mechanisms (for the
                communities, CSOs, laborers working with the Contractors, and
                other stakeholders) and ensure the timely consideration of
                complaints handling in accordance with the established
                deadlines, and local/international regulation, if any; and
              </p>
            </div>
            <div>
              <p className="description">
                o) Perform any other tasks assigned by the Project Manager
                consistent with the Project’s objectives, expected results, and
                in line with this ToR.
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
                  Higher education in ecology, environmental engineering, or
                  other corresponding fields, and demonstrable qualifications in
                  social development.
                </li>
                <li>
                  At least 10 years of total, and at least 5 years of practical
                  experience in ESIAs, ESMPs, E&S safeguards, and compliance
                  monitoring in investment projects financed by IFIs. Prior
                  experience in AIIB projects or other IFIs will be an
                  advantage.
                </li>
                <li>
                  The specialist should have experience in land acquisition and
                  public consultations and good knowledge of E&S safeguard
                  requirements of IFIs and the national regulations of
                  Uzbekistan.
                </li>
                <li>
                  Computer skills: Experienced user of Windows programs (MS
                  Word, Excel, etc.).
                </li>
                <li>
                  Languages: Russian and / or Uzbek language (required), good
                  English speaking and writing skills.
                </li>
              </ul>
            </div>
            <div>
              <p className="description">
                The selection is conducted in accordance with AIIB’s Directive
                on Procurement Instructions for Recipients (July 26, 2024)
                (“Procurement Directive”, which can be accessed at
                <Link
                  href="https://www.aiib.org/en/policies-strategies/_download/operational-directive/AIIB-Directive-on-Procurement-Instructions-for-Recipients-July-26-2024.pdf"
                  target="_blank"
                >
                  {" "}
                  https://www.aiib.org/en/policies-strategies/_download/operational-directive/AIIB-Directive-on-Procurement-Instructions-for-Recipients-July-26-2024.pdf
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
                  href="https://docs.google.com/document/d/1-5WAEU8JVJU9FU19RRmdbACCIrVo5lpa/edit?usp=sharing&ouid=107370825167187050872&rtpof=true&sd=true"
                  target="_blank"
                >
                  {" "}
                  https://docs.google.com/document/d/1-5WAEU8JVJU9FU19RRmdbACCIrVo5lpa/edit?usp=sharing&ouid=107370825167187050872&rtpof=true&sd=true
                </Link>
              </p>
            </div>
            <div>
              <p className="description">
                <b>The Application Letter</b>, with CV, must be submitted
                electronically in signed pdf format to the following email
                address <b>not later than 3 PM Tashkent Time, 16th May, 2025</b>
              </p>
            </div>
            <div>
              <p className="description">To: Nasretdinov N.T.</p>
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
