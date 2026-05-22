import { Link } from "@/i18n/navigation";
import { getTranslations } from "next-intl/server";
import { NotFoundBackButton } from "@/components/NotFoundBackButton/NotFoundBackButton";
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
          <div className={s.actions}>
            <NotFoundBackButton className={s.secondaryAction} label={t("back")} />
            <Link className={s.primaryAction} href="/">
              {t("home")}
            </Link>
          </div>
          <nav className={s.quickLinks} aria-label={t("quickLinksLabel")}>
            <Link href="/solarpanels">{t("projects")}</Link>
            <Link href="/contacts">{t("contacts")}</Link>
            <Link href="/">{t("homeShort")}</Link>
          </nav>
        </div>
      </div>
    </section>
  );
}
