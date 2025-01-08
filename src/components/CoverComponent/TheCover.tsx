"use client";
import Image from "next/image";
import styles from "./page.module.scss";
import { CSSProperties } from "react";

interface CSSVariables extends CSSProperties {
  "--width"?: string;
  "--height"?: string;
}

export default function TheCover({ elem }: any) {
  if (!elem)
    return (
      <div
        className={styles.imgBlock}
        // style={style}
      ></div>
    );
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
