"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { motion, AnimatePresence } from "motion/react";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  GlobalIcon,
  FavouriteIcon,
  UserIcon,
  ArrowDown01Icon,
  Add01Icon,
  Remove01Icon,
  Menu01Icon,
  Cancel01Icon,
  Moon02Icon,
  Sun01Icon,
  Facebook02Icon,
  NewTwitterIcon,
  InstagramIcon,
  PinterestIcon,
  YoutubeIcon,
} from "@hugeicons-pro/core-stroke-rounded";

import FullPageMobileMenu from "@/components/layout/FullPageMobileMenu";
import DarkModeToggle from "@/components/theme/dark-mode-toggle";
import svgPaths from "@/imports/LandingPage/svg-p2y91de9gv";
import img81831 from "@/imports/LandingPage/a1a57c413ca15b66ba58417dbf49d2caeaafb62f.png";
import imgLaptopHost from "@/imports/LandingPage/19e6220155bea3ebe8fdd486592d567d1d63cf20.png";
import imgVillaPool from "@/imports/LandingPage/2e243250df73f8665c2076148b1ef31fae40d3e8.png";
import imgDashboard from "@/imports/LandingPage/ec2789d611400a25173d812dfdc5d6656f384f5b.png";
import imgAppMockup from "@/imports/LandingPage/f5c8061b896e0ad8b3ac0aa45cedc31ec176b6cd.png";
import imgSupportAgent from "@/imports/LandingPage/68c031d4d79add7e14a6b6bcf66753f4420c861f.png";
import imgSansTitre22 from "@/imports/LandingPage/3b6678a3a40b0895ce6c57541bed8ca8a7c77b0b.png";

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
    <div className="h-[44px] w-[220px] relative">
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

