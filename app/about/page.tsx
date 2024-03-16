import "../../scss/globals.scss";
import styles from "./page.module.scss";
import { TheHero } from "@/components/HeroComponent/TheHero";
import { TheFeedback } from "@/components/FeedbackComponent/TheFeedback";
import Image from "next/image";

export default function About() {
  return (
    <>
      <TheHero
        title1="Kompaniya Haqida"
        url1="about"
        title2="Rahbariyat"
        url2="ceo"
      />
      <div className="container">
        <div className={styles.content}>
          <div className={styles.info}>
            <p className={styles.descr}>
              "Yashil Energiya" MChJ O‘zbekiston Respublikasi Prezidentining
              2023-yil 16-fevraldagi "2023-yilda qayta tiklanuvchi energiya
              manbalarini va energiya tejovchi texnologiyalarni joriy etishni
              jadallashtirish chora-tadbirlari to‘g‘risida"gi PQ-57-sonli
              qaroriga asosan tashkil etilgan.
            </p>
            <p className={styles.descr}>
              "Yashil Energiya" MChJ tashkil etilishidan asosiy maqsad:
              <br />
              <span>
                - qayta tiklanuvchi energiya manbalari qurilmalarini o'rnatish
                va ularni ekspluatatsiya qilish;
              </span>
              <br />
              <span>
                - qayta tiklanuvchi energiya manbalari qurilmalari orqali ishlab
                chiqarilgan elektr energiyasini iste’molchilarga yetkazish;
              </span>
              <br />
              <span>
                - respublika hududlarida o'rnatilgan qayta tiklanuvchi energiya
                manbalari qurilmalariga servis va texnik xizmat ko'rsatish.
              </span>
            </p>
          </div>
          <div className={styles.imgBlock}>
            <Image
              className={styles.img}
              width={1280}
              height={720}
              src="/minenergy.jpg"
              alt="about"
            />
          </div>
          <div className={styles.descrBlock}>
            <p className={styles.descr}>
              Qayta tiklanuvchi energiya manbalari qurilmalari orqali elektr
              energiya ishlab chiqarilganda atrof-muhitga zararli gazlar
              chiqmaydi. Qayta tiklanuvchi energiya manbalari qurilmalari
              foydalanishga topshirilgan vaqtdan boshlab daromad olish imkoni
              yuzaga keladi. Bunday qurilmalar binolarning tom qismida yoki
              bo‘sh yer maydonlarga o‘rnatilib, ishlash jarayonida shovqin
              bo‘lmaydi. Zamonaviy vositalar orqali bino va xonadonlarni elektr
              energiyasi bilan ta’minlash imkoniyati yuzaga keladi. Bu
              qurilmalarni o‘rnatish oson va doimiy texnik xizmat ko‘rsatish
              talab etilmaydi. Servis xizmat ko‘rsatilgan sari elektr energiyasi
              hajmi xam ko‘payib boradi. Mazkur qurilmalar o‘rtacha 20-25 yil
              davomida xizmat ko‘rsatadi. Mulk egasi ehtiyojidan ortgan qismini
              elektr tarmoqlari korxonasiga sotib, daromad olish imkoni mavjud.
            </p>
            <br />
            <p className={styles.descr}>
              <b>On-Grid</b> tizimi - hududiy elektr tarmoqlari tizimiga ulangan
              bo'lib, invertorlar orqali hosil bo'lgan o'zgaruvchan energiya
              manbaidan quyoshli kunlarda bemalol foydalanishingiz mumkin.
              Iste’molingizdan ortig'ini esa mahalliy elektr tarmog'iga
              yo'naltirishingiz, aniqrog'i sotishingiz mumkin. Albatta buning
              uchun hududiy elektr tarmog'ida ham elektr energiyasi mavjud
              bo'lishi lozim. Shuning uchun bu usul tarmoq ichida tizim deb
              ataladi.
            </p>
            <p className={styles.descr}>
              <b>Off-Grid</b> tizimi - hududiy elektr tarmoqlari tizimidan holi,
              mustaqil (avtonom) tizim bo'lib, quyoshli kunlarda hosil bo'lgan
              va iste’molingizdan ortib qolgan elektr manbaini zaxiraga olib
              qo'yish imkoniyatiga ega bo'lasiz. Bunda batareyalarga "g'amlab"
              qo'yilgan elektr energiyasi Sizni kecha-yu kunduz uzluksiz elektr
              energiyasi bilan ta’minlab turadi.
            </p>
            <p className={styles.descr}>
              <b>Gibrid</b> tizimi - On-Grid (tizim ichidagi) va Off-Grid
              (tizimdan tashqari) imkoniyatlarini birlashtirgan Sizning "quyosh
              elektr stansiyangiz"dir. Bunda Siz bir vaqtning o'zida xam hududiy
              elektr tarmog'iga ulangan bo'lasiz, ham o'z elektr zaxirangizga
              ega bo'lasiz. Xohlang o'zingiz "ishlab chiqargan" elektr manbaini
              mahalliy elektr tarmog'iga soting, xohlang zaxira sifatida
              batareyaga "g'amlab" qo'ygan elektr energiyangizdan o'zingiz
              bemalol foydalaning.
            </p>
          </div>
        </div>
      </div>
      <TheFeedback />
    </>
  );
}
