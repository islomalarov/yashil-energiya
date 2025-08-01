import s from "./TheList.module.scss";

export default function TheList({ content }: any) {
  return (
    <ul>
      {content.map((item: any, itemIndex: number) => (
        <li key={itemIndex} className={s.listItem}>
          {item.children[0].children[0].text}
        </li>
      ))}
    </ul>
  );
}
