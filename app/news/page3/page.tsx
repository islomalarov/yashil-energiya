import { TheHero } from "@/components/HeroComponent/TheHero";
import "../../../scss/globals.scss";
import styles from "./page.module.scss";
import Image from "next/image";

export default function Page3() {
  return (
    <>
      <TheHero title1="Yangiliklar" url1="news" />
      <div className="newsContainer">
        <div className={styles.content}>
          <h1 style={{ textAlign: "center", paddingBottom: 50 }}>
            "Yashil Energiya" MChJ “Huawei” kompaniyasining invertorlarini sotib
            oladi"
          </h1>
          <p>
            O‘zbekiston Energetika vazirligida mamlakatda qayta tiklanadigan
            energiya manbalarini joriy etish loyihalarini amalga oshirish uchun
            Huawei kompaniyasining invertorlarini yetkazib berish bo‘yicha
            shartnoma imzolash marosimi bo‘lib o‘tdi.
          </p>
          <div className={styles.imgBlock}>
            <Image
              width={1000}
              height={400}
              src="/newsPhoto/photo-3.jpg"
              alt=""
              style={{ width: "80%", height: "auto", objectFit: "cover" }}
            />
          </div>
          <p>
            O‘zbekiston Energetika vazirligida “Yashil Energiya” mas’uliyati
            cheklangan jamiyati va “Huawei” kompaniyasi o‘rtasida mamlakatimizda
            qayta tiklanadigan energiya manbalarini joriy etish va
            rivojlantirish loyihalarini amalga oshirish uchun invertorlar
            yetkazib berish bo‘yicha shartnoma imzolash marosimi bo‘lib o‘tdi.
            Marosimda Energetika vaziri o‘rinbosari Akmal Jumanazarov va Huawei
            kompaniyasining Yaqin Sharq va Markaziy Osiyo bo‘yicha
            vitse-prezidenti janob Van Shunli ishtirok etdi va ikki tomonlama
            hamkorlikni mustahkamlash rejalari muhokama qilindi.
          </p>
          <div className={styles.imgBlock}>
            <Image
              width={1000}
              height={400}
              src="/newsPhoto/photo-3-1.jpg"
              alt=""
              style={{ width: "80%", height: "auto", objectFit: "cover" }}
            />
          </div>
          <blockquote style={{ textAlign: "justify" }}>
            <i>
              “Huawei joriy yil boshidan ekotizim va energetika sohasidagi
              hamkorlari bilan aloqalarni mustahkamladi. Energetika vazirligi
              delegatsiyasi vakillariga kompaniyaning Xitoydagi
              shtab-kvartirasida joylashgan ko‘rgazma zal, shuningdek, “quyosh”
              texnologiyalarini ishlab chiqaruvchi zavodning ishlab chiqarish
              quvvatlari bilan tanishuv ekskursiyasini uyushtirildi. Sian
              shahrida boʻlib oʻtgan Oʻzbek-Xitoy biznes-forumi doirasida
              vazirlik bilan ushbu Huawei yechimlarini Oʻzbekistonda tatbiq
              etishni kengaytirish boʻyicha keyingi harakatlarni belgilovchi
              memorandum imzolandi. Bugungi kelishuvning imzolanishi
              mamlakatning uglerod neytralligiga o‘tish jarayonini tezlashtirish
              yo‘lidagi navbatdagi qadamlardan biri bo‘ldi”, — deya ta’kidladi
              Huawei kompaniyasining O‘zbekistondagi direktori janob Chen
              Szyakay.
            </i>
          </blockquote>
          <p>
            Huawei Digital Power bo‘linmasi yechimlari bir necha yillardan buyon
            O‘zbekiston Respublikasida yirik sanoat elektr stansiyalari, tijorat
            va sanoat sektori, shuningdek, mahalliy quyosh elektr stansiyalari
            uchun fotoelektrik texnologiyalarni joriy etish loyihalarida
            qo‘llanilmoqda. Huawei invertorlari 2023-yil 19-may kuni Sian
            shahrida bo‘lib o‘tgan O‘zbek-Xitoy yutuqlari ko‘rgazmasida
            Energetika vazirligi stendida ham tomonlar o'rtasidagi
            muvaffaqiyatli hamkorlik namunasi sifatida namoyish etilgan edi.
          </p>
          <p>
            O‘zbekiston Energetika vazirligi delegatsiyasi 2023-yil yanvar oyida
            Huawei kompaniyasining bosh qarorgohiga tashrif buyurib, u yerda
            Huawei Digital Power zavodining ishlab chiqarish quvvati bilan
            tanishdi. 2021-yildan beri Huawei Digital Power o‘z e’tiborini toza
            energiya ishlab chiqarish, transportni elektrlashtirish va yashil
            AKT infratuzilmasini barpo etish kabi sohalarga qaratmoqda. 2022-yil
            oxiriga kelib Huawei o‘z mijozlariga 695,1 mlrd kVt/soatdan ortiq
            “yashil” energiya ishlab chiqarishga va energiya sarfini 19,5 mlrd
            kVt/soatga kamaytirishga yordam berdi, bu deyarli 340 mln tonna CO2
            sarflanishining oldini olishga teng.
          </p>
        </div>
      </div>
    </>
  );
}
