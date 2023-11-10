import "../../../scss/globals.scss";
type Props = {
  params: {
    id: string;
  };
};

export default async function Project({ params: { id } }: Props) {
  async function getProject() {
    const res = await fetch(
      `https://jsonplaceholder.typicode.com/photos/${id}`
    );

    return res.json();
  }
  const project = await getProject();

  return (
    <div className="container">
      <div>{id}</div>
      <h3>{project.title}</h3>
      <h3>
        <a href={project.url}>url</a>
      </h3>
      <img src={project.url} alt="" />
    </div>
  );
}
