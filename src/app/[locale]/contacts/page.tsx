
import { TheHero } from "@/components/HeroComponent/TheHero";
import { TheForm } from "@/components/FormComponent/TheForm";
import s from "./page.module.scss";
import { getLocale, getTranslations } from "next-intl/server";

const departments = [
  {
    department: "department1",
    phone: "+998 90 830-31-18",
    mail: "finance@yashil-energiya.uz",
  },
  {
    department: "department2",
    phone: "+998 90 830-51-67",
    mail: "procurement@yashil-energiya.uz",
  },
  {
    department: "department3",
    phone: "+998 90 830-31-19",
    mail: "commercial@yashil-energiya.uz",
  },
];

const mapSrc =
  "https://www.google.com/maps?q=Yashil%20Energiya%2C%20Tashkent%2C%20Yunusabad%20district%2C%20Bodomzor%20street%202B&z=17&output=embed&hl={locale}";

export default async function Contacts() {
  const locale = await getLocale();
  const t = await getTranslations("ContactsPage");
  const mapLocale = locale === "uz" ? "uz" : locale;

  return (
    <>
      <TheHero title1={t("title")} url1="contacts" />
      <div className="container">
        <div className={s.content}>
          <div className={s.map}>
            <div className={s.companyInfo}>
              <h1>{t("title1")}</h1>
              <div>
                <div className={s.description}>{t("address")}:</div>
                <div className={s.info}>{t("address1")}</div>
              </div>
              <div>
                <div className={s.description}>{t("phone")}:</div>
                <div className={s.info}>+998 55-514-88-44</div>
              </div>
              <div>
                <div className={s.description}>{t("email")}:</div>
                <div className={s.info}>info@yashil-energiya.uz</div>
              </div>
            </div>
            <div className={s.frameBlock}>
              <iframe
                className={s.frame}
                src={mapSrc.replaceAll("{locale}", mapLocale)}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={t("mapFrameTitle")}
              />
            </div>
          </div>
          <div className={s.departments}>
            {departments.map(({ department, phone, mail }) => (
              <div className={s.department} key={phone}>
                <h3 className={s.title}>{t(`${department}`)}</h3>
                <div>
                  {/* <div className={s.description}>{t("phone")}:</div> */}
                  {/* <div className={s.info}>{phone}</div> */}
                </div>
                <div>
                  <div className={s.description}>{t("email")}:</div>
                  <div className={s.info}>{mail}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className={s.main}>
        <div className="container">
          <div className={s.block}>
            <TheForm />
          </div>
        </div>
      </div>
    </>
  );
}
