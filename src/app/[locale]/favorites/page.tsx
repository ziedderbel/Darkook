import { setRequestLocale } from "next-intl/server";
import FavoritesContent from "@/components/sections/favorites-content";

export const metadata = {
  title: "Favorites | Darbook",
  description:
    "View and manage your favorite stays, authentic dars, and vacation rentals in Tunisia on Darbook.",
};

export default async function FavoritesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <FavoritesContent />;
}
