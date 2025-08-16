"use client";

import "@/scss/globals.scss";
import s from "./ThePageContent.module.scss";
import TheList from "../ListComponent/TheList";
import TheParagraph from "../ParagraphComponent/TheParagraph";
import TheImageModal from "../ImageComponent/TheImageModal";

export default function ThePageContent({ content }: any) {
  if (!content || content.length === 0) {
    return <div className={s.pageContent}>No content available</div>;
  }
  return (
    <div className={s.pageContent}>
      {content.map((elem: any, index: number) => {
        const { children, type } = elem;
        switch (type) {
          case "paragraph":
            return <TheParagraph key={index} content={children} />;
          case "bulleted-list":
            return <TheList key={index} content={children} />;
          case "image":
            return <TheImageModal key={index} elem={elem} />;
          case "heading-three":
            return (
              <h2 key={index} className={s.title}>
                {children[0].text}
              </h2>
            );
          default:
            return null;
        }
      })}
    </div>
  );
}
