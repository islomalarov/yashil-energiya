"use client";

import { TheHero } from "@/src/components/HeroComponent/TheHero";
import Link from "next/link";
import { useTranslations } from "next-intl";
import s from "./page.module.scss";
import { useState } from "react";
import { TheFeedback } from "@/src/components/FeedbackComponent/TheFeedback";

export default function Jobs2() {
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
            <h2>Position Title: Finance Specialist (Individual Consultant)</h2>
            <div>
              <p className="description">
                <b>References: No. UPDSED-IC-2</b>
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
                Energiya LLC (Project Implementation Entity-PIE) for the
                implementation of the financial management system to record and
                control the expenditure of grant funds and funds of co-financing
                organizations, to ensure appropriate monitoring and provide
                recommendations to the PIE management on issues related to the
                availability and expenditure of financial resources of AIIB and
                the Government of Uzbekistan. The duration of the contract is 12
                months.
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
                  Higher education in accounting, finance, economics or the
                  corresponding field (at least a bachelor's degree, master’s
                  degree could be preferable);
                </li>
                <li>
                  At least three years of experience as a Finance Manager,
                  Finance Specialist, and Finance Consultant who was directly
                  involved in FM and disbursement areas of projects financed by
                  IFIs such as the World Bank, Asian Development Bank and AIIB.
                </li>
                <li>
                  At least five years of work experience in finance or
                  accounting roles with any reputable organizations;
                </li>
                <li>
                  Knowledge of local rules and regulations regarding the
                  implementation of investment projects is highly preferred;
                </li>
                <li>
                  Excellent knowledge of National Accounting Standards and
                  preferably knowledge of International Financial Reporting
                  Standards;
                </li>
                <li>
                  The candidate must be an experienced user of the 1C program
                  and have a high level of computer knowledge;
                </li>
                <li>
                  The candidate must have excellent written and oral skills of
                  the Uzbek and English languages;
                </li>
                <li>
                  Excellent ability to work in a team and independently. Focus
                  on results with the ability to present results in a short
                  time.
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
                <b>The Application Letter</b>, with CV, must be submitted
                electronically in signed pdf format to the following email
                address{" "}
                <b>not later than 15.00 PM Tashkent Time, April 18, 2025.</b>
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
