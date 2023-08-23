import { TheHero } from "@/components/HeroComponent/TheHero";
import "../../scss/globals.scss";
export default function News() {
  return (
    <>
      <TheHero title="Новости" />
      <div className="container">
        <h1>News page</h1>
      </div>
    </>
  );
}
