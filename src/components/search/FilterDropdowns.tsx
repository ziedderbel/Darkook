"use client";

import { useEffect, useRef, useState, ReactNode } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "motion/react";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Cancel01Icon,
  Tick01Icon,
  BedDoubleIcon,
  SwimmingIcon,
  Wifi01Icon,
  BeachIcon,
  SnowIcon,
  House01Icon,
  Building01Icon,
  TreesIcon,
  Compass01Icon,
  StarIcon,
} from "@hugeicons-pro/core-stroke-rounded";

// ── Types ───────────────────────────────────────────────────────────────────────
export interface FilterState {
  bedrooms: number; // 0 = any
  beds: number; // 0 = any
  bathrooms: number; // 0 = any
  roomTypes: string[]; // ["Appartement", "Maison d'hôte", "Villa", "Gîte"]
  minPrice: number;
  maxPrice: number;
  equipment: string[]; // ["pool", "wifi", "ac", "kitchen", "parking", "beach", "sea_view", "garden"]
  payment: string[]; // ["online", "on_arrival", "installments"]
  cancellation: "any" | "flexible" | "moderate" | "strict";
  sortBy: "high_price" | "low_price" | "rating" | "popular";
}

export const INITIAL_FILTERS: FilterState = {
  bedrooms: 1,
  beds: 1,
  bathrooms: 0,
  roomTypes: ["Appartement", "Maison d'hôte"],
  minPrice: 0,
  maxPrice: 1000,
  equipment: [],
  payment: [],
  cancellation: "any",
  sortBy: "high_price",
};

