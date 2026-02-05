import "@/scss/globals.scss";
import s from "./TheCeo.module.scss";
import { Manager, ManagerService } from "services/managers.service";
import { getLocale, getTranslations } from "next-intl/server";

export const TheCeo = async () => {
  const t = await getTranslations("CeoPage");
  const locale = await getLocale();
  const data = await ManagerService.getAllManagers(locale);
  if (!data) {
    return <div>{t("error")}</div>;
  }
  return (
    <div className={s.content}>
      {data.managers.map(({ id, name, jobTitle, email, queue }: Manager) => (
        <div className={s.ceo} key={id}>
          <div>
            <h2 className={s.ceoName}>{name}</h2>
          </div>
          <div>
            <p className={s.description}>{t("jobTitle")}:</p>
            <h3 className={s.title}>{jobTitle}</h3>
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
