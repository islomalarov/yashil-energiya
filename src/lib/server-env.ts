import "server-only";

function readRequiredEnv(name: string) {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value;
}

// Getters read each variable on access, so a route fails only on the
// variables it actually uses (e.g. the forms keep working without GEMINI_API_KEY).
export const serverEnv = {
  get msTenantId() {
    return readRequiredEnv("MS_TENANT_ID");
  },
  get msClientId() {
    return readRequiredEnv("MS_CLIENT_ID");
  },
  get msClientSecret() {
    return readRequiredEnv("MS_CLIENT_SECRET");
  },
  get msSenderEmail() {
    return readRequiredEnv("MS_SENDER_EMAIL");
  },
  get msRecipientEmail() {
    return readRequiredEnv("MS_RECIPIENT_EMAIL");
  },
  get turnstileSecretKey() {
    return readRequiredEnv("TURNSTILE_SECRET_KEY");
  },
  // Dedicated Turnstile secret for the virtual assistant (invisible-mode widget).
  // Falls back to the shared secret until a dedicated key pair is configured.
  get turnstileAssistantSecretKey() {
    return (
      process.env.TURNSTILE_ASSISTANT_SECRET_KEY ||
      readRequiredEnv("TURNSTILE_SECRET_KEY")
    );
  },
  get geminiApiKey() {
    return readRequiredEnv("GEMINI_API_KEY");
  },
};
