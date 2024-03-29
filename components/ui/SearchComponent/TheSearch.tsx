import Image from "next/legacy/image";
import styles from "./page.module.scss";

export const TheSearch = () => {
  return (
    <button className={styles.searchBtn}>
      <Image src="/search.svg" alt="logo" width={30} height={30} priority />
    </button>
  );
};
