import { setRequestLocale } from "next-intl/server";
import NewsContent from "@/components/sections/news-content";

export const metadata = {
  title: "Latest News & Travel Insights | Darbook",
  description:
    "Explore the latest articles, travel guides, guesthouse spotlights, and tourism tips across Tunisia on Darbook.",
};

export default async function NewsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <NewsContent />;
}
