"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Container } from "./container";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { LocaleSwitcher } from "@/components/i18n/locale-switcher";
import { Button } from "@/components/ui/button";
import { HugeiconsIcon } from "@hugeicons/react";
import { Menu01Icon, UserIcon } from "@hugeicons-pro/core-stroke-rounded";
import FullPageMobileMenu from "@/components/layout/FullPageMobileMenu";

import svgPaths from "@/imports/LandingPage/svg-p2y91de9gv";

export function SiteHeader() {
  const t = useTranslations("Header");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md transition-colors">
      <Container className="flex h-16 items-center justify-between gap-4">
        {/* Brand Logo */}
        <Link href="/" className="h-[34px] sm:h-[38px] w-auto aspect-[224/44.57] relative shrink-0 block no-underline select-none">
          <svg className="w-full h-full block" fill="none" viewBox="0 0 224 44.5742">
            <g id="Group 2087325898">
              <path d={svgPaths.p2bca0c0} fill="#547FEE" id="Union" />
              <g id="Darbook">
                <path d={svgPaths.p3d515900} fill="#0F172A" />
                <path d={svgPaths.p1e1c2e00} fill="#0F172A" />
                <path d={svgPaths.p3dbae00} fill="#0F172A" />
                <path d={svgPaths.p1c8f0b80} fill="#0F172A" />
                <path d={svgPaths.p2f5e4000} fill="#0F172A" />
                <path d={svgPaths.p25a54cf0} fill="#0F172A" />
                <path d={svgPaths.p8920900} fill="#0F172A" />
              </g>
            </g>
          </svg>
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          <Link href="/destinations" className="text-foreground/70 hover:text-foreground transition-colors">
            {t("nav.destinations")}
          </Link>
          <Link href="/experiences" className="text-foreground/70 hover:text-foreground transition-colors">
            {t("nav.experiences")}
          </Link>
          <Link href="/about" className="text-foreground/70 hover:text-foreground transition-colors">
            {t("nav.about")}
          </Link>
          <Link href="/contact" className="text-foreground/70 hover:text-foreground transition-colors">
            {t("nav.contact")}
          </Link>
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="hidden sm:flex items-center gap-2">
            <LocaleSwitcher />
            <ThemeToggle />
          </div>
          <Button variant="outline" size="sm" className="hidden sm:flex items-center gap-1.5">
            <HugeiconsIcon icon={UserIcon} className="h-4 w-4" size={16} />
            <span>{t("signIn")}</span>
          </Button>
          <Button size="sm" asChild className="hidden sm:flex">
            <Link href="/list-your-property">
              {t("becomeHost")}
            </Link>
          </Button>

          {/* Mobile Menu Trigger */}
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(true)}
            aria-label="Open mobile menu"
            className="md:hidden h-9 w-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center cursor-pointer border-none transition-colors"
          >
            <HugeiconsIcon icon={Menu01Icon} size={18} />
          </button>
        </div>
      </Container>

      {/* Full Page Mobile Menu */}
      <FullPageMobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </header>
  );
}
