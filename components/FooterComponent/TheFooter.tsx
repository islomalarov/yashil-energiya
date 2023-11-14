"use client";
import Image from "next/image";
import "../../scss/globals.scss";
import styles from "./page.module.scss";
import Link from "next/link";
import { links } from "../HeaderComponent/TheHeader";

export const TheFooter = () => {
  const socialLinks = [
    {
      url: "",
      path: "/insta.svg",
    },
    {
      url: "",
      path: "/face.svg",
    },
    {
      url: "",
      path: "/tg.svg",
    },
  ];
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.content}>
          <div className={styles.iconsBlock}>
            <Link href="/">
              <Image
                src="/logo2.svg"
                alt="logo"
                width={220}
                height={91}
                priority
              />
            </Link>
            {/* <div className={styles.icons}>
              {socialLinks.map(({ url, path }) => (
                <Link href={url} className={styles.social}>
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
            </div> */}
          </div>
          <div className={styles.linksBlock}>
            {links.map(({ url, title }: any) => (
              <Link key={title} className={styles.link} href={url}>
                {title}
              </Link>
            ))}
          </div>
        </div>
      </div>
      <div className={styles.subFooter}>
        <div className={`${styles.subFooterBlock} container`}>
          <p className={styles.text}>“Yashil Energiya” All rights reserved</p>
          <p className={styles.text}>
            © Copyright 2023 - Web developed by SOS Group
          </p>
        </div>
      </div>
    </footer>
  );
};
