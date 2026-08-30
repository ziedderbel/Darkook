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
  isExpanded?: boolean;
  onExpandedChange?: (expanded: boolean) => void;
  onSearch?: (params: {
    location: string;
    checkIn: string;
    checkOut: string;
    guests: string;
  }) => void;
}

const DESTINATION_SUGGESTIONS = [
  {
    name: "À proximité",
    subtitle: "Découvrez les options à proximité",
    icon: Compass01Icon,
    iconBg: "bg-blue-50 text-[#4a77ec]",
    badge: "Nearby",
  },
  {
    name: "Djerba",
    subtitle: "Île des rêves & Dars traditionnels",
    icon: BeachIcon,
    iconBg: "bg-amber-50 text-amber-600",
    badge: "Populaire",
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
    badge: "Plage",
  },
  {
    name: "Sousse & Monastir",
    subtitle: "Perle du Sahel & Complexes de villégiature",
    icon: Building01Icon,
    iconBg: "bg-sky-50 text-sky-600",
    badge: "Côte",
  },
  {
    name: "Tozeur & Sahara",
    subtitle: "Oasis, Palmiers & Aventure désertique",
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
  isExpanded: controlledIsExpanded,
  onExpandedChange,
  onSearch,
}: NavbarSearchWidgetProps) {
  const [internalExpanded, setInternalExpanded] = useState(false);
  const isExpanded = controlledIsExpanded !== undefined ? controlledIsExpanded : internalExpanded;

  const setIsExpanded = (val: boolean) => {
    setInternalExpanded(val);
    onExpandedChange?.(val);
  };

  // Open Destination by default when expanded (exact Airbnb experience)
  const [activeTab, setActiveTab] = useState<"location" | "checkin" | "checkout" | "guests" | null>(
    "location"
  );

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (activeTab !== null && isExpanded && typeof window !== "undefined" && window.innerWidth < 1024) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [activeTab, isExpanded]);

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

  const calculateNights = (startStr: string, endStr: string) => {
    const s = toISODate(startStr);
    const e = toISODate(endStr);
    if (!s || !e) return 0;
    const sParts = s.split("-").map(Number);
    const eParts = e.split("-").map(Number);
    if (sParts.length < 3 || eParts.length < 3) return 0;
    const start = new Date(sParts[0], sParts[1] - 1, sParts[2]);
    const end = new Date(eParts[0], eParts[1] - 1, eParts[2]);
    const diffDays = Math.ceil((end.getTime() - start.getTime()) / (1000 * 3600 * 24));
    return diffDays > 0 ? diffDays : 0;
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
      setActiveTab("checkout");
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
      <div key={`${year}-${monthIndex}`} className="flex-1 min-w-[240px] max-w-[280px] sm:max-w-none shrink-0 snap-center">
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

  const containerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll adaptation: when any dropdown/popover opens in expanded mode, smoothly scroll the page if needed
  const ensureDropdownSpace = (popoverHeight = 420) => {
    if (typeof window === "undefined") return;
    setTimeout(() => {
      const el = containerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const requiredBottom = rect.bottom + popoverHeight + 32;

      if (requiredBottom > viewportHeight) {
        const scrollDelta = requiredBottom - viewportHeight;
        window.scrollBy({
          top: scrollDelta,
          behavior: "smooth",
        });
      } else if (rect.top < 70) {
        window.scrollBy({
          top: rect.top - 80,
          behavior: "smooth",
        });
      }
    }, 50);
  };

  // When expanding, always open location by default and adjust scroll
  useEffect(() => {
    if (isExpanded) {
      setActiveTab("location");
      ensureDropdownSpace(380);
    }
  }, [isExpanded]);

  useEffect(() => {
    if (isExpanded && activeTab) {
      const h = activeTab === "checkin" || activeTab === "checkout" ? 460 : activeTab === "guests" ? 380 : 380;
      ensureDropdownSpace(h);
    }
  }, [isExpanded, activeTab]);

  // Close on Escape or outside click
  useEffect(() => {
    if (!isExpanded) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsExpanded(false);
        setActiveTab(null);
      }
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsExpanded(false);
        setActiveTab(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isExpanded]);

  const handleSearchSubmit = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setIsExpanded(false);
    setActiveTab(null);
    if (onSearch) {
      onSearch({ location, checkIn, checkOut, guests });
    }
  };

  return (
    <div ref={containerRef} className="relative z-40 w-full flex justify-center">
      <AnimatePresence mode="wait">
          {!isExpanded ? (
            /* ── 1. COMPACT NAVBAR PILL (Single-row resting state) ── */
            <motion.div
              key="compact-search-pill"
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              onClick={() => {
                setIsExpanded(true);
                setActiveTab("location");
              }}
              className="flex items-center bg-white dark:bg-[#121a30] hover:bg-slate-50 dark:hover:bg-[#16203a] border border-slate-200/90 dark:border-slate-800 rounded-full px-3 sm:px-4 py-1.5 sm:py-2 cursor-pointer shadow-2xs hover:shadow-md transition-all gap-2 sm:gap-3 select-none min-w-0 max-w-full"
              transition={{ duration: 0.18 }}
            >
              {/* Location */}
              <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900 dark:text-white min-w-0 shrink">
                <HugeiconsIcon icon={Location01Icon} size={15} className="text-[#3B68EC] shrink-0" />
                <span className="truncate max-w-[100px] sm:max-w-[140px] lg:max-w-[170px] whitespace-nowrap">
                  {location === "Choose the city" || location === "Choose destination" ? "Where to ?" : location}
                </span>
              </div>

              <div className="h-4 w-px bg-slate-200 dark:bg-slate-700 shrink-0" />

              {/* Dates */}
              <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 dark:text-slate-300 min-w-0 shrink">
                <HugeiconsIcon icon={Calendar03Icon} size={14} className="text-slate-400 shrink-0" />
                <span className="truncate max-w-[80px] sm:max-w-[120px] lg:max-w-[140px] whitespace-nowrap">
                  {checkIn !== "03/21/2019" && checkIn !== "2026-03-21" ? `${formatDateLabel(checkIn)}` : "Any dates"}
                </span>
              </div>

              <div className="hidden sm:block h-4 w-px bg-slate-200 dark:bg-slate-700 shrink-0" />

              {/* Guests */}
              <div className="hidden sm:flex items-center gap-1.5 text-xs font-semibold text-slate-700 dark:text-slate-300 min-w-0 shrink">
                <HugeiconsIcon icon={UserGroupIcon} size={14} className="text-slate-400 shrink-0" />
                <span className="truncate max-w-[70px] lg:max-w-[100px] whitespace-nowrap">
                  {guests}
                </span>
              </div>

              {/* Search Button Circle */}
              <div
                className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#3B68EC] text-white flex items-center justify-center shrink-0 ml-0.5 shadow-xs hover:bg-[#254EDB] transition-colors"
              >
                <HugeiconsIcon icon={Search01Icon} size={14} className="shrink-0" />
              </div>
            </motion.div>
          ) : (
            /* ── 2. LARGER EXPANDED SEARCH BAR (Exact Airbnb Structure with Sliding Active Pill) ── */
            <motion.div
              key="expanded-search-bar"
              initial={{ opacity: 0, y: -6, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -6, scale: 0.98 }}
              className="bg-[#F1F5F9] dark:bg-[#0e162b] border border-slate-200/90 dark:border-slate-800 rounded-full shadow-2xl p-2 sm:p-2.5 flex items-center max-w-[960px] xl:max-w-[1020px] w-full select-none relative"
              transition={{ duration: 0.18 }}
            >
              {/* ── Segment 1: Where to ? / Destination ── */}
              <div
                onClick={() => setActiveTab("location")}
                className="relative flex items-center gap-3.5 px-6 py-3.5 rounded-full cursor-pointer flex-[1.4] min-w-0 transition-colors"
              >
                {/* Active White Sliding Pill */}
                {activeTab === "location" && (
                  <motion.div
                    layoutId="active-search-segment-pill"
                    className="absolute inset-0 bg-white dark:bg-[#16203a] rounded-full shadow-[0_6px_25px_rgba(0,0,0,0.12)] z-0"
                    transition={{ type: "spring", stiffness: 450, damping: 35 }}
                  />
                )}

                <div className="relative z-10 flex items-center gap-3.5 w-full min-w-0">
                  <div className="w-10 h-10 rounded-full bg-blue-50 text-[#3B68EC] flex items-center justify-center shrink-0 shadow-2xs">
                    <HugeiconsIcon icon={Location01Icon} size={20} />
                  </div>
                  <div className="flex flex-col min-w-0 flex-1">
                    <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                      Where to ?
                    </span>
                    <span className="text-sm sm:text-[15px] font-extrabold text-slate-900 dark:text-white truncate">
                      {location}
                    </span>
                  </div>
                  <div className="text-slate-400 pl-1 shrink-0">
                    <HugeiconsIcon
                      icon={ArrowDown01Icon}
                      size={15}
                      className={`transition-transform duration-200 ${
                        activeTab === "location" ? "rotate-180 text-[#3B68EC]" : ""
                      }`}
                    />
                  </div>
                </div>

                {/* ── Destination Popover (Desktop Popover + Mobile Bottom Sheet) ── */}
                <AnimatePresence>
                  {activeTab === "location" && (
                    <motion.div
                      initial={{ opacity: 0, y: 14, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 14, scale: 0.95 }}
                      transition={{ duration: 0.18 }}
                      className="hidden lg:block absolute top-[calc(100%+14px)] left-0 w-[400px] sm:w-[460px] bg-white dark:bg-[#121a30] rounded-[32px] shadow-2xl border border-gray-100 dark:border-slate-800 p-5 z-50 space-y-2"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className="px-3 py-1.5 text-xs font-extrabold text-gray-400 uppercase tracking-wider">
                        Suggestions de destinations
                      </div>
                      {DESTINATION_SUGGESTIONS.map((dest) => {
                        const IconComponent = dest.icon;
                        const isSelected = location === dest.name;
                        return (
                          <div
                            key={dest.name}
                            onClick={() => {
                              setLocation(dest.name);
                              setActiveTab("checkin");
                            }}
                            className={`flex items-center justify-between p-3 rounded-2xl cursor-pointer transition-all ${
                              isSelected
                                ? "bg-blue-50 dark:bg-blue-900/30 text-[#4a77ec] font-bold"
                                : "hover:bg-gray-50 dark:hover:bg-[#16203a] text-gray-900 dark:text-white"
                            }`}
                          >
                            <div className="flex items-center gap-3.5 min-w-0">
                              <div
                                className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${dest.iconBg}`}
                              >
                                <HugeiconsIcon icon={IconComponent} size={22} />
                              </div>
                              <div className="flex flex-col min-w-0">
                                <span className="text-sm font-bold dark:text-white truncate">{dest.name}</span>
                                <span className="text-xs text-gray-500 dark:text-slate-400 font-medium truncate">
                                  {dest.subtitle}
                                </span>
                              </div>
                            </div>
                            {isSelected ? (
                              <div className="w-6 h-6 rounded-full bg-[#4a77ec] flex items-center justify-center text-white shrink-0">
                                <HugeiconsIcon icon={Tick01Icon} size={15} />
                              </div>
                            ) : (
                              <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-slate-300 shrink-0">
                                {dest.badge}
                              </span>
                            )}
                          </div>
                        );
                      })}
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Mobile Bottom Sheet for Destination */}
                {mounted &&
                  createPortal(
                    <AnimatePresence>
                      {activeTab === "location" && (
                        <div className="lg:hidden fixed inset-0 z-[99999] flex items-end justify-center">
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={(e) => {
                              e.stopPropagation();
                              setActiveTab(null);
                            }}
                            className="fixed inset-0 bg-black/60 backdrop-blur-xs z-[190]"
                          />
                          <motion.div
                            initial={{ y: "100%" }}
                            animate={{ y: 0 }}
                            exit={{ y: "100%" }}
                            transition={{ type: "spring", damping: 28, stiffness: 300 }}
                            className="relative w-full max-h-[85vh] bg-white dark:bg-[#121a30] rounded-t-[28px] p-5 shadow-2xl z-[200] overflow-y-auto space-y-3"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <div className="w-12 h-1.5 bg-gray-300 dark:bg-slate-700 rounded-full mx-auto mb-2" />
                            <div className="flex items-center justify-between pb-3 border-b border-gray-100 dark:border-slate-800 mb-1">
                              <h3 className="font-bold text-base text-gray-900 dark:text-white">Where to ? Destination</h3>
                              <button
                                type="button"
                                onClick={() => setActiveTab(null)}
                                className="w-8 h-8 rounded-full bg-gray-100 dark:bg-slate-800 hover:bg-gray-200 dark:hover:bg-slate-700 text-gray-600 dark:text-slate-300 flex items-center justify-center border-none cursor-pointer"
                              >
                                <HugeiconsIcon icon={Cancel01Icon} size={16} />
                              </button>
                            </div>
                            <div className="space-y-1.5">
                              {DESTINATION_SUGGESTIONS.map((dest) => {
                                const IconComponent = dest.icon;
                                const isSelected = location === dest.name;
                                return (
                                  <div
                                    key={dest.name}
                                    onClick={() => {
                                      setLocation(dest.name);
                                      setActiveTab("checkin");
                                    }}
                                    className={`flex items-center justify-between p-3 rounded-2xl cursor-pointer transition-all ${
                                      isSelected
                                        ? "bg-blue-50 dark:bg-blue-900/30 text-[#4a77ec] font-bold border border-blue-200 dark:border-blue-700"
                                        : "hover:bg-gray-50 dark:hover:bg-[#16203a] text-gray-900 dark:text-white border border-transparent"
                                    }`}
                                  >
                                    <div className="flex items-center gap-3.5 min-w-0">
                                      <div
                                        className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${dest.iconBg}`}
                                      >
                                        <HugeiconsIcon icon={IconComponent} size={22} />
                                      </div>
                                      <div className="flex flex-col min-w-0">
                                        <span className="text-sm font-bold dark:text-white truncate">{dest.name}</span>
                                        <span className="text-xs text-gray-500 dark:text-slate-400 font-medium truncate">
                                          {dest.subtitle}
                                        </span>
                                      </div>
                                    </div>
                                    {isSelected ? (
                                      <div className="w-6 h-6 rounded-full bg-[#4a77ec] flex items-center justify-center text-white shrink-0">
                                        <HugeiconsIcon icon={Tick01Icon} size={15} />
                                      </div>
                                    ) : (
                                      <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-slate-300 shrink-0">
                                        {dest.badge}
                                      </span>
                                    )}
                                  </div>
                                );
                              })}
                            </div>
                          </motion.div>
                        </div>
                      )}
                    </AnimatePresence>,
                    document.body
                  )}
              </div>

              {/* Vertical Divider */}
              <div
                className={`h-8 w-px bg-gray-300/80 shrink-0 transition-opacity ${
                  activeTab === "location" || activeTab === "checkin" ? "opacity-0" : "opacity-100"
                }`}
              />

              {/* ── Segment 2: Check in ── */}
              <div
                onClick={() => {
                  setDatePickerTarget("checkIn");
                  setActiveTab("checkin");
                }}
                className="relative flex items-center justify-between gap-3 px-5 sm:px-6 py-3.5 rounded-full cursor-pointer flex-1 min-w-0 transition-colors"
              >
                {/* Active White Sliding Pill */}
                {activeTab === "checkin" && (
                  <motion.div
                    layoutId="active-search-segment-pill"
                    className="absolute inset-0 bg-white rounded-full shadow-[0_6px_25px_rgba(0,0,0,0.12)] z-0"
                    transition={{ type: "spring", stiffness: 450, damping: 35 }}
                  />
                )}

                <div className="relative z-10 flex items-center justify-between w-full min-w-0">
                  <div className="flex flex-col min-w-0">
                    <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                      Check in
                    </span>
                    <span className="text-sm sm:text-[15px] font-extrabold text-slate-900 whitespace-nowrap truncate">
                      {formatDateLabel(checkIn)}
                    </span>
                  </div>
                  <HugeiconsIcon icon={Calendar03Icon} size={20} className="text-[#3B68EC] shrink-0" />
                </div>
              </div>

              {/* Vertical Divider */}
              <div
                className={`h-8 w-px bg-slate-300/80 shrink-0 transition-opacity ${
                  activeTab === "checkin" || activeTab === "checkout" ? "opacity-0" : "opacity-100"
                }`}
              />

              {/* ── Segment 3: Check out ── */}
              <div
                onClick={() => {
                  setDatePickerTarget("checkOut");
                  setActiveTab("checkout");
                }}
                className="relative flex items-center justify-between gap-3 px-5 sm:px-6 py-3.5 rounded-full cursor-pointer flex-1 min-w-0 transition-colors"
              >
                {/* Active White Sliding Pill */}
                {activeTab === "checkout" && (
                  <motion.div
                    layoutId="active-search-segment-pill"
                    className="absolute inset-0 bg-white rounded-full shadow-[0_6px_25px_rgba(0,0,0,0.12)] z-0"
                    transition={{ type: "spring", stiffness: 450, damping: 35 }}
                  />
                )}

                <div className="relative z-10 flex items-center justify-between w-full min-w-0">
                  <div className="flex flex-col min-w-0">
                    <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                      Check out
                    </span>
                    <span className="text-sm sm:text-[15px] font-extrabold text-slate-900 whitespace-nowrap truncate">
                      {formatDateLabel(checkOut)}
                    </span>
                  </div>
                  <HugeiconsIcon icon={Calendar03Icon} size={20} className="text-[#3B68EC] shrink-0" />
                </div>
              </div>

              {/* ── Unified Date Range Popover (Merged Check-in & Check-out Experience) ── */}
              <AnimatePresence>
                {(activeTab === "checkin" || activeTab === "checkout") && (
                  <motion.div
                    initial={{ opacity: 0, y: 14, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 14, scale: 0.96 }}
                    transition={{ duration: 0.2 }}
                    className="hidden lg:block absolute top-[calc(100%+14px)] left-1/2 -translate-x-1/2 w-[94vw] max-w-[620px] bg-white rounded-[32px] shadow-2xl border border-slate-200/90 p-5 sm:p-6 z-50 space-y-4"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {/* Top Summary Bar with Night Counter */}
                    <div className="flex items-center gap-2 sm:gap-3 bg-slate-50 p-2 rounded-2xl border border-slate-200/70 relative">
                      <div
                        onClick={() => {
                          setDatePickerTarget("checkIn");
                          setActiveTab("checkin");
                        }}
                        className={`flex-1 p-2.5 rounded-xl cursor-pointer transition-all ${
                          datePickerTarget === "checkIn"
                            ? "bg-white border border-[#3B68EC] shadow-xs"
                            : "hover:bg-white/60"
                        }`}
                      >
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                          Check-In
                        </span>
                        <span className="text-xs font-extrabold text-slate-900">
                          {formatDateLabel(checkIn)}
                        </span>
                      </div>

                      <div className="bg-white border border-blue-200 shadow-xs rounded-full px-3 py-1.5 text-xs font-bold text-slate-800 flex items-center gap-1.5 shrink-0">
                        <span>🌙</span>
                        <span>{calculateNights(checkIn, checkOut)} nights</span>
                      </div>

                      <div
                        onClick={() => {
                          setDatePickerTarget("checkOut");
                          setActiveTab("checkout");
                        }}
                        className={`flex-1 p-2.5 rounded-xl cursor-pointer transition-all ${
                          datePickerTarget === "checkOut"
                            ? "bg-white border border-[#3B68EC] shadow-xs"
                            : "hover:bg-white/60"
                        }`}
                      >
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                          Check-Out
                        </span>
                        <span className="text-xs font-extrabold text-slate-900">
                          {formatDateLabel(checkOut)}
                        </span>
                      </div>
                    </div>

                    {/* Dual Month Calendar Grids */}
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
                          className="w-8 h-8 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-600 transition-colors cursor-pointer border-none"
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
                          className="w-8 h-8 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-600 transition-colors cursor-pointer border-none"
                        >
                          <HugeiconsIcon icon={ArrowRight01Icon} size={16} />
                        </button>
                      </div>

                      <div className="flex flex-col sm:flex-row gap-6 pt-1">
                        {renderMonthGrid(calendarYear, calendarMonth)}
                        <div className="hidden sm:block flex-1">
                          {renderMonthGrid(
                            calendarMonth === 11 ? calendarYear + 1 : calendarYear,
                            calendarMonth === 11 ? 0 : calendarMonth + 1
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Bottom Action Bar */}
                    <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2">
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
                          className="px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
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
                          className="px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
                        >
                          Stay tomorrow
                        </button>
                      </div>
                      <button
                        type="button"
                        onClick={() => setActiveTab("guests")}
                        className="px-6 py-2 bg-[#3B68EC] hover:bg-[#254EDB] text-white text-xs font-bold rounded-xl transition-colors cursor-pointer border-none shadow-xs"
                      >
                        Confirm dates
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Mobile Bottom Sheet for Date Range */}
              {mounted &&
                createPortal(
                  <AnimatePresence>
                    {(activeTab === "checkin" || activeTab === "checkout") && (
                      <div className="lg:hidden fixed inset-0 z-[99999] flex items-end justify-center">
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveTab(null);
                          }}
                          className="fixed inset-0 bg-black/60 backdrop-blur-xs z-[190]"
                        />
                        <motion.div
                          initial={{ y: "100%" }}
                          animate={{ y: 0 }}
                          exit={{ y: "100%" }}
                          transition={{ type: "spring", damping: 28, stiffness: 300 }}
                          className="relative w-full max-h-[90vh] bg-white rounded-t-[28px] p-5 shadow-2xl z-[200] overflow-y-auto space-y-4"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <div className="w-12 h-1.5 bg-gray-300 rounded-full mx-auto mb-2" />
                          <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                            <h3 className="font-bold text-base text-gray-900">Select Travel Dates</h3>
                            <button
                              type="button"
                              onClick={() => setActiveTab(null)}
                              className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 flex items-center justify-center border-none cursor-pointer"
                            >
                              <HugeiconsIcon icon={Cancel01Icon} size={16} />
                            </button>
                          </div>

                          {/* Top Summary Bar with Night Counter */}
                          <div className="flex items-center gap-2 bg-slate-50 p-2 rounded-2xl border border-slate-200/70 relative">
                            <div
                              onClick={() => setDatePickerTarget("checkIn")}
                              className={`flex-1 p-2 rounded-xl cursor-pointer transition-all ${
                                datePickerTarget === "checkIn"
                                  ? "bg-white border border-[#3B68EC] shadow-xs"
                                  : "hover:bg-white/60"
                              }`}
                            >
                              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                                Check-In
                              </span>
                              <span className="text-xs font-extrabold text-slate-900">
                                {formatDateLabel(checkIn)}
                              </span>
                            </div>

                            <div className="bg-white border border-blue-200 shadow-xs rounded-full px-2.5 py-1 text-xs font-bold text-slate-800 flex items-center gap-1 shrink-0">
                              <span>🌙</span>
                              <span>{calculateNights(checkIn, checkOut)} n</span>
                            </div>

                            <div
                              onClick={() => setDatePickerTarget("checkOut")}
                              className={`flex-1 p-2 rounded-xl cursor-pointer transition-all ${
                                datePickerTarget === "checkOut"
                                  ? "bg-white border border-[#3B68EC] shadow-xs"
                                  : "hover:bg-white/60"
                              }`}
                            >
                              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                                Check-Out
                              </span>
                              <span className="text-xs font-extrabold text-slate-900">
                                {formatDateLabel(checkOut)}
                              </span>
                            </div>
                          </div>

                          {/* Month Calendar Grid */}
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
                                className="w-8 h-8 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-600 transition-colors cursor-pointer border-none"
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
                                className="w-8 h-8 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-600 transition-colors cursor-pointer border-none"
                              >
                                <HugeiconsIcon icon={ArrowRight01Icon} size={16} />
                              </button>
                            </div>

                            <div className="pt-1 overflow-x-auto">
                              {renderMonthGrid(calendarYear, calendarMonth)}
                            </div>
                          </div>

                          <button
                            type="button"
                            onClick={() => setActiveTab("guests")}
                            className="w-full py-3 bg-[#3B68EC] hover:bg-[#254EDB] text-white text-xs font-bold rounded-xl transition-colors cursor-pointer border-none shadow-xs text-center block"
                          >
                            Confirm dates
                          </button>
                        </motion.div>
                      </div>
                    )}
                  </AnimatePresence>,
                  document.body
                )}

              {/* Vertical Divider */}
              <div
                className={`h-8 w-px bg-gray-300/80 shrink-0 transition-opacity ${
                  activeTab === "checkout" || activeTab === "guests" ? "opacity-0" : "opacity-100"
                }`}
              />

              {/* ── Segment 4: Guest ── */}
              <div
                onClick={() => setActiveTab("guests")}
                className="relative flex items-center gap-3.5 px-6 py-3.5 rounded-full cursor-pointer flex-1 min-w-0 transition-colors"
              >
                {/* Active White Sliding Pill */}
                {activeTab === "guests" && (
                  <motion.div
                    layoutId="active-search-segment-pill"
                    className="absolute inset-0 bg-white rounded-full shadow-[0_6px_25px_rgba(0,0,0,0.12)] z-0"
                    transition={{ type: "spring", stiffness: 450, damping: 35 }}
                  />
                )}

                <div className="relative z-10 flex items-center gap-3.5 w-full min-w-0">
                  <HugeiconsIcon icon={UserGroupIcon} size={20} className="text-[#4a77ec] shrink-0" />
                  <div className="flex flex-col min-w-0">
                    <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                      Guest
                    </span>
                    <span className="text-sm sm:text-[15px] font-extrabold text-gray-900 whitespace-nowrap">
                      {guests}
                    </span>
                  </div>
                </div>

                {/* Guests Stepper Popover (Desktop Popover + Mobile Bottom Sheet) */}
                <AnimatePresence>
                  {activeTab === "guests" && (
                    <motion.div
                      initial={{ opacity: 0, y: 14, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 14, scale: 0.95 }}
                      transition={{ duration: 0.18 }}
                      className="hidden lg:block absolute top-[calc(100%+14px)] right-0 w-[300px] bg-white rounded-[32px] shadow-2xl border border-gray-100 p-5 z-50 space-y-4"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-sm font-bold text-gray-900">Adults</div>
                          <div className="text-xs text-gray-400">Ages 13 or above</div>
                        </div>
                        <div className="flex items-center gap-2.5">
                          <button
                            type="button"
                            disabled={adults <= 1}
                            onClick={() => {
                              const next = Math.max(1, adults - 1);
                              setAdults(next);
                              setGuests(
                                `${next} adult${next > 1 ? "s" : ""}${
                                  children > 0 ? `, ${children} kid${children > 1 ? "s" : ""}` : ""
                                }`
                              );
                            }}
                            className="w-8 h-8 rounded-full border border-gray-200 disabled:opacity-40 flex items-center justify-center font-bold text-xs hover:bg-gray-50 cursor-pointer"
                          >
                            -
                          </button>
                          <span className="text-sm font-bold w-4 text-center">{adults}</span>
                          <button
                            type="button"
                            onClick={() => {
                              const next = adults + 1;
                              setAdults(next);
                              setGuests(
                                `${next} adult${next > 1 ? "s" : ""}${
                                  children > 0 ? `, ${children} kid${children > 1 ? "s" : ""}` : ""
                                }`
                              );
                            }}
                            className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center font-bold text-xs hover:bg-gray-50 cursor-pointer"
                          >
                            +
                          </button>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                        <div>
                          <div className="text-sm font-bold text-gray-900">Children</div>
                          <div className="text-xs text-gray-400">Ages 0 to 12</div>
                        </div>
                        <div className="flex items-center gap-2.5">
                          <button
                            type="button"
                            disabled={children <= 0}
                            onClick={() => {
                              const next = Math.max(0, children - 1);
                              setChildren(next);
                              setGuests(
                                `${adults} adult${adults > 1 ? "s" : ""}${
                                  next > 0 ? `, ${next} kid${next > 1 ? "s" : ""}` : ""
                                }`
                              );
                            }}
                            className="w-8 h-8 rounded-full border border-gray-200 disabled:opacity-40 flex items-center justify-center font-bold text-xs hover:bg-gray-50 cursor-pointer"
                          >
                            -
                          </button>
                          <span className="text-sm font-bold w-4 text-center">{children}</span>
                          <button
                            type="button"
                            onClick={() => {
                              const next = children + 1;
                              setChildren(next);
                              setGuests(
                                `${adults} adult${adults > 1 ? "s" : ""}${
                                  next > 0 ? `, ${next} kid${next > 1 ? "s" : ""}` : ""
                                }`
                              );
                            }}
                            className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center font-bold text-xs hover:bg-gray-50 cursor-pointer"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Mobile Bottom Sheet for Guests */}
                {mounted &&
                  createPortal(
                    <AnimatePresence>
                      {activeTab === "guests" && (
                        <div className="lg:hidden fixed inset-0 z-[99999] flex items-end justify-center">
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={(e) => {
                              e.stopPropagation();
                              setActiveTab(null);
                            }}
                            className="fixed inset-0 bg-black/60 backdrop-blur-xs z-[190]"
                          />
                          <motion.div
                            initial={{ y: "100%" }}
                            animate={{ y: 0 }}
                            exit={{ y: "100%" }}
                            transition={{ type: "spring", damping: 28, stiffness: 300 }}
                            className="relative w-full max-h-[85vh] bg-white rounded-t-[28px] p-5 shadow-2xl z-[200] overflow-y-auto space-y-4"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <div className="w-12 h-1.5 bg-gray-300 rounded-full mx-auto mb-2" />
                            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                              <h3 className="font-bold text-base text-gray-900">Guests & Rooms</h3>
                              <button
                                type="button"
                                onClick={() => setActiveTab(null)}
                                className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 flex items-center justify-center border-none cursor-pointer"
                              >
                                <HugeiconsIcon icon={Cancel01Icon} size={16} />
                              </button>
                            </div>

                            <div className="flex items-center justify-between py-2">
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
                                    setGuests(
                                      `${next} adult${next > 1 ? "s" : ""}${
                                        children > 0 ? `, ${children} kid${children > 1 ? "s" : ""}` : ""
                                      }`
                                    );
                                  }}
                                  className="w-9 h-9 rounded-full border border-gray-200 disabled:opacity-40 flex items-center justify-center font-bold text-sm hover:bg-gray-50 cursor-pointer"
                                >
                                  -
                                </button>
                                <span className="text-base font-bold w-4 text-center">{adults}</span>
                                <button
                                  type="button"
                                  onClick={() => {
                                    const next = adults + 1;
                                    setAdults(next);
                                    setGuests(
                                      `${next} adult${next > 1 ? "s" : ""}${
                                        children > 0 ? `, ${children} kid${children > 1 ? "s" : ""}` : ""
                                      }`
                                    );
                                  }}
                                  className="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center font-bold text-sm hover:bg-gray-50 cursor-pointer"
                                >
                                  +
                                </button>
                              </div>
                            </div>

                            <div className="flex items-center justify-between py-2 border-t border-gray-100">
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
                                    setGuests(
                                      `${adults} adult${adults > 1 ? "s" : ""}${
                                        next > 0 ? `, ${next} kid${next > 1 ? "s" : ""}` : ""
                                      }`
                                    );
                                  }}
                                  className="w-9 h-9 rounded-full border border-gray-200 disabled:opacity-40 flex items-center justify-center font-bold text-sm hover:bg-gray-50 cursor-pointer"
                                >
                                  -
                                </button>
                                <span className="text-base font-bold w-4 text-center">{children}</span>
                                <button
                                  type="button"
                                  onClick={() => {
                                    const next = children + 1;
                                    setChildren(next);
                                    setGuests(
                                      `${adults} adult${adults > 1 ? "s" : ""}${
                                        next > 0 ? `, ${next} kid${next > 1 ? "s" : ""}` : ""
                                      }`
                                    );
                                  }}
                                  className="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center font-bold text-sm hover:bg-gray-50 cursor-pointer"
                                >
                                  +
                                </button>
                              </div>
                            </div>

                            <button
                              type="button"
                              onClick={() => setActiveTab(null)}
                              className="w-full py-3 bg-[#3B68EC] hover:bg-[#254EDB] text-white text-xs font-bold rounded-xl transition-colors cursor-pointer border-none shadow-xs text-center block mt-3"
                            >
                              Confirm
                            </button>
                          </motion.div>
                        </div>
                      )}
                    </AnimatePresence>,
                    document.body
                  )}
              </div>

              {/* ── Segment 5: Prominent Large Circular Blue Search Button ── */}
              <button
                type="button"
                onClick={handleSearchSubmit}
                className="w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-[#3B68EC] hover:bg-[#254EDB] text-white flex items-center justify-center shadow-lg cursor-pointer shrink-0 transition-all hover:scale-105 active:scale-95 border-none ml-1 relative z-10"
              >
                <HugeiconsIcon icon={Search01Icon} size={22} />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
  );
}
