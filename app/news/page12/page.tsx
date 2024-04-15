import { TheHero } from "@/components/HeroComponent/TheHero";
import "../../../scss/globals.scss";
import styles from "./page.module.scss";
import Image from "next/image";
import photo1 from "@/public/newsPhoto/photo-12.jpg";
import photo2 from "@/public/newsPhoto/photo-12-1.jpg";
import photo3 from "@/public/newsPhoto/photo-12-2.jpg";

export default function Page12() {
  return (
    <>
      <TheHero title1="Yangiliklar" url1="news" />
      <div className="newsContainer">
        <div className={styles.content}>
          <h1 style={{ textAlign: "center", paddingBottom: 50 }}>
            Surxondaryo viloyatida quyosh panellariga texnik xizmat ko‘rsatish
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
            Surxondaryo viloyatida kichik quvvatli qayta tiklanuvchi energiya
            manbalari qurilmalarini o‘rnatish va ekspluatatsiya qilish ishlarini
            tizimli tashkil etish bo‘yicha “Yashil energiya” kompaniyasining
            filiali faoliyati yo‘lga qo‘yildi. Xususan, bugun, 5-aprel kuni
            kompaniyaning Surxondaryo viloyatida quyosh panellariga texnik
            xizmat ko‘rsatish servis markazi ishga tushirildi.
          </p>
          <div className={styles.imgBlock}>
            <Image
              src={photo3}
              alt="photo3 "
              style={{ width: "80%", height: "auto", objectFit: "cover" }}
            />
          </div>
          <p>
            Endi kompaniya viloyatdagi ijtimoiy soha obyektlari, davlat
            organlari hamda boshqa tashkilotlarning bino va inshootlarida kichik
            quvvatli qayta tiklanuvchi energiya manbalari qurilmalarini
            o‘rnatish hamda ekspluatatsiyasini nazorat qilish, shu bilan birga
            ularni doimiy ravishda monitoring qilib boradilar. Mazkur filial
            quyosh fotoelektr stansiyalarining ish rejimlarini doimiy nazorat
            qilish, yuzaga kelgan nosozliklarni o‘z vaqtida aniqlash hamda
            bartaraf etish, quyosh panellariga servis xizmati ko‘rsatish singari
            xizmatlarni ko‘rsatadi.
          </p>
        </div>
      </div>
    </>
  );
}
