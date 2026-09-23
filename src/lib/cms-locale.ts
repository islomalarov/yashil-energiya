// uz content is being added to the CMS gradually (document-level
// translations in Sanity). Until a translation exists, CMS-driven UI falls
// back to English: list widgets show English items, and pages for a missing
// translation redirect to /en (see the [slug]/[id] pages).
export const CMS_FALLBACK_LOCALE = "en";

/**
 * Loads CMS data for `locale`; if that returns nothing, loads the English
 * version instead. `contentLocale` says which language the data is in, so
 * links can point at pages that actually exist.
 */
export async function loadWithFallback<T>(
  locale: string,
  load: (locale: string) => Promise<T>,
  isEmpty: (data: T) => boolean,
): Promise<{ data: T; contentLocale: string }> {
  const data = await load(locale);

  if (locale === CMS_FALLBACK_LOCALE || !isEmpty(data)) {
    return { data, contentLocale: locale };
  }

  return {
    data: await load(CMS_FALLBACK_LOCALE),
    contentLocale: CMS_FALLBACK_LOCALE,
  };
}
