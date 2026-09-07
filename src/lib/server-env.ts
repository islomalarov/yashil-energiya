import "server-only";

function readRequiredEnv(name: string) {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value;
}

export const serverEnv = {
  msTenantId: readRequiredEnv("MS_TENANT_ID"),
  msClientId: readRequiredEnv("MS_CLIENT_ID"),
  msClientSecret: readRequiredEnv("MS_CLIENT_SECRET"),
  msSenderEmail: readRequiredEnv("MS_SENDER_EMAIL"),
  msRecipientEmail: readRequiredEnv("MS_RECIPIENT_EMAIL"),
  turnstileSecretKey: readRequiredEnv("TURNSTILE_SECRET_KEY"),
  // Dedicated Turnstile secret for the virtual assistant (invisible-mode widget).
  // Falls back to the shared secret until a dedicated key pair is configured.
  turnstileAssistantSecretKey:
    process.env.TURNSTILE_ASSISTANT_SECRET_KEY ||
    readRequiredEnv("TURNSTILE_SECRET_KEY"),
  geminiApiKey: readRequiredEnv("GEMINI_API_KEY"),
};
