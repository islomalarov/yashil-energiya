"use client";
import "../../scss/globals.scss";
import styles from "./page.module.scss";
import Image from "next/image";
import Link from "next/link";
import footerLogo from "@/public/logo2.svg";
import { footerMenu, socialLinks } from "@/data/links";

export const TheFooter = () => {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.content}>
          <div className={styles.iconsBlock}>
            <Link href="/">
              <Image src={footerLogo} alt="logo2" />
            </Link>
            <div className={styles.icons}>
              {socialLinks.map(({ url, path }) => (
                <Link href={url} className={styles.social} key={path}>
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
          <div className={styles.linksBlock}>
            {footerMenu.map(
              ({ url, title }: { url: string; title: string }) => (
                <Link key={title} className={styles.link} href={url}>
                  {title}
                </Link>
              )
            )}
          </div>
        </div>
      </div>
      <div className={styles.subFooter}>
        <div className={`${styles.subFooterBlock} container`}>
          <p className={styles.text}>
            “Yashil Energiya” LLC All rights reserved
          </p>
          <p className={styles.text}>
            © Copyright 2023 - Designed by SOS Group
          </p>
        </div>
      </div>
    </footer>
  );
};
