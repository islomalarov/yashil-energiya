"use client";

import type { ImageElem } from "@/types/richtext";
import Image from "next/image";
import styles from "./page.module.scss";
import { useState, type CSSProperties } from "react";

interface CSSVariables extends CSSProperties {
  "--width"?: string;
  "--height"?: string;
}

type Props = {
  elem: ImageElem;
};

export default function TheImageModal({ elem }: Props) {
  const { src, title, height, width } = elem;

  const style: CSSVariables = {
    "--width": `${width}`,
    "--height": `${height}`,
  };

  const [isFullscreen, setIsFullscreen] = useState(false);

  return (
    <>
      <div className={styles.imgBlock} style={style}>
        <Image
          src={src}
          alt={title ?? ""}
          width={width}
          height={height}
          onClick={() => setIsFullscreen(true)}
          className={styles.clickableImage}
        />
      </div>

      {isFullscreen && (
        <div
          className={styles.fullscreenOverlay}
          onClick={() => setIsFullscreen(false)}
        >
          <Image
            src={src}
            alt={title ?? ""}
            fill
            style={{ objectFit: "contain" }}
          />
        </div>
      )}
    </>
  );
}
