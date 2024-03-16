import { TheHero } from "@/components/HeroComponent/TheHero";
import "../../../scss/globals.scss";
import styles from "./page.module.scss";
import Image from "next/image";
import photo1 from "@/public/newsPhoto/photo-10.jpg";
import photo2 from "@/public/newsPhoto/photo-10-1.jpg";
import photo3 from "@/public/newsPhoto/photo-10-2.jpg";

export default function Page10() {
  return (
    <>
      <TheHero title1="Yangiliklar" url1="news" />
      <div className="newsContainer">
        <div className={styles.content}>
          <h1 style={{ textAlign: "center", paddingBottom: 50 }}>
            “Yashil Energiya”: Sirdaryo va Samarqand viloyatlarida quyosh
            panellariga texnik xizmat ko‘rsatish servis markazlari ishga
            tushirildi
          </h1>
          <div className={styles.imgBlock}>
            <Image
              src={photo1}
              alt="photo1"
              style={{ width: "80%", height: "auto", objectFit: "cover" }}
            />
          </div>
          <p>
            O‘zbekistonda qayta tiklanuvchi energiya manbalarini joriy etish
            ishlari yuqori sur’atlarda davom etmoqda va ushbu qurilmalarga
            texnik xizmat ko‘rsatish muhim hisoblanadi.
          </p>
          <div className={styles.imgBlock}>
            <Image
              src={photo2}
              alt="photo2"
              style={{ width: "80%", height: "auto", objectFit: "cover" }}
            />
          </div>
          <p>
            Samarqand viloyatida kichik quvvatli qayta tiklanuvchi energiya
            manbalari qurilmalarini o‘rnatish va ekspluatatsiya qilish ishlarini
            tizimli tashkil etish bo‘yicha “Yashil energiya” kompaniyasining
            filiali faoliyati yo‘lga qo‘yildi.
          </p>
          <div className={styles.imgBlock}>
            <Image
              src={photo3}
              alt="photo3"
              style={{ width: "80%", height: "auto", objectFit: "cover" }}
            />
          </div>
          <p>
            Xususan, kecha, 29-fevral kuni kompaniyaning Sirdaryo viloyatida
            quyosh panellariga texnik xizmat ko‘rsatish servis markazi ham ishga
            tushirildi.
          </p>
        </div>
      </div>
    </>
  );
}
