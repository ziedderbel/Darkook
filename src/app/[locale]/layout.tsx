import type { Viewport } from "next";
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import "../globals.css";
import { fontVariables } from "@/lib/fonts";
import { routing } from "@/i18n/routing";
import { dirFor, site, type Locale } from "@/lib/site";
import { indexingEnabled } from "@/lib/seo/indexing";
import { JsonLd, organizationJsonLd, webSiteJsonLd } from "@/lib/seo/jsonld";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { MotionProvider } from "@/components/motion/motion-provider";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export const metadata = {
  metadataBase: new URL(site.baseUrl),
  title: { default: site.name, template: `%s | ${site.name}` },
  description: site.description,
  robots: indexingEnabled() ? { index: true, follow: true } : { index: false, follow: false },
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/apple-icon.png",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: site.themeColor.light },
    { media: "(prefers-color-scheme: dark)", color: site.themeColor.dark },
  ],
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!routing.locales.includes(locale as Locale)) notFound();
  setRequestLocale(locale);

  const messages = await getMessages();

  return (
    <html
      lang={locale}
      dir={dirFor(locale as Locale)}
      suppressHydrationWarning
      className={fontVariables}
    >
      <body className="flex min-h-svh flex-col antialiased" suppressHydrationWarning>
        <JsonLd data={[organizationJsonLd(), webSiteJsonLd()]} />
        <ThemeProvider>
          <NextIntlClientProvider messages={messages}>
            <MotionProvider>
              <div className="flex-1">{children}</div>
            </MotionProvider>
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