// ── Dropdown Wrapper (Desktop Popover + Mobile Bottom Sheet) ───────────────────
export function DropdownContainer({
  isOpen,
  onClose,
  title,
  align = "left",
  children,
}: {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  align?: "left" | "right";
  children: ReactNode;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Lock body scroll on mobile when sheet is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Close on Escape & Outside click on desktop
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      // If click is outside the popover and not on the trigger button parent
      if (containerRef.current && !containerRef.current.contains(target)) {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    const timer = setTimeout(() => {
      window.addEventListener("click", handleClickOutside);
    }, 10);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("click", handleClickOutside);
      clearTimeout(timer);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <>
      {/* ── MOBILE: Native Bottom Sheet Portaled to document.body (Screens < 768px) ── */}
      {mounted &&
        createPortal(
          <AnimatePresence>
            {isOpen && (
              <div className="md:hidden fixed inset-0 z-[99999] flex items-end justify-center">
                {/* Backdrop */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={onClose}
                  className="fixed inset-0 bg-black/60 backdrop-blur-xs z-[190]"
                />

                {/* Sheet */}
                <motion.div
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  exit={{ y: "100%" }}
                  transition={{ type: "spring", damping: 28, stiffness: 300 }}
                  className="relative w-full max-h-[85vh] bg-white rounded-t-[28px] p-5 shadow-2xl z-[200] overflow-y-auto"
                >
                  {/* Drag handle pill */}
                  <div className="w-12 h-1.5 bg-gray-300 rounded-full mx-auto mb-4" />

                  {/* Header */}
                  <div className="flex items-center justify-between pb-3 border-b border-gray-100 mb-4">
                    <h3 className="font-bold text-base text-gray-900">{title}</h3>
                    <button
                      type="button"
                      onClick={onClose}
                      className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 flex items-center justify-center border-none cursor-pointer"
                    >
                      <HugeiconsIcon icon={Cancel01Icon} size={16} />
                    </button>
                  </div>

                  {/* Content */}
                  <div className="space-y-4">{children}</div>
                </motion.div>
              </div>
            )}
          </AnimatePresence>,
          document.body
        )}

      {/* ── DESKTOP: Floating Popover (Screens >= 768px) ── */}
      <motion.div
        ref={containerRef}
        initial={{ opacity: 0, y: 6, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 6, scale: 0.98 }}
        transition={{ duration: 0.15, ease: "easeOut" }}
        className={`hidden md:block absolute top-[calc(100%+8px)] ${
          align === "right" ? "right-0" : "left-0"
        } z-[120] bg-white rounded-2xl shadow-2xl border border-gray-200/90 p-4 min-w-[260px] max-w-[380px] text-gray-900`}
      >
        <div className="space-y-3">{children}</div>
      </motion.div>
    </>
  );
}

// ── 1. Bed and Room Dropdown Content ──────────────────────────────────────────
export function BedAndRoomDropdownContent({
  filters,
  onChange,
  onClose,
}: {
  filters: FilterState;
  onChange: (updates: Partial<FilterState>) => void;
  onClose: () => void;
}) {
  const [bedrooms, setBedrooms] = useState(filters.bedrooms);
  const [beds, setBeds] = useState(filters.beds);
  const [bathrooms, setBathrooms] = useState(filters.bathrooms);

  const handleApply = () => {
    onChange({ bedrooms, beds, bathrooms });
    onClose();
  };

  const handleClear = () => {
    setBedrooms(0);
    setBeds(0);
    setBathrooms(0);
    onChange({ bedrooms: 0, beds: 0, bathrooms: 0 });
    onClose();
  };

  return (
    <div className="space-y-5">
      {/* Bedrooms */}
      <div className="space-y-2">
        <label className="text-xs font-bold text-gray-800 block">Bedrooms</label>
        <div className="flex items-center gap-1.5 flex-wrap">
          {[0, 1, 2, 3, 4, 5].map((val) => (
            <button
              key={val}
              type="button"
              onClick={() => setBedrooms(val)}
              className={`h-8 px-3 rounded-full text-xs font-bold transition-all border cursor-pointer ${
                bedrooms === val
                  ? "bg-[#4a77ec] text-white border-[#4a77ec] shadow-xs"
                  : "bg-gray-50 hover:bg-gray-100 text-gray-700 border-gray-200"
              }`}
            >
              {val === 0 ? "Any" : val === 5 ? "5+" : val}
            </button>
          ))}
        </div>
      </div>

      {/* Beds */}
      <div className="space-y-2">
        <label className="text-xs font-bold text-gray-800 block">Beds</label>
        <div className="flex items-center gap-1.5 flex-wrap">
          {[0, 1, 2, 3, 4, 5].map((val) => (
            <button
              key={val}
              type="button"
              onClick={() => setBeds(val)}
              className={`h-8 px-3 rounded-full text-xs font-bold transition-all border cursor-pointer ${
                beds === val
                  ? "bg-[#4a77ec] text-white border-[#4a77ec] shadow-xs"
                  : "bg-gray-50 hover:bg-gray-100 text-gray-700 border-gray-200"
              }`}
            >
              {val === 0 ? "Any" : val === 5 ? "5+" : val}
            </button>
          ))}
        </div>
      </div>

      {/* Bathrooms */}
      <div className="space-y-2">
        <label className="text-xs font-bold text-gray-800 block">Bathrooms</label>
        <div className="flex items-center gap-1.5 flex-wrap">
          {[0, 1, 2, 3, 4].map((val) => (
            <button
              key={val}
              type="button"
              onClick={() => setBathrooms(val)}
              className={`h-8 px-3 rounded-full text-xs font-bold transition-all border cursor-pointer ${
                bathrooms === val
                  ? "bg-[#4a77ec] text-white border-[#4a77ec] shadow-xs"
                  : "bg-gray-50 hover:bg-gray-100 text-gray-700 border-gray-200"
              }`}
            >
              {val === 0 ? "Any" : val === 4 ? "4+" : val}
            </button>
          ))}
        </div>
      </div>

      {/* Actions Footer */}
      <div className="pt-3 border-t border-gray-100 flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={handleClear}
          className="text-xs font-bold text-gray-500 hover:text-gray-900 border-none bg-transparent cursor-pointer underline"
        >
          Clear
        </button>
        <button
          type="button"
          onClick={handleApply}
          className="px-4 py-2 rounded-full bg-[#4a77ec] hover:bg-[#3a67dc] text-white text-xs font-bold border-none cursor-pointer shadow-xs"
        >
          Apply
        </button>
      </div>
    </div>
  );
}

// ── 2. Room Type Dropdown Content ─────────────────────────────────────────────
export function RoomTypeDropdownContent({
  filters,
  onChange,
  onClose,
}: {
  filters: FilterState;
  onChange: (updates: Partial<FilterState>) => void;
  onClose: () => void;
}) {
  const [selected, setSelected] = useState<string[]>(filters.roomTypes);

  const options = [
    {
      id: "Appartement",
      title: "Appartement",
      desc: "An entire flat with private amenities",
      icon: Building01Icon,
    },
    {
      id: "Maison d'hôte",
      title: "Maison d'hôte",
      desc: "Charming traditional Tunisian guesthouse",
      icon: House01Icon,
    },
    {
      id: "Villa",
      title: "Villa",
      desc: "Spacious private property with pool/garden",
      icon: TreesIcon,
    },
    {
      id: "Gîte",
      title: "Gîte",
      desc: "Authentic countryside or rural accommodation",
      icon: Compass01Icon,
    },
  ];

  const toggle = (id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleApply = () => {
    onChange({ roomTypes: selected });
    onClose();
  };

  const handleClear = () => {
    setSelected([]);
    onChange({ roomTypes: [] });
    onClose();
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        {options.map((opt) => {
          const isChecked = selected.includes(opt.id);
          return (
            <div
              key={opt.id}
              onClick={() => toggle(opt.id)}
              className={`p-2.5 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                isChecked
                  ? "bg-blue-50/70 border-[#4a77ec]/80 ring-1 ring-[#4a77ec]/30"
                  : "bg-white hover:bg-gray-50 border-gray-200"
              }`}
            >
              <div className="flex items-center gap-2.5">
                <div
                  className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                    isChecked ? "bg-[#4a77ec] text-white" : "bg-gray-100 text-gray-600"
                  }`}
                >
                  <HugeiconsIcon icon={opt.icon} size={16} />
                </div>
                <div>
                  <div className="text-xs font-bold text-gray-900">{opt.title}</div>
                  <div className="text-[10px] font-medium text-gray-500">{opt.desc}</div>
                </div>
              </div>
              <div
                className={`w-5 h-5 rounded-md border flex items-center justify-center transition-all ${
                  isChecked
                    ? "bg-[#4a77ec] border-[#4a77ec] text-white"
                    : "border-gray-300 bg-white"
                }`}
              >
                {isChecked && <HugeiconsIcon icon={Tick01Icon} size={12} />}
              </div>
            </div>
          );
        })}
      </div>

      {/* Actions Footer */}
      <div className="pt-3 border-t border-gray-100 flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={handleClear}
          className="text-xs font-bold text-gray-500 hover:text-gray-900 border-none bg-transparent cursor-pointer underline"
        >
          Clear
        </button>
        <button
          type="button"
          onClick={handleApply}
          className="px-4 py-2 rounded-full bg-[#4a77ec] hover:bg-[#3a67dc] text-white text-xs font-bold border-none cursor-pointer shadow-xs"
        >
          Apply
        </button>
      </div>
    </div>
  );
}

// ── 3. Price Range Dropdown Content ───────────────────────────────────────────
export function PriceRangeDropdownContent({
  filters,
  onChange,
  onClose,
}: {
  filters: FilterState;
  onChange: (updates: Partial<FilterState>) => void;
  onClose: () => void;
}) {
  const [minPrice, setMinPrice] = useState(filters.minPrice);
  const [maxPrice, setMaxPrice] = useState(filters.maxPrice);

  const presets = [
    { label: "< 250 DT", min: 0, max: 250 },
    { label: "250 - 500 DT", min: 250, max: 500 },
    { label: "500 - 800 DT", min: 500, max: 800 },
    { label: "800+ DT", min: 800, max: 2000 },
  ];

  const handleApply = () => {
    onChange({ minPrice, maxPrice });
    onClose();
  };

  const handleClear = () => {
    setMinPrice(0);
    setMaxPrice(1000);
    onChange({ minPrice: 0, maxPrice: 1000 });
    onClose();
  };

  return (
    <div className="space-y-4">
      {/* Quick Presets */}
      <div className="space-y-1.5">
        <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider block">
          Quick ranges
        </label>
        <div className="flex items-center gap-1.5 flex-wrap">
          {presets.map((p) => {
            const isActive = minPrice === p.min && maxPrice === p.max;
            return (
              <button
                key={p.label}
                type="button"
                onClick={() => {
                  setMinPrice(p.min);
                  setMaxPrice(p.max);
                }}
                className={`h-7 px-2.5 rounded-full text-xs font-bold transition-all border cursor-pointer ${
                  isActive
                    ? "bg-[#4a77ec] text-white border-[#4a77ec]"
                    : "bg-gray-50 hover:bg-gray-100 text-gray-700 border-gray-200"
                }`}
              >
                {p.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Min & Max Inputs */}
      <div className="grid grid-cols-2 gap-3 pt-2">
        <div>
          <label className="text-xs font-bold text-gray-700 block mb-1">Min Price</label>
          <div className="relative flex items-center">
            <input
              type="number"
              min={0}
              max={maxPrice}
              value={minPrice}
              onChange={(e) => setMinPrice(Number(e.target.value) || 0)}
              className="w-full h-9 pl-3 pr-8 rounded-xl border border-gray-200 text-xs font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#4a77ec]"
            />
            <span className="absolute right-2.5 text-[11px] font-bold text-gray-400">DT</span>
          </div>
        </div>
        <div>
          <label className="text-xs font-bold text-gray-700 block mb-1">Max Price</label>
          <div className="relative flex items-center">
            <input
              type="number"
              min={minPrice}
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value) || 1000)}
              className="w-full h-9 pl-3 pr-8 rounded-xl border border-gray-200 text-xs font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#4a77ec]"
            />
            <span className="absolute right-2.5 text-[11px] font-bold text-gray-400">DT</span>
          </div>
        </div>
      </div>

      {/* Actions Footer */}
      <div className="pt-3 border-t border-gray-100 flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={handleClear}
          className="text-xs font-bold text-gray-500 hover:text-gray-900 border-none bg-transparent cursor-pointer underline"
        >
          Clear
        </button>
        <button
          type="button"
          onClick={handleApply}
          className="px-4 py-2 rounded-full bg-[#4a77ec] hover:bg-[#3a67dc] text-white text-xs font-bold border-none cursor-pointer shadow-xs"
        >
          Apply
        </button>
      </div>
    </div>
  );
}

// ── 4. Equipment (Amenities) Dropdown Content ──────────────────────────────────
export function EquipmentDropdownContent({
  filters,
  onChange,
  onClose,
}: {
  filters: FilterState;
  onChange: (updates: Partial<FilterState>) => void;
  onClose: () => void;
}) {
  const [selected, setSelected] = useState<string[]>(filters.equipment);

  const amenities = [
    { id: "pool", label: "Swimming Pool", icon: SwimmingIcon },
    { id: "wifi", label: "High-Speed WiFi", icon: Wifi01Icon },
    { id: "ac", label: "Air Conditioning", icon: SnowIcon },
    { id: "beach", label: "Beachfront Access", icon: BeachIcon },
    { id: "garden", label: "Garden / Patio", icon: TreesIcon },
    { id: "kitchen", label: "Equipped Kitchen", icon: House01Icon },
    { id: "sea_view", label: "Sea View", icon: Compass01Icon },
  ];

  const toggle = (id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleApply = () => {
    onChange({ equipment: selected });
    onClose();
  };

  const handleClear = () => {
    setSelected([]);
    onChange({ equipment: [] });
    onClose();
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-2">
        {amenities.map((item) => {
          const isChecked = selected.includes(item.id);
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => toggle(item.id)}
              className={`p-2.5 rounded-xl border flex items-center gap-2 cursor-pointer transition-all text-left ${
                isChecked
                  ? "bg-blue-50/80 border-[#4a77ec] text-[#4a77ec] font-bold"
                  : "bg-white hover:bg-gray-50 border-gray-200 text-gray-700 font-semibold"
              }`}
            >
              <HugeiconsIcon icon={item.icon} size={15} />
              <span className="text-xs truncate">{item.label}</span>
            </button>
          );
        })}
      </div>

      {/* Actions Footer */}
      <div className="pt-3 border-t border-gray-100 flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={handleClear}
          className="text-xs font-bold text-gray-500 hover:text-gray-900 border-none bg-transparent cursor-pointer underline"
        >
          Clear
        </button>
        <button
          type="button"
          onClick={handleApply}
          className="px-4 py-2 rounded-full bg-[#4a77ec] hover:bg-[#3a67dc] text-white text-xs font-bold border-none cursor-pointer shadow-xs"
        >
          Apply
        </button>
      </div>
    </div>
  );
}

// ── 5. Payment Dropdown Content ───────────────────────────────────────────────
export function PaymentDropdownContent({
  filters,
  onChange,
  onClose,
}: {
  filters: FilterState;
  onChange: (updates: Partial<FilterState>) => void;
  onClose: () => void;
}) {
  const [selected, setSelected] = useState<string[]>(filters.payment);

  const options = [
    {
      id: "online",
      title: "Pay Online",
      desc: "Credit Card, Konnect, Flouci (Instant confirmation)",
    },
    {
      id: "on_arrival",
      title: "Pay at Check-in",
      desc: "Pay upon arrival at the property",
    },
    {
      id: "installments",
      title: "Pay in 3x Installments",
      desc: "Split your booking cost with 0% interest",
    },
  ];

  const toggle = (id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleApply = () => {
    onChange({ payment: selected });
    onClose();
  };

  const handleClear = () => {
    setSelected([]);
    onChange({ payment: [] });
    onClose();
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        {options.map((opt) => {
          const isChecked = selected.includes(opt.id);
          return (
            <div
              key={opt.id}
              onClick={() => toggle(opt.id)}
              className={`p-2.5 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                isChecked
                  ? "bg-blue-50/70 border-[#4a77ec]/80 ring-1 ring-[#4a77ec]/30"
                  : "bg-white hover:bg-gray-50 border-gray-200"
              }`}
            >
              <div>
                <div className="text-xs font-bold text-gray-900">{opt.title}</div>
                <div className="text-[10px] font-medium text-gray-500">{opt.desc}</div>
              </div>
              <div
                className={`w-5 h-5 rounded-md border flex items-center justify-center shrink-0 ml-2 transition-all ${
                  isChecked
                    ? "bg-[#4a77ec] border-[#4a77ec] text-white"
                    : "border-gray-300 bg-white"
                }`}
              >
                {isChecked && <HugeiconsIcon icon={Tick01Icon} size={12} />}
              </div>
            </div>
          );
        })}
      </div>

      {/* Actions Footer */}
      <div className="pt-3 border-t border-gray-100 flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={handleClear}
          className="text-xs font-bold text-gray-500 hover:text-gray-900 border-none bg-transparent cursor-pointer underline"
        >
          Clear
        </button>
        <button
          type="button"
          onClick={handleApply}
          className="px-4 py-2 rounded-full bg-[#4a77ec] hover:bg-[#3a67dc] text-white text-xs font-bold border-none cursor-pointer shadow-xs"
        >
          Apply
        </button>
      </div>
    </div>
  );
}

// ── 6. Cancellation Policy Dropdown Content ───────────────────────────────────
export function CancellationDropdownContent({
  filters,
  onChange,
  onClose,
}: {
  filters: FilterState;
  onChange: (updates: Partial<FilterState>) => void;
  onClose: () => void;
}) {
  const [selected, setSelected] = useState(filters.cancellation);

  const policies = [
    {
      id: "any",
      title: "Any Policy",
      desc: "Show all cancellation rules",
    },
    {
      id: "flexible",
      title: "Flexible",
      desc: "Free cancellation up to 24h before check-in",
    },
    {
      id: "moderate",
      title: "Moderate",
      desc: "Free cancellation up to 5 days before check-in",
    },
    {
      id: "strict",
      title: "Strict",
      desc: "50% refund up to 7 days before check-in",
    },
  ];

  const handleApply = () => {
    onChange({ cancellation: selected as any });
    onClose();
  };

  const handleClear = () => {
    setSelected("any");
    onChange({ cancellation: "any" });
    onClose();
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        {policies.map((p) => {
          const isChecked = selected === p.id;
          return (
            <div
              key={p.id}
              onClick={() => setSelected(p.id as any)}
              className={`p-2.5 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                isChecked
                  ? "bg-blue-50/70 border-[#4a77ec]/80 ring-1 ring-[#4a77ec]/30"
                  : "bg-white hover:bg-gray-50 border-gray-200"
              }`}
            >
              <div>
                <div className="text-xs font-bold text-gray-900">{p.title}</div>
                <div className="text-[10px] font-medium text-gray-500">{p.desc}</div>
              </div>
              <div
                className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ml-2 transition-all ${
                  isChecked
                    ? "bg-[#4a77ec] border-[#4a77ec]"
                    : "border-gray-300 bg-white"
                }`}
              >
                {isChecked && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
              </div>
            </div>
          );
        })}
      </div>

      {/* Actions Footer */}
      <div className="pt-3 border-t border-gray-100 flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={handleClear}
          className="text-xs font-bold text-gray-500 hover:text-gray-900 border-none bg-transparent cursor-pointer underline"
        >
          Clear
        </button>
        <button
          type="button"
          onClick={handleApply}
          className="px-4 py-2 rounded-full bg-[#4a77ec] hover:bg-[#3a67dc] text-white text-xs font-bold border-none cursor-pointer shadow-xs"
        >
          Apply
        </button>
      </div>
    </div>
  );
}

