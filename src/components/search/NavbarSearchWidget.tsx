"use client";

import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "motion/react";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Search01Icon,
  Location01Icon,
  Calendar03Icon,
  UserGroupIcon,
  ArrowDown01Icon,
  ArrowLeft01Icon,
  ArrowRight01Icon,
  Tick01Icon,
  Compass01Icon,
  House01Icon,
  BeachIcon,
  Building01Icon,
  TreesIcon,
  SwimmingIcon,
  Cancel01Icon,
} from "@hugeicons-pro/core-stroke-rounded";

interface NavbarSearchWidgetProps {
  initialLocation?: string;
  initialCheckIn?: string;
  initialCheckOut?: string;
  initialGuests?: string;
  onSearch?: (params: {
    location: string;
    checkIn: string;
    checkOut: string;
    guests: string;
  }) => void;
}

const DESTINATION_SUGGESTIONS = [
  {
    name: "Toute la Tunisie",
    subtitle: "Explorez toutes les destinations",
    icon: Compass01Icon,
    iconBg: "bg-blue-50 text-[#4a77ec]",
    badge: "Populaire",
  },
  {
    name: "Djerba",
    subtitle: "Île des rêves & Dars traditionnels",
    icon: BeachIcon,
    iconBg: "bg-amber-50 text-amber-600",
    badge: "Plage",
  },
  {
    name: "Tunis & Sidi Bou Said",
    subtitle: "Capitale, Médina & Vue sur mer",
    icon: House01Icon,
    iconBg: "bg-rose-50 text-rose-600",
    badge: "Historique",
  },
  {
    name: "Hammamet",
    subtitle: "Plages dorées & Villas de charme",
    icon: SwimmingIcon,
    iconBg: "bg-emerald-50 text-emerald-600",
    badge: "Côte",
  },
  {
    name: "Sousse & Monastir",
    subtitle: "Perle du Sahel & Villégiature",
    icon: Building01Icon,
    iconBg: "bg-sky-50 text-sky-600",
    badge: "Côte",
  },
  {
    name: "Tozeur & Sahara",
    subtitle: "Oasis, Palmiers & Désert",
    icon: TreesIcon,
    iconBg: "bg-orange-50 text-orange-600",
    badge: "Désert",
  },
];

