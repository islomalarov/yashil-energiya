import Image from "next/image";
import menuIcon from "@/public/menu/burgerIcon.svg";
import styles from "./page.module.scss";

export const TheBurgerBtn = ({
  status,
  setStatus,
}: {
  status: boolean;
  setStatus: (status: boolean) => void;
}) => {
  return (
    <button className={styles.burgerBtn}>
      <Image
        src={menuIcon}
        alt="logo"
        onClick={() => setStatus(!status)}
        priority
      />
    </button>
  );
};
