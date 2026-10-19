"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { youtubeId } from "@/lib/youtube";
import type { RichTextYoutube } from "@/types/richtext";
import s from "./TheYoutubeEmbed.module.scss";

type Props = {
  value: RichTextYoutube;
};

// Thumbnail facade: nothing is requested from YouTube (no player scripts, no
// cookies) until the visitor clicks Play; then the youtube-nocookie player
// replaces the thumbnail and starts playing.
export default function TheYoutubeEmbed({ value }: Props) {
  const t = useTranslations("RichText");
  const [playing, setPlaying] = useState(false);
  const [hd, setHd] = useState(true);
  const id = youtubeId(value.url);
  if (!id) return null;

  const caption = value.caption?.trim();
  const title = caption || t("video");

  return (
    <figure className={s.video}>
      <div className={s.frame}>
        {playing ? (
          <iframe
            // keyboard users land in the player and can pause it right away
            ref={(frame) => frame?.focus()}
            className={s.player}
            src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`}
            title={title}
            allow="autoplay; encrypted-media; picture-in-picture; web-share"
            allowFullScreen
          />
        ) : (
          <button
            className={s.poster}
            type="button"
            aria-label={`${t("playVideo")}: ${title}`}
            onClick={() => setPlaying(true)}
          >
            {/* maxresdefault (1280×720) exists only for HD uploads; on 404
                fall back to hqdefault (480×360), which every video has */}
            <Image
              className={s.thumbnail}
              src={`https://i.ytimg.com/vi/${id}/${hd ? "maxresdefault" : "hqdefault"}.jpg`}
              alt=""
              onError={() => setHd(false)}
              fill
              sizes="(max-width: 1024px) 100vw, 800px"
            />
            <span className={s.playIcon} aria-hidden="true" />
          </button>
        )}
      </div>
      {caption && <figcaption className={s.caption}>{caption}</figcaption>}
    </figure>
  );
}
