"use client";

import type { RichTextNode } from "@/types/richtext";
import { getChildren, getType, getText, isImageElem } from "@/types/richtext";

import s from "./ThePageContent.module.scss";
import TheList from "../ListComponent/TheList";
import TheParagraph from "../ParagraphComponent/TheParagraph";
import TheImageModal from "../ImageComponent/TheImageModal";

type Props = {
  content: RichTextNode[];
};
export default function ThePageContent({ content }: Props) {
  if (!content?.length) {
    return <div className={s.pageContent}>No content available</div>;
  }
  return (
    <div className={s.pageContent}>
      {content.map((elem, index) => {
        const type = getType(elem);
  
        const children = getChildren(elem);
        switch (type) {
          case "paragraph":
            return <TheParagraph key={index} content={children} />;
          case "bulleted-list":
          case "numbered-list":
            return <TheList key={index} content={children} type={type} />;
          case "image":
            if (!isImageElem(elem)) return null;
            return <TheImageModal key={index} elem={elem} />;
          case "heading-three":{
            const first = children[0];
            const title = getText(first) ?? "";
            return (
              <h2 key={index} className={s.title}>
                {title}
              </h2>
            );
          }
          default: 
            return null;
        }
      })}
    </div>
  );
}
