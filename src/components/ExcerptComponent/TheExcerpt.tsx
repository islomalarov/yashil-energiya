import "@/scss/globals.scss";
import { FunctionComponent } from "react";
import { useTranslations } from "next-intl";
interface TheExcerptProps {}

const TheExcerpt: FunctionComponent<TheExcerptProps> = () => {
  const t = useTranslations("AboutPage");
  const goals = ["goalsTitle", "goals1", "goals2", "goals3"] as const;
  return (
    <>
      <p className="description">{t("content")}</p>
      {goals.map((key) => (
        <p key={key} className="description">
          {t(`${key}.title`)}
        </p>
      ))}
    </>
  );
};

export default TheExcerpt;
