"use client";

import Image from "next/image";
import type { KeyboardEvent } from "react";
import { useCallback, useEffect, useState } from "react";
import { Link } from "@/i18n/navigation";
import styles from "./TheVideoPlayer.module.scss";
import heroPoster from "public/hero-poster.webp";

type VideoHeroProps = {
  title: string;
  subtitle: string;
  contactLabel: string;
  projectsLabel: string;
};

const videoLabel = "Watch video";
const ringLabel = "Yashil Energy Video";

const TheVideoPlayer = ({
  title,
  subtitle,
  contactLabel,
  projectsLabel,
}: VideoHeroProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const openVideo = () => setIsOpen(true);
  const closeVideo = useCallback(() => setIsOpen(false), []);
  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openVideo();
    }
  };

  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (event: globalThis.KeyboardEvent) => {
      if (event.key === "Escape") {
        closeVideo();
      }
    };

    document.addEventListener("keydown", handleEscape);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [closeVideo, isOpen]);

  return (
    <>
      <div className={styles.video}>
        <Image
          className={styles.poster}
          src={heroPoster}
          alt=""
          fill
          priority
          fetchPriority="high"
          sizes="100vw"
        />
        <div className={styles.content}>
          <div className={styles.copy}>
            <h1 className={styles.title}>{title}</h1>
            <p className={styles.subtitle}>{subtitle}</p>
            <div className={styles.links}>
              <Link className={styles.primaryLink} href="/contacts">
                {contactLabel}
              </Link>
              <Link className={styles.secondaryLink} href="/installation-request">
                {projectsLabel}
              </Link>
            </div>
          </div>
          <button
            className={styles.playButton}
            type="button"
            aria-label={videoLabel}
            onClick={openVideo}
            onKeyDown={handleKeyDown}
            onMouseDown={openVideo}
            onPointerDown={openVideo}
            onTouchStart={openVideo}
          >
            <span className={styles.action}>
              <svg
                className={styles.actionText}
                viewBox="0 0 120 120"
                aria-hidden="true"
              >
                <defs>
                  <path
                    id="video-action-path"
                    d="M60 60 m -45 0 a 45 45 0 1 1 90 0 a 45 45 0 1 1 -90 0"
                  />
                </defs>
                <text>
                  <textPath href="#video-action-path" startOffset="0">
                    {ringLabel} - {ringLabel} -
                  </textPath>
                </text>
              </svg>
              <span className={styles.playIcon} aria-hidden="true" />
              <span className={styles.visuallyHidden}>{videoLabel}</span>
            </span>
          </button>
        </div>
      </div>

      {isOpen && (
        <div
          className={styles.overlay}
          role="dialog"
          aria-modal="true"
          onClick={closeVideo}
        >
          <button
            className={styles.closeButton}
            type="button"
            aria-label="Close video"
            onClick={closeVideo}
          />
          <video
            src="/video/YASHIL_ENERGY_FINAL11_01_2026.mp4"
            autoPlay
            controls
            controlsList="nodownload"
            playsInline
            poster="/hero-poster.webp"
            onClick={(event) => event.stopPropagation()}
          />
        </div>
      )}
    </>
  );
};

export default TheVideoPlayer;
