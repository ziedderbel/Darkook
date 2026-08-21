"use client";

import { useState, useMemo, use } from "react";
import { Link, useRouter } from "@/i18n/navigation";
import { motion, AnimatePresence } from "motion/react";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  StarIcon,
  FavouriteIcon,
  House01Icon,
  BedDoubleIcon,
  SwimmingIcon,
  BeachIcon,
  Wifi01Icon,
  SnowIcon,
  Location01Icon,
  Calendar03Icon,
  UserGroupIcon,
  UserIcon,
  ArrowLeft01Icon,
  ArrowRight01Icon,
  ArrowDown01Icon,
  Tick01Icon,
  Cancel01Icon,
  Search01Icon,
  Moon02Icon,
  Sun01Icon,
  Building01Icon,
  TreesIcon,
  Compass01Icon,
  Menu01Icon,
  CustomerSupportIcon,
  Shield01Icon,
  CheckmarkCircle01Icon,
  Clock01Icon,
  AddCircleIcon,
  RemoveCircleIcon,
  Restaurant01Icon,
  Share01Icon,
  Image01Icon,
  Airplane01Icon,
  PaintBoardIcon,
  SparklesIcon,
  Coffee01Icon,
  Tv01Icon,
} from "@hugeicons-pro/core-stroke-rounded";
import dynamic from "next/dynamic";
import svgPaths from "@/imports/LandingPage/svg-p2y91de9gv";
import AuthModal from "@/components/AuthModal";
import LanguageCurrencyModal from "@/components/LanguageCurrencyModal";
import FullPageMobileMenu from "@/components/layout/FullPageMobileMenu";

// Photo imports
import imgHotelCard from "@/imports/LandingPage/c073680884b8f10a9de7959ce4fee30b267ae984.png";
import imgHotelCard1 from "@/imports/LandingPage/dc0d810ba85b235e1ae2b4d5e84a20e6748d4726.png";
import imgHotelCard2 from "@/imports/LandingPage/66e049ad706e01c958d848def84f86b9917c51e8.png";
import imgHotelCard5 from "@/imports/LandingPage/d9819d39f430371124fadcd7257e9e1b768fdc1a.png";
import imgHotelCard6 from "@/imports/LandingPage/b238a19d42fe20f37a4d2898024be6e4fb9c965d.png";
import imgHotelCard7 from "@/imports/LandingPage/68c031d4d79add7e14a6b6bcf66753f4420c861f.png";

const MapView = dynamic(() => import("@/components/MapView"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full rounded-2xl bg-slate-100 flex items-center justify-center min-h-[360px]">
      <div className="flex flex-col items-center gap-3">
        <div className="w-8 h-8 border-3 border-[#3B68EC]/30 border-t-[#3B68EC] rounded-full animate-spin" />
        <span className="text-xs font-semibold text-slate-400">Loading map…</span>
      </div>
    </div>
  ),
});

function toImgSrc(val: any): string {
  if (!val) return "";
  if (typeof val === "string") return val;
  if (typeof val === "object" && val !== null) {
    if (typeof val.src === "string") return val.src;
    if (typeof val.default === "string") return val.default;
  }
  return String(val);
}

function BrandLogo() {
  return (
    <Link href="/" className="h-[36px] sm:h-[40px] w-auto aspect-[224/44.57] relative shrink-0 block no-underline select-none">
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
  );
}

// Property database matching search page
const PROPERTIES_MAP: Record<string, any> = {
  p1: {
    id: "p1",
    name: "Dar Dhiafa Boutique Hotel",
    type: "Maison d'hôte",
    typeBg: "#06b6d4",
    location: "Erriadh (Djerbahood), Djerba, Tunisie",
    rating: 4.9,
    reviewsCount: 128,
    price: "420 DT",
    priceNum: 420,
    bedrooms: 3,
    beds: 3,
    bathrooms: 2,
    maxGuests: 6,
    equipment: ["pool", "wifi", "ac", "kitchen", "garden"],
    specs: ["Logement entier", "3 chambres", "3 lits", "2 salles de bain"],
    photos: [imgHotelCard, imgHotelCard1, imgHotelCard2, imgHotelCard5, imgHotelCard6, imgHotelCard7],
    lat: 33.8185,
    lng: 10.856,
  },
  p2: {
    id: "p2",
    name: "Maison Dedine Seafront",
    type: "Villa",
    typeBg: "#8b5cf6",
    location: "Plage Sidi Mahrez, Djerba, Tunisie",
    rating: 4.8,
    reviewsCount: 94,
    price: "780 DT",
    priceNum: 780,
    bedrooms: 4,
    beds: 4,
    bathrooms: 3,
    maxGuests: 8,
    equipment: ["pool", "beach", "wifi", "ac", "sea_view"],
    specs: ["Villa pieds dans l'eau", "4 chambres", "4 lits", "3 salles de bain"],
    photos: [imgHotelCard1, imgHotelCard2, imgHotelCard5, imgHotelCard6, imgHotelCard7, imgHotelCard],
    lat: 33.8835,
    lng: 10.982,
  },
  p3: {
    id: "p3",
    name: "Dar Bibine Artist Riad",
    type: "Maison d'hôte",
    typeBg: "#06b6d4",
    location: "Djerbahood, Erriadh, Djerba, Tunisie",
    rating: 4.9,
    reviewsCount: 112,
    price: "350 DT",
    priceNum: 350,
    bedrooms: 2,
    beds: 2,
    bathrooms: 2,
    maxGuests: 4,
    equipment: ["pool", "wifi", "garden"],
    specs: ["Suite de charme", "2 chambres", "2 lits", "2 salles de bain"],
    photos: [imgHotelCard2, imgHotelCard, imgHotelCard5, imgHotelCard6, imgHotelCard1, imgHotelCard7],
    lat: 33.8142,
    lng: 10.8525,
  },
};

const DEFAULT_PROPERTY = PROPERTIES_MAP.p1;

