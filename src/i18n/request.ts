import { notFound } from "next/navigation";
import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";

export default getRequestConfig(async ({ locale }) => {
  // Validate that the incoming `locale` parameter is valid
  if (!routing.locales.includes(locale as any)) notFound();

  return {
    messages: (
      await (locale === "uz"
        ? // When using Turbopack, this will enable HMR for `en`
          import("@/messages/uz.json")
        : import(`@/messages/${locale}.json`))
    ).default,
  };
});
