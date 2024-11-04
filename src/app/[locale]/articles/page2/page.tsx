import "@/scss/globals.scss";
import styles from "./page.module.scss";
import Image from "next/image";
import { TheHero } from "@/src/components/HeroComponent/TheHero";
import photo1 from "@/public/articlesPhoto/photo-2.jpg";
export default function Page1() {
  return (
    <>
      <TheHero title1="Maqolalar" url1="articles" />
      <div className="newsContainer">
        <div className={styles.content}>
          <h1 style={{ textAlign: "center", paddingBottom: 50 }}>
            Yashil energiya nima?
          </h1>
          <div className={styles.imgBlock}>
            <Image
              src={photo1}
              alt="alt_1"
              style={{ width: "80%", height: "auto", objectFit: "cover" }}
            />
          </div>
          <p>
            <b>Yashil energiya</b> - bu qayta tiklanadigan va atrof-muhitga
            zarar keltirmaydigan tabiiy manbalardan olinadigan energiya. Bu
            insonlar hayoti uchun zarur bo’lgan energiyani tabiatning kuchidan
            foydalangan holatda olishdir. Bu manbalarga quyosh nuri, shamol,
            yomg'ir, suv toshqini, to'lqinlar va geotermal issiqlik kiradi.
            Ko'mir va neft kabi qazib olinadigan yoqilg'idan farqli o'laroq,
            yashil energiya manbalari tugamaydi va havoni ifloslantiradigan yoki
            iqlim o'zgarishiga hissa qo'shadigan zararli chiqindilar
            chiqarmaydi.
          </p>
          <div>
            <h3>Yashil energiya turlari:</h3>
            <p>
              <b>1. Quyosh energiyasi:</b> Bu quyosh nurlarini elektr
              energiyasiga aylantirish orqali olinadigan energiyadir. Quyosh
              energiyasini elektr energiyasiga aylantrish uchun quyosh elektr
              stansiyasi barpo etish kerak bo’ladi.
            </p>
            <p>
              <b>2. Shamol kuchi:</b> Shamol turbinalari elektr energiyasini
              ishlab chiqarish uchun shamol kuchidan foydalanadi. Shamol
              esganda, turbinalar aylanib, uylar va binolarni quvvatlantirish
              uchun ishlatilishi mumkin bo'lgan energiya hosil qiladi.
            </p>
            <p>
              <b>3. Gidroenergetika:</b> Bu energiya daryolar va soylar kabi
              oqayotgan suvdan olinadi. To'g'onlar va turbinalar harakatlanuvchi
              suvdan energiyani olib, uni elektr energiyasiga aylantiradi.
            </p>
            <p>
              <b>4. Geotermal energiya:</b> Bunga yer yuzasi ostidagi issiqlik
              kiradi. Issiq suv yoki bug' elektr energiyasini ishlab chiqarish
              yoki binolarni isitish uchun ishlatiladi.
            </p>
            <p>
              <b>5. Biomassa:</b> Bu energiya yog'och, ekin chiqindilari va
              hatto axlat kabi organik materiallardan olinadi. Ushbu materiallar
              parchalanganda yoki yondirilganda, ular isitish yoki elektr
              energiyasi uchun ishlatilishi mumkin bo'lgan energiyani chiqaradi.
            </p>
          </div>
          <div>
            <h3>Nega yashil energiya muhim?</h3>
            <p>
              <b>1. Atrof-muhitni muhofaza qilish:</b> Yashil energiya manbalari
              havo ifloslanishini kamaytirishga va iqlim o'zgarishiga qarshi
              kurashishga yordam beradigan issiqxona gazlari emissiyasini kam
              yoki umuman keltirib chiqarmaydi.
            </p>
            <p>
              <b>2. Energetika mustaqilligi:</b> Yashil energiyadan foydalanish
              bizni qazib olinadigan yoqilg‘ilarga qaramligimizni kamaytiradi.
              Buning natijasida esa energiya ishlab chiqarishning tannarxini ham
              kamayishiga olib keladi.
            </p>
            <p>
              <b>3. Ish o‘rinlarini yaratish:</b> Yashil energiya sektori
              iqtisodiy o‘sish va barqarorlikka hissa qo‘shuvchi ishlab
              chiqarish, o‘rnatish, texnik xizmat ko‘rsatish va tadqiqot
              sohasida ish o‘rinlarini yaratadi.
            </p>
            <p>
              <b>4. Barqarorlik:</b> Cheklangan va qayta tiklanmaydigan qazib
              olinadigan yoqilg'idan farqli o'laroq, yashil energiya manbalari
              barqaror va kelajak avlodlarini ham energiya bilan ta'minlashi
              mumkin.
            </p>
          </div>
          <div>
            <p>
              Xulosa qilib aytganda, yashil energiya tabiatning kuchidan toza,
              barqaror va odamlar uchun ham, sayyora uchun ham foydali bo'lgan
              tarzda foydalanishga qaratilgan. Yashil energiya texnologiyalariga
              sarmoya kiritib, qazib olinadigan yoqilg‘ilardan kamroq
              foydalanish orqali biz hamma uchun xavfsiz, toza va barqaror
              kelajakni qurishimiz mumkin.
            </p>
            <p>
              Shu jihatlar hisobga olingan holatda Prezidentimiz tashabbusi
              bilan 16.02.2023 yildagi <b>PQ-57</b>-sonli qarori (“2023-yilda
              qayta tiklanuvchi energiya manbalarini va energiya tejovchi
              texnologiyalarni joriy etishni jadallashtirish chora-tadbirlari
              toʻgʻrisida”) asosida <b>“Yashil Energiya” MChJ</b> tashkil etildi
              va O’zbekiston Respublikasi hududida yashil energiyadan
              foydalanishni ommalashtirish bo’yicha faoliyat yuritmoqda.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
