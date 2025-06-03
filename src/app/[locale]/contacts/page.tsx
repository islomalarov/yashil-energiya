import "@/scss/globals.scss";
import { TheHero } from "@/src/components/HeroComponent/TheHero";
import { TheForm } from "@/src/components/FormComponent/TheForm";
import s from "./page.module.scss";
import { useTranslations } from "next-intl";

const departments = [
  {
    department: "department1",
    phone: "+998 90 830-31-18",
    mail: "info@yashil-energiya.uz",
  },
  {
    department: "department2",
    phone: "+998 90 830-51-67",
    mail: "marketing@yashil-energiya.uz",
  },
  {
    department: "department3",
    phone: "+998 90 830-31-19",
    mail: "info@yashil-energiya.uz",
  },
];

export default function Contacts() {
  const t = useTranslations("ContactsPage");

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
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d374.5128363669132!2d69.2921773123979!3d41.32838029135691!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38aef4ca6a3270d1%3A0xd5e89052d31aac5a!2z0JzQtdC20LTRg9C90LDRgNC-0LTQvdGL0Lkg0LjQvdGB0YLQuNGC0YPRgiDRgdC-0LvQvdC10YfQvdC-0Lkg0Y3QvdC10YDQs9C40Lg!5e0!3m2!1sru!2s!4v1740981067424!5m2!1sru!2s"
                loading="lazy"
                frameBorder="none"
              ></iframe>
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
