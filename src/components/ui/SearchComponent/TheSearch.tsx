import Image from "next/image";
import styles from "./page.module.scss";

export const TheSearch = () => {
  return (
    <button className={styles.searchBtn}>
      <Image
        src="/search.svg"
        alt="search"
        width={32}
        height={32}
        onClick={(e) => {
          console.log("salom Valixon");
        }}
      />
    </button>
  );
};
