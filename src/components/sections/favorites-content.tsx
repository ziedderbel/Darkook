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
  Location01Icon,
  SwimmingIcon,
  House01Icon,
  BedDoubleIcon,
  UserGroupIcon,
  Tick01Icon,
  Search01Icon,
  Calendar03Icon,
  Compass01Icon,
  BeachIcon,
  Building01Icon,
  TreesIcon,
  SparklesIcon,
  Facebook02Icon,
  NewTwitterIcon,
  InstagramIcon,
  PinterestIcon,
  YoutubeIcon,
  Delete02Icon,
} from "@hugeicons-pro/core-stroke-rounded";

import AuthModal from "@/components/AuthModal";
import DarkModeToggle from "@/components/theme/dark-mode-toggle";
import FullPageMobileMenu from "@/components/layout/FullPageMobileMenu";
import NavbarSearchWidget from "@/components/search/NavbarSearchWidget";
import svgPaths from "@/imports/LandingPage/svg-p2y91de9gv";

import imgHotelCard from "@/imports/LandingPage/c073680884b8f10a9de7959ce4fee30b267ae984.png";
import imgHotelCard1 from "@/imports/LandingPage/dc0d810ba85b235e1ae2b4d5e84a20e6748d4726.png";
import imgHotelCard2 from "@/imports/LandingPage/66e049ad706e01c958d848def84f86b9917c51e8.png";
import imgHotelCard5 from "@/imports/LandingPage/d9819d39f430371124fadcd7257e9e1b768fdc1a.png";
import imgHotelCard6 from "@/imports/LandingPage/b238a19d42fe20f37a4d2898024be6e4fb9c965d.png";
import imgHotelCard7 from "@/imports/LandingPage/68c031d4d79add7e14a6b6bcf66753f4420c861f.png";

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
    <div className="h-[36px] sm:h-[40px] w-[160px] sm:w-[190px] relative">
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
            <path d={svgPaths.p3d515900} className="fill-[#1b1d22] dark:fill-white transition-colors" />
            <path d={svgPaths.p1e1c2e00} className="fill-[#1b1d22] dark:fill-white transition-colors" />
            <path d={svgPaths.p3dbae00} className="fill-[#1b1d22] dark:fill-white transition-colors" />
            <path d={svgPaths.p1c8f0b80} className="fill-[#1b1d22] dark:fill-white transition-colors" />
            <path d={svgPaths.p2f5e4000} className="fill-[#1b1d22] dark:fill-white transition-colors" />
            <path d={svgPaths.p25a54cf0} className="fill-[#1b1d22] dark:fill-white transition-colors" />
            <path d={svgPaths.p8920900} className="fill-[#1b1d22] dark:fill-white transition-colors" />
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

// ─── Navbar Language Selector ────────────────────────────────────────────────

const mainLanguages = [
  { code: "FRA", name: "Français", country: "fr" },
  { code: "ARA", name: "العربية", country: "tn" },
  { code: "ENG", name: "English (US)", country: "us" },
  { code: "DEU", name: "Deutsch", country: "de" },
  { code: "ITA", name: "Italiano", country: "it" },
  { code: "RUS", name: "Русский", country: "ru" },
];

const otherLanguages = [
  { code: "SPA", name: "Español", country: "es" },
  { code: "POR", name: "Português", country: "pt" },
  { code: "NLD", name: "Nederlands", country: "nl" },
  { code: "TUR", name: "Türkçe", country: "tr" },
  { code: "POL", name: "Polski", country: "pl" },
  { code: "UKR", name: "Українська", country: "ua" },
];

