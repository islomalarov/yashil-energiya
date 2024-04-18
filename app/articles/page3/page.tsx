import "../../../scss/globals.scss";
import styles from "./page.module.scss";
import Image from "next/image";
import { TheHero } from "@/components/HeroComponent/TheHero";
import photo1 from "@/public/articlesPhoto/photo-3.jpg";
export default function Page1() {
  return (
    <>
      <TheHero title1="Maqolalar" url1="articles" />
      <div className="newsContainer">
        <div className={styles.content}>
          <h1 style={{ textAlign: "center", paddingBottom: 50 }}>
            Qayta tiklanuvchi energiya bilan yashil energiyani qanday farqi bor?
          </h1>
          <div className={styles.imgBlock}>
            <Image
              src={photo1}
              alt="alt_1"
              style={{ width: "80%", height: "auto", objectFit: "cover" }}
            />
          </div>
          <p>
            Qayta tiklanadigan energiya va yashil energiya ko'pincha
            bir-birining o'rnida ishlatiladigan atamalardir, ammo ular o'rtasida
            ba'zi <b>nozik farqlar</b> mavjud.
          </p>
          <div>
            <h3 className={styles.subTitle}>Qayta tiklanadigan energiya</h3>
            <p>
              <b>Qayta tiklanadigan energiya</b> deganda tabiiy ravishda
              to'ldiriladigan va vaqt o'tishi bilan tugamaydigan energiya
              manbalari tushuniladi. Bu manbalar juda ko'p va ularni tugatmasdan
              qayta-qayta ishlatish mumkin. Qayta tiklanadigan energiya
              manbalariga misol sifatida quyosh energiyasi, shamol energiyasi,
              gidroenergetika, geotermal energiya va biomassa kiradi.
            </p>
            <p>
              Qayta tiklanadigan energiyaning asosiy xususiyati uning
              barqarorligidir. Ushbu manbalar doimiy ravishda tabiiy jarayonlar
              bilan to'ldirilib borganligi sababli, ular inson foydalanishi
              uchun deyarli cheksiz energiya ta'minotini taklif qiladi.
            </p>
          </div>
          <div>
            <h3 className={styles.subTitle}>Yashil energiya</h3>
            <p>
              <b>Yashil energiya </b>esa atrof-muhitga minimal salbiy ta'sir
              ko'rsatadigan energiya manbalari va texnologiyalarini nazarda
              tutadi. Qayta tiklanadigan energiya manbalari tabiiy ravishda
              yashil bo'lsa-da, ular issiqxona gazlari emissiyasi yoki boshqa
              ifloslantiruvchi moddalarni kam yoki umuman ishlab chiqaradi, ammo
              qayta tiklanadigan energiyaning barcha turlari yashil deb
              hisoblanmaydi.
            </p>
            <p>
              Misol uchun, yog'och yoki qishloq xo'jaligi chiqindilari kabi
              organik materiallarni yoqishdan kelib chiqadigan{" "}
              <b>biomassa energiyasi</b>
              qayta tiklanadi, chunki bu materiallar to'ldirilishi mumkin, ammo
              u o'rmonlarni kesish yoki yondirilganda havoni ifloslantiruvchi
              moddalarni chiqaradigan bo'lsa, har doim ham yashil deb
              hisoblanmasligi mumkin. <b>Gidroenergetika</b> sohasidagi
              inshoatlarni barpo etish davomida suvning yo’nalishini o’zgarishi
              ham oldingi yo’nalishi atrofida yashagan hayvonlarning yashash
              tarzini buzilishiga sabab bo’lishi mumkin.
            </p>
            <p>
              Aslini olganda, yashil energiya nafaqat qayta tiklanadigan
              energiya manbalarini o'z ichiga olgan, balki ularning
              atrof-muhitga ta'siri va barqarorlik omillarini ham hisobga olgan
              kengroq tushunchani o'z ichiga oladi. U atrof-muhitga zarar
              etkazuvchi va uzoq muddatda barqaror energiya yechimlarini ilgari
              surishga qaratilgan.
            </p>
            <p>
              Xulosa qilib aytganda, barcha yashil energiya qayta tiklanadigan
              bo'lsa-da, hamma qayta tiklanadigan energiya ham yashil bo'lishi
              shart emas. Yashil energiya barqarorlik va ekologik tozalikni
              birinchi o'ringa qo'yadi, qayta tiklanadigan energiya esa tabiiy
              ravishda to'ldirilishi mumkin bo'lgan manbalarga ishora qiladi.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
