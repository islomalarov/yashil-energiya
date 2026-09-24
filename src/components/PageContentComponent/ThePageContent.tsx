"use client";

import {
  PortableText,
  type PortableTextBlock,
  type PortableTextComponents,
} from "@portabletext/react";
import type { ReactNode } from "react";
import { isImageElem, type RichText, type RichTextTable } from "@/types/richtext";

import s from "./ThePageContent.module.scss";
import paragraph from "../ParagraphComponent/TheParagraph.module.scss";
import list from "../ListComponent/TheList.module.scss";
import { richTextMarks } from "../RichText/portableTextMarks";
import TheImageModal from "../ImageComponent/TheImageModal";
import TheTable from "../TableComponent/TheTable";

type Props = {
  content?: RichText | null;
};

// Empty paragraphs / list items (editors hitting Enter twice) stay hidden,
// as they were with the Hygraph renderer.
function hasText(block: PortableTextBlock) {
  return block.children.some(
    (child) => typeof child.text === "string" && child.text.trim() !== "",
  );
}

const Paragraph = ({ children }: { children?: ReactNode }) => (
  <p className={paragraph.paragraphBlock}>
    <span>{children}</span>
  </p>
);

export default function ThePageContent({ content }: Props) {
  if (!content?.length) {
    return <div className={s.pageContent}>No content available</div>;
  }

  const galleryImages = content.filter(isImageElem);

  const components: PortableTextComponents = {
    block: {
      normal: ({ children, value }) =>
        hasText(value) ? <Paragraph>{children}</Paragraph> : null,
      h2: ({ children, value }) =>
        hasText(value) ? <h2 className={s.title}>{children}</h2> : null,
      h3: ({ children, value }) =>
        hasText(value) ? <h3 className={s.subtitle}>{children}</h3> : null,
      h4: ({ children, value }) =>
        hasText(value) ? <h4 className={s.subtitle}>{children}</h4> : null,
      blockquote: ({ children, value }) =>
        hasText(value) ? (
          <blockquote className={s.blockquote}>
            <Paragraph>{children}</Paragraph>
          </blockquote>
        ) : null,
    },
    list: {
      bullet: ({ children }) => <ul className={list.bulleted}>{children}</ul>,
      number: ({ children }) => <ol className={list.numbered}>{children}</ol>,
    },
    listItem: ({ children, value }) =>
      hasText(value) ? <li>{children}</li> : null,
    marks: richTextMarks,
    types: {
      imageBlock: ({ value }) => {
        if (!isImageElem(value)) return null;
        return (
          <TheImageModal
            elem={value}
            gallery={galleryImages}
            initialIndex={galleryImages.findIndex(
              (image) => image._key === value._key,
            )}
          />
        );
      },
      dataTable: ({ value }) => <TheTable value={value as RichTextTable} />,
    },
  };

  return (
    <div className={s.pageContent}>
      <PortableText value={content} components={components} />
    </div>
  );
}
