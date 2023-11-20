import { TheHero } from "@/components/HeroComponent/TheHero";
import "../../../scss/globals.scss";
import styles from "./page.module.scss";
import Image from "next/image";
import ExportedImage from "next-image-export-optimizer";

export default function Page2() {
  return (
    <>
      <TheHero title1="Yangilikar" url1="news" />
      <div className="newsContainer">
        <div className={styles.content}>
          <h1 style={{ textAlign: "center", paddingBottom: 50 }}>
            "Yashil Energiya" va "Tongwei Solar" MChJ umumiy quvvati 300 MW
            gacha bo'lgan fotoelektrik modullarni yetkazib berish bo'yicha
            shartnoma imzoladi
          </h1>
          <div className={styles.imgBlock}>
            <Image
              width={600}
              height={400}
              src="/newsPhoto/photo-4.jpg"
              alt=""
              style={{ width: "100%", height: "auto", objectFit: "cover" }}
            />
          </div>
          <p>
            Kam quvvatli qayta tiklanadigan energiya manbalari uchun
            fotoelektrik modullarni ijtimoiy soha obyektlari, davlat organlari
            va boshqa tashkilotlarning bino va inshootlariga o'rnatish maqsadida
            umumiy quvvati 300 MW gacha yetkazib berish uchun Xitoyning Tongwei
            Solar (Hefei) Co., Ltd. kompaniyasi bilan shartnoma imzolandi
          </p>
          <p>
            Ma'lumot uchun," Tongwei Solar ""Tier 1" ro'yxatiga kiritilgan
            quyosh batareyalari va ular uchun plitalarning eng yirik ishlab
            chiqaruvchisi hisoblanadi. "Tongwei Solar" modullari butun dunyo
            bo'ylab bir nechta mintaqaviy bozorlarda fotoelektr energiyasi
            ishlab chiqarish loyihalarida keng qo'llanilgan.
          </p>
          <p>
            Tongwei quyosh panellari ishlab chiqarish quvvati yiliga 45 GW dan
            ortiq. Quyosh elementlarining umumiy ishlab chiqarish quvvati yiliga
            100 GW dan oshadi.
          </p>
        </div>
      </div>
    </>
  );
}
