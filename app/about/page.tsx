import "../../scss/globals.scss";
import styles from "./page.module.scss";
import { TheHero } from "@/components/HeroComponent/TheHero";
import { TheFeedback } from "@/components/FeedbackComponent/TheFeedback";

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
              "Yashil Energiya" MCHJ O'zbekiston Respublikasi Prezidentining
              2023 yil 16 fevraldagi "2023 yilda qayta tiklanuvchi energiya
              manbalarini va energiya tejovchi texnologiyalarni joriy etishni
              jadallashtirish chora-tadbirlari tugrisida"gi PQ-57-sonli qaroriga
              asosan tashkil etilgan.
            </p>
            <p className={styles.descr}>
              "Yashil Energiya" MCHJ tashkil etishdan asosiy maqsad:
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
                - respublika xududlarida o'rnatilgan qayta tiklanuvchi energiya
                manbalari qurilmalariga servis va texnik xizmat ko'rsatish.
              </span>
            </p>
          </div>
          <div className={styles.imgBlock}>
            <img className={styles.img} src="/about.png" alt="logo" />
          </div>
          <div className={styles.descrBlock}>
            <p className={styles.descr}>
              Qayta tiklanuvchi energiya manbalari qurilmalari orqali elektr
              energiya ishlab chiqarilganda atrof-muxitga zarali gazlar
              chiqmaydi. Qayta tiklanuvchi energiya manbalari qurilmalari
              foydalanishga topshirilgan vaqtdan boshlab daromad olish imkoni
              yuzaga keladi. Bunday qurilmalar binolarning tom qismida yoki
              bo'sh yer maydonlarga o'rnatilib, ishlash jarayonida shovqin
              bo'lmaydi. Zamonaviy vositalar orqali bino va xonadonlarni elektr
              energiyasi bilan ta’minlash imkoniyati yuzaga keladi. Bu
              qurilmalarni o'rnatish oson va doimiy texnik xizmat ko'rsatish
              talab etilmaydi. Servis xizmat ko'rsatilgan sari elektr energiyasi
              xajmi xam ko'payib boradi. Mazkur qurilmalar o'rtacha 20-25 yil
              davomida xizmat ko'rsatadi. Mulk egasi extiyojidan ortgan qismini
              elektr tarmoqlari korxonasiga sotib, daromad olish imkoni mavjud.
            </p>
            <p className={styles.descr}>
              <b>On-Grid</b> tizimi - xududiy elektr tarmoqlari tizimiga ulangan
              bulib, invertorlar orqali xosil bo'lgan o'zgaruvchan energiya
              manbaidan quyoshli kunlarda bemalol foydalanishingiz mumkin.
              Iste’molingizdan ortig'ini esa maxaliy elektr tarmog'iga
              yo'naltirishingiz, aniqrog'i sotishingiz mumkin. Albatta buning
              uchun xududiy elektr tarmog'ida xam elektr energiyasi mavjud
              bulishi lozim. Shuning uchun bu usul tarmoq ichida tizim deb
              ataladi.
            </p>
            <p className={styles.descr}>
              <b>Off-Grid</b> tizimi - xududiy elektr tarmoqlari tizimidan xoli,
              mustaqil (avtonom) tizim bo'lib, quyoshli kunlarda xosil bo'lgan
              va iste’molingizdan ortib qolgan elektr manbaini zaxiraga olib
              qo'yish imkoniyatiga ega bo'lasiz. Bunda batareyalarga "g'amlab"
              qo'yilgan elektr energiyasi Sizni kechayu kunduz uzluksiz elektr
              energiyasi bilan ta’minlab turadi.
            </p>
            <p className={styles.descr}>
              <b>Gibrid</b> tizimi - On-Grid (tizim ichidagi) va Off-Grid
              (tizimdan tashqari) imkoniyatlarini birlashtirgan Sizning "quyosh
              elektr stansiyangiz"dir. Bunda Siz bir vaqtning uzida xam xududiy
              elektr tarmog'iga ulangan bo'lasiz, xam o'z elektr zaxirangizga
              ega bulasiz. Xoxlang uzingiz "ishlab chiqargan" elektr manbaini
              maxalliy elektr tarmog'iga soting, xoxlang zaxira sifatida
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
