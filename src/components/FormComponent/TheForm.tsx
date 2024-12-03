"use client";

import "@/scss/globals.scss";
import styles from "./page.module.scss";
import axios from "axios";
import { ChangeEvent, FormEvent, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useTranslations } from "next-intl";

export interface FormData {
  firstName: string;
  phone: string;
  message: string;
}
export default function TheForm() {
  const t = useTranslations("FeedbackPage");
  const [feedback, setFeedback] = useState<FormData>({
    firstName: "",
    phone: "",
    message: "",
  });

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      const response = await axios.post("api/mailersend", feedback);
      if (response.status === 200) {
        console.log("Message sent successfully");
        setFeedback({
          firstName: "",
          phone: "",
          message: "",
        });
        toast.success(
          `${feedback.firstName}, murojaat qilganingiz uchun tashakkur! Tez orada siz bilan bog'lanamiz.`
        );
      } else {
        console.error("Failed to send message");
      }
    } catch (error) {
      console.error("Error sending message:", error);
      toast.error("Xabarni yuborishda xatolik yuz berdi.");
    }
  }

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setFeedback({ ...feedback, [e.target.name]: e.target.value });

  return (
    <>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h1 className="title">{t("title")}</h1>
        <input
          className={styles.input}
          type="text"
          name="firstName"
          id="firstName"
          placeholder={t("name")}
          required
          value={feedback.firstName}
          onChange={handleChange}
        />
        <input
          className={styles.input}
          type="text"
          name="phone"
          id="phone"
          placeholder={t("phone")}
          required
          value={feedback.phone}
          onChange={handleChange}
        />
        <textarea
          className={styles.input}
          name="message"
          id="message"
          placeholder={t("comment")}
          required
          value={feedback.message}
          onChange={handleChange}
        />
        {feedback.firstName && feedback.phone && feedback.message ? (
          <button type="submit" className={styles.btn}>
            {t("send")}
          </button>
        ) : (
          <button type="submit" className={styles.disabledBtn}>
            {t("send")}
          </button>
        )}
      </form>
      <ToastContainer />
    </>
  );
}
