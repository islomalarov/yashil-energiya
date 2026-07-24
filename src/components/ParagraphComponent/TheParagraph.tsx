
import s from "./TheParagraph.module.scss";
import {
  renderRichLeaves,
  richLeavesHaveText,
  type RichTextLeaf,
} from "../RichText/renderRichLeaves";

type Props = {
  content?: RichTextLeaf[] | null;
};

export default function TheParagraph({ content }: Props) {
  if (!content?.length) return null;

  // Skip fully empty paragraphs (no text anywhere in the subtree).
  if (!richLeavesHaveText(content)) return null;

  return <p className={s.paragraphBlock}>{renderRichLeaves(content, "p")}</p>;
}
