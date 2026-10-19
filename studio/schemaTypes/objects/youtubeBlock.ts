import { createElement } from "react";
import { defineField, defineType } from "sanity";

// Same pattern as src/lib/youtube.ts on the site (the Studio is a separate
// package and cannot import it) — keep the two in sync.
const YOUTUBE_ID =
  /^(?:https?:\/\/)?(?:www\.|m\.|music\.)?(?:youtube(?:-nocookie)?\.com\/(?:watch\?(?:[^#]*&)?v=|shorts\/|embed\/|live\/)|youtu\.be\/)([\w-]{11})(?=[?&#/]|$)/;

const youtubeId = (url?: string) => url?.trim().match(YOUTUBE_ID)?.[1];

// YouTube video inside rich text. The site shows the video thumbnail and
// loads the youtube-nocookie player only after a click.
export const youtubeBlock = defineType({
  name: "youtubeBlock",
  title: "Видео YouTube",
  type: "object",
  fields: [
    defineField({
      name: "url",
      title: "Ссылка на видео",
      type: "url",
      description:
        "Ссылка на ролик нашего YouTube-канала: youtube.com/watch?v=…, youtu.be/… или youtube.com/shorts/…",
      validation: (rule) =>
        rule
          .required()
          .custom((url?: string) =>
            !url || youtubeId(url) ? true : "Это не ссылка на видео YouTube",
          ),
    }),
    defineField({
      name: "caption",
      title: "Подпись",
      type: "string",
      description:
        "Необязательно. Показывается под видео и служит названием плеера для незрячих пользователей.",
    }),
  ],
  preview: {
    select: { url: "url", caption: "caption" },
    prepare: ({ url, caption }: { url?: string; caption?: string }) => {
      const id = youtubeId(url);
      return {
        title: caption || url || "Видео YouTube",
        subtitle: "Видео YouTube",
        media: id
          ? createElement("img", {
              src: `https://i.ytimg.com/vi/${id}/default.jpg`,
              alt: "",
              style: { objectFit: "cover" },
            })
          : undefined,
      };
    },
  },
});
