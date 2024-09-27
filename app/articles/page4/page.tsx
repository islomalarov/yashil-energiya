import "../../../scss/globals.scss";
import styles from "./page.module.scss";
import Image from "next/image";
import { TheHero } from "@/components/HeroComponent/TheHero";
import photo1 from "@/public/articlesPhoto/photo-4.jpg";
export default function Page4() {
  return (
    <>
      <TheHero title1="Maqolalar" url1="articles" />
      <div className="newsContainer">
        <div className={styles.content}>
          <h1 style={{ textAlign: "center", paddingBottom: 50 }}>
            Dunyodagi top davlatlar elektr energiyasini qaysi manbalar orqali
            olishadi?
          </h1>
          <div className={styles.imgBlock}>
            <Image
              src={photo1}
              alt="alt_1"
              style={{ width: "80%", height: "auto", objectFit: "cover" }}
            />
          </div>
          <p>
            Elektr energiyasi bizning uylarimiz, korxonalarimiz va
            sanoatlarimizni quvvatlantiradi, rivojlanish va taraqqiyotga turtki
            beradi. Ammo bu elektr energiyasi qayerdan kelganini hech o'ylab
            ko'rganmisiz? Keling, dunyoning ba'zi yetakchi davlatlari
            foydalanadigan elektr energiyasi manbalarini batafsil ko'rib
            chiqaylik.
          </p>
          <div className={styles.infoBlock}>
            <h3 className={styles.subTitle}>Amerika Qo'shma Shtatlari</h3>
            <p>
              Qo'shma Shtatlar dunyo miqyosida elektr energiyasining eng yirik
              iste'molchilaridan biri bo'lib, uning energiya tarkibi
              xilma-xildir. AQSh Energetika Axborot Boshqarmasi (EIA)
              ma'lumotlariga ko'ra, 2020-yilda AQShda elektr energiyasini ishlab
              chiqarishning asosiy manbalari:
            </p>
            <p>
              <b>1. Tabiiy gaz:</b> Tabiiy gaz AQShda elektr energiyasini ishlab
              chiqarishda yetakchi manbaga aylandi va umumiy ishlab
              chiqarishning taxminan 40% ni tashkil qiladi. Tabiiy gazni
              ko'mirga nisbatan arzonligi va emissiyasi pastligi uchun ma'qul
              ko’riladi.
            </p>
            <p>
              <b>2. Yadro energetikasi:</b> Yadro energetikasi AQSh elektr
              ta'minotiga sezilarli hissa qo'shadi va umumiy ishlab
              chiqarishning taxminan 20% ni tashkil qiladi. Bu kam emissiya
              manbai, lekin chiqindilarni utilizatsiya qilish va xavfsizlik
              bilan bog'liq muammolarga ega.
            </p>
            <p>
              <b>3. Qayta tiklanadigan energiya:</b> Qayta tiklanadigan manbalar
              AQShning energiya aralashmasida tobora kuchayib bormoqda. 2020
              yilda qayta tiklanadigan manbalar umumiy elektr energiyasi ishlab
              chiqarishning qariyb 20 foizini tashkil etdi. Bunga shamol,
              quyosh, gidroelektr va biomassa energiyasi kiradi.
            </p>
            <p>
              <b> 4. Ko'mir:</b> So'nggi yillarda uning ulushi pasaygan
              bo'lsa-da, ko'mir hali ham AQShda elektr energiyasi ishlab
              chiqarishning 20% atrofida hissa qo'shadi.
            </p>
          </div>
          <div className={styles.infoBlock}>
            <h3 className={styles.subTitle}>Xitoy</h3>
            <p>
              Xitoy dunyodagi eng yirik elektr energiyasi ishlab chiqaruvchi va
              iste'molchisi hisoblanadi. Uning energetika landshafti tez
              sur'atlar bilan rivojlanmoqda, qayta tiklanadigan energiyaga
              e'tibor ortib bormoqda. Xitoy Milliy Statistika Byurosining
              ma'lumotlariga ko'ra, so'nggi yillarda Xitoyda elektr energiyasini
              ishlab chiqarishning asosiy manbalari quyidagilardan iborat:
            </p>
            <p>
              <b>1. Ko'mir: </b>Ko'mir tarixan Xitoyda elektr energiyasining
              asosiy manbai bo'lib, umumiy ishlab chiqarishning taxminan 60% dan
              70% gacha bo'lgan. Biroq hukumat ekologik muammolar tufayli ko‘mir
              ulushini kamaytirish ustida faol ishlamoqda.
            </p>
            <p>
              <b>2. Gidroenergetika:</b> Xitoy ham gidroenergetika ishlab
              chiqarish bo‘yicha yetakchi bo‘lib, yirik gidroelektr loyihalariga
              katta sarmoya kiritadi. Gidroenergetika umumiy ishlab
              chiqarishning taxminan 15-20 foizini tashkil qiladi.
            </p>
            <p>
              <b>3. Qayta tiklanadigan energiya:</b> Xitoy qayta tiklanadigan
              energiya imkoniyatlarini, xususan, shamol va quyosh energiyasini
              jadal kengaytirmoqda. Qayta tiklanadigan manbalar umumiy elektr
              energiyasi ishlab chiqarishning taxminan 25 foizini tashkil
              qiladi, bunda shamol va quyosh yetakchilik qiladi.
            </p>
            <p>
              <b>4. Tabiiy gaz: </b>Energiya aralashmasining nisbatan kichik
              qismi bo'lsa-da, Xitoyda tabiiy gaz, xususan, shaharlarda elektr
              energiyasi ishlab chiqarish uchun ko'payib bormoqda
            </p>
          </div>
          <div className={styles.infoBlock}>
            <h3 className={styles.subTitle}>Germaniya</h3>
            <p>
              Germaniya qayta tiklanadigan energetikaning ulkan maqsadlari va
              Energiewende (energiyaga o'tish) siyosati bilan mashhur. Germaniya
              Iqtisodiy ishlar va energetika federal vazirligi ma'lumotlariga
              ko'ra, so'nggi yillarda Germaniyada elektr energiyasini ishlab
              chiqarishning asosiy manbalari quyidagilardan iborat:
            </p>
            <p>
              <b>1. Qayta tiklanadigan energiya:</b> Qayta tiklanadigan manbalar
              Germaniyada elektr energiyasi ishlab chiqarishda yetakchi o‘rinni
              egalladi. 2020 yilda qayta tiklanadigan manbalar jami ishlab
              chiqarishning 50% dan ortig'ini tashkil etdi, bunda shamol va
              quyosh yetakchilik qilmoqda.
            </p>
            <p>
              <b>2. Ko'mir: </b>Ko'mir, xususan, qo'ng'ir va toshko'mir
              an'anaviy ravishda Germaniyaning energiya aralashmasining muhim
              qismi bo'lib kelgan. Biroq, so'nggi yillarda uning ulushi pasayib
              bormoqda, bu umumiy ishlab chiqarishning 25% dan 30% gachani
              tashkil qiladi.
            </p>
            <p>
              <b>3. Yadro energetikasi:</b> Germaniya 2011-yildagi Fukusima
              fojiasidan beri yadroviy energetikadan voz kechmoqda. Yadro
              hozirda jami ishlab chiqarishning taxminan 10 foizini tashkil
              qiladi, ammo 2022-yilga kelib butunlay tugatilishi kutilmoqda.
            </p>
            <p>
              <b>4. Tabiiy gaz:</b> Tabiiy gaz ko'mir va qayta tiklanadigan
              manbalarga qaraganda Germaniyaning energiya aralashmasida
              kichikroq rol o'ynaydi, bu umumiy ishlab chiqarishning taxminan
              10% dan 15% gacha.
            </p>
          </div>
          <div className={styles.infoBlock}>
            <h3 className={styles.subTitle}>Fransiya</h3>
            <p>
              Fransiya elektr energiyasini ishlab chiqarishda atom energiyasidan
              keng foydalanishi bilan mashhur. Fransiyaning Ekologik o'tish
              vazirligi ma'lumotlariga ko'ra, Fransiyada elektr energiyasini
              ishlab chiqarishning asosiy manbalari quyidagilardan iborat:
            </p>
            <p>
              <b>1. Yadro energetikasi:</b> Yadro energetikasi Fransiyaning
              energetika siyosatining asosi bo‘lib, umumiy elektr energiyasi
              ishlab chiqarishning taxminan 70% ni tashkil qiladi. Fransiya
              butun dunyo bo'ylab o'zining energiya majmuasida atom
              energiyasining eng yuqori ulushiga ega.
            </p>
            <p>
              <b>2. Qayta tiklanadigan energiya:</b> Atom energetikasi hukmron
              bo'lsa-da, Fransiya so'nggi yillarda qayta tiklanadigan energiya
              manbalaridan foydalanishni ko'paytirmoqda. Qayta tiklanadigan
              manbalar, jumladan, gidroelektr, shamol va quyosh, umumiy ishlab
              chiqarishning taxminan 20 foizini tashkil qiladi.
            </p>
            <p>
              <b>3. Gidroenergetika:</b> Fransiya katta gidroenergetika
              quvvatiga ega, xususan, umumiy ishlab chiqarishning taxminan 10%
              hissasini qo'shadigan yirik to'g'onlari mavjud.
            </p>
            <p>
              <b>4. Ko’mir va tabiiy gaz: </b>Ko'mir va tabiiy gaz, Fransiyaning
              energiya aralashmasida kichik rol o'ynaydi, bu umumiy ishlab
              chiqarishning 5% dan kamrog'ini tashkil qiladi.
            </p>
          </div>
          <div>
            <p>
              Xulosa qilib aytadigan bo'lsak, elektr energiyasi manbalari
              geografiya, siyosatning ustuvor yo'nalishlari va iqtisodiy
              jihatlar kabi omillar ta'sirida dunyoning yetakchi davlatlari
              orasida farqlanadi. Ba'zi mamlakatlar qazib olinadigan yoqilg'iga
              ko'p ishonsa, boshqalari qayta tiklanadigan energiya manbalarini
              qabul qilishda yetakchilik qilmoqda. Dunyo iqlim o'zgarishini hal
              qilishga va toza energiya manbalariga o'tishga harakat qilar ekan,
              bu energiya landshaftlarini tushunish tobora muhim ahamiyat kasb
              etmoqda.
            </p>
            <h4>Manbalar:</h4>
            <p>
              - U.S. Energy Information Administration (EIA):
              https://www.eia.gov/electricity/data.php
            </p>
            <p>
              - China's National Bureau of Statistics:
              http://www.stats.gov.cn/english/
            </p>
            <p>
              - France's Ministry for the Ecological Transition:
              https://www.ecologie.gouv.fr/
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
