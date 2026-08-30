import { setRequestLocale } from "next-intl/server";
import TermsContent from "@/components/sections/terms-content";

export const metadata = {
  title: "Terms & Conditions | Darbook",
  description:
    "Review the Terms and Conditions of Use for Darbook, the premier vacation rental and guesthouse platform in Tunisia.",
};

export default async function TermsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <TermsContent />;
}
