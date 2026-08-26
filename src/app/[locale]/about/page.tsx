import { setRequestLocale } from "next-intl/server";
import AboutUsContent from "@/components/sections/about-us-content";

export const metadata = {
  title: "About Us | Darbook",
  description:
    "Darbook is a hospitality platform built around experiences, not just accommodation. We connect travelers with carefully selected guesthouses and unique stays in Tunisia's most inspiring destinations.",
};

export default async function AboutUsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <AboutUsContent />;
}
