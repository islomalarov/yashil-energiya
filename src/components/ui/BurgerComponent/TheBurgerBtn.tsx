import Image from "next/image";
import BurgerIcon from "@/public/menu/burgerIcon.svg";
import styles from "./page.module.scss";
import { BurgerMenuProps } from "./TheBurgerMenu";

export const TheBurgerBtn = ({ handleBurgerBtn }: BurgerMenuProps) => {
  return (
    <button className={styles.burgerBtn}>
      <Image
        src={BurgerIcon}
        alt="burger-icon"
        width={24}
        height={24}
        onClick={handleBurgerBtn}
        priority
      />
    </button>
  );
};
