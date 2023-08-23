import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.scss";
import "../../scss/globals.scss";

export const TheHeader = () => {
  // const [links] = useSate([
  //   { url: "/", title: "Главная" },
  //   { url: "/about", title: "О Компании" },
  //   { url: "/news", title: "Новости" },
  //   { url: "/projects", title: "Проекты" },
  //   { url: "/contacts", title: "Контакты" },
  // ]);
  return (
    <header className={styles.header}>
      <div className="container">
        <div className={styles.content}>
          <div>
            <Image
              src="/logo.svg"
              alt="logo"
              width={200}
              height={82}
              priority
            />
          </div>
          <Link className={styles.link} href="/">
            Главная
          </Link>
          <Link className={styles.link} href="/about">
            О Компании
          </Link>
          <Link className={styles.link} href="/news">
            Новости
          </Link>
          <Link className={styles.link} href="/projects">
            Проекты
          </Link>
          <Link className={styles.link} href="/contacts">
            Контакты
          </Link>
          <div className="">
            <button>
              <Image
                src="/search.svg"
                alt="logo"
                width={30}
                height={30}
                priority
              />
            </button>
          </div>
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
              <option value="">RU</option>
              <option value="">ENG</option>
              <option value="">UZB</option>
            </select>
          </div>
        </div>
      </div>
    </header>
  );
};
