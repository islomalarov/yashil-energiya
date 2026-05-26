import Image from "next/image";
import BurgerIcon from "public/menu/burgerIcon.svg";
import styles from "./TheBurger.module.scss";
import { BurgerMenuProps } from "./TheBurgerMenu";

export const TheBurgerBtn = ({ handleBurgerBtn }: BurgerMenuProps) => {
  return (
    <button
      className={styles.burgerBtn}
      type="button"
      onClick={handleBurgerBtn}
      aria-label="Open menu"
    >
      <Image
        src={BurgerIcon}
        alt="burger-icon"
        width={24}
        height={24}
      />
    </button>
  );
};
