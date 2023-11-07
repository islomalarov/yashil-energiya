import { TheHero } from "@/components/HeroComponent/TheHero";
import "../../scss/globals.scss";
import { TheForm } from "@/pages/TheForm";
export default function Contacts() {
  return (
    <>
      <TheHero title={"Kontaktlar"} />
      <div className="container">
        <TheForm />
      </div>
    </>
  );
}
