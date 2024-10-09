"use client";
import Image from "next/image";
import styles from "./page.module.scss";
import { useState } from "react";

interface CSSVariables extends React.CSSProperties {
  "--width"?: string;
  "--height"?: string;
}

export default function TheImageModal({ elem }: any) {
  console.log(elem);
  const { src, title, height, width } = elem;

  const style: CSSVariables = {
    "--width": `${width}`,
    "--height": `${height}`,
  };
  // Состояние для управления полноэкранным режимом
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Функция для открытия изображения на весь экран
  const handleImageClick = () => {
    setIsFullscreen(true);
  };

  // Функция для закрытия полноэкранного режима
  const handleCloseFullscreen = () => {
    setIsFullscreen(false);
  };

  return (
    <>
      <div className={styles.imgBlock} style={style}>
        <Image
          src={src}
          alt={title}
          width={width}
          height={height}
          onClick={handleImageClick}
          className={styles.clickableImage}
        />
      </div>
      {/* Полноэкранное изображение */}
      {isFullscreen && (
        <div className={styles.fullscreenOverlay}>
          <div
            className={styles.fullscreenContent}
            onClick={handleCloseFullscreen}
            // onClick={(e) => e.stopPropagation()} // Предотвращаем закрытие при клике на изображение
          >
            <Image
              src={src}
              alt={title}
              fill
              style={{ objectFit: "contain" }}
            />
          </div>
        </div>
      )}
    </>
  );
}
