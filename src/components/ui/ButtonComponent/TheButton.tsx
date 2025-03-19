import "@/scss/globals.scss";
import styles from "./TheButton.module.scss";
import { Link } from "@/src/i18n/navigation";

interface TheButtonProps {
  title: string;
  url: string;
}
export const TheButton = ({ title, url }: TheButtonProps) => {
  return (
    <Link className={`${styles.link} link`} href={`/${url}`}>
      {title}
    </Link>
  );
};
