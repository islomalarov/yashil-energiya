import { TheHero } from "@/components/HeroComponent/TheHero";
import "../../../scss/globals.scss";
import styles from "./page.module.scss";
import Image from "next/image";
import photo1 from "@/public/newsPhoto/photo-14.jpg";
import photo2 from "@/public/newsPhoto/photo-14-1.jpg";
import photo3 from "@/public/newsPhoto/photo-14-2.jpg";

export default function Page14() {
  return (
    <>
      <TheHero title1="Yangiliklar" url1="news" />
      <div className="newsContainer">
        <div className={styles.content}>
          <h1 style={{ textAlign: "center", paddingBottom: 50 }}>
            “Yashil makon”: Yashnobod tumanida 250 tup daraxt ko‘chatlari ekildi
          </h1>
          <div className={styles.imgBlock}>
            <Image
              src={photo1}
              alt="photo1"
              style={{ width: "80%", height: "auto", objectFit: "cover" }}
            />
          </div>
          <p>
            Joriy yil 7-aprel kuni “Yashil makon” umummilliy loyihasi doirasida
            Energetika vazirligi, “Yashil energiya” MCHJ va “Huawei” kompaniyasi
            xodimlari tomonidan Yashnobod tumani, Ahmad Yassaviy mahallasi,
            Alimkent ko‘chasi hududida 250 tup kashtan daraxt ko‘chati ekildi.
          </p>
          <div className={styles.imgBlock}>
            <Image
              src={photo2}
              alt="photo2"
              style={{ width: "80%", height: "auto", objectFit: "cover" }}
            />
          </div>
          <p>
            Eslatib o‘tamiz, Energetika vazirligi va tizimdagi barcha
            tashkilotlar tomonidan loyiha doirasida respublika hududlari bo‘ylab
            obodonlashtirish hamda ko‘kalamzorlashtirish ishlari davom etmoqda.
          </p>
          <div className={styles.imgBlock}>
            <Image
              src={photo3}
              alt="photo3"
              style={{ width: "80%", height: "auto", objectFit: "cover" }}
            />
          </div>
        </div>
      </div>
    </>
  );
}
