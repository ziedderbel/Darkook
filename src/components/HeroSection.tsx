"use client";
import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { Link, useRouter } from "@/i18n/navigation";
import { motion, AnimatePresence } from "motion/react";
import { useTheme } from "next-themes";
import AuthModal from "./AuthModal";
import LanguageCurrencyModal from "./LanguageCurrencyModal";
import FullPageMobileMenu from "@/components/layout/FullPageMobileMenu";
import DarkModeToggle from "@/components/theme/dark-mode-toggle";
import NavbarSearchWidget from "@/components/search/NavbarSearchWidget";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Menu01Icon,
  Cancel01Icon,
  Moon02Icon,
  Sun01Icon,
  GlobalIcon,
  FavouriteIcon,
  UserIcon,
  Calendar03Icon,
  Clock01Icon,
  CreditCardIcon,
  CustomerSupportIcon,
  Search01Icon,
  House01Icon,
  Location01Icon,
  UserGroupIcon,
  ArrowDown01Icon,
  ArrowLeft01Icon,
  ArrowRight01Icon,
  BeachIcon,
  SwimmingIcon,
  Building01Icon,
  TreesIcon,
  MountainIcon,
  BankIcon,
  Delete02Icon,
  BedDoubleIcon,
  AddCircleIcon,
  RemoveCircleIcon,
  Tick01Icon,
} from "@hugeicons-pro/core-stroke-rounded";
import svgPaths from "../imports/LandingPage/svg-p2y91de9gv"
import img81831 from "../imports/LandingPage/a1a57c413ca15b66ba58417dbf49d2caeaafb62f.png"

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
    <div className="col-1 h-[44.574px] ml-0 mt-0 relative row-1 w-[224px]">
      <svg
        className="absolute block inset-0 size-full"
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
  )
}

function Logo() {
  return (
    <Link
      href="/"
      className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0"
    >
      <Group79 />
    </Link>
  )
}

