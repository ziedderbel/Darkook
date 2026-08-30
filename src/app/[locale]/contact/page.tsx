import { setRequestLocale } from "next-intl/server";
import ContactContent from "@/components/sections/contact-content";

export const metadata = {
  title: "Contact us | Darbook",
  description:
    "Get in touch with Darbook's support, sales, and reservation departments. We're here to assist you at every step of your journey.",
};

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <ContactContent />;
}
