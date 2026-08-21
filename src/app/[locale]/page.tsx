import HeroSection from "@/components/HeroSection";
import LandingContent from "@/components/LandingContent";
import { setRequestLocale } from "next-intl/server";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main className="w-full max-w-full overflow-x-hidden">
      <HeroSection />
      <LandingContent />
    </main>
  );
}