// ─── Navbar actions ───────────────────────────────────────────────────────────

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
      {/* Title */}
      <h2 className="text-xl font-bold text-gray-900 tracking-tight">
        {activeTab === "language" ? "Choose language" : "Choose currency"}
      </h2>

      {/* Tabs */}
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
              layoutId="dropdownActiveTabUnderline"
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
              layoutId="dropdownActiveTabUnderline"
              className="absolute bottom-0 inset-x-0 h-[2.5px] bg-slate-900 rounded-full"
            />
          )}
        </button>
      </div>

      {/* Content */}
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
        className="h-[44px] px-4 bg-white hover:bg-slate-100 active:scale-95 transition-all duration-200 rounded-full flex items-center gap-2.5 cursor-pointer border-none shadow-sm text-[#344054] hover:text-[#547fee]"
      >
        <HugeiconsIcon icon={GlobalIcon} size={18} className="text-[#344054]" />
        <span className="text-xs font-bold text-[#344054] tracking-tight">
          {selectedLang} ({selectedCurrency})
        </span>
        <HugeiconsIcon
          icon={ArrowDown01Icon}
          size={14}
          className={`transition-transform duration-200 text-[#344054] ${
            isOpen ? "rotate-180 text-[#547fee]" : ""
          }`}
        />
      </button>

      {/* Desktop Floating Dropdown Popover (lg: 1024px+) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="lang-curr-desktop-popover"
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

      {/* Mobile Bottom Sheet (< lg: 1024px) Portalled to document.body */}
      {isClient &&
        createPortal(
          <AnimatePresence>
            {isOpen && (
              <div key="lang-curr-mobile-wrapper" className="lg:hidden">
                <motion.div
                  key="lang-curr-mobile-backdrop"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setIsOpen(false)}
                  className="fixed inset-0 bg-black/60 backdrop-blur-xs z-[190]"
                />
                <motion.div
                  key="lang-curr-mobile-sheet"
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
        <motion.div
          whileHover={{
            scale: [1, 1.35, 0.9, 1.15, 1],
            rotate: [0, -16, 16, -6, 0],
          }}
          whileTap={{ scale: 0.78 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
        >
          <HugeiconsIcon
            icon={FavouriteIcon}
            size={18}
            className="sm:w-5 sm:h-5 transition-all duration-300 group-hover/navfav:text-transparent group-hover/navfav:[&_path]:stroke-none group-hover/navfav:fill-red-500 group-hover/navfav:drop-shadow-[0_2px_6px_rgba(239,68,68,0.4)]"
          />
        </motion.div>
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

function ListPropertyButton() {
  return (
    <Link
      href="/list-your-property"
      className="h-[44px] px-6 bg-[#547fee] hover:bg-[#436cd9] active:scale-95 transition-all duration-200 rounded-full flex items-center justify-center border-none shadow-md hover:shadow-lg font-semibold text-white text-sm whitespace-nowrap no-underline shrink-0"
    >
      List your property
    </Link>
  );
}

function SignInButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="h-[44px] pl-3 pr-5 bg-white hover:bg-slate-100 active:scale-95 transition-all duration-200 rounded-full flex items-center gap-2.5 cursor-pointer border-none shadow-sm font-semibold text-[#344054] hover:text-[#547fee] text-sm shrink-0"
    >
      <div className="w-7 h-7 rounded-full bg-[#547fee]/10 flex items-center justify-center text-[#547fee] shrink-0">
        <HugeiconsIcon icon={UserIcon} size={16} />
      </div>
      <span className="whitespace-nowrap font-bold">Sign In</span>
    </button>
  );
}

function StickyBrandLogo() {
  return (
    <Link href="/" className="flex items-center shrink-0 no-underline select-none">
      {/* Full Logo on sm+ */}
      <div className="hidden sm:block h-[34px] sm:h-[38px] w-auto aspect-[224/44.57] relative">
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
      {/* Icon Emblem on mobile < sm */}
      <div className="sm:hidden h-[34px] w-[34px] rounded-xl bg-[#547FEE] flex items-center justify-center shadow-xs">
        <svg className="w-5 h-5" fill="none" viewBox="0 0 45 45">
          <path d={svgPaths.p2bca0c0} fill="white" />
        </svg>
      </div>
    </Link>
  );
}

// ─── Navbar ───────────────────────────────────────────────────────────────────

function Navbar() {
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isLangModalOpen, setIsLangModalOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState("FRA");
  const [selectedCurrency, setSelectedCurrency] = useState("EUR");
  const [isSticky, setIsSticky] = useState(false);
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Trigger sticky navbar when user scrolls down past 160px
      if (typeof window !== "undefined") {
        const sticky = window.scrollY > 160;
        setIsSticky(sticky);
        if (!sticky) {
          setIsSearchExpanded(false);
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* 1. Default Static Hero Navbar (at top of hero) */}
      <nav className="-translate-x-1/2 absolute flex items-center justify-between left-1/2 top-[20px] sm:top-[28px] w-full max-w-[1280px] px-4 sm:px-6 lg:px-8 z-30">
        <Logo />

        {/* Desktop Actions (lg: 1024px+) */}
        <div className="hidden lg:flex gap-3 items-center relative shrink-0">
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

        {/* Mobile & Tablet Hamburger Trigger (< lg: 1024px) */}
        <div className="flex lg:hidden items-center gap-2">
          <DarkModeToggle />
          <FavoritesButton />
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(true)}
            aria-label="Open menu"
            className="h-[40px] w-[40px] bg-white hover:bg-slate-100 active:scale-95 transition-all duration-200 rounded-full flex items-center justify-center cursor-pointer border-none shadow-sm text-[#556080] hover:text-[#547fee]"
          >
            <HugeiconsIcon icon={Menu01Icon} size={20} />
          </button>
        </div>
      </nav>

      {/* 2. Floating Sticky Navbar Following User on Scroll with 2-Row Smooth Search Expansion */}
      <AnimatePresence>
        {isSticky && (
          <>
            {/* Click-outside backdrop when expanded */}
            {isSearchExpanded && (
              <div
                onClick={() => setIsSearchExpanded(false)}
                className="fixed inset-0 bg-black/25 backdrop-blur-2xs z-[90] animate-in fade-in duration-200"
              />
            )}
            <motion.header
              initial={{ y: -80, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -80, opacity: 0 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
              className={`fixed top-0 inset-x-0 z-[100] bg-white/95 dark:bg-[#070b18]/95 backdrop-blur-md border-b border-gray-200/80 dark:border-slate-800 transition-all duration-200 ${
                isSearchExpanded ? "shadow-2xl" : "shadow-md"
              }`}
            >
              {/* Row 1: Logo + Compact Search Pill + Right Actions */}
              <div className="max-w-[1280px] mx-auto px-3 sm:px-6 lg:px-8 py-2 sm:py-3 flex items-center justify-between gap-2 sm:gap-4">
                {/* Brand Logo */}
                <StickyBrandLogo />

                {/* Center: Compact Search Widget (Visible only when NOT expanded) */}
                {!isSearchExpanded && (
                  <div className="flex-1 max-w-[580px] mx-1 sm:mx-3 flex justify-center min-w-0">
                    <NavbarSearchWidget
                      isExpanded={false}
                      onExpandedChange={setIsSearchExpanded}
                      initialLocation="Choose destination"
                      initialCheckIn="2026-03-21"
                      initialCheckOut="2026-03-28"
                      initialGuests="2 guests"
                      onSearch={({ location, checkIn, checkOut, guests }) => {
                        setIsSearchExpanded(false);
                        router.push(
                          `/search?location=${encodeURIComponent(location)}&checkIn=${encodeURIComponent(
                            checkIn
                          )}&checkOut=${encodeURIComponent(checkOut)}&guests=${encodeURIComponent(guests)}`
                        );
                      }}
                    />
                  </div>
                )}

                {/* Right Actions */}
                <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
                  <DarkModeToggle />
                  <div className="hidden lg:flex items-center gap-2">
                    <LanguageSelector
                      selectedLang={selectedLang}
                      selectedCurrency={selectedCurrency}
                      onSelectLang={setSelectedLang}
                      onSelectCurrency={setSelectedCurrency}
                    />
                  </div>
                  <FavoritesButton />
                  <div className="hidden sm:block">
                    <SignInButton onClick={() => setIsAuthModalOpen(true)} />
                  </div>

                  {/* Mobile Menu Trigger */}
                  <button
                    type="button"
                    onClick={() => setIsMobileMenuOpen(true)}
                    aria-label="Open menu"
                    className="lg:hidden h-[38px] w-[38px] sm:h-[40px] sm:w-[40px] bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 active:scale-95 transition-all duration-200 rounded-full flex items-center justify-center cursor-pointer border-none text-[#556080] dark:text-slate-300 hover:text-[#547fee]"
                  >
                    <HugeiconsIcon icon={Menu01Icon} size={18} />
                  </button>
                </div>
              </div>

              {/* Row 2: Full-Width Expanded Search Bar with Plenty of Room for Dropdowns */}
              <AnimatePresence>
                {isSearchExpanded && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className="w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 pb-5 pt-2 flex justify-center overflow-visible"
                  >
                    <NavbarSearchWidget
                      isExpanded={true}
                      onExpandedChange={setIsSearchExpanded}
                      initialLocation="Choose destination"
                      initialCheckIn="2026-03-21"
                      initialCheckOut="2026-03-28"
                      initialGuests="2 guests"
                      onSearch={({ location, checkIn, checkOut, guests }) => {
                        setIsSearchExpanded(false);
                        router.push(
                          `/search?location=${encodeURIComponent(location)}&checkIn=${encodeURIComponent(
                            checkIn
                          )}&checkOut=${encodeURIComponent(checkOut)}&guests=${encodeURIComponent(guests)}`
                        );
                      }}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.header>
          </>
        )}
      </AnimatePresence>

      {/* Full Page Mobile Menu (Whole page overlay) */}
      <FullPageMobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        onOpenAuth={() => setIsAuthModalOpen(true)}
        onOpenLang={() => setIsLangModalOpen(true)}
        selectedLang={selectedLang}
        selectedCurrency={selectedCurrency}
        favoritesCount={2}
      />
      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
      <LanguageCurrencyModal
        isOpen={isLangModalOpen}
        onClose={() => setIsLangModalOpen(false)}
        selectedLanguage={selectedLang}
        onSelectLanguage={setSelectedLang}
        selectedCurrency={selectedCurrency}
        onSelectCurrency={setSelectedCurrency}
      />
    </>
  );
}

// ─── Hero text ────────────────────────────────────────────────────────────────

function HeroFeatures() {
  return (
    <div className="hidden lg:flex lg:flex-row items-center justify-center gap-12 w-full max-w-[982px] mx-auto pt-2">
      {/* Flexible booking */}
      <div className="flex gap-2 sm:gap-3 items-center relative shrink-0">
        <div className="relative shrink-0 size-[24px] sm:size-[28px]" data-name="calendar-03">
          <svg
            className="absolute block inset-0 size-full"
            fill="none"
            height="28"
            preserveAspectRatio="none"
            viewBox="0 0 28 28"
            width="28"
          >
            <g id="calendar-03">
              <path
                d={svgPaths.p316c2d00}
                fill="white"
                id="Vector"
                opacity="0.4"
              />
              <path
                d={svgPaths.p262b6b80}
                id="Vector_2"
                stroke="white"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2.33333"
              />
              <path
                d={svgPaths.p173c12c0}
                id="Vector_3"
                stroke="white"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.75"
              />
              <path
                d={svgPaths.p3de72a80}
                id="Vector_4"
                stroke="white"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.75"
              />
              <path
                d="M3.5 11.6667H24.5"
                id="Vector_5"
                stroke="white"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.75"
              />
            </g>
          </svg>
        </div>
        <p className="font-['Inter_Tight:Medium',sans-serif] text-xs sm:text-sm md:text-base text-center text-white whitespace-nowrap">
          Flexible booking
        </p>
      </div>
      {/* Real time offers */}
      <div className="flex gap-2 sm:gap-3 items-center relative shrink-0">
        <div
          className="relative shrink-0 size-[24px] sm:size-[30px]"
          data-name="time-quarter-02"
        >
          <svg
            className="absolute block inset-0 size-full"
            fill="none"
            height="30"
            preserveAspectRatio="none"
            viewBox="0 0 30 30"
            width="30"
          >
            <g id="time-quarter-02">
              <path
                d={svgPaths.p10ada780}
                fill="white"
                id="Vector"
                opacity="0.4"
              />
              <path
                d="M20 15H15V7.5"
                id="Vector_2"
                stroke="white"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.875"
              />
              <path
                d={svgPaths.p2169c518}
                id="Vector_3"
                stroke="white"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.875"
              />
              <path
                d={svgPaths.p19def00}
                id="Vector_4"
                stroke="white"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.875"
              />
            </g>
          </svg>
        </div>
        <p className="font-['Inter_Tight:Medium',sans-serif] text-xs sm:text-sm md:text-base text-center text-white whitespace-nowrap">
          Real time offers
        </p>
      </div>
      {/* Secure payments */}
      <div className="flex gap-2 sm:gap-3 items-center relative shrink-0">
        <div
          className="relative shrink-0 size-[24px] sm:size-[30px]"
          data-name="credit-card-validation"
        >
          <svg
            className="absolute block inset-0 size-full"
            fill="none"
            height="30"
            preserveAspectRatio="none"
            viewBox="0 0 30 30"
            width="30"
          >
            <g id="credit-card-validation">
              <path
                d={svgPaths.p342a6b00}
                fill="white"
                id="Vector"
                opacity="0.4"
              />
              <path
                d={svgPaths.p21a7f780}
                id="Vector_2"
                stroke="white"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.875"
              />
              <path
                d={svgPaths.p21985400}
                id="Vector_3"
                stroke="white"
                strokeLinecap="round"
                strokeWidth="1.875"
              />
              <path d={svgPaths.p15847600} fill="white" id="Vector_4" />
              <path
                d="M12.5 22.5H14.375"
                id="Vector_5"
                stroke="white"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeMiterlimit="10"
                strokeWidth="1.875"
              />
              <path
                d="M18.125 22.5H22.5"
                id="Vector_6"
                stroke="white"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeMiterlimit="10"
                strokeWidth="1.875"
              />
              <path
                d="M3.125 13.75H12.5"
                id="Vector_7"
                stroke="white"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.875"
              />
            </g>
          </svg>
        </div>
        <p className="font-['Inter_Tight:Medium',sans-serif] text-xs sm:text-sm md:text-base text-center text-white whitespace-nowrap">
          Secure payments
        </p>
      </div>
      {/* Support 24/7 */}
      <div className="flex gap-2 sm:gap-3 items-center relative shrink-0">
        <div
          className="relative shrink-0 size-[24px] sm:size-[30px]"
          data-name="customer-support"
        >
          <svg
            className="absolute block inset-0 size-full"
            fill="none"
            height="30"
            preserveAspectRatio="none"
            viewBox="0 0 30 30"
            width="30"
          >
            <g id="customer-support">
              <path
                d={svgPaths.p34496100}
                fill="white"
                id="Vector"
                opacity="0.4"
              />
              <path
                d={svgPaths.pdb48600}
                fill="white"
                id="Vector_2"
                opacity="0.4"
              />
              <path
                d={svgPaths.p34496100}
                id="Vector_3"
                stroke="white"
                strokeWidth="1.875"
              />
              <path
                d={svgPaths.pdb48600}
                id="Vector_4"
                stroke="white"
                strokeWidth="1.875"
              />
              <path
                d={svgPaths.p14030100}
                id="Vector_5"
                stroke="white"
                strokeLinecap="square"
                strokeLinejoin="round"
                strokeWidth="1.875"
              />
              <path
                d={svgPaths.p12769b00}
                id="Vector_6"
                stroke="white"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.875"
              />
            </g>
          </svg>
        </div>
        <p className="font-['Inter_Tight:Medium',sans-serif] text-xs sm:text-sm md:text-base text-center text-white whitespace-nowrap">
          Support 24/7
        </p>
      </div>
    </div>
  )
}

function HeroText() {
  return (
    <div className="flex flex-col gap-4 sm:gap-5 items-center relative w-full max-w-5xl mx-auto px-4 text-center">
      {/* Eyebrow Pill */}
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white/90 text-xs sm:text-sm font-medium tracking-wide">
        <span>Apartments, gîtes, guest houses · 200+ stays in Tunisia</span>
      </div>

      {/* Headline on 1 single line */}
      <h1 className="font-['Bricolage_Grotesk',sans-serif] font-bold text-xl sm:text-3xl md:text-4xl lg:text-[42px] xl:text-[46px] text-white tracking-tight leading-snug m-0 whitespace-normal lg:whitespace-nowrap max-w-full">
        An easy way to find an unforgettable journey
      </h1>
    </div>
  );
}

// ─── Search tabs ──────────────────────────────────────────────────────────────


// ─── Interactive Search Widget ────────────────────────────────────────────────

function SearchWidget() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"experience" | "location">("experience");
  const [selectedExperience, setSelectedExperience] = useState("Seaside");
  const [selectedLocation, setSelectedLocation] = useState("Hammamet, Tunisia");
  const [checkIn, setCheckIn] = useState("2026-03-21");
  const [checkOut, setCheckOut] = useState("2026-03-28");
  const [guests, setGuests] = useState("2");
  const [isSearching, setIsSearching] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const experienceDetails = [
    {
      name: "Seaside",
      subtitle: "Stay by the sea with beautiful views.",
      icon: BeachIcon,
    },
    {
      name: "Swimming pool",
      subtitle: "Relax with refreshing pool access.",
      icon: SwimmingIcon,
    },
    {
      name: "Urban stays",
      subtitle: "Modern comfort in vibrant city centers.",
      icon: Building01Icon,
    },
    {
      name: "Nature",
      subtitle: "Peaceful stays surrounded by nature.",
      icon: TreesIcon,
    },
    {
      name: "Sahara",
      subtitle: "Unique desert escapes and adventures.",
      icon: MountainIcon,
    },
    {
      name: "Cultural",
      subtitle: "Spacious stays for the whole family.",
      icon: BankIcon,
    },
    {
      name: "Romantics",
      subtitle: "Cozy escapes for couples.",
      icon: FavouriteIcon,
    },
    {
      name: "Historical",
      subtitle: "Charming stays with historic character.",
      icon: BankIcon,
    },
  ];

  const locationDetails = [
    { name: "Hammamet, Tunisia", subtitle: "Famous beach resorts and medina", icon: Location01Icon },
    { name: "Sousse, Tunisia", subtitle: "Pearl of the Sahel coastline", icon: Location01Icon },
    { name: "Djerba, Tunisia", subtitle: "Island paradise with unique architecture", icon: Location01Icon },
    { name: "Tunis & Sidi Bou Said", subtitle: "Historic capital and iconic blue village", icon: Location01Icon },
    { name: "Tabarka & Ain Draham", subtitle: "Lush forests and coral reefs", icon: Location01Icon },
    { name: "Tozeur (Sahara)", subtitle: "Oasis gateway to desert dunes", icon: Location01Icon },
    { name: "Bizerte", subtitle: "Northern coast and old port", icon: Location01Icon },
    { name: "Monastir", subtitle: "Coastal ribat and sandy beaches", icon: Location01Icon },
    { name: "Mahdia", subtitle: "Quiet coastal town and ancient port", icon: Location01Icon },
  ];

  const frequentExperiences = ["Seaside", "Swimming pool", "Sahara", "Nature", "Romantics"];
  const frequentLocations = ["Nabeul", "Sousse", "Djerba", "Ain Draham", "Tozeur"];

  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [datePickerTarget, setDatePickerTarget] = useState<"checkIn" | "checkOut">("checkIn");
  const [calendarYear, setCalendarYear] = useState(2026);
  const [calendarMonth, setCalendarMonth] = useState(2); // March = 2 (0-indexed)
  const datePickerRef = useRef<HTMLDivElement>(null);

  interface RoomConfig {
    id: number;
    adults: number;
    children: number;
    childAges: number[];
  }

  const [rooms, setRooms] = useState<RoomConfig[]>([
    { id: 1, adults: 2, children: 0, childAges: [] }
  ]);
  const [activeRoomIndex, setActiveRoomIndex] = useState(0);
  const [isGuestPickerOpen, setIsGuestPickerOpen] = useState(false);
  const guestPickerRef = useRef<HTMLDivElement>(null);

  const updateAdults = (roomIdx: number, delta: number) => {
    setRooms((prev) =>
      prev.map((r, idx) => {
        if (idx !== roomIdx) return r;
        const newAdults = Math.max(1, r.adults + delta);
        return { ...r, adults: newAdults };
      })
    );
  };

  const updateChildren = (roomIdx: number, delta: number) => {
    setRooms((prev) =>
      prev.map((r, idx) => {
        if (idx !== roomIdx) return r;
        const newChildren = Math.max(0, r.children + delta);
        let newAges = [...r.childAges];
        if (newChildren > r.childAges.length) {
          newAges.push(2);
        } else if (newChildren < r.childAges.length) {
          newAges = newAges.slice(0, newChildren);
        }
        return { ...r, children: newChildren, childAges: newAges };
      })
    );
  };

  const updateChildAge = (roomIdx: number, childIdx: number, age: number) => {
    setRooms((prev) =>
      prev.map((r, idx) => {
        if (idx !== roomIdx) return r;
        const newAges = [...r.childAges];
        newAges[childIdx] = age;
        return { ...r, childAges: newAges };
      })
    );
  };

  const addRoom = () => {
    setRooms((prev) => [
      ...prev,
      { id: Date.now(), adults: 2, children: 0, childAges: [] }
    ]);
    setActiveRoomIndex(rooms.length);
  };

  const removeRoom = (roomIdx: number) => {
    if (rooms.length <= 1) return;
    setRooms((prev) => prev.filter((_, idx) => idx !== roomIdx));
    setActiveRoomIndex(Math.max(0, roomIdx - 1));
  };

  const totalAdults = rooms.reduce((sum, r) => sum + r.adults, 0);
  const totalChildren = rooms.reduce((sum, r) => sum + r.children, 0);
  const totalGuestsCount = totalAdults + totalChildren;

  const guestSummaryLabel = `${totalGuestsCount} guest${totalGuestsCount !== 1 ? "s" : ""}${
    rooms.length > 1 ? `, ${rooms.length} rooms` : ""
  }`;

  const searchWidgetRef = useRef<HTMLDivElement>(null);

  // Auto-scroll adaptation: when any dropdown/popover opens, smoothly scroll the page if needed so it is 100% visible with comfortable space
  const ensureDropdownSpace = (popoverHeight = 420) => {
    if (typeof window === "undefined") return;
    setTimeout(() => {
      const el = searchWidgetRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const requiredBottom = rect.bottom + popoverHeight + 36; // 36px space below popover

      if (requiredBottom > viewportHeight) {
        const scrollDelta = requiredBottom - viewportHeight;
        window.scrollBy({
          top: scrollDelta,
          behavior: "smooth",
        });
      } else if (rect.top < 85) {
        // If the top of the search widget is hidden under navbar
        window.scrollBy({
          top: rect.top - 95,
          behavior: "smooth",
        });
      }
    }, 50);
  };

  useEffect(() => {
    if (isDropdownOpen) {
      ensureDropdownSpace(380);
    } else if (isDatePickerOpen) {
      ensureDropdownSpace(460);
    } else if (isGuestPickerOpen) {
      ensureDropdownSpace(420);
    }
  }, [isDropdownOpen, isDatePickerOpen, isGuestPickerOpen]);

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
      if (datePickerRef.current && !datePickerRef.current.contains(event.target as Node)) {
        setIsDatePickerOpen(false);
      }
      if (guestPickerRef.current && !guestPickerRef.current.contains(event.target as Node)) {
        setIsGuestPickerOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const formatDateForInput = (d: Date) => {
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const formatDateLabel = (dateStr: string) => {
    if (!dateStr) return "Select date";
    const parts = dateStr.split("-").map(Number);
    if (parts.length < 3) return dateStr;
    const date = new Date(parts[0], parts[1] - 1, parts[2]);
    return date.toLocaleDateString("en-US", { weekday: "short", day: "numeric", month: "short" });
  };

  const calculateNights = (startStr: string, endStr: string) => {
    if (!startStr || !endStr) return 0;
    const sParts = startStr.split("-").map(Number);
    const eParts = endStr.split("-").map(Number);
    if (sParts.length < 3 || eParts.length < 3) return 0;
    const start = new Date(sParts[0], sParts[1] - 1, sParts[2]);
    const end = new Date(eParts[0], eParts[1] - 1, eParts[2]);
    const diffDays = Math.ceil((end.getTime() - start.getTime()) / (1000 * 3600 * 24));
    return diffDays > 0 ? diffDays : 0;
  };

  const handleDateSelect = (year: number, monthIndex: number, dayNum: number) => {
    const selectedStr = `${year}-${String(monthIndex + 1).padStart(2, "0")}-${String(dayNum).padStart(2, "0")}`;
    if (datePickerTarget === "checkIn") {
      setCheckIn(selectedStr);
      if (selectedStr >= checkOut) {
        const nextDate = new Date(year, monthIndex, dayNum + 7);
        setCheckOut(formatDateForInput(nextDate));
      }
      setDatePickerTarget("checkOut");
    } else {
      if (selectedStr <= checkIn) {
        setCheckIn(selectedStr);
        setDatePickerTarget("checkOut");
      } else {
        setCheckOut(selectedStr);
      }
    }
  };

  const renderMonthGrid = (year: number, monthIndex: number) => {
    const monthNames = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
    let firstDayIndex = new Date(year, monthIndex, 1).getDay() - 1;
    if (firstDayIndex === -1) firstDayIndex = 6;

    const cells: (number | null)[] = [];
    for (let i = 0; i < firstDayIndex; i++) cells.push(null);
    for (let d = 1; d <= daysInMonth; d++) cells.push(d);

    return (
      <div key={`${year}-${monthIndex}`} className="flex-1 min-w-[260px] max-w-[300px] sm:max-w-none shrink-0 snap-center">
        <div className="text-center font-bold text-gray-900 text-sm mb-3">
          {monthNames[monthIndex]} {year}
        </div>
        <div className="grid grid-cols-7 gap-1 text-center mb-1">
          {["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"].map((dayName) => (
            <span key={dayName} className="text-xs font-semibold text-gray-400 py-1">
              {dayName}
            </span>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-y-1 text-center">
          {cells.map((day, idx) => {
            if (day === null) {
              return <div key={`empty-${idx}`} className="h-8" />;
            }
            const cellDateStr = `${year}-${String(monthIndex + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
            const isCheckIn = cellDateStr === checkIn;
            const isCheckOut = cellDateStr === checkOut;
            const isInRange = cellDateStr > checkIn && cellDateStr < checkOut;

            return (
              <button
                key={`day-${day}`}
                type="button"
                onClick={() => handleDateSelect(year, monthIndex, day)}
                className={`h-8 text-xs font-bold transition-all cursor-pointer flex items-center justify-center border-none ${
                  isCheckIn
                    ? "bg-[#547fee] text-white rounded-l-full rounded-r-none"
                    : isCheckOut
                    ? "bg-[#547fee] text-white rounded-r-full rounded-l-none"
                    : isInRange
                    ? "bg-[#547fee]/15 text-gray-900 rounded-none"
                    : "hover:bg-gray-100 text-gray-700 rounded-full"
                } ${isCheckIn && isCheckOut ? "rounded-full" : ""}`}
              >
                {day}
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  const normalizeExperienceToCategory = (exp: string): string => {
    if (!exp) return "pool";
    const lower = exp.toLowerCase().trim();
    if (lower.includes("pool") || lower.includes("piscine")) return "pool";
    if (lower.includes("sea") || lower.includes("mer") || lower.includes("plage") || lower.includes("beach") || lower.includes("bord")) return "seaside";
    if (lower.includes("sahara") || lower.includes("desert") || lower.includes("désert")) return "sahara";
    if (lower.includes("nature") || lower.includes("campagne") || lower.includes("forest")) return "nature";
    if (lower.includes("romantic") || lower.includes("romantique") || lower.includes("couple")) return "romantics";
    if (lower.includes("urban") || lower.includes("ville") || lower.includes("city")) return "urban";
    if (lower.includes("family") || lower.includes("famille")) return "family";
    if (lower.includes("hist") || lower.includes("medina") || lower.includes("médina") || lower.includes("cultural") || lower.includes("culture")) return "historical";
    return lower;
  };

  const handleSearch = () => {
    setIsSearching(true);
    const targetVal = activeTab === "experience" ? selectedExperience : selectedLocation;
    const categoryId = activeTab === "experience" ? normalizeExperienceToCategory(selectedExperience) : "";
    
    const params = new URLSearchParams({
      query: targetVal,
      tab: activeTab,
      ...(activeTab === "experience" && categoryId ? { category: categoryId, experience: selectedExperience } : {}),
      ...(activeTab === "location" ? { location: selectedLocation } : {}),
      checkIn,
      checkOut,
      guests: String(totalGuestsCount),
    });

    setTimeout(() => {
      setIsSearching(false);
      router.push(`/search?${params.toString()}`);
    }, 300);
  };

  const selectFrequentItem = (item: string) => {
    if (activeTab === "experience") {
      setSelectedExperience(item);
    } else {
      setSelectedLocation(item.includes("Tunisia") ? item : item + ", Tunisia");
    }
  };

  const frequentItems = activeTab === "experience" ? frequentExperiences : frequentLocations;

  return (
    <div ref={searchWidgetRef} className="flex flex-col items-start relative shrink-0 w-full max-w-[1280px] mx-auto">

      {/* Top Tabs */}
      <div className="backdrop-blur-[4px] bg-white/50 flex items-center p-1.5 pb-0 relative rounded-t-[20px] shrink-0 self-start z-10">
        <div className="flex items-center relative w-full gap-1">
          {/* Experience Tab */}
          <button
            type="button"
            onClick={() => {
              setActiveTab("experience");
              setIsDropdownOpen(false);
            }}
            className="relative h-[40px] px-5 rounded-[14px] text-sm font-semibold cursor-pointer border-none bg-transparent transition-colors z-10 flex items-center justify-center min-w-[140px]"
          >
            {activeTab === "experience" && (
              <motion.div
                layoutId="searchTabPill"
                className="absolute inset-0 bg-[#547fee] rounded-[14px]"
                transition={{ type: "spring", stiffness: 400, damping: 32 }}
              />
            )}
            <span className={`relative z-20 font-semibold transition-colors ${activeTab === "experience" ? "text-white font-bold" : "text-white hover:text-white/90"}`}>
              By Experience
            </span>
          </button>

          {/* Location Tab */}
          <button
            type="button"
            onClick={() => {
              setActiveTab("location");
              setIsDropdownOpen(false);
            }}
            className="relative h-[40px] px-5 rounded-[14px] text-sm font-semibold cursor-pointer border-none bg-transparent transition-colors z-10 flex items-center justify-center min-w-[140px]"
          >
            {activeTab === "location" && (
              <motion.div
                layoutId="searchTabPill"
                className="absolute inset-0 bg-[#547fee] rounded-[14px]"
                transition={{ type: "spring", stiffness: 400, damping: 32 }}
              />
            )}
            <span className={`relative z-20 font-semibold transition-colors ${activeTab === "location" ? "text-white font-bold" : "text-white hover:text-white/90"}`}>
              By Location
            </span>
          </button>
        </div>

        {/* Continuous inner curve merging switcher container with outer search widget container */}
        <div 
          className="absolute left-full bottom-0 w-5 h-5 bg-white/50 dark:bg-slate-900/60 backdrop-blur-[4px] pointer-events-none"
          style={{
            maskImage: "radial-gradient(circle at 100% 0%, transparent 19.5px, black 20px)",
            WebkitMaskImage: "radial-gradient(circle at 100% 0%, transparent 19.5px, black 20px)",
          }}
        />
      </div>

      {/* Main Search Bar Card */}
      <div className="backdrop-blur-[4px] bg-white/50 dark:bg-slate-900/60 p-1.5 relative rounded-b-[20px] rounded-tr-[20px] rounded-tl-none shrink-0 w-full shadow-xl z-30 transition-colors duration-300">
        <div className="bg-white dark:bg-[#121a30] rounded-[16px] p-1.5 flex flex-col gap-2 shadow-inner w-full lg:flex-row lg:items-stretch transition-colors duration-300">
          
          {/* First Field: Experience or Location (Custom Dropdown Popover) */}
          <div 
            ref={dropdownRef}
            onClick={() => {
              setIsDropdownOpen(!isDropdownOpen);
              setIsDatePickerOpen(false);
              setIsGuestPickerOpen(false);
            }}
            className={`w-full bg-gray-50/80 hover:bg-gray-100/80 dark:bg-[#0e162b] dark:hover:bg-[#16203a] transition-colors rounded-xl p-2.5 flex items-center gap-2.5 border border-gray-100 dark:border-slate-800 relative cursor-pointer select-none lg:flex-1 ${
              isDropdownOpen ? "z-40" : "z-10"
            }`}
          >
            <div className="w-9 h-9 rounded-lg bg-[#547fee]/10 flex items-center justify-center shrink-0 text-[#547fee]">
              {activeTab === "experience" ? (
                <HugeiconsIcon icon={House01Icon} size={18} className="w-4.5 h-4.5" />
              ) : (
                <HugeiconsIcon icon={Location01Icon} size={18} className="w-4.5 h-4.5" />
              )}
            </div>

            <div className="flex-1 min-w-0 relative">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.2 }}
                  className="flex flex-col"
                >
                  <label className="text-[11px] font-semibold text-gray-400 dark:text-slate-400 uppercase tracking-wider cursor-pointer">
                    {activeTab === "experience" ? "What experience?" : "Where to?"}
                  </label>
                  <span className="font-bold text-gray-900 dark:text-white text-sm truncate">
                    {activeTab === "experience" ? selectedExperience : selectedLocation}
                  </span>
                </motion.div>
              </AnimatePresence>
            </div>
            <div className={`transition-transform duration-200 text-gray-400 ${isDropdownOpen ? "rotate-180 text-[#547fee]" : ""}`}>
              <HugeiconsIcon icon={ArrowDown01Icon} size={14} />
            </div>

            {/* Desktop Floating Popover (lg: 1024px+) */}
            <AnimatePresence>
              {isDropdownOpen && (
                <motion.div
                  key="exp-desktop-popover"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.2 }}
                  className="hidden lg:block absolute top-[calc(100%+8px)] left-0 w-[360px] max-h-[360px] rounded-2xl shadow-2xl bg-white dark:bg-[#121a30] border border-gray-100/90 dark:border-slate-800 p-2.5 z-50 overflow-y-auto space-y-1"
                >
                  {(activeTab === "experience" ? experienceDetails : locationDetails).map((item) => {
                    const isSelected = activeTab === "experience" 
                      ? selectedExperience === item.name 
                      : selectedLocation === item.name;
                    const IconComponent = item.icon;
                    return (
                      <div
                        key={item.name}
                        onClick={(e) => {
                          e.stopPropagation();
                          if (activeTab === "experience") {
                            setSelectedExperience(item.name);
                          } else {
                            setSelectedLocation(item.name);
                          }
                          setIsDropdownOpen(false);
                        }}
                        className={`flex items-center justify-between gap-3.5 p-2.5 rounded-xl transition-all cursor-pointer ${
                          isSelected ? "bg-[#547fee]/10 dark:bg-[#547fee]/20 text-[#547fee]" : "hover:bg-gray-50 dark:hover:bg-[#16203a] text-gray-900 dark:text-white"
                        }`}
                      >
                        <div className="flex items-center gap-3.5 min-w-0">
                          <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${
                            isSelected ? "bg-[#547fee] text-white" : "bg-[#547fee]/10 text-[#547fee]"
                          }`}>
                            <HugeiconsIcon icon={IconComponent} size={22} />
                          </div>
                          <div className="flex flex-col min-w-0">
                            <span className="font-bold text-sm text-gray-900 dark:text-white truncate">{item.name}</span>
                            <span className="text-xs text-gray-500 dark:text-slate-400 font-medium truncate">{item.subtitle}</span>
                          </div>
                        </div>
                        {isSelected && (
                          <div className="size-6 rounded-full bg-[#547fee] flex items-center justify-center text-white shrink-0">
                            <HugeiconsIcon icon={Tick01Icon} size={14} />
                          </div>
                        )}
                      </div>
                    );
                  })}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Mobile Bottom Sheet (< lg: 1024px) Portalled to document.body */}
            {isClient && createPortal(
              <AnimatePresence>
                {isDropdownOpen && (
                  <div key="exp-mobile-wrapper" className="lg:hidden">
                    <motion.div
                      key="exp-mobile-backdrop"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsDropdownOpen(false);
                      }}
                      className="fixed inset-0 bg-black/60 backdrop-blur-xs z-[190]"
                    />
                    <motion.div
                      key="exp-mobile-sheet"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 20 }}
                      transition={{ duration: 0.2 }}
                      className="fixed inset-x-0 bottom-0 z-[200] bg-white dark:bg-[#121a30] rounded-t-[28px] p-5 shadow-2xl max-h-[85vh] overflow-y-auto space-y-2"
                    >
                      <div className="w-12 h-1.5 bg-gray-300 dark:bg-slate-700 rounded-full mx-auto mb-3" />
                      <div className="flex items-center justify-between pb-3 mb-2 border-b border-gray-100 dark:border-slate-800">
                        <span className="font-bold text-base text-gray-900 dark:text-white">
                          {activeTab === "experience" ? "Select Experience" : "Select Location"}
                        </span>
                        <button
                          type="button"
                          onClick={() => setIsDropdownOpen(false)}
                          className="size-8 rounded-full bg-gray-100 dark:bg-slate-800 flex items-center justify-center text-gray-500 dark:text-slate-400 hover:bg-gray-200 dark:hover:bg-slate-700 border-none cursor-pointer"
                        >
                          <HugeiconsIcon icon={Cancel01Icon} size={18} />
                        </button>
                      </div>

                      {(activeTab === "experience" ? experienceDetails : locationDetails).map((item) => {
                        const isSelected = activeTab === "experience" 
                          ? selectedExperience === item.name 
                          : selectedLocation === item.name;
                        const IconComponent = item.icon;
                        return (
                          <div
                            key={item.name}
                            onClick={(e) => {
                              e.stopPropagation();
                              if (activeTab === "experience") {
                                setSelectedExperience(item.name);
                              } else {
                                setSelectedLocation(item.name);
                              }
                              setIsDropdownOpen(false);
                            }}
                            className={`flex items-center justify-between gap-3.5 p-3 rounded-xl transition-all cursor-pointer ${
                              isSelected ? "bg-[#547fee]/10 dark:bg-[#547fee]/20 text-[#547fee] border border-[#547fee]/30" : "hover:bg-gray-50 dark:hover:bg-[#16203a] text-gray-900 dark:text-white border border-transparent"
                            }`}
                          >
                            <div className="flex items-center gap-3.5 min-w-0">
                              <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${
                                isSelected ? "bg-[#547fee] text-white" : "bg-[#547fee]/10 text-[#547fee]"
                              }`}>
                                <HugeiconsIcon icon={IconComponent} size={22} />
                              </div>
                              <div className="flex flex-col min-w-0">
                                <span className="font-bold text-sm text-gray-900 dark:text-white truncate">{item.name}</span>
                                <span className="text-xs text-gray-500 dark:text-slate-400 font-medium truncate">{item.subtitle}</span>
                              </div>
                            </div>
                            {isSelected && (
                              <div className="size-6 rounded-full bg-[#547fee] flex items-center justify-center text-white shrink-0">
                                <HugeiconsIcon icon={Tick01Icon} size={14} />
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </motion.div>
                  </div>
                )}
              </AnimatePresence>,
              document.body
            )}
          </div>

          {/* Tablet Middle Container: Dates & Guests side-by-side on sm/md, unrolled on lg */}
          <div className="flex flex-col sm:flex-row gap-2 w-full lg:contents">
            {/* Merged Dates Field (Check In & Check Out) with Date Range Popover */}
            <div ref={datePickerRef} className={`relative self-stretch w-full sm:flex-1 lg:flex-[1.2] ${isDatePickerOpen ? "z-40" : "z-10"}`}>
              <div 
                className="w-full bg-gray-50/80 hover:bg-gray-100/80 dark:bg-[#0e162b] dark:hover:bg-[#16203a] transition-colors rounded-xl p-3 px-3.5 flex items-center gap-3 border border-gray-100 dark:border-slate-800 relative self-stretch cursor-pointer select-none h-full"
              >
                <div className="w-9 h-9 rounded-lg bg-[#547fee]/10 flex items-center justify-center shrink-0 text-[#547fee]">
                  <HugeiconsIcon icon={Calendar03Icon} size={20} className="w-5 h-5" />
                </div>

                {/* Check In Segment */}
                <div 
                  onClick={() => {
                    setIsDatePickerOpen(true);
                    setDatePickerTarget("checkIn");
                    setIsDropdownOpen(false);
                    setIsGuestPickerOpen(false);
                  }}
                  className="flex flex-col min-w-0 flex-1 hover:opacity-80 transition-opacity"
                >
                  <span className="text-[11px] font-semibold text-gray-400 dark:text-slate-400 uppercase tracking-wider">Check In</span>
                  <span className="font-bold text-gray-900 dark:text-white text-sm truncate">{formatDateLabel(checkIn)}</span>
                </div>

                {/* Divider */}
                <div className="h-7 w-px bg-gray-200/80 dark:bg-slate-700 shrink-0 mx-0.5" />

                {/* Check Out Segment */}
                <div 
                  onClick={() => {
                    setIsDatePickerOpen(true);
                    setDatePickerTarget("checkOut");
                    setIsDropdownOpen(false);
                    setIsGuestPickerOpen(false);
                  }}
                  className="flex flex-col min-w-0 flex-1 hover:opacity-80 transition-opacity"
                >
                  <span className="text-[11px] font-semibold text-gray-400 dark:text-slate-400 uppercase tracking-wider">Check Out</span>
                  <span className="font-bold text-gray-900 dark:text-white text-sm truncate">{formatDateLabel(checkOut)}</span>
                </div>
              </div>

              {/* Desktop Floating Calendar Popover (lg: 1024px+) */}
              <AnimatePresence>
                {isDatePickerOpen && (
                  <motion.div
                    key="date-desktop-popover"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                    className="hidden lg:block absolute top-[calc(100%+8px)] left-1/2 -translate-x-1/2 rounded-2xl shadow-2xl bg-white dark:bg-[#121a30] border border-gray-100/90 dark:border-slate-800 p-5 w-[92vw] max-w-[620px] z-50 space-y-4"
                  >
                    {/* Top Summary Bar */}
                    <div className="flex items-center gap-2 sm:gap-3 bg-gray-50/60 dark:bg-[#0e162b] p-2 rounded-xl border border-gray-100 dark:border-slate-800 relative">
                      <div
                        onClick={() => setDatePickerTarget("checkIn")}
                        className={`flex-1 p-2.5 rounded-lg cursor-pointer transition-all ${
                          datePickerTarget === "checkIn"
                            ? "bg-white dark:bg-[#16203a] border border-[#547fee] shadow-xs"
                            : "hover:bg-white/60 dark:hover:bg-white/10"
                        }`}
                      >
                        <span className="text-[10px] font-semibold text-gray-400 dark:text-slate-400 uppercase tracking-wider block">Check-In</span>
                        <span className="text-xs font-bold text-gray-900 dark:text-white">{formatDateLabel(checkIn)}</span>
                      </div>

                      <div className="bg-white dark:bg-[#16203a] border border-blue-200/80 dark:border-slate-700 shadow-xs rounded-full px-3 py-1.5 text-xs font-bold text-gray-700 dark:text-slate-200 flex items-center gap-1.5 shrink-0">
                        <span>🌙</span>
                        <span>{calculateNights(checkIn, checkOut)} nights</span>
                      </div>

                      <div
                        onClick={() => setDatePickerTarget("checkOut")}
                        className={`flex-1 p-2.5 rounded-lg cursor-pointer transition-all ${
                          datePickerTarget === "checkOut"
                            ? "bg-white dark:bg-[#16203a] border border-[#547fee] shadow-xs"
                            : "hover:bg-white/60 dark:hover:bg-white/10"
                        }`}
                      >
                        <span className="text-[10px] font-semibold text-gray-400 dark:text-slate-400 uppercase tracking-wider block">Check-Out</span>
                        <span className="text-xs font-bold text-gray-900 dark:text-white">{formatDateLabel(checkOut)}</span>
                      </div>
                    </div>

                    {/* Dual Calendar Month Grids */}
                    <div className="relative">
                      <div className="flex items-center justify-between absolute top-0 inset-x-0 z-10 px-1">
                        <button
                          type="button"
                          onClick={() => {
                            if (calendarMonth === 0) {
                              setCalendarMonth(11);
                              setCalendarYear(calendarYear - 1);
                            } else {
                              setCalendarMonth(calendarMonth - 1);
                            }
                          }}
                          className="w-7 h-7 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800 flex items-center justify-center text-gray-600 dark:text-slate-300 transition-colors cursor-pointer border-none"
                        >
                          <HugeiconsIcon icon={ArrowLeft01Icon} size={16} />
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            if (calendarMonth === 11) {
                              setCalendarMonth(0);
                              setCalendarYear(calendarYear + 1);
                            } else {
                              setCalendarMonth(calendarMonth + 1);
                            }
                          }}
                          className="w-7 h-7 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800 flex items-center justify-center text-gray-600 dark:text-slate-300 transition-colors cursor-pointer border-none"
                        >
                          <HugeiconsIcon icon={ArrowRight01Icon} size={16} />
                        </button>
                      </div>

                      <div className="flex flex-row gap-6 pt-1">
                        {renderMonthGrid(calendarYear, calendarMonth)}
                        {renderMonthGrid(
                          calendarMonth === 11 ? calendarYear + 1 : calendarYear,
                          calendarMonth === 11 ? 0 : calendarMonth + 1
                        )}
                      </div>
                    </div>

                    {/* Bottom Action Bar */}
                    <div className="pt-3 border-t border-gray-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => {
                            const today = new Date();
                            const tomorrow = new Date(today);
                            tomorrow.setDate(today.getDate() + 1);
                            setCheckIn(formatDateForInput(today));
                            setCheckOut(formatDateForInput(tomorrow));
                          }}
                          className="px-3 py-1.5 rounded-lg border border-gray-200 dark:border-slate-700 text-xs font-semibold text-gray-700 dark:text-slate-300 hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                        >
                          Stay tonight
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            const today = new Date();
                            const tomorrow = new Date(today);
                            tomorrow.setDate(today.getDate() + 1);
                            const dayAfter = new Date(today);
                            dayAfter.setDate(today.getDate() + 2);
                            setCheckIn(formatDateForInput(tomorrow));
                            setCheckOut(formatDateForInput(dayAfter));
                          }}
                          className="px-3 py-1.5 rounded-lg border border-gray-200 dark:border-slate-700 text-xs font-semibold text-gray-700 dark:text-slate-300 hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                        >
                          Stay tomorrow
                        </button>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          setIsDatePickerOpen(false);
                          setIsGuestPickerOpen(true);
                        }}
                        className="px-6 py-2 bg-[#547fee] hover:bg-[#436cd9] text-white text-xs font-bold rounded-xl transition-colors cursor-pointer border-none"
                      >
                        Confirm
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Mobile Bottom Sheet (< lg: 1024px) Portalled to document.body */}
              {isClient && createPortal(
                <AnimatePresence>
                  {isDatePickerOpen && (
                    <div key="date-mobile-wrapper" className="lg:hidden">
                      <motion.div
                        key="date-mobile-backdrop"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={(e) => {
                          e.stopPropagation();
                          setIsDatePickerOpen(false);
                        }}
                        className="fixed inset-0 bg-black/60 backdrop-blur-xs z-[190]"
                      />
                      <motion.div
                        key="date-mobile-sheet"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        transition={{ duration: 0.2 }}
                        className="fixed inset-x-0 bottom-0 z-[200] bg-white dark:bg-[#121a30] rounded-t-[28px] p-5 shadow-2xl max-h-[90vh] overflow-y-auto space-y-4"
                      >
                        <div className="w-12 h-1.5 bg-gray-300 dark:bg-slate-700 rounded-full mx-auto mb-3" />
                        <div className="flex items-center justify-between pb-3 mb-2 border-b border-gray-100 dark:border-slate-800">
                          <span className="font-bold text-base text-gray-900 dark:text-white">Select Travel Dates</span>
                          <button
                            type="button"
                            onClick={() => setIsDatePickerOpen(false)}
                            className="size-8 rounded-full bg-gray-100 dark:bg-slate-800 flex items-center justify-center text-gray-500 dark:text-slate-400 hover:bg-gray-200 dark:hover:bg-slate-700 border-none cursor-pointer"
                          >
                            <HugeiconsIcon icon={Cancel01Icon} size={18} />
                          </button>
                        </div>

                        {/* Top Summary Bar */}
                        <div className="flex items-center gap-2 sm:gap-3 bg-gray-50/60 dark:bg-[#0e162b] p-2 rounded-xl border border-gray-100 dark:border-slate-800 relative">
                          <div
                            onClick={() => setDatePickerTarget("checkIn")}
                            className={`flex-1 p-2.5 rounded-lg cursor-pointer transition-all ${
                              datePickerTarget === "checkIn"
                                ? "bg-white dark:bg-[#16203a] border border-[#547fee] shadow-xs"
                                : "hover:bg-white/60 dark:hover:bg-white/10"
                            }`}
                          >
                            <span className="text-[10px] font-semibold text-gray-400 dark:text-slate-400 uppercase tracking-wider block">Check-In</span>
                            <span className="text-xs font-bold text-gray-900 dark:text-white">{formatDateLabel(checkIn)}</span>
                          </div>

                          <div className="bg-white dark:bg-[#16203a] border border-blue-200/80 dark:border-slate-700 shadow-xs rounded-full px-3 py-1.5 text-xs font-bold text-gray-700 dark:text-slate-200 flex items-center gap-1.5 shrink-0">
                            <span>🌙</span>
                            <span>{calculateNights(checkIn, checkOut)} nights</span>
                          </div>

                          <div
                            onClick={() => setDatePickerTarget("checkOut")}
                            className={`flex-1 p-2.5 rounded-lg cursor-pointer transition-all ${
                              datePickerTarget === "checkOut"
                                ? "bg-white dark:bg-[#16203a] border border-[#547fee] shadow-xs"
                                : "hover:bg-white/60 dark:hover:bg-white/10"
                            }`}
                          >
                            <span className="text-[10px] font-semibold text-gray-400 dark:text-slate-400 uppercase tracking-wider block">Check-Out</span>
                            <span className="text-xs font-bold text-gray-900 dark:text-white">{formatDateLabel(checkOut)}</span>
                          </div>
                        </div>

                        {/* Dual Calendar Month Grids */}
                        <div className="relative">
                          <div className="flex items-center justify-between absolute top-0 inset-x-0 z-10 px-1">
                            <button
                              type="button"
                              onClick={() => {
                                if (calendarMonth === 0) {
                                  setCalendarMonth(11);
                                  setCalendarYear(calendarYear - 1);
                                } else {
                                  setCalendarMonth(calendarMonth - 1);
                                }
                              }}
                              className="w-7 h-7 rounded-lg hover:bg-gray-100 flex items-center justify-center text-gray-600 transition-colors cursor-pointer border-none"
                            >
                              <HugeiconsIcon icon={ArrowLeft01Icon} size={16} />
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                if (calendarMonth === 11) {
                                  setCalendarMonth(0);
                                  setCalendarYear(calendarYear + 1);
                                } else {
                                  setCalendarMonth(calendarMonth + 1);
                                }
                              }}
                              className="w-7 h-7 rounded-lg hover:bg-gray-100 flex items-center justify-center text-gray-600 transition-colors cursor-pointer border-none"
                            >
                              <HugeiconsIcon icon={ArrowRight01Icon} size={16} />
                            </button>
                          </div>

                      <div className="flex flex-row gap-4 sm:gap-6 pt-1 overflow-x-auto pb-2 scrollbar-none snap-x snap-mandatory">
                        {renderMonthGrid(calendarYear, calendarMonth)}
                        {renderMonthGrid(
                          calendarMonth === 11 ? calendarYear + 1 : calendarYear,
                          calendarMonth === 11 ? 0 : calendarMonth + 1
                        )}
                      </div>
                        </div>

                        {/* Bottom Action Bar */}
                        <div className="pt-3 border-t border-gray-100 flex flex-wrap items-center justify-between gap-2">
                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() => {
                                const today = new Date();
                                const tomorrow = new Date(today);
                                tomorrow.setDate(today.getDate() + 1);
                                setCheckIn(formatDateForInput(today));
                                setCheckOut(formatDateForInput(tomorrow));
                              }}
                              className="px-3 py-1.5 rounded-lg border border-gray-200 text-xs font-semibold text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
                            >
                              Stay tonight
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                const today = new Date();
                                const tomorrow = new Date(today);
                                tomorrow.setDate(today.getDate() + 1);
                                const dayAfter = new Date(today);
                                dayAfter.setDate(today.getDate() + 2);
                                setCheckIn(formatDateForInput(tomorrow));
                                setCheckOut(formatDateForInput(dayAfter));
                              }}
                              className="px-3 py-1.5 rounded-lg border border-gray-200 text-xs font-semibold text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
                            >
                              Stay tomorrow
                            </button>
                          </div>
                          <button
                            type="button"
                            onClick={() => {
                              setIsDatePickerOpen(false);
                              setIsGuestPickerOpen(true);
                            }}
                            className="px-6 py-2 bg-[#547fee] hover:bg-[#436cd9] text-white text-xs font-bold rounded-xl transition-colors cursor-pointer border-none"
                          >
                            Confirm
                          </button>
                        </div>
                      </motion.div>
                    </div>
                  )}
                </AnimatePresence>,
                document.body
              )}
            </div>

            {/* Guest Field Container */}
            <div ref={guestPickerRef} className={`relative self-stretch w-full sm:w-[180px] lg:w-[155px] ${isGuestPickerOpen ? "z-40" : "z-10"}`}>
              <div 
                onClick={() => {
                  setIsGuestPickerOpen(!isGuestPickerOpen);
                  setIsDropdownOpen(false);
                  setIsDatePickerOpen(false);
                }}
                className="w-full bg-gray-50/80 hover:bg-gray-100/80 dark:bg-[#0e162b] dark:hover:bg-[#16203a] transition-colors rounded-xl p-2.5 flex items-center gap-2 border border-gray-100 dark:border-slate-800 relative self-stretch cursor-pointer select-none h-full"
              >
                <div className="w-8 h-8 rounded-lg bg-[#547fee]/10 flex items-center justify-center shrink-0 text-[#547fee]">
                  <HugeiconsIcon icon={UserGroupIcon} size={18} className="w-4.5 h-4.5" />
                </div>
                <div className="flex flex-col min-w-0 flex-1">
                  <span className="text-[11px] font-semibold text-gray-400 dark:text-slate-400 uppercase tracking-wider">Guests</span>
                  <span className="font-bold text-gray-900 dark:text-white text-xs truncate">{guestSummaryLabel}</span>
                </div>
                <div className={`transition-transform duration-200 text-gray-400 ${isGuestPickerOpen ? "rotate-180 text-[#547fee]" : ""}`}>
                  <HugeiconsIcon icon={ArrowDown01Icon} size={14} />
                </div>
              </div>

              {/* Desktop Floating Guests Popover (lg: 1024px+) */}
              <AnimatePresence>
                {isGuestPickerOpen && (
                  <motion.div
                    key="guest-desktop-popover"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                    className="hidden lg:block absolute top-[calc(100%+8px)] right-0 w-[360px] max-h-[480px] rounded-2xl shadow-2xl bg-white dark:bg-[#121a30] border border-gray-100/90 dark:border-slate-800 p-5 z-50 overflow-y-auto space-y-4"
                  >
                    <div className="flex items-center justify-between pb-3 border-b border-gray-100 dark:border-slate-800">
                      <span className="text-base font-bold text-gray-900 dark:text-white">
                        Guests & Rooms
                      </span>
                    </div>

                    <div className="space-y-3">
                      {rooms.map((room, rIdx) => {
                        const isExpanded = rIdx === activeRoomIndex;
                        return (
                          <div
                            key={room.id}
                            onClick={() => setActiveRoomIndex(rIdx)}
                            className={`border rounded-2xl p-3.5 space-y-3 transition-all ${
                              isExpanded
                                ? "border-[#547fee] bg-white dark:bg-[#16203a] shadow-xs"
                                : "border-gray-200/80 dark:border-slate-800 bg-gray-50/50 dark:bg-[#0e162b] hover:bg-gray-50 dark:hover:bg-[#16203a] cursor-pointer"
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <span className="font-bold text-sm text-gray-900 dark:text-white">Room {rIdx + 1}</span>
                                <span className="text-xs text-gray-400 font-medium">
                                  {room.adults} adult{room.adults > 1 ? "s" : ""}, {room.children} child{room.children !== 1 ? "ren" : ""}
                                </span>
                              </div>
                              {rooms.length > 1 && (
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    removeRoom(rIdx);
                                  }}
                                  className="text-gray-400 hover:text-red-500 transition-colors p-1 rounded-lg border-none bg-transparent cursor-pointer"
                                  title="Remove Room"
                                >
                                  <HugeiconsIcon icon={Delete02Icon} size={18} />
                                </button>
                              )}
                            </div>

                            {isExpanded && (
                              <div className="pt-2 border-t border-gray-100 dark:border-slate-800 space-y-3">
                                <div className="flex items-center justify-between">
                                  <div className="flex flex-col">
                                    <span className="text-sm font-bold text-gray-900 dark:text-white">Adults</span>
                                    <span className="text-xs text-gray-400 font-medium">12+ years</span>
                                  </div>
                                  <div className="flex items-center gap-3">
                                    <button
                                      type="button"
                                      disabled={room.adults <= 1}
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        updateAdults(rIdx, -1);
                                      }}
                                      className="text-[#547fee] disabled:text-gray-300 dark:disabled:text-slate-600 transition-colors cursor-pointer disabled:cursor-not-allowed border-none bg-transparent"
                                    >
                                      <HugeiconsIcon icon={RemoveCircleIcon} size={24} />
                                    </button>
                                    <span className="text-sm font-bold text-gray-900 dark:text-white w-4 text-center">{room.adults}</span>
                                    <button
                                      type="button"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        updateAdults(rIdx, 1);
                                      }}
                                      className="text-[#547fee] transition-colors cursor-pointer border-none bg-transparent"
                                    >
                                      <HugeiconsIcon icon={AddCircleIcon} size={24} />
                                    </button>
                                  </div>
                                </div>

                                <div className="flex items-center justify-between">
                                  <div className="flex flex-col">
                                    <span className="text-sm font-bold text-gray-900 dark:text-white">Children</span>
                                    <span className="text-xs text-gray-400 font-medium">2-11 years</span>
                                  </div>
                                  <div className="flex items-center gap-3">
                                    <button
                                      type="button"
                                      disabled={room.children <= 0}
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        updateChildren(rIdx, -1);
                                      }}
                                      className="text-[#547fee] disabled:text-gray-300 dark:disabled:text-slate-600 transition-colors cursor-pointer disabled:cursor-not-allowed border-none bg-transparent"
                                    >
                                      <HugeiconsIcon icon={RemoveCircleIcon} size={24} />
                                    </button>
                                    <span className="text-sm font-bold text-gray-900 dark:text-white w-4 text-center">{room.children}</span>
                                    <button
                                      type="button"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        updateChildren(rIdx, 1);
                                      }}
                                      className="text-[#547fee] transition-colors cursor-pointer border-none bg-transparent"
                                    >
                                      <HugeiconsIcon icon={AddCircleIcon} size={24} />
                                    </button>
                                  </div>
                                </div>

                                {room.children > 0 && (
                                  <div className="pt-2 border-t border-gray-100 dark:border-slate-800 space-y-2">
                                    {room.childAges.map((age, cIdx) => (
                                      <div key={cIdx} className="flex items-center justify-between">
                                        <span className="text-xs font-semibold text-gray-600 dark:text-slate-300">Age of child {cIdx + 1}</span>
                                        <select
                                          value={age}
                                          onClick={(e) => e.stopPropagation()}
                                          onChange={(e) => updateChildAge(rIdx, cIdx, Number(e.target.value))}
                                          className="text-xs font-semibold text-gray-900 dark:text-white bg-gray-50 dark:bg-[#0e162b] border border-gray-200 dark:border-slate-700 rounded-lg px-2.5 py-1 outline-none cursor-pointer"
                                        >
                                          {[...Array(12).keys()].map((val) => (
                                            <option key={val} value={val + 2}>
                                              {val + 2} years old
                                            </option>
                                          ))}
                                        </select>
                                      </div>
                                    ))}
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>

                    <div className="pt-3 border-t border-gray-100 dark:border-slate-800 flex items-center justify-between gap-3">
                      <button
                        type="button"
                        onClick={addRoom}
                        className="flex-1 py-2.5 px-3 rounded-xl border border-[#547fee] text-[#547fee] bg-white dark:bg-[#16203a] hover:bg-blue-50/60 dark:hover:bg-[#1a2542] font-bold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
                      >
                        <HugeiconsIcon icon={BedDoubleIcon} size={16} />
                        <span>Add a room</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setIsGuestPickerOpen(false)}
                        className="flex-1 py-2.5 px-3 bg-[#547fee] hover:bg-[#436cd9] text-white text-xs font-bold rounded-xl transition-colors cursor-pointer border-none"
                      >
                        Confirm
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Mobile Bottom Sheet (< lg: 1024px) Portalled to document.body */}
              {isClient && createPortal(
                <AnimatePresence>
                  {isGuestPickerOpen && (
                    <div key="guest-mobile-wrapper" className="lg:hidden">
                      <motion.div
                        key="guest-mobile-backdrop"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={(e) => {
                          e.stopPropagation();
                          setIsGuestPickerOpen(false);
                        }}
                        className="fixed inset-0 bg-black/60 backdrop-blur-xs z-[190]"
                      />

                      <motion.div
                        key="guest-mobile-sheet"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        transition={{ duration: 0.2 }}
                        className="fixed inset-x-0 bottom-0 z-[200] bg-white dark:bg-[#121a30] rounded-t-[28px] p-5 shadow-2xl max-h-[85vh] overflow-y-auto space-y-4"
                      >
                        <div className="w-12 h-1.5 bg-gray-300 dark:bg-slate-700 rounded-full mx-auto mb-3" />
                        <div className="flex items-center justify-between pb-3 border-b border-gray-100 dark:border-slate-800">
                          <span className="text-base font-bold text-gray-900 dark:text-white">
                            Guests & Rooms
                          </span>
                          <button
                            type="button"
                            onClick={() => setIsGuestPickerOpen(false)}
                            className="size-8 rounded-full bg-gray-100 dark:bg-slate-800 flex items-center justify-center text-gray-500 dark:text-slate-400 hover:bg-gray-200 dark:hover:bg-slate-700 border-none cursor-pointer"
                          >
                            <HugeiconsIcon icon={Cancel01Icon} size={18} />
                          </button>
                        </div>

                        <div className="space-y-3">
                          {rooms.map((room, rIdx) => {
                            const isExpanded = rIdx === activeRoomIndex;
                            return (
                              <div
                                key={room.id}
                                onClick={() => setActiveRoomIndex(rIdx)}
                                className={`border rounded-2xl p-3.5 space-y-3 transition-all ${
                                  isExpanded
                                    ? "border-[#547fee] bg-white dark:bg-[#16203a] shadow-xs"
                                    : "border-gray-200/80 dark:border-slate-800 bg-gray-50/50 dark:bg-[#0e162b] hover:bg-gray-50 dark:hover:bg-[#16203a] cursor-pointer"
                                }`}
                              >
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center gap-2">
                                    <span className="font-bold text-sm text-gray-900 dark:text-white">Room {rIdx + 1}</span>
                                    <span className="text-xs text-gray-400 font-medium">
                                      {room.adults} adult{room.adults > 1 ? "s" : ""}, {room.children} child{room.children !== 1 ? "ren" : ""}
                                    </span>
                                  </div>
                                  {rooms.length > 1 && (
                                    <button
                                      type="button"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        removeRoom(rIdx);
                                      }}
                                      className="text-gray-400 hover:text-red-500 transition-colors p-1 rounded-lg border-none bg-transparent cursor-pointer"
                                      title="Remove Room"
                                    >
                                      <HugeiconsIcon icon={Delete02Icon} size={18} />
                                    </button>
                                  )}
                                </div>

                                {isExpanded && (
                                  <div className="pt-2 border-t border-gray-100 dark:border-slate-800 space-y-3">
                                    <div className="flex items-center justify-between">
                                      <div className="flex flex-col">
                                        <span className="text-sm font-bold text-gray-900 dark:text-white">Adults</span>
                                        <span className="text-xs text-gray-400 font-medium">12+ years</span>
                                      </div>
                                      <div className="flex items-center gap-3">
                                        <button
                                          type="button"
                                          disabled={room.adults <= 1}
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            updateAdults(rIdx, -1);
                                          }}
                                          className="text-[#547fee] disabled:text-gray-300 dark:disabled:text-slate-600 transition-colors cursor-pointer disabled:cursor-not-allowed border-none bg-transparent"
                                        >
                                          <HugeiconsIcon icon={RemoveCircleIcon} size={24} />
                                        </button>
                                        <span className="text-sm font-bold text-gray-900 dark:text-white w-4 text-center">{room.adults}</span>
                                        <button
                                          type="button"
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            updateAdults(rIdx, 1);
                                          }}
                                          className="text-[#547fee] transition-colors cursor-pointer border-none bg-transparent"
                                        >
                                          <HugeiconsIcon icon={AddCircleIcon} size={24} />
                                        </button>
                                      </div>
                                    </div>

                                    <div className="flex items-center justify-between">
                                      <div className="flex flex-col">
                                        <span className="text-sm font-bold text-gray-900 dark:text-white">Children</span>
                                        <span className="text-xs text-gray-400 font-medium">2-11 years</span>
                                      </div>
                                      <div className="flex items-center gap-3">
                                        <button
                                          type="button"
                                          disabled={room.children <= 0}
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            updateChildren(rIdx, -1);
                                          }}
                                          className="text-[#547fee] disabled:text-gray-300 dark:disabled:text-slate-600 transition-colors cursor-pointer disabled:cursor-not-allowed border-none bg-transparent"
                                        >
                                          <HugeiconsIcon icon={RemoveCircleIcon} size={24} />
                                        </button>
                                        <span className="text-sm font-bold text-gray-900 dark:text-white w-4 text-center">{room.children}</span>
                                        <button
                                          type="button"
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            updateChildren(rIdx, 1);
                                          }}
                                          className="text-[#547fee] transition-colors cursor-pointer border-none bg-transparent"
                                        >
                                          <HugeiconsIcon icon={AddCircleIcon} size={24} />
                                        </button>
                                      </div>
                                    </div>

                                    {room.children > 0 && (
                                      <div className="pt-2 border-t border-gray-100 dark:border-slate-800 space-y-2">
                                        {room.childAges.map((age, cIdx) => (
                                          <div key={cIdx} className="flex items-center justify-between">
                                            <span className="text-xs font-semibold text-gray-600 dark:text-slate-300">Age of child {cIdx + 1}</span>
                                            <select
                                              value={age}
                                              onClick={(e) => e.stopPropagation()}
                                              onChange={(e) => updateChildAge(rIdx, cIdx, Number(e.target.value))}
                                              className="text-xs font-semibold text-gray-900 dark:text-white bg-gray-50 dark:bg-[#0e162b] border border-gray-200 dark:border-slate-700 rounded-lg px-2.5 py-1 outline-none cursor-pointer"
                                            >
                                              {[...Array(12).keys()].map((val) => (
                                                <option key={val} value={val + 2}>
                                                  {val + 2} years old
                                                </option>
                                              ))}
                                            </select>
                                          </div>
                                        ))}
                                      </div>
                                    )}
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>

                        <div className="pt-3 border-t border-gray-100 dark:border-slate-800 flex items-center justify-between gap-3">
                          <button
                            type="button"
                            onClick={addRoom}
                            className="flex-1 py-2.5 px-3 rounded-xl border border-[#547fee] text-[#547fee] bg-white dark:bg-[#16203a] hover:bg-blue-50/60 dark:hover:bg-[#1a2542] font-bold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
                          >
                            <HugeiconsIcon icon={BedDoubleIcon} size={16} />
                            <span>Add a room</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => setIsGuestPickerOpen(false)}
                            className="flex-1 py-2.5 px-3 bg-[#547fee] hover:bg-[#436cd9] text-white text-xs font-bold rounded-xl transition-colors cursor-pointer border-none"
                          >
                            Confirm
                          </button>
                        </div>
                      </motion.div>
                    </div>
                  )}
                </AnimatePresence>,
                document.body
              )}
            </div>
          </div>

          {/* Icon-Only Search Button */}
          <button
            type="button"
            onClick={handleSearch}
            disabled={isSearching}
            aria-label="Search"
            title="Search"
            className="w-full lg:w-[60px] self-stretch min-h-[48px] bg-[#547fee] hover:bg-[#436cd9] text-white rounded-xl transition-all flex items-center justify-center cursor-pointer border-none shrink-0 active:scale-95 shadow-md hover:shadow-lg"
          >
            {isSearching ? (
              <span className="animate-spin text-lg">🌀</span>
            ) : (
              <HugeiconsIcon icon={Search01Icon} size={22} className="w-5.5 h-5.5" />
            )}
          </button>
        </div>
      </div>

      {/* Frequently Searched Items (Dynamic based on Tab) */}
      <div className="flex items-center gap-3 mt-2.5 px-2 text-sm text-white/90 relative z-10">
        <span className="font-semibold text-white/80 text-xs md:text-sm">Frequently searched:</span>
        <div className="flex flex-wrap items-center gap-2">
          {frequentItems.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => selectFrequentItem(item)}
              className="bg-white/10 hover:bg-white/20 text-white px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm border border-white/20 transition-all cursor-pointer"
            >
              {item}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Hero section ─────────────────────────────────────────────────────────────

export default function HeroSection() {
  return (
    <section
      className="min-h-[560px] sm:min-h-[620px] md:min-h-[660px] flex flex-col justify-between relative shrink-0 w-full pb-10 sm:pb-14"
      style={{
        backgroundImage:
          "linear-gradient(159.15939287969525deg, rgb(1, 1, 23) 2.4142%, rgb(70, 94, 156) 100.24%), linear-gradient(90deg, rgb(24, 23, 67) 0%, rgb(24, 23, 67) 100%)",
      }}
    >
      {/* Background elements scoped overflow container */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Background image */}
        <div
          className="absolute inset-0 w-full h-full"
          data-name="8183 1"
        >
          <img
            alt=""
            className="absolute inset-0 mix-blend-soft-light object-cover pointer-events-none size-full"
            src={toImgSrc(img81831)}
          />
        </div>
      </div>

      {/* Navbar */}
      <Navbar />

      {/* Bottom curve */}
      <div className="absolute bg-[#f5f7fa] bottom-0 h-[24px] sm:h-[32px] inset-x-0 rounded-tl-[24px] sm:rounded-tl-[32px] rounded-tr-[24px] sm:rounded-tr-[32px] pointer-events-none z-10" />

      {/* Vertically Centered Hero content */}
      <div className="flex-1 flex flex-col items-center justify-center pt-24 sm:pt-32 pb-10 sm:pb-12 w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 gap-8 sm:gap-10 lg:gap-12 z-20">
        <HeroText />
        <div className="flex flex-col gap-2 items-center relative shrink-0 w-full mt-3 sm:mt-5">
          {/* Search widget */}
          <SearchWidget />
        </div>
      </div>
    </section>
  )
}
