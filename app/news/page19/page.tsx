import "../../../scss/globals.scss";
import styles from "./page.module.scss";
import Image from "next/image";
import { TheHero } from "@/components/HeroComponent/TheHero";
import photo1 from "@/public/newsPhoto/photo-19.jpg";

export default function Page16() {
  return (
    <>
      <TheHero title1="Yangiliklar" url1="news" />
      <div className="newsContainer">
        <div className={styles.content}>
          <h1 style={{ textAlign: "center", paddingBottom: 50 }}>
            6-sentabr kuni “Yashil Energiya” MChJ va Xitoyning “Shandong
            Hi-Speed Co Ltd” kompaniyasi o‘rtasida uchrashuv o‘tkazildi.
          </h1>
          <div className={styles.imgBlock}>
            <Image className={styles.img} src={photo1} alt="photo1" />
          </div>
          <p>
            Unda “Yashil Energiya” kompaniyasi tomonidan yurtimizdagi bir qator
            ijtimoiy soha obyektlariga quyosh fotoelektr stansiyalarini
            o‘rnatish yuzasidan olib borilayotgan ishlar hamda ularning
            samaradorligi haqida batafsil maʼlumot berildi.
          </p>

          <p>
            Muzokara jarayonida xorijiy kompaniya O‘zbekistonda “yashil”
            energetikani jadal joriy etish borasida yirik loyihalar olib
            borilayotgani, bu borada bir nechta xitoy kompaniyalari ham faol
            ishtirok etayotgani hamda bu yo‘nalishda ham yaratilgan sharoitlar
            eʼtirof etildi.
          </p>
          <p>
            Shuningdek, Xitoy kompaniyasi respublikamiz hududidagi ijtimoiy soha
            obyektlarida umumiy quvvati 100 MVt bo‘lgan quyosh fotoelektr
            stansiyalarini o‘rnatishga qiziqish bildirayotganini alohida
            taʼkildlandi.
          </p>
          <p>
            Uchrashuv so‘ngida mazkur yo‘nalishda amalga oshirilishi lozim
            bo‘lgan ishlar haqida kelishib olindi.{" "}
          </p>
        </div>
      </div>
    </>
  );
}
