import "../../../scss/globals.scss";
import styles from "./page.module.scss";
import Image from "next/image";
import { TheHero } from "@/components/HeroComponent/TheHero";

export default function Page2() {
  return (
    <>
      <TheHero title1="Yangiliklar" url1="news" />
      <div className="newsContainer">
        <div className={styles.content}>
          <h1 style={{ textAlign: "center", paddingBottom: 50 }}>
            “Yashil Energiya” MChJ: kichik quvvatli quyosh fotoelektr
            stansiyalarini o‘rnatish ishlari boshlandi
          </h1>
          <div className={styles.imgBlock}>
            <Image
              width={600}
              height={400}
              src="/newsPhoto/photo-2.jpg"
              alt=""
              style={{ width: "80%", height: "auto", objectFit: "cover" }}
            />
          </div>
          <p>
            Prezidentimiz huzurida o‘tkazilgan yig‘ilishda berilgan
            topshiriqlarni o‘z vaqtida ijrosini ta’minlash maqsadida “Yashil
            Energiya” MCHJ tomonidan respublika hududlari bo‘ylab ijtimoiy va
            davlat obyektlari hamda boshqa tashkilotlar ehtiyojlari uchun kichik
            quvvatli quyosh fotoelektr stansiyalarini o‘rnatish ishlari jadal
            sur’atlarda boshlandi.
          </p>
          <p>
            Xususan, Toshkent viloyatining Bo‘ka tumanidagi tibbiyot
            muassasasida 50 kVt, Oqqo‘rg‘on tumanidagi Prezident maktabida 20
            kVt, Farg‘ona viloyatining Marg‘ilon shahridagi tibbiyot
            muassasasida 100 kVt, Andijon shahridagi 2 ta tibbiyot muassasasida
            200 kVt quvvatli quyosh fotoelektr stansiyalari o‘rnatilmoqda.
          </p>
          <div className={styles.imgBlock}>
            <Image
              width={600}
              height={400}
              src="/newsPhoto/photo-2-1.jpg"
              alt=""
              style={{ width: "80%", height: "auto", objectFit: "cover" }}
            />
          </div>
          <p>
            Shuningdek, respublika hududlari bo‘ylab bu kabi boshqa ijtimoiy
            soha obyektlarida quyosh fotoelektr stansiyalarini o‘rnatish ishlari
            olib borilmoqda.{" "}
          </p>
          <blockquote style={{ textAlign: "justify" }}>
            <i>
              Eslatib o‘tamiz, Prezidentimizning 2023-yil 16-fevraldagi
              PQ-57-son qaroriga muvofiq “Yashil Energiya” MCHJ tashkil etilgan.
              Kompaniya davlat budjeti hisobidan moliyalashtiriladigan ijtimoiy
              soha va davlat obyektlari ehtiyojlari uchun qayta tiklanuvchi
              energiya manbalari qurilmalarini o‘rnatadi va ekspluatatsiya
              qilish ishlarini amalga oshiradi.
            </i>
          </blockquote>
        </div>
      </div>
    </>
  );
}
