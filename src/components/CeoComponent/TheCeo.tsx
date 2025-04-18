import "@/scss/globals.scss";
import s from "./TheCeo.module.scss";
import { ceo } from "@/data/ceo";
import { useTranslations } from "next-intl";

export const TheCeo = () => {
  const t = useTranslations("CeoPage");
  return (
    <div className={s.content}>
      {ceo.map(({ id, name, jobTitle, email }: CeoProps) => (
        <div className={s.ceo} key={id}>
          <div>
            <h2 className={s.ceoName}>{name}</h2>
          </div>
          <div>
            <p className={s.description}>{t("jobTitle")}:</p>
            <h3 className={s.title}>{t(jobTitle)}</h3>
          </div>
          <div>
            <p className={s.description}>{t("email")}:</p>
            <h3 className={s.title}>{email}</h3>
          </div>
        </div>
      ))}
    </div>
  );
};