// ─── Header Controls ────────────────────────────────────────────────────────
function LanguageSelector() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState("EN");
  const langRef = useRef<HTMLDivElement>(null);

  const languages = [
    { code: "EN", label: "English", flag: "🇬🇧" },
    { code: "FR", label: "Français", flag: "🇫🇷" },
    { code: "AR", label: "العربية", flag: "🇹🇳" },
  ];

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (langRef.current && !langRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={langRef} className="relative shrink-0">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Select language"
        className="h-[40px] sm:h-[44px] px-3.5 bg-white hover:bg-slate-100 active:scale-95 transition-all duration-200 rounded-full flex items-center gap-2 cursor-pointer border-none shadow-xs text-[#344054] hover:text-[#547fee]"
      >
        <HugeiconsIcon icon={GlobalIcon} size={20} className="text-[#556080]" />
        <span className="text-xs font-bold uppercase tracking-wider">{selectedLang}</span>
        <HugeiconsIcon icon={ArrowDown01Icon} size={14} className={`transition-transform duration-200 text-gray-400 ${isOpen ? "rotate-180 text-[#547fee]" : ""}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.96 }}
            transition={{ duration: 0.15 }}
            className="absolute top-[calc(100%+8px)] right-0 z-50 bg-white rounded-2xl shadow-xl border border-gray-100 p-1.5 min-w-[150px] space-y-1"
          >
            {languages.map((lang) => (
              <button
                key={lang.code}
                type="button"
                onClick={() => {
                  setSelectedLang(lang.code);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer border-none ${
                  selectedLang === lang.code ? "bg-[#547fee]/10 text-[#547fee]" : "hover:bg-slate-50 text-slate-700"
                }`}
              >
                <span className="text-base">{lang.flag}</span>
                <span>{lang.label}</span>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function FavoritesButton() {
  return (
    <div className="relative shrink-0">
      <Link href="/favorites" className="no-underline">
        <button
          type="button"
          aria-label="Favorites"
          className="h-[40px] w-[40px] sm:h-[44px] sm:w-[44px] bg-white hover:bg-slate-100 active:scale-95 transition-all duration-200 rounded-full flex items-center justify-center cursor-pointer border-none shadow-xs text-[#556080] hover:text-red-500 group"
        >
          <HugeiconsIcon icon={FavouriteIcon} size={18} className="sm:w-5 sm:h-5 transition-transform duration-200 group-hover:scale-110" />
        </button>
      </Link>
      <div className="absolute -top-1 -right-1 bg-[#547fee] text-white text-[10px] sm:text-[11px] font-bold w-4.5 h-4.5 sm:w-5 sm:h-5 rounded-full flex items-center justify-center shadow-xs pointer-events-none border-2 border-white">
        2
      </div>
    </div>
  );
}

function ListPropertyButton({ onClick }: { onClick?: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="h-[44px] px-6 bg-[#547fee] hover:bg-[#436cd9] active:scale-95 transition-all duration-200 rounded-full flex items-center justify-center cursor-pointer border-none shadow-md hover:shadow-lg font-semibold text-white text-sm whitespace-nowrap"
    >
      List your property
    </button>
  );
}

function SignInButton() {
  return (
    <Link href="/signin" className="no-underline shrink-0">
      <button
        type="button"
        className="h-[44px] pl-3 pr-5 bg-white hover:bg-slate-100 active:scale-95 transition-all duration-200 rounded-full flex items-center gap-2.5 cursor-pointer border-none shadow-sm font-semibold text-[#344054] hover:text-[#547fee] text-sm shrink-0"
      >
        <div className="w-7 h-7 rounded-full bg-[#547fee]/10 flex items-center justify-center text-[#547fee] shrink-0">
          <HugeiconsIcon icon={UserIcon} size={16} />
        </div>
        <span className="whitespace-nowrap font-bold">Sign In</span>
      </button>
    </Link>
  );
}

// ─── Header Navbar ────────────────────────────────────────────────────────────
function HeaderNavbar({ onOpenModal }: { onOpenModal: () => void }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState("EN");

  const languages = [
    { code: "EN", label: "English", flag: "🇬🇧" },
    { code: "FR", label: "Français", flag: "🇫🇷" },
    { code: "AR", label: "العربية", flag: "🇹🇳" },
  ];

  return (
    <nav className="w-full relative z-30 pt-4 sm:pt-6">
      <div className="flex items-center justify-between max-w-[1280px] mx-auto px-4 sm:px-6">
        <Logo />

        {/* Desktop Navbar Actions (lg: 1024px+) */}
        <div className="hidden lg:flex items-center gap-3 relative shrink-0">
          <DarkModeToggle />
          <LanguageSelector />
          <FavoritesButton />
          <SignInButton />
        </div>

        {/* Mobile & Tablet Action Bar (< lg: 1024px) */}
        <div className="flex lg:hidden items-center gap-2">
          <DarkModeToggle />
          <FavoritesButton />
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(true)}
            aria-label="Open mobile menu"
            className="h-[40px] w-[40px] bg-white hover:bg-slate-100 active:scale-95 transition-all duration-200 rounded-full flex items-center justify-center cursor-pointer border-none shadow-sm text-[#556080] hover:text-[#547fee]"
          >
            <HugeiconsIcon icon={Menu01Icon} size={20} />
          </button>
        </div>
      </div>

      {/* Full Page Mobile Menu (Whole page overlay) */}
      <FullPageMobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        selectedLang={selectedLang}
        favoritesCount={2}
      />
    </nav>
  );
}

// ─── FAQ ITEMS DATA ─────────────────────────────────────────────────────────
const FAQ_ITEMS = [
  {
    id: 1,
    question: "1. What is Darbook?",
    answer:
      "Darbook is Tunisia's premier reservation platform built specifically for authentic guesthouses, traditional dars, and boutique villas. We connect guesthouse owners directly with travelers looking for unique, high-quality stays across North Africa."
  },
  {
    id: 2,
    question: "2. How do I list my property on Darbook?",
    answer:
      "Listing your property is fast and simple. Click 'List property', fill out your property details, upload photos, set your pricing, and submit. Our partner team reviews and activates your listing within 24 hours."
  },
  {
    id: 3,
    question: "3. Is listing my property free?",
    answer:
      "Yes! Listing your property on Darbook is 100% free with zero registration fees or subscription costs. We only collect a standard commission on completed bookings."
  },
  {
    id: 4,
    question: "4. How do payments work?",
    answer:
      "Payouts are transferred directly to your bank account or local digital wallet shortly after guest check-in. You can track all payments live in your host dashboard."
  },
  {
    id: 5,
    question: "5. What are the requirements to become a host?",
    answer:
      "We welcome all authentic guesthouses, villas, and traditional dars in Tunisia. Requirements include high-resolution photos, accurate property info, and a commitment to quality guest experiences."
  },
  {
    id: 6,
    question: "6. Can I control my pricing and availability?",
    answer:
      "Absolutely. You have 100% control over your nightly rates, seasonal pricing, minimum stay rules, and calendar availability."
  },
  {
    id: 7,
    question: "7. What kind of support does Darbook offer to hosts?",
    answer:
      "Our partner support team provides 24/7 assistance via live chat and phone to help with onboarding, calendar sync, and host inquiries."
  },
  {
    id: 8,
    question: "8. Can I cancel a booking?",
    answer:
      "Yes, hosts can manage booking requests and cancellations according to their selected cancellation policy."
  },
  {
    id: 9,
    question: "9. How do reviews work?",
    answer:
      "Only verified guests who completed a stay at your property can submit ratings and reviews, ensuring 100% authentic host reputation."
  },
  {
    id: 10,
    question: "10. How do I edit my listing?",
    answer:
      "You can update photos, prices, room details, and descriptions anytime from your Darbook host dashboard."
  }
];

