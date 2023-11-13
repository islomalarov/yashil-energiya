import "../../../scss/globals.scss";

type Props = {
  params: {
    id: number;
  };
};

export default function New({ params: { id } }: Props) {
  return (
    <div className="container">
      <div>{id}</div>
    </div>
  );
}
