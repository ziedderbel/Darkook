"use client";

import { useState, useMemo, useEffect, useRef, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Link, useRouter } from "@/i18n/navigation";
import { motion, AnimatePresence } from "motion/react";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Search01Icon,
  FilterIcon,
  Location01Icon,
  House01Icon,
  StarIcon,
  FavouriteIcon,
  Cancel01Icon,
  Menu01Icon,
  GlobalIcon,
  UserIcon,
  BedDoubleIcon,
  UserGroupIcon,
  Calendar03Icon,
  ArrowLeft01Icon,
  Tick01Icon,
  SwimmingIcon,
  BeachIcon,
  Wifi01Icon,
  SnowIcon,
  MapsIcon,
  GridIcon,
  Moon02Icon,
  Sun01Icon,
  ArrowDown01Icon,
  ArrowRight01Icon,
  Building01Icon,
  TreesIcon,
  Compass01Icon,
} from "@hugeicons-pro/core-stroke-rounded";
import svgPaths from "@/imports/LandingPage/svg-p2y91de9gv";
import AuthModal from "@/components/AuthModal";
import LanguageCurrencyModal from "@/components/LanguageCurrencyModal";
import FullPageMobileMenu from "@/components/layout/FullPageMobileMenu";
import {
  FilterState,
  INITIAL_FILTERS,
  DropdownContainer,
  BedAndRoomDropdownContent,
  RoomTypeDropdownContent,
  PriceRangeDropdownContent,
  EquipmentDropdownContent,
  PaymentDropdownContent,
  CancellationDropdownContent,
  SortDropdownContent,
} from "@/components/search/FilterDropdowns";
import FilterModal from "@/components/search/FilterModal";
import NavbarSearchWidget from "@/components/search/NavbarSearchWidget";
import dynamic from "next/dynamic";

const MapView = dynamic(() => import("@/components/MapView"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full rounded-3xl bg-slate-100 flex items-center justify-center min-h-[550px]">
      <div className="flex flex-col items-center gap-3">
        <div className="w-10 h-10 border-4 border-[#4a77ec]/30 border-t-[#4a77ec] rounded-full animate-spin" />
        <span className="text-xs font-semibold text-slate-400">Loading map…</span>
      </div>
    </div>
  ),
});

// Sample property photo imports
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
  }
  return String(val);
}

// Brand Logo Component matching header
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

// Property Interface
interface Property {
  id: string;
  name: string;
  type: "Appartement" | "Maison d'hôte" | "Villa" | "Gîte";
  typeBg: string;
  location: string;
  rating: number;
  price: string;
  priceNum: number;
  bedrooms: number;
  beds: number;
  bathrooms: number;
  equipment: string[];
  payment: string[];
  cancellation: "flexible" | "moderate" | "strict";
  isSoldOut?: boolean;
  discount?: string;
  urgency?: string;
  specs: string[];
  photo: any;
  amenityIcons: any[];
  categories: string[];
  lat: number;
  lng: number;
}

