"use client";
import Image from "next/image";
import s from "./TheCover.module.scss";


export default function TheCover({ elem }: any) {
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
