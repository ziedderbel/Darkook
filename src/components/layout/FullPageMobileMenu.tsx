"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Link } from "@/i18n/navigation";
import { motion, AnimatePresence } from "motion/react";
import { HugeiconsIcon } from "@hugeicons/react";
import { useTheme } from "next-themes";
import {
  Cancel01Icon,
  House01Icon,
  Location01Icon,
  BeachIcon,
  FavouriteIcon,
  Compass01Icon,
  Building01Icon,
  UserIcon,
  Moon02Icon,
  Sun01Icon,
  GlobalIcon,
  ArrowRight01Icon,
  Call02Icon,
  NewspaperIcon,
  Mail01Icon,
  HelpCircleIcon,
  SparklesIcon,
} from "@hugeicons-pro/core-stroke-rounded";
import svgPaths from "@/imports/LandingPage/svg-p2y91de9gv";

interface FullPageMobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenAuth?: () => void;
  onOpenLang?: () => void;
  selectedLang?: string;
  selectedCurrency?: string;
  favoritesCount?: number;
}

function BrandLogo() {
  return (
    <div className="h-[36px] sm:h-[40px] w-[160px] sm:w-[190px] relative shrink-0 block no-underline select-none">
      <svg className="w-full h-full block" fill="none" viewBox="0 0 224 44.5742">
        <g id="Group 2087325898">
          <path d={svgPaths.p2bca0c0} fill="#547FEE" id="Union" />
          <g id="Darbook">
            <path d={svgPaths.p3d515900} className="fill-[#0F172A] dark:fill-white transition-colors" />
            <path d={svgPaths.p1e1c2e00} className="fill-[#0F172A] dark:fill-white transition-colors" />
            <path d={svgPaths.p3dbae00} className="fill-[#0F172A] dark:fill-white transition-colors" />
            <path d={svgPaths.p1c8f0b80} className="fill-[#0F172A] dark:fill-white transition-colors" />
            <path d={svgPaths.p2f5e4000} className="fill-[#0F172A] dark:fill-white transition-colors" />
            <path d={svgPaths.p25a54cf0} className="fill-[#0F172A] dark:fill-white transition-colors" />
            <path d={svgPaths.p8920900} className="fill-[#0F172A] dark:fill-white transition-colors" />
          </g>
        </g>
      </svg>
    </div>
  );
}

