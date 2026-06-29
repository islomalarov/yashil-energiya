import { publicOfferEn } from "./en";
import { publicOfferRu } from "./ru";
import { publicOfferUz } from "./uz";
import type { PublicOfferContent, PublicOfferLocale } from "./types";

export { PUBLIC_OFFER_ROUTE } from "./config";
export type { PublicOfferContent, PublicOfferLocale, PublicOfferSection } from "./types";

export const publicOfferContent: Record<PublicOfferLocale, PublicOfferContent> = {
  ru: publicOfferRu,
  uz: publicOfferUz,
  en: publicOfferEn,
};

export function normalizePublicOfferLocale(locale?: string): PublicOfferLocale {
  return locale === "ru" || locale === "uz" || locale === "en" ? locale : "en";
}

export function getPublicOfferContent(locale?: string) {
  return publicOfferContent[normalizePublicOfferLocale(locale)];
}
