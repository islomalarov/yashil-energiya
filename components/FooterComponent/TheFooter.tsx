import Image from "next/image";
import "../../scss/globals.scss";
import styles from "./page.module.scss";
import Link from "next/link";

export const TheFooter = () => {
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
            <div className={styles.icons}>
              <Link className={styles.social} href="">
                <Image
                  className={styles.icon}
                  src="/insta.svg"
                  alt="logo"
                  width={22}
                  height={22}
                  priority
                />
              </Link>
              <Link className={styles.social} href="">
                <Image
                  className={styles.icon}
                  src="/face.svg"
                  alt="logo"
                  width={22}
                  height={22}
                  priority
                />
              </Link>
              <Link className={styles.social} href="">
                <Image
                  className={styles.icon}
                  src="/tg.svg"
                  alt="logo"
                  width={22}
                  height={22}
                  priority
                />
              </Link>
            </div>
          </div>
          <div className={styles.linksBlock}>
            <div className={styles.block}>
              <Link className={styles.link} href="/">
                Главная
              </Link>
              <Link className={styles.link} href="/about">
                О Компании
              </Link>
              <Link className={styles.link} href="/news">
                Новости
              </Link>
            </div>
            <div className={styles.block}>
              <Link className={styles.link} href="/projects">
                Проекты
              </Link>
              <Link className={styles.link} href="/contacts">
                Контакты
              </Link>
            </div>
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
