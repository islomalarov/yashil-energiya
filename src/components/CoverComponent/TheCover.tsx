"use client";
import Image from "next/image";
import styles from "./page.module.scss";

interface CSSVariables extends React.CSSProperties {
  "--width"?: string;
  "--height"?: string;
}

export default function TheCover({ elem }: any) {
  const { url, fileName, height, width } = elem;

  // const style: CSSVariables = {
  //   "--width": `${width}`,
  //   "--height": `${height}`,
  // };

  return (
    <div
      className={styles.imgBlock}
      // style={style}
    >
      <Image src={url} alt={fileName} width={width} height={height} />
    </div>
  );
}
