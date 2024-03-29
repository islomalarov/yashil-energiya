import Image from "next/image";
import "../../../scss/globals.scss";
import projects from "@/data/projects.json";
type Props = {
  params: {
    id: string;
  };
};
export async function generateStaticParams() {
  const {
    data: { list },
  } = projects;

  return list.map((elem) => ({
    id: elem.plantCode,
  }));
}
export default function Project({ params }: Props) {
  // async function getProject() {
  //   const res = await fetch(
  //     `https://jsonplaceholder.typicode.com/photos/${id}`
  //   );

  //   return res.json();
  // }
  // const project = await getProject();
  const { id } = params;
  const {
    data: { list },
  } = projects;
  const [
    { plantName, plantAddress, contactMethod, gridConnectionDate, imgUrl },
  ] = list.filter((elem) => elem.plantCode === id);
  return (
    <div className="container">
      <div>{id}</div>
      <h3>{plantName}</h3>
      <Image
        width={1280}
        height={720}
        src={imgUrl}
        alt={imgUrl}
        style={{
          display: "flex",
          width: "100%",
          height: "auto",
          objectFit: "cover",
        }}
      />
    </div>
  );
}
