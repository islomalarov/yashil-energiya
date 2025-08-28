import s from "./TheList.module.scss";

type Node = {
  text?: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  code?: boolean;
  children?: Node[];
};

function renderNode(node: Node, key: number): JSX.Element {
  if (node.text !== undefined) {
    let element: JSX.Element = <>{node.text}</>;

    if (node.bold) element = <b key={key}>{element}</b>;
    if (node.italic) element = <i key={key}>{element}</i>;
    if (node.underline) element = <u key={key}>{element}</u>;
    if (node.code) element = <code key={key}>{element}</code>;

    return <span key={key}>{element}</span>;
  }

  return (
    <span key={key}>
      {node.children?.map((child, i) => renderNode(child, i))}
    </span>
  );
}

export default function TheList({ content, type }: any) {
  return type === "bulleted-list" ? (
    <ul className={s.bulleted}>
      {content.map((item: any, index: number) => (
        <li key={index} className={s.listItem}>
          {item.children.map((child: any, childIndex: number) =>
            child.children?.map((sub: any, subIndex: number) =>
              renderNode(sub, subIndex),
            ),
          )}
        </li>
      ))}
    </ul>
  ) : (
    <ol className={s.numbered}>
      {content.map((item: any, index: number) => (
        <li key={index} className={s.listItem}>
          {item.children.map((child: any, childIndex: number) =>
            child.children?.map((sub: any, subIndex: number) =>
              renderNode(sub, subIndex),
            ),
          )}
        </li>
      ))}
    </ol>
  );
}