export default function NavbarSearchWidget({
  initialLocation = "Choose the city",
  initialCheckIn = "03/21/2019",
  initialCheckOut = "03/21/2019",
  initialGuests = "2 adults",
  onSearch,
}: NavbarSearchWidgetProps) {
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"location" | "dates" | "guests">("location");

  // Search field values
  const [location, setLocation] = useState(initialLocation);
  const [checkIn, setCheckIn] = useState(initialCheckIn);
  const [checkOut, setCheckOut] = useState(initialCheckOut);
  const [guests, setGuests] = useState(initialGuests);

  // Date Range Picker State
  const [calendarYear, setCalendarYear] = useState(() => new Date().getFullYear());
  const [calendarMonth, setCalendarMonth] = useState(() => new Date().getMonth());
  const [datePickerTarget, setDatePickerTarget] = useState<"checkIn" | "checkOut">("checkIn");

  // Adults and kids counts
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Lock body scroll on mobile/tablet when search sheet is open
  useEffect(() => {
    if (isOpen && typeof window !== "undefined" && window.innerWidth < 1024) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Close desktop dropdown on outside click or Escape
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node) &&
        popoverRef.current &&
        !popoverRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  // Date Format and Calculation Helpers
  const formatDateForInput = (d: Date) => {
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const toISODate = (dateStr: string) => {
    if (!dateStr || dateStr === "03/21/2019") return "";
    if (dateStr.includes("/")) {
      const parts = dateStr.split("/").map(Number);
      if (parts.length >= 3) {
        return `${parts[2]}-${String(parts[0]).padStart(2, "0")}-${String(parts[1]).padStart(2, "0")}`;
      }
    }
    return dateStr;
  };

  const formatDateLabel = (dateStr: string) => {
    if (!dateStr || dateStr === "03/21/2019") return "Select date";
    const iso = toISODate(dateStr);
    const parts = iso.split("-").map(Number);
    if (parts.length < 3) return dateStr;
    const date = new Date(parts[0], parts[1] - 1, parts[2]);
    if (isNaN(date.getTime())) return dateStr;
    return date.toLocaleDateString("en-US", { weekday: "short", day: "numeric", month: "short" });
  };

  const handleDateSelect = (year: number, monthIndex: number, dayNum: number) => {
    const selectedStr = `${year}-${String(monthIndex + 1).padStart(2, "0")}-${String(dayNum).padStart(2, "0")}`;
    const isoCheckIn = toISODate(checkIn);
    const isoCheckOut = toISODate(checkOut);

    if (datePickerTarget === "checkIn") {
      setCheckIn(selectedStr);
      if (!isoCheckOut || selectedStr >= isoCheckOut) {
        const nextDate = new Date(year, monthIndex, dayNum + 3);
        setCheckOut(formatDateForInput(nextDate));
      }
      setDatePickerTarget("checkOut");
    } else {
      if (isoCheckIn && selectedStr <= isoCheckIn) {
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

    const isoCheckIn = toISODate(checkIn);
    const isoCheckOut = toISODate(checkOut);

    return (
      <div key={`${year}-${monthIndex}`} className="flex-1 min-w-[240px] max-w-[280px] sm:max-w-none shrink-0">
        <div className="text-center font-bold text-slate-900 text-sm mb-3">
          {monthNames[monthIndex]} {year}
        </div>
        <div className="grid grid-cols-7 gap-1 text-center mb-1">
          {["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"].map((dayName) => (
            <span key={dayName} className="text-xs font-semibold text-slate-400 py-1">
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
            const isCheckIn = cellDateStr === isoCheckIn;
            const isCheckOut = cellDateStr === isoCheckOut;
            const isInRange = Boolean(isoCheckIn && isoCheckOut && cellDateStr > isoCheckIn && cellDateStr < isoCheckOut);

            return (
              <button
                key={`day-${day}`}
                type="button"
                onClick={() => handleDateSelect(year, monthIndex, day)}
                className={`h-8 text-xs font-bold transition-all cursor-pointer flex items-center justify-center border-none ${
                  isCheckIn
                    ? "bg-[#3B68EC] text-white rounded-l-full rounded-r-none shadow-xs"
                    : isCheckOut
                    ? "bg-[#3B68EC] text-white rounded-r-full rounded-l-none shadow-xs"
                    : isInRange
                    ? "bg-[#3B68EC]/15 text-slate-900 rounded-none"
                    : "hover:bg-slate-100 text-slate-700 rounded-full"
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

  const handleSearchSubmit = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setIsOpen(false);
    if (onSearch) {
      onSearch({ location, checkIn, checkOut, guests });
    }
  };

  return (
    <div ref={containerRef} className="relative z-40 w-full flex justify-center">
      {/* ── 1. COMPACT NAVBAR PILL (Single Robust In-Place Trigger) ── */}
      <button
        type="button"
        onClick={() => {
          setIsOpen(!isOpen);
          setActiveTab("location");
        }}
        className="flex items-center bg-white hover:bg-slate-50 active:scale-[0.99] border border-slate-200/90 rounded-full px-2.5 sm:px-3.5 py-1 sm:py-1.5 cursor-pointer shadow-2xs hover:shadow-xs transition-all gap-1.5 sm:gap-2.5 select-none min-w-0 max-w-full text-left"
      >
        {/* Location */}
        <div className="flex items-center gap-1 sm:gap-1.5 text-[11.5px] sm:text-xs font-bold text-slate-900 min-w-0 shrink">
          <HugeiconsIcon icon={SwimmingIcon} size={14} className="text-[#3B68EC] shrink-0" />
          <span className="truncate max-w-[95px] sm:max-w-[130px] lg:max-w-[160px] whitespace-nowrap">
            {location === "Choose the city" ? "Where to ?" : location}
          </span>
        </div>

        <div className="hidden sm:block h-3.5 w-px bg-slate-200 shrink-0" />

        {/* Dates (Visible on Tablet & Desktop) */}
        <div className="hidden sm:flex items-center gap-1 sm:gap-1.5 text-[11.5px] sm:text-xs font-semibold text-slate-700 min-w-0 shrink">
          <HugeiconsIcon icon={Calendar03Icon} size={13} className="text-slate-400 shrink-0" />
          <span className="truncate max-w-[90px] lg:max-w-[130px] whitespace-nowrap">
            {checkIn !== "03/21/2019" ? `${checkIn} - ${checkOut}` : "Any dates"}
          </span>
        </div>

        <div className="hidden lg:block h-3.5 w-px bg-slate-200 shrink-0" />

        {/* Guests (Visible on Desktop only) */}
        <div className="hidden lg:flex items-center gap-1.5 text-[11.5px] sm:text-xs font-semibold text-slate-700 min-w-0 shrink">
          <HugeiconsIcon icon={UserGroupIcon} size={13} className="text-slate-400 shrink-0" />
          <span className="truncate max-w-[80px] lg:max-w-[100px] whitespace-nowrap">
            {guests}
          </span>
        </div>

        {/* Search Circle */}
        <div className="w-6.5 h-6.5 sm:w-7.5 sm:h-7.5 rounded-full bg-[#3B68EC] text-white flex items-center justify-center shrink-0 ml-0.5 shadow-xs">
          <HugeiconsIcon icon={Search01Icon} size={13} className="shrink-0" />
        </div>
      </button>

      {/* ── 2. DESKTOP EXPANDED POPOVER OVERLAY (lg+ Screens) ── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={popoverRef}
            initial={{ opacity: 0, y: 10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.98 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="hidden lg:block absolute top-[calc(100%+12px)] left-1/2 -translate-x-1/2 w-[680px] xl:w-[740px] bg-white rounded-3xl shadow-2xl border border-gray-200/90 p-5 z-[700]"
          >
            {/* Desktop Tabs */}
            <div className="flex items-center gap-2 p-1 bg-slate-100/80 rounded-2xl mb-4">
              <button
                type="button"
                onClick={() => setActiveTab("location")}
                className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all border-none cursor-pointer flex items-center justify-center gap-1.5 ${
                  activeTab === "location"
                    ? "bg-white text-slate-900 shadow-xs"
                    : "text-slate-600 hover:text-slate-900 bg-transparent"
                }`}
              >
                <HugeiconsIcon icon={Location01Icon} size={14} className="text-[#3B68EC]" />
                <span className="truncate">{location === "Choose the city" ? "Destination" : location}</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("dates")}
                className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all border-none cursor-pointer flex items-center justify-center gap-1.5 ${
                  activeTab === "dates"
                    ? "bg-white text-slate-900 shadow-xs"
                    : "text-slate-600 hover:text-slate-900 bg-transparent"
                }`}
              >
                <HugeiconsIcon icon={Calendar03Icon} size={14} className="text-slate-500" />
                <span className="truncate">{checkIn !== "03/21/2019" ? `${checkIn} - ${checkOut}` : "Dates"}</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("guests")}
                className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all border-none cursor-pointer flex items-center justify-center gap-1.5 ${
                  activeTab === "guests"
                    ? "bg-white text-slate-900 shadow-xs"
                    : "text-slate-600 hover:text-slate-900 bg-transparent"
                }`}
              >
                <HugeiconsIcon icon={UserGroupIcon} size={14} className="text-slate-500" />
                <span className="truncate">{guests}</span>
              </button>
            </div>

            {/* Desktop Tab Contents */}
            {activeTab === "location" && (
              <div className="space-y-3">
                <div className="text-xs font-bold text-gray-500 uppercase tracking-wider px-1">
                  Popular destinations in Tunisia
                </div>
                <div className="grid grid-cols-2 gap-2 max-h-[260px] overflow-y-auto pr-1">
                  {DESTINATION_SUGGESTIONS.map((dest) => {
                    const IconComp = dest.icon;
                    const isSelected = location === dest.name;
                    return (
                      <div
                        key={dest.name}
                        onClick={() => {
                          setLocation(dest.name);
                          setActiveTab("dates");
                        }}
                        className={`flex items-center gap-3 p-2.5 rounded-2xl cursor-pointer transition-all border ${
                          isSelected
                            ? "bg-blue-50/80 border-[#3B68EC]/30 text-[#3B68EC]"
                            : "hover:bg-slate-50 border-transparent text-slate-800"
                        }`}
                      >
                        <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${dest.iconBg}`}>
                          <HugeiconsIcon icon={IconComp} size={18} />
                        </div>
                        <div className="flex flex-col min-w-0">
                          <span className="text-xs font-bold truncate">{dest.name}</span>
                          <span className="text-[11px] text-gray-500 truncate">{dest.subtitle}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {activeTab === "dates" && (
              <div className="space-y-3">
                <div className="flex items-center justify-between px-2">
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setDatePickerTarget("checkIn")}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                        datePickerTarget === "checkIn"
                          ? "bg-blue-50 border-[#3B68EC] text-[#3B68EC]"
                          : "border-gray-200 text-gray-700 bg-white"
                      }`}
                    >
                      Check-in: {formatDateLabel(checkIn)}
                    </button>
                    <button
                      type="button"
                      onClick={() => setDatePickerTarget("checkOut")}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                        datePickerTarget === "checkOut"
                          ? "bg-blue-50 border-[#3B68EC] text-[#3B68EC]"
                          : "border-gray-200 text-gray-700 bg-white"
                      }`}
                    >
                      Check-out: {formatDateLabel(checkOut)}
                    </button>
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => {
                        if (calendarMonth === 0) {
                          setCalendarMonth(11);
                          setCalendarYear((y) => y - 1);
                        } else {
                          setCalendarMonth((m) => m - 1);
                        }
                      }}
                      className="w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center border-none cursor-pointer text-slate-700"
                    >
                      <HugeiconsIcon icon={ArrowLeft01Icon} size={14} />
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        if (calendarMonth === 11) {
                          setCalendarMonth(0);
                          setCalendarYear((y) => y + 1);
                        } else {
                          setCalendarMonth((m) => m + 1);
                        }
                      }}
                      className="w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center border-none cursor-pointer text-slate-700"
                    >
                      <HugeiconsIcon icon={ArrowRight01Icon} size={14} />
                    </button>
                  </div>
                </div>

                <div className="flex gap-4">
                  {renderMonthGrid(calendarYear, calendarMonth)}
                  {renderMonthGrid(
                    calendarMonth === 11 ? calendarYear + 1 : calendarYear,
                    calendarMonth === 11 ? 0 : calendarMonth + 1
                  )}
                </div>
              </div>
            )}

            {activeTab === "guests" && (
              <div className="space-y-4 p-2">
                <div className="flex items-center justify-between py-2 border-b border-gray-100">
                  <div>
                    <div className="text-sm font-bold text-gray-900">Adults</div>
                    <div className="text-xs text-gray-400">Ages 13 or above</div>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      disabled={adults <= 1}
                      onClick={() => {
                        const next = Math.max(1, adults - 1);
                        setAdults(next);
                        setGuests(`${next} adult${next > 1 ? "s" : ""}${children > 0 ? `, ${children} kid${children > 1 ? "s" : ""}` : ""}`);
                      }}
                      className="w-8 h-8 rounded-full border border-gray-200 disabled:opacity-40 flex items-center justify-center font-bold text-sm hover:bg-gray-50 cursor-pointer"
                    >
                      -
                    </button>
                    <span className="text-sm font-bold w-4 text-center">{adults}</span>
                    <button
                      type="button"
                      onClick={() => {
                        const next = adults + 1;
                        setAdults(next);
                        setGuests(`${next} adult${next > 1 ? "s" : ""}${children > 0 ? `, ${children} kid${children > 1 ? "s" : ""}` : ""}`);
                      }}
                      className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center font-bold text-sm hover:bg-gray-50 cursor-pointer"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between py-2">
                  <div>
                    <div className="text-sm font-bold text-gray-900">Children</div>
                    <div className="text-xs text-gray-400">Ages 0 to 12</div>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      disabled={children <= 0}
                      onClick={() => {
                        const next = Math.max(0, children - 1);
                        setChildren(next);
                        setGuests(`${adults} adult${adults > 1 ? "s" : ""}${next > 0 ? `, ${next} kid${next > 1 ? "s" : ""}` : ""}`);
                      }}
                      className="w-8 h-8 rounded-full border border-gray-200 disabled:opacity-40 flex items-center justify-center font-bold text-sm hover:bg-gray-50 cursor-pointer"
                    >
                      -
                    </button>
                    <span className="text-sm font-bold w-4 text-center">{children}</span>
                    <button
                      type="button"
                      onClick={() => {
                        const next = children + 1;
                        setChildren(next);
                        setGuests(`${adults} adult${adults > 1 ? "s" : ""}${next > 0 ? `, ${next} kid${next > 1 ? "s" : ""}` : ""}`);
                      }}
                      className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center font-bold text-sm hover:bg-gray-50 cursor-pointer"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Desktop Action Footer */}
            <div className="flex items-center justify-between pt-4 mt-4 border-t border-gray-100">
              <button
                type="button"
                onClick={() => {
                  setLocation("Choose the city");
                  setCheckIn("03/21/2019");
                  setCheckOut("03/21/2019");
                  setAdults(2);
                  setChildren(0);
                  setGuests("2 adults");
                }}
                className="text-xs font-bold text-gray-500 hover:text-gray-900 bg-transparent border-none cursor-pointer underline"
              >
                Clear all
              </button>
              <button
                type="button"
                onClick={handleSearchSubmit}
                className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#3B68EC] hover:bg-[#254EDB] text-white text-xs font-bold shadow-md cursor-pointer border-none transition-all active:scale-95"
              >
                <HugeiconsIcon icon={Search01Icon} size={15} />
                <span>Search stays</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── 3. MOBILE & TABLET NATIVE BOTTOM SHEET SEARCH MODAL (< lg) ── */}
      {mounted &&
        createPortal(
          <AnimatePresence>
            {isOpen && (
              <div className="lg:hidden fixed inset-0 z-[1000] flex flex-col justify-end">
                {/* Backdrop */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  onClick={() => setIsOpen(false)}
                  className="fixed inset-0 bg-black/60 backdrop-blur-xs"
                />

                {/* Bottom Sheet */}
                <motion.div
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  exit={{ y: "100%" }}
                  transition={{ type: "spring", damping: 28, stiffness: 300 }}
                  className="relative w-full max-h-[88vh] bg-white rounded-t-[32px] p-5 shadow-2xl z-[1001] overflow-y-auto flex flex-col space-y-4"
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* Drag Handle */}
                  <div className="w-12 h-1.5 bg-gray-300 rounded-full mx-auto mb-1 shrink-0" />

                  {/* Header */}
                  <div className="flex items-center justify-between pb-3 border-b border-gray-100 shrink-0">
                    <h3 className="font-['Bricolage_Grotesk',sans-serif] font-bold text-lg text-gray-900 m-0">
                      Search stays
                    </h3>
                    <button
                      type="button"
                      onClick={() => setIsOpen(false)}
                      className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 flex items-center justify-center border-none cursor-pointer"
                    >
                      <HugeiconsIcon icon={Cancel01Icon} size={16} />
                    </button>
                  </div>

                  {/* 1. Destination Section */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-600 uppercase tracking-wider">
                      Where to ?
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {DESTINATION_SUGGESTIONS.map((dest) => {
                        const IconComp = dest.icon;
                        const isSelected = location === dest.name;
                        return (
                          <div
                            key={dest.name}
                            onClick={() => setLocation(dest.name)}
                            className={`flex items-center gap-2.5 p-2.5 rounded-2xl cursor-pointer transition-all border ${
                              isSelected
                                ? "bg-blue-50 border-[#3B68EC] text-[#3B68EC] font-bold"
                                : "bg-gray-50 border-gray-200/80 text-gray-800"
                            }`}
                          >
                            <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${dest.iconBg}`}>
                              <HugeiconsIcon icon={IconComp} size={16} />
                            </div>
                            <span className="text-xs font-bold truncate">{dest.name}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* 2. Dates Section */}
                  <div className="space-y-2 pt-2 border-t border-gray-100">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-bold text-gray-600 uppercase tracking-wider">
                        Travel dates
                      </label>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => setDatePickerTarget("checkIn")}
                          className={`px-2.5 py-1 rounded-lg text-xs font-bold border ${
                            datePickerTarget === "checkIn"
                              ? "bg-blue-50 border-[#3B68EC] text-[#3B68EC]"
                              : "border-gray-200 text-gray-700 bg-white"
                          }`}
                        >
                          In: {formatDateLabel(checkIn)}
                        </button>
                        <button
                          type="button"
                          onClick={() => setDatePickerTarget("checkOut")}
                          className={`px-2.5 py-1 rounded-lg text-xs font-bold border ${
                            datePickerTarget === "checkOut"
                              ? "bg-blue-50 border-[#3B68EC] text-[#3B68EC]"
                              : "border-gray-200 text-gray-700 bg-white"
                          }`}
                        >
                          Out: {formatDateLabel(checkOut)}
                        </button>
                      </div>
                    </div>

                    <div className="overflow-x-auto no-scrollbar py-2">
                      <div className="flex gap-4 min-w-max">
                        {renderMonthGrid(calendarYear, calendarMonth)}
                        {renderMonthGrid(
                          calendarMonth === 11 ? calendarYear + 1 : calendarYear,
                          calendarMonth === 11 ? 0 : calendarMonth + 1
                        )}
                      </div>
                    </div>
                  </div>

                  {/* 3. Guests Section */}
                  <div className="space-y-3 pt-2 border-t border-gray-100">
                    <label className="text-xs font-bold text-gray-600 uppercase tracking-wider">
                      Guests
                    </label>

                    <div className="flex items-center justify-between py-1">
                      <div>
                        <div className="text-xs font-bold text-gray-900">Adults</div>
                        <div className="text-[11px] text-gray-400">Ages 13 or above</div>
                      </div>
                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          disabled={adults <= 1}
                          onClick={() => {
                            const next = Math.max(1, adults - 1);
                            setAdults(next);
                            setGuests(`${next} adult${next > 1 ? "s" : ""}${children > 0 ? `, ${children} kid${children > 1 ? "s" : ""}` : ""}`);
                          }}
                          className="w-8 h-8 rounded-full border border-gray-200 disabled:opacity-40 flex items-center justify-center font-bold text-sm hover:bg-gray-50 cursor-pointer"
                        >
                          -
                        </button>
                        <span className="text-sm font-bold w-4 text-center">{adults}</span>
                        <button
                          type="button"
                          onClick={() => {
                            const next = adults + 1;
                            setAdults(next);
                            setGuests(`${next} adult${next > 1 ? "s" : ""}${children > 0 ? `, ${children} kid${children > 1 ? "s" : ""}` : ""}`);
                          }}
                          className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center font-bold text-sm hover:bg-gray-50 cursor-pointer"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between py-1">
                      <div>
                        <div className="text-xs font-bold text-gray-900">Children</div>
                        <div className="text-[11px] text-gray-400">Ages 0 to 12</div>
                      </div>
                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          disabled={children <= 0}
                          onClick={() => {
                            const next = Math.max(0, children - 1);
                            setChildren(next);
                            setGuests(`${adults} adult${adults > 1 ? "s" : ""}${next > 0 ? `, ${next} kid${next > 1 ? "s" : ""}` : ""}`);
                          }}
                          className="w-8 h-8 rounded-full border border-gray-200 disabled:opacity-40 flex items-center justify-center font-bold text-sm hover:bg-gray-50 cursor-pointer"
                        >
                          -
                        </button>
                        <span className="text-sm font-bold w-4 text-center">{children}</span>
                        <button
                          type="button"
                          onClick={() => {
                            const next = children + 1;
                            setChildren(next);
                            setGuests(`${adults} adult${adults > 1 ? "s" : ""}${next > 0 ? `, ${next} kid${next > 1 ? "s" : ""}` : ""}`);
                          }}
                          className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center font-bold text-sm hover:bg-gray-50 cursor-pointer"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Bottom Search Button */}
                  <div className="pt-3 border-t border-gray-100 flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => {
                        setLocation("Choose the city");
                        setCheckIn("03/21/2019");
                        setCheckOut("03/21/2019");
                        setAdults(2);
                        setChildren(0);
                        setGuests("2 adults");
                      }}
                      className="px-4 py-3 rounded-full text-xs font-bold text-gray-500 hover:text-gray-900 bg-gray-100 border-none cursor-pointer"
                    >
                      Clear
                    </button>
                    <button
                      type="button"
                      onClick={handleSearchSubmit}
                      className="flex-1 py-3 bg-[#3B68EC] hover:bg-[#254EDB] text-white text-xs font-bold rounded-full transition-colors cursor-pointer border-none shadow-sm flex items-center justify-center gap-2"
                    >
                      <HugeiconsIcon icon={Search01Icon} size={16} />
                      <span>Search stays</span>
                    </button>
                  </div>
                </motion.div>
              </div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </div>
  );
}
