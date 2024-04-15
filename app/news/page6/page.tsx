import { TheHero } from "@/components/HeroComponent/TheHero";
import "../../../scss/globals.scss";
import styles from "./page.module.scss";
import Image from "next/image";
import photo1 from "@/public/newsPhoto/photo-6.jpg";
import photo2 from "@/public/newsPhoto/photo-6-1.jpg";

export default function Page6() {
  return (
    <>
      <TheHero title1="Yangiliklar" url1="news" />
      <div className="newsContainer">
        <div className={styles.content}>
          <h1 style={{ textAlign: "center", paddingBottom: 50 }}>
            “Yashil Energiya” kompaniyasining dispetcherlik markazi ishga
            tushirildi
          </h1>
          <blockquote>
            Bugun, 3-noyabr kuni “Yashil energiya” MChJ qoshida Xitoyning
            “Huawei” kompaniyasi bilan birgalikda tashkil etilgan dispetcherlik
            markazi ishga tushirildi.
          </blockquote>
          <div className={styles.imgBlock}>
            <Image
              src={photo1}
              alt="photo1"
              style={{ width: "80%", height: "auto", objectFit: "cover" }}
            />
          </div>
          <p>
            Ma’lumki, Prezidentimizning 2023-yil 16-fevraldagi PQ-57-son
            qaroriga muvofiq mas’uliyati cheklangan jamiyat shaklidagi “Yashil
            energiya” kompaniyasi tashkil etilgandi.
          </p>
          <p>
            Kompaniya ijtimoiy soha obyektlari, davlat organlari va boshqa
            tashkilotlarning bino hamda inshootlariga kichik quvvatli qayta
            tiklanuvchi energiya manbalari qurilmalarini o‘rnatish va
            ekspluatatsiya qilish bilan shug‘ullanadi.{" "}
          </p>
          <div className={styles.imgBlock}>
            <Image
              src={photo2}
              alt="photo2"
              style={{ width: "80%", height: "auto", objectFit: "cover" }}
            />
          </div>
          <p>
            Belgilangan vazifalarni o‘z vaqtida, to‘liq hamda sifatli bajarish
            maqsadida kompaniya tomonidan bugungi kunga qadar{" "}
            <b>
              333 ta ijtimoiy soha obyektlari va davlat idoralarida umumiy
              quvvati 18,8 MVtga teng bo‘lgan quyosh fotoelektr stansiyalari
              foydalanishga topshirildi.
            </b>
          </p>
          <p>
            Mazkur o‘rnatilgan quyosh panellari orqali hozirgi kunga qadar{" "}
            <b>4 mln 531 ming kVt·soat</b> elektr energiyasi ishlab chiqarildi.
            Buning natijasida tarmoqdan olinadigan shu miqdordagi elektr
            energiyasi tejalishiga erishildi.
          </p>
        </div>
      </div>
    </>
  );
}
