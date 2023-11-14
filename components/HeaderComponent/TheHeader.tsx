"use client";
import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.scss";
import "../../scss/globals.scss";
import { useState } from "react";

export const links = [
  { url: "/", title: "Bosh sahifa" },
  { url: "/about", title: "Kompaniya haqida" },
  { url: "/news", title: "Yangiliklar" },
  { url: "/projects", title: "loyihalar" },
  { url: "/contacts", title: "Kontaktlar" },
];
export const TheHeader = () => {
  const [status, setStatus] = useState(false);

  return (
    <header className={styles.header}>
      {status && (
        <div className={styles.burgerMenu}>
          <div className={styles.burgerLanguage}>
            <button>
              <Image
                src="/language.svg"
                alt="logo"
                width={24}
                height={24}
                priority
              />
            </button>
            <select name="" id="">
              <option value="">Uz</option>
              <option value="">Ru</option>
              <option value="">Eng</option>
            </select>
          </div>
          {links.map(({ url, title }: any) => (
            <Link
              key={title}
              className={styles.burgerLink}
              href={url}
              onClick={() => {
                setStatus(!status);
              }}
            >
              <span className={styles.descr}>{title}</span>
            </Link>
          ))}
        </div>
      )}
      <div className={`container`}>
        <div className={styles.content}>
          <Link href="/">
            <img className={styles.logoIcon} src="/logo.svg" alt="logo" />
          </Link>
          <div className={styles.menuBlock}>
            {links.map(({ url, title }: any) => (
              <Link key={title} className={styles.link} href={url}>
                {title}
              </Link>
            ))}
          </div>

          <div className={styles.bntsBlock}>
            {/* <button className={styles.status}>
              <Image
                src="/search.svg"
                alt="logo"
                width={30}
                height={30}
                priority
              />
            </button> */}
            <button className={styles.burgerBtn}>
              <Image
                src="/menu/burgerIcon.svg"
                alt="logo"
                width={30}
                height={30}
                onClick={() => setStatus(!status)}
                priority
              />
            </button>
          </div>
          {/* Lupa */}
          <div className={styles.language}>
            <button>
              <Image
                src="/language.svg"
                alt="logo"
                width={24}
                height={24}
                priority
              />
            </button>
            <select name="" id="">
              <option value="">Uz</option>
              <option value="">Ru</option>
              <option value="">Eng</option>
            </select>
          </div>
        </div>
      </div>
    </header>
  );
};
