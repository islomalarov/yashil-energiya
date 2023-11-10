import "../../scss/globals.scss";
import styles from "./page.module.scss";
import Link from "next/link";
import Image from "next/image";
import { TheHero } from "@/components/HeroComponent/TheHero";
import { TheFeedback } from "@/components/FeedbackComponent/TheFeedback";

export default function Ceo() {
  return (
    <>
      <TheHero
        title1="Kompaniya Haqida"
        url1="about"
        title2="Rahbariyat"
        url2="ceo"
      />
      <div className="container">
        <h1>Hello world!</h1>
      </div>
      <TheFeedback />
    </>
  );
}
