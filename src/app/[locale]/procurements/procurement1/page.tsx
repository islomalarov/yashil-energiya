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

type Lang = "ru" | "en" | "uz";

export default function TenderPage() {
  const t = useTranslations("TendersPage");
  const pathname = usePathname();
  const tenderNumber = Number(pathname.match(/procurement(\d+)/)?.[1]);
  const record = tenders.find((tender) => tender.id === tenderNumber);
  const { tendersRu = [], tendersEn = [], tendersUz = [] } = record ?? {};
  const locale = useLocale();
  const lang: Lang = locale === "ru" ? "ru" : locale === "uz" ? "uz" : "en";

  const currentName =
    {
      ru: record?.projectNameRu,
      en: record?.projectNameEn,
      uz: record?.projectNameUz,
    }[lang] ??
    record?.projectNameEn ??
    t("generalLabel");

  const tenderList = { ru: tendersRu, en: tendersEn, uz: tendersUz }[lang];

  const notice: Record<Lang, React.ReactNode> = {
    ru: (
      <article className={s.doc}>
        <p className="description">
          СП ООО «Yashil Energiya» в рамках своей уставной деятельности и
          реализуемых программ развития планирует использование финансовых
          средств на оплату товаров, работ, неконсультационных и
          консультационных услуг, необходимых для подготовки и реализации
          проектов в сфере распределённой солнечной энергетики.
        </p>
        <p className="description">
          Планируемые мероприятия включают, в том числе, проведение
          технико-экономических обоснований, экологических и социальных оценок,
          разработку соответствующих экологических и социальных инструментов,
          правовой и нормативной экспертизы, подготовку тендерной документации, а
          также сопровождение закупочных процедур.
        </p>
        <p className="description">
          Закупки товаров, работ, неконсультационных и консультационных услуг
          будут осуществляться в соответствии с действующими внутренними
          процедурами компании, а также с учётом требований законодательства
          Республики Узбекистан, принципов прозрачности, открытой конкуренции и
          равного доступа для потенциальных участников.
        </p>
        <p className="description">
          Информация о проводимых закупочных процедурах и конкурсах будет
          публиковаться на официальном веб-сайте СП ООО «Yashil Energiya» по мере
          их объявления.
        </p>
        <p className="description">
          Заинтересованные компании и физические лица, обладающие необходимой
          квалификацией и опытом, и желающие рассмотреть возможность участия в
          поставке товаров, выполнении работ или оказании услуг, а также лица,
          заинтересованные в получении дополнительной информации, могут обращаться
          в СП ООО «Yashil Energiya» по контактным данным, указанным на
          официальном сайте компании.
        </p>
      </article>
    ),
    en: (
      <article className={s.doc}>
        <p className="description">
          JV LLC “Yashil Energiya”, within the scope of its statutory activities
          and implemented development programs, plans to utilize financial
          resources for the procurement of goods, works, non-consulting services,
          and consulting services required for the preparation and implementation
          of projects in the field of distributed solar energy.
        </p>
        <p className="description">
          The planned activities include, inter alia, the preparation of
          feasibility studies, environmental and social assessments, development
          of relevant environmental and social instruments, legal and regulatory
          due diligence, preparation of tender documentation, as well as support
          throughout the procurement process.
        </p>
        <p className="description">
          Procurement of goods, works, non-consulting services, and consulting
          services will be carried out in accordance with the Company’s internal
          procedures, taking into account the requirements of the legislation of
          the Republic of Uzbekistan, as well as the principles of transparency,
          open competition, and equal access for potential participants.
        </p>
        <p className="description">
          Information on ongoing procurement procedures and tenders will be
          published on the official website of JV LLC “Yashil Energiya” as they
          are announced.
        </p>
        <p className="description">
          Interested companies and individuals possessing the required
          qualifications and experience, and wishing to consider participation in
          the supply of goods, execution of works, or provision of services, as
          well as those seeking additional information, may contact JV LLC “Yashil
          Energiya” using the contact details provided on the Company’s official
          website.
        </p>
      </article>
    ),
    uz: (
      <article className={s.doc}>
        <p className="description">
          «Yashil Energiya» QK MChJ o‘zining ustav faoliyati va amalga
          oshirilayotgan rivojlanish dasturlari doirasida taqsimlangan quyosh
          energetikasi sohasidagi loyihalarni tayyorlash va amalga oshirish uchun
          zarur bo‘lgan tovarlar, ishlar, nokonsalting va konsalting xizmatlarini
          to‘lash uchun moliyaviy mablag‘lardan foydalanishni rejalashtirmoqda.
        </p>
        <p className="description">
          Rejalashtirilgan tadbirlar, jumladan, texnik-iqtisodiy asoslashlar,
          ekologik va ijtimoiy baholashlarni o‘tkazish, tegishli ekologik va
          ijtimoiy vositalarni ishlab chiqish, huquqiy va me’yoriy ekspertiza,
          tender hujjatlarini tayyorlash, shuningdek xarid protseduralarini
          qo‘llab-quvvatlashni o‘z ichiga oladi.
        </p>
        <p className="description">
          Tovarlar, ishlar, nokonsalting va konsalting xizmatlarini xarid qilish
          kompaniyaning amaldagi ichki protseduralariga muvofiq, shuningdek
          O‘zbekiston Respublikasi qonunchiligi talablari, shaffoflik, ochiq
          raqobat va potentsial ishtirokchilar uchun teng imkoniyat tamoyillarini
          hisobga olgan holda amalga oshiriladi.
        </p>
        <p className="description">
          O‘tkazilayotgan xarid protseduralari va tanlovlar to‘g‘risidagi
          ma’lumotlar e’lon qilinishiga qarab «Yashil Energiya» QK MChJ rasmiy
          veb-saytida joylashtiriladi.
        </p>
        <p className="description">
          Zarur malaka va tajribaga ega bo‘lgan hamda tovarlar yetkazib berish,
          ishlarni bajarish yoki xizmatlar ko‘rsatishda ishtirok etish imkoniyatini
          ko‘rib chiqmoqchi bo‘lgan manfaatdor kompaniyalar va jismoniy shaxslar,
          shuningdek qo‘shimcha ma’lumot olishdan manfaatdor shaxslar «Yashil
          Energiya» QK MChJ ga kompaniyaning rasmiy saytida ko‘rsatilgan aloqa
          ma’lumotlari orqali murojaat qilishlari mumkin.
        </p>
      </article>
    ),
  };

  const contact: Record<Lang, { name: string; role: string; address: string }> =
    {
      ru: {
        name: "Насретдинов Н.Т.",
        role: "Директор СП ООО «Yashil Energiya»",
        address:
          "2Б, ул. Чингиза Айтматова, Юнусабадский район, Ташкент, Узбекистан",
      },
      en: {
        name: "N.T. Nasretdinov",
        role: "Director of JV “Yashil Energiya” LLC",
        address:
          "2B, Bodomzor str., Yunusabad district, Tashkent city, Uzbekistan",
      },
      uz: {
        name: "Nasretdinov N.T.",
        role: "«Yashil Energiya» QK MChJ direktori",
        address:
          "2B, Chingiz Aytmatov ko‘chasi, Yunusobod tumani, Toshkent, O‘zbekiston",
      },
    };

  return (
    <>
      <TheHero title1={t("title")} url1="procurements" />
      <div className="container">
        <ProcurementBreadcrumbs current={currentName} />
        <div className={s.content}>
          <ProcurementSubNav />

          <TheReveal as="section" className={s.notice} motionKey="notice">
            <h2 className={s.sectionTitle} id="section1">
              {t("noticeTitle")}
            </h2>
            <div className={s.accentLine} aria-hidden="true" />

            {notice[lang]}

            <ContactPlaque
              name={contact[lang].name}
              role={contact[lang].role}
              address={contact[lang].address}
              email="marketing@yashil-energiya.uz"
              website="https://www.yashil-energiya.uz"
            />
          </TheReveal>

          <section className={s.tenders}>
            <h2 className={s.sectionTitle} id="section2">
              {t("tendersTitle")}
            </h2>
            <div className={s.accentLine} aria-hidden="true" />
            <TendersList tenders={tenderList} />
          </section>
        </div>
      </div>
    </>
  );
}
