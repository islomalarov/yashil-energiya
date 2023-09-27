import mailer from "nodemailer";

const smtpTransport = mailer.createTransport(
  {
    host: "smtp.yandex.ru", // SMTP Host for sending emails
    port: 465,
    secure: true,
    auth: {
      user: "islomalarov@yandex.com",
      pass: "Re@l1902",
    },
    tls: { rejectUnauthorized: false },
  },
  {
    from: "islomalarov    <islomalarov@yandex.com>",
  }
);

export const sendEmail = (msg: any) => {
  smtpTransport.sendMail(msg, (error, info) => {
    error
      ? console.log("Error occurred", error)
      : console.log("Email send succesfully", info);
    smtpTransport.close();
  });
};
