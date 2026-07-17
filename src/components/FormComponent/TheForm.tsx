"use client";

import styles from "./page.module.scss";
import dynamic from "next/dynamic";
import cn from "classnames";
import {
  ChangeEvent,
  FormEvent,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";
import { CheckCircle2, Loader2, Send } from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useLocale, useTranslations } from "next-intl";

const Turnstile = dynamic(
  () => import("@marsidev/react-turnstile").then((mod) => mod.Turnstile),
  { ssr: false },
);

export interface FormData {
  firstName: string;
  phone: string;
  email: string;
  message: string;
}

type FormErrors = Partial<Record<keyof FormData, string>>;

const EMPTY_FORM: FormData = {
  firstName: "",
  phone: "",
  email: "",
  message: "",
};

const FIELD_ORDER: (keyof FormData)[] = [
  "firstName",
  "phone",
  "email",
  "message",
];

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const TheForm = () => {
  const t = useTranslations("FeedbackPage");
  const locale = useLocale();
  const fieldId = useId();
  const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
  const captchaRef = useRef<HTMLDivElement | null>(null);
  const fieldRefs = useRef<
    Partial<Record<keyof FormData, HTMLInputElement | HTMLTextAreaElement>>
  >({});
  const [shouldLoadCaptcha, setShouldLoadCaptcha] = useState(false);
  const [captchaToken, setCaptchaToken] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submittedName, setSubmittedName] = useState("");
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [feedback, setFeedback] = useState<FormData>(EMPTY_FORM);

  const inputFields: {
    name: keyof FormData;
    type: string;
    label: string;
    autoComplete: string;
  }[] = [
    { name: "firstName", type: "text", label: t("name"), autoComplete: "name" },
    { name: "phone", type: "tel", label: t("phone"), autoComplete: "tel" },
    { name: "email", type: "email", label: t("email"), autoComplete: "email" },
  ];

  function validateField(name: keyof FormData, value: string) {
    if (!value.trim()) return t("fieldRequired");
    if (name === "email" && !EMAIL_REGEX.test(value.trim()))
      return t("emailInvalid");
    return undefined;
  }

  function validate(values: FormData): FormErrors {
    const nextErrors: FormErrors = {};
    for (const field of FIELD_ORDER) {
      const error = validateField(field, values[field]);
      if (error) nextErrors[field] = error;
    }
    return nextErrors;
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const nextErrors = validate(feedback);
    setHasSubmitted(true);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      const firstInvalid = FIELD_ORDER.find((field) => nextErrors[field]);
      if (firstInvalid) fieldRefs.current[firstInvalid]?.focus();
      return;
    }

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
        setSubmittedName(feedback.firstName.trim());
        setFeedback(EMPTY_FORM);
        setCaptchaToken("");
        setHasSubmitted(false);
        setErrors({});
        setIsSuccess(true);
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
  ) => {
    const { name, value } = e.target;
    const field = name as keyof FormData;
    setFeedback((prev) => ({ ...prev, [field]: value }));

    if (hasSubmitted) {
      setErrors((prev) => {
        const next = { ...prev };
        const error = validateField(field, value);
        if (error) next[field] = error;
        else delete next[field];
        return next;
      });
    }
  };

  function handleReset() {
    setIsSuccess(false);
    setSubmittedName("");
    setFeedback(EMPTY_FORM);
    setErrors({});
    setHasSubmitted(false);
    setCaptchaToken("");
  }

  useEffect(() => {
    const element = captchaRef.current;
    if (!element || shouldLoadCaptcha) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;

        setShouldLoadCaptcha(true);
        observer.disconnect();
      },
      { rootMargin: "360px 0px" },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [shouldLoadCaptcha]);

  if (isSuccess) {
    return (
      <div className={styles.success} role="status" aria-live="polite">
        <CheckCircle2 className={styles.successIcon} aria-hidden />
        <h2 className={styles.successTitle}>{t("successTitle")}</h2>
        <p className={styles.successText}>
          {t("submitSuccess", { name: submittedName })}
        </p>
        <button
          type="button"
          className={styles.secondaryBtn}
          onClick={handleReset}
        >
          {t("sendAnother")}
        </button>
      </div>
    );
  }

  return (
    <>
      <form onSubmit={handleSubmit} className={styles.form} noValidate>
        {inputFields.map(({ name, type, label, autoComplete }) => {
          const error = errors[name];
          const errorId = `${fieldId}-${name}-error`;
          return (
            <div key={name} className={styles.field}>
              <label className={styles.label} htmlFor={`${fieldId}-${name}`}>
                {label}
              </label>
              <input
                className={cn(styles.input, { [styles.inputError]: error })}
                type={type}
                name={name}
                id={`${fieldId}-${name}`}
                autoComplete={autoComplete}
                value={feedback[name]}
                onChange={handleChange}
                aria-invalid={error ? true : undefined}
                aria-describedby={error ? errorId : undefined}
                ref={(el) => {
                  if (el) fieldRefs.current[name] = el;
                }}
              />
              {error && (
                <span id={errorId} className={styles.error}>
                  {error}
                </span>
              )}
            </div>
          );
        })}

        <div className={cn(styles.field, styles.fieldFull)}>
          <label className={styles.label} htmlFor={`${fieldId}-message`}>
            {t("comment")}
          </label>
          <textarea
            className={cn(styles.input, styles.textarea, {
              [styles.inputError]: errors.message,
            })}
            name="message"
            id={`${fieldId}-message`}
            value={feedback.message}
            onChange={handleChange}
            aria-invalid={errors.message ? true : undefined}
            aria-describedby={
              errors.message ? `${fieldId}-message-error` : undefined
            }
            ref={(el) => {
              if (el) fieldRefs.current.message = el;
            }}
          />
          {errors.message && (
            <span id={`${fieldId}-message-error`} className={styles.error}>
              {errors.message}
            </span>
          )}
        </div>

        <div ref={captchaRef} className={styles.captchaWrapper}>
          {turnstileSiteKey && shouldLoadCaptcha && (
            <Turnstile
              siteKey={turnstileSiteKey}
              onSuccess={(token) => setCaptchaToken(token)}
            />
          )}
        </div>

        <button type="submit" className={styles.btn} disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Loader2 className={styles.spinner} aria-hidden />
              {t("sending")}
            </>
          ) : (
            <>
              {t("send")}
              <Send className={styles.btnIcon} aria-hidden />
            </>
          )}
        </button>
      </form>
      <ToastContainer />
    </>
  );
};