const PROPERTIES_LIST: Property[] = [
  {
    id: "p1",
    name: "Dar Dhiafa Boutique Hotel",
    type: "Maison d'hôte",
    typeBg: "#06b6d4",
    location: "Erriadh (Djerbahood), Djerba",
    rating: 4.9,
    price: "420 DT",
    priceNum: 420,
    bedrooms: 3,
    beds: 3,
    bathrooms: 2,
    equipment: ["pool", "wifi", "ac", "kitchen"],
    payment: ["online", "on_arrival"],
    cancellation: "flexible",
    specs: ["Logement entier", "3 beds", "Max 6 persons"],
    photo: imgHotelCard,
    amenityIcons: [SwimmingIcon],
    categories: ["pool", "historical", "romantics", "family"],
    lat: 33.8185,
    lng: 10.856,
  },
  {
    id: "p2",
    name: "Maison Dedine Seafront",
    type: "Villa",
    typeBg: "#8b5cf6",
    location: "Plage Sidi Mahrez, Djerba",
    rating: 4.8,
    price: "780 DT",
    priceNum: 780,
    bedrooms: 4,
    beds: 4,
    bathrooms: 3,
    equipment: ["pool", "beach", "wifi", "ac", "sea_view"],
    payment: ["online", "installments"],
    cancellation: "moderate",
    discount: "25% off",
    urgency: "Only 1 villa left !",
    specs: ["Villa pieds dans l'eau", "4 beds", "Max 8 persons"],
    photo: imgHotelCard1,
    amenityIcons: [SwimmingIcon, BeachIcon],
    categories: ["seaside", "pool", "romantics", "family"],
    lat: 33.8835,
    lng: 10.982,
  },
  {
    id: "p3",
    name: "Dar Bibine Artist Riad",
    type: "Maison d'hôte",
    typeBg: "#06b6d4",
    location: "Djerbahood, Erriadh",
    rating: 4.9,
    price: "350 DT",
    priceNum: 350,
    bedrooms: 2,
    beds: 2,
    bathrooms: 2,
    equipment: ["pool", "wifi", "garden"],
    payment: ["online", "on_arrival"],
    cancellation: "flexible",
    urgency: "Popular stay",
    specs: ["Suite de charme", "2 beds", "Max 4 persons"],
    photo: imgHotelCard2,
    amenityIcons: [SwimmingIcon, TreesIcon],
    categories: ["pool", "historical", "nature", "romantics"],
    lat: 33.8142,
    lng: 10.8525,
  },
  {
    id: "p4",
    name: "Villa Palmeraie Midoun",
    type: "Villa",
    typeBg: "#8b5cf6",
    location: "Midoun Centre, Djerba",
    rating: 4.7,
    price: "560 DT",
    priceNum: 560,
    bedrooms: 5,
    beds: 5,
    bathrooms: 4,
    equipment: ["pool", "wifi", "ac", "garden"],
    payment: ["online", "installments"],
    cancellation: "strict",
    specs: ["Piscine privée", "5 beds", "Max 10 persons"],
    photo: imgHotelCard5,
    amenityIcons: [SwimmingIcon, TreesIcon],
    categories: ["pool", "nature", "family", "sahara"],
    lat: 33.8095,
    lng: 10.9935,
  },
  {
    id: "p5",
    name: "Menzel Fella & Spa",
    type: "Maison d'hôte",
    typeBg: "#06b6d4",
    location: "Corniche Nord, Hammamet",
    rating: 4.8,
    price: "290 DT",
    priceNum: 290,
    bedrooms: 3,
    beds: 3,
    bathrooms: 2,
    equipment: ["pool", "beach", "wifi", "garden"],
    payment: ["online", "on_arrival"],
    cancellation: "moderate",
    isSoldOut: true,
    specs: ["Menzel traditionnel", "3 beds", "Max 6 persons"],
    photo: imgHotelCard6,
    amenityIcons: [SwimmingIcon, BeachIcon, TreesIcon],
    categories: ["pool", "historical", "nature", "family", "seaside"],
    lat: 36.400,
    lng: 10.616,
  },
  {
    id: "p6",
    name: "Dar El Manara Resort",
    type: "Appartement",
    typeBg: "#4a77ec",
    location: "La Marsa Plage, Marsa",
    rating: 4.6,
    price: "210 DT",
    priceNum: 210,
    bedrooms: 2,
    beds: 2,
    bathrooms: 1,
    equipment: ["pool", "beach", "wifi", "ac", "sea_view"],
    payment: ["online", "on_arrival", "installments"],
    cancellation: "flexible",
    discount: "15% off",
    urgency: "Only 2 rooms left !",
    specs: ["Appartement vue mer", "2 beds", "Max 4 persons"],
    photo: imgHotelCard7,
    amenityIcons: [SwimmingIcon, BeachIcon, TreesIcon],
    categories: ["seaside", "pool", "urban", "family"],
    lat: 36.878,
    lng: 10.324,
  },
  {
    id: "p7",
    name: "Villa Laguna Taguermess",
    type: "Villa",
    typeBg: "#8b5cf6",
    location: "Port El Kantaoui, Sousse",
    rating: 4.9,
    price: "920 DT",
    priceNum: 920,
    bedrooms: 6,
    beds: 6,
    bathrooms: 5,
    equipment: ["pool", "beach", "wifi", "ac", "sea_view", "garden"],
    payment: ["online", "installments"],
    cancellation: "strict",
    urgency: "Luxury stay",
    specs: ["Villa panoramique", "6 beds", "Max 12 persons"],
    photo: imgHotelCard,
    amenityIcons: [SwimmingIcon, BeachIcon, TreesIcon],
    categories: ["seaside", "pool", "nature", "romantics", "family"],
    lat: 35.894,
    lng: 10.598,
  },
  {
    id: "p8",
    name: "Dar Nejma Medina",
    type: "Maison d'hôte",
    typeBg: "#06b6d4",
    location: "Gammarth Supérieur, Ghammarth",
    rating: 4.8,
    price: "240 DT",
    priceNum: 240,
    bedrooms: 2,
    beds: 2,
    bathrooms: 2,
    equipment: ["pool", "wifi", "garden"],
    payment: ["online", "on_arrival"],
    cancellation: "flexible",
    specs: ["Patio traditionnel", "2 beds", "Max 4 persons"],
    photo: imgHotelCard1,
    amenityIcons: [SwimmingIcon, TreesIcon],
    categories: ["pool", "historical", "urban", "romantics"],
    lat: 36.918,
    lng: 10.288,
  },
  {
    id: "p9",
    name: "Résidence Plage Seguia",
    type: "Appartement",
    typeBg: "#4a77ec",
    location: "Plage El Mansoura, Kélibia",
    rating: 4.7,
    price: "195 DT",
    priceNum: 195,
    bedrooms: 2,
    beds: 2,
    bathrooms: 1,
    equipment: ["beach", "wifi", "ac", "sea_view"],
    payment: ["online", "on_arrival"],
    cancellation: "moderate",
    isSoldOut: true,
    specs: ["Accès direct plage", "2 beds", "Max 4 persons"],
    photo: imgHotelCard2,
    amenityIcons: [BeachIcon, TreesIcon],
    categories: ["seaside", "family"],
    lat: 36.848,
    lng: 11.099,
  },
  {
    id: "p10",
    name: "Dar Yasmina Hammamet",
    type: "Maison d'hôte",
    typeBg: "#06b6d4",
    location: "Yasmine Hammamet, Hammamet",
    rating: 4.8,
    price: "310 DT",
    priceNum: 310,
    bedrooms: 3,
    beds: 3,
    bathrooms: 2,
    equipment: ["pool", "beach", "wifi", "garden"],
    payment: ["online", "on_arrival"],
    cancellation: "flexible",
    discount: "20% off",
    urgency: "Only 1 room left !",
    specs: ["Jardin & Piscine", "3 beds", "Max 6 persons"],
    photo: imgHotelCard5,
    amenityIcons: [SwimmingIcon, BeachIcon, TreesIcon],
    categories: ["pool", "seaside", "nature", "family"],
    lat: 36.372,
    lng: 10.536,
  },
  {
    id: "p11",
    name: "Gîte Rural Guellala",
    type: "Gîte",
    typeBg: "#10b981",
    location: "Guellala, Djerba",
    rating: 4.9,
    price: "170 DT",
    priceNum: 170,
    bedrooms: 2,
    beds: 2,
    bathrooms: 1,
    equipment: ["garden", "kitchen"],
    payment: ["on_arrival"],
    cancellation: "flexible",
    urgency: "Authentic pottery village",
    specs: ["Gîte écologique", "2 beds", "Max 4 persons"],
    photo: imgHotelCard6,
    amenityIcons: [TreesIcon],
    categories: ["nature", "sahara", "historical"],
    lat: 33.7285,
    lng: 10.863,
  },
  {
    id: "p12",
    name: "Villa Turquoise Front Mer",
    type: "Villa",
    typeBg: "#8b5cf6",
    location: "Plage Aghir, Djerba",
    rating: 4.9,
    price: "850 DT",
    priceNum: 850,
    bedrooms: 4,
    beds: 4,
    bathrooms: 3,
    equipment: ["pool", "beach", "wifi", "ac", "sea_view"],
    payment: ["online", "installments"],
    cancellation: "strict",
    urgency: "Infinity pool",
    specs: ["Front de mer", "4 beds", "Max 8 persons"],
    photo: imgHotelCard7,
    amenityIcons: [SwimmingIcon, BeachIcon, TreesIcon],
    categories: ["seaside", "pool", "romantics", "family"],
    lat: 33.766,
    lng: 11.038,
  },
];

// Experience categories using Hugeicons
const CATEGORIES = [
  { id: "pool", label: "Swimming pool", icon: SwimmingIcon },
  { id: "seaside", label: "Seaside", icon: BeachIcon },
  { id: "urban", label: "Urban stays", icon: Building01Icon },
  { id: "nature", label: "Nature", icon: TreesIcon },
  { id: "sahara", label: "Sahara", icon: Sun01Icon },
  { id: "family", label: "Family", icon: UserGroupIcon },
  { id: "romantics", label: "Romantics", icon: FavouriteIcon },
  { id: "historical", label: "Historical", icon: Compass01Icon },
];

const VALID_CATEGORY_IDS = new Set(CATEGORIES.map((c) => c.id));

function normalizeExperienceToCategory(exp: string): string {
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
}

function SearchResultsContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Search input params
  const initialQuery = searchParams.get("query") || "";
  const tabParam = searchParams.get("tab") || "";
  const categoryParam = searchParams.get("category");
  const experienceParam = searchParams.get("experience");

  const resolveInitialCategory = (): string | null => {
    if (categoryParam) {
      const normalized = normalizeExperienceToCategory(categoryParam);
      if (VALID_CATEGORY_IDS.has(normalized)) return normalized;
    }
    if (experienceParam) {
      const normalized = normalizeExperienceToCategory(experienceParam);
      if (VALID_CATEGORY_IDS.has(normalized)) return normalized;
    }
    if (tabParam === "experience" && initialQuery) {
      const normalized = normalizeExperienceToCategory(initialQuery);
      if (VALID_CATEGORY_IDS.has(normalized)) return normalized;
    }
    return null;
  };

  // Active Category State (reads from URL query params ?category=... or ?experience=... if provided)
  const [activeCategory, setActiveCategory] = useState<string | null>(resolveInitialCategory());

  useEffect(() => {
    const resolved = resolveInitialCategory();
    setActiveCategory(resolved);
  }, [searchParams]);

  // Map view toggle (split / modal map) - Defaults to TRUE
  const [isMapView, setIsMapView] = useState(true);
  const [mobileViewMode, setMobileViewMode] = useState<"list" | "map">("list");
  const [hoveredPropId, setHoveredPropId] = useState<string | null>(null);

  // Filter State
  const [filters, setFilters] = useState<FilterState>(INITIAL_FILTERS);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

  // Sticky Header Reference for pixel-exact fixed map positioning
  const headerRef = useRef<HTMLDivElement>(null);
  const [headerHeight, setHeaderHeight] = useState<number>(185);

  useEffect(() => {
    if (!headerRef.current) return;
    const update = () => {
      if (headerRef.current) {
        setHeaderHeight(headerRef.current.offsetHeight);
      }
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(headerRef.current);
    window.addEventListener("resize", update);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", update);
    };
  }, []);

  // Modals & Mobile Menu
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isLangModalOpen, setIsLangModalOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState("FRA");
  const [selectedCurrency, setSelectedCurrency] = useState("EUR");

  // Favorites
  const [favorites, setFavorites] = useState<Set<string>>(new Set(["p1", "p4"]));

  const toggleFavorite = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setFavorites((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  // Filter Active Indicators
  const isBedActive = filters.bedrooms > 0 || filters.beds > 0 || filters.bathrooms > 0;
  const bedCount =
    (filters.bedrooms > 0 ? filters.bedrooms : 0) +
    (filters.beds > 0 ? filters.beds : 0) +
    (filters.bathrooms > 0 ? filters.bathrooms : 0);
  const isRoomTypeActive = filters.roomTypes.length > 0;
  const isPriceActive = filters.minPrice > 0 || filters.maxPrice < 1000;
  const isEquipmentActive = filters.equipment.length > 0;
  const isPaymentActive = filters.payment.length > 0;
  const isCancellationActive = filters.cancellation !== "any";

  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (isBedActive) count++;
    if (isRoomTypeActive) count++;
    if (isPriceActive) count++;
    if (isEquipmentActive) count++;
    if (isPaymentActive) count++;
    if (isCancellationActive) count++;
    return count;
  }, [isBedActive, isRoomTypeActive, isPriceActive, isEquipmentActive, isPaymentActive, isCancellationActive]);

  const sortLabel = useMemo(() => {
    switch (filters.sortBy) {
      case "high_price":
        return "hight price";
      case "low_price":
        return "low price";
      case "rating":
        return "best rating";
      case "popular":
        return "popular";
      default:
        return "hight price";
    }
  }, [filters.sortBy]);

  // Dynamically Filtered & Sorted Properties List
  const filteredProperties = useMemo(() => {
    const list = PROPERTIES_LIST.filter((prop) => {
      // Experience Category filter
      if (activeCategory && !prop.categories?.includes(activeCategory)) {
        return false;
      }
      // Room type filter
      if (filters.roomTypes.length > 0 && !filters.roomTypes.includes(prop.type)) {
        return false;
      }
      // Bedrooms filter
      if (filters.bedrooms > 0 && prop.bedrooms < filters.bedrooms) {
        return false;
      }
      // Beds filter
      if (filters.beds > 0 && prop.beds < filters.beds) {
        return false;
      }
      // Bathrooms filter
      if (filters.bathrooms > 0 && prop.bathrooms < filters.bathrooms) {
        return false;
      }
      // Price range filter
      if (prop.priceNum < filters.minPrice || prop.priceNum > filters.maxPrice) {
        return false;
      }
      // Equipment filter
      if (
        filters.equipment.length > 0 &&
        !filters.equipment.every((eq) => prop.equipment.includes(eq))
      ) {
        return false;
      }
      // Payment filter
      if (
        filters.payment.length > 0 &&
        !filters.payment.some((pm) => prop.payment.includes(pm))
      ) {
        return false;
      }
      // Cancellation filter
      if (
        filters.cancellation !== "any" &&
        prop.cancellation !== filters.cancellation
      ) {
        return false;
      }
      // Destination / City / Query filter (only apply if searching for a location, not an experience)
      const isExperienceQuery =
        tabParam === "experience" ||
        Boolean(experienceParam) ||
        Boolean(categoryParam) ||
        VALID_CATEGORY_IDS.has(normalizeExperienceToCategory(initialQuery));

      if (!isExperienceQuery && initialQuery && initialQuery.trim() !== "") {
        const q = initialQuery.toLowerCase().trim();
        const matchesQuery =
          prop.location.toLowerCase().includes(q) ||
          prop.name.toLowerCase().includes(q) ||
          (q === "marsa" && prop.location.toLowerCase().includes("marsa")) ||
          (q === "ghammarth" && prop.location.toLowerCase().includes("gammarth"));
        if (!matchesQuery) return false;
      }
      return true;
    });

    const sorted = [...list];
    if (filters.sortBy === "high_price") {
      sorted.sort((a, b) => b.priceNum - a.priceNum);
    } else if (filters.sortBy === "low_price") {
      sorted.sort((a, b) => a.priceNum - b.priceNum);
    } else if (filters.sortBy === "rating") {
      sorted.sort((a, b) => b.rating - a.rating);
    }

    return sorted;
  }, [filters, activeCategory, initialQuery]);

  const [isSearchExpanded, setIsSearchExpanded] = useState(false);

  const mapProperties = useMemo(() => {
    return filteredProperties.map((prop) => ({
      id: prop.id,
      name: prop.name,
      price: prop.price,
      rating: prop.rating,
      photo: toImgSrc(prop.photo),
      location: prop.location,
      lat: prop.lat,
      lng: prop.lng,
      isSoldOut: prop.isSoldOut,
    }));
  }, [filteredProperties]);

  return (
    <div className="min-h-screen bg-[#f8fafc] text-gray-900 font-sans">
      {/* ── 1. TOP NAVBAR CONTAINER (Unified Solid White Header Block at z-[100]) ── */}
      <header
        className={`fixed top-0 left-0 right-0 z-[100] bg-white border-b border-gray-200/90 transition-all duration-300 ${
          isSearchExpanded ? "shadow-xl" : "shadow-xs"
        }`}
      >
        {/* Row 1: Logo + Centered Search Pill + Actions */}
        <div className="w-full max-w-none px-3 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-2 sm:gap-4">
          {/* Logo */}
          <div className="flex items-center shrink-0">
            <BrandLogo />
          </div>

          {/* Centered Morphing Search Widget (Compact Single-Row State only) */}
          {!isSearchExpanded && (
            <div className="flex-1 flex justify-center min-w-0 max-w-[580px] px-1 sm:px-2">
              <NavbarSearchWidget
                isExpanded={false}
                onExpandedChange={setIsSearchExpanded}
                initialLocation={initialQuery || "Choose the city"}
                initialCheckIn="03/21/2019"
                initialCheckOut="03/21/2019"
                initialGuests="2 adults"
              />
            </div>
          )}

          {/* Right Header Actions */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            {/* Dark Mode */}
            <button
              type="button"
              className="hidden lg:flex w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-slate-50 hover:bg-slate-100 items-center justify-center text-slate-700 transition-colors border border-slate-200/80 cursor-pointer"
            >
              <HugeiconsIcon icon={Moon02Icon} size={18} />
            </button>

            {/* Language & Currency */}
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

            {/* Favorites */}
            <Link
              href="/favorites"
              aria-label="Favorites"
              className="hidden md:flex w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-slate-50 hover:bg-red-50 items-center justify-center text-slate-700 hover:text-red-500 transition-colors border border-slate-200/80 no-underline relative"
            >
              <HugeiconsIcon icon={FavouriteIcon} size={18} />
              {favorites.size > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#3B68EC] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-xs">
                  {favorites.size}
                </span>
              )}
            </Link>

            {/* Sign In */}
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

        {/* Row 2: Expanded Large Search Bar Linked Inside the Same Header Container */}
        <AnimatePresence>
          {isSearchExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="w-full px-4 sm:px-6 lg:px-8 pb-6 pt-1 flex justify-center overflow-visible"
            >
              <NavbarSearchWidget
                isExpanded={true}
                onExpandedChange={setIsSearchExpanded}
                initialLocation={initialQuery || "Choose the city"}
                initialCheckIn="03/21/2019"
                initialCheckOut="03/21/2019"
                initialGuests="2 adults"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* ── BACKDROP OVERLAY WHEN EXPANDED (Dims everything below the top white header at z-[80]) ── */}
      <AnimatePresence>
        {isSearchExpanded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setIsSearchExpanded(false)}
            className="fixed inset-0 bg-black/50 backdrop-blur-xs z-[80] pointer-events-auto"
          />
        )}
      </AnimatePresence>

      {/* ── LOWER HEADER STACK (Experience Categories + Filter Bar - z-[80] above Map in both view modes) ── */}
      <div
        ref={headerRef}
        style={{ top: `${isSearchExpanded ? 180 : 80}px` }}
        className="fixed left-0 right-0 z-[80] bg-white border-b border-gray-200/80 shadow-2xs transition-all duration-300"
      >
        {/* 2. EXPERIENCE CATEGORY ICONS BAR */}
        <div className="bg-white border-b border-gray-100 py-2">
          <div className="w-full max-w-none px-4 sm:px-6 lg:px-8 flex items-center justify-center gap-6 overflow-x-auto no-scrollbar py-1">
            {CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setActiveCategory(activeCategory === cat.id ? null : cat.id)}
                  className="group flex flex-col items-center gap-1.5 cursor-pointer border-none bg-transparent shrink-0 p-1"
                >
                  <div
                    className={`w-11 h-11 rounded-full flex items-center justify-center text-lg transition-all duration-200 ${
                      isActive
                        ? "bg-blue-50/90 ring-2 ring-inset ring-[#4a77ec] text-[#4a77ec] shadow-xs scale-105"
                        : "bg-gray-50 hover:bg-gray-100 text-gray-600 hover:text-gray-900 hover:scale-105"
                    }`}
                  >
                    <HugeiconsIcon icon={cat.icon} size={19} />
                  </div>
                  <span
                    className={`text-[11px] font-semibold transition-colors ${
                      isActive ? "text-[#4a77ec] font-bold" : "text-gray-600 group-hover:text-gray-900"
                    }`}
                  >
                    {cat.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 3. FILTER BAR ROW WITH DESIGN SYSTEM DROPDOWNS */}
        <div className="bg-white py-2.5 overflow-visible">
          <div className="w-full max-w-none px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-3 overflow-visible">
            {/* Left Dropdown Filters */}
            <div className="flex items-center gap-2 shrink-0 overflow-visible">
              {/* 1. Bed and room Dropdown */}
              <div
                className={`relative shrink-0 ${
                  openDropdown === "bed_and_room" ? "z-50" : "z-10"
                }`}
              >
                {isBedActive ? (
                  <div
                    onClick={() =>
                      setOpenDropdown(openDropdown === "bed_and_room" ? null : "bed_and_room")
                    }
                    className={`h-8 px-3 rounded-full bg-blue-50/90 border border-blue-300 text-[#4a77ec] text-xs font-bold flex items-center gap-1.5 shrink-0 cursor-pointer shadow-xs transition-all ${
                      openDropdown === "bed_and_room" ? "ring-2 ring-[#4a77ec]/40" : ""
                    }`}
                  >
                    <span>Bed and room ({bedCount})</span>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setFilters((prev) => ({ ...prev, bedrooms: 0, beds: 0, bathrooms: 0 }));
                      }}
                      className="hover:text-blue-800 border-none bg-transparent cursor-pointer p-0 ml-0.5 text-xs"
                    >
                      ✕
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() =>
                      setOpenDropdown(openDropdown === "bed_and_room" ? null : "bed_and_room")
                    }
                    className={`h-8 px-3 rounded-full bg-white border border-gray-200 text-gray-700 text-xs font-semibold hover:bg-gray-50 flex items-center gap-1.5 shrink-0 cursor-pointer transition-all ${
                      openDropdown === "bed_and_room"
                        ? "ring-2 ring-[#4a77ec] border-[#4a77ec] text-[#4a77ec]"
                        : ""
                    }`}
                  >
                    <span>Bed and room</span>
                    <HugeiconsIcon
                      icon={ArrowDown01Icon}
                      size={12}
                      className={
                        openDropdown === "bed_and_room"
                          ? "text-[#4a77ec] rotate-180 transition-transform"
                          : "text-gray-400"
                      }
                    />
                  </button>
                )}
                <DropdownContainer
                  isOpen={openDropdown === "bed_and_room"}
                  onClose={() => setOpenDropdown(null)}
                  title="Bed and room"
                >
                  <BedAndRoomDropdownContent
                    filters={filters}
                    onChange={(updates) => setFilters((prev) => ({ ...prev, ...updates }))}
                    onClose={() => setOpenDropdown(null)}
                  />
                </DropdownContainer>
              </div>

              {/* 2. Room type Dropdown */}
              <div
                className={`relative shrink-0 ${openDropdown === "room_type" ? "z-50" : "z-10"}`}
              >
                {isRoomTypeActive ? (
                  <div
                    onClick={() =>
                      setOpenDropdown(openDropdown === "room_type" ? null : "room_type")
                    }
                    className={`h-8 px-3 rounded-full bg-blue-50/90 border border-blue-300 text-[#4a77ec] text-xs font-bold flex items-center gap-1.5 shrink-0 cursor-pointer shadow-xs transition-all ${
                      openDropdown === "room_type" ? "ring-2 ring-[#4a77ec]/40" : ""
                    }`}
                  >
                    <span>Room type ({filters.roomTypes.length})</span>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setFilters((prev) => ({ ...prev, roomTypes: [] }));
                      }}
                      className="hover:text-blue-800 border-none bg-transparent cursor-pointer p-0 ml-0.5 text-xs"
                    >
                      ✕
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() =>
                      setOpenDropdown(openDropdown === "room_type" ? null : "room_type")
                    }
                    className={`h-8 px-3 rounded-full bg-white border border-gray-200 text-gray-700 text-xs font-semibold hover:bg-gray-50 flex items-center gap-1.5 shrink-0 cursor-pointer transition-all ${
                      openDropdown === "room_type"
                        ? "ring-2 ring-[#4a77ec] border-[#4a77ec] text-[#4a77ec]"
                        : ""
                    }`}
                  >
                    <span>Room type</span>
                    <HugeiconsIcon
                      icon={ArrowDown01Icon}
                      size={12}
                      className={
                        openDropdown === "room_type"
                          ? "text-[#4a77ec] rotate-180 transition-transform"
                          : "text-gray-400"
                      }
                    />
                  </button>
                )}
                <DropdownContainer
                  isOpen={openDropdown === "room_type"}
                  onClose={() => setOpenDropdown(null)}
                  title="Room type"
                >
                  <RoomTypeDropdownContent
                    filters={filters}
                    onChange={(updates) => setFilters((prev) => ({ ...prev, ...updates }))}
                    onClose={() => setOpenDropdown(null)}
                  />
                </DropdownContainer>
              </div>

              {/* 3. Price range Dropdown */}
              <div className={`relative shrink-0 ${openDropdown === "price" ? "z-50" : "z-10"}`}>
                {isPriceActive ? (
                  <div
                    onClick={() => setOpenDropdown(openDropdown === "price" ? null : "price")}
                    className={`h-8 px-3 rounded-full bg-blue-50/90 border border-blue-300 text-[#4a77ec] text-xs font-bold flex items-center gap-1.5 shrink-0 cursor-pointer shadow-xs transition-all ${
                      openDropdown === "price" ? "ring-2 ring-[#4a77ec]/40" : ""
                    }`}
                  >
                    <span>
                      {filters.minPrice} DT - {filters.maxPrice} DT
                    </span>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setFilters((prev) => ({ ...prev, minPrice: 0, maxPrice: 1000 }));
                      }}
                      className="hover:text-blue-800 border-none bg-transparent cursor-pointer p-0 ml-0.5 text-xs"
                    >
                      ✕
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => setOpenDropdown(openDropdown === "price" ? null : "price")}
                    className={`h-8 px-3 rounded-full bg-white border border-gray-200 text-gray-700 text-xs font-semibold hover:bg-gray-50 flex items-center gap-1.5 shrink-0 cursor-pointer transition-all ${
                      openDropdown === "price"
                        ? "ring-2 ring-[#4a77ec] border-[#4a77ec] text-[#4a77ec]"
                        : ""
                    }`}
                  >
                    <span>Price</span>
                    <HugeiconsIcon
                      icon={ArrowDown01Icon}
                      size={12}
                      className={
                        openDropdown === "price"
                          ? "text-[#4a77ec] rotate-180 transition-transform"
                          : "text-gray-400"
                      }
                    />
                  </button>
                )}
                <DropdownContainer
                  isOpen={openDropdown === "price"}
                  onClose={() => setOpenDropdown(null)}
                  title="Price range"
                >
                  <PriceRangeDropdownContent
                    filters={filters}
                    onChange={(updates) => setFilters((prev) => ({ ...prev, ...updates }))}
                    onClose={() => setOpenDropdown(null)}
                  />
                </DropdownContainer>
              </div>

              {/* 4. Equipment Dropdown */}
              <div
                className={`relative shrink-0 ${openDropdown === "equipment" ? "z-50" : "z-10"}`}
              >
                {isEquipmentActive ? (
                  <div
                    onClick={() =>
                      setOpenDropdown(openDropdown === "equipment" ? null : "equipment")
                    }
                    className={`h-8 px-3 rounded-full bg-blue-50/90 border border-blue-300 text-[#4a77ec] text-xs font-bold flex items-center gap-1.5 shrink-0 cursor-pointer shadow-xs transition-all ${
                      openDropdown === "equipment" ? "ring-2 ring-[#4a77ec]/40" : ""
                    }`}
                  >
                    <span>Equipment ({filters.equipment.length})</span>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setFilters((prev) => ({ ...prev, equipment: [] }));
                      }}
                      className="hover:text-blue-800 border-none bg-transparent cursor-pointer p-0 ml-0.5 text-xs"
                    >
                      ✕
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() =>
                      setOpenDropdown(openDropdown === "equipment" ? null : "equipment")
                    }
                    className={`h-8 px-3 rounded-full bg-white border border-gray-200 text-gray-700 text-xs font-semibold hover:bg-gray-50 flex items-center gap-1.5 shrink-0 cursor-pointer transition-all ${
                      openDropdown === "equipment"
                        ? "ring-2 ring-[#4a77ec] border-[#4a77ec] text-[#4a77ec]"
                        : ""
                    }`}
                  >
                    <span>Equipment</span>
                    <HugeiconsIcon
                      icon={ArrowDown01Icon}
                      size={12}
                      className={
                        openDropdown === "equipment"
                          ? "text-[#4a77ec] rotate-180 transition-transform"
                          : "text-gray-400"
                      }
                    />
                  </button>
                )}
                <DropdownContainer
                  isOpen={openDropdown === "equipment"}
                  onClose={() => setOpenDropdown(null)}
                  title="Equipment"
                >
                  <EquipmentDropdownContent
                    filters={filters}
                    onChange={(updates) => setFilters((prev) => ({ ...prev, ...updates }))}
                    onClose={() => setOpenDropdown(null)}
                  />
                </DropdownContainer>
              </div>

              {/* 5. Payment Dropdown */}
              <div
                className={`relative shrink-0 ${openDropdown === "payment" ? "z-50" : "z-10"}`}
              >
                {isPaymentActive ? (
                  <div
                    onClick={() => setOpenDropdown(openDropdown === "payment" ? null : "payment")}
                    className={`h-8 px-3 rounded-full bg-blue-50/90 border border-blue-300 text-[#4a77ec] text-xs font-bold flex items-center gap-1.5 shrink-0 cursor-pointer shadow-xs transition-all ${
                      openDropdown === "payment" ? "ring-2 ring-[#4a77ec]/40" : ""
                    }`}
                  >
                    <span>Payment ({filters.payment.length})</span>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setFilters((prev) => ({ ...prev, payment: [] }));
                      }}
                      className="hover:text-blue-800 border-none bg-transparent cursor-pointer p-0 ml-0.5 text-xs"
                    >
                      ✕
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => setOpenDropdown(openDropdown === "payment" ? null : "payment")}
                    className={`h-8 px-3 rounded-full bg-white border border-gray-200 text-gray-700 text-xs font-semibold hover:bg-gray-50 flex items-center gap-1.5 shrink-0 cursor-pointer transition-all ${
                      openDropdown === "payment"
                        ? "ring-2 ring-[#4a77ec] border-[#4a77ec] text-[#4a77ec]"
                        : ""
                    }`}
                  >
                    <span>Payment</span>
                    <HugeiconsIcon
                      icon={ArrowDown01Icon}
                      size={12}
                      className={
                        openDropdown === "payment"
                          ? "text-[#4a77ec] rotate-180 transition-transform"
                          : "text-gray-400"
                      }
                    />
                  </button>
                )}
                <DropdownContainer
                  isOpen={openDropdown === "payment"}
                  onClose={() => setOpenDropdown(null)}
                  title="Payment options"
                >
                  <PaymentDropdownContent
                    filters={filters}
                    onChange={(updates) => setFilters((prev) => ({ ...prev, ...updates }))}
                    onClose={() => setOpenDropdown(null)}
                  />
                </DropdownContainer>
              </div>

              {/* 6. Cancellation policy Dropdown */}
              <div
                className={`relative shrink-0 ${
                  openDropdown === "cancellation" ? "z-50" : "z-10"
                }`}
              >
                {isCancellationActive ? (
                  <div
                    onClick={() =>
                      setOpenDropdown(openDropdown === "cancellation" ? null : "cancellation")
                    }
                    className={`h-8 px-3 rounded-full bg-blue-50/90 border border-blue-300 text-[#4a77ec] text-xs font-bold flex items-center gap-1.5 shrink-0 cursor-pointer shadow-xs transition-all ${
                      openDropdown === "cancellation" ? "ring-2 ring-[#4a77ec]/40" : ""
                    }`}
                  >
                    <span>Cancellation ({filters.cancellation})</span>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setFilters((prev) => ({ ...prev, cancellation: "any" }));
                      }}
                      className="hover:text-blue-800 border-none bg-transparent cursor-pointer p-0 ml-0.5 text-xs"
                    >
                      ✕
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() =>
                      setOpenDropdown(openDropdown === "cancellation" ? null : "cancellation")
                    }
                    className={`h-8 px-3 rounded-full bg-white border border-gray-200 text-gray-700 text-xs font-semibold hover:bg-gray-50 flex items-center gap-1.5 shrink-0 cursor-pointer transition-all ${
                      openDropdown === "cancellation"
                        ? "ring-2 ring-[#4a77ec] border-[#4a77ec] text-[#4a77ec]"
                        : ""
                    }`}
                  >
                    <span>Cancellation policy</span>
                    <HugeiconsIcon
                      icon={ArrowDown01Icon}
                      size={12}
                      className={
                        openDropdown === "cancellation"
                          ? "text-[#4a77ec] rotate-180 transition-transform"
                          : "text-gray-400"
                      }
                    />
                  </button>
                )}
                <DropdownContainer
                  isOpen={openDropdown === "cancellation"}
                  onClose={() => setOpenDropdown(null)}
                  title="Cancellation policy"
                >
                  <CancellationDropdownContent
                    filters={filters}
                    onChange={(updates) => setFilters((prev) => ({ ...prev, ...updates }))}
                    onClose={() => setOpenDropdown(null)}
                  />
                </DropdownContainer>
              </div>
            </div>

            {/* Right Controls: Sort + Filter modal + Map View Toggle */}
            <div className="flex items-center gap-2 shrink-0 overflow-visible">
              {/* 7. Sort Dropdown */}
              <div className={`relative shrink-0 ${openDropdown === "sort" ? "z-50" : "z-10"}`}>
                <button
                  type="button"
                  onClick={() => setOpenDropdown(openDropdown === "sort" ? null : "sort")}
                  className={`h-8 px-3 rounded-full bg-white border border-gray-200 text-gray-700 text-xs font-semibold hover:bg-gray-50 flex items-center gap-1.5 cursor-pointer transition-all ${
                    openDropdown === "sort"
                      ? "ring-2 ring-[#4a77ec] border-[#4a77ec] text-[#4a77ec]"
                      : ""
                  }`}
                >
                  <span>Sort by : {sortLabel}</span>
                  <HugeiconsIcon
                    icon={ArrowDown01Icon}
                    size={12}
                    className={
                      openDropdown === "sort"
                        ? "text-[#4a77ec] rotate-180 transition-transform"
                        : "text-gray-400"
                    }
                  />
                </button>
                <DropdownContainer
                  isOpen={openDropdown === "sort"}
                  onClose={() => setOpenDropdown(null)}
                  title="Sort by"
                  align="right"
                >
                  <SortDropdownContent
                    filters={filters}
                    onChange={(updates) => setFilters((prev) => ({ ...prev, ...updates }))}
                    onClose={() => setOpenDropdown(null)}
                  />
                </DropdownContainer>
              </div>

              {/* 8. Filter by button */}
              <button
                type="button"
                onClick={() => setIsFilterModalOpen(true)}
                className="h-8 px-3.5 rounded-full bg-white border border-gray-200 text-gray-800 text-xs font-bold hover:bg-gray-50 flex items-center gap-1.5 cursor-pointer relative shadow-2xs"
              >
                <span>Filter by</span>
                <HugeiconsIcon icon={FilterIcon} size={14} className="text-gray-500" />
                {activeFilterCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[#4a77ec] text-white text-[10px] font-extrabold w-4 h-4 rounded-full flex items-center justify-center shadow-xs">
                    {activeFilterCount}
                  </span>
                )}
              </button>

              {/* Map View Toggle Button (Desktop Only) */}
              <button
                type="button"
                onClick={() => setIsMapView(!isMapView)}
                className={`hidden lg:flex h-8 px-4 rounded-full text-xs font-bold items-center gap-1.5 transition-all cursor-pointer border-none shadow-xs ${
                  isMapView
                    ? "bg-slate-900 text-white hover:bg-black"
                    : "bg-[#4a77ec] hover:bg-[#3a67dc] text-white"
                }`}
              >
                <HugeiconsIcon icon={MapsIcon} size={15} />
                <span>{isMapView ? "Grid view" : "Map view"}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── 4. RESULTS SUB-HEADER (Grid View Only) ────────────────────────────── */}
      {!isMapView && (
        <div className="w-full max-w-none px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between text-xs text-gray-500 font-semibold">
          <span>{filteredProperties.length} homes available</span>
          <a href="#" className="text-gray-400 hover:text-gray-700 no-underline">
            About ranking
          </a>
        </div>
      )}

      {/* ── 5. PROPERTY GRID / MAP AREA ───────────────────────────────────────── */}
      <main
        style={{ paddingTop: `${(isSearchExpanded ? 180 : 80) + (headerHeight || 114)}px` }}
        className="w-full max-w-none transition-all duration-300"
      >
        {filteredProperties.length === 0 ? (
          <div className="text-center py-24 bg-white rounded-3xl border border-gray-200/80 p-8 my-6 mx-4 sm:mx-6 lg:mx-8">
            <div className="w-14 h-14 bg-blue-50 text-[#4a77ec] rounded-full flex items-center justify-center mx-auto mb-3">
              <HugeiconsIcon icon={House01Icon} size={28} />
            </div>
            <h3 className="font-bold text-lg text-gray-900 mb-1">No stays match your filters</h3>
            <p className="text-xs text-gray-500 max-w-md mx-auto mb-4">
              Try adjusting your price range, room type, or amenities to see more available
              properties.
            </p>
            <button
              type="button"
              onClick={() => {
                setActiveCategory(null);
                setFilters({
                  bedrooms: 0,
                  beds: 0,
                  bathrooms: 0,
                  roomTypes: [],
                  minPrice: 0,
                  maxPrice: 1000,
                  equipment: [],
                  payment: [],
                  cancellation: "any",
                  sortBy: "high_price",
                });
              }}
              className="px-5 py-2 rounded-full bg-[#4a77ec] text-white font-bold text-xs border-none cursor-pointer hover:bg-[#3a67dc] transition-all"
            >
              Reset all filters
            </button>
          </div>
        ) : isMapView ? (
          /* Split View: Left Scrollable Listings + Right 100% Fixed Edge-to-Edge Map */
          <div className="w-full relative min-h-[calc(100vh-190px)]">
            {/* ── Mobile Map View Only (Screens < lg when mobileViewMode === "map") ── */}
            {mobileViewMode === "map" && (
              <div
                style={{
                  height: `calc(100dvh - ${(isSearchExpanded ? 180 : 80) + (headerHeight || 114)}px)`,
                }}
                className="block lg:hidden w-full relative overflow-hidden bg-slate-100"
              >
                <MapView
                  properties={mapProperties}
                  hoveredId={hoveredPropId}
                  onHover={setHoveredPropId}
                />
              </div>
            )}

            {/* Left Listings Column (takes 58% on desktop, with standard start padding; on mobile only shown when mobileViewMode === "list") */}
            <div
              className={`w-full lg:w-[58%] xl:w-[60%] pl-4 sm:pl-6 lg:pl-8 pr-4 sm:pr-6 lg:pr-6 pb-20 pt-4 ${
                mobileViewMode === "map" ? "hidden lg:block" : "block"
              }`}
            >
              {/* Sub-header inside listings column */}
              <div className="pb-3.5 flex items-center justify-between text-xs text-gray-500 font-semibold">
                <span>{filteredProperties.length} homes available</span>
                <a href="#" className="text-gray-400 hover:text-gray-700 no-underline">
                  About ranking
                </a>
              </div>

              {/* Property Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {filteredProperties.map((prop) => (
                  <PropertyCardItem
                    key={prop.id}
                    prop={prop}
                    isHighlighted={hoveredPropId === prop.id}
                    isFavorite={favorites.has(prop.id)}
                    onToggleFav={(e) => toggleFavorite(prop.id, e)}
                    onHover={(id) => setHoveredPropId(id)}
                  />
                ))}
              </div>
            </div>

            {/* Right Map Column (100% Fixed to viewport, closing edges at TOP, BOTTOM, and RIGHT) */}
            {/* Desktop Fixed View */}
            <div
              style={{ top: `${(isSearchExpanded ? 180 : 80) + (headerHeight || 114)}px` }}
              className="hidden lg:block fixed right-0 bottom-0 w-[42%] xl:w-[40%] bg-slate-100 border-l border-gray-200 z-20 rounded-none overflow-hidden transition-all duration-300"
            >
              <MapView
                properties={mapProperties}
                hoveredId={hoveredPropId}
                onHover={setHoveredPropId}
              />
            </div>
          </div>
        ) : (
          /* 4-Column Grid Layout */
          <div className="px-4 sm:px-6 lg:px-8 pb-16 pt-4">
            <div className="pb-3.5 flex items-center justify-between text-xs text-gray-500 font-semibold">
              <span>{filteredProperties.length} homes available</span>
              <a href="#" className="text-gray-400 hover:text-gray-700 no-underline">
                About ranking
              </a>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
              {filteredProperties.map((prop) => (
                <PropertyCardItem
                  key={prop.id}
                  prop={prop}
                  isHighlighted={hoveredPropId === prop.id}
                  isFavorite={favorites.has(prop.id)}
                  onToggleFav={(e) => toggleFavorite(prop.id, e)}
                  onHover={(id) => setHoveredPropId(id)}
                />
              ))}
            </div>
          </div>
        )}
      </main>

      {/* ── Floating Mobile Map / List Switcher Button (Exact Match to User UI Design - Elevated z-index) ── */}
      <div className="lg:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-[9999] pointer-events-auto">
        <button
          type="button"
          onClick={() => setMobileViewMode(mobileViewMode === "list" ? "map" : "list")}
          className="flex items-center gap-2.5 px-5 py-3 rounded-full bg-[#222222] hover:bg-black text-white text-sm font-bold shadow-[0_8px_30px_rgba(0,0,0,0.45)] active:scale-95 transition-all cursor-pointer border border-white/20 backdrop-blur-md"
        >
          <span className="tracking-tight">
            {mobileViewMode === "list" ? "Afficher la carte" : "Afficher la liste"}
          </span>
          <HugeiconsIcon
            icon={mobileViewMode === "list" ? MapsIcon : Menu01Icon}
            size={18}
            className="shrink-0 text-white"
          />
        </button>
      </div>

      {/* Filter Modal */}
      <FilterModal
        isOpen={isFilterModalOpen}
        onClose={() => setIsFilterModalOpen(false)}
        filters={filters}
        onApply={(updated) => setFilters(updated)}
        resultCount={filteredProperties.length}
      />

      {/* Global Modals & Mobile Menu */}
      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
      <LanguageCurrencyModal
        isOpen={isLangModalOpen}
        onClose={() => setIsLangModalOpen(false)}
        selectedLanguage={selectedLang}
        onSelectLanguage={setSelectedLang}
        selectedCurrency={selectedCurrency}
        onSelectCurrency={setSelectedCurrency}
      />
      <FullPageMobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        onOpenAuth={() => setIsAuthModalOpen(true)}
        onOpenLang={() => setIsLangModalOpen(true)}
        selectedLang={selectedLang}
        selectedCurrency={selectedCurrency}
        favoritesCount={favorites.size}
      />
    </div>
  );
}

