import "@/scss/globals.scss";
import styles from "./page.module.scss";
import Image from "next/image";
import { TheHero } from "@/src/components/HeroComponent/TheHero";
import photo1 from "@/public/articlesPhoto/photo-1-2.jpg";
export default function Page1() {
  return (
    <>
      <TheHero title1="Maqolalar" url1="articles" />
      <div className="newsContainer">
        <div className={styles.content}>
          <h1 style={{ textAlign: "center", paddingBottom: 50 }}>
            Qayta tiklanuvchi energiya manbalari
          </h1>
          <div className={styles.imgBlock}>
            <Image
              src={photo1}
              alt="alt_1"
              style={{ width: "80%", height: "auto", objectFit: "cover" }}
            />
          </div>
          <p>
            Ushbu maqolada bir qancha qayta tiklanadigan energiya manbalari
            bilan tanishib chiqamiz:
          </p>
          <div>
            <p>
              <b>1. Quyosh energiyasi:</b> Quyosh energiyasi fotovoltaik (PV)
              panellar yoki konsentrlangan quyosh energiyasi (CSP) tizimlari
              yordamida quyosh nuridan olinadi. U atrof muhit uchun xavfsiz,
              toza va har xil miqyosda: tomdagi qurilmalardan tortib yirik
              quyosh fermalarigacha joylashtirilishi mumkin.
            </p>
            <p>
              <b>2. Shamol energiyasi:</b> Shamol energiyasi shamol turbinalari
              yordamida harakatlanuvchi havoning kinetik energiyasidan
              foydalanish orqali hosil bo'ladi. Shamol fermalari odatda
              quruqlikda yoki doimiy shamol oqimi bo'lgan dengizda o'rnatiladi.
              Shamol energiyasi yetuk va tez o'sib borayotgan qayta tiklanadigan
              energiya manbai hisoblanadi.
            </p>
            <p>
              <b>3. Biomassa energiyasi:</b> Biomassa energiyasi yog'och,
              o'simlik qoldiqlari va chiqindilar kabi organik materiallardan
              olinadi. Uni tashish uchun etanol yoki biodizel kabi bioyoqilg'iga
              aylantirish yoki issiqlik yoki elektr energiyasini ishlab
              chiqarish uchun to'g'ridan-to'g'ri yoqish mumkin.
            </p>
            <p>
              <b>4. Vodorod energiyasi:</b> Vodorod energiyasi elektroliz orqali
              suv molekulalarini elektr energiyasi yordamida vodorod va
              kislorodga bo'lish yoki tabiiy gazning bug'ini qayta ishlash kabi
              boshqa jarayonlar orqali ishlab chiqariladi. Vodorod transport,
              sanoat va elektr energiyasi ishlab chiqarish uchun toza yoqilg'i
              sifatida ishlatilishi mumkin.
            </p>
            <p>
              <b>5. Geotermal energiya:</b> Geotermal energiya Yer yuzasi ostida
              saqlanadigan issiqlikdan olinadi. U geotermal elektr stansiyalari
              yoki issiqlik nasoslari orqali issiq suv yoki bug' havzalariga
              elektr energiyasi ishlab chiqarish yoki binolarni isitish va
              sovutish uchun ishlatiladi.
            </p>
            <p>
              <b>6. Okean energiyasi:</b> Okean energiyasi okean to'lqinlari,
              suv toshqini, oqimlari va termal gradientlardan energiya oladigan
              turli texnologiyalarni o'z ichiga oladi. Bularga toʻlqin
              energiyasini oʻzgartiruvchi qurilmalar, toʻlqinli turbinalar va
              okean issiqlik energiyasini konversiyalash (OTEC) tizimlari
              kiradi.
            </p>
            <p>
              <b>7. Gidroenergetika:</b> Gidroenergetika oqib turgan yoki
              tushayotgan suv energiyasidan foydalanish orqali elektr energiyasi
              ishlab chiqaradi. Bu eng qadimiy va eng ko'p qo'llaniladigan qayta
              tiklanadigan energiya manbalaridan biri bo'lib, gidroelektr
              to'g'onlari va daryolar oqimi butun dunyo bo'ylab keng tarqalgan
              qurilmalardir.
            </p>
            <p>
              Ushbu qayta tiklanadigan energiya manbalarining har biri o'ziga
              xos afzallik va kamchiliklari mavjud, ammo ular birgalikda
              barqaror va kam uglerodli energiya kelajagiga o'tishda hal
              qiluvchi rol o'ynaydi.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
