import "../../../scss/globals.scss";
import styles from "./page.module.scss";
import Image from "next/image";
import { TheHero } from "@/components/HeroComponent/TheHero";
import photo1 from "@/public/newsPhoto/photo-18.jpg";
import photo2 from "@/public/newsPhoto/photo-18-1.jpg";
import photo3 from "@/public/newsPhoto/photo-18-2.jpg";

export default function Page16() {
  return (
    <>
      <TheHero title1="Yangiliklar" url1="news" />
      <div className="newsContainer">
        <div className={styles.content}>
          <h1 style={{ textAlign: "center", paddingBottom: 50 }}>
            Qoraqalpogʻiston Respublikasida quyosh fotoelektr stansiyasi
            boʻyicha oʻquv seminari oʻtkazildi.
          </h1>
          <div className={styles.imgBlock}>
            <Image className={styles.img} src={photo1} alt="photo1" />
          </div>
          <p>
            Ushbu seminarda qayta tiklanuvchi energiya, xususan yashil
            energiyadan foydalanish hozirda mamlakatimiz rivoji uchun qay
            darajada ahamiyatli ekanligi haqida maʼlumotlar berildi.
          </p>
          <div className={styles.imgBlock}>
            <Image className={styles.img} src={photo2} alt="photo2" />
          </div>
          <p>
            Bundan tashqari QFES larini barpo etish, ularni samarali ishlashi
            uchun sevis xizmatlarini koʻrsatish boʻyicha ham yetarlicha maʼlumot
            berib oʻtildi.
          </p>
          <div className={styles.imgBlock}>
            <Image className={styles.img} src={photo3} alt="photo3" />
          </div>
        </div>
      </div>
    </>
  );
}