// ── Property Card Item Component (Pixel-perfect matching screenshot) ────────────
function PropertyCardItem({
  prop,
  isFavorite,
  isHighlighted = false,
  onToggleFav,
  onHover,
}: {
  prop: Property;
  isFavorite: boolean;
  isHighlighted?: boolean;
  onToggleFav: (e: React.MouseEvent) => void;
  onHover: (id: string | null) => void;
}) {
  const cardRef = useRef<HTMLDivElement>(null);

  // Auto-scroll card into view when hovered via map
  useEffect(() => {
    if (isHighlighted && cardRef.current) {
      cardRef.current.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  }, [isHighlighted]);

  return (
    <motion.div
      ref={cardRef}
      onMouseEnter={() => onHover(prop.id)}
      onMouseLeave={() => onHover(null)}
      whileHover={{ y: -4 }}
      animate={isHighlighted ? { y: -4 } : { y: 0 }}
      className={`bg-white rounded-[20px] overflow-hidden transition-all duration-300 flex flex-col justify-between ${
        isHighlighted
          ? "ring-3 ring-[#4a77ec] shadow-2xl border-[#4a77ec] scale-[1.02]"
          : "border border-gray-200/80 shadow-2xs hover:shadow-xl"
      }`}
    >
      {/* Top Image Section */}
      <div className="relative h-[190px] w-full overflow-hidden bg-gray-100">
        <Link
          href={`/property/${prop.id}`}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full h-full cursor-pointer"
        >
          <img
            src={toImgSrc(prop.photo)}
            alt={prop.name}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          />
        </Link>

        {/* Top-Left Badges */}
        <div className="absolute top-3 left-3 z-10 flex items-center gap-1.5 pointer-events-none">
          <span
            className="text-white text-[11px] font-bold px-2.5 py-1 rounded-md shadow-xs"
            style={{ backgroundColor: prop.typeBg }}
          >
            {prop.type}
          </span>
          {prop.amenityIcons.map((IconComp, i) => (
            <span
              key={i}
              className="w-6 h-6 rounded-md bg-white/90 backdrop-blur-xs flex items-center justify-center text-gray-700 shadow-xs"
            >
              <HugeiconsIcon icon={IconComp} size={12} />
            </span>
          ))}
        </div>

        {/* Top-Right Heart */}
        <button
          type="button"
          onClick={onToggleFav}
          className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-slate-900/40 backdrop-blur-xs flex items-center justify-center text-white hover:text-red-500 shadow-sm border-none cursor-pointer transition-colors"
        >
          <HugeiconsIcon
            icon={FavouriteIcon}
            size={16}
            className={isFavorite ? "text-red-500 fill-red-500" : "text-white"}
          />
        </button>

        {/* Carousel Pagination Dots */}
        <div className="absolute bottom-2 inset-x-0 flex justify-center gap-1 z-10 pointer-events-none">
          <span className="w-1.5 h-1.5 rounded-full bg-white" />
          <span className="w-1.5 h-1.5 rounded-full bg-white/50" />
        </div>
      </div>

      {/* Card Content Section */}
      <div className="p-3.5 flex flex-col gap-2 flex-1 justify-between">
        {/* Title & Rating */}
        <Link
          href={`/property/${prop.id}`}
          target="_blank"
          rel="noopener noreferrer"
          className="space-y-1 block no-underline text-slate-900 group"
        >
          <div className="flex items-center justify-between gap-2">
            <h3 className="font-bold text-slate-900 text-sm tracking-tight line-clamp-1 group-hover:text-[#3B68EC] transition-colors">
              {prop.name}
            </h3>
            <span className="bg-[#3B68EC] text-white font-extrabold text-[11px] px-2 py-0.5 rounded-md shrink-0 shadow-2xs">
              {prop.rating}
            </span>
          </div>

          <div className="flex items-center gap-1 text-[11px] text-slate-600 font-medium">
            <HugeiconsIcon icon={Location01Icon} size={12} className="text-slate-400 shrink-0" />
            <span className="truncate">{prop.location}</span>
          </div>
        </Link>

        {/* Specs Badges */}
        <div className="flex items-center gap-1.5 text-[10px] font-semibold text-slate-700 flex-wrap">
          {prop.specs.map((s, idx) => (
            <span key={idx} className="bg-slate-100/90 text-slate-700 px-2 py-0.5 rounded-md border border-slate-200/50">
              {s}
            </span>
          ))}
        </div>

        {/* Pricing & Availability Row */}
        <div className="pt-2 border-t border-slate-100 flex items-end justify-between gap-2">
          <div>
            {prop.isSoldOut ? (
              <span className="text-xs font-bold text-rose-600 block">Sold out</span>
            ) : (
              <>
                {prop.discount && (
                  <span className="inline-block bg-emerald-50 text-emerald-700 border border-emerald-200 text-[9px] font-bold px-1.5 py-0.5 rounded mb-0.5 shadow-2xs">
                    {prop.discount}
                  </span>
                )}
                <div className="font-extrabold text-sm text-slate-900 leading-none">
                  {prop.price}
                </div>
              </>
            )}
            <span className="text-[10px] text-slate-500 font-medium block mt-0.5">
              2 nights, 2 guests
            </span>
            {prop.urgency && (
              <span className="text-[10px] font-bold text-rose-600 block mt-0.5">
                {prop.urgency}
              </span>
            )}
          </div>

          <div className="flex flex-col items-end gap-1">
            <Link
              href={`/property/${prop.id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#3B68EC] hover:bg-[#254EDB] text-white font-bold text-xs px-3.5 py-1.5 rounded-full transition-all border-none cursor-pointer shadow-xs whitespace-nowrap active:scale-95 no-underline block text-center"
            >
              Check availability
            </Link>
            <a
              href="#"
              className="text-[10px] font-bold text-[#3B68EC] hover:underline no-underline flex items-center gap-0.5"
            >
              <span>Official website</span>
              <HugeiconsIcon icon={ArrowRight01Icon} size={10} />
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function SearchResultsPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-gray-500 font-bold">Loading search results...</div>}>
      <SearchResultsContent />
    </Suspense>
  );
}
