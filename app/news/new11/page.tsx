import { TheHero } from "@/components/HeroComponent/TheHero";
import "../../../scss/globals.scss";
import styles from "./page.module.scss";
import Image from "next/image";
import photo1 from "@/public/newsPhoto/photo-11.jpg";
import photo2 from "@/public/newsPhoto/photo-11-1.jpg";

export default function Page11() {
  return (
    <>
      <TheHero title1="Yangiliklar" url1="news" />
      <div className="newsContainer">
        <div className={styles.content}>
          <h1 style={{ textAlign: "center", paddingBottom: 50 }}>
            “Yashil Energiya”: Navoiy va Buxoro viloyatlarida quyosh panellariga
            texnik xizmat ko‘rsatish servis markazlari ishga tushirildi
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
            Navoiy va Buxoro viloyatlarida kichik quvvatli qayta tiklanuvchi
            energiya manbalari qurilmalarini o‘rnatish va ekspluatatsiya qilish
            ishlarini tizimli tashkil etish bo‘yicha “Yashil energiya”
            kompaniyasining filiali faoliyati yo‘lga qo‘yildi.
          </p>
        </div>
      </div>
    </>
  );
}
