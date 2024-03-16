import { TheHero } from "@/components/HeroComponent/TheHero";
import "../../../scss/globals.scss";
import styles from "./page.module.scss";
import Image from "next/image";

export default function Page5() {
  return (
    <>
      <TheHero title1="Yangiliklar" url1="news" />
      <div className="newsContainer">
        <div className={styles.content}>
          <h1 style={{ textAlign: "center", paddingBottom: 50 }}>
            “Yashil Energiya” kompaniyasi tomonidan yana 6 ta oliy ta’lim
            muassasalariga quyosh foto elektr stansiyalari o‘rnatildi
          </h1>
          <blockquote style={{ textAlign: "justify" }}>
            <i>
              O‘zbekiston Respublikasi Prezidentining “2023 yilda qayta
              tiklanuvchi energiya manbalarini va energiya tejovchi
              texnologiyalarni joriy etishni jadallashtirish chora-tadbirlari
              to‘g‘risida”gi PQ-57-son qarorining 6 bandiga muvofiq “Yashil
              energiya” MChJ tashkil etilib, ijtimoiy soha obyektlari, davlat
              organlari va boshqa tashkilotlarning bino va inshootlarida kichik
              quvvatli qayta tiklanuvchi energiya manbalari qurilmalarini
              o‘rnatib kelmoqda.
            </i>
          </blockquote>
          <div className={styles.imgBlock}>
            <Image
              width={1000}
              height={700}
              src="/newsPhoto/photo-5.jpg"
              alt=""
              style={{ width: "80%", height: "auto", objectFit: "cover" }}
            />
          </div>
          <p>
            Respublika bo‘yicha ijtimoiy soha obyektlari va davlat idoralari
            bino inshootlariga jami 10 MVt (Toshkent shahrida - 2 MVt, Andijon
            viloyatida - 0,75 MVt, Farg‘ona viloyatida - 0,6 MVt, Toshkent
            viloyatida - 0,85 MVt, Surxondaryo viloyatida - 0,55 MVt,
            Kashqadaryo viloyati - 0,6 MVt, Jizzax viloyatida - 0,65 MVt,
            Samarqand viloyatida - 0,7 MVt, Sirdaryo viloyati - 0,65 MVt,
            Qoraqalpog‘iston Respublikasida - 0,5 MVt, Buxoro viloyatida - 0,5
            MVt, Navoiy viloyatida - 0,5 MVt, Namangan viloyati - 0,65 MVt,
            Xorazm viloyatida - 0,5 MVt) quvvatga teng quyosh fotoelektr
            stansiyalar o‘rnatish ishlari yakunlandi.
          </p>
          <p>
            Bundan tashqari xukumat topshirig‘iga asosan Respublika bo‘yicha
            jami 6 ta oliy talim muassasalariga umumiy quvvati 2,86 MVt bo‘lgan
            quyosh fotoelektr stansiyalari o‘rnatilib, 321 ta professional
            ta’lim muassasalariga 8,8 MVt quyosh panellari o‘rnatish ishlari
            olib borilmoqda. Bu o‘z o‘rnida Jamiyat tomonidan keng ko‘lamli
            ishlar olib borilishi energetika tizimining ishonchliligini oshirish
            hamda atrof muxitga ta’sir qiluvchi xar xil zaxarli moddalarning
            chiqarilishini oldini oladi.
          </p>
          <div className={styles.imgBlock}>
            <Image
              width={1000}
              height={400}
              src="/newsPhoto/photo-5-1.jpg"
              alt=""
              style={{ width: "80%", height: "auto", objectFit: "cover" }}
            />
          </div>
          <p>
            Quyosh panellarini o‘rnatishdan ko‘zlangan asosiy maqsad qayta
            tiklanuvchi energiya manbalari qurilmalaridan keng foydalanish,
            iste’molchilarni muqobil energiyaga o‘tkazish, energiya tejamkor
            texnologiyalarni joriy qilish va tabiiy gazni iqtisod qilish hamda
            qish mavsumida aholini uzluksiz energiya manbai bilan ta’minlash
            maqsad qilingan.
          </p>
        </div>
      </div>
    </>
  );
}
