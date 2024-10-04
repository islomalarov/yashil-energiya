import "../../scss/globals.scss";
import ParagraphComponent from "../ParagraphComponent/TheParagraph";
import ImageComponent from "../ImageComponent/TheImage";

export default function NewsContentComponent({ content }: any) {
  return (
    <>
      {content.map((elem: any, index: number) => {
        const { children, type } = elem;
        switch (type) {
          case "paragraph":
            return <ParagraphComponent key={index} content={children} />;
          case "image":
            return <ImageComponent key={index} elem={elem} />;
          default:
            return null;
        }
      })}
    </>
  );
}
