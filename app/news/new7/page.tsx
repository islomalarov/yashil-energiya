import { TheHero } from "@/components/HeroComponent/TheHero";
import "../../../scss/globals.scss";
import styles from "./page.module.scss";
import Image from "next/image";
import photo1 from "@/public/newsPhoto/photo-7.jpg";
import photo2 from "@/public/newsPhoto/photo-7-1.jpg";
import photo3 from "@/public/newsPhoto/photo-7-2.jpg";
import photo4 from "@/public/newsPhoto/photo-7-3.jpg";

export default function Page7() {
  return (
    <>
      <TheHero title1="Yangilikar" url1="news" />
      <div className="newsContainer">
        <div className={styles.content}>
          <h1 style={{ textAlign: "center", paddingBottom: 50 }}>
            “Yashil Energiya”: Andijon viloyati va Qoraqalpog‘iston
            respublikasida quyosh panellariga texnik xizmat ko‘rsatish servis
            markazlari ishga tushirildi
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
            Andijon viloyati va Qoraqalpog‘iston Respublikasida kichik quvvatli
            qayta tiklanuvchi energiya manbalari qurilmalarini o‘rnatish va
            ekspluatatsiya qilish ishlarini tizimli tashkil etish bo‘yicha
            “Yashil energiya” kompaniyasining filiallari faoliyati yo‘lga
            qo‘yildi.
          </p>
          <div className={styles.imgBlock}>
            <Image
              src={photo3}
              alt="photo3"
              style={{ width: "80%", height: "auto", objectFit: "cover" }}
            />
          </div>
          <p>
            Xususan, kuni kecha birinchi bo‘lib kompaniyaning Andijon viloyatida
            hamda bugun Qoraqalpog‘iston Respublikasida quyosh panellariga
            texnik xizmat ko‘rsatish servis markazi ishga tushirildi.
          </p>
          <div className={styles.imgBlock}>
            <Image
              src={photo4}
              alt="photo4"
              style={{ width: "80%", height: "auto", objectFit: "cover" }}
            />
          </div>
          <p>
            Xuddi shuningdek, O‘zbekistonning qolgan 12 ta hududida mana shunday
            servis markazlari ishga tushirilishi rejalashtirilgan.
          </p>
        </div>
      </div>
    </>
  );
}
