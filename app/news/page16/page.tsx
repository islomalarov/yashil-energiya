import "../../../scss/globals.scss";
import styles from "./page.module.scss";
import Image from "next/image";
import { TheHero } from "@/components/HeroComponent/TheHero";
import photo1 from "@/public/newsPhoto/photo-16.jpg";
import photo2 from "@/public/newsPhoto/photo-16-1.jpg";
import photo3 from "@/public/newsPhoto/photo-16-2.jpg";

export default function Page16() {
  return (
    <>
      <TheHero title1="Yangiliklar" url1="news" />
      <div className="newsContainer">
        <div className={styles.content}>
          <h1 style={{ textAlign: "center", paddingBottom: 50 }}>
            O‘zbekiston, Malayziya va Xitoy kompaniyalari o‘rtasida “yashil”
            energetikani rivojlantirish bo‘yicha Hamkorlik kelishuvi imzolandi.
          </h1>
          <div className={styles.imgBlock}>
            <Image className={styles.img} src={photo1} alt="photo1" />
          </div>
          <p>
            Joriy yilning 13 — 15-iyun kunlari Xitoyning Shanxay shahrida
            “Quyosh fotoelektr stansiyalari orqali elektr energiyasini ishlab
            chiqarish va “aqlli energetika” bo‘yicha 17-xalqaro konferensiya va
            ko‘rgazmasi bo‘lib o‘tdi.
          </p>
          <div className={styles.imgBlock}>
            <Image className={styles.img} src={photo2} alt="photo2" />
          </div>
          <p>
            Ushbu xalqaro tadbir doirasida “Yashil Energiya” MCHJ, Malayziyaning
            “Fabalous Sunview” va Xitoyning “Huawei Tech. Investment Tashkent”
            kompaniyalari o‘rtasida Hamkorlik kelishuvi imzolandi.
          </p>
          <div className={styles.imgBlock}>
            <Image className={styles.img} src={photo3} alt="photo3" />
          </div>
          <p>
            Ushbu kelishuv O‘zbekistonda “yashil” energetikani birgalikda
            rivojlantirish hamda ijtimoiy soha obyektlari, davlat idoralarining
            bino va inshootlarida umumiy quvvati 50 MVt bo‘lgan kichik quyosh
            fotoelektr stansiyalarini qurishni ko‘zda tutadi.
          </p>
        </div>
      </div>
    </>
  );
}
