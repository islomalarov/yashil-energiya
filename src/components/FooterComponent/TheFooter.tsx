import "@/scss/globals.scss";
import s from "./TheFooter.module.scss";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import footerLogo from "public/logo2.svg";
import { socialLinks } from "data/links";

export const TheFooter = () => {
  return (
    <footer className={s.footer}>
      <div className="container">
        <div className={s.content}>
          <div className={s.logoBlock}>
            <Link href="/">
              <Image src={footerLogo} alt="logo2" />
            </Link>
          </div>
          <div className={s.socialLinks}>
            {socialLinks.map(({ url, path }) => (
              <Link
                href={url}
                className={s.socialLink}
                key={path}
                target="_blank"
              >
                <Image
                  className={s.icon}
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
      <div className={s.subFooter}>
        <p className={s.text}>JV “Yashil Energiya” LLC All rights reserved</p>
      </div>
    </footer>
  );
};
