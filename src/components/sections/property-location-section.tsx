"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import L from "leaflet";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  FullScreenIcon,
  Layers01Icon,
  UserIcon,
  Cancel01Icon,
  Search01Icon,
  Restaurant01Icon,
  ShoppingBag01Icon,
  Train01Icon,
  Camera01Icon,
  ShoppingCart01Icon,
  Building01Icon,
  Add01Icon,
  Remove01Icon,
} from "@hugeicons-pro/core-stroke-rounded";

interface POIItem {
  id: string;
  name: string;
  category: "groceries" | "restaurants" | "shopping" | "transport" | "attractions";
  subtitle: string;
  lat: number;
  lng: number;
  iconType: "cart" | "food" | "resort" | "beach" | "transport" | "pharmacy";
}

interface PropertyLocationSectionProps {
  property: {
    id: string;
    name: string;
    location: string;
    fullAddress?: string;
    lat?: number;
    lng?: number;
    photos?: any[];
  };
}

const MAP_STYLES = `
.darbook-loc-marker-main {
  position: relative;
  width: 48px;
  height: 48px;
  background: #3B68EC;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  box-shadow: 0 12px 28px rgba(59, 104, 236, 0.45), 0 0 0 3px rgba(255, 255, 255, 0.95);
  cursor: pointer;
  transition: transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.darbook-loc-marker-main:hover {
  transform: scale(1.12);
}
.darbook-loc-marker-main::after {
  content: '';
  position: absolute;
  bottom: -6px;
  left: 50%;
  transform: translateX(-50%);
  width: 0;
  height: 0;
  border-left: 6px solid transparent;
  border-right: 6px solid transparent;
  border-top: 7px solid #3B68EC;
}
.darbook-poi-badge {
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 5px;
  cursor: pointer;
  transition: all 0.2s ease;
  user-select: none;
}
.darbook-poi-badge:hover {
  transform: scale(1.08);
  z-index: 1000 !important;
}
.darbook-poi-circle {
  width: 26px;
  height: 26px;
  border-radius: 9999px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  box-shadow: 0 4px 12px rgba(0,0,0,0.18), 0 0 0 2px rgba(255, 255, 255, 0.9);
  flex-shrink: 0;
}
.darbook-poi-circle.groceries { background: #3B82F6; }
.darbook-poi-circle.restaurants { background: #F97316; }
.darbook-poi-circle.attractions { background: #EC4899; }
.darbook-poi-circle.beach { background: #10B981; }
.darbook-poi-circle.transport { background: #06B6D4; }
.darbook-poi-circle.pharmacy { background: #EF4444; }

.darbook-poi-label {
  display: flex;
  flex-direction: column;
  line-height: 1.1;
  text-shadow: 0 1px 3px rgba(255,255,255,0.9), 0 0 4px rgba(255,255,255,0.8);
  white-space: nowrap;
}
.darbook-poi-title {
  font-size: 11px;
  font-weight: 700;
  color: #0f172a;
}
.darbook-poi-sub {
  font-size: 9.5px;
  font-weight: 500;
  color: #64748b;
}

.leaflet-popup-content-wrapper {
  border-radius: 16px !important;
  box-shadow: 0 14px 34px rgba(15, 23, 42, 0.18) !important;
  padding: 0 !important;
  overflow: hidden !important;
}
.leaflet-popup-content {
  margin: 0 !important;
  line-height: 1.4 !important;
}
.leaflet-container {
  font-family: inherit !important;
  background: #f1f5f9 !important;
}
`;

