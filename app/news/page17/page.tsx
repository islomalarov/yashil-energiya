import "../../../scss/globals.scss";
import styles from "./page.module.scss";
import Image from "next/image";
import { TheHero } from "@/components/HeroComponent/TheHero";
import photo1 from "@/public/newsPhoto/photo-17.jpg";
import photo2 from "@/public/newsPhoto/photo-17-1.jpg";
import photo3 from "@/public/newsPhoto/photo-17-2.jpg";
import photo4 from "@/public/newsPhoto/photo-17-3.jpg";

export default function Page16() {
  return (
    <>
      <TheHero title1="Yangiliklar" url1="news" />
      <div className="newsContainer">
        <div className={styles.content}>
          <h1 style={{ textAlign: "center", paddingBottom: 50 }}>
            “Dovud ota” bojxona terminalida 300 kVt quvvatdagi QFES ishga
            tushurildi
          </h1>
          <div className={styles.imgBlock}>
            <Image className={styles.img} src={photo1} alt="photo1" />
          </div>
          <p>
            O‘zbekiston Respublikasi Bosh vazirining 2023-yil 4-aprelidagi
            12/1-2757-son topshirig‘iga asosan “Dovud ota” bojxona terminaliga
            300 kVt quvvatdagi fotoelektr stantsiyasi o‘rnatish bo‘yicha amaliy
            ishlar tashkil etilgan edi.{" "}
          </p>
          <div className={styles.imgBlock}>
            <Image className={styles.img} src={photo2} alt="photo2" />
          </div>
          <p>
            Loyiha davomida mazkur qurilmalarni o‘rnatish bo‘yicha qurilish
            ishlari amalga oshirilishi bilan bir qatorda elektr energiyasini
            tejash va energiya iste’moli ortishini kamaytirish maqsadida davlat
            xususiy sherikligi asosida kelishuvlarga erishilgandi.
          </p>
          <div className={styles.imgBlock}>
            <Image className={styles.img} src={photo3} alt="photo3" />
          </div>
          <p>
            Hozirda ushbu obyektdagi 300 kVt quvvatga ega bo'lgan stansiya
            muvaffaqiyatli foydalanishga topshirildi.
          </p>
          <div className={styles.imgBlock}>
            <Image className={styles.img} src={photo4} alt="photo4" />
          </div>
        </div>
      </div>
    </>
  );
}
