import createMiddleware from "next-intl/middleware";
import { type NextRequest, NextResponse } from "next/server";
import { routing } from "@/i18n/routing";

const intlMiddleware = createMiddleware(routing);

function normalizeSearchUrl(request: NextRequest) {
  const url = request.nextUrl.clone();
  let shouldRedirect = false;

  if (url.searchParams.has("lang")) {
    url.searchParams.delete("lang");
    shouldRedirect = true;
  }

  const page = url.searchParams.get("page");
  if (page && (!/^[1-9]\d*$/.test(page) || page === "1")) {
    url.searchParams.delete("page");
    shouldRedirect = true;
  }

  return shouldRedirect ? NextResponse.redirect(url, 301) : null;
}

export default function proxy(request: NextRequest) {
  return normalizeSearchUrl(request) ?? intlMiddleware(request);
}

export const config = {
  // Match all pathnames except for
  // - … if they start with `/api`, `/trpc`, `/_next` or `/_vercel`
  // - … the ones containing a dot (e.g. `favicon.ico`)
  matcher: "/((?!api|trpc|_next|_vercel|.*\\..*).*)",
};
