export const CMS_FALLBACK_LOCALE = "en";
export const CMS_UNSUPPORTED_LOCALE = "uz";

export function resolveCmsLocale(locale?: string) {
  return locale === CMS_UNSUPPORTED_LOCALE || !locale
    ? CMS_FALLBACK_LOCALE
    : locale;
}

export function isUnsupportedCmsLocale(locale?: string) {
  return locale === CMS_UNSUPPORTED_LOCALE;
}
