import Image from "next/image";
interface ImageProps {
  src: string;
  title: string;
}
interface stylesProps {
  imgBlock: string;
}
export const renderImageContent = (
  index: number,
  styles: stylesProps,
  { src, title }: ImageProps
) => {
  return (
    <div className={styles.imgBlock} key={index}>
      <Image src={src} alt={title} width={1000} height={400} />
    </div>
  );
};
