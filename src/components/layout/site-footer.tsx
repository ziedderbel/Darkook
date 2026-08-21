"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Container } from "./container";
import { HugeiconsIcon } from "@hugeicons/react";
import { Compass01Icon } from "@hugeicons-pro/core-stroke-rounded";
import { site } from "@/lib/site";

export function SiteFooter() {
  const t = useTranslations("Footer");
  const year = new Date().getFullYear();

  return (
    <footer className="border-t bg-card text-card-foreground py-12 transition-colors">
      <Container className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-xl font-bold text-primary">
            <HugeiconsIcon icon={Compass01Icon} className="h-6 w-6" size={24} />
            <span>Darbook</span>
          </div>
          <p className="text-sm text-muted-foreground">
            {site.description}
          </p>
        </div>

        <div>
          <h4 className="text-sm font-semibold mb-3">Navigation</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link href="/" className="hover:text-foreground">Accueil</Link></li>
            <li><Link href="/destinations" className="hover:text-foreground">Destinations</Link></li>
            <li><Link href="/experiences" className="hover:text-foreground">Expériences</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold mb-3">Support</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link href="/help" className="hover:text-foreground">Centre d'aide</Link></li>
            <li><Link href="/contact" className="hover:text-foreground">Contact</Link></li>
            <li><Link href="/faq" className="hover:text-foreground">FAQ</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold mb-3">Légal</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link href="/privacy" className="hover:text-foreground">{t("privacy")}</Link></li>
            <li><Link href="/terms" className="hover:text-foreground">{t("terms")}</Link></li>
          </ul>
        </div>
      </Container>

      <Container className="mt-8 pt-8 border-t flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
        <p>© {year} {site.name}. {t("rights")}</p>
      </Container>
    </footer>
  );
}
