import { TheHero } from "@/components/HeroComponent/TheHero";
import "../../../scss/globals.scss";
import styles from "./page.module.scss";
import Image from "next/image";
import photo1 from "@/public/newsPhoto/photo-13.jpg";
import photo2 from "@/public/newsPhoto/photo-13-1.jpg";

export default function Page13() {
  return (
    <>
      <TheHero title1="Yangiliklar" url1="news" />
      <div className="newsContainer">
        <div className={styles.content}>
          <h1 style={{ textAlign: "center", paddingBottom: 50 }}>
            Qashqadaryo viloyatida quyosh panellariga texnik xizmat ko‘rsatish
            servis markazi ishga tushirildi
          </h1>
          <div className={styles.imgBlock}>
            <Image
              src={photo1}
              alt="photo1"
              style={{ width: "80%", height: "auto", objectFit: "cover" }}
            />
          </div>
          <p>
            Yurtimizda yuqori surʼatlarda joriy etib borilayotgan qayta
            tiklanuvchi energiya manbalari qurilmalariga texnik xizmat
            koʻrsatish masalasi dolzarb masalalardan hisoblanadi. Shu maqsadda
            Qashqadaryo viloyatida ham kichik quvvatli qayta tiklanuvchi
            energiya manbalari qurilmalarini o‘rnatish va ekspluatatsiya qilish
            ishlarini tizimli tashkil etish bo‘yicha “Yashil energiya”
            kompaniyasining filiali faoliyati yo‘lga qo‘yildi.
          </p>
          <div className={styles.imgBlock}>
            <Image
              src={photo2}
              alt="photo2"
              style={{ width: "80%", height: "auto", objectFit: "cover" }}
            />
          </div>
          <p>
            Xususan, bugun, 6-aprel kuni kompaniyaning Qashqadaryo viloyatida
            quyosh panellariga texnik xizmat ko‘rsatish servis markazi ishga
            tushirildi. Endi kompaniya viloyatdagi ijtimoiy soha obyektlari,
            davlat organlari hamda boshqa tashkilotlarning bino va inshootlarida
            kichik quvvatli qayta tiklanuvchi energiya manbalari qurilmalarini
            o‘rnatish hamda ekspluatatsiyasini nazorat qilish bilan birga,
            doimiy ravishda monitoring ham qilib boradi.
          </p>
        </div>
      </div>
    </>
  );
}
