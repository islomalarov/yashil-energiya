import { getTranslations } from "next-intl/server";
import { ArrowRight, Calculator, CircleDollarSign, Send, Zap } from "lucide-react";
import { Link } from "@/i18n/navigation";
import s from "./TheCalculatorCta.module.scss";

export const TheCalculatorCta = async () => {
  const t = await getTranslations("CalculatorCta");

  const points = [
    { icon: Zap, label: t("point1") },
    { icon: CircleDollarSign, label: t("point2") },
    { icon: Send, label: t("point3") },
  ];

  return (
    <section className={s.section} aria-labelledby="calc-cta-title">
      <div className="container">
        <div className={s.panel}>
          <div className={s.copy}>
            <span className={s.eyebrow}>
              <Calculator aria-hidden="true" />
              {t("eyebrow")}
            </span>
            <h2 id="calc-cta-title" className={s.title}>
              {t("title")}
            </h2>
            <p className={s.description}>{t("description")}</p>
            <ul className={s.points}>
              {points.map(({ icon: Icon, label }) => (
                <li key={label} className={s.point}>
                  <Icon aria-hidden="true" />
                  <span>{label}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className={s.action}>
            <Link className={s.button} href="/resources/calculator">
              <span>{t("button")}</span>
              <ArrowRight aria-hidden="true" />
            </Link>
            <span className={s.badge}>{t("badge")}</span>
          </div>
        </div>
      </div>
    </section>
  );
};
