"use client";

import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import L from "leaflet";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Cancel01Icon,
  Location01Icon,
  StarIcon,
  Compass01Icon,
  Add01Icon,
  Remove01Icon,
} from "@hugeicons-pro/core-stroke-rounded";

interface PropertyMapModalProps {
  isOpen: boolean;
  onClose: () => void;
  property: {
    id?: string;
    name: string;
    location?: string;
    fullAddress?: string;
    lat?: number;
    lng?: number;
    stars?: number;
  };
}

const MODAL_MAP_STYLES = `
.darbook-modal-map-pin {
  width: 38px;
  height: 38px;
  border-radius: 50%;
  background: #5D5FEF;
  border: 2.5px solid #ffffff;
  box-shadow: 0 4px 14px rgba(93, 95, 239, 0.45);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  position: relative;
  transition: transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.darbook-modal-map-pin:hover {
  transform: scale(1.12);
}
`;

export default function PropertyMapModal({
  isOpen,
  onClose,
  property,
}: PropertyMapModalProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);

  // Use property coordinates or default to Monastir / Skanes / Hammamet coords
  const centerLat = property.lat || 35.7643;
  const centerLng = property.lng || 10.7538;

  // Initialize or re-render map when modal opens
  useEffect(() => {
    if (!isOpen) {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
      return;
    }

    // Wait slightly for modal animation to complete before rendering Leaflet
    const timer = setTimeout(() => {
      if (!mapContainerRef.current) return;
      if (mapInstanceRef.current) {
        mapInstanceRef.current.invalidateSize();
        return;
      }

      // Delete default icon issue
      // @ts-ignore
      delete L.Icon.Default.prototype._getIconUrl;

      const map = L.map(mapContainerRef.current, {
        center: [centerLat, centerLng],
        zoom: 14,
        zoomControl: false,
        attributionControl: false,
        scrollWheelZoom: true,
        dragging: true,
        touchZoom: true,
        doubleClickZoom: true,
      });

      mapInstanceRef.current = map;

      // Clean, crisp basemap tiles
      L.tileLayer(
        "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png",
        {
          maxZoom: 19,
          subdomains: "abcd",
        }
      ).addTo(map);

      // Custom Purple / Indigo Pin matching screenshot
      const pinHtml = `
        <div class="darbook-modal-map-pin">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M12 2a8 8 0 0 0-8 8c0 5.25 8 12 8 12s8-6.75 8-12a8 8 0 0 0-8-8z"/>
            <circle cx="12" cy="10" r="3"/>
          </svg>
        </div>
      `;

      const customIcon = L.divIcon({
        className: "darbook-custom-popup-pin",
        html: pinHtml,
        iconSize: [38, 38],
        iconAnchor: [19, 19],
        popupAnchor: [0, -22],
      });

      const marker = L.marker([centerLat, centerLng], { icon: customIcon }).addTo(map);

      marker.bindPopup(`
        <div style="padding: 10px 12px; font-family: sans-serif;">
          <div style="font-size: 13px; font-weight: 800; color: #0f172a; margin-bottom: 2px;">${property.name}</div>
          <div style="font-size: 11px; font-weight: 600; color: #5D5FEF;">${property.fullAddress || "Rue de L'Aeroport Skanes Monastir, Monastir, Tunisia"}</div>
        </div>
      `);

      map.invalidateSize();
    }, 220);

    return () => {
      clearTimeout(timer);
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [isOpen, centerLat, centerLng, property.name, property.fullAddress]);

  const handleZoomIn = () => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.zoomIn();
    }
  };

  const handleZoomOut = () => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.zoomOut();
    }
  };

  const handleDirections = () => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${centerLat},${centerLng}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <style dangerouslySetInnerHTML={{ __html: MODAL_MAP_STYLES }} />

          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[160] bg-black/60 backdrop-blur-xs flex items-center justify-center p-2.5 sm:p-4 lg:p-6"
            onClick={onClose}
          >
            {/* Modal Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 12 }}
              transition={{ duration: 0.24, ease: "easeOut" }}
              className="w-full max-w-[1240px] h-[92vh] sm:h-[88vh] bg-white dark:bg-[#0b1022] rounded-3xl overflow-hidden shadow-2xl flex flex-col border border-slate-200/90 dark:border-slate-800"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header: Title + Stars + Address + Close Button */}
              <div className="px-5 sm:px-6 py-4 bg-white dark:bg-[#0b1022] border-b border-slate-100 dark:border-slate-800 flex items-center justify-between gap-4 shrink-0">
                <div className="min-w-0 flex-1">
                  {/* Property Name + Stars */}
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-base sm:text-lg lg:text-xl font-extrabold text-slate-900 dark:text-white font-['Bricolage_Grotesk',sans-serif] truncate">
                      {property.name || "Rosa Beach Thalasso and Spa"}
                    </h3>
                    <div className="flex items-center gap-0.5 text-amber-400">
                      {[...Array(property.stars || 4)].map((_, i) => (
                        <HugeiconsIcon
                          key={i}
                          icon={StarIcon}
                          size={15}
                          className="fill-amber-400 text-amber-400"
                        />
                      ))}
                    </div>
                  </div>

                  {/* Address with Location Pin */}
                  <div className="flex items-center gap-1.5 mt-1 text-xs text-slate-500 dark:text-slate-400 truncate">
                    <HugeiconsIcon
                      icon={Location01Icon}
                      size={14}
                      className="text-[#5D5FEF] dark:text-indigo-400 shrink-0"
                    />
                    <span className="truncate">
                      {property.fullAddress ||
                        "Rue de L'Aeroport Skanes Monastir, Monastir, Tunisia"}
                    </span>
                  </div>
                </div>

                {/* Close Button */}
                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Close map"
                  className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white flex items-center justify-center transition-colors cursor-pointer border border-slate-200/80 dark:border-slate-700 shrink-0 shadow-2xs group"
                >
                  <HugeiconsIcon icon={Cancel01Icon} size={18} className="group-hover:scale-110 transition-transform" />
                </button>
              </div>

              {/* Map View Body */}
              <div className="relative flex-1 w-full h-full min-h-[350px] bg-slate-100 dark:bg-slate-900 overflow-hidden">
                {/* Leaflet Container */}
                <div ref={mapContainerRef} className="w-full h-full z-10" />

                {/* Top-Right: Directions Button */}
                <div className="absolute top-4 right-4 z-20">
                  <button
                    type="button"
                    onClick={handleDirections}
                    className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/95 dark:bg-slate-900/95 hover:bg-white dark:hover:bg-slate-800 text-slate-800 dark:text-white font-bold text-xs shadow-md border border-slate-200/90 dark:border-slate-700 cursor-pointer transition-all hover:scale-105 active:scale-95 backdrop-blur-xs"
                  >
                    <HugeiconsIcon icon={Compass01Icon} size={15} className="text-[#5D5FEF]" />
                    <span>Directions</span>
                  </button>
                </div>

                {/* Bottom-Right: Zoom Controls Pill */}
                <div className="absolute bottom-6 right-4 z-20 flex flex-col bg-white/95 dark:bg-slate-900/95 rounded-xl shadow-lg border border-slate-200/90 dark:border-slate-700 overflow-hidden backdrop-blur-xs">
                  <button
                    type="button"
                    onClick={handleZoomIn}
                    aria-label="Zoom in"
                    className="w-9 h-9 flex items-center justify-center text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors border-none cursor-pointer"
                  >
                    <HugeiconsIcon icon={Add01Icon} size={16} />
                  </button>
                  <div className="h-[1px] bg-slate-200 dark:bg-slate-800 w-full" />
                  <button
                    type="button"
                    onClick={handleZoomOut}
                    aria-label="Zoom out"
                    className="w-9 h-9 flex items-center justify-center text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors border-none cursor-pointer"
                  >
                    <HugeiconsIcon icon={Remove01Icon} size={16} />
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
