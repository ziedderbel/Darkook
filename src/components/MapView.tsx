"use client";

import { useEffect, useRef, useState } from "react";
import L from "leaflet";

interface MapProperty {
  id: string;
  name: string;
  price: string;
  rating: number;
  photo: string;
  location: string;
  lat: number;
  lng: number;
  isSoldOut?: boolean;
}

interface MapViewProps {
  properties: MapProperty[];
  hoveredId: string | null;
  onHover: (id: string | null) => void;
}

export default function MapView({ properties, hoveredId, onHover }: MapViewProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersRef = useRef<Record<string, { marker: L.Marker; popup: L.Popup }>>({});
  const [activeLayer, setActiveLayer] = useState<"standard" | "satellite" | "voyager">("voyager");

  useEffect(() => {
    if (!containerRef.current) return;
    if (mapInstanceRef.current) return;

    // Fix icon asset paths broken by webpack/vite
    // @ts-ignore
    delete L.Icon.Default.prototype._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
      iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
      shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
    });

    // Calculate center based on property coordinates
    const validProps = properties.filter((p) => p.lat && p.lng);
    const centerLat = validProps.length > 0
      ? validProps.reduce((sum, p) => sum + p.lat, 0) / validProps.length
      : 33.83;
    const centerLng = validProps.length > 0
      ? validProps.reduce((sum, p) => sum + p.lng, 0) / validProps.length
      : 10.865;

    // Initialize real interactive Leaflet map
    const map = L.map(containerRef.current, {
      center: [centerLat, centerLng],
      zoom: 13,
      zoomControl: false,
      attributionControl: false,
      scrollWheelZoom: true,
      dragging: true,
      touchZoom: true,
      doubleClickZoom: true,
    });

    mapInstanceRef.current = map;

    // Base Tile Layer - CartoDB Voyager (clean, fast, beautiful travel aesthetics)
    const tileLayer = L.tileLayer(
      "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png",
      {
        maxZoom: 19,
        subdomains: "abcd",
        attribution: "© OpenStreetMap contributors, © CARTO",
      }
    ).addTo(map);

    // Zoom control in top-right
    L.control.zoom({ position: "topright" }).addTo(map);

    // Add Attribution in bottom-right
    L.control.attribution({ position: "bottomright", prefix: false })
      .addAttribution('© <a href="https://openstreetmap.org" target="_blank" rel="noreferrer">OpenStreetMap</a>')
      .addTo(map);

    // Render interactive price badge markers for each property
    properties.forEach((prop) => {
      const priceText = prop.price;
      const html = `
        <div class="darbook-marker" data-prop-id="${prop.id}">
          <span class="darbook-marker-price">${priceText}</span>
        </div>
      `;

      const icon = L.divIcon({
        className: "darbook-custom-div-icon",
        html: html,
        iconSize: [0, 0],
        iconAnchor: [0, 0],
        popupAnchor: [0, -10],
      });

      const marker = L.marker([prop.lat, prop.lng], { icon }).addTo(map);

      const popupHtml = `
        <div class="darbook-map-card">
          <div class="darbook-map-card-img-wrap">
            <img src="${prop.photo}" alt="${prop.name}" class="darbook-map-card-img" />
          </div>
          <div class="darbook-map-card-info">
            <div class="darbook-map-card-title">${prop.name}</div>
            <div class="darbook-map-card-row">
              <span class="darbook-map-card-rating">★ ${prop.rating}</span>
              <span class="darbook-map-card-price ${prop.isSoldOut ? "sold-out" : ""}">${prop.isSoldOut ? "Sold out" : prop.price}</span>
            </div>
            <div class="darbook-map-card-loc">${prop.location}</div>
          </div>
        </div>
      `;

      const popup = L.popup({
        offset: [0, -10],
        closeButton: false,
        className: "darbook-map-popup-window",
        maxWidth: 240,
        minWidth: 210,
        autoClose: false,
        closeOnClick: false,
      }).setContent(popupHtml);

      marker.bindPopup(popup);

      marker.on("mouseover", () => {
        onHover(prop.id);
        marker.openPopup();
        marker.setZIndexOffset(1000);
      });

      marker.on("mouseout", (e) => {
        // Only clear if not moving to popup
        const related = (e.originalEvent as MouseEvent)?.relatedTarget as HTMLElement | null;
        if (!related?.closest(".darbook-map-popup-window")) {
          onHover(null);
          marker.closePopup();
          marker.setZIndexOffset(0);
        }
      });

      marker.on("click", () => {
        onHover(prop.id);
      });

      markersRef.current[prop.id] = { marker, popup };
    });

    // Force map recalculation immediately & after resize
    const invalidate = () => {
      map.invalidateSize();
    };

    const timer1 = setTimeout(invalidate, 100);
    const timer2 = setTimeout(invalidate, 400);

    const resizeObserver = new ResizeObserver(() => {
      invalidate();
    });
    resizeObserver.observe(containerRef.current);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      resizeObserver.disconnect();
      map.remove();
      mapInstanceRef.current = null;
      markersRef.current = {};
    };
  }, [properties, onHover]);

  // Synchronize hover state with external list (highlights pin & opens preview without moving map)
  useEffect(() => {
    Object.entries(markersRef.current).forEach(([id, item]) => {
      const el = item.marker.getElement();
      if (!el) return;
      const badge = el.querySelector(".darbook-marker");
      if (!badge) return;

      if (id === hoveredId) {
        badge.classList.add("is-hovered");
        item.marker.setZIndexOffset(1000);
        item.marker.openPopup();
      } else {
        badge.classList.remove("is-hovered");
        item.marker.setZIndexOffset(0);
        item.marker.closePopup();
      }
    });
  }, [hoveredId]);

  // Map layer toggle handler
  const setLayer = (type: "voyager" | "standard" | "satellite") => {
    const map = mapInstanceRef.current;
    if (!map) return;

    setActiveLayer(type);

    // Remove existing tile layers
    map.eachLayer((layer) => {
      if (layer instanceof L.TileLayer) {
        map.removeLayer(layer);
      }
    });

    if (type === "voyager") {
      L.tileLayer("https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png", {
        maxZoom: 19,
        subdomains: "abcd",
      }).addTo(map);
    } else if (type === "standard") {
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        subdomains: ["a", "b", "c"],
      }).addTo(map);
    } else if (type === "satellite") {
      L.tileLayer(
        "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
        {
          maxZoom: 19,
        }
      ).addTo(map);
    }
  };

  const recenter = () => {
    const map = mapInstanceRef.current;
    if (!map) return;
    const validProps = properties.filter((p) => p.lat && p.lng);
    if (validProps.length === 0) return;
    const bounds = L.latLngBounds(validProps.map((p) => [p.lat, p.lng]));
    map.fitBounds(bounds, { padding: [40, 40], maxZoom: 15 });
  };

  return (
    <div className="relative w-full h-full min-h-[350px] lg:min-h-0">
      <style>{MAP_STYLES}</style>

      {/* Real Interactive Map Canvas */}
      <div ref={containerRef} className="w-full h-full min-h-[350px] lg:min-h-0" />

      {/* Map Control Bar (Layer switcher + Recenter) */}
      <div className="absolute top-4 left-4 z-[500] flex items-center gap-1.5 bg-white/95 backdrop-blur-md p-1.5 rounded-2xl shadow-lg border border-gray-200/80">
        <button
          type="button"
          onClick={() => setLayer("voyager")}
          className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all border-none cursor-pointer ${
            activeLayer === "voyager"
              ? "bg-[#4a77ec] text-white shadow-xs"
              : "bg-transparent text-gray-700 hover:bg-gray-100"
          }`}
        >
          Street
        </button>
        <button
          type="button"
          onClick={() => setLayer("satellite")}
          className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all border-none cursor-pointer ${
            activeLayer === "satellite"
              ? "bg-[#4a77ec] text-white shadow-xs"
              : "bg-transparent text-gray-700 hover:bg-gray-100"
          }`}
        >
          Satellite
        </button>
        <button
          type="button"
          onClick={() => setLayer("standard")}
          className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all border-none cursor-pointer ${
            activeLayer === "standard"
              ? "bg-[#4a77ec] text-white shadow-xs"
              : "bg-transparent text-gray-700 hover:bg-gray-100"
          }`}
        >
          OSM
        </button>
        <div className="w-px h-5 bg-gray-200 mx-0.5" />
        <button
          type="button"
          title="Fit all properties on map"
          onClick={recenter}
          className="px-2.5 py-1.5 rounded-xl text-xs font-bold bg-gray-100 hover:bg-gray-200 text-gray-700 transition-all border-none cursor-pointer flex items-center gap-1"
        >
          <span>Fit</span>
        </button>
      </div>
    </div>
  );
}

const MAP_STYLES = `
  .darbook-custom-div-icon {
    background: transparent !important;
    border: none !important;
  }

  .darbook-marker {
    background: #ffffff;
    color: #0f172a;
    font-size: 11px;
    font-weight: 800;
    padding: 6px 12px;
    border-radius: 9999px;
    border: 1.5px solid rgba(15, 23, 42, 0.12);
    box-shadow: 0 4px 14px rgba(0, 0, 0, 0.16);
    white-space: nowrap;
    cursor: pointer;
    transform: translate(-50%, -50%);
    transition: all 0.15s cubic-bezier(0.4, 0, 0.2, 1);
    user-select: none;
    font-family: inherit;
    display: inline-block;
  }

  .darbook-marker:hover,
  .darbook-marker.is-hovered {
    background: #4a77ec !important;
    color: #ffffff !important;
    border-color: #4a77ec !important;
    box-shadow: 0 8px 24px rgba(74, 119, 236, 0.45);
    transform: translate(-50%, -50%) scale(1.14);
    z-index: 9999 !important;
  }

  .darbook-map-popup-window .leaflet-popup-content-wrapper {
    padding: 0;
    border-radius: 16px;
    overflow: hidden;
    box-shadow: 0 12px 36px rgba(0, 0, 0, 0.22);
    border: 1px solid rgba(0, 0, 0, 0.08);
  }

  .darbook-map-popup-window .leaflet-popup-content {
    margin: 0;
    width: 210px !important;
  }

  .darbook-map-popup-window .leaflet-popup-tip {
    background: #ffffff;
  }

  .darbook-map-card {
    font-family: inherit;
  }

  .darbook-map-card-img-wrap {
    width: 210px;
    height: 120px;
    overflow: hidden;
  }

  .darbook-map-card-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  .darbook-map-card-info {
    padding: 10px 12px 12px;
    background: #ffffff;
  }

  .darbook-map-card-title {
    font-weight: 800;
    font-size: 13px;
    color: #0f172a;
    margin-bottom: 4px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .darbook-map-card-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 4px;
  }

  .darbook-map-card-rating {
    font-size: 11px;
    color: #4a77ec;
    font-weight: 700;
  }

  .darbook-map-card-price {
    font-size: 12px;
    font-weight: 800;
    color: #0f172a;
  }

  .darbook-map-card-price.sold-out {
    color: #ef4444;
  }

  .darbook-map-card-loc {
    font-size: 10px;
    color: #64748b;
    font-weight: 500;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .leaflet-control-zoom {
    border-radius: 14px !important;
    overflow: hidden;
    border: none !important;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.14) !important;
    margin-top: 16px !important;
    margin-right: 16px !important;
  }

  .leaflet-control-zoom a {
    width: 34px !important;
    height: 34px !important;
    line-height: 34px !important;
    font-size: 18px !important;
    color: #0f172a !important;
    background: #ffffff !important;
    border-bottom: 1px solid #f1f5f9 !important;
    font-weight: 700 !important;
    transition: background-color 0.15s;
  }

  .leaflet-control-zoom a:hover {
    background: #f8fafc !important;
    color: #4a77ec !important;
  }

  .leaflet-control-zoom-in {
    border-radius: 0 !important;
  }

  .leaflet-control-zoom-out {
    border-radius: 0 !important;
    border-bottom: none !important;
  }
`;
