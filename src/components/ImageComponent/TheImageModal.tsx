"use client";

import type { ImageElem } from "@/types/richtext";
import Image from "next/image";
import Lightbox from "yet-another-react-lightbox";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import styles from "./page.module.scss";
import { useEffect, useState, type CSSProperties } from "react";

interface CSSVariables extends CSSProperties {
  "--width"?: string;
  "--height"?: string;
}

type Props = {
  elem: ImageElem;
  gallery?: ImageElem[];
  initialIndex?: number;
};

function GalleryCursor({ active }: { active: boolean }) {
  const [cursor, setCursor] = useState({
    isPressed: false,
    isVisible: false,
    x: 0,
    y: 0,
  });

  useEffect(() => {
    if (!active || window.matchMedia("(pointer: coarse)").matches) {
      setCursor((current) => ({ ...current, isVisible: false }));
      return;
    }

    const isGalleryImageArea = (target: EventTarget | null) => {
      return (
        target instanceof Element &&
        Boolean(target.closest(".yarl__slide_image, .yarl__slide"))
      );
    };

    const isInteractiveControl = (target: EventTarget | null) => {
      return (
        target instanceof Element &&
        Boolean(target.closest(".yarl__button, .yarl__thumbnails_thumbnail"))
      );
    };

    const handlePointerMove = (event: PointerEvent) => {
      setCursor((current) => ({
        ...current,
        isVisible:
          isGalleryImageArea(event.target) && !isInteractiveControl(event.target),
        x: event.clientX,
        y: event.clientY,
      }));
    };

    const handlePointerDown = (event: PointerEvent) => {
      if (isGalleryImageArea(event.target) && !isInteractiveControl(event.target)) {
        setCursor((current) => ({ ...current, isPressed: true }));
      }
    };

    const handlePointerUp = () => {
      setCursor((current) => ({ ...current, isPressed: false }));
    };

    const handlePointerLeave = () => {
      setCursor((current) => ({
        ...current,
        isPressed: false,
        isVisible: false,
      }));
    };

    document.addEventListener("pointermove", handlePointerMove);
    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("pointerup", handlePointerUp);
    document.addEventListener("pointerleave", handlePointerLeave);

    return () => {
      document.removeEventListener("pointermove", handlePointerMove);
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("pointerup", handlePointerUp);
      document.removeEventListener("pointerleave", handlePointerLeave);
    };
  }, [active]);

  if (!active) {
    return null;
  }

  return (
    <div
      className={`${styles.galleryCursor} ${
        cursor.isVisible ? styles.galleryCursorVisible : ""
      } ${cursor.isPressed ? styles.galleryCursorPressed : ""}`}
      style={{
        transform: `translate3d(${cursor.x}px, ${cursor.y}px, 0) translate(-50%, -50%)`,
      }}
    >
      <span />
    </div>
  );
}

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
        render={{
          controls: () => <GalleryCursor active={isOpen} />,
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
