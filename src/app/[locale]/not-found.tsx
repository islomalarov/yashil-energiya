import { Link } from "@/i18n/navigation";
import { getTranslations } from "next-intl/server";
import s from "./not-found.module.scss";

export default async function NotFound() {
  const t = await getTranslations("NotFoundPage");

  return (
    <section className={s.notFound}>
      <div className="container">
        <div className={s.content}>
          <p className={s.code}>404</p>
          <h1 className={s.title}>{t("title")}</h1>
          <p className={s.description}>{t("description")}</p>
          <Link className={s.link} href="/">
            {t("home")}
          </Link>
        </div>
      </div>
    </section>
  );
}
