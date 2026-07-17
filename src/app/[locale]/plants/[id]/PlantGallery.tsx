"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Lightbox from "yet-another-react-lightbox";
import Counter from "yet-another-react-lightbox/plugins/counter";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/counter.css";
import { useTranslations } from "next-intl";
import s from "./PlantGallery.module.scss";

type Picture = {
  fileName: string;
  url: string;
  height: number;
  width: number;
};

type PlantGalleryProps = {
  pictures: Picture[];
  title: string;
};

const DESKTOP_THUMBS = 3;

export const PlantGallery = ({ pictures, title }: PlantGalleryProps) => {
  const t = useTranslations("PlantDetail.gallery");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const trackRef = useRef<HTMLDivElement | null>(null);

  if (pictures.length === 0) return null;

  const photoAlt = (index: number) =>
    t("photoAlt", { title, number: index + 1 });

  const slides = pictures.map((picture, index) => ({
    src: picture.url,
    width: picture.width,
    height: picture.height,
    alt: photoAlt(index),
  }));

  const thumbs = pictures.slice(1, 1 + DESKTOP_THUMBS);
  const extraCount = pictures.length - 1 - thumbs.length;

  const handleTrackScroll = () => {
    const track = trackRef.current;
    if (!track || track.clientWidth === 0) return;
    setActiveSlide(
      Math.min(
        pictures.length - 1,
        Math.round(track.scrollLeft / track.clientWidth),
      ),
    );
  };

  const scrollToSlide = (index: number) => {
    const track = trackRef.current;
    if (!track) return;
    track.scrollTo({ left: index * track.clientWidth, behavior: "smooth" });
  };

  return (
    <section className={s.gallery} aria-label={t("label")}>
      {/* Desktop: main photo + thumbnail column */}
      <div className={s.desktopGrid} data-thumbs={thumbs.length}>
        <button
          type="button"
          className={s.mainShot}
          onClick={() => setLightboxIndex(0)}
          aria-label={t("openPhoto", { number: 1, total: pictures.length })}
        >
          <Image
            src={pictures[0].url}
            alt={photoAlt(0)}
            fill
            priority
            sizes="(max-width: 768px) 94vw, 62vw"
            className={s.shotImage}
          />
        </button>

        {thumbs.length > 0 && (
          <div className={s.thumbColumn}>
            {thumbs.map((picture, thumbIndex) => {
              const pictureIndex = thumbIndex + 1;
              const isLast = thumbIndex === thumbs.length - 1;
              return (
                <button
                  key={picture.url}
                  type="button"
                  className={s.thumbShot}
                  onClick={() => setLightboxIndex(pictureIndex)}
                  aria-label={t("openPhoto", {
                    number: pictureIndex + 1,
                    total: pictures.length,
                  })}
                >
                  <Image
                    src={picture.url}
                    alt={photoAlt(pictureIndex)}
                    fill
                    sizes="(max-width: 768px) 45vw, 20vw"
                    className={s.shotImage}
                  />
                  {isLast && extraCount > 0 && (
                    <span className={s.moreOverlay}>+{extraCount}</span>
                  )}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Mobile: swipe carousel with dots */}
      <div className={s.mobileCarousel}>
        <div
          className={s.track}
          ref={trackRef}
          onScroll={handleTrackScroll}
          role="group"
          aria-label={t("label")}
        >
          {pictures.map((picture, index) => (
            <button
              key={picture.url}
              type="button"
              className={s.slide}
              onClick={() => setLightboxIndex(index)}
              aria-label={t("openPhoto", {
                number: index + 1,
                total: pictures.length,
              })}
            >
              <Image
                src={picture.url}
                alt={photoAlt(index)}
                fill
                priority={index === 0}
                sizes="94vw"
                className={s.shotImage}
              />
            </button>
          ))}
        </div>
        {pictures.length > 1 && (
          <div className={s.dots}>
            {pictures.map((picture, index) => (
              <button
                key={picture.url}
                type="button"
                className={`${s.dot} ${index === activeSlide ? s.dotActive : ""}`}
                onClick={() => scrollToSlide(index)}
                aria-label={t("goToPhoto", { number: index + 1 })}
                aria-current={index === activeSlide}
              />
            ))}
          </div>
        )}
      </div>

      <Lightbox
        open={lightboxIndex !== null}
        close={() => setLightboxIndex(null)}
        index={lightboxIndex ?? 0}
        slides={slides}
        plugins={[Zoom, Counter]}
        carousel={{ finite: false }}
        controller={{ closeOnBackdropClick: true }}
        zoom={{ maxZoomPixelRatio: 3, scrollToZoom: true }}
        counter={{ container: { style: { top: 0 } } }}
        styles={{ container: { backgroundColor: "rgba(0, 0, 0, 0.9)" } }}
      />
    </section>
  );
};
