"use client";

import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { motion, AnimatePresence } from "motion/react";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Menu01Icon,
  Cancel01Icon,
  Moon02Icon,
  Sun01Icon,
  GlobalIcon,
  FavouriteIcon,
  UserIcon,
  ArrowDown01Icon,
  ArrowRight01Icon,
  Facebook02Icon,
  NewTwitterIcon,
  InstagramIcon,
  PinterestIcon,
  YoutubeIcon,
} from "@hugeicons-pro/core-stroke-rounded";

import AuthModal from "@/components/AuthModal";
import DarkModeToggle from "@/components/theme/dark-mode-toggle";
import FullPageMobileMenu from "@/components/layout/FullPageMobileMenu";
import svgPaths from "@/imports/LandingPage/svg-p2y91de9gv";
import imgRusticPatioFurnitureHouseDeckWithVegetation2 from "@/imports/LandingPage/fabb010c874f57c47211afac0d2c3c2209cc0840.png";
import imgIconCalendar from "@/imports/About/icon-calendar.png";
import imgIconHouse from "@/imports/About/icon-house.png";
import imgIconShield from "@/imports/About/icon-shield.png";
import imgIconChat from "@/imports/About/icon-chat.png";
import imgVillaMain from "@/imports/About/villa-main.jpg";
import imgCtaVilla1 from "@/imports/About/cta-villa1.jpg";
import imgCtaVilla2 from "@/imports/About/cta-villa2.jpg";
import imgCtaVilla3 from "@/imports/About/cta-villa3.jpg";

function toImgSrc(val: any): string {
  if (!val) return "";
  if (typeof val === "string") return val;
  if (typeof val === "object" && val !== null) {
    if (typeof val.src === "string") return val.src;
    if (typeof val.default === "string") return val.default;
    if (typeof val.default === "object" && val.default !== null && typeof (val.default as any).src === "string") {
      return (val.default as any).src;
    }
  }
  return String(val);
}

