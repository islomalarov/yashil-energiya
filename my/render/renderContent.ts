import { renderImageContent } from "./renderImageContent";
import { renderParagraphContent } from "./renderParagraphContent";

export const renderContent = (content: any, styles: any) => {
  return content.map((elem: any, index: number) => {
    const { children, type } = elem;
    switch (type) {
      case "paragraph":
        return renderParagraphContent(index, styles, children);
      case "image":
        return renderImageContent(index, styles, elem);
      default:
        return null;
    }
  });
};
