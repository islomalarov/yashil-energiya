"use client";

import "@/scss/globals.scss";
import styles from "./TheFooter.module.scss";
import Image from "next/image";
import { Link } from "@/src/i18n/navigation";
import footerLogo from "@/public/logo2.svg";
import { socialLinks } from "@/data/links";
import { useTranslations } from "next-intl";

export const TheFooter = () => {
  const t = useTranslations("Header");

  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.content}>
          <div className={styles.logoBlock}>
            <Link href="/">
              <Image src={footerLogo} alt="logo2" />
            </Link>
          </div>
          <div className={styles.socialLinks}>
            {socialLinks.map(({ url, path }) => (
              <Link href={url} className={styles.socialLink} key={path}>
                <Image
                  className={styles.icon}
                  src={path}
                  alt="logo"
                  width={40}
                  height={40}
                  priority
                />
              </Link>
            ))}
          </div>
        </div>
      </div>
      <div className={styles.subFooter}>
        <p className={styles.text}>“Yashil Energiya” LLC All rights reserved</p>
      </div>
    </footer>
  );
};
