import "@/scss/globals.scss";
import { TheHero } from "@/src/components/HeroComponent/TheHero";
import { TheFeedback } from "@/src/components/FeedbackComponent/TheFeedback";
import styles from "./page.module.scss";
import { useTranslations } from "next-intl";
import { TheMap } from "@/src/components/MapComponent/TheMap";

export default function SolarPanels() {
  const t = useTranslations("SolarPanelsPage");
  const systems = ["system1", "system2", "system3"] as const;

  return (
    <>
      <TheHero title1={t("heroTitle")} url1="solarPanels" />
      <div className="container">
        <div>
          <h1>Quyosh fotoelektr stansiyalari</h1>
          <p className="description">
            Hozirgi kunda quyosh fotoelektr stansiyalari (QFES) dunyoning
            ko‘plab mamlakatlarida muhim energiya manbai bo‘lib bormoqda. Ular:
          </p>
          <ul className="description">
            <li>
              Atrof-muhitga zarar yetkazmaydi (toza energiya manbai
              hisoblanadi).
            </li>
            <li>Neft, gaz kabi yoqilg‘ilarga qaramlikni kamaytiradi.</li>
            <li>Elektr energiyasi narxini pasaytirishga yordam beradi.</li>
          </ul>
          <p className="description">
            Ko‘plab rivojlangan davlatlar (AQSh, Xitoy, Germaniya) quyosh
            energiyasidan keng foydalanmoqda. Masalan, Xitoy dunyodagi eng yirik
            quyosh elektr stansiyalariga ega.
          </p>
          <p className="description">
            O‘zbekistonda ham quyosh energiyasiga katta e’tibor berilmoqda,
            chunki mamlakatda quyoshli kunlar soni yiliga 300 kundan ortiq. Bu
            quyosh elektr stansiyalarini rivojlantirish uchun katta imkoniyat
            yaratadi. O‘zbekistonda quyosh energiyasidan kengroq foydalanish
            kelajakda elektr ta’minotini yaxshilash va energiya xarajatlarini
            kamaytirishga yordam beradi.
          </p>
        </div>
        <div
          className=""
          style={{
            display: "grid",
            justifyItems: "center",
          }}
        >
          <h2>Quyosh fotoelektr stansiyalari 3 xil asosiy turga bo‘linadi:</h2>
          {/* <p className="description">{t("content")}</p> */}
          <br />
          {systems.map((system) => (
            <p className="description" key={system}>
              <b>{t(`${system}.title`)}</b> - {t(`${system}.description`)}
            </p>
          ))}
        </div>
        <div
          style={{
            display: "grid",
            justifyItems: "center",
          }}
        >
          <h2>“Yashil Energiya” MChJ ning mavjud QFES lari haqida ma’lumot</h2>
          <TheMap />
        </div>
        <div>
          <p className="description">
            “Yashil Energiya” MChJ 2023-yildan buyon O’zbekiston Respublikasi
            hududida joylashgan ijtimoiy soha obyektlariga QFES o’rganish bilan
            shug’ullanib kelmoqda. Quyidagi diagrammada jamiyatga tegishli QFES
            larning umumiy quvvatini o’zgarishini ko’rishingiz mumkin.
          </p>
        </div>
      </div>
      <TheFeedback />
    </>
  );
}