// ─── Logo ────────────────────────────────────────────────────────────────────
function Group79() {
  return (
    <div className="h-[40px] sm:h-[44px] w-[180px] sm:w-[220px] relative">
      <svg
        className="block size-full"
        fill="none"
        height="44.5742"
        preserveAspectRatio="none"
        viewBox="0 0 224 44.5742"
        width="224"
      >
        <g id="Group 2087325898">
          <path d={svgPaths.p2bca0c0} fill="#547FEE" id="Union" />
          <g id="Darbook">
            <path d={svgPaths.p3d515900} fill="white" />
            <path d={svgPaths.p1e1c2e00} fill="white" />
            <path d={svgPaths.p3dbae00} fill="white" />
            <path d={svgPaths.p1c8f0b80} fill="white" />
            <path d={svgPaths.p2f5e4000} fill="white" />
            <path d={svgPaths.p25a54cf0} fill="white" />
            <path d={svgPaths.p8920900} fill="white" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Logo() {
  return (
    <Link href="/" className="inline-block shrink-0 no-underline">
      <Group79 />
    </Link>
  );
}

// ─── Navbar Actions ──────────────────────────────────────────────────────────

function LanguageSelector({
  selectedLang,
  selectedCurrency,
  onSelectLang,
  onSelectCurrency,
}: {
  selectedLang: string;
  selectedCurrency: string;
  onSelectLang: (lang: string) => void;
  onSelectCurrency: (curr: string) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"language" | "currency">("language");
  const [isClient, setIsClient] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsClient(true);
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const mainLanguages = [
    { code: "ENG", label: "English", country: "gb" },
    { code: "FRA", label: "Français", country: "fr" },
  ];

  const otherLanguages = [
    { code: "RUS", label: "Русский", country: "ru" },
    { code: "DE", label: "Deutsch", country: "de" },
    { code: "ES", label: "Español", country: "es" },
    { code: "JPY", label: "日本語", country: "jp" },
    { code: "PT", label: "Português", country: "pt" },
    { code: "ITA", label: "Italiano", country: "it" },
    { code: "PY", label: "Guaraní", country: "py" },
    { code: "ARA", label: "العربية", country: "sa" },
  ];

  const mainCurrencies = [
    { code: "EUR", label: "Euro", country: "eu" },
    { code: "USD", label: "US Dollar", country: "us" },
    { code: "TND", label: "Tunisian Dinar", country: "tn" },
  ];

  const otherCurrencies = [
    { code: "GBP", label: "British Pound", country: "gb" },
    { code: "CAD", label: "Canadian Dollar", country: "ca" },
    { code: "CHF", label: "Swiss Franc", country: "ch" },
    { code: "AUD", label: "Australian Dollar", country: "au" },
    { code: "JPY", label: "Japanese Yen", country: "jp" },
    { code: "SAR", label: "Saudi Riyal", country: "sa" },
    { code: "AED", label: "UAE Dirham", country: "ae" },
  ];

  const dropdownBody = (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-gray-900 tracking-tight">
        {activeTab === "language" ? "Choose language" : "Choose currency"}
      </h2>

      <div className="flex border-b border-gray-100 relative">
        <button
          type="button"
          onClick={() => setActiveTab("language")}
          className={`flex-1 py-2.5 text-sm transition-all cursor-pointer border-none bg-transparent text-center font-bold relative ${
            activeTab === "language" ? "text-gray-900" : "text-gray-400 hover:text-gray-600 font-semibold"
          }`}
        >
          Language ({selectedLang})
          {activeTab === "language" && (
            <motion.div
              layoutId="aboutDropdownActiveTabUnderline"
              className="absolute bottom-0 inset-x-0 h-[2.5px] bg-slate-900 rounded-full"
            />
          )}
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("currency")}
          className={`flex-1 py-2.5 text-sm transition-all cursor-pointer border-none bg-transparent text-center font-bold relative ${
            activeTab === "currency" ? "text-gray-900" : "text-gray-400 hover:text-gray-600 font-semibold"
          }`}
        >
          Currency ({selectedCurrency})
          {activeTab === "currency" && (
            <motion.div
              layoutId="aboutDropdownActiveTabUnderline"
              className="absolute bottom-0 inset-x-0 h-[2.5px] bg-slate-900 rounded-full"
            />
          )}
        </button>
      </div>

      {activeTab === "language" ? (
        <div className="space-y-4 pt-1">
          <div className="space-y-2">
            <h3 className="text-xs font-bold text-gray-700">Main languages</h3>
            <div className="grid grid-cols-2 gap-2.5">
              {mainLanguages.map((lang) => {
                const isSelected = selectedLang === lang.code;
                return (
                  <button
                    key={lang.code}
                    type="button"
                    onClick={() => {
                      onSelectLang(lang.code);
                      setIsOpen(false);
                    }}
                    className={`h-[44px] px-3.5 rounded-xl flex items-center justify-center gap-2 text-xs font-bold transition-all cursor-pointer border ${
                      isSelected
                        ? "border-[#4a77ec] border-2 text-gray-900 bg-white shadow-xs"
                        : "border-gray-200 text-gray-800 bg-white hover:bg-gray-50 hover:border-gray-300"
                    }`}
                  >
                    <img
                      src={`https://flagcdn.com/w40/${lang.country}.png`}
                      alt={lang.code}
                      className="w-5 h-5 rounded-full object-cover shrink-0 border border-gray-100/80"
                    />
                    <span>- {lang.code}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="text-xs font-bold text-gray-700">Other languages</h3>
            <div className="grid grid-cols-2 gap-2.5">
              {otherLanguages.map((lang) => {
                const isSelected = selectedLang === lang.code;
                return (
                  <button
                    key={lang.code}
                    type="button"
                    onClick={() => {
                      onSelectLang(lang.code);
                      setIsOpen(false);
                    }}
                    className={`h-[44px] px-3.5 rounded-xl flex items-center justify-center gap-2 text-xs font-bold transition-all cursor-pointer border ${
                      isSelected
                        ? "border-[#4a77ec] border-2 text-gray-900 bg-white shadow-xs"
                        : "border-gray-200 text-gray-800 bg-white hover:bg-gray-50 hover:border-gray-300"
                    }`}
                  >
                    <img
                      src={`https://flagcdn.com/w40/${lang.country}.png`}
                      alt={lang.code}
                      className="w-5 h-5 rounded-full object-cover shrink-0 border border-gray-100/80"
                    />
                    <span>- {lang.code}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-4 pt-1">
          <div className="space-y-2">
            <h3 className="text-xs font-bold text-gray-700">Main currencies</h3>
            <div className="grid grid-cols-2 gap-2.5">
              {mainCurrencies.map((curr) => {
                const isSelected = selectedCurrency === curr.code;
                return (
                  <button
                    key={curr.code}
                    type="button"
                    onClick={() => {
                      onSelectCurrency(curr.code);
                      setIsOpen(false);
                    }}
                    className={`h-[44px] px-3.5 rounded-xl flex items-center justify-center gap-2 text-xs font-bold transition-all cursor-pointer border ${
                      isSelected
                        ? "border-[#4a77ec] border-2 text-gray-900 bg-white shadow-xs"
                        : "border-gray-200 text-gray-800 bg-white hover:bg-gray-50 hover:border-gray-300"
                    }`}
                  >
                    <img
                      src={`https://flagcdn.com/w40/${curr.country}.png`}
                      alt={curr.code}
                      className="w-5 h-5 rounded-full object-cover shrink-0 border border-gray-100/80"
                    />
                    <span>- {curr.code}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="text-xs font-bold text-gray-700">Other currencies</h3>
            <div className="grid grid-cols-2 gap-2.5">
              {otherCurrencies.map((curr) => {
                const isSelected = selectedCurrency === curr.code;
                return (
                  <button
                    key={curr.code}
                    type="button"
                    onClick={() => {
                      onSelectCurrency(curr.code);
                      setIsOpen(false);
                    }}
                    className={`h-[44px] px-3.5 rounded-xl flex items-center justify-center gap-2 text-xs font-bold transition-all cursor-pointer border ${
                      isSelected
                        ? "border-[#4a77ec] border-2 text-gray-900 bg-white shadow-xs"
                        : "border-gray-200 text-gray-800 bg-white hover:bg-gray-50 hover:border-gray-300"
                    }`}
                  >
                    <img
                      src={`https://flagcdn.com/w40/${curr.country}.png`}
                      alt={curr.code}
                      className="w-5 h-5 rounded-full object-cover shrink-0 border border-gray-100/80"
                    />
                    <span>- {curr.code}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div ref={containerRef} className="relative shrink-0">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Select language and currency"
        className="h-[40px] sm:h-[44px] px-3 sm:px-4 bg-white hover:bg-slate-100 active:scale-95 transition-all duration-200 rounded-full flex items-center gap-2 cursor-pointer border-none shadow-sm text-[#344054] hover:text-[#547fee]"
      >
        <HugeiconsIcon icon={GlobalIcon} size={18} className="text-[#344054]" />
        <span className="text-xs font-bold text-[#344054] tracking-tight">
          {selectedLang}
        </span>
        <HugeiconsIcon
          icon={ArrowDown01Icon}
          size={14}
          className={`transition-transform duration-200 text-[#344054] ${
            isOpen ? "rotate-180 text-[#547fee]" : ""
          }`}
        />
      </button>

      {/* Desktop Popover */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="about-lang-popover"
            initial={{ opacity: 0, y: 8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="hidden lg:block absolute top-[calc(100%+8px)] right-0 w-[440px] bg-white rounded-3xl p-5 shadow-2xl border border-gray-100/90 z-50 space-y-4 text-left"
          >
            {dropdownBody}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Bottom Sheet */}
      {isClient &&
        createPortal(
          <AnimatePresence>
            {isOpen && (
              <div key="about-lang-mobile" className="lg:hidden">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setIsOpen(false)}
                  className="fixed inset-0 bg-black/60 backdrop-blur-xs z-[190]"
                />
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.2 }}
                  className="fixed inset-x-0 bottom-0 z-[200] bg-white rounded-t-[28px] p-5 shadow-2xl space-y-4 max-h-[85vh] overflow-y-auto"
                >
                  <div className="w-12 h-1.5 bg-gray-300 rounded-full mx-auto mb-1" />
                  <div className="flex justify-end">
                    <button
                      type="button"
                      onClick={() => setIsOpen(false)}
                      className="size-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-gray-200 border-none cursor-pointer"
                    >
                      <HugeiconsIcon icon={Cancel01Icon} size={18} />
                    </button>
                  </div>
                  {dropdownBody}
                </motion.div>
              </div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </div>
  );
}

function FavoritesButton() {
  return (
    <div className="relative shrink-0 group/navfav">
      <Link
        href="/favorites"
        aria-label="Favorites"
        className="h-[40px] w-[40px] sm:h-[44px] sm:w-[44px] bg-white hover:bg-red-50/80 active:scale-95 transition-all duration-300 rounded-full flex items-center justify-center border border-gray-100/80 hover:border-red-200/80 shadow-xs text-[#556080] hover:text-red-500 no-underline"
      >
        <HugeiconsIcon
          icon={FavouriteIcon}
          size={18}
          className="sm:w-5 sm:h-5 transition-all duration-300 group-hover/navfav:text-transparent group-hover/navfav:[&_path]:stroke-none group-hover/navfav:fill-red-500 group-hover/navfav:drop-shadow-[0_2px_6px_rgba(239,68,68,0.4)]"
        />
      </Link>
      <motion.div
        initial={{ scale: 1 }}
        animate={{ scale: [1, 1.25, 1] }}
        transition={{ repeat: Infinity, repeatDelay: 3.5, duration: 0.6 }}
        className="absolute -top-1 -right-1 bg-[#547fee] text-white text-[10px] sm:text-[11px] font-bold w-4.5 h-4.5 sm:w-5 sm:h-5 rounded-full flex items-center justify-center shadow-xs pointer-events-none border-2 border-white"
      >
        2
      </motion.div>
    </div>
  );
}

function SignInButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="h-[40px] sm:h-[44px] pl-2.5 pr-4 sm:pl-3 sm:pr-5 bg-white hover:bg-slate-100 active:scale-95 transition-all duration-200 rounded-full flex items-center gap-2 sm:gap-2.5 cursor-pointer border-none shadow-sm font-semibold text-[#344054] hover:text-[#547fee] text-xs sm:text-sm shrink-0"
    >
      <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-[#547fee]/10 flex items-center justify-center text-[#547fee] shrink-0">
        <HugeiconsIcon icon={UserIcon} size={15} />
      </div>
      <span className="whitespace-nowrap font-bold">Sign in</span>
    </button>
  );
}

// ─── Main About Us Component ───────────────────────────────────────────────────

export default function AboutUsContent() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState("FRA");
  const [selectedCurrency, setSelectedCurrency] = useState("EUR");

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 font-['Inter_Tight',sans-serif] antialiased overflow-x-hidden selection:bg-[#547fee]/20 selection:text-[#547fee]">
      
      {/* ─── Hero & Navbar Header ────────────────────────────────────────────── */}
      <header className="relative w-full overflow-hidden bg-[#09112a]">
        {/* Background Image with Sea Reflection */}
        <div className="absolute inset-0 pointer-events-none select-none">
          <img
            src={toImgSrc(imgRusticPatioFurnitureHouseDeckWithVegetation2)}
            alt="Darbook Seaside luxury"
            className="w-full h-full object-cover object-center scale-105 filter brightness-100 contrast-[1.05]"
          />
          {/* Softer, vibrant gradient overlay for enhanced photo visibility */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#091129]/65 via-[#0b1638]/35 to-[#091129]/70" />
          <div className="absolute inset-0 bg-blue-950/15 mix-blend-color" />
        </div>

        {/* Top Navbar */}
        <div className="relative z-30 w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 pt-5 sm:pt-7 flex items-center justify-between">
          <Logo />

          {/* Desktop Right Actions */}
          <div className="hidden lg:flex items-center gap-3">
            <DarkModeToggle />
            <LanguageSelector
              selectedLang={selectedLang}
              selectedCurrency={selectedCurrency}
              onSelectLang={setSelectedLang}
              onSelectCurrency={setSelectedCurrency}
            />
            <FavoritesButton />
            <SignInButton onClick={() => setIsAuthModalOpen(true)} />
          </div>

          {/* Mobile Actions & Hamburger */}
          <div className="flex lg:hidden items-center gap-2">
            <LanguageSelector
              selectedLang={selectedLang}
              selectedCurrency={selectedCurrency}
              onSelectLang={setSelectedLang}
              onSelectCurrency={setSelectedCurrency}
            />
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="Open navigation menu"
              className="h-[40px] w-[40px] rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md text-white flex items-center justify-center cursor-pointer border border-white/20 transition-all"
            >
              <HugeiconsIcon icon={Menu01Icon} size={20} />
            </button>
          </div>
        </div>

        {/* Centered Page Title */}
        <div className="relative z-20 max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24 sm:pt-24 sm:pb-28 lg:pt-28 lg:pb-32 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="font-['Bricolage_Grotesk',sans-serif] text-4xl sm:text-5xl lg:text-[56px] font-extrabold text-white tracking-tight drop-shadow-md m-0"
          >
            About us
          </motion.h1>
        </div>
      </header>

      {/* ─── Main Content Container ─────────────────────────────────────────── */}
      <main className="relative z-10 -mt-6 sm:-mt-8 bg-[#f8fafc] rounded-t-[28px] sm:rounded-t-[36px] lg:rounded-t-[44px] pb-16 sm:pb-24">
        
        {/* Breadcrumb Navigation */}
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs sm:text-[13px] font-medium">
            <Link
              href="/"
              className="text-slate-400 hover:text-slate-700 transition-colors no-underline"
            >
              Home
            </Link>
            <span className="text-slate-300 font-light select-none">&gt;</span>
            <span className="text-[#547fee] font-semibold">
              About us
            </span>
          </nav>
        </div>

        {/* ─── Section 1: "More than a stay, a place to belong" ───────────── */}
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 mt-5 sm:mt-7">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            className="bg-white rounded-[24px] sm:rounded-[32px] border border-slate-100 shadow-[0_4px_25px_rgba(0,0,0,0.03)] p-6 sm:p-10 lg:p-12"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              
              {/* Left Text */}
              <div className="lg:col-span-7 space-y-4 sm:space-y-5">
                <h2 className="font-['Bricolage_Grotesk',sans-serif] text-2xl sm:text-3xl lg:text-[36px] font-extrabold text-[#101438] leading-[1.2] tracking-tight m-0">
                  More than a stay, a place to belong
                </h2>
                <p className="font-['Inter_Tight:Regular',sans-serif] text-slate-600 text-xs sm:text-sm lg:text-[15px] leading-relaxed m-0 max-w-2xl">
                  Darbook is a hospitality platform built around experiences, not just accommodation. We connect travelers with carefully selected guesthouses and unique stays in Tunisia&apos;s most inspiring destinations, from seaside escapes and vibrant cities to nature retreats and desert journeys. Our mission is to make every booking simple, secure, and transparent, while helping guests enjoy authentic local hospitality and enabling hosts to welcome travelers with confidence. With Darbook, every stay is personal, comfortable, and truly unforgettable.
                </p>
              </div>

              {/* Right Image */}
              <div className="lg:col-span-5">
                <div className="relative rounded-[20px] sm:rounded-[26px] overflow-hidden aspect-[4/3] shadow-md group">
                  <img
                    src={toImgSrc(imgVillaMain)}
                    alt="Luxury architectural villa with swimming pool"
                    className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500 ease-out"
                  />
                  <div className="absolute inset-0 ring-1 ring-inset ring-black/5 rounded-[20px] sm:rounded-[26px] pointer-events-none" />
                </div>
              </div>

            </div>
          </motion.div>
        </div>

        {/* ─── Section 2: "Darbook in Numbers" ──────────────────────────────── */}
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 mt-14 sm:mt-20">
          <div className="space-y-1.5">
            <h2 className="font-['Bricolage_Grotesk',sans-serif] text-2xl sm:text-3xl font-extrabold text-[#101438] tracking-tight m-0">
              Darbook in Numbers
            </h2>
            <p className="font-['Inter_Tight',sans-serif] text-slate-500 text-xs sm:text-sm font-medium m-0">
              Growing together with trusted hosts and thousands of happy travelers.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5 sm:gap-4 lg:gap-5 mt-6 sm:mt-8">
            {[
              { stat: "250+", label: "Properties" },
              { stat: "30+", label: "Cities & Regions" },
              { stat: "4,000+", label: "Confirmed Bookings" },
              { stat: "5+", label: "Years in Hospitality" },
              { stat: "100%", label: "Secure & Transparent Booking" },
            ].map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                className="bg-[#f0f5ff] hover:bg-[#e4eeff] border border-[#e2edff] rounded-[18px] sm:rounded-[22px] p-5 sm:p-6 flex flex-col items-center justify-center text-center gap-1.5 transition-all duration-300 hover:shadow-sm hover:-translate-y-0.5"
              >
                <span className="font-['Bricolage_Grotesk',sans-serif] font-black text-2xl sm:text-3xl lg:text-[32px] text-[#547fee] tracking-tight leading-none">
                  {item.stat}
                </span>
                <span className="font-['Inter_Tight',sans-serif] text-slate-600 text-xs sm:text-[13px] font-medium leading-snug">
                  {item.label}
                </span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ─── Section 3: "Why Darbook" ─────────────────────────────────────── */}
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 mt-14 sm:mt-20">
          <div className="space-y-1">
            <h2 className="font-['Bricolage_Grotesk',sans-serif] text-2xl sm:text-[28px] font-bold text-[#101438] tracking-tight m-0">
              Why Darbook
            </h2>
            <p className="font-['Inter_Tight',sans-serif] text-slate-500 text-xs sm:text-[13.5px] font-normal m-0">
              Everything you need for a smooth, secure, and memorable stay.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-5 mt-6 sm:mt-7">
            {[
              {
                title: "Easy Booking",
                description:
                  "Search, choose, and book your stay in just a few steps. The process is simple, fast, and clear.",
                image: imgIconCalendar,
                alt: "Easy Booking",
                imgWidth: "w-[96px] sm:w-[106px] lg:w-[115px]",
              },
              {
                title: "Carefully Selected Stays",
                description:
                  "We choose each property with care. Enjoy unique guesthouses and special places that offer real local hospitality.",
                image: imgIconHouse,
                alt: "Carefully Selected Stays",
                imgWidth: "w-[98px] sm:w-[108px] lg:w-[118px]",
              },
              {
                title: "Safe & Clear Payments",
                description:
                  "Your payment is secure and transparent. No hidden fees. No surprises.",
                image: imgIconShield,
                alt: "Safe & Clear Payments",
                imgWidth: "w-[92px] sm:w-[102px] lg:w-[110px]",
              },
              {
                title: "Friendly Support",
                description:
                  "Need help? We're here for you. Before, during, and after your stay.",
                image: imgIconChat,
                alt: "Friendly Support",
                imgWidth: "w-[98px] sm:w-[108px] lg:w-[118px]",
              },
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                className="bg-white border border-[#edf1f7] shadow-[0_2px_16px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_28px_rgba(0,0,0,0.06)] rounded-[22px] sm:rounded-[24px] pt-6 px-6 pb-0 flex flex-col justify-between h-[275px] sm:h-[285px] transition-all duration-300 hover:-translate-y-1 relative group overflow-hidden"
              >
                {/* Top Text Content */}
                <div className="space-y-1.5 z-10 relative">
                  <h3 className="font-['Bricolage_Grotesk',sans-serif] text-[15px] sm:text-base font-bold text-[#101438] m-0">
                    {item.title}
                  </h3>
                  <p className="font-['Inter_Tight:Regular',sans-serif] text-slate-500 text-[11.5px] sm:text-xs leading-[1.5] m-0 max-w-[95%]">
                    {item.description}
                  </p>
                </div>

                {/* Bottom Right Graphic Area - Flush to Bottom and Right Edges with 0 padding */}
                <div className="absolute bottom-0 right-0 pointer-events-none flex items-end justify-end">
                  {/* Soft Light-Blue Background Curve in Bottom-Right Corner */}
                  <div className="w-[145px] sm:w-[165px] h-[115px] sm:h-[130px] bg-[#ebf4fe] rounded-tl-full absolute bottom-0 right-0 pointer-events-none" />
                  
                  {/* 3D PNG Icon aligned flush in Bottom-Right */}
                  <div className={`${item.imgWidth} aspect-square relative z-10 p-0 m-0 group-hover:scale-105 transition-transform duration-300 ease-out flex items-end justify-end`}>
                    <img
                      src={toImgSrc(item.image)}
                      alt={item.alt}
                      className="w-full h-full object-contain filter drop-shadow-sm select-none pointer-events-none"
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ─── Section 4: "List Your Property With Us" CTA Banner ──────────── */}
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 mt-14 sm:mt-20">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-r from-[#eef4ff] via-[#e5f0fe] to-[#d6e6fc] rounded-[28px] sm:rounded-[36px] border border-[#d3e3fc] p-6 sm:p-10 lg:p-14 relative overflow-hidden shadow-xs"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              
              {/* Left Column: Heading, Copy, Buttons, Pagination Indicators */}
              <div className="lg:col-span-6 flex flex-col justify-between h-full space-y-6 sm:space-y-8">
                <div className="space-y-2.5">
                  <h2 className="font-['Bricolage_Grotesk',sans-serif] text-2xl sm:text-3xl lg:text-[36px] font-extrabold text-[#101438] tracking-tight leading-tight m-0">
                    List Your Property With Us
                  </h2>
                  <p className="font-['Inter_Tight',sans-serif] text-slate-600 text-xs sm:text-sm lg:text-[15px] m-0">
                    Reach more travelers and grow your bookings with Darbook.
                  </p>
                </div>

                {/* CTA Action Buttons */}
                <div className="flex flex-wrap items-center gap-3 sm:gap-4">
                  <Link
                    href="/list-your-property"
                    className="h-[44px] sm:h-[48px] px-6 sm:px-7 bg-[#547fee] hover:bg-[#436cd9] text-white font-semibold text-xs sm:text-sm rounded-full shadow-md hover:shadow-lg active:scale-95 transition-all no-underline inline-flex items-center justify-center"
                  >
                    Start Hosting
                  </Link>
                  <Link
                    href="/contact"
                    className="h-[44px] sm:h-[48px] px-6 sm:px-7 bg-white/70 hover:bg-white text-[#547fee] border border-[#547fee]/30 hover:border-[#547fee]/60 font-semibold text-xs sm:text-sm rounded-full shadow-xs active:scale-95 transition-all no-underline inline-flex items-center justify-center"
                  >
                    Contact Us
                  </Link>
                </div>

                {/* Indicator Progress Bars */}
                <div className="flex items-center gap-2 pt-2">
                  <div className="w-8 sm:w-10 h-1.5 rounded-full bg-white/80" />
                  <div className="w-8 sm:w-10 h-1.5 rounded-full bg-white/80" />
                  <div className="w-8 sm:w-10 h-1.5 rounded-full bg-white/80" />
                  <div className="w-8 sm:w-10 h-1.5 rounded-full bg-white/80" />
                  <div className="w-12 sm:w-16 h-1.5 rounded-full bg-[#547fee] shadow-xs" />
                </div>
              </div>

              {/* Right Column: 3 Layered / Fanned Villa Cards */}
              <div className="lg:col-span-6 relative flex items-center justify-center lg:justify-end py-4">
                <div className="flex items-center justify-center gap-2 sm:gap-3">
                  
                  {/* Card 1: Sunset Villa Terrace */}
                  <motion.div
                    whileHover={{ scale: 1.05, rotate: 0 }}
                    transition={{ duration: 0.3 }}
                    className="w-[110px] sm:w-[160px] lg:w-[185px] aspect-[3/4] rounded-2xl overflow-hidden shadow-xl ring-4 ring-white/90 transform -rotate-6 shrink-0 relative"
                  >
                    <img
                      src={toImgSrc(imgCtaVilla1)}
                      alt="Sunset terrace villa"
                      className="w-full h-full object-cover"
                    />
                  </motion.div>

                  {/* Card 2: Modern Pool Villa (Center & Elevated) */}
                  <motion.div
                    whileHover={{ scale: 1.08 }}
                    transition={{ duration: 0.3 }}
                    className="w-[125px] sm:w-[180px] lg:w-[210px] aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl ring-4 ring-white z-10 transform scale-105 shrink-0 relative -mx-2 sm:-mx-3"
                  >
                    <img
                      src={toImgSrc(imgCtaVilla2)}
                      alt="Contemporary pool villa"
                      className="w-full h-full object-cover"
                    />
                  </motion.div>

                  {/* Card 3: Palm Patio Courtyard */}
                  <motion.div
                    whileHover={{ scale: 1.05, rotate: 0 }}
                    transition={{ duration: 0.3 }}
                    className="w-[110px] sm:w-[160px] lg:w-[185px] aspect-[3/4] rounded-2xl overflow-hidden shadow-xl ring-4 ring-white/90 transform rotate-6 shrink-0 relative"
                  >
                    <img
                      src={toImgSrc(imgCtaVilla3)}
                      alt="Mediterranean patio villa"
                      className="w-full h-full object-cover"
                    />
                  </motion.div>

                </div>
              </div>

            </div>
          </motion.div>
        </div>

      </main>

      {/* ─── Global Footer ─────────────────────────────────────────────────── */}
      <footer className="w-full bg-[#101438] text-white rounded-t-[28px] sm:rounded-t-[40px] pt-14 pb-10 sm:pt-16 sm:pb-12 relative overflow-hidden border-t border-slate-800">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-10 gap-10 lg:gap-8 pb-12">
            
            {/* Col 1: Brand & Bio */}
            <div className="lg:col-span-2 flex flex-col gap-4">
              <Link href="/" className="inline-block no-underline">
                <Group79 />
              </Link>
              <p className="font-['Inter_Tight:Regular',sans-serif] text-xs sm:text-sm leading-relaxed text-slate-300 max-w-xs m-0">
                Darbook is a platform for renting holiday homes in Tunisia. Book in just a few clicks and enjoy an unforgettable stay.
              </p>
              <Link
                href="/list-your-property"
                className="bg-[#547fee] hover:bg-[#436cd9] transition-all text-white font-semibold text-xs sm:text-sm px-6 py-2.5 rounded-full border-none cursor-pointer shadow-md hover:shadow-lg hover:scale-102 no-underline inline-flex items-center justify-center w-fit mt-2"
              >
                List your property
              </Link>
            </div>

            {/* Col 2: Company Navigation */}
            <div className="lg:col-span-2 flex flex-col gap-3">
              <h4 className="font-['Bricolage_Grotesk',sans-serif] font-bold text-sm sm:text-base text-white tracking-wide m-0">
                Company
              </h4>
              <ul className="list-none m-0 p-0 flex flex-col gap-2 text-xs sm:text-sm text-slate-300">
                {[
                  { label: "About us", href: "/about" },
                  { label: "Catalog", href: "/search" },
                  { label: "Terms & Conditions", href: "/terms" },
                  { label: "Cancelation Policy", href: "/cancelation" },
                  { label: "Privacy Policy", href: "/privacy" },
                  { label: "FAQ", href: "/faq" },
                  { label: "Contact us", href: "/contact" },
                ].map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className="text-slate-300 hover:text-white transition-colors no-underline font-normal"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Col 3: Experience Navigation */}
            <div className="lg:col-span-2 flex flex-col gap-3">
              <h4 className="font-['Bricolage_Grotesk',sans-serif] font-bold text-sm sm:text-base text-white tracking-wide m-0">
                Experience
              </h4>
              <ul className="list-none m-0 p-0 flex flex-col gap-2 text-xs sm:text-sm text-slate-300">
                {[
                  "Seaside",
                  "Swimming pool",
                  "Urban stays",
                  "Nature",
                  "Sahara",
                  "Cultural",
                  "Family",
                  "Romantics",
                ].map((item) => (
                  <li key={item}>
                    <Link
                      href={`/search?category=${encodeURIComponent(item)}`}
                      className="text-slate-300 hover:text-white transition-colors no-underline font-normal"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Col 4: Address & Contact */}
            <div className="lg:col-span-2 flex flex-col gap-3">
              <h4 className="font-['Bricolage_Grotesk',sans-serif] font-bold text-sm sm:text-base text-white tracking-wide m-0">
                Address
              </h4>
              <div className="flex flex-col gap-3 text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                <p className="m-0">
                  101 Marlow Street, #12-05 Clife Parkview, Singapore 059020.
                </p>
                <div className="flex flex-col gap-1">
                  <a href="tel:+6561565519" className="text-slate-300 hover:text-white transition-colors no-underline block">
                    +65 6156 5519
                  </a>
                  <a href="mailto:hello@Newsify.com" className="text-slate-300 hover:text-white transition-colors no-underline block">
                    hello@Newsify.com
                  </a>
                </div>
              </div>
            </div>

            {/* Col 5: Mobile App & Social */}
            <div className="lg:col-span-2 flex flex-col gap-5">
              {/* App Buttons */}
              <div className="flex flex-col gap-2.5">
                <h4 className="font-['Bricolage_Grotesk',sans-serif] font-bold text-sm sm:text-base text-white tracking-wide m-0">
                  Darbook mobile app
                </h4>
                <div className="flex flex-col gap-2">
                  <a
                    href="https://apps.apple.com"
                    aria-label="App Store"
                    className="w-[145px] h-[38px] bg-white/5 border border-white/20 hover:border-white/40 transition-colors rounded-xl flex items-center justify-center gap-2 no-underline text-white"
                  >
                    <svg className="size-4 fill-current shrink-0" viewBox="0 0 170 170">
                      <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-5.03.24-9.97-1.8-14.83-6.13-3.18-2.75-7.05-7.38-11.62-13.88-6.12-8.73-10.86-18.47-14.23-29.23-3.37-10.76-5.06-21.2-5.06-31.33 0-14.48 3.56-26.24 10.68-35.29 7.12-9.05 16.03-13.67 26.73-13.87 5.12 0 10.81 1.25 17.07 3.75 6.26 2.5 10.5 3.75 12.74 3.75 2.01 0 6.37-1.25 13.08-3.75 6.71-2.5 11.97-3.66 15.78-3.48 11.68.83 20.89 4.96 27.63 12.39-10.42 6.35-15.54 15.17-15.36 26.47.18 8.82 3.51 16.14 9.99 21.96 6.48 5.82 14.3 9.07 23.46 9.75-2.23 6.7-5.19 13.62-8.88 20.76zM119.22 31.42c0-6.91 2.52-13.56 7.56-19.95 5.04-6.39 11.37-10.29 18.99-11.7.35 1.53.53 3.01.53 4.44 0 6.91-2.56 13.56-7.68 19.95-5.12 6.39-11.45 10.23-18.99 11.52-.35-1.29-.53-2.71-.53-4.26z" />
                    </svg>
                    <div className="flex flex-col text-left">
                      <span className="text-[8px] uppercase text-slate-400 leading-tight">Download on the</span>
                      <span className="text-xs font-semibold text-white leading-tight">App Store</span>
                    </div>
                  </a>

                  <a
                    href="https://play.google.com"
                    aria-label="Google Play"
                    className="w-[145px] h-[38px] bg-white/5 border border-white/20 hover:border-white/40 transition-colors rounded-xl flex items-center justify-center gap-2 no-underline text-white"
                  >
                    <svg className="size-4 shrink-0" viewBox="0 0 24 24">
                      <path fill="#EA4335" d="M3.6 1.8L13.2 11.4 3.6 21c-.4-.3-.6-.8-.6-1.4V3.2c0-.6.2-1.1.6-1.4z" />
                      <path fill="#FBBC04" d="M16.8 7.8L13.2 11.4 16.8 15l4.3-2.4c1-.6 1-1.6 0-2.2l-4.3-2.6z" />
                      <path fill="#4285F4" d="M13.2 11.4L3.6 1.8 16.8 7.8l-3.6 3.6z" />
                      <path fill="#34A853" d="M13.2 11.4l3.6 3.6-13.2 6c.4.3.9.3 1.4 0l11.8-6.6z" />
                    </svg>
                    <div className="flex flex-col text-left">
                      <span className="text-[8px] uppercase text-slate-400 leading-tight">GET IT ON</span>
                      <span className="text-xs font-semibold text-white leading-tight">Google Play</span>
                    </div>
                  </a>
                </div>
              </div>

              {/* Social Icons */}
              <div className="flex flex-col gap-2.5 pt-1">
                <h4 className="font-['Bricolage_Grotesk',sans-serif] font-bold text-sm sm:text-base text-white tracking-wide m-0">
                  Social media
                </h4>
                <div className="flex items-center gap-2.5">
                  {[
                    { icon: Facebook02Icon, label: "Facebook" },
                    { icon: NewTwitterIcon, label: "Twitter" },
                    { icon: InstagramIcon, label: "Instagram" },
                    { icon: PinterestIcon, label: "Pinterest" },
                    { icon: YoutubeIcon, label: "YouTube" },
                  ].map((item) => (
                    <a
                      key={item.label}
                      href="#"
                      onClick={(e) => e.preventDefault()}
                      aria-label={item.label}
                      className="w-8 h-8 sm:w-9 sm:h-9 shrink-0 aspect-square rounded-full bg-white text-[#101438] flex items-center justify-center hover:scale-110 transition-transform shadow-xs no-underline"
                    >
                      <HugeiconsIcon icon={item.icon} size={16} />
                    </a>
                  ))}
                </div>
              </div>
            </div>

          </div>

          {/* Bottom Divider & Copyright Bar */}
          <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs sm:text-sm text-slate-400 m-0">
              © 2026 Darbook. All rights reserved
            </p>

            {/* Payment Method Badges */}
            <div className="flex items-center gap-4 text-white text-xs font-bold font-mono tracking-wider opacity-80">
              <span className="text-sm font-extrabold italic text-white tracking-tighter">VISA</span>
              <div className="flex items-center -space-x-1.5">
                <div className="size-4 rounded-full bg-red-500 opacity-90" />
                <div className="size-4 rounded-full bg-amber-400 opacity-90" />
              </div>
              <span className="text-xs font-black tracking-widest text-white">JCB</span>
            </div>
          </div>

        </div>

        {/* Back to Top Floating Button */}
        <button
          type="button"
          aria-label="Scroll to top"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="absolute right-4 sm:right-8 bottom-6 size-9 sm:size-10 bg-[#547fee] hover:bg-[#436cd9] transition-all rounded-full flex items-center justify-center cursor-pointer border-none shadow-lg active:scale-95 z-10 text-white"
        >
          <svg className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
          </svg>
        </button>
      </footer>

      {/* Auth Modal */}
      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />

      {/* Full Page Mobile Menu */}
      <FullPageMobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />

    </div>
  );
}
