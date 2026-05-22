"use client";

import type { ImageElem } from "@/types/richtext";
import Image from "next/image";
import Lightbox from "yet-another-react-lightbox";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import styles from "./page.module.scss";
import { useState, type CSSProperties } from "react";

interface CSSVariables extends CSSProperties {
  "--width"?: string;
  "--height"?: string;
}

type Props = {
  elem: ImageElem;
  gallery?: ImageElem[];
  initialIndex?: number;
};

export default function TheImageModal({
  elem,
  gallery = [elem],
  initialIndex = 0,
}: Props) {
  const { src, title, height, width } = elem;
  const [isOpen, setIsOpen] = useState(false);
  const slides = gallery.map((image) => ({
    alt: image.title ?? "",
    height: image.height,
    src: image.src,
    width: image.width,
  }));

  const style: CSSVariables = {
    "--width": `${width}`,
    "--height": `${height}`,
  };

  return (
    <>
      <div className={styles.imgBlock} style={style}>
        <Image
          src={src}
          alt={title ?? ""}
          width={width}
          height={height}
          onClick={() => setIsOpen(true)}
          className={styles.clickableImage}
        />
      </div>

      <Lightbox
        open={isOpen}
        close={() => setIsOpen(false)}
        index={Math.max(0, initialIndex)}
        slides={slides}
        plugins={[Zoom, Thumbnails]}
        carousel={{ finite: false }}
        controller={{ closeOnBackdropClick: true }}
        zoom={{
          maxZoomPixelRatio: 3,
          scrollToZoom: true,
        }}
        thumbnails={{
          border: 2,
          borderRadius: 8,
          gap: 10,
          height: 64,
          padding: 4,
          width: 96,
        }}
        styles={{
          container: {
            backgroundColor: "rgba(0, 0, 0, 0.9)",
          },
        }}
      />
    </>
  );
}
