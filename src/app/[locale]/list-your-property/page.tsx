import { setRequestLocale } from "next-intl/server";
import ListYourPropertyContent from "@/components/sections/list-your-property-content";

export const metadata = {
  title: "List Your Property | Darbook Partner Network",
  description:
    "Join Darbook and list your guesthouse, traditional dar, or boutique villa. Reach thousands of travelers looking for authentic stays in Tunisia.",
};

export default async function ListYourPropertyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <ListYourPropertyContent />;
}
