"use client";
import { useEffect, useState } from "react";
import "../scss/globals.scss";
import styles from "./page.module.scss";
import axios from "axios";

export default function TheForm() {
  const [feedback, setFeedback] = useState({
    name: "",
    phone: "",
    msg: "",
  });

  async function handleSubmit(e: any) {
    e.preventDefault();
    try {
      // const response = await axios.post("/api/send/send-email", feedback);
      const response = await axios.post("/api/send/route", feedback);
      if (response.status === 200) {
        console.log("Message sent successfully");
        alert(
          `Спасибо за обращение ${feedback.name}! Мы свяжемся с Вами в ближайшее время.`
        );
      } else {
        console.error("Failed to send message");
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }
    setFeedback({
      name: "",
      phone: "",
      msg: "",
    });
  }

  useEffect(() => {}, [feedback]);

  return (
    <form onSubmit={handleSubmit} action="" method="" className={styles.form}>
      <h1 className="title">FIKR-MULOHAZA</h1>
      <input
        className={styles.input}
        type="text"
        name="name"
        id="name"
        placeholder="F.I.SH"
        required
        value={feedback.name}
        onChange={(e) => setFeedback({ ...feedback, name: e.target.value })}
      />
      <input
        className={styles.input}
        type="text"
        name="phone"
        id="phone"
        placeholder="Telefon raqami"
        required
        value={feedback.phone}
        onChange={(e) => setFeedback({ ...feedback, phone: e.target.value })}
      />
      <textarea
        className={styles.input}
        name="msg"
        id="msg"
        placeholder="Izoh"
        required
        value={feedback.msg}
        onChange={(e) => setFeedback({ ...feedback, msg: e.target.value })}
      />
      {feedback.name && feedback.phone && feedback.msg ? (
        <button className={styles.btn}>Jo'natish</button>
      ) : (
        <button className={styles.disabledBtn}>Jo'natish</button>
      )}
    </form>
  );
}
