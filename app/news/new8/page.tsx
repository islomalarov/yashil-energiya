import { TheHero } from "@/components/HeroComponent/TheHero";
import "../../../scss/globals.scss";
import styles from "./page.module.scss";
import Image from "next/image";
import photo1 from "@/public/newsPhoto/photo-8.jpg";
import photo2 from "@/public/newsPhoto/photo-8-1.jpg";
import photo3 from "@/public/newsPhoto/photo-8-2.jpg";
import photo4 from "@/public/newsPhoto/photo-8-3.jpg";
import Link from "next/link";

export default function Page8() {
  return (
    <>
      <TheHero title1="Yangilikar" url1="news" />
      <div className="newsContainer">
        <div className={styles.content}>
          <h1 style={{ textAlign: "center", paddingBottom: 50 }}>
            “Yashil energiya”: Jizzax viloyatida quyosh panellariga texnik
            xizmat ko‘rsatish servis markazlari ishga tushirildi
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
            Jizzax viloyatida kichik quvvatli qayta tiklanuvchi energiya
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
            Xususan, kecha, 17-yanvar kuni kompaniyaning Jizzax viloyatida
            quyosh panellariga texnik xizmat ko‘rsatish servis markazi ishga
            tushirildi.
          </p>
          <div className={styles.imgBlock}>
            <Image
              src={photo4}
              alt="photo4"
              style={{ width: "80%", height: "auto", objectFit: "cover" }}
            />
          </div>
          <p>
            <i>
              <b>Eslatib o‘tamiz, </b>2023-yilning 10-11-dekabr kunlari Andijon
              viloyati va Qoraqalpog‘iston Respublikasida xuddi mana shunday
              quyosh panellariga texnik xizmat ko‘rsatish servis markazlari{" "}
              <Link
                className="tg_link"
                style={{ color: "blue" }}
                href="https://t.me/minenergy_uz/9917"
              >
                ishga tushirilgan edi
              </Link>
            </i>
            .
            <br />
            <br />
            <i>
              <b>Ma’lumot uchun:</b> O‘zbekistonning qolgan 11 ta hududida ham
              mana shunday servis markazlari ishga tushirilishi
              rejalashtirilgan.
              <br />{" "}
            </i>
          </p>
        </div>
      </div>
    </>
  );
}
