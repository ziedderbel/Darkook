"use client";

import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
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
  Search01Icon,
  Calendar03Icon,
  Clock01Icon,
  Facebook02Icon,
  NewTwitterIcon,
  InstagramIcon,
  PinterestIcon,
  YoutubeIcon,
  SparklesIcon,
  Bookmark01Icon,
} from "@hugeicons-pro/core-stroke-rounded";

import AuthModal from "@/components/AuthModal";
import DarkModeToggle from "@/components/theme/dark-mode-toggle";
import FullPageMobileMenu from "@/components/layout/FullPageMobileMenu";
import svgPaths from "@/imports/LandingPage/svg-p2y91de9gv";
import imgRusticPatioFurnitureHouseDeckWithVegetation2 from "@/imports/LandingPage/fabb010c874f57c47211afac0d2c3c2209cc0840.png";

// Import sample photos for articles
import imgBeachfrontBungalow from "@/imports/LandingPage/2e243250df73f8665c2076148b1ef31fae40d3e8.png";
import imgTunisiaTravelTips from "@/imports/LandingPage/ec2789d611400a25173d812dfdc5d6656f384f5b.png";
import imgHospitalityStory from "@/imports/LandingPage/b238a19d42fe20f37a4d2898024be6e4fb9c965d.png";
import imgDjerbaExplore from "@/imports/LandingPage/68c031d4d79add7e14a6b6bcf66753f4420c861f.png";
import imgGastronomyFood from "@/imports/LandingPage/c0ef98efbe3a53b1c514867312bfe556daeee299.png";
import imgHostGrowthTips from "@/imports/LandingPage/19e6220155bea3ebe8fdd486592d567d1d63cf20.png";
import imgFeaturedCover from "@/imports/LandingPage/f5c8061b896e0ad8b3ac0aa45cedc31ec176b6cd.png";

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
    <div className="flex flex-col gap-4">
      <div className="flex border-b border-gray-100 pb-2 gap-4">
        <button
          type="button"
          onClick={() => setActiveTab("language")}
          className={`pb-1 text-sm font-bold transition-all relative border-none bg-transparent cursor-pointer ${
            activeTab === "language" ? "text-slate-900" : "text-gray-400 hover:text-gray-600"
          }`}
        >
          Language
          {activeTab === "language" && (
            <motion.div
              layoutId="newsDropdownActiveTabUnderline"
              className="absolute bottom-0 inset-x-0 h-[2.5px] bg-slate-900 rounded-full"
            />
          )}
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("currency")}
          className={`pb-1 text-sm font-bold transition-all relative border-none bg-transparent cursor-pointer ${
            activeTab === "currency" ? "text-slate-900" : "text-gray-400 hover:text-gray-600"
          }`}
        >
          Currency
          {activeTab === "currency" && (
            <motion.div
              layoutId="newsDropdownActiveTabUnderline"
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
                    className={`h-[44px] px-3.5 rounded-xl flex items-center justify-between text-xs font-bold transition-all cursor-pointer border ${
                      isSelected
                        ? "border-[#4a77ec] border-2 text-gray-900 bg-white shadow-xs"
                        : "border-gray-200 text-gray-800 bg-white hover:bg-gray-50 hover:border-gray-300"
                    }`}
                  >
                    <span className="truncate">{curr.name}</span>
                    <span className="text-gray-500 shrink-0 ml-1 font-mono">{curr.symbol}</span>
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
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Select language & currency"
        className="h-[40px] sm:h-[44px] px-3 sm:px-4 bg-white hover:bg-slate-100 active:scale-95 transition-all duration-200 rounded-full flex items-center gap-1.5 sm:gap-2 cursor-pointer border-none shadow-sm text-xs sm:text-sm font-semibold shrink-0"
      >
        <HugeiconsIcon icon={GlobalIcon} size={16} className="text-[#556080]" />
        <img
          src={`https://flagcdn.com/w40/${currentLangObj.country}.png`}
          alt={currentLangObj.code}
          className="w-4.5 h-4.5 sm:w-5 sm:h-5 rounded-full object-cover shrink-0 border border-gray-200"
        />
        <span className="text-[#344054] font-bold tracking-tight text-xs sm:text-sm">
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

      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="news-lang-popover"
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

      {isClient &&
        createPortal(
          <AnimatePresence>
            {isOpen && (
              <div key="news-lang-mobile" className="lg:hidden">
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

// ─── Articles Data ────────────────────────────────────────────────────────────

interface ArticleItem {
  id: string;
  title: string;
  category: string;
  categoryBg: string;
  date: string;
  readTime: string;
  excerpt: string;
  author: {
    name: string;
    avatar: string;
  };
  photo: any;
}

const allArticles: ArticleItem[] = [
  {
    id: "top-guesthouses-tunisia",
    title: "Top Guesthouses in Tunisia You Need to Visit in 2026",
    category: "Stays & Dars",
    categoryBg: "#547FEE",
    date: "05 Mai 2025",
    readTime: "4 min de lecture",
    excerpt: "From historical courtyards in Tunis Medina to seaside architectural gems in Djerba, discover our curated selection of authentic Tunisian hospitality.",
    author: {
      name: "Sonia Ben Amor",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
    },
    photo: imgBeachfrontBungalow,
  },
  {
    id: "traveling-to-tunisia-tips",
    title: "Traveling to Tunisia: Practical Tips, Unique Stays, and Authentic Culture",
    category: "Travel Guides",
    categoryBg: "#10B981",
    date: "12 Août 2025",
    readTime: "6 min de lecture",
    excerpt: "Everything you need to plan an unforgettable stay: best seasons, secret regional routes, hospitality etiquette, and packing essentials.",
    author: {
      name: "Mehdi Trabelsi",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80",
    },
    photo: imgTunisiaTravelTips,
  },
  {
    id: "why-hospitality-is-not-just-accommodation",
    title: "Why Hospitality Is No Longer Just About Accommodation",
    category: "Host Tips",
    categoryBg: "#8B5CF6",
    date: "02 Février 2026",
    readTime: "5 min de lecture",
    excerpt: "Today's travelers look for heartfelt human connection, local culinary traditions, and tailor-made experiences curated by welcoming local hosts.",
    author: {
      name: "Yasmine Khelil",
      avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=80",
    },
    photo: imgHospitalityStory,
  },
  {
    id: "why-is-tunisia-attracting-foreign-tenants",
    title: "Why Is Tunisia Attracting More and More Foreign Tenants?",
    category: "Travel Guides",
    categoryBg: "#10B981",
    date: "20 Décembre 2024",
    readTime: "5 min de lecture",
    excerpt: "With over 300 days of sunshine, fast internet, and affordable cost of living, Tunisia has emerged as a premier destination.",
    author: {
      name: "Mehdi Trabelsi",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80",
    },
    photo: imgDjerbaExplore,
  },
  {
    id: "guest-house-rental-tozeur",
    title: "Guest House Rental in Tozeur: Houses and Villas for a Unique Stay",
    category: "Local Experiences",
    categoryBg: "#F59E0B",
    date: "23 Janvier 2026",
    readTime: "5 min de lecture",
    excerpt: "Lush oases, Sahara desert landscapes, and unique architectural ochre brick heritage in Southern Tunisia.",
    author: {
      name: "Sonia Ben Amor",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
    },
    photo: imgFeaturedCover,
  },
  {
    id: "how-to-grow-vacation-rental-bookings",
    title: "Comment Valoriser Votre Propriété et Maximiser Vos Réservations",
    category: "Host Tips",
    categoryBg: "#8B5CF6",
    date: "10 Novembre 2025",
    readTime: "7 min de lecture",
    excerpt: "Photographie soignée, tarification saisonnière dynamique, accueil personnalisé et optimisation de votre calendrier sur Darbook.",
    author: {
      name: "Yasmine Khelil",
      avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=80",
    },
    photo: imgHostGrowthTips,
  },
];

const categoriesList = [
  "All",
  "Travel Guides",
  "Stays & Dars",
  "Local Experiences",
  "Host Tips",
];

// ─── Main News Page Component ─────────────────────────────────────────────────

export default function NewsContent() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState("FRA");
  const [selectedCurrency, setSelectedCurrency] = useState("EUR");
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredArticles = allArticles.filter((item) => {
    const matchesCategory = activeCategory === "All" || item.category === activeCategory;
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 font-['Inter_Tight',sans-serif] antialiased overflow-x-hidden selection:bg-[#547fee]/20 selection:text-[#547fee]">
      
      {/* ─── 1. Hero & Navbar Header ────────────────────────────────────────── */}
      <header className="relative w-full overflow-hidden bg-[#09112a]">
        {/* Background Image */}
        <div className="absolute inset-0 pointer-events-none select-none">
          <img
            src={toImgSrc(imgRusticPatioFurnitureHouseDeckWithVegetation2)}
            alt="Darbook News & Travel"
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

        {/* Centered Page Title & Search Bar */}
        <div className="relative z-20 max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20 pb-20 sm:pb-26 text-center flex flex-col items-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white font-['Bricolage_Grotesk',sans-serif] tracking-tight m-0 max-w-3xl leading-tight drop-shadow-[0_2px_12px_rgba(0,0,0,0.5)]">
            Latest News & Travel Insights
          </h1>
          <p className="text-slate-200 text-xs sm:text-sm md:text-base max-w-xl mx-auto mt-3 font-normal leading-relaxed drop-shadow-[0_1px_4px_rgba(0,0,0,0.4)]">
            Explore our latest articles about authentic stays, travel guides, host stories, and tourism in Tunisia.
          </p>

          {/* Search Input Bar */}
          <div className="w-full max-w-lg mt-8 relative">
            <div className="relative flex items-center bg-white rounded-full p-1.5 shadow-2xl border border-white/40">
              <div className="pl-4 text-slate-400 flex items-center">
                <HugeiconsIcon icon={Search01Icon} size={18} />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Rechercher un article, un guide, une destination..."
                className="w-full px-3 py-2.5 bg-transparent border-none text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none font-medium"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="pr-3 text-xs text-slate-400 hover:text-slate-600 border-none bg-transparent cursor-pointer font-bold"
                >
                  Effacer
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* ─── Main Content Container with Top Rounded Corners ────────────────── */}
      <main className="relative z-10 -mt-6 sm:-mt-8 bg-[#f8fafc] rounded-t-[28px] sm:rounded-t-[36px] lg:rounded-t-[44px] pb-16 sm:pb-24">
        
        {/* ─── Breadcrumb Navigation ───────────────────────────────────────── */}
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8 pb-2">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-500">
            <Link href="/" className="hover:text-slate-900 transition-colors no-underline text-slate-500">
              Home
            </Link>
            <span className="text-slate-400">›</span>
            <span className="text-[#547fee] font-bold">
              Latest News
            </span>
          </nav>
        </div>

      {/* ─── 3. Category Filter Tabs ────────────────────────────────────────── */}
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
          {categoriesList.map((cat) => {
            const isSelected = activeCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer border whitespace-nowrap shadow-2xs ${
                  isSelected
                    ? "bg-[#181743] text-white border-[#181743] shadow-xs scale-102"
                    : "bg-white text-slate-600 hover:text-slate-900 border-slate-200 hover:bg-slate-50"
                }`}
              >
                {cat === "All" ? "Tous les articles" : cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* ─── 4. Featured Spotlight Article (Shown when no search filter) ────── */}
      {!searchQuery && activeCategory === "All" && (
        <section className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link
            href="/news/guest-house-rental-tozeur"
            className="block no-underline text-inherit bg-white rounded-2xl sm:rounded-3xl overflow-hidden border border-slate-200/90 shadow-2xs hover:shadow-xl transition-all duration-300 group grid grid-cols-1 lg:grid-cols-12 gap-0 hover:-translate-y-1"
          >
            {/* Left Large Photo */}
            <div className="lg:col-span-7 relative h-[260px] sm:h-[340px] lg:h-full min-h-[280px] overflow-hidden bg-slate-100">
              <img
                src={toImgSrc(imgFeaturedCover)}
                alt="Featured Story"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <span className="absolute top-4 left-4 px-3.5 py-1 rounded-[10px] text-[11px] font-extrabold text-white bg-[#547FEE] uppercase tracking-wider shadow-md">
                À la une
              </span>
            </div>

            {/* Right Story Content */}
            <div className="lg:col-span-5 p-6 sm:p-8 lg:p-10 flex flex-col justify-between space-y-6">
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-xs text-slate-500 font-semibold">
                  <span className="flex items-center gap-1">
                    <HugeiconsIcon icon={Calendar03Icon} size={14} className="text-[#547FEE]" />
                    23 Janvier 2026
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <HugeiconsIcon icon={Clock01Icon} size={14} className="text-[#547FEE]" />
                    5 min de lecture
                  </span>
                </div>

                <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-slate-900 font-['Bricolage_Grotesk',sans-serif] leading-tight group-hover:text-[#547FEE] transition-colors">
                  Guest House Rental in Tozeur: Houses and Villas for a Unique Stay
                </h2>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                  Tozeur is one of the most exotic destinations in Tunisia, known for its lush oases, Sahara desert landscapes, and unique architectural heritage.
                </p>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                <div className="flex items-center gap-2.5">
                  <img
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
                    alt="Sonia Ben Amor"
                    className="size-9 rounded-full object-cover border border-slate-200"
                  />
                  <div>
                    <p className="text-xs font-bold text-slate-900 m-0">Sonia Ben Amor</p>
                    <p className="text-[11px] text-slate-400 m-0">Rédactrice Voyage</p>
                  </div>
                </div>

                <span className="px-4 py-2 rounded-full bg-[#547FEE] group-hover:bg-[#406CE3] text-white text-xs font-bold flex items-center gap-1.5 transition-all shadow-xs">
                  <span>Lire l'article</span>
                  <HugeiconsIcon icon={ArrowRight01Icon} size={13} />
                </span>
              </div>
            </div>
          </Link>
        </section>
      )}

      {/* ─── 5. Articles Grid ───────────────────────────────────────────────── */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-20">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-['Bricolage_Grotesk',sans-serif] font-bold text-xl sm:text-2xl text-slate-900 m-0">
            {activeCategory === "All" ? "Tous les articles" : activeCategory}
            <span className="text-sm font-semibold text-slate-400 ml-2">
              ({filteredArticles.length} {filteredArticles.length > 1 ? "articles" : "article"})
            </span>
          </h2>
        </div>

        {filteredArticles.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center border border-slate-200 shadow-2xs space-y-3">
            <div className="size-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto text-xl font-bold">
              🔍
            </div>
            <h3 className="text-base font-bold text-slate-900">Aucun article trouvé</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Aucun résultat ne correspond à votre recherche "{searchQuery}". Essayez avec d'autres mots-clés ou réinitialisez les filtres.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery("");
                setActiveCategory("All");
              }}
              className="px-4 py-2 bg-[#547FEE] text-white rounded-full text-xs font-bold cursor-pointer border-none"
            >
              Réinitialiser les filtres
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
            {filteredArticles.map((article) => (
              <Link
                key={article.id}
                href={`/news/${article.id}`}
                className="bg-white rounded-2xl overflow-hidden border border-slate-200/90 shadow-2xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1.5 no-underline text-inherit"
              >
                <div>
                  {/* Photo Container */}
                  <div className="h-[210px] w-full relative overflow-hidden bg-slate-100">
                    <img
                      src={toImgSrc(article.photo)}
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <span
                      style={{ backgroundColor: article.categoryBg }}
                      className="absolute top-3.5 left-3.5 px-3 py-1 rounded-[10px] text-[11px] font-extrabold text-white uppercase tracking-wider shadow-xs"
                    >
                      {article.category}
                    </span>
                  </div>

                  {/* Body Content */}
                  <div className="p-5 sm:p-6 space-y-3">
                    <div className="flex items-center justify-between text-xs text-slate-400 font-semibold">
                      <span className="flex items-center gap-1">
                        <HugeiconsIcon icon={Calendar03Icon} size={13} className="text-[#547FEE]" />
                        {article.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <HugeiconsIcon icon={Clock01Icon} size={13} className="text-slate-400" />
                        {article.readTime}
                      </span>
                    </div>

                    <h3 className="font-['Bricolage_Grotesk',sans-serif] font-bold text-lg sm:text-xl text-slate-900 leading-snug group-hover:text-[#547FEE] transition-colors m-0">
                      {article.title}
                    </h3>

                    <p className="text-xs text-slate-500 leading-relaxed font-normal line-clamp-3 m-0">
                      {article.excerpt}
                    </p>
                  </div>
                </div>

                {/* Card Footer */}
                <div className="px-5 sm:px-6 pb-5 pt-2 border-t border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <img
                      src={article.author.avatar}
                      alt={article.author.name}
                      className="size-7 rounded-full object-cover border border-slate-200"
                    />
                    <span className="text-xs font-bold text-slate-700">{article.author.name}</span>
                  </div>

                  <span className="text-xs font-bold text-[#547FEE] group-hover:translate-x-1 transition-transform flex items-center gap-1">
                    <span>Lire</span>
                    <HugeiconsIcon icon={ArrowRight01Icon} size={13} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </main>

      {/* ─── 7. Authentic Darbook Dark Footer ───────────────────────────────── */}
      <footer className="w-full bg-[#101438] text-white pt-14 sm:pt-18 pb-10 px-4 sm:px-6 lg:px-8 relative rounded-t-[28px] sm:rounded-t-[40px] rounded-b-none overflow-hidden mt-12">
        <div className="max-w-[1280px] mx-auto">
          {/* Main Grid Content (5 Columns) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10">

            {/* Col 1: Brand / Logo / Bio / CTA */}
            <div className="lg:col-span-4 flex flex-col gap-4 items-start pr-0 lg:pr-4">
              <Link href="/" aria-label="Darbook home" className="no-underline block h-[40px] w-[200px]">
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

            {/* Col 2: Company */}
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

            {/* Col 3: Experience */}
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
                ].map((link) => (
                  <li key={link}>
                    <Link
                      href={`/search?category=${link.toLowerCase()}`}
                      className="text-slate-300 hover:text-white transition-colors no-underline font-normal"
                    >
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Col 4: Address */}
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
                      className="size-8 rounded-full bg-white text-[#101438] flex items-center justify-center hover:scale-110 transition-transform shadow-xs no-underline"
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
          aria-label="Scroll to top"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="absolute right-4 sm:right-8 bottom-6 size-10 bg-[#547fee] hover:bg-[#436cd9] transition-all rounded-full flex items-center justify-center cursor-pointer border-none shadow-lg active:scale-95 z-10"
        >
          <svg className="size-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
          </svg>
        </button>
      </footer>

      {/* Global Modals */}
      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
      <FullPageMobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        onOpenAuth={() => setIsAuthModalOpen(true)}
        onOpenLang={() => {}}
        selectedLang={selectedLang}
        selectedCurrency={selectedCurrency}
      />
    </div>
  );
}
