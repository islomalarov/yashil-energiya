import "../../../scss/globals.scss";
import styles from "./page.module.scss";
import Image from "next/image";
import { TheHero } from "@/components/HeroComponent/TheHero";
import photo1 from "@/public/newsPhoto/photo-15.jpg";
import photo2 from "@/public/newsPhoto/photo-15-1.jpg";
import photo3 from "@/public/newsPhoto/photo-15-2.jpg";

export default function Page15() {
  return (
    <>
      <TheHero title1="Yangiliklar" url1="news" />
      <div className="newsContainer">
        <div className={styles.content}>
          <h1 style={{ textAlign: "center", paddingBottom: 50 }}>
            2024 yilning 18-19 may kunlari Malayziya Bosh vaziri Anvar Ibrohim
            boshchiligidagi delegatsiya yurtimizda boʻldi.
          </h1>
          <div className={styles.imgBlock}>
            <Image
              src={photo1}
              alt="photo1"
              style={{ width: "80%", height: "auto", objectFit: "cover" }}
            />
          </div>
          <p>
            Mehmonlar yuqori darajada kutib olindi. Delegatsiyaning tarkibida
            biznes doira vakillari jumladan, Energiya va ulgurji savdo
            yetakchilari ham tashrif buyurishdi.
          </p>
          <div className={styles.imgBlock}>
            <Image
              src={photo2}
              alt="photo2"
              style={{ width: "80%", height: "auto", objectFit: "cover" }}
            />
          </div>
          <p>
            Bu nimadan darak? Albatta, investitsiyaviy va savdo iqtisodiy
            hamkorlikka bo‘lgan kuchli xohish va O‘zbekistondagi mavjud
            investitsiyaviy imkoniyat va salohiyatga yuqori bahodir. Boisi
            hamkorlik rishtalarning mustahkamlanishidan har ikkala taraf ham
            manfaatdordir. Bir-birimizdan o‘rganadiganlarimiz ko‘p deb
            hisoblamoqda Malayziyalik mehmonlar. Qadimdan aynan savdo chorrahasi
            bo‘lgan Samarqand, O‘zbekiston-Malayziya biznes forumiga mezbonlik
            qildi. Bugungi o‘zaro ishonch, xohish bilan katta natijalarga
            erishish, hamkorlikka yangi mazmun bag‘ishlash mumkinligi forum va
            uning maydonidagi muloqotlarda yana bir bor o‘z tasdig‘ini topdi. Bu
            yo‘lda dastlabki kelishuvlar ham imzolandi. Bulardan, Yashil
            Energiya korxonasi, Malayziyaning ilg‘or kompaniyasi bo‘lgan Sunview
            kompaniyasi bilan juda qizg‘in va muhim mavzularda davra
            suhbatlarini amalga oshirdi. Jumladan, Quyosh foto
            elektrostansiyalari va mini-mikro GES'lar, Malayziya kompaniyasi
            vakillarida juda katta qiziqish tug‘dirdi. Bu esa o‘z navbatida
            Sunview kompaniyasi bu loyihalarga homiylik qilish rejalarini ilgari
            surdi. Ishonchli, ochiq va do‘stona muhitda o‘tgan muzokaralar
            yakunlari bo‘yicha tomonlar o‘zaro shartnomalarni imzolab,
            kelajakdagi biznes hamkorlikni va uzoq muddatli yo‘l xaritasini
            tuzib olindi.
          </p>
          <div className={styles.imgBlock}>
            <Image
              src={photo3}
              alt="photo3"
              style={{ width: "80%", height: "auto", objectFit: "cover" }}
            />
          </div>
          <p>
            Tashrif doirasida o‘tkazilgan O‘zbekiston-Malayziya biznes forumi
            yakunlari investitsiyaviy sheriklikni kengaytirishga, jumladan
            “yashil energetika” sohasida hamkorlikning rivojiga xizmat qilishiga
            ishonch bildirildi.
          </p>
        </div>
      </div>
    </>
  );
}
