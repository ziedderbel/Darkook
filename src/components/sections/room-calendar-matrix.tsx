"use client";

import { useState, useRef } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  RainIcon,
  Sun01Icon,
  ArrowLeft01Icon,
  ArrowRight01Icon,
  Tick01Icon,
  UserGroupIcon,
} from "@hugeicons-pro/core-stroke-rounded";

interface DayColumn {
  id: string;
  dayName: string;
  date: string;
  temp: string;
  isSelected: boolean;
}

type CellType = "amber" | "green" | "standard" | "unavailable" | "empty";

interface RoomCell {
  type: CellType;
  price?: string;
}

interface RoomMatrixItem {
  id: string;
  name: string;
  subtitle: string;
  cells: RoomCell[];
}

const TIMELINE_COLUMNS: DayColumn[] = [
  { id: "col-1", dayName: "TODAY", date: "10 Dec", temp: "11°C", isSelected: true },
  { id: "col-2", dayName: "JEU.", date: "11 Dec", temp: "11°C", isSelected: true },
  { id: "col-3", dayName: "VEN.", date: "15 May", temp: "11°C", isSelected: true },
  { id: "col-4", dayName: "SAM", date: "15 May", temp: "11°C", isSelected: true },
  { id: "col-5", dayName: "DIM", date: "15 May", temp: "11°C", isSelected: false },
  { id: "col-6", dayName: "LUN", date: "15 May", temp: "11°C", isSelected: false },
  { id: "col-7", dayName: "MAR", date: "15 May", temp: "11°C", isSelected: false },
  { id: "col-8", dayName: "MER", date: "15 May", temp: "11°C", isSelected: false },
  { id: "col-9", dayName: "JEU", date: "15 May", temp: "11°C", isSelected: false },
  { id: "col-10", dayName: "VEN", date: "15 May", temp: "11°C", isSelected: false },
  { id: "col-11", dayName: "SAM", date: "15 May", temp: "11°C", isSelected: false },
  { id: "col-12", dayName: "DIM", date: "15 May", temp: "11°C", isSelected: false },
  { id: "col-13", dayName: "LUN", date: "15 May", temp: "11°C", isSelected: false },
  { id: "col-14", dayName: "Today", date: "15 May", temp: "11°C", isSelected: false },
];

const ROOMS_DATA: RoomMatrixItem[] = [
  {
    id: "room-mariem",
    name: "Room Mariem",
    subtitle: "Price for 1 guest",
    cells: [
      { type: "amber", price: "20 €" },
      { type: "amber", price: "20 €" },
      { type: "amber", price: "20 €" },
      { type: "green", price: "20 €" },
      { type: "standard", price: "20 €" },
      { type: "standard", price: "20 €" },
      { type: "standard", price: "20 €" },
      { type: "standard", price: "20 €" },
      { type: "standard", price: "20 €" },
      { type: "unavailable" },
      { type: "standard", price: "20 €" },
      { type: "standard", price: "23" },
      { type: "standard", price: "24" },
      { type: "empty" },
    ],
  },
  {
    id: "room-zina",
    name: "Room ZINA",
    subtitle: "Price for 1 guest",
    cells: [
      { type: "amber", price: "20 €" },
      { type: "amber", price: "20 €" },
      { type: "amber", price: "20 €" },
      { type: "unavailable" },
      { type: "unavailable" },
      { type: "unavailable" },
      { type: "unavailable" },
      { type: "unavailable" },
      { type: "unavailable" },
      { type: "unavailable" },
      { type: "standard", price: "20 €" },
      { type: "standard", price: "23" },
      { type: "standard", price: "24" },
      { type: "standard", price: "25" },
    ],
  },
  {
    id: "room-jannet",
    name: "Room JANNET",
    subtitle: "Price for 1 guest",
    cells: [
      { type: "green", price: "20 €" },
      { type: "green", price: "20 €" },
      { type: "green", price: "20 €" },
      { type: "green", price: "20 €" },
      { type: "standard", price: "20 €" },
      { type: "standard", price: "20 €" },
      { type: "standard", price: "20 €" },
      { type: "standard", price: "20 €" },
      { type: "standard", price: "20 €" },
      { type: "unavailable" },
      { type: "standard", price: "20 €" },
      { type: "standard", price: "23" },
      { type: "standard", price: "24" },
      { type: "standard", price: "25" },
    ],
  },
  {
    id: "room-aicha",
    name: "Room Aicha",
    subtitle: "Price for 1 guest",
    cells: [
      { type: "green", price: "20 €" },
      { type: "green", price: "20 €" },
      { type: "green", price: "20 €" },
      { type: "green", price: "20 €" },
      { type: "standard", price: "20 €" },
      { type: "standard", price: "20 €" },
      { type: "standard", price: "20 €" },
      { type: "standard", price: "20 €" },
      { type: "standard", price: "20 €" },
      { type: "unavailable" },
      { type: "standard", price: "20 €" },
      { type: "standard", price: "23" },
      { type: "standard", price: "24" },
      { type: "standard", price: "25" },
    ],
  },
  {
    id: "room-khadija",
    name: "Room Khadija",
    subtitle: "Price for 1 guest",
    cells: [
      { type: "unavailable" },
      { type: "unavailable" },
      { type: "unavailable" },
      { type: "unavailable" },
      { type: "unavailable" },
      { type: "unavailable" },
      { type: "unavailable" },
      { type: "unavailable" },
      { type: "unavailable" },
      { type: "unavailable" },
      { type: "unavailable" },
      { type: "unavailable" },
      { type: "unavailable" },
      { type: "unavailable" },
    ],
  },
];

