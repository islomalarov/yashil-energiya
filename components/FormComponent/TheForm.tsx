"use client";

import "@/scss/globals.scss";
import { ChangeEvent, FormEvent, useState } from "react";
import styles from "./page.module.scss";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function TheForm() {
  const [feedback, setFeedback] = useState<TheFeedbackProps>({
    firstName: "",
    phone: "",
    message: "",
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
  ) => setFeedback({ ...feedback, [e.target.name]: e.target.value });
  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      const response = await axios.post("api/send", feedback);
      if (response.status === 200) {
        console.log("Message sent successfully");

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
    setFeedback({
      firstName: "",
      phone: "",
      message: "",
    });
  }

  return (
    <>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h1 className="title">FIKR-MULOHAZA</h1>
        <input
          className={styles.input}
          type="text"
          name="firstName"
          id="firstName"
          placeholder="F.I.SH"
          required
          value={feedback.firstName}
          onChange={handleChange}
        />
        <input
          className={styles.input}
          type="text"
          name="phone"
          id="phone"
          placeholder="Telefon raqami"
          required
          value={feedback.phone}
          onChange={handleChange}
        />
        <textarea
          className={styles.input}
          name="message"
          id="message"
          placeholder="Izoh"
          required
          value={feedback.message}
          onChange={handleChange}
        />
        {feedback.firstName && feedback.phone && feedback.message ? (
          <button className={styles.btn}>Jo'natish</button>
        ) : (
          <button className={styles.disabledBtn}>Jo'natish</button>
        )}
      </form>
      <ToastContainer />
    </>
  );
}