// ── 7. Sort By Dropdown Content ───────────────────────────────────────────────
export function SortDropdownContent({
  filters,
  onChange,
  onClose,
}: {
  filters: FilterState;
  onChange: (updates: Partial<FilterState>) => void;
  onClose: () => void;
}) {
  const options = [
    { id: "high_price", label: "Price : High to Low", subtitle: "Highest price first" },
    { id: "low_price", label: "Price : Low to High", subtitle: "Lowest price first" },
    { id: "rating", label: "Highest Rated", subtitle: "Best review score" },
    { id: "popular", label: "Most Popular", subtitle: "Trending stays" },
  ];

  const handleSelect = (id: string) => {
    onChange({ sortBy: id as any });
    onClose();
  };

  return (
    <div className="space-y-1 min-w-[240px]">
      <div className="pb-2 border-b border-gray-100 mb-1.5 px-1">
        <h4 className="text-xs font-bold text-gray-900">Sort results by</h4>
      </div>
      {options.map((opt) => {
        const isSelected = filters.sortBy === opt.id;
        return (
          <button
            key={opt.id}
            type="button"
            onClick={() => handleSelect(opt.id)}
            className={`w-full px-3 py-2.5 rounded-xl flex items-center justify-between cursor-pointer transition-all border-none text-left ${
              isSelected
                ? "bg-blue-50 text-[#4a77ec] font-bold shadow-2xs"
                : "bg-transparent hover:bg-gray-50 text-gray-700 font-medium"
            }`}
          >
            <div>
              <div className="text-xs">{opt.label}</div>
              <div className={`text-[10px] mt-0.5 ${isSelected ? "text-[#4a77ec]/80 font-normal" : "text-gray-400 font-normal"}`}>
                {opt.subtitle}
              </div>
            </div>
            {isSelected && (
              <HugeiconsIcon icon={Tick01Icon} size={16} className="text-[#4a77ec] shrink-0" />
            )}
          </button>
        );
      })}
    </div>
  );
}
