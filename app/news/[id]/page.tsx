import "../../../scss/globals.scss";

type Props = {
  params: {
    id: number;
  };
};

export default function New({ params: { id } }: Props) {
  // const {
  //   data: { list },
  // } = projects;
  // const [{ plantName, plantAddress, contactMethod, gridConnectionDate }] =
  //   list.filter((elem) => elem.plantCode === id);

  return (
    <div className="container">
      <div>{id}</div>
      {/* <h1>{plantName}</h1>
      <p>{plantAddress}</p>
      <p>{gridConnectionDate}</p> */}
    </div>
  );
}
