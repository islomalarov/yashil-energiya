"use client";
import { TheFeedback } from "@/src/components/FeedbackComponent/TheFeedback";
import { TheHero } from "@/src/components/HeroComponent/TheHero";
import { useTranslations } from "next-intl";
import s from "./page.module.scss";
import Link from "next/link";
import { useState } from "react";

export default function TendersPage() {
  const t = useTranslations("TendersPage");
  const [language, setLanguage] = useState("eng");

  return (
    <>
      <TheHero title1={t("title")} url1="tenders" />
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
            <h2>ОБЩЕЕ УВЕДОМЛЕНИЕ О ЗАКУПКАХ</h2>
            <div>
              <p className="description">Республика Узбекистан</p>
              <p className="description">
                Распределенная солнечная энергия в Узбекистане
              </p>
              <p className="description">Проект развития</p>
            </div>
            <div>
              <p className="description">ОБЩЕЕ УВЕДОМЛЕНИЕ О ЗАКУПКАХ</p>
              <p className="description">
                Идентификационный номер проекта: P000827
              </p>
            </div>
            <div>
              <p className="description">
                Республика Узбекистан получила Специальный фонд подготовки
                проекта (PPSF), далее именуемый «Грант», в размере,
                эквивалентном 1 700 000 долл. США, от Азиатского банка
                инфраструктурных инвестиций (далее – АБИИ) на подготовительные
                мероприятия по проекту развития государственной распределенной
                солнечной энергетики в Узбекистане и намерена использовать часть
                средств на оплату товаров, работ, неконсультационных услуг и
                консультационных услуг, которые будут закуплены в рамках этого
                гранта.
              </p>
            </div>
            <div>
              <p className="description">
                Мероприятия в рамках гранта будут включать подготовительные
                мероприятия по проекту, в том числе технико-экономическое
                обоснование, экологическую и социальную оценку и подготовку
                экологических и социальных инструментов, юридическую и
                нормативную проверку, подготовку тендерной документации и
                поддержку в тендерном процессе.
              </p>
            </div>
            <div>
              <p className="description">
                Закупки по контрактам, финансируемым АБИИ, будут проводиться в
                соответствии с процедурами, указанными в{" "}
                <i>
                  Директиве АБИИ об инструкциях по закупкам для получателей
                  (июль 2024 г.),
                </i>{" "}
                и открыты для всех соответствующих требованиям фирм и лиц.
              </p>
            </div>
            <div>
              <p className="description">
                Конкретные уведомления о закупках по контрактам, подлежащим
                международному открытому конкурсу, будут публиковаться по мере
                их поступления на внешнем веб-сайте АБИИ и на веб-сайте «Yashil
                Energiya».
              </p>
            </div>
            <div>
              <p className="description">
                Заинтересованные компании и частные лица, имеющие право на
                участие в тендере и желающие рассмотреть возможность
                предоставления товаров, работ, неконсультационных и
                консультационных услуг для вышеупомянутого проекта, или те, кому
                требуется дополнительная информация, должны связаться с
                агентством, реализующим проект, по указанному ниже адресу:
              </p>
            </div>
            <div>
              <p className="description">
                <b>Насретдинов Н.Т.</b>
              </p>
              <p className="description">Директор ООО «Yashil Energiya»</p>
              <p className="description">
                2Б, ул. Чингиза Айтматова, Юнусабадский район, Ташкент,
                Узбекистан
              </p>
              <p className="description">
                электронная почта:{" "}
                <Link href={`mailto:x.alisherov@yashil-energiya.uz`}>
                  x.alisherov@yashil-energiya.uz
                </Link>
              </p>
              <p className="description">
                сайт:{" "}
                <Link href={`https://www.yashil-energiya.uz`} target="_blank">
                  https://www.yashil-energiya.uz
                </Link>
              </p>
            </div>
          </div>
        ) : (
          <div className={s.content}>
            <h2>GENERAL PROCUREMENT NOTICE</h2>
            <div>
              <p className="description">Republic of Uzbekistan</p>
              <p className="description">
                Uzbekistan Public Distributed Solar Energy
              </p>
              <p className="description">Development Project</p>
            </div>
            <div>
              <p className="description">GENERAL PROCUREMENT NOTICE</p>
              <p className="description">Project ID No.: P000827</p>
            </div>
            <div>
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
            </div>
            <div>
              <p className="description">
                The activities under the Grant will include project preparatory
                activities, including feasibility study, environmental and
                social assessment and preparation of E&S instruments, legal and
                regulatory due diligence, preparation of bidding documents, and
                support with the tender process.
              </p>
            </div>
            <div>
              <p className="description">
                Procurement of contracts financed by the AIIB will be conducted
                through the procedures as specified in{" "}
                <i>
                  through the procedures as specified in AIIB Directive on
                  Procurement Instructions for Recipients (July 2024) through
                  the procedures as specified in
                </i>
                , and is open to all eligible firms and individuals.
              </p>
            </div>
            <div>
              <p className="description">
                Specific procurement notices for contracts subject to
                international open competitive tender will be announced, as they
                become available, on the AIIB’s external website and on the
                website of Yashil Energiya.
              </p>
            </div>
            <div>
              <p className="description">
                Interested eligible firms and individuals who would wish to be
                considered for the provision of goods, works, non-consulting
                services and consulting services for the abovementioned project,
                or those requiring additional information, should contact the
                project implementing agency at the address below:
              </p>
            </div>
            <div>
              <p className="description">
                <b>N.T. Nasretdinov </b>
              </p>
              <p className="description">Director of LLC "Yashil Energiya"</p>
              <p className="description">
                2B, Chingiz aytmatov str., Yunusabad district, Tashkent city,
                Uzbekistan
              </p>
              <p className="description">
                e-mail:{" "}
                <Link href={`mailto:x.alisherov@yashil-energiya.uz`}>
                  x.alisherov@yashil-energiya.uz
                </Link>
              </p>
              <p className="description">
                website:{" "}
                <Link href={`https://www.yashil-energiya.uz`} target="_blank">
                  https://www.yashil-energiya.uz
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
