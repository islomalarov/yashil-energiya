import "../../../scss/globals.scss";
import styles from "./page.module.scss";
import Image from "next/image";
import { TheHero } from "@/components/HeroComponent/TheHero";
import photo1 from "@/public/newsPhoto/photo-20.jpg";
import photo2 from "@/public/newsPhoto/photo-20-1.jpg";

export default function Page20() {
  return (
    <>
      <TheHero title1="Yangiliklar" url1="news" />
      <div className="newsContainer">
        <div className={styles.content}>
          <h1 style={{ textAlign: "center", paddingBottom: 50 }}>
            9−13-sentabr kunlari “Yuksalish” harakati hududiy qon quyish
            markazlari bilan birgalikda O‘zbekistonning barcha hududlarida qon
            topshirish aksiyasini o‘tkazildi.
          </h1>
          <div className={styles.imgBlock}>
            <Image className={styles.img} src={photo1} alt="photo1" />
          </div>
          <p>
            “Maqsad murakkab operatsiyalardan so‘ng, og‘ir jarohatlar yoki
            saraton kasalligiga chalingan va qon quyishga juda muhtoj bo‘lgan
            bemorlarni qo‘llab-quvvatlashdir. Bunday tadbirlarni muntazam
            ravishda o‘tkazish kasalxonalar va tibbiyot markazlarida qonning
            yetarli darajada ta’minlanishiga yordam beradi. Bu ayniqsa,
            favqulodda vaziyatlar va rejalashtirilgan operatsiyalar uchun
            muhimdir”, —{" "}
            <a
              className={styles.link}
              href="https://yumh.uz/uzc/news_detail/707"
            >
              deyiladi
            </a>{" "}
            harakat xabarida.
          </p>
          <div className={styles.imgBlock}>
            <Image className={styles.img} src={photo2} alt="photo2" />
          </div>
          <p>
            "Yashil Energiya" MChJ hodimlari ham turli tibbiyot amaliyotlarida
            bo'lgan yurtdoshlarimizga ko'mak berish maqsadida hayriya aksiyada
            faol ishtirok etishdi.
          </p>
        </div>
      </div>
    </>
  );
}