export default function FullPageMobileMenu({
  isOpen,
  onClose,
  onOpenAuth,
  onOpenLang,
  selectedLang = "FRA",
  selectedCurrency = "EUR",
  favoritesCount = 0,
}: FullPageMobileMenuProps) {
  const { theme, resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted && (resolvedTheme === "dark" || theme === "dark");

  // Prevent background body scroll when full page menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, [isOpen]);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="full-page-mobile-menu"
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            width: "100vw",
            height: "100dvh",
            zIndex: 999999,
          }}
          className="fixed inset-0 w-screen h-[100dvh] z-[999999] bg-[#F8FAFC] dark:bg-[#070b18] text-slate-900 dark:text-white flex flex-col justify-between overflow-y-auto overscroll-contain transition-colors duration-300"
        >
          {/* 1. Header Bar */}
          <div className="h-16 sm:h-20 border-b border-slate-100 dark:border-slate-800 shrink-0 sticky top-0 bg-white/95 dark:bg-[#0b1022]/95 backdrop-blur-md z-20 transition-colors duration-300">
            <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">
              <Link href="/" onClick={onClose} className="no-underline">
                <BrandLogo />
              </Link>

              <button
                type="button"
                onClick={onClose}
                aria-label="Close menu"
                className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 flex items-center justify-center cursor-pointer border-none transition-colors active:scale-95 shadow-2xs"
              >
                <HugeiconsIcon icon={Cancel01Icon} size={20} />
              </button>
            </div>
          </div>

          {/* 2. Responsive Body Content (1 col on mobile, 2 cols on tablet & desktop) */}
          <div className="flex-1 w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
              
              {/* Left Column: Profile Card + Primary Navigation (lg: col-span-7) */}
              <div className="md:col-span-1 lg:col-span-7 space-y-4">
                
                {/* Quick Profile / Sign-in Card */}
                <div className="p-4 sm:p-5 rounded-2xl sm:rounded-3xl bg-white dark:bg-[#121a30] border border-blue-100 dark:border-slate-800 shadow-xs flex items-center justify-between transition-colors">
                  <div className="flex items-center gap-3.5 min-w-0">
                    <div className="w-12 h-12 rounded-2xl bg-[#547FEE] text-white flex items-center justify-center shrink-0 shadow-sm">
                      <HugeiconsIcon icon={UserIcon} size={22} />
                    </div>
                    <div className="min-w-0">
                      <h4 className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-white font-['Bricolage_Grotesk',sans-serif] m-0 truncate">
                        Bienvenue sur Darbook
                      </h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400 font-medium m-0 mt-0.5 truncate">
                        Connectez-vous pour vos réservations
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                      onOpenAuth?.();
                    }}
                    className="px-4 py-2 sm:px-5 sm:py-2.5 bg-[#547FEE] hover:bg-[#406CE3] text-white font-bold text-xs rounded-xl border-none cursor-pointer shadow-xs transition-all active:scale-95 shrink-0"
                  >
                    Connexion
                  </button>
                </div>

                {/* Navigation Links List */}
                <div className="p-4 sm:p-5 rounded-2xl sm:rounded-3xl bg-white dark:bg-[#121a30] border border-gray-100 dark:border-slate-800 shadow-xs space-y-1">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-3 mb-2 block">
                    Navigation
                  </span>

                  {[
                    { label: "Accueil", href: "/", icon: House01Icon },
                    { label: "Destinations Populaires", href: "/search?tab=location", icon: Location01Icon },
                    { label: "Expériences Uniques", href: "/search?tab=experience", icon: BeachIcon },
                    {
                      label: "Mes Favoris",
                      href: "/favorites",
                      icon: FavouriteIcon,
                      badge: favoritesCount > 0 ? String(favoritesCount) : undefined,
                    },
                    {
                      label: "Devenir Hôte (List your property)",
                      href: "/list-your-property",
                      icon: Building01Icon,
                      highlight: true,
                    },
                    { label: "À propos de Darbook", href: "/about", icon: Compass01Icon },
                    { label: "Actualités & Guides", href: "/news", icon: NewspaperIcon },
                    { label: "Contact & Assistance", href: "/contact", icon: Mail01Icon },
                  ].map((item) => (
                    <Link
                      key={item.label}
                      href={item.href}
                      onClick={onClose}
                      className={`flex items-center justify-between p-3 sm:p-3.5 rounded-xl sm:rounded-2xl no-underline transition-all active:scale-98 ${
                        item.highlight
                          ? "bg-blue-50/70 dark:bg-blue-900/30 hover:bg-blue-50 dark:hover:bg-blue-900/50 text-[#547FEE] font-extrabold border border-blue-200/60 dark:border-blue-700/50"
                          : "hover:bg-slate-50 dark:hover:bg-slate-800/60 text-slate-800 dark:text-slate-200 font-semibold"
                      }`}
                    >
                      <div className="flex items-center gap-3.5">
                        <div
                          className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                            item.highlight
                              ? "bg-[#547FEE] text-white"
                              : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300"
                          }`}
                        >
                          <HugeiconsIcon icon={item.icon} size={18} />
                        </div>
                        <span className="text-sm font-medium">{item.label}</span>
                      </div>

                      <div className="flex items-center gap-2">
                        {item.badge && (
                          <span className="px-2 py-0.5 rounded-full bg-[#547FEE] text-white text-[11px] font-extrabold shadow-xs">
                            {item.badge}
                          </span>
                        )}
                        <HugeiconsIcon icon={ArrowRight01Icon} size={16} className="text-slate-400" />
                      </div>
                    </Link>
                  ))}
                </div>

              </div>

              {/* Right Column: Preferences, Host Card & Help on Tablet/Desktop (lg: col-span-5) */}
              <div className="md:col-span-1 lg:col-span-5 space-y-4">
                
                {/* Host Promo Card on Tablet/Desktop */}
                <div className="p-5 sm:p-6 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-[#547FEE] to-[#3B68EC] text-white shadow-sm flex flex-col justify-between gap-4">
                  <div className="space-y-2">
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/20 backdrop-blur-xs text-[11px] font-bold">
                      <HugeiconsIcon icon={SparklesIcon} size={13} />
                      <span>Espace Propriétaire</span>
                    </div>
                    <h3 className="font-['Bricolage_Grotesk',sans-serif] font-bold text-lg sm:text-xl text-white m-0">
                      Vous possédez un bien d'exception en Tunisie ?
                    </h3>
                    <p className="text-xs sm:text-sm text-white/90 font-normal m-0 leading-relaxed">
                      Rejoignez Darbook et faites découvrir votre maison d'hôte, villa ou gîte à des voyageurs du monde entier.
                    </p>
                  </div>
                  <Link
                    href="/list-your-property"
                    onClick={onClose}
                    className="w-full py-3 px-4 bg-white hover:bg-slate-100 text-[#3B68EC] font-bold text-xs sm:text-sm rounded-xl sm:rounded-2xl flex items-center justify-center gap-2 no-underline shadow-xs transition-transform active:scale-95"
                  >
                    <HugeiconsIcon icon={Building01Icon} size={16} />
                    <span>Publier mon logement</span>
                  </Link>
                </div>

                {/* Quick Preferences Card: Language, Currency & Dark Mode */}
                <div className="p-4 sm:p-5 rounded-2xl sm:rounded-3xl bg-white dark:bg-[#121a30] border border-gray-100 dark:border-slate-800 shadow-xs space-y-3 transition-colors">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-1 block">
                    Préférences & Thème
                  </span>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {/* Language & Currency Button */}
                    <button
                      type="button"
                      onClick={() => {
                        onClose();
                        onOpenLang?.();
                      }}
                      className="flex items-center justify-between p-3 rounded-xl sm:rounded-2xl bg-slate-50 dark:bg-slate-800/80 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200/80 dark:border-slate-700 cursor-pointer transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        <HugeiconsIcon icon={GlobalIcon} size={18} className="text-[#547fee]" />
                        <span className="text-xs font-bold">{selectedLang} • {selectedCurrency}</span>
                      </div>
                      <HugeiconsIcon icon={ArrowRight01Icon} size={14} className="text-slate-400" />
                    </button>

                    {/* Dark Mode Toggle */}
                    <button
                      type="button"
                      onClick={() => setTheme(isDark ? "light" : "dark")}
                      className="flex items-center justify-between p-3 rounded-xl sm:rounded-2xl bg-slate-50 dark:bg-slate-800/80 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200/80 dark:border-slate-700 cursor-pointer transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        <HugeiconsIcon
                          icon={isDark ? Sun01Icon : Moon02Icon}
                          size={18}
                          className={isDark ? "text-amber-400" : "text-[#547fee]"}
                        />
                        <span className="text-xs font-bold">
                          {isDark ? "Thème sombre" : "Thème clair"}
                        </span>
                      </div>
                    </button>
                  </div>
                </div>

                {/* 24/7 Support Info Box */}
                <div className="p-4 sm:p-5 rounded-2xl sm:rounded-3xl bg-white dark:bg-[#121a30] border border-gray-100 dark:border-slate-800 shadow-xs flex items-center justify-between gap-3 text-xs text-slate-500 dark:text-slate-400">
                  <div className="flex items-center gap-3">
                    <div className="size-9 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                      <HugeiconsIcon icon={Call02Icon} size={18} />
                    </div>
                    <div>
                      <span className="font-bold text-slate-800 dark:text-white block">Assistance 24h/7j</span>
                      <span>+65 6156 5519 • hello@darbook.tn</span>
                    </div>
                  </div>
                  <Link href="/contact" onClick={onClose} className="text-[#547fee] font-bold text-xs no-underline hover:underline shrink-0">
                    Aide
                  </Link>
                </div>

              </div>

            </div>
          </div>

          {/* 3. Bottom Sticky Bar */}
          <div className="border-t border-slate-100 dark:border-slate-800 bg-white/95 dark:bg-[#0b1022]/95 backdrop-blur-md py-4 sm:py-5 shrink-0 transition-colors duration-300">
            <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
              <Link
                href="/list-your-property"
                onClick={onClose}
                className="w-full sm:w-auto py-3 px-6 bg-[#547FEE] hover:bg-[#406CE3] text-white font-bold text-xs sm:text-sm rounded-full flex items-center justify-center gap-2 no-underline shadow-xs transition-all active:scale-98"
              >
                <HugeiconsIcon icon={Building01Icon} size={16} />
                <span>Publier mon logement sur Darbook</span>
              </Link>

              <p className="text-center sm:text-right text-xs text-slate-400 dark:text-slate-500 font-medium m-0">
                Besoin d'aide ? Support client Darbook disponible 24/7
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