interface RoomCalendarMatrixProps {
  onSelectRoom?: (roomId: string) => void;
  selectedRoomId?: string;
  onBookNow?: (roomId: string) => void;
  showBottomBookingAction?: boolean;
}

export default function RoomCalendarMatrix({
  onSelectRoom,
  selectedRoomId = "room-mariem",
  onBookNow,
  showBottomBookingAction = true,
}: RoomCalendarMatrixProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [activeSelectedRoom, setActiveSelectedRoom] = useState(selectedRoomId);

  const handleScroll = (direction: "left" | "right") => {
    if (!scrollContainerRef.current) return;
    const offset = direction === "left" ? -280 : 280;
    scrollContainerRef.current.scrollBy({ left: offset, behavior: "smooth" });
  };

  const handleRoomClick = (roomId: string) => {
    setActiveSelectedRoom(roomId);
    if (onSelectRoom) {
      onSelectRoom(roomId);
    }
  };

  return (
    <div className="space-y-6">
      {/* Sub-header title & Horizontal scroll triggers */}
      <div className="flex items-center justify-between">
        <div>
          <h4 className="text-xl font-extrabold text-slate-900 dark:text-white font-['Bricolage_Grotesk',sans-serif]">
            Room calendar
          </h4>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-0.5">
            Disponibilité et tarifs en direct pour chaque chambre
          </p>
        </div>

        {/* Scroll Arrows for small/medium viewports */}
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => handleScroll("left")}
            aria-label="Scroll left"
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 flex items-center justify-center transition-colors cursor-pointer border-none"
          >
            <HugeiconsIcon icon={ArrowLeft01Icon} size={15} />
          </button>
          <button
            type="button"
            onClick={() => handleScroll("right")}
            aria-label="Scroll right"
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 flex items-center justify-center transition-colors cursor-pointer border-none"
          >
            <HugeiconsIcon icon={ArrowRight01Icon} size={15} />
          </button>
        </div>
      </div>

      {/* ── Main Matrix Grid Container ── */}
      <div className="border border-slate-200/90 dark:border-slate-800 rounded-2xl overflow-hidden shadow-xs bg-white dark:bg-[#0b1022]">
        <div ref={scrollContainerRef} className="overflow-x-auto no-scrollbar">
          <div className="min-w-[1020px] divide-y divide-slate-100 dark:divide-slate-800">
            {/* ── Top Header: Date & Weather Columns ── */}
            <div className="flex items-stretch bg-white dark:bg-[#080d1e] select-none">
              {TIMELINE_COLUMNS.map((col, idx) => (
                <div
                  key={col.id}
                  className={`flex-1 min-w-[72px] sm:min-w-[80px] py-2.5 px-2 flex flex-col items-center justify-center text-center transition-colors border-r border-slate-100 dark:border-slate-800/80 last:border-r-0 ${
                    col.isSelected
                      ? "bg-[#3B68EC] text-white border-blue-400/30"
                      : "bg-[#F8FAFC] dark:bg-[#0e162b] text-slate-700 dark:text-slate-300"
                  }`}
                >
                  {/* Weather Icon + Temperature */}
                  <div className="flex items-center gap-1 text-[11px] font-medium opacity-95">
                    <HugeiconsIcon
                      icon={RainIcon}
                      size={13}
                      className={col.isSelected ? "text-white" : "text-blue-500 dark:text-blue-400"}
                    />
                    <span>{col.temp}</span>
                  </div>

                  {/* Day of Week */}
                  <span
                    className={`text-[11px] font-extrabold uppercase tracking-wide mt-1 ${
                      col.isSelected ? "text-white" : "text-slate-700 dark:text-slate-300"
                    }`}
                  >
                    {col.dayName}
                  </span>

                  {/* Date */}
                  <span
                    className={`text-[10.5px] font-medium ${
                      col.isSelected ? "text-blue-100" : "text-slate-500 dark:text-slate-400"
                    }`}
                  >
                    {col.date}
                  </span>
                </div>
              ))}
            </div>

            {/* ── Room Rows ── */}
            {ROOMS_DATA.map((room) => {
              const isRoomActive = activeSelectedRoom === room.id;
              return (
                <div
                  key={room.id}
                  className={`transition-colors ${
                    isRoomActive ? "bg-blue-50/20 dark:bg-blue-950/20" : "hover:bg-slate-50/50 dark:hover:bg-slate-800/30"
                  }`}
                >
                  {/* Room Label Row with blue accent bar */}
                  <div
                    onClick={() => handleRoomClick(room.id)}
                    className="pt-3.5 pb-1 px-4 cursor-pointer"
                  >
                    <div className="flex items-baseline gap-2">
                      <h5 className="text-base sm:text-[17px] font-extrabold text-[#181743] dark:text-white font-['Bricolage_Grotesk',sans-serif]">
                        {room.name}
                      </h5>
                      {isRoomActive && (
                        <span className="text-[10px] font-bold text-[#3B68EC] dark:text-blue-400 bg-blue-100/70 dark:bg-blue-950 px-1.5 py-0.2 rounded-md">
                          Selected
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                      {room.subtitle}
                    </p>
                    {/* Blue Underline Bar */}
                    <div className="w-[220px] sm:w-[260px] h-[2.5px] bg-[#3B68EC] mt-2 rounded-full" />
                  </div>

                  {/* Grid Cells for this Room */}
                  <div className="flex items-stretch border-t border-slate-100/90 dark:border-slate-800/80">
                    {room.cells.map((cell, cIdx) => {
                      return (
                        <div
                          key={cIdx}
                          onClick={() => {
                            if (cell.type !== "unavailable" && cell.type !== "empty") {
                              handleRoomClick(room.id);
                            }
                          }}
                          className={`flex-1 min-w-[72px] sm:min-w-[80px] h-[52px] sm:h-[60px] flex items-center justify-center border-r border-slate-100 dark:border-slate-800/80 last:border-r-0 select-none transition-all ${
                            cell.type === "amber"
                              ? "bg-[#FFF8E7] dark:bg-amber-950/40 text-[#D97706] dark:text-amber-400 font-extrabold text-sm sm:text-base cursor-pointer hover:brightness-95"
                              : cell.type === "green"
                              ? "bg-[#ECFDF5] dark:bg-emerald-950/40 text-[#059669] dark:text-emerald-400 font-extrabold text-sm sm:text-base cursor-pointer hover:brightness-95"
                              : cell.type === "standard"
                              ? "bg-white dark:bg-[#0b1022] text-slate-800 dark:text-slate-200 font-bold text-sm sm:text-[15px] cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800"
                              : cell.type === "unavailable"
                              ? "bg-white dark:bg-[#0b1022] text-slate-300 dark:text-slate-600 cursor-not-allowed"
                              : "bg-white dark:bg-[#0b1022]"
                          }`}
                        >
                          {cell.type === "unavailable" ? (
                            <span className="text-base text-slate-300 dark:text-slate-600 font-light">
                              ✕
                            </span>
                          ) : cell.type === "empty" ? null : (
                            <span>{cell.price}</span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Bottom Summary Action Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-slate-100 dark:border-slate-800">
        {/* Legend */}
        <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-slate-600 dark:text-slate-400">
          <div className="flex items-center gap-2">
            <div className="w-3.5 h-3.5 rounded-md bg-[#FFF8E7] dark:bg-amber-950 border border-amber-300 text-[#D97706] text-[9px] flex items-center justify-center font-bold">
              20
            </div>
            <span>Selected dates (Promo)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3.5 h-3.5 rounded-md bg-[#ECFDF5] dark:bg-emerald-950 border border-emerald-300 text-[#059669] text-[9px] flex items-center justify-center font-bold">
              20
            </div>
            <span>Selected dates (Standard)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3.5 h-3.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-400 text-[10px] flex items-center justify-center font-light">
              ✕
            </div>
            <span>Sold out</span>
          </div>
        </div>

        {/* Selected Room Booking Action */}
        {showBottomBookingAction && (
          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <p className="text-xs text-slate-400 dark:text-slate-500 font-medium">
                Chambre sélectionnée :{" "}
                <span className="text-slate-800 dark:text-white font-bold">
                  {ROOMS_DATA.find((r) => r.id === activeSelectedRoom)?.name || "Room Mariem"}
                </span>
              </p>
              <p className="text-sm font-extrabold text-[#3B68EC] dark:text-[#60a5fa] font-['Bricolage_Grotesk',sans-serif]">
                80 € (4 nuits)
              </p>
            </div>
            <button
              type="button"
              onClick={() => onBookNow?.(activeSelectedRoom)}
              className="px-6 py-2.5 bg-[#3B68EC] hover:bg-[#254EDB] text-white font-extrabold text-xs sm:text-sm rounded-xl transition-all cursor-pointer border-none shadow-xs hover:scale-105 active:scale-95"
            >
              Réserver cette chambre
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
