import "../../scss/globals.scss";
import { TheHero } from "@/components/HeroComponent/TheHero";
import { TheForm } from "@/pages/TheForm";

export default function Contacts() {
  return (
    <>
      <TheHero title1={"Kontaktlar"} url1="contacts" />
      <div className="container">
        <TheForm />
      </div>
    </>
  );
}
