"use client";

import styles from "./page.module.scss";
import { ChangeEvent, FormEvent, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useLocale, useTranslations } from "next-intl";
import { Turnstile } from "@marsidev/react-turnstile";

export interface FormData {
  firstName: string;
  phone: string;
  email: string;
  message: string;
}

export const TheForm = () => {
  const t = useTranslations("FeedbackPage");
  const locale = useLocale();
  const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
  const [captchaToken, setCaptchaToken] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<FormData>({
    firstName: "",
    phone: "",
    email: "",
    message: "",
  });

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!captchaToken) {
      toast.error(t("verificationRequired"));
      return;
    }

    if (!turnstileSiteKey) {
      toast.error(t("verificationUnavailable"));
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/resend", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Content-Language": locale,
        },
        body: JSON.stringify({
          ...feedback,
          captchaToken,
        }),
      });

      if (response.ok) {
        setFeedback({
          firstName: "",
          phone: "",
          email: "",
          message: "",
        });
        setCaptchaToken("");
        toast.success(t("submitSuccess", { name: feedback.firstName }));
      } else {
        toast.error(t("submitError"));
      }
    } catch (error) {
      console.error("Error sending message:", error);
      toast.error(t("submitError"));
    } finally {
      setIsSubmitting(false);
    }
  }

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => setFeedback({ ...feedback, [e.target.name]: e.target.value });

  return (
    <>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h2 className="title">{t("title")}</h2>
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
        <input
          className={styles.input}
          type="email"
          name="email"
          id="email"
          placeholder="Email"
          required
          value={feedback.email}
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
        <div className={styles.captchaWrapper}>
          {turnstileSiteKey && (
            <Turnstile
              siteKey={turnstileSiteKey}
              onSuccess={(token) => setCaptchaToken(token)}
            />
          )}
        </div>
        {feedback.firstName &&
        feedback.phone &&
        feedback.email &&
        feedback.message &&
        captchaToken &&
        !isSubmitting ? (
          <button type="submit" className={styles.btn} disabled={isSubmitting}>
            {t("send")}
          </button>
        ) : (
          <button type="submit" className={styles.disabledBtn} disabled>
            {t("send")}
          </button>
        )}
      </form>
      <ToastContainer />
    </>
  );
};
