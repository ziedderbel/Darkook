"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { HugeiconsIcon } from "@hugeicons/react";
import { GlobalIcon } from "@hugeicons-pro/core-stroke-rounded";
import { site, type Locale } from "@/lib/site";

const languageNames: Record<Locale, string> = {
  fr: "Français",
  en: "English",
  ar: "العربية",
  ru: "Русский",
};

export function LocaleSwitcher() {
  const currentLocale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();

  const handleLocaleChange = (newLocale: Locale) => {
    router.replace(pathname, { locale: newLocale });
  };

  return (
    <div className="relative inline-flex items-center gap-1">
      <HugeiconsIcon icon={GlobalIcon} className="h-4 w-4 text-muted-foreground" size={16} />
      <select
        value={currentLocale}
        onChange={(e) => handleLocaleChange(e.target.value as Locale)}
        className="bg-transparent text-sm font-medium text-foreground cursor-pointer focus:outline-none pr-2"
        aria-label="Language selector"
      >
        {site.locales.map((loc) => (
          <option key={loc} value={loc} className="bg-background text-foreground">
            {languageNames[loc]}
          </option>
        ))}
      </select>
    </div>
  );
}