// ─── MAIN COMPONENT ─────────────────────────────────────────────────────────
export default function ListYourPropertyContent() {
  const [openFaq, setOpenFaq] = useState<number | null>(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalStep, setModalStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    propertyName: "",
    propertyType: "Guesthouse",
    city: "Hammamet",
    bedrooms: "3",
    fullName: "",
    email: "",
    phone: ""
  });

  const toggleFaq = (id: number) => {
    setOpenFaq(openFaq === id ? null : id);
  };

  const handleNextStep = () => {
    if (modalStep < 3) {
      setModalStep(modalStep + 1);
    } else {
      setSubmitted(true);
    }
  };

  const resetModal = () => {
    setIsModalOpen(false);
    setModalStep(1);
    setSubmitted(false);
  };

  return (
    <div className="min-h-screen bg-white text-[#1b1d22] font-sans selection:bg-[#547fee] selection:text-white">
      
      {/* ─────────────────────────────────────────────────────────────────────────
          1. HERO HEADER SECTION
      ───────────────────────────────────────────────────────────────────────── */}
      <section
        className="min-h-[520px] sm:min-h-[580px] flex flex-col justify-between relative shrink-0 w-full pb-14"
        style={{
          backgroundImage:
            "linear-gradient(159.15deg, rgb(1, 1, 23) 2.41%, rgb(70, 94, 156) 100%), linear-gradient(90deg, rgb(24, 23, 67) 0%, rgb(24, 23, 67) 100%)",
        }}
      >
        {/* Background Image Scoped */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img
            alt=""
            className="absolute inset-0 mix-blend-soft-light object-cover pointer-events-none size-full opacity-60"
            src={toImgSrc(img81831)}
          />
        </div>

        {/* Header Navbar */}
        <HeaderNavbar onOpenModal={() => setIsModalOpen(true)} />

        {/* Hero Title Content */}
        <div className="flex-1 flex flex-col items-center justify-center pt-16 sm:pt-20 pb-12 w-full max-w-[1240px] mx-auto px-4 sm:px-6 text-center z-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-bold text-white tracking-widest uppercase mb-4 shadow-xs">
            <span>WHERE LOCAL HOSPITALITY MEETS MODERN TRAVEL</span>
          </div>

          <h1 className="font-['Bricolage_Grotesk',sans-serif] font-extrabold text-2xl sm:text-3xl md:text-4xl lg:text-[40px] text-white tracking-tight leading-tight whitespace-nowrap mb-4">
            List your property on Darbook
          </h1>

          <p className="font-['Inter_Tight:Regular',sans-serif] text-sm sm:text-base md:text-lg text-white/85 max-w-2xl mx-auto leading-relaxed mb-8">
            Reach thousands of travelers looking for unique, authentic stays across Tunisia. Simple, transparent, and built for hosts.
          </p>

          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="bg-[#547fee] hover:bg-[#436cd9] transition-all text-white font-bold px-8 py-3.5 rounded-full text-base border-none cursor-pointer shadow-lg active:scale-95"
          >
            List property
          </button>
        </div>

        {/* Bottom curve creating rounded top corners for the block following hero */}
        <div className="absolute bg-[#f5f7fa] bottom-0 h-[24px] sm:h-[32px] inset-x-0 rounded-tl-[24px] sm:rounded-tl-[32px] rounded-tr-[24px] sm:rounded-tr-[32px] pointer-events-none z-10" />
      </section>

      {/* ─────────────────────────────────────────────────────────────────────────
          2. BREADCRUMB & FEATURE INTRO CARD
      ───────────────────────────────────────────────────────────────────────── */}
      <section className="bg-[#f5f7fa] pt-8 pb-12 w-full">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs text-gray-500 font-medium mb-6">
            <Link href="/" className="hover:text-[#547fee] transition-colors no-underline">
              Home
            </Link>
            <span>&gt;</span>
            <span className="text-gray-900 font-bold">List your property</span>
          </nav>

          {/* White Card */}
          <div className="bg-white rounded-[28px] p-6 sm:p-10 md:p-12 shadow-sm border border-gray-100 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 flex flex-col items-start gap-4">
              <h2 className="font-['Bricolage_Grotesk',sans-serif] font-bold text-2xl sm:text-3xl md:text-4xl text-[#181743] leading-tight m-0">
                Join Darbook and take your guesthouse to the next level
              </h2>
              <p className="font-['Inter_Tight:Regular',sans-serif] text-sm sm:text-base text-[#475467] leading-relaxed m-0">
                Darbook is the leading platform for renting holiday homes in Tunisia. List your property in just a few clicks, reach more travelers, and manage your bookings effortlessly. We are here to support local hosts every step of the way.
              </p>

              <div className="flex flex-wrap gap-3 pt-2">
                <div className="bg-[#F0F5FE] text-[#547fee] font-bold text-xs sm:text-sm px-4 py-2 rounded-full flex items-center gap-2">
                  <svg className="w-4 h-4 text-[#547fee]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>100% free to list</span>
                </div>
                <div className="bg-[#F0F5FE] text-[#547fee] font-bold text-xs sm:text-sm px-4 py-2 rounded-full flex items-center gap-2">
                  <svg className="w-4 h-4 text-[#547fee]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Dedicated support team</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 relative">
              <div className="relative rounded-[20px] overflow-hidden shadow-md aspect-[4/3] bg-gray-100">
                <img
                  alt="Host using laptop"
                  className="size-full object-cover"
                  src={toImgSrc(imgLaptopHost)}
                />
                
                {/* Floating Badges */}
                <div className="absolute bottom-12 left-4 bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs font-bold text-gray-800 shadow-md flex items-center gap-2 border border-white/60">
                  <div className="w-4 h-4 rounded-full bg-[#547fee] text-white flex items-center justify-center text-[10px]">
                    ✓
                  </div>
                  <span>100% free to list</span>
                </div>
                <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs font-bold text-gray-800 shadow-md flex items-center gap-2 border border-white/60">
                  <div className="w-4 h-4 rounded-full bg-[#547fee] text-white flex items-center justify-center text-[10px]">
                    ✓
                  </div>
                  <span>Dedicated support team</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────────────────
          3. START HOSTING IN 4 EASY STEPS
      ───────────────────────────────────────────────────────────────────────── */}
      <section className="py-14 sm:py-18 bg-white w-full">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="font-['Bricolage_Grotesk',sans-serif] font-bold text-2xl sm:text-3xl md:text-4xl text-[#181743] tracking-tight mb-2">
              Start Hosting in 4 Easy Steps
            </h2>
            <p className="font-['Inter_Tight:Regular',sans-serif] text-sm sm:text-base text-gray-500">
              A simple, step-by-step process to publish your listing and start receiving bookings.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {/* Step 1 */}
            <div className="bg-[#F4F7FE] border border-[#E4ECFB] rounded-[20px] p-6 flex flex-col items-start hover:shadow-md transition-all">
              <span className="font-['Bricolage_Grotesk',sans-serif] font-extrabold text-5xl text-[#547fee] leading-none mb-3">
                1
              </span>
              <span className="text-[10px] font-extrabold tracking-wider text-gray-400 uppercase mb-1">
                REGISTER
              </span>
              <h3 className="font-['Bricolage_Grotesk',sans-serif] font-bold text-base text-gray-900 mb-2">
                Create your host account in minutes
              </h3>
              <p className="font-['Inter_Tight:Regular',sans-serif] text-xs sm:text-sm text-gray-600 leading-relaxed m-0">
                Fill in your contact details and basic information about your property to create your host profile.
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-[#F4F7FE] border border-[#E4ECFB] rounded-[20px] p-6 flex flex-col items-start hover:shadow-md transition-all">
              <span className="font-['Bricolage_Grotesk',sans-serif] font-extrabold text-5xl text-[#547fee] leading-none mb-3">
                2
              </span>
              <span className="text-[10px] font-extrabold tracking-wider text-gray-400 uppercase mb-1">
                ADD YOUR PROPERTY
              </span>
              <h3 className="font-['Bricolage_Grotesk',sans-serif] font-bold text-base text-gray-900 mb-2">
                Showcase what makes your guesthouse unique
              </h3>
              <p className="font-['Inter_Tight:Regular',sans-serif] text-xs sm:text-sm text-gray-600 leading-relaxed m-0">
                Upload photos, set pricing, add amenities, and specify room options to attract the right guests.
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-[#F4F7FE] border border-[#E4ECFB] rounded-[20px] p-6 flex flex-col items-start hover:shadow-md transition-all">
              <span className="font-['Bricolage_Grotesk',sans-serif] font-extrabold text-5xl text-[#547fee] leading-none mb-3">
                3
              </span>
              <span className="text-[10px] font-extrabold tracking-wider text-gray-400 uppercase mb-1">
                SET AVAILABILITY
              </span>
              <h3 className="font-['Bricolage_Grotesk',sans-serif] font-bold text-base text-gray-900 mb-2">
                Keep control over calendar & pricing
              </h3>
              <p className="font-['Inter_Tight:Regular',sans-serif] text-xs sm:text-sm text-gray-600 leading-relaxed m-0">
                Set your own seasonal rates, update availability in real-time, and manage booking requests with complete flexibility.
              </p>
            </div>

            {/* Step 4 */}
            <div className="bg-[#F4F7FE] border border-[#E4ECFB] rounded-[20px] p-6 flex flex-col items-start hover:shadow-md transition-all">
              <span className="font-['Bricolage_Grotesk',sans-serif] font-extrabold text-5xl text-[#547fee] leading-none mb-3">
                4
              </span>
              <span className="text-[10px] font-extrabold tracking-wider text-gray-400 uppercase mb-1">
                WELCOME GUESTS
              </span>
              <h3 className="font-['Bricolage_Grotesk',sans-serif] font-bold text-base text-gray-900 mb-2">
                Start receiving bookings and grow your revenue
              </h3>
              <p className="font-['Inter_Tight:Regular',sans-serif] text-xs sm:text-sm text-gray-600 leading-relaxed m-0">
                Once approved, your property will go live on Darbook. Welcome guests and receive secure, timely payouts.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────────────────
          4. MIDDLE CTA BANNER CARD
      ───────────────────────────────────────────────────────────────────────── */}
      <section className="py-10 sm:py-14 bg-[#f5f7fa] w-full">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6">
          <div className="relative rounded-[24px] overflow-hidden min-h-[300px] sm:min-h-[340px] flex items-center p-8 sm:p-12 shadow-lg">
            <img
              alt="Luxury villa with pool"
              className="absolute inset-0 size-full object-cover"
              src={toImgSrc(imgVillaPool)}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-white via-white/95 sm:via-white/90 to-transparent max-w-xl" />

            <div className="relative z-10 max-w-md flex flex-col gap-4 items-start">
              <h2 className="font-['Bricolage_Grotesk',sans-serif] font-bold text-2xl sm:text-3xl md:text-4xl text-[#181743] leading-tight m-0">
                List your property today <br />
                <span className="text-[#547fee]">It's easy and absolutely free!</span>
              </h2>
              <button
                type="button"
                onClick={() => setIsModalOpen(true)}
                className="bg-[#547fee] hover:bg-[#436cd9] transition-all text-white font-bold px-7 py-3 rounded-full text-sm sm:text-base border-none cursor-pointer shadow-md active:scale-95"
              >
                List property
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────────────────
          5. WHY GUESTHOUSES CHOOSE DARBOOK (6 FEATURE CARDS)
      ───────────────────────────────────────────────────────────────────────── */}
      <section className="py-16 sm:py-20 bg-white w-full">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="font-['Bricolage_Grotesk',sans-serif] font-bold text-2xl sm:text-3xl md:text-4xl text-[#181743] tracking-tight mb-2">
              Why Guesthouses Choose Darbook
            </h2>
            <p className="font-['Inter_Tight:Regular',sans-serif] text-sm sm:text-base text-gray-500">
              The visibility and tools you need to succeed as a host.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1 */}
            <div className="bg-white rounded-[20px] border border-gray-100 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col">
              <div className="h-[180px] bg-gradient-to-br from-blue-50 to-indigo-50/40 p-5 relative overflow-hidden flex items-center justify-center border-b border-gray-100">
                <div className="w-full bg-white rounded-xl p-4 shadow-sm border border-blue-100 flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-gray-400 uppercase">Visibility Index</span>
                    <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                      Higher visibility
                    </span>
                  </div>
                  <div className="h-9 flex items-end gap-1.5 pt-1">
                    <div className="w-1/6 bg-blue-200 h-[35%] rounded-t" />
                    <div className="w-1/6 bg-blue-300 h-[50%] rounded-t" />
                    <div className="w-1/6 bg-blue-400 h-[70%] rounded-t" />
                    <div className="w-1/6 bg-[#547fee] h-[90%] rounded-t" />
                    <div className="w-1/6 bg-[#547fee] h-[100%] rounded-t" />
                  </div>
                </div>
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <h3 className="font-['Bricolage_Grotesk',sans-serif] font-bold text-lg text-gray-900 mb-2">
                  More Visibility, More Bookings
                </h3>
                <p className="font-['Inter_Tight:Regular',sans-serif] text-xs sm:text-sm text-gray-600 leading-relaxed m-0">
                  Reach thousands of active travelers looking for unique stays in Tunisia every single day.
                </p>
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-white rounded-[20px] border border-gray-100 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col">
              <div className="h-[180px] relative overflow-hidden border-b border-gray-100">
                <img
                  alt="Tunisian Villa"
                  className="size-full object-cover"
                  src={toImgSrc(imgVillaPool)}
                />
                <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-gray-900 shadow-sm border border-white/60 flex items-center gap-1">
                  <span>4.9 ★</span>
                  <span className="text-gray-400 font-normal">(120 reviews)</span>
                </div>
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <h3 className="font-['Bricolage_Grotesk',sans-serif] font-bold text-lg text-gray-900 mb-2">
                  Built for Guesthouses
                </h3>
                <p className="font-['Inter_Tight:Regular',sans-serif] text-xs sm:text-sm text-gray-600 leading-relaxed m-0">
                  Tailored specifically for authentic Tunisian guesthouses, villas, and boutique stays.
                </p>
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-white rounded-[20px] border border-gray-100 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col">
              <div className="h-[180px] bg-gradient-to-br from-indigo-50/50 to-blue-50 p-5 relative overflow-hidden flex items-center justify-center border-b border-gray-100">
                <img
                  alt="Dashboard preview"
                  className="w-full h-full object-contain rounded-lg shadow-sm"
                  src={toImgSrc(imgDashboard)}
                />
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <h3 className="font-['Bricolage_Grotesk',sans-serif] font-bold text-lg text-gray-900 mb-2">
                  Simple Booking &amp; Guest Management
                </h3>
                <p className="font-['Inter_Tight:Regular',sans-serif] text-xs sm:text-sm text-gray-600 leading-relaxed m-0">
                  Manage your calendar, track reservations, and communicate with guests easily.
                </p>
              </div>
            </div>

            {/* Card 4 */}
            <div className="bg-white rounded-[20px] border border-gray-100 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col">
              <div className="h-[180px] bg-gradient-to-br from-emerald-50/40 to-blue-50 p-5 relative overflow-hidden flex items-center justify-center border-b border-gray-100">
                <div className="w-full bg-white rounded-xl p-4 shadow-sm border border-emerald-100 flex items-center justify-between">
                  <div>
                    <span className="text-[11px] font-bold text-gray-400 uppercase block">Host Payouts</span>
                    <span className="text-xl font-extrabold text-gray-900">+45% Revenue</span>
                  </div>
                  <div className="w-9 h-9 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xs">
                    ↑ 45%
                  </div>
                </div>
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <h3 className="font-['Bricolage_Grotesk',sans-serif] font-bold text-lg text-gray-900 mb-2">
                  Increase Your Revenue
                </h3>
                <p className="font-['Inter_Tight:Regular',sans-serif] text-xs sm:text-sm text-gray-600 leading-relaxed m-0">
                  Optimize your pricing, reduce vacancies, and maximize your rental income with host tools.
                </p>
              </div>
            </div>

            {/* Card 5 */}
            <div className="bg-white rounded-[20px] border border-gray-100 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col">
              <div className="h-[180px] bg-gradient-to-br from-blue-50 to-slate-50 p-5 relative overflow-hidden flex items-center justify-center border-b border-gray-100">
                <img
                  alt="App interface"
                  className="h-full object-contain"
                  src={toImgSrc(imgAppMockup)}
                />
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <h3 className="font-['Bricolage_Grotesk',sans-serif] font-bold text-lg text-gray-900 mb-2">
                  Fair and Transparent Partnership
                </h3>
                <p className="font-['Inter_Tight:Regular',sans-serif] text-xs sm:text-sm text-gray-600 leading-relaxed m-0">
                  No hidden fees or unexpected commission rules. Transparent pricing for hosts.
                </p>
              </div>
            </div>

            {/* Card 6 */}
            <div className="bg-white rounded-[20px] border border-gray-100 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col">
              <div className="h-[180px] bg-gradient-to-br from-indigo-50 to-blue-50 p-5 relative overflow-hidden flex items-center justify-center border-b border-gray-100">
                <img
                  alt="Support agent"
                  className="h-full object-contain"
                  src={toImgSrc(imgSupportAgent)}
                />
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <h3 className="font-['Bricolage_Grotesk',sans-serif] font-bold text-lg text-gray-900 mb-2">
                  Support When You Need It
                </h3>
                <p className="font-['Inter_Tight:Regular',sans-serif] text-xs sm:text-sm text-gray-600 leading-relaxed m-0">
                  Our dedicated support team is available to assist you with any questions or issues.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────────────────
          6. FREQUENTLY ASKED QUESTIONS (ACCORDION)
      ───────────────────────────────────────────────────────────────────────── */}
      <section className="py-16 sm:py-20 bg-[#f5f7fa] w-full">
        <div className="max-w-[840px] mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="font-['Bricolage_Grotesk',sans-serif] font-bold text-2xl sm:text-3xl md:text-4xl text-[#181743] tracking-tight mb-2">
              Frequently Asked Questions
            </h2>
            <p className="font-['Inter_Tight:Regular',sans-serif] text-sm sm:text-base text-gray-500">
              Everything you need to know about listing your property on Darbook.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            {FAQ_ITEMS.map((item) => {
              const isOpen = openFaq === item.id;
              return (
                <div
                  key={item.id}
                  className="bg-white border border-gray-200/80 rounded-[16px] overflow-hidden shadow-2xs transition-colors"
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(item.id)}
                    className="w-full px-5 py-4 text-left flex items-center justify-between gap-4 font-['Bricolage_Grotesk',sans-serif] font-bold text-sm sm:text-base text-gray-900 hover:bg-gray-50/80 transition-colors border-none cursor-pointer"
                  >
                    <span>{item.question}</span>
                    <span className="text-lg font-bold text-gray-400 shrink-0">
                      {isOpen ? "−" : "+"}
                    </span>
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 pb-5 pt-1 font-['Inter_Tight:Regular',sans-serif] text-xs sm:text-sm text-gray-600 leading-relaxed border-t border-gray-100">
                          {item.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────────────────
          7. REGISTRATION MODAL
      ───────────────────────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-[24px] max-w-lg w-full p-6 sm:p-8 shadow-2xl relative overflow-hidden"
            >
              <button
                type="button"
                onClick={resetModal}
                className="absolute top-5 right-5 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 flex items-center justify-center transition-colors border-none cursor-pointer"
              >
                ✕
              </button>

              {!submitted ? (
                <div>
                  <div className="mb-6">
                    <span className="text-xs font-bold text-[#547fee] uppercase tracking-wider">
                      Step {modalStep} of 3
                    </span>
                    <h3 className="font-['Bricolage_Grotesk',sans-serif] font-bold text-xl text-gray-900 mt-1">
                      {modalStep === 1 && "Property Basic Details"}
                      {modalStep === 2 && "Location & Capacity"}
                      {modalStep === 3 && "Host Contact Information"}
                    </h3>
                  </div>

                  {modalStep === 1 && (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-xs font-bold text-gray-700 mb-1">
                          Property Name
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. Dar Seaside Villa"
                          value={formData.propertyName}
                          onChange={(e) => setFormData({ ...formData, propertyName: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-[#547fee]"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-700 mb-1">
                          Property Type
                        </label>
                        <select
                          value={formData.propertyType}
                          onChange={(e) => setFormData({ ...formData, propertyType: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-[#547fee]"
                        >
                          <option value="Guesthouse">Guesthouse / Maison d'hôtes</option>
                          <option value="Traditional Dar">Traditional Dar</option>
                          <option value="Villa">Boutique Villa</option>
                          <option value="Apartment">Luxury Apartment</option>
                        </select>
                      </div>
                    </div>
                  )}

                  {modalStep === 2 && (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-xs font-bold text-gray-700 mb-1">
                          City / Region
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. Hammamet, Djerba, Tunis"
                          value={formData.city}
                          onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-[#547fee]"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-700 mb-1">
                          Number of Bedrooms
                        </label>
                        <select
                          value={formData.bedrooms}
                          onChange={(e) => setFormData({ ...formData, bedrooms: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-[#547fee]"
                        >
                          <option value="1">1 Bedroom</option>
                          <option value="2">2 Bedrooms</option>
                          <option value="3">3 Bedrooms</option>
                          <option value="4+">4+ Bedrooms</option>
                        </select>
                      </div>
                    </div>
                  )}

                  {modalStep === 3 && (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-xs font-bold text-gray-700 mb-1">
                          Full Name
                        </label>
                        <input
                          type="text"
                          placeholder="Your Name"
                          value={formData.fullName}
                          onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-[#547fee]"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-700 mb-1">
                          Email Address
                        </label>
                        <input
                          type="email"
                          placeholder="name@example.com"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-[#547fee]"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-700 mb-1">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          placeholder="+216 20 000 000"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-[#547fee]"
                        />
                      </div>
                    </div>
                  )}

                  <div className="mt-8 flex items-center justify-between gap-3">
                    {modalStep > 1 ? (
                      <button
                        type="button"
                        onClick={() => setModalStep(modalStep - 1)}
                        className="px-5 py-2.5 rounded-full border border-gray-200 text-xs font-bold text-gray-600 hover:bg-gray-50 transition-colors border-none cursor-pointer"
                      >
                        Back
                      </button>
                    ) : <div />}

                    <button
                      type="button"
                      onClick={handleNextStep}
                      className="bg-[#547fee] hover:bg-[#436cd9] text-white px-6 py-2.5 rounded-full font-bold text-xs shadow-md transition-all border-none cursor-pointer"
                    >
                      {modalStep === 3 ? "Submit Property" : "Continue"}
                    </button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-6">
                  <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-xl">
                    ✓
                  </div>
                  <h3 className="font-['Bricolage_Grotesk',sans-serif] font-bold text-xl text-gray-900 mb-2">
                    Application Submitted!
                  </h3>
                  <p className="font-['Inter_Tight:Regular',sans-serif] text-xs sm:text-sm text-gray-600 mb-6 leading-relaxed">
                    Thank you for partnering with Darbook! Our host onboard specialist will contact you within 24 hours to help activate your listing.
                  </p>
                  <button
                    type="button"
                    onClick={resetModal}
                    className="bg-[#547fee] text-white px-6 py-2.5 rounded-full font-bold text-xs border-none cursor-pointer"
                  >
                    Close Window
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ─── 8. Authentic Darbook Dark Footer ───────────────────────────────── */}
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
              <button
                type="button"
                onClick={() => setIsModalOpen(true)}
                className="bg-[#547fee] hover:bg-[#436cd9] transition-all text-white font-semibold text-xs sm:text-sm px-6 py-2.5 rounded-full border-none cursor-pointer shadow-md hover:shadow-lg hover:scale-102 no-underline inline-flex items-center justify-center w-fit mt-2"
              >
                List your property
              </button>
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
          className="absolute right-4 sm:right-8 bottom-6 size-10 bg-[#547fee] hover:bg-[#436cd9] transition-all rounded-full flex items-center justify-center cursor-pointer border-none shadow-lg active:scale-95 z-10"
        >
          <svg className="size-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
          </svg>
        </button>
      </footer>
    </div>
  );
}
