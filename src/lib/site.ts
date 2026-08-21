export type Locale = "en" | "fr" | "ar" | "ru";

export const site = {
  baseUrl: (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(/\/$/, ""),
  name: "Darbook",
  description: "Darbook — Premium booking & vacation rentals across North Africa.",
  locales: ["en", "fr", "ar", "ru"] as Locale[],
  defaultLocale: "fr" as Locale,
  ogLocales: { en: "en_US", fr: "fr_FR", ar: "ar_TN", ru: "ru_RU" } as Record<Locale, string>,
  organization: {
    legalName: "Darbook Technologies",
    telephone: "+216 70 000 000",
    email: "contact@darbook.com",
    address: { streetAddress: "Les Berges du Lac", addressLocality: "Tunis", addressCountry: "TN" },
    sameAs: [] as string[],
  },
  aiCrawlers: "allow" as "allow" | "block",
  llmsTxtLinks: [{ title: "Home", path: "/", note: "Start here" }],
  themeColor: { light: "#ffffff", dark: "#0f172a" },
} as const;

export const rtlLocales: readonly Locale[] = ["ar"];
export const dirFor = (locale: Locale): "rtl" | "ltr" =>
  rtlLocales.includes(locale) ? "rtl" : "ltr";
export const absoluteUrl = (path: string): string =>
  `${site.baseUrl}${path.startsWith("/") ? path : `/${path}`}`;