export default function PropertyDetailPage({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { locale, id } = use(params);
  const router = useRouter();

  const property = PROPERTIES_MAP[id] || {
    ...DEFAULT_PROPERTY,
    id,
    name: `Dar ${id.toUpperCase()} Boutique Hotel`,
  };

  // State
  const [isFavorite, setIsFavorite] = useState(false);
  const [selectedRoomOption, setSelectedRoomOption] = useState("entire");
  // Interactive calendar selection state
  const [calendarViewTab, setCalendarViewTab] = useState<"calendar" | "room">("calendar");
  const [checkInDate, setCheckInDate] = useState("2026-07-10");
  const [checkOutDate, setCheckOutDate] = useState("2026-07-13");
  const [hoveredDate, setHoveredDate] = useState<string | null>(null);
  const [isPickingCheckOut, setIsPickingCheckOut] = useState(false);
  const [calendarMonth, setCalendarMonth] = useState(6); // 6 = July 2026
  const [calendarYear, setCalendarYear] = useState(2026);
  const [guestsCount, setGuestsCount] = useState(2);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [activePhotoIndex, setActivePhotoIndex] = useState(0);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isLangModalOpen, setIsLangModalOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState("FRA");
  const [isBookSuccessModalOpen, setIsBookSuccessModalOpen] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(0);

  // Pricing calculations
  const calculateNights = (startStr: string, endStr: string) => {
    if (!startStr || !endStr) return 3;
    const start = new Date(startStr);
    const end = new Date(endStr);
    const diffDays = Math.ceil((end.getTime() - start.getTime()) / (1000 * 3600 * 24));
    return diffDays > 0 ? diffDays : 1;
  };

  const effectiveCheckOutDate =
    isPickingCheckOut && hoveredDate && hoveredDate > checkInDate ? hoveredDate : checkOutDate;
  const nightsCount = calculateNights(checkInDate, effectiveCheckOutDate || checkInDate);

  const basePricePerNight =
    selectedRoomOption === "room1"
      ? 190
      : selectedRoomOption === "suite"
      ? 280
      : property.priceNum;

  const totalAccommodation = basePricePerNight * nightsCount;
  const cleaningFee = 45;
  const serviceFee = 35;
  const grandTotal = totalAccommodation + cleaningFee + serviceFee;

  const handleShareCopy = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2500);
    }
  };

  const formatDateLabel = (dateStr: string) => {
    if (!dateStr) return "Sélectionner";
    const parts = dateStr.split("-").map(Number);
    if (parts.length < 3) return dateStr;
    const date = new Date(parts[0], parts[1] - 1, parts[2]);
    return date.toLocaleDateString("fr-FR", { day: "numeric", month: "short", year: "numeric" });
  };

  // Interactive Range Selection Handlers
  const handleDateSelect = (year: number, monthIndex: number, dayNum: number) => {
    const selectedStr = `${year}-${String(monthIndex + 1).padStart(2, "0")}-${String(dayNum).padStart(2, "0")}`;
    
    if (!isPickingCheckOut || !checkInDate) {
      // Step 1: Start new date range with check-in date
      setCheckInDate(selectedStr);
      setCheckOutDate("");
      setIsPickingCheckOut(true);
      setHoveredDate(null);
    } else {
      // Step 2: Selecting check-out date
      if (selectedStr <= checkInDate) {
        // If clicked date is earlier than or equal to check-in, treat as new check-in
        setCheckInDate(selectedStr);
        setCheckOutDate("");
        setIsPickingCheckOut(true);
        setHoveredDate(null);
      } else {
        // Valid checkout date!
        setCheckOutDate(selectedStr);
        setIsPickingCheckOut(false);
        setHoveredDate(null);
      }
    }
  };

  const handleDateHover = (year: number, monthIndex: number, dayNum: number) => {
    if (isPickingCheckOut && checkInDate) {
      const dateStr = `${year}-${String(monthIndex + 1).padStart(2, "0")}-${String(dayNum).padStart(2, "0")}`;
      setHoveredDate(dateStr);
    }
  };

  const handleApplyPreset = (durationNights: number) => {
    const start = checkInDate || "2026-07-10";
    const parts = start.split("-").map(Number);
    const startDate = new Date(parts[0], parts[1] - 1, parts[2]);
    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + durationNights);

    const endY = endDate.getFullYear();
    const endM = String(endDate.getMonth() + 1).padStart(2, "0");
    const endD = String(endDate.getDate()).padStart(2, "0");

    setCheckInDate(start);
    setCheckOutDate(`${endY}-${endM}-${endD}`);
    setIsPickingCheckOut(false);
    setHoveredDate(null);
  };

  const handleClearDates = () => {
    setCheckInDate("");
    setCheckOutDate("");
    setIsPickingCheckOut(false);
    setHoveredDate(null);
  };

  // Weather & Pricing metadata per cell matching the mockup
  const getDayMeta = (year: number, monthIndex: number, day: number) => {
    const isSecondMonth = monthIndex % 2 === 1;

    let weatherIcon = "🌤️";
    let temp = "11°C";
    let price = "32€";
    let status: "default" | "green" | "amber" | "soldout" | "cyan" = "default";

    if (isSecondMonth) {
      if (day >= 8 && day <= 11) {
        status = "green";
        price = "20€";
        temp = "11°C";
      } else if (day >= 22 && day <= 26) {
        status = "amber";
        price = "20€";
        temp = "11°C";
      } else if (day === 29) {
        status = "soldout";
        price = "";
        temp = "11°C";
      } else if (day === 31) {
        status = "cyan";
        price = "20€";
        temp = "11°C";
      }
    }

    return { weatherIcon, temp, price, status };
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
      <div key={`${year}-${monthIndex}`} className="flex-1 min-w-[280px]">
        {/* Month Title */}
        <div className="text-center font-extrabold text-slate-900 text-sm sm:text-base mb-3 font-['Bricolage_Grotesk',sans-serif]">
          {monthNames[monthIndex]} {year}
        </div>

        {/* Days of Week */}
        <div className="grid grid-cols-7 gap-1 text-center mb-1.5">
          {["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"].map((dayName, idx) => (
            <span
              key={dayName}
              className={`text-[11px] font-bold py-1 ${
                idx === 5 || idx === 6 ? "text-rose-500" : "text-slate-500"
              }`}
            >
              {dayName}
            </span>
          ))}
        </div>

        {/* Calendar Grid with Card-like Interactive Cells */}
        <div
          onMouseLeave={() => {
            if (isPickingCheckOut) setHoveredDate(null);
          }}
          className="grid grid-cols-7 gap-px bg-slate-200/80 p-px rounded-2xl overflow-hidden border border-slate-200 shadow-2xs"
        >
          {cells.map((day, idx) => {
            if (day === null) {
              return <div key={`empty-${idx}`} className="h-[62px] sm:h-[70px] bg-slate-50/40" />;
            }

            const cellDateStr = `${year}-${String(monthIndex + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
            const isCheckIn = cellDateStr === checkInDate;
            const isCheckOut = cellDateStr === effectiveCheckOutDate;
            const isInRange = Boolean(
              checkInDate && effectiveCheckOutDate && cellDateStr > checkInDate && cellDateStr < effectiveCheckOutDate
            );
            const { temp, price, status } = getDayMeta(year, monthIndex, day);
            const isSoldOut = status === "soldout";

            // Determine interactive cell styling
            let cellBg = "bg-white hover:bg-slate-50";
            let textColor = "text-slate-900";
            let priceColor = "text-slate-400";
            let metaColor = "text-slate-400";

            if (isCheckIn || isCheckOut) {
              cellBg = "bg-[#143AA2] text-white shadow-sm z-10";
              textColor = "text-white";
              priceColor = "text-white/90";
              metaColor = "text-white/80";
            } else if (isInRange) {
              cellBg = "bg-[#EAF0FC] text-[#143AA2]";
              textColor = "text-[#143AA2]";
              priceColor = "text-[#143AA2]/80";
              metaColor = "text-[#143AA2]/70";
            } else if (status === "green") {
              cellBg = "bg-[#E8F8F0] hover:bg-[#D7F3E4]";
              textColor = "text-emerald-700";
              priceColor = "text-emerald-700 font-bold";
              metaColor = "text-emerald-600/80";
            } else if (status === "amber") {
              cellBg = "bg-[#FEF6E9] hover:bg-[#FDEED5]";
              textColor = "text-amber-800";
              priceColor = "text-amber-800 font-bold";
              metaColor = "text-amber-700/80";
            } else if (status === "soldout") {
              cellBg = "bg-[#FEECEC]";
              textColor = "text-rose-600";
              priceColor = "text-transparent";
              metaColor = "text-rose-400";
            } else if (status === "cyan") {
              cellBg = "bg-[#EDF7FF] hover:bg-[#DCF0FF]";
              textColor = "text-sky-700";
              priceColor = "text-sky-700 font-bold";
              metaColor = "text-sky-600/80";
            }

            return (
              <button
                key={`day-${day}`}
                type="button"
                disabled={isSoldOut}
                onClick={() => handleDateSelect(year, monthIndex, day)}
                onMouseEnter={() => handleDateHover(year, monthIndex, day)}
                className={`h-[62px] sm:h-[70px] p-1 sm:p-1.5 flex flex-col justify-between items-stretch transition-colors cursor-pointer border-none select-none text-left ${cellBg} ${
                  isSoldOut ? "cursor-not-allowed opacity-90" : "active:scale-98"
                }`}
              >
                {/* Top Row: Weather + Temp */}
                <div className="flex items-center justify-between w-full px-0.5 text-[9px] sm:text-[10px] leading-none font-medium">
                  <span className={metaColor}>☀️</span>
                  <span className={metaColor}>{temp}</span>
                </div>

                {/* Center Row: Day Number */}
                <div className="flex items-center justify-center w-full my-auto">
                  <span className={`text-xs sm:text-sm font-bold tracking-tight ${textColor} flex items-center gap-0.5`}>
                    {day}
                    {isCheckOut && (
                      <span className="text-[10px] font-bold ml-0.5">›</span>
                    )}
                  </span>
                </div>

                {/* Bottom Row: Price */}
                <div className="w-full text-center leading-none">
                  <span className={`text-[9px] sm:text-[10px] font-medium block truncate ${priceColor}`}>
                    {price || (isSoldOut ? "—" : "32€")}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  const faqItems = [
    {
      q: "Le petit-déjeuner est-il inclus dans la réservation ?",
      a: "Oui, un petit-déjeuner traditionnel djerbien complet (pain tabouna chaud, huile d'olive locale, miel de la région, œufs frais, café/thé et jus d'orange pressé) est servi chaque matin au bord de la piscine.",
    },
    {
      q: "Comment s'organise l'arrivée et le départ ?",
      a: "L'enregistrement s'effectue à partir de 14h00 et le départ avant 11h00. Une arrivée autonome par boîte à clé sécurisée est disponible 24h/24 sur demande préalable.",
    },
    {
      q: "La piscine est-elle entièrement privée et sans vis-à-vis ?",
      a: "Absolument. La piscine est située dans le patio intérieur central du Dar, totalement préservée des regards extérieurs selon l'architecture traditionnelle djerbienne.",
    },
    {
      q: "Proposez-vous un service de transfert depuis l'aéroport ?",
      a: "Oui, nous pouvons organiser votre transfert privé aller-retour depuis l'aéroport international de Djerba-Zarzis (à 15 minutes en voiture) sur simple demande après votre réservation.",
    },
    {
      q: "Les animaux de compagnie sont-ils acceptés ?",
      a: "Les animaux de petite et moyenne taille sont les bienvenus avec grand plaisir sur accord préalable auprès de l'hôte.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 font-sans pb-24 lg:pb-16">
      {/* ── 1. FIXED TOP NAVBAR ── */}
      <header className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-2xs">
        <div className="max-w-[1280px] mx-auto px-3 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-2 sm:gap-4">
          {/* Logo */}
          <div className="flex items-center shrink-0">
            <BrandLogo />
          </div>

          {/* Compact Search Widget Pill (Clicking routes to search page) */}
          <Link
            href="/search"
            className="flex items-center bg-white hover:bg-slate-50 border border-slate-200/90 rounded-full px-3 sm:px-4 py-1.5 sm:py-2 cursor-pointer shadow-xs hover:shadow-md transition-all gap-2 sm:gap-3 select-none no-underline text-slate-900 min-w-0 max-w-full"
          >
            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900 min-w-0 shrink">
              <HugeiconsIcon icon={Location01Icon} size={15} className="text-[#3B68EC] shrink-0" />
              <span className="truncate max-w-[90px] sm:max-w-[120px] lg:max-w-[150px] whitespace-nowrap">
                {property.location.split(",")[0]}
              </span>
            </div>
            <div className="h-3.5 w-px bg-slate-200 shrink-0" />
            <div className="hidden sm:flex items-center gap-1.5 text-xs font-semibold text-slate-700 min-w-0 shrink">
              <HugeiconsIcon icon={Calendar03Icon} size={14} className="text-slate-400 shrink-0" />
              <span className="truncate max-w-[90px] lg:max-w-[130px] whitespace-nowrap">12 avr. - 16 avr.</span>
            </div>
            <div className="hidden sm:block h-3.5 w-px bg-slate-200 shrink-0" />
            <div className="hidden md:flex items-center gap-1.5 text-xs font-semibold text-slate-700 min-w-0 shrink">
              <HugeiconsIcon icon={UserGroupIcon} size={14} className="text-slate-400 shrink-0" />
              <span className="truncate max-w-[80px] lg:max-w-[100px] whitespace-nowrap">{guestsCount} voyageurs</span>
            </div>
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#3B68EC] text-white flex items-center justify-center shrink-0 shadow-xs">
              <HugeiconsIcon icon={Search01Icon} size={14} className="shrink-0" />
            </div>
          </Link>

          {/* Right Header Actions */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            <button
              type="button"
              className="hidden lg:flex w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-slate-50 hover:bg-slate-100 items-center justify-center text-slate-700 transition-colors border border-slate-200/80 cursor-pointer"
            >
              <HugeiconsIcon icon={Moon02Icon} size={18} />
            </button>

            <button
              type="button"
              onClick={() => setIsLangModalOpen(true)}
              className="h-9 sm:h-10 px-2 sm:px-3 bg-slate-50 hover:bg-slate-100 rounded-full flex items-center gap-1 text-xs font-bold text-slate-800 border border-slate-200/80 cursor-pointer"
            >
              <img
                src={`https://flagcdn.com/w40/${selectedLang === "FRA" ? "fr" : "gb"}.png`}
                alt="flag"
                className="w-4 h-4 rounded-full object-cover shrink-0"
              />
              <HugeiconsIcon icon={ArrowDown01Icon} size={12} className="hidden sm:block text-slate-400" />
            </button>

            <button
              type="button"
              onClick={() => setIsFavorite(!isFavorite)}
              className={`hidden md:flex w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-slate-50 items-center justify-center transition-colors border border-slate-200/80 cursor-pointer ${
                isFavorite ? "text-red-500 bg-red-50" : "text-slate-700 hover:text-red-500"
              }`}
            >
              <HugeiconsIcon
                icon={FavouriteIcon}
                size={18}
                className={isFavorite ? "fill-red-500 text-red-500" : ""}
              />
            </button>

            <button
              type="button"
              onClick={() => setIsAuthModalOpen(true)}
              className="hidden xl:flex h-10 px-3.5 bg-slate-50 hover:bg-slate-100 text-slate-800 font-bold text-xs rounded-full items-center gap-1.5 transition-all cursor-pointer border border-slate-200/80"
            >
              <div className="w-5 h-5 rounded-full bg-[#3B68EC]/10 text-[#3B68EC] flex items-center justify-center">
                <HugeiconsIcon icon={UserIcon} size={13} />
              </div>
              <span>Sign In</span>
            </button>

            {/* User / Menu Combined Pill Button */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="Menu"
              className="h-9 sm:h-10 px-2.5 sm:px-3 rounded-full bg-slate-50 hover:bg-slate-100 text-slate-800 flex items-center gap-2 cursor-pointer border border-slate-200/90 shadow-2xs hover:shadow-xs transition-all"
            >
              <HugeiconsIcon icon={Menu01Icon} size={16} />
              <div className="w-6 h-6 rounded-full bg-[#3B68EC] text-white flex items-center justify-center text-[10px] font-bold shadow-xs">
                <HugeiconsIcon icon={UserIcon} size={13} />
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* ── 2. MAIN CONTAINER (FULL-WIDTH MATCHING MOCKUP) ── */}
      <main className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8 space-y-8">
        
        {/* Top Header Block: Breadcrumbs + Title + Save/Share CTAs */}
        <div>
          <div className="flex flex-wrap items-center justify-between gap-3 pb-3">
            <nav className="flex items-center gap-2 text-xs font-semibold text-slate-500">
              <Link href="/" className="hover:text-slate-900 no-underline text-slate-500">
                Tunisie
              </Link>
              <HugeiconsIcon icon={ArrowRight01Icon} size={10} className="text-slate-400" />
              <Link href="/search" className="hover:text-slate-900 no-underline text-slate-500">
                Djerba
              </Link>
              <HugeiconsIcon icon={ArrowRight01Icon} size={10} className="text-slate-400" />
              <span className="text-slate-900 font-bold truncate max-w-[220px] sm:max-w-none">
                {property.name}
              </span>
            </nav>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setIsShareModalOpen(true)}
                className="px-4 py-2 rounded-full bg-white hover:bg-slate-50 border border-slate-200 text-xs font-bold text-slate-700 flex items-center gap-1.5 cursor-pointer shadow-2xs transition-all"
              >
                <HugeiconsIcon icon={Share01Icon} size={15} className="text-slate-500" />
                <span>Partager</span>
              </button>

              <button
                type="button"
                onClick={() => setIsFavorite(!isFavorite)}
                className={`px-4 py-2 rounded-full text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-xs transition-all border-none ${
                  isFavorite ? "bg-red-500 text-white" : "bg-[#3B68EC] hover:bg-[#254EDB] text-white"
                }`}
              >
                <HugeiconsIcon
                  icon={FavouriteIcon}
                  size={15}
                  className={isFavorite ? "fill-white text-white" : "text-white"}
                />
                <span>{isFavorite ? "Enregistré" : "Sauvegarder"}</span>
              </button>
            </div>
          </div>

          <div className="pt-1">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight font-['Bricolage_Grotesk',sans-serif]">
              {property.name}
            </h1>
            <div className="flex flex-wrap items-center gap-3 text-xs text-slate-600 font-semibold mt-2">
              <div className="flex items-center gap-1 text-slate-900 font-extrabold">
                <HugeiconsIcon icon={StarIcon} size={14} className="fill-amber-400 text-amber-400" />
                <span>{property.rating}</span>
                <span className="text-slate-500 font-medium underline cursor-pointer">
                  ({property.reviewsCount} avis vérifiés)
                </span>
              </div>
              <span>•</span>
              <span className="text-slate-500">Superhôte Darbook</span>
              <span>•</span>
              <span className="flex items-center gap-1 text-slate-700 underline cursor-pointer">
                <HugeiconsIcon icon={Location01Icon} size={13} className="text-[#3B68EC]" />
                {property.location} • 800m de la plage
              </span>
            </div>
          </div>
        </div>

        {/* ── 3. 5-PHOTO GALLERY MOSAIC ── */}
        <div className="relative rounded-[28px] overflow-hidden shadow-md grid grid-cols-1 md:grid-cols-4 gap-2 h-[340px] sm:h-[420px] lg:h-[480px]">
          {/* Main Hero Photo (Takes 2 cols) */}
          <div
            onClick={() => {
              setActivePhotoIndex(0);
              setIsGalleryOpen(true);
            }}
            className="md:col-span-2 relative h-full cursor-pointer group overflow-hidden bg-slate-100"
          >
            <img
              src={toImgSrc(property.photos[0] || imgHotelCard)}
              alt="Main stay"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-xs px-3 py-1.5 rounded-full text-xs font-extrabold text-slate-900 shadow-sm flex items-center gap-1.5">
              <HugeiconsIcon icon={StarIcon} size={13} className="fill-amber-400 text-amber-400" />
              <span>Coup de cœur voyageurs</span>
            </div>
            <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-xs text-white px-3 py-1 rounded-full text-[11px] font-bold flex items-center gap-1.5">
              <HugeiconsIcon icon={Image01Icon} size={13} className="text-white" />
              <span>1/14 Photos</span>
            </div>
          </div>

          {/* Sub Photos (2x2 grid) */}
          <div className="hidden md:grid col-span-2 grid-cols-2 gap-2 h-full">
            {property.photos.slice(1, 5).map((photo: any, idx: number) => (
              <div
                key={idx}
                onClick={() => {
                  setActivePhotoIndex(idx + 1);
                  setIsGalleryOpen(true);
                }}
                className="relative h-full cursor-pointer group overflow-hidden bg-slate-100"
              >
                <img
                  src={toImgSrc(photo)}
                  alt={`Stay detail ${idx + 1}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            ))}
          </div>

          {/* Show All Photos Button */}
          <button
            type="button"
            onClick={() => setIsGalleryOpen(true)}
            className="absolute bottom-4 right-4 bg-white/95 hover:bg-white text-slate-900 px-4 py-2 rounded-xl text-xs font-bold shadow-lg border border-slate-200 flex items-center gap-2 cursor-pointer transition-all hover:scale-105 active:scale-95"
          >
            <HugeiconsIcon icon={Image01Icon} size={16} className="text-slate-700" />
            <span>Afficher toutes les photos (14)</span>
          </button>
        </div>

        {/* ── 4. HOST & SUMMARY OVERVIEW CARD (MATCHING MOCKUP) ── */}
        <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-2xs">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-slate-100">
            <div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight font-['Bricolage_Grotesk',sans-serif]">
                Logement entier hébergé par Yassine & Amira
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 font-semibold mt-1">
                8 voyageurs · 4 chambres · 4 lits · 3 salles de bain · 250 m²
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
                  alt="Host"
                  className="w-12 h-12 rounded-full object-cover border-2 border-[#3B68EC]"
                />
                <div className="absolute -bottom-1 -right-1 bg-[#3B68EC] text-white p-0.5 rounded-full">
                  <HugeiconsIcon icon={CheckmarkCircle01Icon} size={11} />
                </div>
              </div>
              <div>
                <p className="text-xs font-bold text-slate-900">Yassine & Amira</p>
                <p className="text-[11px] text-slate-500 font-medium">Superhôte • 4 ans d'expérience</p>
              </div>
            </div>
          </div>

          {/* Badges Row */}
          <div className="flex flex-wrap items-center gap-2.5 py-6 border-b border-slate-100">
            <span className="px-3 py-1.5 rounded-xl bg-blue-50 text-[#3B68EC] font-bold text-xs flex items-center gap-1.5">
              <HugeiconsIcon icon={BeachIcon} size={15} />
              <span>Front de mer</span>
            </span>
            <span className="px-3 py-1.5 rounded-xl bg-blue-50 text-[#3B68EC] font-bold text-xs flex items-center gap-1.5">
              <HugeiconsIcon icon={SwimmingIcon} size={15} />
              <span>Piscine privée au patio</span>
            </span>
            <span className="px-3 py-1.5 rounded-xl bg-slate-100 text-slate-700 font-bold text-xs flex items-center gap-1.5">
              <HugeiconsIcon icon={Wifi01Icon} size={15} />
              <span>Wifi fibre optique (95 Mbit/s)</span>
            </span>
            <span className="px-3 py-1.5 rounded-xl bg-slate-100 text-slate-700 font-bold text-xs flex items-center gap-1.5">
              <HugeiconsIcon icon={SnowIcon} size={15} />
              <span>Climatisation réversible</span>
            </span>
            <span className="px-3 py-1.5 rounded-xl bg-slate-100 text-slate-700 font-bold text-xs flex items-center gap-1.5">
              <HugeiconsIcon icon={Restaurant01Icon} size={15} />
              <span>Petit-déjeuner djerbien inclus</span>
            </span>
          </div>

          {/* Editorial Description */}
          <div className="pt-6">
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
              Niché au cœur du village artistique et historique d'Erriadh (célèbre pour le musée à ciel ouvert Djerbahood), ce Dar traditionnel de charme a été entièrement restauré dans le respect de l'art architectural djerbien. Entre voûtes en pierre, chaux blanche immaculée, patio arboré et solarium panoramique sur le toit, vous profiterez d'un havre de sérénité absolue.
            </p>
            <button
              type="button"
              className="mt-3 text-xs font-bold text-[#3B68EC] hover:underline cursor-pointer border-none bg-transparent p-0 flex items-center gap-1"
            >
              <span>En savoir plus sur le logement</span>
              <HugeiconsIcon icon={ArrowRight01Icon} size={12} />
            </button>
          </div>
        </section>

        {/* ── 5. AVAILABILITY & INTERACTIVE DUAL-MONTH CALENDAR (EXACT MATCHING MOCKUP) ── */}
        <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-2xs space-y-6">
          {/* Header Title */}
          <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 font-['Bricolage_Grotesk',sans-serif]">
            Availibility
          </h3>

          {/* Top Switcher Tabs */}
          <div className="bg-slate-100/90 p-1.5 rounded-2xl flex items-center gap-2">
            <button
              type="button"
              onClick={() => setCalendarViewTab("calendar")}
              className={`flex-1 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-extrabold transition-all cursor-pointer border-none text-center ${
                calendarViewTab === "calendar"
                  ? "bg-white text-slate-900 shadow-xs border border-slate-200/80"
                  : "text-slate-600 hover:text-slate-900 bg-transparent"
              }`}
            >
              Availability calendar
            </button>
            <button
              type="button"
              onClick={() => setCalendarViewTab("room")}
              className={`flex-1 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-extrabold transition-all cursor-pointer border-none text-center ${
                calendarViewTab === "room"
                  ? "bg-white text-slate-900 shadow-xs border border-slate-200/80"
                  : "text-slate-600 hover:text-slate-900 bg-transparent"
              }`}
            >
              Room availability view
            </button>
          </div>

          {calendarViewTab === "calendar" ? (
            <div className="space-y-6">
              {/* Selected Stay Sub-header & Presets */}
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h4 className="text-lg sm:text-xl font-extrabold text-slate-900 font-['Bricolage_Grotesk',sans-serif]">
                    {isPickingCheckOut && !hoveredDate
                      ? "Sélectionnez votre date de départ"
                      : `${nightsCount} nuits à ${property.name}`}
                  </h4>
                  <p className="text-xs sm:text-sm font-medium text-slate-500 mt-0.5">
                    {checkInDate && checkOutDate
                      ? `${formatDateLabel(checkInDate)} - ${formatDateLabel(checkOutDate)}`
                      : isPickingCheckOut && checkInDate
                      ? `Arrivée : ${formatDateLabel(checkInDate)} · Cliquez sur votre date de fin`
                      : "Sélectionnez vos dates d'arrivée et de départ"}
                  </p>
                </div>

                {/* Quick Duration Presets */}
                <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                  {[
                    { label: "3 nuits", days: 3 },
                    { label: "4 nuits", days: 4 },
                    { label: "7 nuits", days: 7 },
                    { label: "14 nuits", days: 14 },
                  ].map((preset) => (
                    <button
                      key={preset.label}
                      type="button"
                      onClick={() => handleApplyPreset(preset.days)}
                      className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer border ${
                        nightsCount === preset.days && checkOutDate
                          ? "bg-[#3B68EC] text-white border-[#3B68EC] shadow-xs"
                          : "bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200"
                      }`}
                    >
                      {preset.label}
                    </button>
                  ))}
                  {(checkInDate || checkOutDate) && (
                    <button
                      type="button"
                      onClick={handleClearDates}
                      className="px-2.5 py-1.5 rounded-full text-xs font-semibold text-slate-500 hover:text-slate-900 bg-transparent border-none cursor-pointer underline"
                    >
                      Effacer
                    </button>
                  )}
                </div>
              </div>

              {/* Navigation Arrows & Dual Month Calendar */}
              <div className="relative pt-1">
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
                    className="w-9 h-9 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-700 transition-colors cursor-pointer border-none text-lg"
                  >
                    <HugeiconsIcon icon={ArrowLeft01Icon} size={18} />
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
                    className="w-9 h-9 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-700 transition-colors cursor-pointer border-none text-lg"
                  >
                    <HugeiconsIcon icon={ArrowRight01Icon} size={18} />
                  </button>
                </div>

                <div className="flex flex-col lg:flex-row gap-8 pt-1">
                  {renderMonthGrid(calendarYear, calendarMonth)}
                  <div className="hidden lg:block flex-1">
                    {renderMonthGrid(
                      calendarMonth === 11 ? calendarYear + 1 : calendarYear,
                      calendarMonth === 11 ? 0 : calendarMonth + 1
                    )}
                  </div>
                </div>
              </div>

              {/* Bottom Legend & CTA Button */}
              <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-slate-100">
                <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-xs font-semibold text-slate-600">
                  <div className="flex items-center gap-2">
                    <div className="w-3.5 h-3.5 rounded-full bg-[#FCD7D7]" />
                    <span>Sold out</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3.5 h-3.5 rounded-full bg-[#D4F4E2]" />
                    <span>Available</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3.5 h-3.5 rounded-full bg-[#D6EDFF]" />
                    <span>Min stay</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3.5 h-3.5 rounded-full bg-[#FAE7C8]" />
                    <span>Promo</span>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-right hidden sm:block">
                    <p className="text-xs text-slate-400 font-medium">Total hébergement ({nightsCount} nuits)</p>
                    <p className="text-base font-extrabold text-slate-900 font-['Bricolage_Grotesk',sans-serif]">
                      {totalAccommodation} DT
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsBookSuccessModalOpen(true)}
                    className="px-6 sm:px-8 py-3 bg-[#3B68EC] hover:bg-[#254EDB] text-white font-extrabold text-xs sm:text-sm rounded-xl transition-all cursor-pointer border-none shadow-xs hover:scale-105 active:scale-95"
                  >
                    Rechercher pour ces dates ({nightsCount} nuits)
                  </button>
                </div>
              </div>
            </div>
          ) : (
            /* Room availability view */
            <div className="space-y-4 pt-2">
              <div
                onClick={() => setSelectedRoomOption("room1")}
                className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                  selectedRoomOption === "room1"
                    ? "border-[#3B68EC] bg-blue-50/50 shadow-xs"
                    : "bg-slate-50 hover:bg-slate-100/70 border-slate-200/80"
                }`}
              >
                <div>
                  <h5 className="font-bold text-sm text-slate-900">Suite Royale Vue Patio</h5>
                  <p className="text-xs text-slate-500">2 personnes • Grand lit King size • 190 DT / nuit</p>
                </div>
                <button
                  type="button"
                  className={`px-4 py-1.5 text-xs font-bold rounded-full transition-all border-none cursor-pointer ${
                    selectedRoomOption === "room1"
                      ? "bg-[#3B68EC] text-white shadow-xs"
                      : "bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
                  }`}
                >
                  {selectedRoomOption === "room1" ? "Sélectionné ✓" : "Choisir cette chambre"}
                </button>
              </div>

              <div
                onClick={() => setSelectedRoomOption("suite")}
                className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                  selectedRoomOption === "suite"
                    ? "border-[#3B68EC] bg-blue-50/50 shadow-xs"
                    : "bg-slate-50 hover:bg-slate-100/70 border-slate-200/80"
                }`}
              >
                <div>
                  <h5 className="font-bold text-sm text-slate-900">Suite Traditionnelle Riad</h5>
                  <p className="text-xs text-slate-500">2 personnes • Patio privatif • 280 DT / nuit</p>
                </div>
                <button
                  type="button"
                  className={`px-4 py-1.5 text-xs font-bold rounded-full transition-all border-none cursor-pointer ${
                    selectedRoomOption === "suite"
                      ? "bg-[#3B68EC] text-white shadow-xs"
                      : "bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
                  }`}
                >
                  {selectedRoomOption === "suite" ? "Sélectionné ✓" : "Choisir cette suite"}
                </button>
              </div>

              <div
                onClick={() => setSelectedRoomOption("entire")}
                className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                  selectedRoomOption === "entire"
                    ? "border-[#3B68EC] bg-blue-50/50 shadow-xs"
                    : "bg-slate-50 hover:bg-slate-100/70 border-slate-200/80"
                }`}
              >
                <div>
                  <h5 className="font-bold text-sm text-slate-900">Logement Entier (Dar complet)</h5>
                  <p className="text-xs text-slate-500">8 personnes • 4 chambres • Piscine exclusive • {property.priceNum} DT / nuit</p>
                </div>
                <button
                  type="button"
                  className={`px-4 py-1.5 text-xs font-bold rounded-full transition-all border-none cursor-pointer ${
                    selectedRoomOption === "entire"
                      ? "bg-[#3B68EC] text-white shadow-xs"
                      : "bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
                  }`}
                >
                  {selectedRoomOption === "entire" ? "Sélectionné ✓" : "Choisir le logement entier"}
                </button>
              </div>
            </div>
          )}
        </section>

        {/* ── 6. SELECT YOUR ROOM / STAY OPTIONS (MATCHING MOCKUP) ── */}
        <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-2xs space-y-6">
          <div>
            <h3 className="text-xl font-extrabold text-slate-900 font-['Bricolage_Grotesk',sans-serif]">
              Choisissez votre hébergement
            </h3>
            <p className="text-xs text-slate-500 font-medium mt-0.5">
              Tarifs calculés pour 2 voyageurs, 4 nuits (taxes et frais de service inclus)
            </p>
          </div>

          <div className="space-y-4">
            {/* Card 1: Suite Royale Vue Mer / Patio */}
            <div
              onClick={() => setSelectedRoomOption("room1")}
              className={`p-5 rounded-2xl border transition-all cursor-pointer flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 ${
                selectedRoomOption === "room1"
                  ? "border-[#3B68EC] bg-blue-50/40 ring-2 ring-[#3B68EC]/20 shadow-xs"
                  : "border-slate-200 bg-white hover:bg-slate-50"
              }`}
            >
              <div className="flex items-start gap-4 min-w-0 flex-1">
                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden bg-slate-100 shrink-0">
                  <img src={toImgSrc(imgHotelCard2)} alt="Suite Royale" className="w-full h-full object-cover" />
                </div>
                <div className="space-y-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h4 className="text-base font-extrabold text-slate-900 font-['Bricolage_Grotesk',sans-serif]">
                      Suite Royale Vue Patio
                    </h4>
                    <span className="px-2 py-0.5 rounded-[6px] bg-blue-100 text-[#3B68EC] text-[10px] font-bold">
                      Coup de cœur
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 font-medium">
                    1 grand lit King size • Max 2 personnes • Salle de bain en marbre • Terrasse privative
                  </p>
                  <div className="flex flex-wrap gap-2 pt-1 text-[11px] text-emerald-700 font-semibold">
                    <span className="flex items-center gap-1"><HugeiconsIcon icon={Tick01Icon} size={13} className="text-emerald-600" /> Petit-déjeuner inclus</span>
                    <span className="flex items-center gap-1"><HugeiconsIcon icon={Tick01Icon} size={13} className="text-emerald-600" /> Annulation flexible</span>
                    <span className="flex items-center gap-1"><HugeiconsIcon icon={Tick01Icon} size={13} className="text-emerald-600" /> Wifi fibre optique</span>
                  </div>
                </div>
              </div>

              <div className="flex lg:flex-col items-center lg:items-end justify-between w-full lg:w-auto shrink-0 pt-3 lg:pt-0 border-t lg:border-t-0 border-slate-100">
                <div className="text-left lg:text-right">
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-xs text-slate-400 line-through font-semibold">240 DT</span>
                    <span className="text-xl font-extrabold text-slate-900 font-['Bricolage_Grotesk',sans-serif]">190 DT</span>
                    <span className="text-xs text-slate-500 font-medium"> / nuit</span>
                  </div>
                  <span className="text-[11px] text-slate-500 font-medium">Total 4 nuits : 760 DT</span>
                </div>
                <button
                  type="button"
                  className={`mt-2 px-5 py-2 rounded-full text-xs font-bold transition-all border-none cursor-pointer flex items-center gap-1 ${
                    selectedRoomOption === "room1"
                      ? "bg-[#3B68EC] text-white shadow-xs"
                      : "bg-slate-100 text-slate-800 hover:bg-slate-200"
                  }`}
                >
                  <span>{selectedRoomOption === "room1" ? "Sélectionné" : "Choisir"}</span>
                  {selectedRoomOption === "room1" && <HugeiconsIcon icon={Tick01Icon} size={13} />}
                </button>
              </div>
            </div>

            {/* Card 2: Suite Traditionnelle Riad */}
            <div
              onClick={() => setSelectedRoomOption("suite")}
              className={`p-5 rounded-2xl border transition-all cursor-pointer flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 ${
                selectedRoomOption === "suite"
                  ? "border-[#3B68EC] bg-blue-50/40 ring-2 ring-[#3B68EC]/20 shadow-xs"
                  : "border-slate-200 bg-white hover:bg-slate-50"
              }`}
            >
              <div className="flex items-start gap-4 min-w-0 flex-1">
                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden bg-slate-100 shrink-0">
                  <img src={toImgSrc(imgHotelCard1)} alt="Suite Riad" className="w-full h-full object-cover" />
                </div>
                <div className="space-y-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h4 className="text-base font-extrabold text-slate-900 font-['Bricolage_Grotesk',sans-serif]">
                      Suite Traditionnelle Riad
                    </h4>
                    <span className="px-2 py-0.5 rounded-[6px] bg-purple-100 text-purple-700 text-[10px] font-bold">
                      Suite de charme
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 font-medium">
                    1 lit King size • Max 2 personnes • Patio privatif • Accès direct piscine
                  </p>
                  <div className="flex flex-wrap gap-2 pt-1 text-[11px] text-emerald-700 font-semibold">
                    <span className="flex items-center gap-1"><HugeiconsIcon icon={Tick01Icon} size={13} className="text-emerald-600" /> Petit-déjeuner djerbien inclus</span>
                    <span className="flex items-center gap-1"><HugeiconsIcon icon={Tick01Icon} size={13} className="text-emerald-600" /> Accès spa & hammam</span>
                    <span className="flex items-center gap-1"><HugeiconsIcon icon={Tick01Icon} size={13} className="text-emerald-600" /> Annulation gratuite</span>
                  </div>
                </div>
              </div>

              <div className="flex lg:flex-col items-center lg:items-end justify-between w-full lg:w-auto shrink-0 pt-3 lg:pt-0 border-t lg:border-t-0 border-slate-100">
                <div className="text-left lg:text-right">
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-xl font-extrabold text-slate-900 font-['Bricolage_Grotesk',sans-serif]">280 DT</span>
                    <span className="text-xs text-slate-500 font-medium"> / nuit</span>
                  </div>
                  <span className="text-[11px] text-slate-500 font-medium">Total 4 nuits : 1,120 DT</span>
                </div>
                <button
                  type="button"
                  className={`mt-2 px-5 py-2 rounded-full text-xs font-bold transition-all border-none cursor-pointer flex items-center gap-1 ${
                    selectedRoomOption === "suite"
                      ? "bg-[#3B68EC] text-white shadow-xs"
                      : "bg-slate-100 text-slate-800 hover:bg-slate-200"
                  }`}
                >
                  <span>{selectedRoomOption === "suite" ? "Sélectionné" : "Choisir"}</span>
                  {selectedRoomOption === "suite" && <HugeiconsIcon icon={Tick01Icon} size={13} />}
                </button>
              </div>
            </div>

            {/* Card 3: Logement Entier (Dar complet) */}
            <div
              onClick={() => setSelectedRoomOption("entire")}
              className={`p-5 rounded-2xl border transition-all cursor-pointer flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 ${
                selectedRoomOption === "entire"
                  ? "border-[#3B68EC] bg-blue-50/40 ring-2 ring-[#3B68EC]/20 shadow-xs"
                  : "border-slate-200 bg-white hover:bg-slate-50"
              }`}
            >
              <div className="flex items-start gap-4 min-w-0 flex-1">
                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden bg-slate-100 shrink-0">
                  <img src={toImgSrc(property.photos[0])} alt="Dar complet" className="w-full h-full object-cover" />
                </div>
                <div className="space-y-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h4 className="text-base font-extrabold text-slate-900 font-['Bricolage_Grotesk',sans-serif]">
                      Logement Entier (Dar complet privatif)
                    </h4>
                    <span className="px-2 py-0.5 rounded-[6px] bg-emerald-100 text-emerald-700 text-[10px] font-bold">
                      Exclusivité totale
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 font-medium">
                    3 chambres • 3 lits • Max 6 personnes • Piscine exclusive sans vis-à-vis • Cuisine équipée
                  </p>
                  <div className="flex flex-wrap gap-2 pt-1 text-[11px] text-emerald-700 font-semibold">
                    <span className="flex items-center gap-1"><HugeiconsIcon icon={Tick01Icon} size={13} className="text-emerald-600" /> Maison entière privatisée</span>
                    <span className="flex items-center gap-1"><HugeiconsIcon icon={Tick01Icon} size={13} className="text-emerald-600" /> Petit-déjeuner pour tous</span>
                    <span className="flex items-center gap-1"><HugeiconsIcon icon={Tick01Icon} size={13} className="text-emerald-600" /> Navette aéroport offerte</span>
                  </div>
                </div>
              </div>

              <div className="flex lg:flex-col items-center lg:items-end justify-between w-full lg:w-auto shrink-0 pt-3 lg:pt-0 border-t lg:border-t-0 border-slate-100">
                <div className="text-left lg:text-right">
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-xl font-extrabold text-slate-900 font-['Bricolage_Grotesk',sans-serif]">{property.priceNum} DT</span>
                    <span className="text-xs text-slate-500 font-medium"> / nuit</span>
                  </div>
                  <span className="text-[11px] text-slate-500 font-medium">Total 4 nuits : {property.priceNum * 4} DT</span>
                </div>
                <button
                  type="button"
                  className={`mt-2 px-5 py-2 rounded-full text-xs font-bold transition-all border-none cursor-pointer flex items-center gap-1 ${
                    selectedRoomOption === "entire"
                      ? "bg-[#3B68EC] text-white shadow-xs"
                      : "bg-slate-100 text-slate-800 hover:bg-slate-200"
                  }`}
                >
                  <span>{selectedRoomOption === "entire" ? "Sélectionné" : "Choisir"}</span>
                  {selectedRoomOption === "entire" && <HugeiconsIcon icon={Tick01Icon} size={13} />}
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* ── 7. AMENITIES COMPREHENSIVE 5-COLUMN GRID ── */}
        <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-2xs space-y-6">
          <div>
            <h3 className="text-xl font-extrabold text-slate-900 font-['Bricolage_Grotesk',sans-serif]">
              Ce que propose cet hébergement
            </h3>
            <p className="text-xs text-slate-500 font-medium mt-0.5">
              Équipements et services haut de gamme inclus dans votre séjour
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 text-xs text-slate-700">
            <div className="space-y-3">
              <h4 className="font-extrabold text-slate-900 flex items-center gap-2 text-xs">
                <HugeiconsIcon icon={SwimmingIcon} size={16} className="text-[#3B68EC]" />
                Piscine & Spa
              </h4>
              <ul className="space-y-2 text-slate-600 font-medium">
                <li className="flex items-center gap-2"><HugeiconsIcon icon={Tick01Icon} size={14} className="text-emerald-500" />Piscine chauffée</li>
                <li className="flex items-center gap-2"><HugeiconsIcon icon={Tick01Icon} size={14} className="text-emerald-500" />Transats & serviettes</li>
                <li className="flex items-center gap-2"><HugeiconsIcon icon={Tick01Icon} size={14} className="text-emerald-500" />Solarium panoramique</li>
                <li className="flex items-center gap-2"><HugeiconsIcon icon={Tick01Icon} size={14} className="text-emerald-500" />Patio ombragé</li>
              </ul>
            </div>

            <div className="space-y-3">
              <h4 className="font-extrabold text-slate-900 flex items-center gap-2 text-xs">
                <HugeiconsIcon icon={BedDoubleIcon} size={16} className="text-[#3B68EC]" />
                Chambre & Bain
              </h4>
              <ul className="space-y-2 text-slate-600 font-medium">
                <li className="flex items-center gap-2"><HugeiconsIcon icon={Tick01Icon} size={14} className="text-emerald-500" />Draps en lin biologique</li>
                <li className="flex items-center gap-2"><HugeiconsIcon icon={Tick01Icon} size={14} className="text-emerald-500" />Cintres & dressing</li>
                <li className="flex items-center gap-2"><HugeiconsIcon icon={Tick01Icon} size={14} className="text-emerald-500" />Sèche-cheveux pro</li>
                <li className="flex items-center gap-2"><HugeiconsIcon icon={Tick01Icon} size={14} className="text-emerald-500" />Produits d'accueil bio</li>
              </ul>
            </div>

            <div className="space-y-3">
              <h4 className="font-extrabold text-slate-900 flex items-center gap-2 text-xs">
                <HugeiconsIcon icon={Restaurant01Icon} size={16} className="text-[#3B68EC]" />
                Restauration
              </h4>
              <ul className="space-y-2 text-slate-600 font-medium">
                <li className="flex items-center gap-2"><HugeiconsIcon icon={Tick01Icon} size={14} className="text-emerald-500" />Petit-déjeuner offert</li>
                <li className="flex items-center gap-2"><HugeiconsIcon icon={Tick01Icon} size={14} className="text-emerald-500" />Machine Nespresso</li>
                <li className="flex items-center gap-2"><HugeiconsIcon icon={Tick01Icon} size={14} className="text-emerald-500" />Cuisine entièrement équipée</li>
                <li className="flex items-center gap-2"><HugeiconsIcon icon={Tick01Icon} size={14} className="text-emerald-500" />Réfrigérateur & congélateur</li>
              </ul>
            </div>

            <div className="space-y-3">
              <h4 className="font-extrabold text-slate-900 flex items-center gap-2 text-xs">
                <HugeiconsIcon icon={Wifi01Icon} size={16} className="text-[#3B68EC]" />
                Connectivité & Travail
              </h4>
              <ul className="space-y-2 text-slate-600 font-medium">
                <li className="flex items-center gap-2"><HugeiconsIcon icon={Tick01Icon} size={14} className="text-emerald-500" />Wifi fibre (95 Mbit/s)</li>
                <li className="flex items-center gap-2"><HugeiconsIcon icon={Tick01Icon} size={14} className="text-emerald-500" />Espace de travail dédié</li>
                <li className="flex items-center gap-2"><HugeiconsIcon icon={Tick01Icon} size={14} className="text-emerald-500" />Smart TV 4K 55"</li>
                <li className="flex items-center gap-2"><HugeiconsIcon icon={Tick01Icon} size={14} className="text-emerald-500" />Enceinte Bluetooth</li>
              </ul>
            </div>

            <div className="space-y-3">
              <h4 className="font-extrabold text-slate-900 flex items-center gap-2 text-xs">
                <HugeiconsIcon icon={Shield01Icon} size={16} className="text-[#3B68EC]" />
                Confort & Sécurité
              </h4>
              <ul className="space-y-2 text-slate-600 font-medium">
                <li className="flex items-center gap-2"><HugeiconsIcon icon={Tick01Icon} size={14} className="text-emerald-500" />Climatisation réversible</li>
                <li className="flex items-center gap-2"><HugeiconsIcon icon={Tick01Icon} size={14} className="text-emerald-500" />Parking privé gratuit</li>
                <li className="flex items-center gap-2"><HugeiconsIcon icon={Tick01Icon} size={14} className="text-emerald-500" />Détecteur de fumée</li>
                <li className="flex items-center gap-2"><HugeiconsIcon icon={Tick01Icon} size={14} className="text-emerald-500" />Coffre-fort individuel</li>
              </ul>
            </div>
          </div>

          <button
            type="button"
            className="mt-4 px-6 py-2.5 rounded-full border border-slate-300 text-xs font-bold text-slate-800 hover:bg-slate-50 transition-all cursor-pointer bg-white"
          >
            Afficher les 38 équipements
          </button>
        </section>

        {/* ── 8. POLICIES, RULES & WEATHER (2x2 GRID MATCHING MOCKUP) ── */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Card 1: House Rules */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-2xs space-y-4">
            <h4 className="font-extrabold text-slate-900 text-base flex items-center gap-2 font-['Bricolage_Grotesk',sans-serif]">
              <HugeiconsIcon icon={Clock01Icon} size={18} className="text-[#3B68EC]" />
              Règlement intérieur & Horaires
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-600 font-medium">
              <li className="flex items-center gap-2.5">
                <HugeiconsIcon icon={Clock01Icon} size={15} className="text-[#3B68EC] shrink-0" />
                <span>Arrivée à partir de 14:00 (arrivée autonome possible)</span>
              </li>
              <li className="flex items-center gap-2.5">
                <HugeiconsIcon icon={Clock01Icon} size={15} className="text-[#3B68EC] shrink-0" />
                <span>Départ avant 11:00</span>
              </li>
              <li className="flex items-center gap-2.5">
                <HugeiconsIcon icon={Cancel01Icon} size={15} className="text-rose-500 shrink-0" />
                <span>Logement non-fumeur à l'intérieur</span>
              </li>
              <li className="flex items-center gap-2.5">
                <HugeiconsIcon icon={TreesIcon} size={15} className="text-emerald-600 shrink-0" />
                <span>Animaux de compagnie acceptés sur demande</span>
              </li>
            </ul>
          </div>

          {/* Card 2: Health & Safety */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-2xs space-y-4">
            <h4 className="font-extrabold text-slate-900 text-base flex items-center gap-2 font-['Bricolage_Grotesk',sans-serif]">
              <HugeiconsIcon icon={Shield01Icon} size={18} className="text-[#3B68EC]" />
              Santé & Sécurité
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-600 font-medium">
              <li className="flex items-center gap-2.5">
                <HugeiconsIcon icon={SparklesIcon} size={15} className="text-[#3B68EC] shrink-0" />
                <span>Protocole de nettoyage et désinfection renforcé</span>
              </li>
              <li className="flex items-center gap-2.5">
                <HugeiconsIcon icon={Shield01Icon} size={15} className="text-amber-500 shrink-0" />
                <span>Détecteur de fumée et monoxyde de carbone certifiés</span>
              </li>
              <li className="flex items-center gap-2.5">
                <HugeiconsIcon icon={CheckmarkCircle01Icon} size={15} className="text-emerald-500 shrink-0" />
                <span>Trousse de premiers secours à disposition</span>
              </li>
              <li className="flex items-center gap-2.5">
                <HugeiconsIcon icon={Shield01Icon} size={15} className="text-[#3B68EC] shrink-0" />
                <span>Coffre-fort numérique dans chaque suite</span>
              </li>
            </ul>
          </div>

          {/* Card 3: Cancellation Policy */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-2xs space-y-4">
            <h4 className="font-extrabold text-slate-900 text-base flex items-center gap-2 font-['Bricolage_Grotesk',sans-serif]">
              <HugeiconsIcon icon={Cancel01Icon} size={18} className="text-[#3B68EC]" />
              Politique d'annulation flexible
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed font-medium">
              Annulation 100% gratuite jusqu'à 48 heures avant la date d'arrivée. Remboursement intégral garanti sans frais cachés.
            </p>
            <div className="bg-emerald-50 text-emerald-700 px-3 py-1.5 rounded-xl text-xs font-bold inline-flex items-center gap-1">
              <HugeiconsIcon icon={Tick01Icon} size={13} className="text-emerald-600" />
              <span>Remboursement 100% garanti</span>
            </div>
          </div>

          {/* Card 4: Weather Widget */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-2xs space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-extrabold text-slate-900 text-base flex items-center gap-2 font-['Bricolage_Grotesk',sans-serif]">
                <HugeiconsIcon icon={Sun01Icon} size={20} className="text-amber-500" />
                <span>Météo & Ensoleillement à Djerba</span>
              </h4>
              <span className="text-xs font-extrabold text-amber-600 bg-amber-50 px-2.5 py-1 rounded-full flex items-center gap-1">
                <HugeiconsIcon icon={Sun01Icon} size={13} />
                <span>26°C Ensoleillé</span>
              </span>
            </div>
            <div className="grid grid-cols-5 gap-2 text-center text-xs">
              <div className="p-2.5 bg-slate-50 rounded-xl">
                <p className="text-[10px] font-bold text-slate-500">Aujourd'hui</p>
                <HugeiconsIcon icon={Sun01Icon} size={20} className="text-amber-500 mx-auto my-1.5" />
                <p className="font-extrabold text-slate-900">26°C</p>
              </div>
              <div className="p-2.5 bg-slate-50 rounded-xl">
                <p className="text-[10px] font-bold text-slate-500">Demain</p>
                <HugeiconsIcon icon={Sun01Icon} size={20} className="text-amber-500/80 mx-auto my-1.5" />
                <p className="font-extrabold text-slate-900">25°C</p>
              </div>
              <div className="p-2.5 bg-slate-50 rounded-xl">
                <p className="text-[10px] font-bold text-slate-500">Mercredi</p>
                <HugeiconsIcon icon={Sun01Icon} size={20} className="text-amber-500 mx-auto my-1.5" />
                <p className="font-extrabold text-slate-900">27°C</p>
              </div>
              <div className="p-2.5 bg-slate-50 rounded-xl">
                <p className="text-[10px] font-bold text-slate-500">Jeudi</p>
                <HugeiconsIcon icon={Sun01Icon} size={20} className="text-amber-500/80 mx-auto my-1.5" />
                <p className="font-extrabold text-slate-900">26°C</p>
              </div>
              <div className="p-2.5 bg-slate-50 rounded-xl">
                <p className="text-[10px] font-bold text-slate-500">Vendredi</p>
                <HugeiconsIcon icon={Sun01Icon} size={20} className="text-amber-500 mx-auto my-1.5" />
                <p className="font-extrabold text-slate-900">28°C</p>
              </div>
            </div>
          </div>
        </section>

        {/* ── 9. GUEST REVIEWS & RATINGS BLOCK ── */}
        <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-2xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
            <div className="flex items-center gap-3.5">
              <div className="w-14 h-14 rounded-2xl bg-amber-50 text-amber-500 flex items-center justify-center shadow-2xs">
                <HugeiconsIcon icon={StarIcon} size={26} className="fill-amber-400 text-amber-400" />
              </div>
              <div>
                <h3 className="text-2xl font-extrabold text-slate-900 font-['Bricolage_Grotesk',sans-serif]">
                  {property.rating} / 5 • Exceptionnel
                </h3>
                <p className="text-xs text-slate-500 font-medium mt-0.5">
                  Basé sur {property.reviewsCount} avis voyageurs vérifiés Darbook
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="bg-emerald-50 text-emerald-700 px-3.5 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5">
                <HugeiconsIcon icon={Tick01Icon} size={14} className="text-emerald-600" />
                <span>100% de recommandations</span>
              </span>
            </div>
          </div>

          {/* Rating Progress Bars */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-4 pt-2 pb-6">
            <div>
              <div className="flex justify-between text-xs font-bold text-slate-800 mb-1">
                <span>Propreté irréprochable</span>
                <span>4.9 / 5</span>
              </div>
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500 rounded-full" style={{ width: "98%" }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-bold text-slate-800 mb-1">
                <span>Précision des photos</span>
                <span>4.8 / 5</span>
              </div>
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500 rounded-full" style={{ width: "96%" }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-bold text-slate-800 mb-1">
                <span>Communication & Accueil</span>
                <span>5.0 / 5</span>
              </div>
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500 rounded-full" style={{ width: "100%" }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-bold text-slate-800 mb-1">
                <span>Emplacement & Cadre</span>
                <span>4.9 / 5</span>
              </div>
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500 rounded-full" style={{ width: "98%" }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-bold text-slate-800 mb-1">
                <span>Arrivée autonome</span>
                <span>4.9 / 5</span>
              </div>
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500 rounded-full" style={{ width: "98%" }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-bold text-slate-800 mb-1">
                <span>Rapport qualité-prix</span>
                <span>4.8 / 5</span>
              </div>
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500 rounded-full" style={{ width: "96%" }} />
              </div>
            </div>
          </div>

          {/* Review Cards */}
          <div className="space-y-6 pt-4 border-t border-slate-100">
            <div className="space-y-2.5 p-4 rounded-2xl bg-slate-50/70 border border-slate-100">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80"
                    alt="Karim"
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <h5 className="text-xs font-extrabold text-slate-900">Karim Ben Salem</h5>
                    <p className="text-[11px] text-slate-400">Paris, France • Séjour de 4 nuits en Mars 2026</p>
                  </div>
                </div>
                <div className="flex items-center gap-0.5 text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <HugeiconsIcon key={i} icon={StarIcon} size={13} className="fill-amber-400 text-amber-400" />
                  ))}
                </div>
              </div>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">
                « Séjour absolument exceptionnel. Le Dar est encore plus magnifique en vrai que sur les photos. Le petit-déjeuner au bord de la piscine avec les spécialités locales était un délice chaque matin. Yassine & Amira ont été d'une prévenance rare ! »
              </p>
            </div>

            <div className="space-y-2.5 p-4 rounded-2xl bg-slate-50/70 border border-slate-100">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80"
                    alt="Camille"
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <h5 className="text-xs font-extrabold text-slate-900">Camille Laurent</h5>
                    <p className="text-[11px] text-slate-400">Genève, Suisse • Séjour en famille en Février 2026</p>
                  </div>
                </div>
                <div className="flex items-center gap-0.5 text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <HugeiconsIcon key={i} icon={StarIcon} size={13} className="fill-amber-400 text-amber-400" />
                  ))}
                </div>
              </div>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">
                « L'emplacement à Djerbahood est magique pour flâner à pied entre les fresques et galeries d'art. Tout était d'une propreté irréprochable et la literie est digne d'un palace 5 étoiles. Nous reviendrons sans hésiter ! »
              </p>
            </div>
          </div>

          <button
            type="button"
            className="px-6 py-2.5 rounded-full border border-slate-300 text-xs font-bold text-slate-800 hover:bg-slate-50 transition-all cursor-pointer bg-white"
          >
            Afficher les {property.reviewsCount} avis
          </button>
        </section>

        {/* ── 10. INTERACTIVE MAP & LOCATION BLOCK ── */}
        <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-2xs space-y-6">
          <div>
            <h3 className="text-xl font-extrabold text-slate-900 font-['Bricolage_Grotesk',sans-serif]">
              Emplacement & Environs
            </h3>
            <p className="text-xs text-slate-500 font-medium mt-0.5">
              {property.location} • Erriadh, Djerba
            </p>
          </div>

          <div className="w-full h-[360px] rounded-2xl overflow-hidden shadow-inner border border-slate-200">
            <MapView
              properties={[
                {
                  id: property.id,
                  name: property.name,
                  price: property.price,
                  rating: property.rating,
                  photo: toImgSrc(property.photos[0]),
                  location: property.location,
                  lat: property.lat,
                  lng: property.lng,
                },
              ]}
              hoveredId={property.id}
              onHover={() => {}}
            />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 text-center text-xs">
            <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100 flex flex-col items-center">
              <div className="flex items-center gap-1.5 font-bold text-slate-900 text-sm">
                <HugeiconsIcon icon={PaintBoardIcon} size={16} className="text-[#3B68EC]" />
                <span>Djerbahood</span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">2 min à pied</p>
            </div>
            <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100 flex flex-col items-center">
              <div className="flex items-center gap-1.5 font-bold text-slate-900 text-sm">
                <HugeiconsIcon icon={Building01Icon} size={16} className="text-[#3B68EC]" />
                <span>La Ghriba</span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">5 min en voiture</p>
            </div>
            <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100 flex flex-col items-center">
              <div className="flex items-center gap-1.5 font-bold text-slate-900 text-sm">
                <HugeiconsIcon icon={BeachIcon} size={16} className="text-[#3B68EC]" />
                <span>Plage Sidi Mahrez</span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">10 min en voiture</p>
            </div>
            <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100 flex flex-col items-center">
              <div className="flex items-center gap-1.5 font-bold text-slate-900 text-sm">
                <HugeiconsIcon icon={Airplane01Icon} size={16} className="text-[#3B68EC]" />
                <span>Aéroport Djerba</span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">15 min en taxi</p>
            </div>
          </div>
        </section>

        {/* ── 11. FREQUENTLY ASKED QUESTIONS (ACCORDION) ── */}
        <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-2xs space-y-6">
          <div>
            <h3 className="text-xl font-extrabold text-slate-900 font-['Bricolage_Grotesk',sans-serif]">
              Questions fréquemment posées
            </h3>
            <p className="text-xs text-slate-500 font-medium mt-0.5">
              Tout ce que vous devez savoir avant votre arrivée
            </p>
          </div>

          <div className="divide-y divide-slate-100">
            {faqItems.map((faq, idx) => {
              const isOpen = expandedFaq === idx;
              return (
                <div key={idx} className="py-4">
                  <button
                    type="button"
                    onClick={() => setExpandedFaq(isOpen ? null : idx)}
                    className="w-full flex items-center justify-between text-left font-bold text-sm sm:text-base text-slate-900 hover:text-[#3B68EC] transition-colors cursor-pointer border-none bg-transparent p-0"
                  >
                    <span>{faq.q}</span>
                    <span className={`transition-transform duration-200 text-slate-400 ${isOpen ? "rotate-180 text-[#3B68EC]" : ""}`}>
                      <HugeiconsIcon icon={ArrowDown01Icon} size={18} />
                    </span>
                  </button>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <p className="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed pt-2.5">
                          {faq.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </section>

        {/* ── 12. SIMILAR PROPERTIES CAROUSEL ── */}
        <section className="pt-4 pb-8 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 font-['Bricolage_Grotesk',sans-serif]">
                Logements similaires à Djerba
              </h3>
              <p className="text-xs text-slate-500 font-medium mt-0.5">
                D'autres dars et villas de charme qui pourraient vous plaire
              </p>
            </div>
            <Link
              href="/search"
              className="text-xs font-bold text-[#3B68EC] hover:underline no-underline flex items-center gap-1"
            >
              <span>Voir tout</span>
              <HugeiconsIcon icon={ArrowRight01Icon} size={14} />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.values(PROPERTIES_MAP)
              .filter((p) => p.id !== property.id)
              .slice(0, 3)
              .map((similar) => (
                <Link
                  key={similar.id}
                  href={`/property/${similar.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-2xs hover:shadow-xl transition-all group no-underline text-slate-900 flex flex-col hover:-translate-y-1.5 duration-300"
                >
                  <div className="h-52 w-full relative overflow-hidden bg-slate-100">
                    <img
                      src={toImgSrc(similar.photos[0])}
                      alt={similar.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <span
                      style={{ backgroundColor: similar.typeBg }}
                      className="absolute top-3.5 left-3.5 px-3 py-1 rounded-[10px] text-[11px] font-extrabold text-white uppercase tracking-wide shadow-xs"
                    >
                      {similar.type}
                    </span>
                  </div>
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                    <div>
                      <div className="flex items-center justify-between text-xs mb-1">
                        <span className="text-slate-500 font-semibold truncate">{similar.location.split(",")[0]}</span>
                        <div className="flex items-center gap-1 font-bold text-slate-900 bg-amber-50 px-2 py-0.5 rounded-lg border border-amber-200/60">
                          <HugeiconsIcon icon={StarIcon} size={12} className="fill-amber-400 text-amber-400" />
                          <span>{similar.rating}</span>
                        </div>
                      </div>
                      <h4 className="font-extrabold text-base text-slate-900 truncate group-hover:text-[#3B68EC] transition-colors font-['Bricolage_Grotesk',sans-serif]">
                        {similar.name}
                      </h4>
                    </div>
                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                      <div>
                        <span className="font-extrabold text-lg text-slate-900 font-['Bricolage_Grotesk',sans-serif]">{similar.price}</span>
                        <span className="text-xs text-slate-500 font-medium"> / nuit</span>
                      </div>
                      <span className="px-4 py-1.5 rounded-full bg-[#3B68EC] hover:bg-[#254EDB] text-white text-xs font-bold transition-colors flex items-center gap-1">
                        <span>Voir les détails</span>
                        <HugeiconsIcon icon={ArrowRight01Icon} size={12} />
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
          </div>
        </section>
      </main>

      {/* ── 13. AUTHENTIC DARBOOK DARK FOOTER (MATCHING MOCKUP) ── */}
      <footer className="bg-[#101438] text-white pt-14 pb-12 mt-16 border-t border-white/10">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pb-12 border-b border-white/10">
            {/* Brand Col */}
            <div className="lg:col-span-2 space-y-4">
              <div className="h-[40px] w-auto aspect-[224/44.57] relative shrink-0 block select-none">
                <svg className="w-full h-full block" fill="none" viewBox="0 0 224 44.5742">
                  <path d={svgPaths.p2bca0c0} fill="#547FEE" />
                  <g>
                    <path d={svgPaths.p3d515900} fill="#FFFFFF" />
                    <path d={svgPaths.p1e1c2e00} fill="#FFFFFF" />
                    <path d={svgPaths.p3dbae00} fill="#FFFFFF" />
                    <path d={svgPaths.p1c8f0b80} fill="#FFFFFF" />
                    <path d={svgPaths.p2f5e4000} fill="#FFFFFF" />
                    <path d={svgPaths.p25a54cf0} fill="#FFFFFF" />
                    <path d={svgPaths.p8920900} fill="#FFFFFF" />
                  </g>
                </svg>
              </div>
              <p className="text-xs text-slate-300 max-w-sm leading-relaxed">
                La plateforme de référence pour réserver des hébergements de charme et d'exception à travers toute la Tunisie.
              </p>
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => router.push("/list-your-property")}
                  className="px-5 py-2.5 bg-[#3B68EC] hover:bg-[#254EDB] text-white font-bold text-xs rounded-full cursor-pointer transition-all shadow-md border-none"
                >
                  Devenir hôte Darbook
                </button>
              </div>
            </div>

            {/* Col 2 */}
            <div className="space-y-3">
              <h5 className="text-xs font-extrabold uppercase tracking-wider text-slate-200">Destinations</h5>
              <ul className="space-y-2 text-xs text-slate-300">
                <li><Link href="/search?query=Djerba" className="hover:text-white no-underline text-slate-300">Djerba</Link></li>
                <li><Link href="/search?query=Hammamet" className="hover:text-white no-underline text-slate-300">Hammamet</Link></li>
                <li><Link href="/search?query=Marsa" className="hover:text-white no-underline text-slate-300">La Marsa</Link></li>
                <li><Link href="/search?query=Sousse" className="hover:text-white no-underline text-slate-300">Sousse</Link></li>
                <li><Link href="/search?query=Tozeur" className="hover:text-white no-underline text-slate-300">Tozeur</Link></li>
              </ul>
            </div>

            {/* Col 3 */}
            <div className="space-y-3">
              <h5 className="text-xs font-extrabold uppercase tracking-wider text-slate-200">Expériences</h5>
              <ul className="space-y-2 text-xs text-slate-300">
                <li><Link href="/search?category=pool" className="hover:text-white no-underline text-slate-300">Piscine privée</Link></li>
                <li><Link href="/search?category=seaside" className="hover:text-white no-underline text-slate-300">Bord de mer</Link></li>
                <li><Link href="/search?category=historical" className="hover:text-white no-underline text-slate-300">Dars historiques</Link></li>
                <li><Link href="/search?category=nature" className="hover:text-white no-underline text-slate-300">Nature & Écologie</Link></li>
                <li><Link href="/search?category=romantics" className="hover:text-white no-underline text-slate-300">Séjours romantiques</Link></li>
              </ul>
            </div>

            {/* Col 4 */}
            <div className="space-y-3">
              <h5 className="text-xs font-extrabold uppercase tracking-wider text-slate-200">Assistance & Légal</h5>
              <ul className="space-y-2 text-xs text-slate-300">
                <li><a href="#" className="hover:text-white no-underline text-slate-300">Centre d'aide</a></li>
                <li><a href="#" className="hover:text-white no-underline text-slate-300">Conditions générales</a></li>
                <li><a href="#" className="hover:text-white no-underline text-slate-300">Politique de confidentialité</a></li>
                <li><a href="#" className="hover:text-white no-underline text-slate-300">Garantie Darbook</a></li>
              </ul>
            </div>
          </div>

          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
            <p>© 2026 Darbook Inc. Tous droits réservés.</p>
            <div className="flex items-center gap-4">
              <span>Devise : TND (DT)</span>
              <span>•</span>
              <span>Langue : Français (FR)</span>
            </div>
          </div>
        </div>
      </footer>

      {/* ── 14. FULLSCREEN LIGHTBOX GALLERY MODAL ── */}
      <AnimatePresence>
        {isGalleryOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-black/95 text-white flex flex-col justify-between p-4 sm:p-8"
          >
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-white">{property.name}</span>
                <span className="text-xs text-slate-400">
                  ({activePhotoIndex + 1} / {property.photos.length})
                </span>
              </div>
              <button
                type="button"
                onClick={() => setIsGalleryOpen(false)}
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center cursor-pointer border-none transition-all"
              >
                <HugeiconsIcon icon={Cancel01Icon} size={18} className="text-white" />
              </button>
            </div>

            <div className="flex-1 flex items-center justify-center relative my-4">
              <button
                type="button"
                onClick={() =>
                  setActivePhotoIndex((prev) => (prev > 0 ? prev - 1 : property.photos.length - 1))
                }
                className="absolute left-2 sm:left-4 w-12 h-12 rounded-full bg-white/20 hover:bg-white/40 text-white flex items-center justify-center cursor-pointer border-none transition-all"
              >
                <HugeiconsIcon icon={ArrowLeft01Icon} size={24} className="text-white" />
              </button>

              <img
                src={toImgSrc(property.photos[activePhotoIndex] || imgHotelCard)}
                alt="Fullscreen view"
                className="max-h-[75vh] max-w-full object-contain rounded-2xl shadow-2xl"
              />

              <button
                type="button"
                onClick={() =>
                  setActivePhotoIndex((prev) => (prev < property.photos.length - 1 ? prev + 1 : 0))
                }
                className="absolute right-2 sm:right-4 w-12 h-12 rounded-full bg-white/20 hover:bg-white/40 text-white flex items-center justify-center cursor-pointer border-none transition-all"
              >
                <HugeiconsIcon icon={ArrowRight01Icon} size={24} className="text-white" />
              </button>
            </div>

            {/* Thumbnails Row */}
            <div className="flex items-center justify-center gap-2 overflow-x-auto py-2">
              {property.photos.map((p: any, idx: number) => (
                <div
                  key={idx}
                  onClick={() => setActivePhotoIndex(idx)}
                  className={`w-16 h-12 rounded-lg overflow-hidden cursor-pointer shrink-0 border-2 transition-all ${
                    activePhotoIndex === idx ? "border-[#3B68EC] scale-105" : "border-transparent opacity-50"
                  }`}
                >
                  <img src={toImgSrc(p)} alt="thumb" className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── 15. SHARE MODAL ── */}
      <AnimatePresence>
        {isShareModalOpen && (
          <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl border border-slate-100"
            >
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <h3 className="font-extrabold text-base text-slate-900">Partager cette annonce</h3>
                <button
                  type="button"
                  onClick={() => setIsShareModalOpen(false)}
                  className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-slate-200 border-none cursor-pointer"
                >
                  <HugeiconsIcon icon={Cancel01Icon} size={16} className="text-slate-600" />
                </button>
              </div>

              <div className="flex items-center gap-3 my-5 p-3 bg-slate-50 rounded-2xl border border-slate-200">
                <img
                  src={toImgSrc(property.photos[0])}
                  alt={property.name}
                  className="w-14 h-14 rounded-xl object-cover"
                />
                <div>
                  <h4 className="font-bold text-xs text-slate-900">{property.name}</h4>
                  <p className="text-[11px] text-slate-500 font-medium mt-0.5">{property.location}</p>
                </div>
              </div>

              <button
                type="button"
                onClick={handleShareCopy}
                className="w-full py-3 rounded-xl bg-[#3B68EC] hover:bg-[#254EDB] text-white font-bold text-xs shadow-md transition-all cursor-pointer border-none flex items-center justify-center gap-2"
              >
                <HugeiconsIcon icon={isCopied ? Tick01Icon : Compass01Icon} size={16} />
                <span>{isCopied ? "Lien copié dans le presse-papier !" : "Copier le lien de l'annonce"}</span>
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ── 16. BOOKING CONFIRMATION MODAL ── */}
      <AnimatePresence>
        {isBookSuccessModalOpen && (
          <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl border border-slate-100 text-center"
            >
              <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-4">
                <HugeiconsIcon icon={CheckmarkCircle01Icon} size={36} className="text-emerald-600" />
              </div>
              <h3 className="text-xl font-extrabold text-slate-900 mb-1 font-['Bricolage_Grotesk',sans-serif]">
                Demande de réservation envoyée !
              </h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto mb-6">
                Votre demande pour <strong>{property.name}</strong> du {formatDateLabel(checkInDate)} au {formatDateLabel(checkOutDate)} ({grandTotal} DT) a bien été transmise aux hôtes.
              </p>
              <div className="p-4 bg-blue-50/50 rounded-2xl border border-blue-100 text-left text-xs mb-6 space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-slate-500">Dates :</span>
                  <span className="font-bold text-slate-900">{formatDateLabel(checkInDate)} - {formatDateLabel(checkOutDate)} (4 nuits)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Voyageurs :</span>
                  <span className="font-bold text-slate-900">{guestsCount} adultes</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Total :</span>
                  <span className="font-extrabold text-[#3B68EC]">{grandTotal} DT</span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsBookSuccessModalOpen(false)}
                className="w-full py-3.5 rounded-xl bg-[#3B68EC] hover:bg-[#254EDB] text-white font-bold text-xs shadow-md border-none cursor-pointer"
              >
                Fermer
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ── 17. MOBILE BOTTOM STICKY BOOKING BAR (< lg) ── */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-slate-200 px-4 py-3 flex items-center justify-between shadow-2xl">
        <div>
          <div>
            <span className="text-base font-black text-slate-900">{basePricePerNight} DT</span>
            <span className="text-xs text-slate-500 font-semibold"> / nuit</span>
          </div>
          <span className="text-[11px] text-[#3B68EC] font-bold underline">{formatDateLabel(checkInDate)} - {formatDateLabel(checkOutDate)}</span>
        </div>

        <button
          type="button"
          onClick={() => setIsBookSuccessModalOpen(true)}
          className="px-6 py-3 rounded-full bg-[#3B68EC] text-white font-bold text-xs shadow-md border-none cursor-pointer"
        >
          Réserver
        </button>
      </div>

      {/* Global Modals & Full Page Mobile Menu */}
      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
      <LanguageCurrencyModal
        isOpen={isLangModalOpen}
        onClose={() => setIsLangModalOpen(false)}
        selectedLanguage={selectedLang}
        onSelectLanguage={setSelectedLang}
        selectedCurrency="DT"
        onSelectCurrency={() => {}}
      />
      <FullPageMobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        onOpenAuth={() => setIsAuthModalOpen(true)}
        onOpenLang={() => setIsLangModalOpen(true)}
        selectedLang={selectedLang}
        selectedCurrency="DT"
        favoritesCount={isFavorite ? 1 : 0}
      />
    </div>
  );
}
