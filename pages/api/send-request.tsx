import { sendEmail } from "@/lib/mail";
interface Url {
  body: {
    name: string;
    phone: string;
    msg: string;
  };
}
export default function handler(req: Url, res: any) {
  const { name, phone, msg } = req.body;
  const message = {
    to: "islomalarov@gmail.com", // Change to your recipient
    subject: "Pismo s sayta yashil-energiya",
    text: `FIO:${name},
    Telefon: ${phone},
    SMS: ${msg}
    `,
  };

  sendEmail(message);
  console.log(message);
  res
    .send
    // `Спасибо за обращение ${name}! Мы свяжемся с Вами в ближайшее время.
    ();
}
