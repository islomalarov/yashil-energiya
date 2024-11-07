import "@/scss/globals.scss";

import Image from "next/image";
import styles from "./page.module.scss";
import { useTranslations } from "next-intl";

export const TheAdvantages = () => {
  const t = useTranslations("TheAdvantages");
  const advantages = [
    "advantage1",
    "advantage2",
    "advantage3",
    "advantage4",
  ] as const;
  return (
    <div className={styles.main}>
      <div className="container">
        <h3 className={styles.title}>{t("title")}</h3>
        <div className={styles.advBlock}>
          {advantages.map((advantage: any) => (
            <div className={styles.adv} key={advantage}>
              <Image
                src={`/${t(`${advantage}.src`)}`}
                alt={t(`${advantage}.description`)}
                width={100}
                height={100}
              />
              <p className={styles.description}>
                {t(`${advantage}.description`)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