export default function PropertyLocationSection({ property }: PropertyLocationSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapWrapperRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersGroupRef = useRef<L.LayerGroup | null>(null);
  const currentTileLayerRef = useRef<L.TileLayer | null>(null);

  // States
  const [activeLayer, setActiveLayer] = useState<"voyager" | "satellite">("voyager");
  const [activeCategory, setActiveCategory] = useState<string | null>("groceries");
  const [showTooltip, setShowTooltip] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Center coordinates (defaulting to Sousse/Hammamet region like mockup or property coords)
  const centerLat = property.lat || 35.845;
  const centerLng = property.lng || 10.618;

  // Rich Points of Interest matching the attached mockup
  const poiList: POIItem[] = useMemo(
    () => [
      // Groceries & Supermarkets
      {
        id: "poi-1",
        name: "Portugal Market",
        subtitle: "Supermarket",
        category: "groceries",
        iconType: "cart",
        lat: centerLat + 0.007,
        lng: centerLng - 0.007,
      },
      {
        id: "poi-2",
        name: "Lidl",
        subtitle: "Supermarket",
        category: "groceries",
        iconType: "cart",
        lat: centerLat + 0.0082,
        lng: centerLng - 0.002,
      },
      {
        id: "poi-3",
        name: "Franprix",
        subtitle: "Supermarket",
        category: "groceries",
        iconType: "cart",
        lat: centerLat + 0.0055,
        lng: centerLng - 0.004,
      },
      {
        id: "poi-4",
        name: "Super U et Drive",
        subtitle: "Supermarket",
        category: "groceries",
        iconType: "cart",
        lat: centerLat + 0.002,
        lng: centerLng + 0.0075,
      },
      {
        id: "poi-5",
        name: "G20 Supermarché",
        subtitle: "Supermarket",
        category: "groceries",
        iconType: "cart",
        lat: centerLat - 0.0035,
        lng: centerLng + 0.0065,
      },
      {
        id: "poi-6",
        name: "Intermarché SUPER",
        subtitle: "Supermarket",
        category: "groceries",
        iconType: "cart",
        lat: centerLat - 0.003,
        lng: centerLng - 0.007,
      },
      {
        id: "poi-7",
        name: "Epicerie Du Coin",
        subtitle: "Grocery store",
        category: "groceries",
        iconType: "cart",
        lat: centerLat - 0.005,
        lng: centerLng - 0.0065,
      },
      {
        id: "poi-8",
        name: "ALIMENTATION...",
        subtitle: "Grocery store",
        category: "groceries",
        iconType: "cart",
        lat: centerLat - 0.008,
        lng: centerLng + 0.0055,
      },

      // Restaurants & Cafes
      {
        id: "poi-9",
        name: "Bruschetta Restaurant",
        subtitle: "Italian cuisine",
        category: "restaurants",
        iconType: "food",
        lat: centerLat - 0.0015,
        lng: centerLng + 0.004,
      },
      {
        id: "poi-10",
        name: "L'Aromate Restaurant",
        subtitle: "Pizzeria & Grill",
        category: "restaurants",
        iconType: "food",
        lat: centerLat - 0.0065,
        lng: centerLng - 0.002,
      },
      {
        id: "poi-11",
        name: "Planet Food",
        subtitle: "Fast food & Crepes",
        category: "restaurants",
        iconType: "food",
        lat: centerLat - 0.0105,
        lng: centerLng - 0.0055,
      },

      // Attractions, Hotels & Beaches
      {
        id: "poi-12",
        name: "Las Vegas Beach",
        subtitle: "Beach & Lounge",
        category: "attractions",
        iconType: "beach",
        lat: centerLat + 0.006,
        lng: centerLng + 0.0065,
      },
      {
        id: "poi-13",
        name: "Bou Jaafar Beach",
        subtitle: "Public beach",
        category: "attractions",
        iconType: "beach",
        lat: centerLat - 0.010,
        lng: centerLng + 0.011,
      },
      {
        id: "poi-14",
        name: "Hôtel Marhaba Club",
        subtitle: "Resort & Thalasso",
        category: "attractions",
        iconType: "resort",
        lat: centerLat + 0.0005,
        lng: centerLng + 0.007,
      },
      {
        id: "poi-15",
        name: "Marabout Sousse Hotel",
        subtitle: "Hotel & Spa",
        category: "attractions",
        iconType: "resort",
        lat: centerLat - 0.0018,
        lng: centerLng + 0.008,
      },
      {
        id: "poi-16",
        name: "Sousse Pearl Marriott",
        subtitle: "Resort & Spa",
        category: "attractions",
        iconType: "resort",
        lat: centerLat - 0.0055,
        lng: centerLng + 0.010,
      },
      {
        id: "poi-17",
        name: "JAZ Tour Khalef",
        subtitle: "Luxury Thalasso",
        category: "attractions",
        iconType: "resort",
        lat: centerLat + 0.0035,
        lng: centerLng + 0.0045,
      },

      // Shopping & Pharmacy
      {
        id: "poi-18",
        name: "Pharmacie Nuit",
        subtitle: "Pharmacy 24/7",
        category: "shopping",
        iconType: "pharmacy",
        lat: centerLat + 0.0085,
        lng: centerLng - 0.0005,
      },
      {
        id: "poi-19",
        name: "ParaBest",
        subtitle: "Parapharmacie",
        category: "shopping",
        iconType: "pharmacy",
        lat: centerLat + 0.0025,
        lng: centerLng + 0.003,
      },

      // Transport Hub
      {
        id: "poi-20",
        name: "Station Louage & Taxis",
        subtitle: "Transport Hub",
        category: "transport",
        iconType: "transport",
        lat: centerLat - 0.0085,
        lng: centerLng - 0.001,
      },
    ],
    [centerLat, centerLng]
  );

  // Initialize Leaflet Map
  useEffect(() => {
    if (!containerRef.current) return;
    if (mapInstanceRef.current) return;

    // Delete default icon issue
    // @ts-ignore
    delete L.Icon.Default.prototype._getIconUrl;

    const map = L.map(containerRef.current, {
      center: [centerLat, centerLng],
      zoom: 15,
      zoomControl: false,
      attributionControl: false,
      scrollWheelZoom: true,
      dragging: true,
      touchZoom: true,
      doubleClickZoom: true,
    });

    mapInstanceRef.current = map;

    // Base CartoDB Voyager Tile Layer (clean, high-res google-map feel)
    const baseTileLayer = L.tileLayer(
      "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png",
      {
        maxZoom: 19,
        subdomains: "abcd",
      }
    ).addTo(map);

    currentTileLayerRef.current = baseTileLayer;

    // Main Accommodation Center Pin
    const mainPinHtml = `
      <div class="darbook-loc-marker-main">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z"/>
          <path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2"/>
          <path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2"/>
          <path d="M10 6h4"/>
          <path d="M10 10h4"/>
          <path d="M10 14h4"/>
          <path d="M10 18h4"/>
        </svg>
      </div>
    `;

    const mainIcon = L.divIcon({
      className: "darbook-custom-main-icon",
      html: mainPinHtml,
      iconSize: [48, 54],
      iconAnchor: [24, 54],
      popupAnchor: [0, -56],
    });

    const mainMarker = L.marker([centerLat, centerLng], { icon: mainIcon, zIndexOffset: 2000 }).addTo(map);

    mainMarker.bindPopup(`
      <div style="padding: 12px 14px; min-width: 180px;">
        <div style="font-size: 13px; font-weight: 800; color: #0f172a; margin-bottom: 2px;">${property.name}</div>
        <div style="font-size: 11px; font-weight: 600; color: #3B68EC;">Your Accommodation</div>
        <div style="font-size: 10px; color: #64748b; margin-top: 4px;">${property.location}</div>
      </div>
    `);

    // Group for POI Markers
    const markersGroup = L.layerGroup().addTo(map);
    markersGroupRef.current = markersGroup;

    // Force map dimensions recalculation
    const timer = setTimeout(() => {
      map.invalidateSize();
    }, 150);

    return () => {
      clearTimeout(timer);
      map.remove();
      mapInstanceRef.current = null;
      markersGroupRef.current = null;
    };
  }, [centerLat, centerLng, property.name, property.location]);

  // Render & Filter POI Markers on Category change
  useEffect(() => {
    const markersGroup = markersGroupRef.current;
    if (!markersGroup) return;

    markersGroup.clearLayers();

    poiList.forEach((poi) => {
      // If a category is selected and doesn't match, reduce opacity or keep subtle
      const isMatch = !activeCategory || poi.category === activeCategory;
      const opacity = isMatch ? 1 : 0.45;

      let iconSvg = "";
      let circleClass: string = poi.category;

      if (poi.iconType === "cart") {
        circleClass = "groceries";
        iconSvg = `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>`;
      } else if (poi.iconType === "food") {
        circleClass = "restaurants";
        iconSvg = `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M18 2v20M18 8a3 3 0 0 0 3-3V2M2 2v6a3 3 0 0 0 3 3h1v11h2V2"/></svg>`;
      } else if (poi.iconType === "beach") {
        circleClass = "beach";
        iconSvg = `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M22 18H2M17.5 18a4.5 4.5 0 0 0-4.5-4.5h-2A4.5 4.5 0 0 0 6.5 18M12 2v12"/></svg>`;
      } else if (poi.iconType === "resort") {
        circleClass = "attractions";
        iconSvg = `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 3"/></svg>`;
      } else if (poi.iconType === "pharmacy") {
        circleClass = "pharmacy";
        iconSvg = `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M12 6v12M6 12h12"/></svg>`;
      } else {
        circleClass = "transport";
        iconSvg = `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><rect width="16" height="16" x="4" y="4" rx="2"/><path d="M4 10h16M12 4v6M8 15h.01M16 15h.01"/></svg>`;
      }

      const poiHtml = `
        <div class="darbook-poi-badge" style="opacity: ${opacity};">
          <div class="darbook-poi-circle ${circleClass}">
            ${iconSvg}
          </div>
          <div class="darbook-poi-label">
            <span class="darbook-poi-title">${poi.name}</span>
            <span class="darbook-poi-sub">${poi.subtitle}</span>
          </div>
        </div>
      `;

      const poiIcon = L.divIcon({
        className: "darbook-custom-poi-div",
        html: poiHtml,
        iconSize: [0, 0],
        iconAnchor: [13, 13],
        popupAnchor: [0, -14],
      });

      const marker = L.marker([poi.lat, poi.lng], { icon: poiIcon });

      marker.bindPopup(`
        <div style="padding: 10px 12px; min-width: 150px;">
          <div style="font-size: 12px; font-weight: 700; color: #0f172a;">${poi.name}</div>
          <div style="font-size: 10.5px; font-weight: 600; color: #3B68EC; text-transform: capitalize;">${poi.subtitle}</div>
          <div style="font-size: 10px; color: #64748b; margin-top: 3px;">~3-8 min from guesthouse</div>
        </div>
      `);

      markersGroup.addLayer(marker);
    });
  }, [activeCategory, poiList]);

  // Handle Layer Toggle (Voyager vs Satellite)
  const handleToggleLayer = () => {
    const map = mapInstanceRef.current;
    if (!map) return;

    if (currentTileLayerRef.current) {
      map.removeLayer(currentTileLayerRef.current);
    }

    const nextLayer = activeLayer === "voyager" ? "satellite" : "voyager";
    setActiveLayer(nextLayer);

    if (nextLayer === "satellite") {
      const satelliteLayer = L.tileLayer(
        "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
        {
          maxZoom: 19,
        }
      ).addTo(map);
      currentTileLayerRef.current = satelliteLayer;
    } else {
      const voyagerLayer = L.tileLayer(
        "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png",
        {
          maxZoom: 19,
          subdomains: "abcd",
        }
      ).addTo(map);
      currentTileLayerRef.current = voyagerLayer;
    }
  };

  // Zoom In / Out
  const handleZoomIn = () => {
    mapInstanceRef.current?.zoomIn();
  };

  const handleZoomOut = () => {
    mapInstanceRef.current?.zoomOut();
  };

  // Toggle Fullscreen
  const handleToggleFullscreen = () => {
    if (!mapWrapperRef.current) return;
    if (!document.fullscreenElement) {
      mapWrapperRef.current.requestFullscreen?.().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen?.().catch(() => {});
      setIsFullscreen(false);
    }
  };

  return (
    <section id="property-location-map" className="space-y-4">
      <style>{MAP_STYLES}</style>

      {/* Section Title */}
      <div>
        <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight font-['Bricolage_Grotesk',sans-serif]">
          Where you'll be
        </h3>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium mt-1">
          {property.location}
        </p>
      </div>

      {/* Interactive Map Canvas Container */}
      <div
        ref={mapWrapperRef}
        className="relative w-full h-[460px] sm:h-[520px] md:h-[580px] lg:h-[620px] rounded-[28px] overflow-hidden border border-slate-200/90 dark:border-slate-800 shadow-md bg-[#e5e3df] dark:bg-[#070b18] select-none"
      >
        {/* Leaflet Map Target */}
        <div ref={containerRef} className="w-full h-full" />

        {/* ── Top-Right Map Controls Stack ── */}
        <div className="absolute top-4 sm:top-5 right-4 sm:right-5 z-[500] flex flex-col items-center gap-2.5">
          {/* 1. Fullscreen Button */}
          <button
            type="button"
            onClick={handleToggleFullscreen}
            aria-label="Toggle Fullscreen"
            title="Plein écran"
            className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white dark:bg-[#121a30] text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-[#16203a] shadow-lg border border-slate-200/80 dark:border-slate-700 flex items-center justify-center cursor-pointer transition-all hover:scale-105 active:scale-95"
          >
            <HugeiconsIcon icon={FullScreenIcon} size={18} />
          </button>

          {/* 2. Satellite / Map Layer Toggle Button */}
          <div className="relative">
            <button
              type="button"
              onClick={handleToggleLayer}
              aria-label="Switch Layer"
              title="Vue satellite / carte"
              className={`w-10 h-10 sm:w-11 sm:h-11 rounded-full shadow-lg border flex items-center justify-center cursor-pointer transition-all hover:scale-105 active:scale-95 ${
                activeLayer === "satellite"
                  ? "bg-[#3B68EC] text-white border-[#3B68EC]"
                  : "bg-white dark:bg-[#121a30] text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-[#16203a] border-slate-200/80 dark:border-slate-700"
              }`}
            >
              <HugeiconsIcon icon={Layers01Icon} size={18} />
            </button>

            {/* 3. Dismissable Tooltip / Speech Bubble next to Layer Button */}
            {showTooltip && (
              <div className="absolute top-1/2 -translate-y-1/2 right-[calc(100%+14px)] hidden sm:flex items-center gap-3 bg-[#181d38] text-white text-xs font-semibold px-4 py-2.5 rounded-2xl shadow-2xl border border-white/10 whitespace-nowrap z-[520] animate-in fade-in slide-in-from-right-2">
                <span>You can switch between default and satellite view.</span>
                <button
                  type="button"
                  onClick={() => setShowTooltip(false)}
                  aria-label="Close tooltip"
                  className="text-slate-400 hover:text-white cursor-pointer bg-transparent border-none p-0 flex items-center shrink-0"
                >
                  <HugeiconsIcon icon={Cancel01Icon} size={14} />
                </button>
                {/* Pointer Caret on Right */}
                <div className="absolute top-1/2 -translate-y-1/2 -right-1.5 w-0 h-0 border-y-4 border-y-transparent border-l-6 border-l-[#181d38]" />
              </div>
            )}
          </div>

          {/* 4. Combined Zoom In (+) / Zoom Out (-) Pill */}
          <div className="w-10 sm:w-11 bg-white dark:bg-[#121a30] rounded-full shadow-lg border border-slate-200/80 dark:border-slate-700 flex flex-col items-center divide-y divide-slate-100 dark:divide-slate-800 overflow-hidden">
            <button
              type="button"
              onClick={handleZoomIn}
              aria-label="Zoom in"
              className="h-9 sm:h-10 w-full flex items-center justify-center text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-[#16203a] cursor-pointer text-base font-extrabold transition-colors border-none bg-transparent"
            >
              <HugeiconsIcon icon={Add01Icon} size={16} />
            </button>
            <button
              type="button"
              onClick={handleZoomOut}
              aria-label="Zoom out"
              className="h-9 sm:h-10 w-full flex items-center justify-center text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-[#16203a] cursor-pointer text-base font-extrabold transition-colors border-none bg-transparent"
            >
              <HugeiconsIcon icon={Remove01Icon} size={16} />
            </button>
          </div>

          {/* 5. Street View / Pegman Button */}
          <button
            type="button"
            aria-label="Street View"
            title="Street View"
            className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white dark:bg-[#121a30] shadow-lg border border-slate-200/80 dark:border-slate-700 flex items-center justify-center cursor-pointer transition-all hover:scale-105 active:scale-95"
          >
            <HugeiconsIcon icon={UserIcon} size={19} className="text-amber-500 fill-amber-500" />
          </button>
        </div>

        {/* ── Bottom Floating Search & Category Filter Bar ── */}
        <div className="absolute bottom-4 sm:bottom-5 inset-x-0 z-[500] flex items-center justify-center px-3 sm:px-4 pointer-events-none">
          <div className="flex items-center gap-1.5 sm:gap-2.5 overflow-x-auto no-scrollbar py-1 max-w-full pointer-events-auto">
            {/* Search Icon Pill */}
            <button
              type="button"
              onClick={() => setActiveCategory(null)}
              aria-label="Search"
              className={`h-9 sm:h-10 px-3 rounded-full shadow-md border flex items-center justify-center cursor-pointer transition-all hover:scale-105 active:scale-95 shrink-0 ${
                activeCategory === null
                  ? "bg-[#181d38] text-white border-slate-700"
                  : "bg-white/95 dark:bg-[#121a30]/95 backdrop-blur-md text-slate-700 dark:text-slate-200 hover:bg-white border-slate-200/80 dark:border-slate-700"
              }`}
            >
              <HugeiconsIcon icon={Search01Icon} size={16} />
            </button>

            {/* Category Filter Pills */}
            {[
              { id: "restaurants", label: "Restaurants", icon: Restaurant01Icon },
              { id: "shopping", label: "Shopping", icon: ShoppingBag01Icon },
              { id: "transport", label: "Transport Hub", icon: Train01Icon },
              { id: "attractions", label: "Attractions", icon: Camera01Icon },
              { id: "groceries", label: "Groceries", icon: ShoppingCart01Icon },
            ].map((cat) => {
              const IconComp = cat.icon;
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setActiveCategory(isActive ? null : cat.id)}
                  className={`h-9 sm:h-10 px-3.5 sm:px-4 rounded-full text-xs font-bold shadow-md border flex items-center gap-2 cursor-pointer transition-all hover:scale-105 active:scale-95 shrink-0 whitespace-nowrap ${
                    isActive
                      ? "bg-[#181d38] text-white border-slate-700 scale-105 shadow-xl"
                      : "bg-white/95 dark:bg-[#121a30]/95 backdrop-blur-md text-slate-800 dark:text-slate-200 hover:bg-white border-slate-200/80 dark:border-slate-700"
                  }`}
                >
                  <HugeiconsIcon icon={IconComp} size={15} />
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ── Bottom Google / Map Data Attribution Watermarks ── */}
        <div className="absolute bottom-1 left-2.5 z-[450] pointer-events-none opacity-80 text-[11px] font-bold text-slate-600 dark:text-slate-400 select-none">
          Google
        </div>
        <div className="absolute bottom-1 right-2.5 z-[450] pointer-events-none hidden md:flex items-center gap-2 text-[9.5px] font-medium text-slate-500 dark:text-slate-400 bg-white/75 dark:bg-slate-900/75 backdrop-blur-xs px-2 py-0.5 rounded select-none">
          <span>Keyboard shortcuts</span>
          <span>•</span>
          <span>Map Data ©2026</span>
          <span>•</span>
          <span>500 m</span>
          <span>•</span>
          <span>Terms</span>
        </div>
      </div>
    </section>
  );
}
