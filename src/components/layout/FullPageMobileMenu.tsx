"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Link } from "@/i18n/navigation";
import { motion, AnimatePresence } from "motion/react";
import { HugeiconsIcon } from "@hugeicons/react";
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
  GlobalIcon,
  ArrowRight01Icon,
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
    <div className="h-[36px] sm:h-[40px] w-auto aspect-[224/44.57] relative shrink-0 block no-underline select-none">
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
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

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
          className="fixed inset-0 w-screen h-[100dvh] z-[999999] bg-white flex flex-col justify-between overflow-y-auto overscroll-contain"
        >
          {/* 1. Header Bar */}
          <div className="h-16 sm:h-20 px-4 sm:px-6 flex items-center justify-between border-b border-slate-100 shrink-0 sticky top-0 bg-white/95 backdrop-blur-md z-10">
            <Link href="/" onClick={onClose} className="no-underline">
              <BrandLogo />
            </Link>

            <button
              type="button"
              onClick={onClose}
              aria-label="Close menu"
              className="w-10 h-10 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center cursor-pointer border-none transition-colors active:scale-95 shadow-2xs"
            >
              <HugeiconsIcon icon={Cancel01Icon} size={20} />
            </button>
          </div>

          {/* 2. Scrollable Body Content */}
          <div className="flex-1 px-5 sm:px-8 py-6 space-y-6 max-w-lg mx-auto w-full">
            
            {/* Quick Profile / Sign-in Card */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50/60 border border-blue-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-[#547FEE] text-white flex items-center justify-center shadow-sm">
                  <HugeiconsIcon icon={UserIcon} size={22} />
                </div>
                <div>
                  <h4 className="font-extrabold text-sm text-slate-900 font-['Bricolage_Grotesk',sans-serif]">
                    Bienvenue sur Darbook
                  </h4>
                  <p className="text-xs text-slate-500 font-medium">Connectez-vous pour vos réservations</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onOpenAuth?.();
                }}
                className="px-4 py-2 bg-[#547FEE] hover:bg-[#406CE3] text-white font-bold text-xs rounded-xl border-none cursor-pointer shadow-xs transition-all active:scale-95"
              >
                Connexion
              </button>
            </div>

            {/* Navigation Links List */}
            <div className="space-y-1">
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
              ].map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={onClose}
                  className={`flex items-center justify-between p-3.5 rounded-2xl no-underline transition-all active:scale-98 ${
                    item.highlight
                      ? "bg-blue-50/60 hover:bg-blue-50 text-[#547FEE] font-extrabold border border-blue-200/60"
                      : "hover:bg-slate-50 text-slate-800 font-semibold"
                  }`}
                >
                  <div className="flex items-center gap-3.5">
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                        item.highlight
                          ? "bg-[#547FEE] text-white"
                          : "bg-slate-100 text-slate-600"
                      }`}
                    >
                      <HugeiconsIcon icon={item.icon} size={18} />
                    </div>
                    <span className="text-sm">{item.label}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    {item.badge && (
                      <span className="px-2 py-0.5 rounded-full bg-[#547FEE] text-white text-[11px] font-extrabold">
                        {item.badge}
                      </span>
                    )}
                    <HugeiconsIcon icon={ArrowRight01Icon} size={16} className="text-slate-400" />
                  </div>
                </Link>
              ))}
            </div>

            {/* Quick Preferences: Language / Currency & Dark Mode */}
            <div className="pt-4 border-t border-slate-100 space-y-2.5">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-3 mb-2 block">
                Préférences
              </span>

              <div className="grid grid-cols-2 gap-3">
                {/* Language & Currency Button */}
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onOpenLang?.();
                  }}
                  className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 hover:bg-slate-100 text-slate-800 border border-slate-200/80 cursor-pointer transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <HugeiconsIcon icon={GlobalIcon} size={18} className="text-slate-600" />
                    <span className="text-xs font-bold">{selectedLang} • {selectedCurrency}</span>
                  </div>
                  <HugeiconsIcon icon={ArrowRight01Icon} size={14} className="text-slate-400" />
                </button>

                {/* Dark Mode Toggle */}
                <button
                  type="button"
                  className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 hover:bg-slate-100 text-slate-800 border border-slate-200/80 cursor-pointer transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <HugeiconsIcon icon={Moon02Icon} size={18} className="text-slate-600" />
                    <span className="text-xs font-bold">Thème clair</span>
                  </div>
                </button>
              </div>
            </div>

          </div>

          {/* 3. Bottom Sticky Bar */}
          <div className="p-4 sm:p-6 border-t border-slate-100 bg-white space-y-3 shrink-0 max-w-lg mx-auto w-full">
            <Link
              href="/list-your-property"
              onClick={onClose}
              className="w-full py-3.5 px-4 bg-[#547FEE] hover:bg-[#406CE3] text-white font-bold text-sm rounded-2xl flex items-center justify-center gap-2 no-underline shadow-sm transition-all active:scale-98"
            >
              <HugeiconsIcon icon={Building01Icon} size={18} />
              <span>Publier mon logement sur Darbook</span>
            </Link>

            <p className="text-center text-[11px] text-slate-400 font-medium">
              Besoin d'aide ? Support client Darbook disponible 24/7
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
