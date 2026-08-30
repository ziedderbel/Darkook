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
  Facebook02Icon,
  NewTwitterIcon,
  InstagramIcon,
  PinterestIcon,
  YoutubeIcon,
  Add01Icon,
  Remove01Icon,
} from "@hugeicons-pro/core-stroke-rounded";

import AuthModal from "@/components/AuthModal";
import DarkModeToggle from "@/components/theme/dark-mode-toggle";
import FullPageMobileMenu from "@/components/layout/FullPageMobileMenu";
import svgPaths from "@/imports/LandingPage/svg-p2y91de9gv";
import imgRusticPatioFurnitureHouseDeckWithVegetation2 from "@/imports/LandingPage/fabb010c874f57c47211afac0d2c3c2209cc0840.png";

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
      {/* Switcher tabs */}
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
              layoutId="termsDropdownActiveTabUnderline"
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
              layoutId="termsDropdownActiveTabUnderline"
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

      {/* Desktop Popover */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="terms-lang-popover"
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
              <div key="terms-lang-mobile" className="lg:hidden">
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

// ─── Terms Accordion Data ─────────────────────────────────────────────────────

interface TermSection {
  id: string;
  title: string;
  content: React.ReactNode;
}

const termsSections: TermSection[] = [
  {
    id: "scope-of-services",
    title: "1. Scope of Services of Darbook",
    content: (
      <div className="space-y-4 text-xs sm:text-sm text-slate-600 leading-relaxed">
        <p className="font-medium text-slate-700">
          1.1 To create a host account on the Darbook platform, the user must complete the registration process by providing the following information:
        </p>
        <ul className="list-disc pl-5 space-y-1.5 text-slate-600">
          <li>His/her first and last name</li>
          <li>A valid email address</li>
          <li>A reachable phone number</li>
          <li>His/her country of residence</li>
          <li>A confirmation of his/her gender</li>
          <li>Creation of a secure password</li>
          <li>Acceptance of these Terms and Conditions of Use</li>
        </ul>
        <p>
          The user guarantees that the information provided is accurate, complete, and up to date. Any omission or inaccuracy in the data may result in the suspension or termination of the account.
        </p>
        <p className="font-medium text-slate-700 pt-2">
          1.2 To become a host on the Darbook platform and offer services, the user must meet the following conditions:
        </p>
        <div className="space-y-2 pl-3 border-l-2 border-blue-200">
          <p>
            <strong className="text-slate-900">Age and legal capacity:</strong> The user must be of legal age according to Tunisian law and have the necessary legal capacity to enter into legally binding contracts.
          </p>
          <p>
            <strong className="text-slate-900">Legal compliance of accommodations:</strong> Ensure that the accommodations or services offered comply with all applicable laws and regulations, particularly in terms of safety, hygiene, urban planning, and administrative permits.
          </p>
          <p>
            <strong className="text-slate-900">Legal representation:</strong> If the user is acting on behalf of a legal entity (company, organization), they must have the legal authority to represent and bind this entity in accordance with the applicable laws.
          </p>
        </div>
        <p>
          Any failure to meet these conditions may result in the suspension or termination of the host account by Darbook.
        </p>
        <p>
          1.3 Obligation to provide accurate and up-to-date information during registration and keep listing details fully synchronized.
        </p>
      </div>
    ),
  },
  {
    id: "registration-creation",
    title: "2. Registration and Creation of a Host Account",
    content: (
      <div className="space-y-3 text-xs sm:text-sm text-slate-600 leading-relaxed">
        <p>
          2.1 Each host must maintain a single active account. Account sharing or transferring credentials to third parties without prior written authorization from Darbook is strictly prohibited.
        </p>
        <p>
          2.2 Identity verification may be required, including providing a valid government-issued ID and proof of property ownership or authorized management rights for vacation rental properties in Tunisia.
        </p>
        <p>
          2.3 Darbook reserves the right to accept, reject, or request additional documentation for any host application at its sole discretion to protect platform integrity.
        </p>
      </div>
    ),
  },
  {
    id: "obligations-host",
    title: "3. Obligations of the Host",
    content: (
      <div className="space-y-3 text-xs sm:text-sm text-slate-600 leading-relaxed">
        <p>
          3.1 Hosts are responsible for providing clear, accurate descriptions, authentic photographs, and true amenity representations of the listed properties (e.g. private swimming pool, air conditioning, Wi-Fi speed).
        </p>
        <p>
          3.2 The host agrees to honor all accepted bookings and maintain high hospitality and cleanliness standards at all times.
        </p>
        <p>
          3.3 Immediate assistance and emergency contact information must be provided to travelers during their stay.
        </p>
      </div>
    ),
  },
  {
    id: "management-reservations",
    title: "4. Management of Reservations",
    content: (
      <div className="space-y-3 text-xs sm:text-sm text-slate-600 leading-relaxed">
        <p>
          4.1 Once a guest submits a reservation request or completes an instant booking, the host receives instant notification and has a designated time window to confirm or coordinate check-in.
        </p>
        <p>
          4.2 Unauthorized host cancellations penalize guest experience and may incur platform fees, listing ranking demotion, or temporary calendar blocking.
        </p>
        <p>
          4.3 Flexible or strict cancellation policies chosen by the host apply directly according to the agreed terms at checkout.
        </p>
      </div>
    ),
  },
  {
    id: "fees-payments",
    title: "5. Fees and Payments",
    content: (
      <div className="space-y-3 text-xs sm:text-sm text-slate-600 leading-relaxed">
        <p>
          5.1 Darbook charges a transparent service commission on confirmed reservations to cover platform maintenance, customer support, and secure payment processing.
        </p>
        <p>
          5.2 Host payouts are released securely via bank wire transfer or preferred local payment gateways typically 24 hours after successful guest check-in.
        </p>
        <p>
          5.3 All prices shown include relevant applicable taxes and transparently disclose optional cleaning or service fees.
        </p>
      </div>
    ),
  },
  {
    id: "insurance-liability",
    title: "6. Insurance and Liability",
    content: (
      <div className="space-y-3 text-xs sm:text-sm text-slate-600 leading-relaxed">
        <p>
          6.1 Hosts are advised to hold adequate property, civil liability, and home insurance covering short-term vacation rental activities in Tunisia.
        </p>
        <p>
          6.2 Darbook provides mediation tools but is not liable for direct damage, loss of personal belongings, or unforeseen force majeure events occurring during stays.
        </p>
      </div>
    ),
  },
  {
    id: "reviews-reputation",
    title: "7. Reviews and Reputation",
    content: (
      <div className="space-y-3 text-xs sm:text-sm text-slate-600 leading-relaxed">
        <p>
          7.1 Only guests who completed an authentic verified stay can post reviews and ratings.
        </p>
        <p>
          7.2 Reviews must remain truthful, respectful, and free of extortion, commercial promotion, or abusive language. Darbook reserves the right to moderate illegitimate content.
        </p>
      </div>
    ),
  },
  {
    id: "modifications-termination",
    title: "8. Modifications and Termination of Host Account",
    content: (
      <div className="space-y-3 text-xs sm:text-sm text-slate-600 leading-relaxed">
        <p>
          8.1 Hosts may unpublish listings or close their accounts at any time, provided all upcoming confirmed reservations are fulfilled or properly transferred with guest consent.
        </p>
        <p>
          8.2 Darbook reserves the right to suspend or terminate accounts that repeatedly violate quality guidelines, safety protocols, or terms of service.
        </p>
      </div>
    ),
  },
  {
    id: "contractual-relations",
    title: "9. Contractual Relations",
    content: (
      <div className="space-y-3 text-xs sm:text-sm text-slate-600 leading-relaxed">
        <p>
          9.1 Darbook acts as an online intermediation and booking technology platform. The rental agreement itself is formed directly between the Host and the Guest.
        </p>
        <p>
          9.2 Neither party shall be considered an employee, agent, or partner of Darbook.
        </p>
      </div>
    ),
  },
  {
    id: "claims-disputes",
    title: "10. Claims and Disputes",
    content: (
      <div className="space-y-3 text-xs sm:text-sm text-slate-600 leading-relaxed">
        <p>
          10.1 In the event of a disagreement regarding check-in condition, cleanliness, or amenities, travelers and hosts are encouraged to resolve matters amicably via Darbook Customer Support within 24 hours of arrival.
        </p>
        <p>
          10.2 Tunisian law governs these terms, and any unresolved litigation shall fall under the jurisdiction of competent Tunisian courts.
        </p>
      </div>
    ),
  },
  {
    id: "promotion-listings",
    title: "11. Promotion of Listings",
    content: (
      <div className="space-y-3 text-xs sm:text-sm text-slate-600 leading-relaxed">
        <p>
          11.1 By listing on Darbook, the host grants the platform a non-exclusive license to feature property photos, descriptions, and highlights in promotional campaigns, social media, and digital catalogs.
        </p>
      </div>
    ),
  },
  {
    id: "privacy-data-protection",
    title: "12. Privacy and Data Protection",
    content: (
      <div className="space-y-3 text-xs sm:text-sm text-slate-600 leading-relaxed">
        <p>
          12.1 Personal data is processed in strict compliance with applicable privacy regulations and the Darbook Privacy Policy.
        </p>
        <p>
          12.2 Contact details (phone, email, exact GPS coordinates) are only disclosed to the parties once a reservation has been confirmed.
        </p>
      </div>
    ),
  },
];

// ─── Main Terms & Conditions Component ────────────────────────────────────────

export default function TermsContent() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState("FRA");
  const [selectedCurrency, setSelectedCurrency] = useState("EUR");
  const [expandedSection, setExpandedSection] = useState<string | null>("scope-of-services");

  const toggleSection = (id: string) => {
    setExpandedSection((prev) => (prev === id ? null : id));
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 font-['Inter_Tight',sans-serif] antialiased overflow-x-hidden selection:bg-[#547fee]/20 selection:text-[#547fee]">
      
      {/* ─── Hero & Navbar Header ────────────────────────────────────────────── */}
      <header className="relative w-full overflow-hidden bg-[#09112a]">
        {/* Background Image with Sea/Patio Reflection */}
        <div className="absolute inset-0 pointer-events-none select-none">
          <img
            src={toImgSrc(imgRusticPatioFurnitureHouseDeckWithVegetation2)}
            alt="Darbook Luxury Stays"
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
        <div className="relative z-20 max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20 pb-20 sm:pb-26 text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white font-['Bricolage_Grotesk',sans-serif] tracking-tight m-0 drop-shadow-[0_2px_12px_rgba(0,0,0,0.5)]">
            Term & conditions
          </h1>
        </div>
      </header>

      {/* ─── Main Content Container with Top Rounded Corners ────────────────── */}
      <main className="relative z-10 -mt-6 sm:-mt-8 bg-[#f8fafc] rounded-t-[28px] sm:rounded-t-[36px] lg:rounded-t-[44px] pb-16 sm:pb-24">
        
        {/* Breadcrumb Navigation */}
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8 pb-3">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-500">
            <Link href="/" className="hover:text-slate-900 transition-colors no-underline text-slate-500">
              Home
            </Link>
            <span className="text-slate-400">›</span>
            <span className="text-[#547fee] font-bold">
              Term & conditions
            </span>
          </nav>
        </div>

        {/* Main Accordion Container */}
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 pt-2">
          <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-8 lg:p-10 border border-slate-200/90 shadow-2xs space-y-2">
            {termsSections.map((section) => {
              const isExpanded = expandedSection === section.id;
              return (
                <div
                  key={section.id}
                  className="border-b border-slate-100 last:border-b-0 transition-colors"
                >
                  <button
                    type="button"
                    onClick={() => toggleSection(section.id)}
                    aria-expanded={isExpanded}
                    className="w-full py-4 sm:py-5 flex items-center justify-between text-left cursor-pointer border-none bg-transparent group select-none gap-4"
                  >
                  <span
                    className={`font-['Bricolage_Grotesk',sans-serif] font-bold text-sm sm:text-base transition-colors ${
                      isExpanded ? "text-[#181743]" : "text-slate-800 group-hover:text-[#547fee]"
                    }`}
                  >
                    {section.title}
                  </span>
                  <div
                    className={`size-6 sm:size-7 rounded-full flex items-center justify-center shrink-0 transition-all duration-200 ${
                      isExpanded
                        ? "text-slate-900 bg-slate-100"
                        : "text-slate-400 group-hover:text-slate-900 group-hover:bg-slate-50"
                    }`}
                  >
                    <HugeiconsIcon
                      icon={isExpanded ? Remove01Icon : Add01Icon}
                      size={16}
                    />
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isExpanded && (
                    <motion.div
                      key={`content-${section.id}`}
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="pb-5 sm:pb-6 pt-1 text-slate-600">
                        {section.content}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </main>

      {/* ─── Authentic Darbook Dark Footer ───────────────────────────────────── */}
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
