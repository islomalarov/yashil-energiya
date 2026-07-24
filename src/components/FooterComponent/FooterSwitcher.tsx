"use client";

import type { ReactNode } from "react";
import { usePathname } from "@/i18n/navigation";

// Locale-agnostic pathnames (usePathname from i18n strips the locale prefix)
// that use the original minimal footer instead of the redesigned one.
const MINIMAL_FOOTER_PATHS = ["/taplink", "/ev-guide"];

type FooterSwitcherProps = {
  main: ReactNode;
  minimal: ReactNode;
};

export const FooterSwitcher = ({ main, minimal }: FooterSwitcherProps) => {
  const pathname = usePathname();
  return MINIMAL_FOOTER_PATHS.includes(pathname) ? <>{minimal}</> : <>{main}</>;
};
