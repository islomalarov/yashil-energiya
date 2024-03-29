import Image from "next/image";
import styles from "./page.module.scss";

export const TheLanguage = ({ styleName }: { styleName: string }) => {
  return (
    <div className={styles[styleName]}>
      <button>
        <Image src="/language.svg" alt="logo" width={24} height={24} priority />
      </button>
      <select name="" id="">
        <option value="">O'z</option>
        <option value="">Ru</option>
        <option value="">Eng</option>
      </select>
    </div>
  );
};
