"use client";

import { motion, AnimatePresence } from "motion/react";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Cancel01Icon,
  Tick01Icon,
  Building01Icon,
  House01Icon,
  TreesIcon,
  Compass01Icon,
  SwimmingIcon,
  Wifi01Icon,
  SnowIcon,
  BeachIcon,
} from "@hugeicons-pro/core-stroke-rounded";
import { FilterState } from "./FilterDropdowns";

interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  filters: FilterState;
  onApply: (filters: FilterState) => void;
  resultCount: number;
}

export default function FilterModal({
  isOpen,
  onClose,
  filters: initialFilters,
  onApply,
  resultCount,
}: FilterModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[300] flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            className="relative w-full max-w-[560px] max-h-[90vh] bg-white rounded-3xl p-6 shadow-2xl z-10 border border-gray-100 flex flex-col justify-between overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-gray-100 shrink-0">
              <h2 className="text-xl font-bold text-gray-900">All Filters</h2>
              <button
                type="button"
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 flex items-center justify-center cursor-pointer border-none transition-colors"
              >
                <HugeiconsIcon icon={Cancel01Icon} size={16} />
              </button>
            </div>

            {/* Scrollable Body */}
            <div className="overflow-y-auto py-4 space-y-6 flex-1 pr-1">
              {/* Room Types */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-gray-800 uppercase tracking-wider">
                  Type of place
                </h4>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: "Appartement", label: "Appartement", icon: Building01Icon },
                    { id: "Maison d'hôte", label: "Maison d'hôte", icon: House01Icon },
                    { id: "Villa", label: "Villa", icon: TreesIcon },
                    { id: "Gîte", label: "Gîte", icon: Compass01Icon },
                  ].map((t) => {
                    const isChecked = initialFilters.roomTypes.includes(t.id);
                    return (
                      <button
                        key={t.id}
                        type="button"
                        onClick={() => {
                          const next = isChecked
                            ? initialFilters.roomTypes.filter((x) => x !== t.id)
                            : [...initialFilters.roomTypes, t.id];
                          onApply({ ...initialFilters, roomTypes: next });
                        }}
                        className={`p-3 rounded-2xl border flex items-center gap-2.5 cursor-pointer transition-all text-left ${
                          isChecked
                            ? "bg-blue-50/80 border-[#4a77ec] text-[#4a77ec] font-bold"
                            : "bg-white hover:bg-gray-50 border-gray-200 text-gray-700"
                        }`}
                      >
                        <HugeiconsIcon icon={t.icon} size={16} />
                        <span className="text-xs">{t.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Price Range */}
              <div className="space-y-3 pt-3 border-t border-gray-100">
                <h4 className="text-xs font-bold text-gray-800 uppercase tracking-wider">
                  Price Range (per night)
                </h4>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-semibold text-gray-500 block mb-1">
                      Min Price
                    </label>
                    <div className="relative flex items-center">
                      <input
                        type="number"
                        value={initialFilters.minPrice}
                        onChange={(e) =>
                          onApply({
                            ...initialFilters,
                            minPrice: Number(e.target.value) || 0,
                          })
                        }
                        className="w-full h-10 pl-3 pr-8 rounded-xl border border-gray-200 text-xs font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#4a77ec]"
                      />
                      <span className="absolute right-3 text-xs font-bold text-gray-400">DT</span>
                    </div>
                  </div>
                  <div>
                    <label className="text-[11px] font-semibold text-gray-500 block mb-1">
                      Max Price
                    </label>
                    <div className="relative flex items-center">
                      <input
                        type="number"
                        value={initialFilters.maxPrice}
                        onChange={(e) =>
                          onApply({
                            ...initialFilters,
                            maxPrice: Number(e.target.value) || 1000,
                          })
                        }
                        className="w-full h-10 pl-3 pr-8 rounded-xl border border-gray-200 text-xs font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#4a77ec]"
                      />
                      <span className="absolute right-3 text-xs font-bold text-gray-400">DT</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Beds & Rooms */}
              <div className="space-y-3 pt-3 border-t border-gray-100">
                <h4 className="text-xs font-bold text-gray-800 uppercase tracking-wider">
                  Beds and Rooms
                </h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-gray-700">Bedrooms</span>
                    <div className="flex items-center gap-1">
                      {[0, 1, 2, 3, 4, 5].map((v) => (
                        <button
                          key={v}
                          type="button"
                          onClick={() => onApply({ ...initialFilters, bedrooms: v })}
                          className={`h-7 px-2.5 rounded-full text-xs font-bold transition-all border cursor-pointer ${
                            initialFilters.bedrooms === v
                              ? "bg-[#4a77ec] text-white border-[#4a77ec]"
                              : "bg-gray-50 text-gray-700 border-gray-200"
                          }`}
                        >
                          {v === 0 ? "Any" : v === 5 ? "5+" : v}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-gray-700">Beds</span>
                    <div className="flex items-center gap-1">
                      {[0, 1, 2, 3, 4, 5].map((v) => (
                        <button
                          key={v}
                          type="button"
                          onClick={() => onApply({ ...initialFilters, beds: v })}
                          className={`h-7 px-2.5 rounded-full text-xs font-bold transition-all border cursor-pointer ${
                            initialFilters.beds === v
                              ? "bg-[#4a77ec] text-white border-[#4a77ec]"
                              : "bg-gray-50 text-gray-700 border-gray-200"
                          }`}
                        >
                          {v === 0 ? "Any" : v === 5 ? "5+" : v}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Equipment */}
              <div className="space-y-3 pt-3 border-t border-gray-100">
                <h4 className="text-xs font-bold text-gray-800 uppercase tracking-wider">
                  Amenities & Equipment
                </h4>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: "pool", label: "Swimming Pool", icon: SwimmingIcon },
                    { id: "wifi", label: "High-Speed WiFi", icon: Wifi01Icon },
                    { id: "ac", label: "Air Conditioning", icon: SnowIcon },
                    { id: "beach", label: "Beachfront Access", icon: BeachIcon },
                  ].map((amenity) => {
                    const isChecked = initialFilters.equipment.includes(amenity.id);
                    return (
                      <button
                        key={amenity.id}
                        type="button"
                        onClick={() => {
                          const next = isChecked
                            ? initialFilters.equipment.filter((x) => x !== amenity.id)
                            : [...initialFilters.equipment, amenity.id];
                          onApply({ ...initialFilters, equipment: next });
                        }}
                        className={`p-2.5 rounded-xl border flex items-center gap-2 cursor-pointer transition-all text-left ${
                          isChecked
                            ? "bg-blue-50/80 border-[#4a77ec] text-[#4a77ec] font-bold"
                            : "bg-white hover:bg-gray-50 border-gray-200 text-gray-700"
                        }`}
                      >
                        <HugeiconsIcon icon={amenity.icon} size={15} />
                        <span className="text-xs">{amenity.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="pt-3 border-t border-gray-100 flex items-center justify-between shrink-0">
              <button
                type="button"
                onClick={() =>
                  onApply({
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
                  })
                }
                className="text-xs font-bold text-gray-500 hover:text-gray-900 border-none bg-transparent cursor-pointer underline"
              >
                Clear all
              </button>
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2.5 bg-[#4a77ec] hover:bg-[#3a67dc] text-white font-bold text-xs rounded-full border-none cursor-pointer shadow-sm transition-all"
              >
                Show {resultCount} homes
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
