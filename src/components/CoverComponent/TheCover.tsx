"use client";
import Image from "next/image";
import s from "./TheCover.module.scss";
type Cover = {
  url: string;
  fileName: string;
  height: number;
  width: number;
};
type Props = {
  elem?: Cover | null;
};
export default function TheCover({ elem }: Props) {
  if (!elem) return <div className={s.coverWrapper}></div>;
  const { url, fileName, height, width } = elem;



  return (
    <div className={s.coverWrapper}>
      <Image
        className={s.coverImage}
        src={url}
        alt={fileName}
        width={width}
        height={height}
      />
    </div>
  );
}
