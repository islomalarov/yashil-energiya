import "../../scss/globals.scss";
import styles from "./page.module.scss";
import { TheHero } from "@/components/HeroComponent/TheHero";
import { TheFeedback } from "@/components/FeedbackComponent/TheFeedback";
import Image from "next/image";
import { goals } from "@/data/goals";
import { systems } from "@/data/systems";

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
            </p>
            {goals.map((goal) => (
              <p key={goal.title} className={styles.descr}>
                - {goal.title}
              </p>
            ))}
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
            {systems.map((system) => (
              <p className={styles.descr} key={system.title}>
                <b>{system.title}</b> - {system.description}
              </p>
            ))}
          </div>
        </div>
      </div>
      <TheFeedback />
    </>
  );
}
