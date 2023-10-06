import "../../scss/globals.scss";
import { TheHero } from "@/components/HeroComponent/TheHero";
import styles from "./page.module.scss";
import Link from "next/link";
import Image from "next/image";
import { TheFeedback } from "@/components/FeedbackComponent/TheFeedback";

export default function About() {
  return (
    <>
      <TheHero title="О компании" title2="Руководство" />
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
          <Image
            src="/about.png"
            alt="logo"
            width={620}
            height={680}
            priority
          />
          <p className={styles.descr}>
            Qayta tiklanuvchi energiya manbalari qurilmalari orqali elektr
            energiya ishlab chiqarilganda atrof-muxitga zarali gazlar chiqmaydi.
            Qayta tiklanuvchi energiya manbalari qurilmalari foydalanishga
            topshirilgan vaqtdan boshlab daromad olish imkoni yuzaga keladi.
            Bunday qurilmalar binolarning tom qismida yoki bo'sh yer maydonlarga
            o'rnatilib, ishlash jarayonida shovqin bo'lmaydi. Zamonaviy
            vositalar orqali bino va xonadonlarni elektr energiyasi bilan
            ta’minlash imkoniyati yuzaga keladi. Bu qurilmalarni o'rnatish oson
            va doimiy texnik xizmat ko'rsatish talab etilmaydi. Servis xizmat
            ko'rsatilgan sari elektr energiyasi xajmi xam ko'payib boradi.
            Mazkur qurilmalar o'rtacha 20-25 yil davomida xizmat ko'rsatadi.
            Mulk egasi extiyojidan ortgan qismini elektr tarmoqlari korxonasiga
            sotib, daromad olish imkoni mavjud.
          </p>
          <p className={styles.descr}>
            <b>On-Grid</b> tizimi - xududiy elektr tarmoqlari tizimiga ulangan
            bulib, invertorlar orqali xosil bo'lgan o'zgaruvchan energiya
            manbaidan quyoshli kunlarda bemalol foydalanishingiz mumkin.
            Iste’molingizdan ortig'ini esa maxaliy elektr tarmog'iga
            yo'naltirishingiz, aniqrog'i sotishingiz mumkin. Albatta buning
            uchun xududiy elektr tarmog'ida xam elektr energiyasi mavjud bulishi
            lozim. Shuning uchun bu usul tarmoq ichida tizim deb ataladi.
          </p>
          <p className={styles.descr}>
            <b>Off-Grid</b> тизими - худудий электр тармоклари тизимидан холи,
            мустакил (автоном) тизим булиб, куёшли кунларда хосил булган ва
            Истеъмолингиздан ортиб колган электр манбаини захирага олиб куйиш
            имкониятига эга буласиз. Бунда батареяларга "гамлаб" куйилган электр
            энергияси Сизни кечаю кундуз узлуксиз электр энергияси билан
            таъминлаб туради.
          </p>
          <p className={styles.descr}>
            <b>Гибрид</b> тизими - On-Grid (тизим ичидаги) ва Off-Grid (тизимдан
            ташкари) имкониятларини бирлаштирган Сизнинг "куёш электр
            станциянгиз"дир. Бунда Сиз бир вактнинг узида хам худудий электр
            тармогига уланган буласиз, хам уз электр захирангизга эга буласиз.
            Хохланг узингиз "ишлаб чикарган" электр манбаини махаллий электр
            тармогига сотинг, хохланг захира сифатида батареяга "гамлаб" куйган
            электр энергиянгиздан узингиз бемалол фойдаланинг.
          </p>
        </div>
      </div>
      <TheFeedback />
    </>
  );
}