const mainCurrencies = [
  { code: "TND", symbol: "DT", name: "Dinar Tunisien" },
  { code: "EUR", symbol: "€", name: "Euro" },
  { code: "USD", symbol: "$", name: "US Dollar" },
  { code: "GBP", symbol: "£", name: "British Pound" },
  { code: "CAD", symbol: "CA$", name: "Canadian Dollar" },
  { code: "CHF", symbol: "CHF", name: "Swiss Franc" },
];

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
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const currentLangObj =
    [...mainLanguages, ...otherLanguages].find((l) => l.code === selectedLang) || mainLanguages[0];

  const dropdownBody = (
    <div className="space-y-4">
      <div className="flex bg-gray-100 dark:bg-slate-800 p-1 rounded-xl">
        <button
          type="button"
          onClick={() => setActiveTab("language")}
          className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer border-none ${
            activeTab === "language"
              ? "bg-white dark:bg-slate-700 text-gray-900 dark:text-white shadow-xs"
              : "text-gray-500 dark:text-slate-400 hover:text-gray-900 bg-transparent"
          }`}
        >
          Language
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("currency")}
          className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer border-none ${
            activeTab === "currency"
              ? "bg-white dark:bg-slate-700 text-gray-900 dark:text-white shadow-xs"
              : "text-gray-500 dark:text-slate-400 hover:text-gray-900 bg-transparent"
          }`}
        >
          Currency
        </button>
      </div>

      {activeTab === "language" ? (
        <div className="space-y-4 max-h-[320px] overflow-y-auto pr-1">
          <div className="space-y-2">
            <h3 className="text-xs font-bold text-gray-700 dark:text-slate-300">Suggested languages</h3>
            <div className="grid grid-cols-2 gap-2">
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
                    className={`h-[40px] px-3 rounded-xl flex items-center justify-between text-xs font-bold transition-all cursor-pointer border ${
                      isSelected
                        ? "border-[#4a77ec] bg-blue-50/60 dark:bg-blue-900/30 text-[#4a77ec]"
                        : "border-gray-100 dark:border-slate-800 bg-white dark:bg-slate-900 hover:bg-gray-50 text-gray-800 dark:text-slate-200"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <img
                        src={`https://flagcdn.com/w40/${lang.country}.png`}
                        alt={lang.code}
                        className="w-4.5 h-4.5 rounded-full object-cover shrink-0"
                      />
                      <span>{lang.name}</span>
                    </div>
                    {isSelected && <HugeiconsIcon icon={Tick01Icon} size={14} className="text-[#4a77ec]" />}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="text-xs font-bold text-gray-700 dark:text-slate-300">Other languages</h3>
            <div className="grid grid-cols-2 gap-2">
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
                    className={`h-[40px] px-3 rounded-xl flex items-center justify-between text-xs font-bold transition-all cursor-pointer border ${
                      isSelected
                        ? "border-[#4a77ec] bg-blue-50/60 dark:bg-blue-900/30 text-[#4a77ec]"
                        : "border-gray-100 dark:border-slate-800 bg-white dark:bg-slate-900 hover:bg-gray-50 text-gray-800 dark:text-slate-200"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <img
                        src={`https://flagcdn.com/w40/${lang.country}.png`}
                        alt={lang.code}
                        className="w-4.5 h-4.5 rounded-full object-cover shrink-0"
                      />
                      <span>{lang.name}</span>
                    </div>
                    {isSelected && <HugeiconsIcon icon={Tick01Icon} size={14} className="text-[#4a77ec]" />}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-2 max-h-[320px] overflow-y-auto pr-1">
          <h3 className="text-xs font-bold text-gray-700 dark:text-slate-300">Choose currency</h3>
          <div className="grid grid-cols-2 gap-2">
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
                  className={`h-[40px] px-3 rounded-xl flex items-center justify-between text-xs font-bold transition-all cursor-pointer border ${
                    isSelected
                      ? "border-[#4a77ec] bg-blue-50/60 dark:bg-blue-900/30 text-[#4a77ec]"
                      : "border-gray-100 dark:border-slate-800 bg-white dark:bg-slate-900 hover:bg-gray-50 text-gray-800 dark:text-slate-200"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-gray-100 dark:bg-slate-800 flex items-center justify-center text-[10px]">
                      {curr.symbol}
                    </span>
                    <span>{curr.name}</span>
                  </div>
                  {isSelected && <HugeiconsIcon icon={Tick01Icon} size={14} className="text-[#4a77ec]" />}
                </button>
              );
            })}
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
        className="h-[38px] sm:h-[42px] px-2.5 sm:px-3 bg-white dark:bg-slate-900 hover:bg-gray-50 dark:hover:bg-slate-800 border border-gray-100 dark:border-slate-800 rounded-full flex items-center gap-1.5 shadow-2xs transition-all cursor-pointer text-gray-700 dark:text-slate-200"
      >
        <img
          src={`https://flagcdn.com/w40/${currentLangObj.country}.png`}
          alt={currentLangObj.code}
          className="w-4.5 h-4.5 rounded-full object-cover shrink-0"
        />
        <span className="hidden sm:inline text-xs font-bold uppercase">{selectedLang}</span>
        <HugeiconsIcon icon={ArrowDown01Icon} size={13} className={`text-gray-400 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {/* Desktop Popover */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.96 }}
            transition={{ duration: 0.15 }}
            className="hidden lg:block absolute top-[calc(100%+8px)] right-0 w-[420px] bg-white dark:bg-[#121a30] rounded-3xl p-5 shadow-2xl border border-gray-100 dark:border-slate-800 z-50 text-left"
          >
            {dropdownBody}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Sheet */}
      {isClient &&
        createPortal(
          <AnimatePresence>
            {isOpen && (
              <div className="lg:hidden">
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
                  className="fixed inset-x-0 bottom-0 z-[200] bg-white dark:bg-[#121a30] rounded-t-[28px] p-5 shadow-2xl space-y-4 max-h-[85vh] overflow-y-auto"
                >
                  <div className="w-12 h-1.5 bg-gray-300 dark:bg-slate-700 rounded-full mx-auto mb-1" />
                  <div className="flex justify-end">
                    <button
                      type="button"
                      onClick={() => setIsOpen(false)}
                      className="size-8 rounded-full bg-gray-100 dark:bg-slate-800 flex items-center justify-center text-gray-500 dark:text-slate-400 hover:bg-gray-200 border-none cursor-pointer"
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

// ─── Favorites Navigation Button ─────────────────────────────────────────────
function FavoritesNavButton({ count }: { count: number }) {
  return (
    <div className="relative shrink-0 group/navfav">
      <Link
        href="/favorites"
        aria-label="Favorites"
        className="h-[38px] w-[38px] sm:h-[42px] sm:w-[42px] bg-blue-50/80 dark:bg-blue-900/30 hover:bg-red-50/80 active:scale-95 transition-all duration-300 rounded-full flex items-center justify-center border border-blue-200/80 dark:border-blue-700/60 shadow-xs text-[#547fee] hover:text-red-500 no-underline"
      >
        <HugeiconsIcon
          icon={FavouriteIcon}
          size={18}
          className="sm:w-5 sm:h-5 fill-red-500 text-red-500 drop-shadow-[0_1px_4px_rgba(239,68,68,0.3)] transition-transform duration-300 group-hover/navfav:scale-110"
        />
      </Link>
      {count > 0 && (
        <span className="absolute -top-1 -right-1 bg-[#547fee] text-white text-[10px] font-bold w-4.5 h-4.5 rounded-full flex items-center justify-center shadow-xs pointer-events-none border-2 border-white dark:border-slate-900">
          {count}
        </span>
      )}
    </div>
  );
}

// ─── Sample Favorites Data ───────────────────────────────────────────────────

interface FavoriteProperty {
  id: string;
  name: string;
  category: string;
  categoryBg: string;
  categoryIcon: any;
  city: string;
  location: string;
  rating: string;
  beds: string;
  guests: string;
  typeSpec: string;
  price: string;
  discountBadge?: string;
  isSoldOut?: boolean;
  urgencyLabel?: string;
  photos: any[];
}

const INITIAL_FAVORITES: FavoriteProperty[] = [
  {
    id: "f1",
    name: "Maison Dedine",
    category: "Appartement",
    categoryBg: "bg-[#4a77ec]",
    categoryIcon: SwimmingIcon,
    city: "Hammamet",
    location: "Route de Chick Yahia Djerba",
    rating: "4.8",
    beds: "4 beds",
    guests: "Max 8 persons",
    typeSpec: "Logement entier",
    price: "255 TND",
    isSoldOut: true,
    photos: [imgHotelCard, imgHotelCard1, imgHotelCard2],
  },
  {
    id: "f2",
    name: "Maison Dedine",
    category: "Maison d'hôte",
    categoryBg: "bg-[#0ea5e9]",
    categoryIcon: SwimmingIcon,
    city: "Djerba",
    location: "Route de Chick Yahia Djerba",
    rating: "4.8",
    beds: "4 beds",
    guests: "Max 8 persons",
    typeSpec: "Logement entier",
    price: "255 TND",
    discountBadge: "30% off",
    urgencyLabel: "Only 1 room left !",
    photos: [imgHotelCard1, imgHotelCard, imgHotelCard2],
  },
  {
    id: "f3",
    name: "Dar Chick Yahia",
    category: "Maison d'hôte",
    categoryBg: "bg-[#0ea5e9]",
    categoryIcon: SwimmingIcon,
    city: "Djerba",
    location: "Route de Chick Yahia Djerba",
    rating: "4.8",
    beds: "4 beds",
    guests: "Max 8 persons",
    typeSpec: "Logement entier",
    price: "185 TND",
    urgencyLabel: "Only 1 room left !",
    photos: [imgHotelCard2, imgHotelCard5, imgHotelCard6],
  },
  {
    id: "f4",
    name: "Villa Humbra S+4",
    category: "Appartement",
    categoryBg: "bg-[#4a77ec]",
    categoryIcon: SwimmingIcon,
    city: "Hammamet",
    location: "Route de Chick Yahia Djerba",
    rating: "4.8",
    beds: "4 beds",
    guests: "Max 8 persons",
    typeSpec: "Logement entier",
    price: "582 TND",
    isSoldOut: true,
    photos: [imgHotelCard5, imgHotelCard, imgHotelCard1],
  },
  {
    id: "f5",
    name: "Dar El Marsa Luxury",
    category: "Maison d'hôte",
    categoryBg: "bg-[#0ea5e9]",
    categoryIcon: SwimmingIcon,
    city: "Tunis",
    location: "Route de Chick Yahia Djerba",
    rating: "4.8",
    beds: "4 beds",
    guests: "Max 8 persons",
    typeSpec: "Logement entier",
    price: "320 TND",
    discountBadge: "30% off",
    urgencyLabel: "Only 1 room left !",
    photos: [imgHotelCard6, imgHotelCard7, imgHotelCard],
  },
  {
    id: "f6",
    name: "Villa Jasmin Resort",
    category: "Maison d'hôte",
    categoryBg: "bg-[#0ea5e9]",
    categoryIcon: SwimmingIcon,
    city: "Bizerte",
    location: "Route de Chick Yahia Djerba",
    rating: "4.8",
    beds: "4 beds",
    guests: "Max 8 persons",
    typeSpec: "Logement entier",
    price: "410 TND",
    urgencyLabel: "Only 1 room left !",
    photos: [imgHotelCard7, imgHotelCard2, imgHotelCard5],
  },
  {
    id: "f7",
    name: "Maison de Charme Monastir",
    category: "Maison d'hôte",
    categoryBg: "bg-[#0ea5e9]",
    categoryIcon: SwimmingIcon,
    city: "Monastir",
    location: "Route Touristique Skanes",
    rating: "4.8",
    beds: "4 beds",
    guests: "Max 8 persons",
    typeSpec: "Logement entier",
    price: "195 TND",
    discountBadge: "30% off",
    urgencyLabel: "Only 1 room left !",
    photos: [imgHotelCard, imgHotelCard5, imgHotelCard6],
  },
  {
    id: "f8",
    name: "Résidence Port Kantaoui",
    category: "Appartement",
    categoryBg: "bg-[#4a77ec]",
    categoryIcon: SwimmingIcon,
    city: "Sousse",
    location: "Marina Port El Kantaoui",
    rating: "4.8",
    beds: "3 beds",
    guests: "Max 6 persons",
    typeSpec: "Logement entier",
    price: "220 TND",
    isSoldOut: true,
    photos: [imgHotelCard1, imgHotelCard7, imgHotelCard2],
  },
  {
    id: "f9",
    name: "Villa Turquoise Yasmine",
    category: "Villa",
    categoryBg: "bg-[#875bf7]",
    categoryIcon: House01Icon,
    city: "Hammamet",
    location: "Yasmine Hammamet Sud",
    rating: "4.9",
    beds: "5 beds",
    guests: "Max 10 persons",
    typeSpec: "Logement entier",
    price: "640 TND",
    discountBadge: "30% off",
    urgencyLabel: "Only 2 rooms left !",
    photos: [imgHotelCard2, imgHotelCard, imgHotelCard5],
  },
  {
    id: "f10",
    name: "Dar Ben Gacem Médina",
    category: "Maison d'hôte",
    categoryBg: "bg-[#0ea5e9]",
    categoryIcon: SwimmingIcon,
    city: "Tunis",
    location: "Rue du Pacha, Médina de Tunis",
    rating: "4.9",
    beds: "3 beds",
    guests: "Max 6 persons",
    typeSpec: "Logement entier",
    price: "290 TND",
    urgencyLabel: "Only 1 room left !",
    photos: [imgHotelCard5, imgHotelCard6, imgHotelCard1],
  },
  {
    id: "f11",
    name: "Villa Les Palmiers",
    category: "Villa",
    categoryBg: "bg-[#875bf7]",
    categoryIcon: House01Icon,
    city: "Monastir",
    location: "Zone Hôtelière Skanes",
    rating: "4.7",
    beds: "4 beds",
    guests: "Max 8 persons",
    typeSpec: "Logement entier",
    price: "380 TND",
    discountBadge: "30% off",
    urgencyLabel: "Only 1 room left !",
    photos: [imgHotelCard6, imgHotelCard7, imgHotelCard2],
  },
  {
    id: "f12",
    name: "Dar Sidi Bou Said Blue",
    category: "Maison d'hôte",
    categoryBg: "bg-[#0ea5e9]",
    categoryIcon: SwimmingIcon,
    city: "Sousse",
    location: "Boujaafar Beachfront Sousse",
    rating: "4.8",
    beds: "4 beds",
    guests: "Max 8 persons",
    typeSpec: "Logement entier",
    price: "340 TND",
    urgencyLabel: "Only 1 room left !",
    photos: [imgHotelCard7, imgHotelCard, imgHotelCard5],
  },
];

// ─── Single Favorite Card Component ──────────────────────────────────────────

function FavoriteCard({
  item,
  onRemove,
}: {
  item: FavoriteProperty;
  onRemove: (id: string) => void;
}) {
  const [photoIndex, setPhotoIndex] = useState(0);
  const CategoryIcon = item.categoryIcon;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.92, y: 15 }}
      transition={{ duration: 0.25 }}
      className="flex flex-col w-full rounded-[20px] sm:rounded-[24px] overflow-hidden shadow-xs hover:shadow-xl border border-gray-100 dark:border-slate-800 bg-white dark:bg-[#121a30] transition-all duration-300 group/favcard"
    >
      {/* Top Photo Area with Carousel Indicators and Favorite Heart */}
      <div className="h-[210px] sm:h-[230px] relative w-full overflow-hidden bg-slate-900">
        <Link
          href={`/property/${item.id}`}
          className="block size-full relative no-underline cursor-pointer"
        >
          <img
            alt={item.name}
            src={toImgSrc(item.photos[photoIndex] || item.photos[0])}
            className="absolute inset-0 size-full object-cover group-hover/favcard:scale-105 transition-transform duration-700"
          />
        </Link>

        {/* Top-Left: Category Tag with Icon */}
        <div className="absolute top-3 left-3 z-10 flex items-center gap-1.5 pointer-events-none">
          <div className={`${item.categoryBg} text-white px-2.5 py-1 rounded-[10px] text-xs font-semibold flex items-center gap-1.5 shadow-sm`}>
            <span>{item.category}</span>
          </div>
          <div className="size-7 rounded-full bg-white/90 dark:bg-slate-900/90 backdrop-blur-xs flex items-center justify-center text-[#547fee] shadow-xs">
            <HugeiconsIcon icon={CategoryIcon} size={14} />
          </div>
        </div>

        {/* Top-Right: Favorite Heart Button (Red Filled) */}
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onRemove(item.id);
          }}
          title="Remove from favorites"
          className="absolute top-3 right-3 z-20 size-8.5 rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-xs flex items-center justify-center text-red-500 hover:scale-110 active:scale-90 transition-all shadow-md cursor-pointer border-none"
        >
          <HugeiconsIcon icon={FavouriteIcon} size={17} className="fill-red-500 text-red-500" />
        </button>

        {/* Carousel Indicator Dots */}
        <div className="absolute bottom-2.5 inset-x-0 flex justify-center gap-1.5 z-10 pointer-events-auto">
          {item.photos.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setPhotoIndex(idx);
              }}
              className={`h-1.5 rounded-full transition-all cursor-pointer border-none ${
                photoIndex === idx ? "w-5 bg-white shadow-xs" : "w-1.5 bg-white/60 hover:bg-white"
              }`}
              aria-label={`Slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Card Content */}
      <div className="p-4 sm:p-5 flex flex-col flex-1 justify-between gap-3 text-left">
        <div>
          {/* Row 1: Title & Rating */}
          <div className="flex items-center justify-between gap-2">
            <Link
              href={`/property/${item.id}`}
              className="font-['Bricolage_Grotesk',sans-serif] font-bold text-base sm:text-lg text-gray-900 dark:text-white hover:text-[#547fee] dark:hover:text-[#547fee] transition-colors truncate no-underline"
            >
              {item.name}
            </Link>
            <div className="bg-blue-50 dark:bg-blue-900/30 text-[#4a77ec] font-extrabold text-xs px-2 py-0.5 rounded-lg shrink-0">
              {item.rating}
            </div>
          </div>

          {/* Row 2: Location */}
          <div className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-slate-400 mt-1">
            <HugeiconsIcon icon={Location01Icon} size={13} className="text-gray-400 shrink-0" />
            <span className="truncate">{item.location}</span>
          </div>

          {/* Row 3: Feature Pills */}
          <div className="flex flex-wrap items-center gap-2 mt-3 pt-2.5 border-t border-gray-100 dark:border-slate-800 text-[11px] text-gray-600 dark:text-slate-300">
            <span className="flex items-center gap-1 bg-gray-50 dark:bg-[#0e162b] px-2 py-1 rounded-md border border-gray-100 dark:border-slate-800">
              <HugeiconsIcon icon={House01Icon} size={12} className="text-gray-400" />
              {item.typeSpec}
            </span>
            <span className="flex items-center gap-1 bg-gray-50 dark:bg-[#0e162b] px-2 py-1 rounded-md border border-gray-100 dark:border-slate-800">
              <HugeiconsIcon icon={BedDoubleIcon} size={12} className="text-gray-400" />
              {item.beds}
            </span>
            <span className="flex items-center gap-1 bg-gray-50 dark:bg-[#0e162b] px-2 py-1 rounded-md border border-gray-100 dark:border-slate-800">
              <HugeiconsIcon icon={UserGroupIcon} size={12} className="text-gray-400" />
              {item.guests}
            </span>
          </div>
        </div>

        {/* Bottom Price, Status & Actions */}
        <div className="pt-3 border-t border-gray-100 dark:border-slate-800 flex flex-col gap-2.5">
          {/* Discount Badge if available */}
          {item.discountBadge && !item.isSoldOut && (
            <div className="w-fit bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 text-[10.5px] font-bold px-2 py-0.5 rounded-md">
              {item.discountBadge}
            </div>
          )}

          <div className="flex items-end justify-between gap-2">
            {/* Price Column */}
            <div className="flex flex-col">
              {item.isSoldOut ? (
                <>
                  <span className="text-sm sm:text-base font-bold text-red-500 leading-tight">Sold out</span>
                  <span className="text-[10.5px] text-gray-400">2 nights, 2 guests</span>
                </>
              ) : (
                <>
                  <div className="flex items-baseline gap-1">
                    <span className="text-base sm:text-lg font-extrabold text-gray-900 dark:text-white leading-tight">
                      {item.price}
                    </span>
                  </div>
                  <span className="text-[10.5px] text-gray-400">2 nights, 2 guests</span>
                  {item.urgencyLabel && (
                    <span className="text-[10.5px] font-bold text-amber-600 dark:text-amber-400 mt-0.5">
                      {item.urgencyLabel}
                    </span>
                  )}
                </>
              )}
            </div>

            {/* Action Buttons Column */}
            <div className="flex flex-col items-end gap-1.5 shrink-0">
              <Link href={`/property/${item.id}`} className="no-underline">
                <button
                  type="button"
                  className={`px-4 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer border-none shadow-xs active:scale-95 ${
                    item.isSoldOut
                      ? "bg-[#547fee] hover:bg-[#436cd9] text-white"
                      : "bg-[#547fee] hover:bg-[#436cd9] text-white shadow-[#547fee]/20"
                  }`}
                >
                  Check availability
                </button>
              </Link>
              <Link
                href={`/property/${item.id}`}
                className="text-[11px] font-semibold text-[#547fee] hover:underline flex items-center gap-0.5 no-underline"
              >
                <span>Official website</span>
                <HugeiconsIcon icon={ArrowRight01Icon} size={11} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Main Favorites Page Content Component ───────────────────────────────────

export default function FavoritesContent() {
  const [selectedLang, setSelectedLang] = useState("FRA");
  const [selectedCurrency, setSelectedCurrency] = useState("TND");
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLangModalOpen, setIsLangModalOpen] = useState(false);

  // Favorites state
  const [favorites, setFavorites] = useState<FavoriteProperty[]>(INITIAL_FAVORITES);
  const [activeCityTab, setActiveCityTab] = useState<string>("All");

  const removeFavorite = (id: string) => {
    setFavorites((prev) => prev.filter((item) => item.id !== id));
  };

  // Grouped city tabs list with counts
  const cities = ["Hammamet", "Tunis", "Bizerte", "Monastir", "Sousse", "Djerba"];
  const cityTabs = [
    { name: "All", count: favorites.length },
    ...cities.map((city) => ({
      name: city,
      count: favorites.filter((f) => f.city === city).length,
    })),
  ];

  const filteredFavorites =
    activeCityTab === "All"
      ? favorites
      : favorites.filter((f) => f.city === activeCityTab);

  return (
    <main className="min-h-screen bg-[#F8FAFC] dark:bg-[#070b18] text-slate-900 dark:text-white flex flex-col font-sans transition-colors duration-300">
      
      {/* ── 1. Top Navbar ── */}
      <header className="sticky top-0 z-50 bg-white/95 dark:bg-[#0b1022]/95 backdrop-blur-md border-b border-gray-100 dark:border-slate-800 transition-colors duration-300">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 h-[68px] sm:h-[76px] flex items-center justify-between gap-3 sm:gap-4">
          
          {/* Left: Logo */}
          <Logo />

          {/* Middle: Interactive Morphing Search Widget */}
          <div className="hidden md:flex flex-1 justify-center max-w-[540px] lg:max-w-[620px] px-2">
            <NavbarSearchWidget />
          </div>

          {/* Right: Actions */}
          <div className="hidden lg:flex items-center gap-2.5">
            <DarkModeToggle />
            <LanguageSelector
              selectedLang={selectedLang}
              selectedCurrency={selectedCurrency}
              onSelectLang={setSelectedLang}
              onSelectCurrency={setSelectedCurrency}
            />
            <FavoritesNavButton count={favorites.length} />
            <button
              type="button"
              onClick={() => setIsAuthModalOpen(true)}
              className="h-[38px] sm:h-[42px] px-4 bg-[#547fee] hover:bg-[#436cd9] text-white font-bold text-xs rounded-full flex items-center gap-2 transition-all cursor-pointer border-none shadow-xs active:scale-95"
            >
              <HugeiconsIcon icon={UserIcon} size={15} />
              <span>Sign In</span>
            </button>
          </div>

          {/* Mobile & Tablet Actions (< lg) */}
          <div className="flex lg:hidden items-center gap-2">
            <DarkModeToggle />
            <FavoritesNavButton count={favorites.length} />
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="Open menu"
              className="size-9 rounded-full bg-gray-100 dark:bg-slate-800 hover:bg-gray-200 text-gray-700 dark:text-slate-200 flex items-center justify-center cursor-pointer border-none shadow-2xs"
            >
              <HugeiconsIcon icon={Menu01Icon} size={18} />
            </button>
          </div>
        </div>
      </header>

      {/* ── 2. Breadcrumbs ── */}
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 w-full pt-4 pb-1 text-xs font-semibold text-gray-500 dark:text-slate-400 flex items-center gap-2">
        <Link href="/" className="hover:text-[#547fee] text-gray-600 dark:text-slate-400 no-underline transition-colors">
          Home
        </Link>
        <span className="text-gray-300 dark:text-slate-600 font-normal">/</span>
        <span className="text-gray-900 dark:text-white font-bold">Favorites</span>
      </div>

      {/* ── 3. Main Favorites Container Card ── */}
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 w-full py-4 sm:py-6 mb-16 flex-1">
        <div className="bg-white dark:bg-[#121a30] rounded-[24px] sm:rounded-[32px] p-5 sm:p-8 lg:p-10 border border-gray-100 dark:border-slate-800 shadow-sm transition-colors duration-300">
          
          {/* Header Title & Subtitle */}
          <div className="flex flex-col gap-1 text-left">
            <h1 className="font-['Bricolage_Grotesk',sans-serif] font-bold text-2xl sm:text-3xl text-gray-900 dark:text-white m-0">
              Favorites
            </h1>
            <p className="font-['Inter_Tight:Regular',sans-serif] text-xs sm:text-sm text-gray-500 dark:text-slate-400 m-0">
              Create and manage your favorites to keep track of stays that interest you.
            </p>
          </div>

          {/* Filter City Tabs Bar */}
          <div className="bg-gray-50 dark:bg-[#0e162b] p-1.5 rounded-xl sm:rounded-2xl flex items-center gap-1.5 sm:gap-2 overflow-x-auto border border-gray-100 dark:border-slate-800 mt-6 scrollbar-none">
            {cityTabs.map((tab) => {
              const isActive = activeCityTab === tab.name;
              return (
                <button
                  key={tab.name}
                  type="button"
                  onClick={() => setActiveCityTab(tab.name)}
                  className={`px-3.5 sm:px-4 py-2 rounded-lg sm:rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer border-none flex items-center gap-1.5 ${
                    isActive
                      ? "bg-[#547fee] text-white shadow-xs"
                      : "text-gray-600 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-800 hover:text-gray-900 bg-transparent"
                  }`}
                >
                  <span>{tab.name}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                      isActive ? "bg-white/20 text-white" : "bg-gray-200/80 dark:bg-slate-700 text-gray-600 dark:text-slate-400"
                    }`}
                  >
                    {tab.count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Favorites Grid */}
          <div className="mt-8">
            {filteredFavorites.length > 0 ? (
              <motion.div
                layout
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full"
              >
                <AnimatePresence mode="popLayout">
                  {filteredFavorites.map((item) => (
                    <FavoriteCard
                      key={item.id}
                      item={item}
                      onRemove={removeFavorite}
                    />
                  ))}
                </AnimatePresence>
              </motion.div>
            ) : (
              /* Empty State */
              <div className="py-16 sm:py-20 flex flex-col items-center justify-center text-center max-w-md mx-auto space-y-4">
                <div className="size-16 rounded-full bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center text-[#547fee]">
                  <HugeiconsIcon icon={FavouriteIcon} size={30} className="stroke-current fill-none text-[#547fee]" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-['Bricolage_Grotesk',sans-serif] font-bold text-lg text-gray-900 dark:text-white">
                    No favorites in {activeCityTab === "All" ? "your list" : activeCityTab}
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-slate-400">
                    Save authentic dars, apartments, and villas by clicking the heart icon on any stay card.
                  </p>
                </div>
                <Link href="/search" className="no-underline pt-2">
                  <button
                    type="button"
                    className="px-6 py-2.5 bg-[#547fee] hover:bg-[#436cd9] text-white font-bold text-xs rounded-xl shadow-xs transition-all cursor-pointer border-none"
                  >
                    Explore all stays
                  </button>
                </Link>
              </div>
            )}
          </div>

        </div>
      </div>

      {/* ── 4. Unified Footer ── */}
      <footer className="w-full bg-[#090D1E] dark:bg-[#070b18] text-white pt-14 pb-8 border-t border-white/5 relative z-10 transition-colors duration-300">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10 pb-12 border-b border-white/10">
            
            {/* Col 1: Brand & List Your Property */}
            <div className="lg:col-span-4 flex flex-col gap-4">
              <Link href="/" className="inline-block no-underline">
                <div className="h-[40px] w-[180px] relative">
                  <svg className="block size-full" fill="none" viewBox="0 0 224 44.5742">
                    <g>
                      <path d={svgPaths.p2bca0c0} fill="#547FEE" />
                      <g>
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
              </Link>
              <p className="text-xs sm:text-sm text-slate-300 font-normal leading-relaxed m-0 max-w-sm">
                Darbook is a platform for renting holiday homes in Tunisia. Book in just a few clicks and enjoy an unforgettable stay.
              </p>
              <div className="pt-2">
                <Link href="/list-your-property" className="no-underline inline-block">
                  <button
                    type="button"
                    className="bg-[#547FEE] hover:bg-[#406CE3] transition-all text-white font-medium text-xs sm:text-sm px-6 py-2.5 rounded-full border-none cursor-pointer shadow-md hover:shadow-lg active:scale-95"
                  >
                    List your property
                  </button>
                </Link>
              </div>
            </div>

            {/* Col 2: Company */}
            <div className="lg:col-span-2 flex flex-col gap-3.5">
              <h4 className="font-['Bricolage_Grotesk',sans-serif] font-bold text-sm sm:text-base text-white tracking-wide m-0">
                Company
              </h4>
              <div className="flex flex-col gap-2 text-xs sm:text-sm text-slate-300">
                <Link href="/about" className="hover:text-white transition-colors no-underline">About us</Link>
                <Link href="/search" className="hover:text-white transition-colors no-underline">Catalog</Link>
                <Link href="/terms" className="hover:text-white transition-colors no-underline">Terms & Conditions</Link>
                <Link href="/terms" className="hover:text-white transition-colors no-underline">Cancellation Policy</Link>
                <Link href="/terms" className="hover:text-white transition-colors no-underline">Privacy Policy</Link>
                <Link href="/news" className="hover:text-white transition-colors no-underline">News & Articles</Link>
                <Link href="/contact" className="hover:text-white transition-colors no-underline">Contact us</Link>
              </div>
            </div>

            {/* Col 3: Experience */}
            <div className="lg:col-span-2 flex flex-col gap-3.5">
              <h4 className="font-['Bricolage_Grotesk',sans-serif] font-bold text-sm sm:text-base text-white tracking-wide m-0">
                Experience
              </h4>
              <div className="flex flex-col gap-2 text-xs sm:text-sm text-slate-300">
                <Link href="/search?exp=seaside" className="hover:text-white transition-colors no-underline">Seaside</Link>
                <Link href="/search?exp=swimming" className="hover:text-white transition-colors no-underline">Swimming pool</Link>
                <Link href="/search?exp=urban" className="hover:text-white transition-colors no-underline">Urban stays</Link>
                <Link href="/search?exp=nature" className="hover:text-white transition-colors no-underline">Nature</Link>
                <Link href="/search?exp=sahara" className="hover:text-white transition-colors no-underline">Sahara</Link>
                <Link href="/search?exp=cultural" className="hover:text-white transition-colors no-underline">Cultural</Link>
                <Link href="/search?exp=romantics" className="hover:text-white transition-colors no-underline">Romantics</Link>
              </div>
            </div>

            {/* Col 4: Address */}
            <div className="lg:col-span-2 flex flex-col gap-3.5">
              <h4 className="font-['Bricolage_Grotesk',sans-serif] font-bold text-sm sm:text-base text-white tracking-wide m-0">
                Address
              </h4>
              <div className="flex flex-col gap-2.5 text-xs sm:text-sm text-slate-300">
                <p className="m-0 leading-relaxed">
                  101 Marlow Street, #12-05 Clfe Parkview, Singapore 059020.
                </p>
                <div className="flex flex-col gap-1 pt-1">
                  <a href="tel:+6561565519" className="text-slate-300 hover:text-white transition-colors no-underline block">
                    +65 6156 5519
                  </a>
                  <a href="mailto:hello@darbook.tn" className="text-slate-300 hover:text-white transition-colors no-underline block">
                    hello@darbook.tn
                  </a>
                </div>
              </div>
            </div>

            {/* Col 5: App Download & Social Media */}
            <div className="lg:col-span-2 flex flex-col gap-5">
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
                      className="size-8 rounded-full bg-white text-[#101438] flex items-center justify-center hover:scale-110 transition-transform shadow-xs no-underline"
                    >
                      <HugeiconsIcon icon={item.icon} size={16} />
                    </a>
                  ))}
                </div>
              </div>
            </div>

          </div>

          {/* Bottom Divider & Copyright */}
          <div className="mt-8 pt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs sm:text-sm text-slate-400 m-0">
              © 2026 Darbook. All rights reserved
            </p>
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

        {/* Back to top floating button */}
        <button
          type="button"
          aria-label="Scroll to top"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-6 right-6 size-10 rounded-full bg-[#547FEE] hover:bg-[#406CE3] text-white flex items-center justify-center shadow-lg hover:shadow-xl transition-all z-40 active:scale-95 cursor-pointer border-none"
        >
          <svg className="size-5 stroke-current fill-none" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </button>
      </footer>

      {/* Modals */}
      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
      <FullPageMobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        onOpenAuth={() => setIsAuthModalOpen(true)}
        onOpenLang={() => setIsLangModalOpen(true)}
        selectedLang={selectedLang}
        selectedCurrency={selectedCurrency}
        favoritesCount={favorites.length}
      />
    </main>
  );
}
