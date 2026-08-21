import { defineRouting } from "next-intl/routing";
import { site } from "@/lib/site";

export const routing = defineRouting({
  locales: site.locales,
  defaultLocale: site.defaultLocale,
  localePrefix: "as-needed",
});
