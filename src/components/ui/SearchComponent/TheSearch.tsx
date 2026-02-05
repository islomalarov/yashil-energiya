import Image from "next/image";
import styles from "./page.module.scss";
import SearchIcon from "public/search.svg";

export const TheSearch = () => {
  return (
    <button className={styles.searchBtn}>
      <Image src={SearchIcon} alt="search-icon" />
    </button>
  );
};
