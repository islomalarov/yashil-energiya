import nodemailer from "nodemailer";

const sendFeedback = async (message: nodemailer.SendMailOptions) => {
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
  transporter.sendMail(message);
};
export default sendFeedback;
