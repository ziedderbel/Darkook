"use client";
import { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { interpolate } from "flubber";
import { Link } from "@/i18n/navigation";
import { Reveal } from "@/components/motion/reveal";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  FavouriteIcon,
  StarIcon,
  Facebook02Icon,
  NewTwitterIcon,
  InstagramIcon,
  PinterestIcon,
  YoutubeIcon,
  ArrowRight01Icon,
  FilterIcon,
  UserIcon,
  SwimmingIcon,
  BeachIcon,
  UserGroupIcon,
  Location01Icon,
  House01Icon,
  BedDoubleIcon,
} from "@hugeicons-pro/core-stroke-rounded";
import svgPaths from "../imports/LandingPage/svg-p2y91de9gv"

// Category circular photos
import catPhoto1 from "../imports/LandingPage/cat_photo_1.png"
import catPhoto2 from "../imports/LandingPage/cat_photo_2.png"
import catPhoto3 from "../imports/LandingPage/cat_photo_3.png"
import catPhoto4 from "../imports/LandingPage/cat_photo_4.png"
import catPhoto5 from "../imports/LandingPage/cat_photo_5.png"
import catPhoto6 from "../imports/LandingPage/cat_photo_6.png"
import catPhoto7 from "../imports/LandingPage/cat_photo_7.png"
import catPhoto8 from "../imports/LandingPage/cat_photo_8.png"
import catPhoto9 from "../imports/LandingPage/cat_photo_9.png"

// Popular right now hotel card photos
import imgHotelCard from "../imports/LandingPage/c073680884b8f10a9de7959ce4fee30b267ae984.png"
import imgHotelCard1 from "../imports/LandingPage/dc0d810ba85b235e1ae2b4d5e84a20e6748d4726.png"
import imgHotelCard2 from "../imports/LandingPage/66e049ad706e01c958d848def84f86b9917c51e8.png"

// Why Darbook illustrations
import imgSansTitre21 from "../imports/LandingPage/a71fb6f4b12793f5ae5051e3957500f049043bbe.png"
import imgSansTitre11 from "../imports/LandingPage/b83d2c336d1f48aec36c354f2d4ccb96e25e9879.png"
import imgSansTitre31 from "../imports/LandingPage/c0ef98efbe3a53b1c514867312bfe556daeee299.png"
import imgSansTitre41 from "../imports/LandingPage/4acfc3398810420b1081aaf16f096ff9fce2ce8e.png"

// However you travel property card illustrations
import imgVector from "../imports/LandingPage/01ade022b2a091cc0442f16aa66441911e8d50ab.png"
import imgVector1 from "../imports/LandingPage/bae54a3baf1ab54dbec1dbea15de2ad05e24e188.png"
import imgVector2 from "../imports/LandingPage/838c3031b8e7573cd5394d138e955a2bb8987e61.png"
import imgVector3 from "../imports/LandingPage/56842bbfec94ed3c25d5ca5fd206db928e6252b2.png"
import imgVector4 from "../imports/LandingPage/3a501f1b7749c569bfa27e2e699ccd6d338277aa.png"

// Start your journey CTA photos
import imgFrame2147225862 from "../imports/LandingPage/59f85f58472269ecaee1054be7ab29e1ae2a40f2.png"
import imgFrame2147225863 from "../imports/LandingPage/2d0b553cd14bb9d1bd9ccacf9fa9b2ea44f83704.png"

// App Download & Host Banner Assets
import imgAppPhonesMockup from "../assets/app-phones-mockup.png"
import imgVillaHostPool from "../assets/villa-host-pool.png"
import imgAppStoreBadge from "../assets/app-store-badge.png"
import imgGooglePlayBadge from "../assets/google-play-badge.png"
import imgFrame2147225864 from "../imports/LandingPage/7c981f5c1f4b4c161508dad3357efd47abb89a83.png"

// Popular destinations photos
import imgVillaPool from "../imports/LandingPage/2e243250df73f8665c2076148b1ef31fae40d3e8.png"
import imgVilla from "../imports/LandingPage/0f886971a3a9a3e0aae07664d3fa022422bbd5e5.png"
import imgVilla1 from "../imports/LandingPage/3afb3a23f8f234fe6648aedc9c993e87f4f635f0.png"
import imgVilla2 from "../imports/LandingPage/3b6678a3a40b0895ce6c57541bed8ca8a7c77b0b.png"
import imgApartment from "../imports/LandingPage/44d8d76932921ec0ecede914194b5032c48f5a99.png"
import imgChalet from "../imports/LandingPage/332a36deedec6a67624d545d8e00b43d92da2a21.png"
import imgChalet1 from "../imports/LandingPage/bd57e9739f361c90e73fb6a4b747f0696923d914.png"

// App CTA section
import imgSansTitre22 from "../imports/LandingPage/92ede83e8aa9b4eb9b0f4d26d061088bb54f6a96.png"
import img851771 from "../imports/LandingPage/ee90de231629edd0fd90de488d8a2ab342e0809f.png"
import imgIPhone17ProSilverMockupDuo1 from "../imports/LandingPage/19e6220155bea3ebe8fdd486592d567d1d63cf20.png"
import imgImage26 from "../imports/LandingPage/90b79c04d8a8e1e3f082a8c7817aaa0be14987b4.png"
import imgResidence3DStyle1 from "../imports/LandingPage/ec2789d611400a25173d812dfdc5d6656f384f5b.png"

// Guest house picks photos
import imgHotelCard5 from "../imports/LandingPage/d9819d39f430371124fadcd7257e9e1b768fdc1a.png"
import imgHotelCard6 from "../imports/LandingPage/b238a19d42fe20f37a4d2898024be6e4fb9c965d.png"
import imgHotelCard7 from "../imports/LandingPage/68c031d4d79add7e14a6b6bcf66753f4420c861f.png"
import imgFrame2087327311 from "../imports/LandingPage/55b7af8abc0f5989a53f034d57e166f0efe9bf5e.png"

// Newsletter
import img3DIconBluePaperAirplaneGoldenBellNotificationIsolated1 from "../imports/LandingPage/e795f303736879459f73b4a7e2242e04d06c51cf.png"

// News article photos
import imgFrame2087327312 from "../imports/LandingPage/1d2cfbf2ab681fb3acfb6fa7706cc3bf34168f29.png"
import imgBeachfrontBungalowDusk3 from "../imports/LandingPage/fcd742ce8a2299c432c288f166fba193cf03250a.png"

// Modern luxury villa
import imgModernLuxuryVillaWithPool1 from "../imports/LandingPage/2e243250df73f8665c2076148b1ef31fae40d3e8.png"

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



// ─── Helper: Section heading row ──────────────────────────────────────────────

function SectionHeading({
  title,
  subtitle,
  linkLabel,
  linkHref = "/search",
}: {
  title: string;
  subtitle: string;
  linkLabel?: string;
  linkHref?: string;
}) {
  return (
    <div className="flex gap-4 items-center justify-between relative shrink-0 w-full mb-2">
      <div className="flex flex-col gap-1 items-start justify-center min-w-0">
        <h2 className="font-['Bricolage_Grotesk',sans-serif] font-bold text-2xl sm:text-3xl tracking-tight text-[#1b1d22]">
          {title}
        </h2>
        <p className="font-['Inter_Tight:Regular',sans-serif] leading-[24px] text-[#475467] text-sm sm:text-base">
          {subtitle}
        </p>
      </div>
      {linkLabel && (
        <Link
          href={linkHref}
          className="h-[36px] shrink-0 flex items-center gap-2 text-[#667085] hover:text-[#1b1d22] font-semibold text-sm sm:text-base no-underline transition-colors"
        >
          <span className="whitespace-nowrap">{linkLabel}</span>
          <div className="flex items-center justify-center relative shrink-0">
            <div className="flex-none rotate-180">
              <div className="h-[18px] relative w-[17px]">
                <svg
                  className="absolute block inset-0 size-full"
                  fill="none"
                  height="18"
                  preserveAspectRatio="none"
                  viewBox="0 0 17 18"
                  width="17"
                >
                  <path d={svgPaths.p22420b00} fill="#667085" />
                </svg>
              </div>
            </div>
          </div>
        </Link>
      )}
    </div>
  );
}

// ─── 1. Category Section ──────────────────────────────────────────────────────

function CategoryPhoto({ src, alt }: { src: any; alt: string }) {
  return (
    <div className="relative shrink-0 size-[85px] sm:size-[95px] rounded-full overflow-hidden shadow-sm group-hover:shadow-lg ring-2 ring-transparent group-hover:ring-[#547fee]/30 transition-all duration-300">
      <img
        alt={alt}
        className="absolute inset-0 size-full object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
        src={toImgSrc(src)}
      />
    </div>
  )
}

function CategoryItem({ id, photo, label }: { id: string; photo: any; label: string }) {
  return (
    <Link
      href={`/search?category=${id}`}
      className="group flex flex-col gap-2 items-center shrink-0 cursor-pointer no-underline transition-transform duration-300 hover:-translate-y-1 select-none"
    >
      <CategoryPhoto src={photo} alt={label} />
      <p className="font-['Inter_Tight:Medium',sans-serif] font-medium text-xs sm:text-sm text-[#1b1d22] group-hover:text-[#3B68EC] text-center transition-colors duration-200">
        {label}
      </p>
    </Link>
  );
}

function CategorySection() {
  const categories = [
    { id: "seaside", photo: catPhoto2, label: "Seaside" },
    { id: "pool", photo: catPhoto3, label: "Swimming pool" },
    { id: "urban", photo: catPhoto4, label: "Urban stays" },
    { id: "nature", photo: catPhoto5, label: "Nature" },
    { id: "sahara", photo: catPhoto6, label: "Sahara" },
    { id: "historical", photo: catPhoto1, label: "Cultural" },
    { id: "family", photo: catPhoto7, label: "Family" },
    { id: "romantics", photo: catPhoto8, label: "Romantics" },
    { id: "historical", photo: catPhoto9, label: "Historical" },
  ];
  return (
    <section className="bg-[#f5f7fa] pt-1 sm:pt-2 lg:pt-3 pb-8 sm:pb-12 lg:pb-14 w-full">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-4 sm:gap-5">
        <div>
          <h2 className="font-['Bricolage_Grotesk',sans-serif] font-bold text-lg sm:text-xl md:text-2xl tracking-tight text-[#1b1d22]">
            Each category, an experience to be lived
          </h2>
          <p className="text-[#475467] text-xs sm:text-sm mt-0.5">
            Explore different types of stays and find the experience that matches your travel style.
          </p>
        </div>
        <div className="flex gap-4 sm:gap-6 lg:gap-0 items-center justify-between overflow-x-auto no-scrollbar [scrollbar-width:none] [&::-webkit-scrollbar]:hidden py-1 w-full">
          {categories.map((cat) => (
            <CategoryItem
              key={cat.label}
              id={cat.id}
              photo={cat.photo}
              label={cat.label}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── 2. Popular Right Now ─────────────────────────────────────────────────────

function WishlistHeartButton({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const [isLiked, setIsLiked] = useState(false);

  const containerSizes = {
    sm: "size-8",
    md: "size-9",
    lg: "size-10",
  };

  const iconSizes = {
    sm: 16,
    md: 18,
    lg: 20,
  };

  const particleOffsets = [
    { x: -13, y: -13 },
    { x: 13, y: -13 },
    { x: -13, y: 13 },
    { x: 13, y: 13 },
  ];

  return (
    <div className="relative group/heart shrink-0">
      <motion.button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          setIsLiked(!isLiked);
        }}
        whileTap={{ scale: 0.8 }}
        aria-label={isLiked ? "Remove from Wishlist" : "Save to Wishlist"}
        title={isLiked ? "Saved in Wishlist" : "Save to Wishlist"}
        className={`${containerSizes[size]} rounded-full border transition-all duration-300 shadow-md cursor-pointer flex items-center justify-center relative ${
          isLiked
            ? "bg-white border-transparent text-red-500 shadow-red-500/10"
            : "bg-white border-gray-100 text-[#475467] hover:scale-105 hover:bg-slate-50 hover:text-red-500"
        }`}
      >
        {/* Ring Pulse Expansion & Micro Sparkles */}
        <AnimatePresence>
          {isLiked && (
            <>
              <motion.span
                initial={{ scale: 0.3, opacity: 0.8 }}
                animate={{ scale: 2.3, opacity: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.48, ease: "easeOut" }}
                className="absolute inset-0 rounded-full bg-red-500/15 pointer-events-none"
              />

              {/* Burst Sparkle Particles */}
              {particleOffsets.map((pt, i) => (
                <motion.span
                  key={i}
                  initial={{ x: 0, y: 0, scale: 0, opacity: 1 }}
                  animate={{
                    x: pt.x,
                    y: pt.y,
                    scale: [0, 1.3, 0],
                    opacity: [1, 1, 0],
                  }}
                  transition={{ duration: 0.42, ease: "easeOut", delay: 0.02 }}
                  className="absolute size-1.5 rounded-full bg-red-400 shadow-xs pointer-events-none"
                />
              ))}
            </>
          )}
        </AnimatePresence>

        {/* Animated Heart Icon */}
        <motion.div
          animate={
            isLiked
              ? {
                  scale: [1, 0.72, 1.45, 0.88, 1.12, 1],
                  rotate: [0, -18, 18, -8, 4, 0],
                }
              : { scale: [1, 0.85, 1], rotate: 0 }
          }
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="flex items-center justify-center"
        >
          <HugeiconsIcon
            icon={FavouriteIcon}
            size={iconSizes[size]}
            className={`transition-all duration-300 ${
              isLiked
                ? "fill-red-500 text-transparent [&_path]:stroke-none drop-shadow-[0_2px_8px_rgba(239,68,68,0.5)]"
                : "text-[#475467] group-hover/heart:text-red-500"
            }`}
          />
        </motion.div>
      </motion.button>

      {/* Tooltip */}
      <div className="absolute top-[calc(100%+8px)] right-0 hidden group-hover/heart:flex items-center justify-center bg-[#101438] text-white text-[11px] font-bold px-2.5 py-1 rounded-lg whitespace-nowrap shadow-2xl z-50 pointer-events-none transition-all duration-200">
        <div className="absolute -top-1 right-3 border-x-4 border-x-transparent border-b-4 border-b-[#101438]" />
        {isLiked ? "Saved in Wishlist" : "Save to Wishlist"}
      </div>
    </div>
  );
}

function AmenityIconSquare({ children, label }: { children: React.ReactNode; label?: string }) {
  return (
    <div className="relative group/tooltip">
      <div 
        title={label}
        className="bg-white/95 backdrop-blur-md size-7 sm:size-8 rounded-[10px] p-1.5 text-[#181743] shadow-xs flex items-center justify-center border border-white/40 cursor-pointer"
      >
        {children}
      </div>
      {label && (
        <div className="absolute top-[calc(100%+8px)] left-1/2 -translate-x-1/2 hidden group-hover/tooltip:flex items-center justify-center bg-[#101438] text-white text-[11px] font-bold px-2.5 py-1 rounded-lg whitespace-nowrap shadow-2xl z-50 pointer-events-none transition-all duration-200">
          <div className="absolute -top-1 left-1/2 -translate-x-1/2 border-x-4 border-x-transparent border-b-4 border-b-[#101438]" />
          {label}
        </div>
      )}
    </div>
  );
}

function PropertyCard({
  id = "p1",
  photo,
  name,
  type,
  typeBg,
  location,
  rating,
  price,
  badge,
  beds,
  guests,
  amenityIconsCount = 3,
}: {
  id?: string;
  photo: any;
  name: string;
  type: string;
  typeBg: string;
  location: string;
  rating: string;
  price: string;
  badge?: string;
  beds: string;
  guests: string;
  amenityIconsCount?: number;
}) {
  return (
    <div className="flex flex-col shrink-0 w-[330px] sm:w-[380px] md:w-[410px] rounded-[24px] overflow-hidden shadow-xs hover:shadow-xl border border-gray-100 bg-white transition-all duration-300 hover:-translate-y-1.5 group/card">
      {/* Top Photo Area (opens in new tab) */}
      <Link
        href={`/property/${id}`}
        target="_blank"
        rel="noopener noreferrer"
        className="h-[210px] sm:h-[240px] relative w-full overflow-hidden bg-slate-900 block no-underline"
      >
        <img
          alt={name}
          className="absolute inset-0 size-full object-cover group-hover/card:scale-105 transition-transform duration-700 pointer-events-none"
          src={toImgSrc(photo)}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/30 pointer-events-none" />

        {/* Top Badges Row */}
        <div className="absolute left-3.5 top-3.5 right-3.5 z-10 flex items-center justify-between pointer-events-none">
          <div className="flex items-center gap-1.5 pointer-events-auto">
            {/* Property Type Pill */}
            <div
              className="px-3 py-1.5 rounded-[10px] shadow-xs text-white font-bold text-xs sm:text-sm tracking-wide"
              style={{ backgroundColor: typeBg }}
            >
              {type}
            </div>

            {/* Amenity Square Badges with Tooltips */}
            <AmenityIconSquare label="Guests & Capacity">
              <HugeiconsIcon icon={UserIcon} size={16} />
            </AmenityIconSquare>

            <AmenityIconSquare label="Swimming Pool">
              <HugeiconsIcon icon={SwimmingIcon} size={16} />
            </AmenityIconSquare>

            <AmenityIconSquare label="Seaside Access">
              <HugeiconsIcon icon={BeachIcon} size={16} />
            </AmenityIconSquare>

            {amenityIconsCount > 3 && (
              <AmenityIconSquare label="Family Friendly">
                <HugeiconsIcon icon={UserGroupIcon} size={16} />
              </AmenityIconSquare>
            )}
          </div>

          {/* Top Right Animated Heart Wishlist Button with Tooltip */}
          <div className="pointer-events-auto">
            <WishlistHeartButton />
          </div>
        </div>

        {/* Carousel Bottom Center Bar */}
        <div className="absolute bottom-3 inset-x-0 flex justify-center z-10 pointer-events-none">
          <div className="w-16 h-1.5 bg-white/40 backdrop-blur-xs rounded-full p-0.5 flex overflow-hidden">
            <div className="w-1/2 h-full bg-white rounded-full" />
          </div>
        </div>
      </Link>

      {/* Bottom Info Details Area */}
      <div className="bg-white p-5 sm:p-6 flex flex-col gap-3.5 w-full">
        {/* Title & Rating */}
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <Link
              href={`/property/${id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="no-underline block"
            >
              <h3 className="font-['Bricolage_Grotesk',sans-serif] font-bold text-xl sm:text-2xl text-[#181743] hover:text-[#3B68EC] transition-colors tracking-tight m-0 leading-snug truncate">
                {name}
              </h3>
            </Link>
            {/* Location */}
            <div className="flex items-center gap-1 text-slate-500 text-xs sm:text-sm font-medium mt-1">
              <HugeiconsIcon icon={Location01Icon} size={16} className="text-slate-400 shrink-0" />
              <span className="truncate">{location}</span>
            </div>
          </div>

          {/* Rating Pill */}
          <div className="bg-[#2563eb] text-white font-bold text-xs sm:text-sm px-2.5 py-1 rounded-xl shrink-0 shadow-2xs flex items-center gap-1">
            <HugeiconsIcon icon={StarIcon} size={13} className="text-amber-300 fill-amber-300" />
            <span>{rating}</span>
          </div>
        </div>

        {/* Feature Badges Row */}
        <div className="flex flex-wrap gap-1.5 text-xs text-[#475467]">
          <div className="bg-slate-100/90 text-slate-700 font-medium px-2.5 py-1 rounded-lg flex items-center gap-1.5">
            <HugeiconsIcon icon={House01Icon} size={14} className="text-slate-500 shrink-0" />
            <span>Logement entier</span>
          </div>

          <div className="bg-slate-100/90 text-slate-700 font-medium px-2.5 py-1 rounded-lg flex items-center gap-1.5">
            <HugeiconsIcon icon={BedDoubleIcon} size={14} className="text-slate-500 shrink-0" />
            <span>{beds}</span>
          </div>

          <div className="bg-slate-100/90 text-slate-700 font-medium px-2.5 py-1 rounded-lg flex items-center gap-1.5">
            <HugeiconsIcon icon={UserGroupIcon} size={14} className="text-slate-500 shrink-0" />
            <span>{guests}</span>
          </div>
        </div>

        {/* Price & CTA Row - Badge on top, price on bottom */}
        <div className="flex items-center justify-between gap-3 pt-3 border-t border-slate-100 mt-1">
          <div className="flex flex-col gap-1 min-w-0">
            {badge && (
              <div>
                <span className="bg-[#10b981] text-white text-[10px] sm:text-[11px] font-bold px-2 py-0.5 rounded-md inline-block shadow-2xs">
                  {badge}
                </span>
              </div>
            )}

            <div className="flex items-baseline gap-1 shrink-0">
              <span className="text-[11px] sm:text-xs text-slate-400 font-medium">From</span>
              <span className="font-['Bricolage_Grotesk',sans-serif] font-bold text-xl sm:text-2xl text-[#181743]">
                {price}
              </span>
              <span className="text-[11px] sm:text-xs text-slate-500 font-medium">/night</span>
            </div>
          </div>

          <Link
            href={`/property/${id}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#3B68EC] hover:bg-[#254EDB] text-white font-semibold text-xs sm:text-sm px-4 py-2.5 rounded-full border-none cursor-pointer transition-all shadow-xs hover:shadow-md shrink-0 whitespace-nowrap no-underline inline-flex items-center justify-center"
          >
            Check availability
          </Link>
        </div>
      </div>
    </div>
  );
}

function PopularRightNow() {
  const cards = [
    {
      id: "p1",
      photo: imgHotelCard,
      name: "Dar Chick Yahia",
      type: "Maison d'hôte",
      typeBg: "#6927da",
      location: "Route de Chick Yahia Djerba",
      rating: "4.8",
      price: "185 TND",
      badge: "30% off",
      beds: "4 beds",
      guests: "Max 8 persons",
      amenityIconsCount: 3,
    },
    {
      id: "p2",
      photo: imgHotelCard1,
      name: "Maison Dedine",
      type: "Gîte",
      typeBg: "#6172f3",
      location: "Route de Chick Yahia Djerba",
      rating: "4.8",
      price: "255 TND",
      badge: "30% off",
      beds: "4 beds",
      guests: "Max 8 persons",
      amenityIconsCount: 3,
    },
    {
      id: "p3",
      photo: imgHotelCard2,
      name: "Villa Humbra S+4",
      type: "Villa",
      typeBg: "#875bf7",
      location: "Hammamet, Nabeul",
      rating: "4.8",
      price: "582 TND",
      badge: "30% off",
      beds: "4 beds",
      guests: "Max 8 persons",
      amenityIconsCount: 4,
    },
  ];

  return (
    <section className="bg-white py-12 sm:py-16 w-full overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-8">
        <SectionHeading
          title="Popular right now"
          subtitle="The most loved stays by our guests this season."
          linkLabel="All stays"
          linkHref="/search"
        />
        <div className="flex gap-5 sm:gap-6 items-start w-full overflow-x-auto no-scrollbar [scrollbar-width:none] [&::-webkit-scrollbar]:hidden py-2 pb-4">
          {cards.map((card) => (
            <PropertyCard key={card.name} {...card} />
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── 3. Why Darbook ───────────────────────────────────────────────────────────

function FeatureCard({
  title,
  body,
  img,
}: {
  title: string
  body: string
  img: any
}) {
  return (
    <div className="bg-white p-6 sm:p-7 rounded-[24px] shadow-xs hover:shadow-xl transition-all duration-300 border border-[#E4ECFB] flex flex-col justify-between min-h-[230px] sm:min-h-[250px] relative overflow-hidden group hover:-translate-y-1">
      <div className="absolute bg-[#547fee]/5 h-[180px] w-[180px] right-[-40px] bottom-[-40px] rounded-full blur-[24px] pointer-events-none transition-opacity duration-300 group-hover:opacity-100" />
      <div className="flex flex-col gap-2.5 relative z-10">
        <h3 className="font-['Bricolage_Grotesk',sans-serif] font-bold text-xl text-[#181743] m-0">
          {title}
        </h3>
        <p className="font-['Inter_Tight:Regular',sans-serif] text-sm text-[#556080] leading-relaxed m-0">
          {body}
        </p>
      </div>
      <div className="flex justify-end pt-4 relative z-10">
        <img
          alt={title}
          aria-hidden
          className="h-[95px] sm:h-[115px] object-contain group-hover:scale-108 group-hover:-translate-y-1 transition-all duration-300 pointer-events-none drop-shadow-xs"
          src={toImgSrc(img)}
        />
      </div>
    </div>
  )
}

function WhyDarbook() {
  const features = [
    {
      title: "Easy Booking",
      body: "Search, choose, and book your stay in just a few steps. The process is simple, fast, and clear.",
      img: imgSansTitre21,
    },
    {
      title: "Carefully Selected Stays",
      body: "We choose each property with care. Enjoy unique guesthouses and special places that offer real local hospitality.",
      img: imgSansTitre11,
    },
    {
      title: "Safe & Clear Payments",
      body: "Your payment is secure and transparent. No hidden fees. No surprises.",
      img: imgSansTitre31,
    },
    {
      title: "Friendly Support",
      body: "Need help? We're here for you. Before, during, and after your stay.",
      img: imgSansTitre41,
    },
  ]
  return (
    <section className="bg-[#f5f7fa] py-12 sm:py-16 w-full border-b border-gray-200/50">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-8">
        <div>
          <h2 className="font-['Bricolage_Grotesk',sans-serif] font-bold text-2xl sm:text-3xl tracking-tight text-[#181743]">
            Why Darbook
          </h2>
          <p className="text-[#556080] text-sm sm:text-base mt-1.5 font-['Inter_Tight:Regular',sans-serif]">
            Everything you need for a smooth, secure, and memorable stay.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 w-full">
          {features.map((f) => (
            <FeatureCard key={f.title} {...f} />
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── 4. However You Travel ────────────────────────────────────────────────────

function PropertyTypeCard({
  id,
  bg,
  label,
  count,
  img,
  viewBox,
  pathD,
  width,
  height,
}: {
  id: string;
  bg: string;
  label: string;
  count: string;
  img: any;
  viewBox: string;
  pathD: string;
  width: number;
  height: number;
}) {
  const pathRef = useRef<SVGPathElement>(null);
  const progressObj = useRef({ progress: 0 });
  const interpolatorRef = useRef<((t: number) => string) | null>(null);

  // Rectangle path for full card fill on hover
  const rectPath = `M -10 -10 L ${width + 10} -10 L ${width + 10} ${height + 10} L -10 ${height + 10} Z`;

  useEffect(() => {
    try {
      interpolatorRef.current = interpolate(pathD, rectPath, { maxSegmentLength: 2 });
    } catch (e) {
      console.warn("Flubber morph setup:", e);
    }
  }, [pathD, rectPath]);

  const handleMouseEnter = () => {
    if (!interpolatorRef.current || !pathRef.current) return;
    gsap.to(progressObj.current, {
      progress: 1,
      duration: 0.6,
      ease: "power2.out",
      onUpdate: () => {
        if (pathRef.current && interpolatorRef.current) {
          pathRef.current.setAttribute("d", interpolatorRef.current(progressObj.current.progress));
        }
      },
    });
  };

  const handleMouseLeave = () => {
    if (!interpolatorRef.current || !pathRef.current) return;
    gsap.to(progressObj.current, {
      progress: 0,
      duration: 0.6,
      ease: "power2.inOut",
      onUpdate: () => {
        if (pathRef.current && interpolatorRef.current) {
          pathRef.current.setAttribute("d", interpolatorRef.current(progressObj.current.progress));
        }
      },
    });
  };

  const patternId = `pattern-${id}`;

  return (
    <a
      href="#"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="w-[230px] sm:w-[250px] lg:w-full h-[290px] sm:h-[320px] overflow-hidden relative rounded-[24px] block no-underline shrink-0 snap-start lg:shrink-0 group transition-all duration-300 hover:-translate-y-1.5 shadow-sm hover:shadow-xl"
      style={{ backgroundColor: bg }}
    >
      {/* Center SVG Organic Blob Shape filled with Photo */}
      <div className="absolute inset-0 flex items-center justify-center p-4 pt-6 pb-12 z-0">
        <svg
          viewBox={viewBox}
          className="w-[185px] h-[175px] drop-shadow-xl pointer-events-none"
        >
          <defs>
            <pattern
              id={patternId}
              patternUnits="userSpaceOnUse"
              width={width}
              height={height}
            >
              <image
                href={toImgSrc(img)}
                x="0"
                y="0"
                width={width}
                height={height}
                preserveAspectRatio="xMidYMid slice"
              />
            </pattern>
          </defs>
          <path
            ref={pathRef}
            d={pathD}
            fill={`url(#${patternId})`}
          />
        </svg>
      </div>

      {/* Top Badge (Property Count) */}
      <div className="absolute left-4 top-4 z-20">
        <div className="bg-[#101438]/40 backdrop-blur-md px-3.5 py-1 rounded-full border border-white/20 shadow-sm">
          <span className="text-[12px] font-bold text-white tracking-wide whitespace-nowrap">
            {count}
          </span>
        </div>
      </div>

      {/* Base Gradient Overlay at Bottom */}
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/60 via-black/20 to-transparent z-10 pointer-events-none" />

      {/* Hover Deep Gradient Overlay */}
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/85 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 pointer-events-none" />

      {/* Prominent Property Type Label */}
      <div className="absolute left-4.5 bottom-4.5 z-20">
        <h3 className="font-['Bricolage_Grotesk',sans-serif] font-bold text-xl sm:text-2xl text-white tracking-tight drop-shadow-md m-0">
          {label}
        </h3>
      </div>
    </a>
  );
}

function HoweverYouTravel() {
  return (
    <section className="bg-white py-12 sm:py-16 w-full overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-8">
        <SectionHeading
          title="However you travel, we host it all"
          subtitle="Find the perfect stay that matches your travel style and needs."
          linkLabel="All stays"
        />
        <div className="flex lg:grid lg:grid-cols-5 gap-4 sm:gap-5 w-full overflow-x-auto lg:overflow-x-visible no-scrollbar [scrollbar-width:none] [&::-webkit-scrollbar]:hidden py-2 pb-4 scroll-smooth snap-x snap-mandatory">
          <PropertyTypeCard
            id="guesthouse"
            bg="#6927da"
            label="Guest House"
            count="169 properties"
            img={imgVillaPool}
            viewBox="0 0 161 159"
            width={161}
            height={159}
            pathD="M159.51 85.1073C167.64 125.83 142.833 166.084 76.7609 157.942C35.6188 152.873 -9.37663 122.766 1.7055 82.7494C14.1088 37.9778 34.4721 20.4146 73.1238 5.41665C133.851 -18.149 150.528 40.119 159.51 85.1073Z"
          />
          <PropertyTypeCard
            id="appartement"
            bg="#6172f3"
            label="Appartement"
            count="485 properties"
            img={imgApartment}
            viewBox="0 0 175 176"
            width={175}
            height={176}
            pathD="M155.136 19.939C155.135 43.5305 153.889 45.9545 171.161 78.0646C176.347 87.3872 176.452 99.165 170.414 108.862C168.121 112.547 165.164 115.569 161.796 117.871C135.505 136.616 134.832 138.665 123.238 162.153C122.862 162.932 122.441 163.695 121.975 164.446C115.927 174.16 104.18 178.173 93.7436 174.853C64.2337 166.141 62.1696 165.93 30.6157 172.508C24.4402 173.798 17.7764 172.804 11.9974 169.213C0.0754242 161.806 -3.57704 146.147 3.83967 134.239C4.15297 133.738 4.47956 133.253 4.82079 132.78C4.8454 132.746 4.87068 132.711 4.89529 132.677C4.91392 132.653 4.93123 132.626 4.94986 132.601C28.8649 99.5312 29.7496 97.0128 35.0171 57.5317C35.4202 53.9714 36.6009 50.4444 38.6217 47.1997C42.4139 41.1078 48.4098 37.224 54.9385 35.9316L54.9372 35.9302C95.8562 27.8309 97.4413 25.498 122.632 4.76766C128.973 -0.700311 138.375 -1.6864 145.862 2.9656C151.933 6.73849 155.231 13.2809 155.136 19.939Z"
          />
          <PropertyTypeCard
            id="villa"
            bg="#875bf7"
            label="Villa"
            count="1558 properties"
            img={imgVilla}
            viewBox="0 0 176 150"
            width={176}
            height={150}
            pathD="M176 62.4362C176 110.796 136.602 150 87.9987 150C39.3953 150 0 110.796 0 62.4362C0 14.0769 49.1392 44.5479 88.0013 15.5061C138.023 -21.8759 176 14.0762 176 62.4362Z"
          />
          <PropertyTypeCard
            id="gite"
            bg="#4e5ba6"
            label="Gîte"
            count="155 properties"
            img={imgHotelCard2}
            viewBox="0 0 204 166"
            width={204}
            height={166}
            pathD="M6.18169 125.193C-0.50386 112.168 -1.50405 92.6175 1.91944 88.314C4.56335 84.991 7.84938 82.479 11.4646 80.8112C33.0698 70.3557 38.5198 65.601 41.8565 35.3654C42.4564 29.2071 44.7824 23.1422 48.9269 17.9356C59.017 5.25559 76.5037 1.87634 90.3929 9.05728C109.124 18.3601 115.4 19.1248 138.069 5.41375C150.48 -2.09261 173.199 -2.29433 187.301 7.98474C203.395 19.7159 208.747 47.0719 199.42 64.5137C188.113 85.6566 162.972 77.7665 147.265 100.707C133.135 121.345 147.188 136.923 135.283 151.659C112.219 180.208 25.8035 163.42 6.18169 125.193Z"
          />
          <PropertyTypeCard
            id="chalet"
            bg="#547fee"
            label="Chalet"
            count="185 properties"
            img={imgChalet1}
            viewBox="0 0 184 164"
            width={184}
            height={164}
            pathD="M68.0961 157.221C68.0916 157.223 68.0871 157.227 68.0827 157.23C68.056 157.247 68.0292 157.265 68.0032 157.283C49.6263 169.388 24.8446 164.725 12.1567 146.572C4.56335 135.716 18.3775 123.297 12.1789 99.7546C7.55069 82.1735 -2.33192 78.2156 0.502044 68.4645C4.23443 55.6206 22.5534 58.4538 28.1361 43.2776C31.78 33.3712 26.2489 25.9785 32.8891 15.8169C35.9343 11.1555 39.7952 8.75012 41.7734 7.36821C60.2387 -5.54705 85.6706 -1.04297 98.5781 17.4279C99.2678 18.4152 99.1749 18.4598 99.7755 19.2453C107.62 29.4381 121.829 21.2179 133.158 27.7716C146.582 35.5392 140.182 54.9261 154.988 61.7465C158.172 63.2131 162.639 64.2246 168.25 68.5912C171.395 71.0386 174.232 73.9934 176.636 77.4326C189.546 95.9035 185.041 121.345 166.578 134.26C157.873 140.349 147.62 142.563 137.862 141.272V141.274C102.375 136.58 97.952 137.581 68.0961 157.221Z"
          />
        </div>
      </div>
    </section>
  );
}

// ─── 5. Start Your Journey CTA ────────────────────────────────────────────────

function ShufflingCards() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const cards = [
    { id: 0, img: imgFrame2147225862, title: "Luxury Sea Villa" },
    { id: 1, img: imgFrame2147225863, title: "Sidi Bou Said Stay" },
    { id: 2, img: imgFrame2147225864, title: "Modern Sunset House" },
  ];

  const orderRef = useRef([0, 1, 2]);
  const isAnimatingRef = useRef(false);

  useEffect(() => {
    const getLayoutConfig = () => {
      const w = typeof window !== "undefined" ? window.innerWidth : 1200;
      if (w < 640) {
        return {
          positions: [
            { x: 0, scale: 1, zIndex: 30, opacity: 1, rotate: 0 },
            { x: 48, scale: 0.93, zIndex: 20, opacity: 0.92, rotate: 4 },
            { x: 96, scale: 0.86, zIndex: 10, opacity: 0.82, rotate: 8 },
          ],
          slideOutX: -90,
        };
      } else if (w < 1024) {
        return {
          positions: [
            { x: 0, scale: 1, zIndex: 30, opacity: 1, rotate: 0 },
            { x: 65, scale: 0.93, zIndex: 20, opacity: 0.92, rotate: 4 },
            { x: 130, scale: 0.86, zIndex: 10, opacity: 0.82, rotate: 8 },
          ],
          slideOutX: -120,
        };
      } else {
        return {
          positions: [
            { x: 0, scale: 1, zIndex: 30, opacity: 1, rotate: 0 },
            { x: 85, scale: 0.92, zIndex: 20, opacity: 0.92, rotate: 5 },
            { x: 170, scale: 0.84, zIndex: 10, opacity: 0.8, rotate: 10 },
          ],
          slideOutX: -150,
        };
      }
    };

    const applyPositions = (order: number[], animate = true) => {
      const { positions } = getLayoutConfig();
      order.forEach((cardIndex, stackPos) => {
        const el = cardRefs.current[cardIndex];
        if (!el) return;
        const target = positions[stackPos];

        if (animate) {
          gsap.to(el, {
            x: target.x,
            scale: target.scale,
            zIndex: target.zIndex,
            opacity: target.opacity,
            rotate: target.rotate,
            duration: 0.65,
            ease: "power2.out",
          });
        } else {
          gsap.set(el, {
            x: target.x,
            scale: target.scale,
            zIndex: target.zIndex,
            opacity: target.opacity,
            rotate: target.rotate,
          });
        }
      });
    };

    applyPositions(orderRef.current, false);

    const shuffleNext = () => {
      if (isAnimatingRef.current) return;
      isAnimatingRef.current = true;

      const currentOrder = [...orderRef.current];
      const frontCardIndex = currentOrder[0];
      const frontEl = cardRefs.current[frontCardIndex];

      if (!frontEl) {
        isAnimatingRef.current = false;
        return;
      }

      const { slideOutX } = getLayoutConfig();

      // Step 1: Front card slides out smoothly to the left
      gsap.to(frontEl, {
        x: slideOutX,
        rotate: -10,
        scale: 1.04,
        duration: 0.45,
        ease: "power2.in",
        onComplete: () => {
          const newOrder = [currentOrder[1], currentOrder[2], currentOrder[0]];
          orderRef.current = newOrder;

          gsap.set(frontEl, { zIndex: 10 });
          applyPositions(newOrder, true);

          setTimeout(() => {
            isAnimatingRef.current = false;
          }, 650);
        },
      });
    };

    const interval = setInterval(shuffleNext, 2800);

    const handleResize = () => {
      applyPositions(orderRef.current, false);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      clearInterval(interval);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="flex relative w-[260px] sm:w-[340px] lg:w-[440px] h-[215px] sm:h-[260px] lg:h-[330px] shrink-0 items-center justify-start mx-auto lg:mx-0 mt-6 lg:mt-0"
    >
      {cards.map((card, idx) => (
        <div
          key={card.id}
          ref={(el) => {
            cardRefs.current[idx] = el;
          }}
          className="absolute left-0 top-1 h-[200px] sm:h-[245px] lg:h-[305px] w-[140px] sm:w-[175px] lg:w-[215px] rounded-[20px] sm:rounded-[24px] lg:rounded-[28px] overflow-hidden shadow-xl sm:shadow-2xl bg-slate-900 select-none group cursor-pointer transition-shadow duration-300 hover:shadow-[#547fee]/40"
        >
          <img
            alt={card.title}
            className="size-full object-cover group-hover:scale-108 transition-transform duration-700 pointer-events-none"
            src={toImgSrc(card.img)}
          />
        </div>
      ))}
    </div>
  );
}

function GetStartedCTA() {
  return (
    <section className="bg-white py-10 sm:py-14 lg:py-16 w-full">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className="rounded-[24px] sm:rounded-[32px] p-6 sm:p-10 lg:p-12 relative overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-6 sm:gap-8 min-h-[340px] sm:min-h-[360px] shadow-sm"
          style={{
            backgroundImage:
              "linear-gradient(135deg, rgb(168, 191, 250) 0%, rgb(246, 249, 254) 100%)",
          }}
        >
          {/* Text + CTA */}
          <div className="flex flex-col gap-4 sm:gap-5 items-start max-w-xl relative z-10 w-full">
            <div className="flex flex-col gap-2">
              <h2 className="font-['Bricolage_Grotesk',sans-serif] font-bold text-2xl sm:text-3xl lg:text-4xl text-[#181743] leading-tight m-0">
                Start Your Journey with Darbook
              </h2>
              <p className="font-['Inter_Tight:Regular',sans-serif] text-sm sm:text-base text-[#556080] leading-relaxed m-0">
                Create your account and discover authentic stays in just a few
                clicks. Your next escape is waiting.
              </p>
            </div>
            <button className="bg-[#547fee] hover:bg-[#436cd9] transition-all text-white font-semibold px-7 py-3.5 rounded-full border-none cursor-pointer text-sm sm:text-base shadow-md hover:shadow-lg hover:scale-102">
              Get Started
            </button>
          </div>

          {/* GSAP Smooth Looping Shuffling Cards */}
          <ShufflingCards />
        </div>
      </div>
    </section>
  );
}

// ─── 6. Popular Destinations ──────────────────────────────────────────────────

function DestinationCard({
  photo,
  name,
  count,
}: {
  photo: any;
  name: string;
  count: string;
}) {
  return (
    <Link
      href={`/search?query=${encodeURIComponent(name)}`}
      className="flex-1 min-w-[200px] sm:min-w-[220px] h-[260px] sm:h-[300px] rounded-[16px] overflow-hidden relative block no-underline shrink-0 group shadow-sm transition-transform duration-300 hover:-translate-y-1 select-none"
    >
      <img
        alt={name}
        className="absolute inset-0 size-full object-cover group-hover:scale-105 transition-transform duration-500"
        src={toImgSrc(photo)}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
      <div className="absolute left-3 top-3 z-10">
        <div className="bg-black/40 backdrop-blur-xs px-2.5 py-1 rounded-lg">
          <span className="text-xs font-semibold text-white whitespace-nowrap">
            {count}
          </span>
        </div>
      </div>
      <div className="absolute inset-x-0 bottom-0 p-4 z-10">
        <span className="font-['Bricolage_Grotesk',sans-serif] font-bold text-lg text-white">
          {name}
        </span>
      </div>
    </Link>
  );
}

function PopularDestinations() {
  const destinations = [
    { photo: imgVilla, name: "Hammamet", count: "80 properties" },
    { photo: imgVilla1, name: "Marsa", count: "250 properties" },
    { photo: imgVilla2, name: "Djerba", count: "120 properties" },
    { photo: imgApartment, name: "Sousse", count: "58 properties" },
    { photo: imgChalet, name: "Ghammarth", count: "96 properties" },
    { photo: imgChalet1, name: "Kélibia", count: "55 properties" },
  ]
  return (
    <section className="bg-white pt-8 pb-12 w-full overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-6">
        <SectionHeading
          title="Popular Destinations"
          subtitle="Find the most popular places to stay across Tunisia."
          linkLabel="All destinations"
        />
        <div className="flex gap-4 items-center w-full overflow-x-auto no-scrollbar [scrollbar-width:none] [&::-webkit-scrollbar]:hidden py-2">
          {destinations.map((d) => (
            <DestinationCard key={d.name} {...d} />
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── 7. App Download + List Property ──────────────────────────────────────────

function AppCTA() {
  return (
    <section className="bg-white py-10 sm:py-14 lg:py-16 w-full">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-6 w-full">
          
          {/* Card 1: App Download Panel */}
          <div className="bg-[#547FEE] text-white p-7 sm:p-9 lg:p-10 rounded-[20px] sm:rounded-[24px] h-[390px] sm:h-[410px] lg:h-[422px] relative overflow-hidden flex flex-col justify-between shadow-xs">
            {/* Background Radial Glow */}
            <div className="absolute right-[-40px] top-[40px] w-[320px] h-[320px] rounded-full bg-[#D4DDF5]/25 blur-[70px] pointer-events-none" />

            {/* Left Content Area */}
            <div className="flex flex-col items-start relative z-10 max-w-[280px] sm:max-w-[320px] pt-1">
              <h3 className="font-['Bricolage_Grotesk',sans-serif] font-bold text-[22px] sm:text-[24px] lg:text-[26px] text-white leading-[30px] m-0 tracking-tight">
                Scan the QR code <br />
                and download our app.
              </h3>
              <p className="font-['Inter_Tight:Regular',sans-serif] text-[14px] sm:text-[15px] text-white/90 m-0 font-normal leading-[22px] mt-2.5 mb-7 sm:mb-8">
                Contact our Customer Service 24/7
              </p>

              {/* Official App Store & Google Play Badges */}
              <div className="flex flex-col gap-3 w-fit">
                <a
                  href="https://apps.apple.com"
                  target="_blank"
                  rel="noreferrer"
                  className="block transition-transform hover:scale-102 active:scale-98"
                >
                  <img
                    src={toImgSrc(imgAppStoreBadge)}
                    alt="Download on the App Store"
                    className="h-[42px] sm:h-[44px] w-auto object-contain rounded-[6px]"
                  />
                </a>

                <a
                  href="https://play.google.com"
                  target="_blank"
                  rel="noreferrer"
                  className="block transition-transform hover:scale-102 active:scale-98"
                >
                  <img
                    src={toImgSrc(imgGooglePlayBadge)}
                    alt="Get it on Google Play"
                    className="h-[42px] sm:h-[44px] w-auto object-contain rounded-[6px]"
                  />
                </a>
              </div>
            </div>

            {/* Right Graphic: 2 iPhones + Glass Cloud Mockup */}
            <div className="absolute right-[-15px] sm:right-[-5px] lg:right-[-5px] bottom-[-20px] sm:bottom-[-28px] lg:bottom-[-32px] w-[300px] sm:w-[350px] lg:w-[395px] pointer-events-none select-none z-0">
              <img
                src={toImgSrc(imgAppPhonesMockup)}
                alt="Darbook Mobile Application"
                className="w-full h-auto object-contain drop-shadow-xl"
              />
            </div>
          </div>

          {/* Card 2: List Your Property Panel */}
          <div
            className="text-[#181743] p-7 sm:p-9 lg:p-10 rounded-[20px] sm:rounded-[24px] h-[390px] sm:h-[410px] lg:h-[422px] relative overflow-hidden flex flex-col justify-between shadow-xs border border-blue-100/50"
            style={{
              backgroundImage:
                "linear-gradient(219.74deg, rgb(182, 204, 252) 0%, rgb(215, 230, 255) 45%, rgb(246, 249, 255) 100%)",
            }}
          >
            {/* Top Text & CTA Content */}
            <div className="flex flex-col items-start relative z-10 max-w-[300px] sm:max-w-[340px] pt-1">
              <h3 className="font-['Bricolage_Grotesk',sans-serif] font-bold text-[22px] sm:text-[24px] lg:text-[26px] text-[#181743] leading-[30px] m-0 tracking-tight">
                List Your Property
              </h3>
              <p className="font-['Inter_Tight:Regular',sans-serif] text-[14px] sm:text-[15px] text-[#475467] leading-[22px] m-0 font-normal mt-2.5 mb-6">
                Reach more travelers and grow your bookings. <br className="hidden sm:inline" />
                Join a trusted platform designed to support local hosts.
              </p>
              <Link href="/list-your-property" className="no-underline inline-block">
                <button className="bg-[#547FEE] hover:bg-[#406CE3] transition-all text-white font-medium text-[14px] sm:text-[15px] px-[24px] py-[11px] rounded-full border-none cursor-pointer shadow-sm hover:shadow-md hover:scale-102">
                  List your property
                </button>
              </Link>
            </div>

            {/* Bottom Graphic: Full-Width Uncropped Host Villa Resort Pool */}
            <div className="absolute inset-x-0 bottom-0 w-full flex items-end justify-center pointer-events-none select-none z-0">
              <img
                src={toImgSrc(imgVillaHostPool)}
                alt="List Your Property Villa & Pool"
                className="w-full h-auto object-contain object-bottom max-h-[290px] sm:max-h-[310px] lg:max-h-[330px]"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

// ─── 8. Guest House Picks ─────────────────────────────────────────────────────

function GuestHouseCard({
  photo,
  name,
  location,
  rating,
  price,
  amenities,
}: {
  photo: any
  name: string
  location: string
  rating: string
  price: string
  amenities: string[]
}) {
  return (
    <div className="bg-white flex flex-col shrink-0 w-[280px] sm:w-[320px] rounded-[16px] shadow-sm hover:shadow-md transition-all overflow-hidden border border-gray-100">
      {/* Photo */}
      <div className="h-[180px] relative w-full overflow-hidden">
        <img
          alt={name}
          className="absolute inset-0 size-full object-cover"
          src={toImgSrc(photo)}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/30" />
        <div className="absolute right-2.5 top-2.5 z-10">
          <WishlistHeartButton size="sm" />
        </div>
      </div>

      {/* Info */}
      <div className="p-4 flex flex-col gap-3 flex-1 justify-between">
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center justify-between gap-2">
            <h3 className="font-['Bricolage_Grotesk',sans-serif] font-bold text-base text-[#0d1352] truncate m-0">
              {name}
            </h3>
            <span className="bg-[#2250da] text-white font-bold text-xs px-2 py-0.5 rounded-lg shrink-0">
              {rating}
            </span>
          </div>

          <div className="flex gap-1.5 items-center text-xs text-[#344054]">
            <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 16 16">
              <path d={svgPaths.p1d60ef00} stroke="#344054" strokeWidth="1.2" />
              <path d={svgPaths.p3d82780} stroke="#344054" strokeWidth="1.2" />
            </svg>
            <span className="font-medium truncate">{location}</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-1">
          {amenities.map((a) => (
            <span key={a} className="bg-[#f2f4f7] border border-[#eaecf0] px-2 py-0.5 rounded text-[11px] font-medium text-[#344054]">
              {a}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between gap-2 pt-2 border-t border-gray-100">
          <div className="flex items-baseline gap-1">
            <span className="text-xs text-gray-500">From</span>
            <span className="font-['Bricolage_Grotesk',sans-serif] font-bold text-base text-[#344054]">
              {price}
            </span>
            <span className="text-xs text-gray-500">/night</span>
          </div>
          <a
            href="#"
            className="bg-[#547fee] hover:bg-[#436cd9] text-white text-xs font-semibold px-3 py-1.5 rounded-full no-underline transition-colors whitespace-nowrap"
          >
            Details
          </a>
        </div>
      </div>
    </div>
  )
}

function GuestHousePicks() {
  const cards = [
    {
      photo: imgHotelCard5,
      name: "Dar el jenna",
      location: "Bir Bou Rekba, Tunisia",
      rating: "4.9",
      price: "366 TND",
      amenities: ["Family", "Swimming", "Seaside"],
    },
    {
      photo: imgFrame2087327311,
      name: "Villa Ubud Hammamet",
      location: "Al Ḩaddādah, Tunisia",
      rating: "4.8",
      price: "522 TND",
      amenities: ["Family", "Swimming", "Seaside"],
    },
    {
      photo: imgHotelCard6,
      name: "Diar Abou Habibi",
      location: "Al Ḩaddādah, Tunisia",
      rating: "4.7",
      price: "310 TND",
      amenities: ["Family", "Seaside"],
    },
    {
      photo: imgHotelCard7,
      name: "Dar Chich Yahia",
      location: "Djerba, Tunisia",
      rating: "4.8",
      price: "185 TND",
      amenities: ["Family", "Swimming"],
    },
  ]
  return (
    <section className="bg-white pt-8 pb-12 w-full overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white py-6 rounded-[16px] shadow-xs flex flex-col gap-6 w-full">
          <SectionHeading
            title="Guest house picks just for you"
            subtitle="Hand-selected guesthouses offering authentic local experiences."
            linkLabel="All experiences"
          />
          <div className="flex gap-4 sm:gap-6 items-start w-full overflow-x-auto no-scrollbar [scrollbar-width:none] [&::-webkit-scrollbar]:hidden py-2 pb-4">
            {cards.map((card) => (
              <GuestHouseCard key={card.name} {...card} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── 9. Newsletter ────────────────────────────────────────────────────────────

function Newsletter() {
  return (
    <section className="bg-white py-12 sm:py-16 w-full">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#212b57] text-white rounded-[20px] p-6 sm:p-10 lg:p-12 relative overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-6 shadow-md">
          
          <div className="flex flex-col gap-4 max-w-xl w-full relative z-10">
            <h3 className="font-['Bricolage_Grotesk',sans-serif] font-bold text-xl sm:text-2xl text-white m-0">
              Special Promotion – Limited Time Offer!
            </h3>
            
            <form
              className="flex flex-col sm:flex-row gap-2.5 w-full"
              onSubmit={(e) => e.preventDefault()}
            >
              <label htmlFor="promo-email" className="sr-only">
                Email address
              </label>
              <input
                id="promo-email"
                type="email"
                placeholder="Enter your email"
                className="flex-1 bg-white text-gray-900 px-4 py-3 rounded-xl border-none outline-none font-['Inter_Tight:Regular',sans-serif] text-sm"
              />
              <button
                type="submit"
                className="bg-[#547fee] hover:bg-[#436cd9] transition-colors text-white font-semibold px-6 py-3 rounded-xl border-none cursor-pointer text-sm whitespace-nowrap shadow-xs"
              >
                Subscribe
              </button>
            </form>

            <p className="text-xs text-white/70 m-0">
              I agree to the processing of personal data and marketing mailings.
            </p>
          </div>

          <div className="hidden lg:block relative w-[220px] h-[160px] shrink-0">
            <img
              alt=""
              aria-hidden
              className="size-full object-contain pointer-events-none"
              src={toImgSrc(img3DIconBluePaperAirplaneGoldenBellNotificationIsolated1)}
            />
          </div>

        </div>
      </div>
    </section>
  )
}

// ─── 10. Latest News ──────────────────────────────────────────────────────────

function ArticleCard({
  photo,
  date,
  title,
  bg,
}: {
  photo: any
  date: string
  title: string
  bg?: string
}) {
  return (
    <article className="flex-[1_0_0] overflow-clip relative rounded-[12px] shadow-[0px_1px_10px_0px_rgba(0,0,0,0.08)] bg-white">
      <a href="#" className="block no-underline">
        <div
          className={`h-[158px] rounded-tl-[12px] rounded-tr-[12px] ${bg || "bg-[#f2f8ff]"} relative overflow-hidden`}
        >
          <img
            alt=""
            aria-hidden
            className="absolute inset-0 size-full object-cover"
            src={toImgSrc(photo)}
          />
        </div>
        <div className="p-[16px] content-stretch flex flex-col gap-[8px]">
          <p className="font-['Inter_Tight:Regular',sans-serif] leading-[20px] text-[#475467] text-[14px]">
            {date}
          </p>
          <h3 className="[word-break:break-word] font-['Bricolage_Grotesk',sans-serif] font-semibold leading-[26px] not-italic text-[#1d2939] text-[20px] m-0">
            {title}
          </h3>
        </div>
      </a>
    </article>
  )
}

function LatestNews() {
  return (
    <section className="bg-white pt-8 pb-12 w-full">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white drop-shadow-sm p-6 sm:p-8 rounded-[16px] w-full flex flex-col gap-6">
          <SectionHeading
            title="Latest News"
            subtitle="Read our latest articles about travel, unique stays, and tourism in Tunisia."
            linkLabel="All news"
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
            <ArticleCard
              photo={imgBeachfrontBungalowDusk3}
              date="05/05/2025"
              title={"Top Guesthouses in Tunisia\nYou Need to Visit"}
            />
            <ArticleCard
              photo={imgFrame2087327312}
              date="12/08/2025"
              title={
                "Traveling to Tunisia: Practical Tips,\nUnique Stays, and Authentic..."
              }
            />
            <ArticleCard
              photo={imgHotelCard6}
              date="02/02/2026"
              title={"Why Hospitality Is No Longer Just\nAbout Accommodation"}
            />
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── 11. Footer ───────────────────────────────────────────────────────────────

function SocialIcon({
  label,
  children,
}: {
  label: string
  children: React.ReactNode
}) {
  return (
    <a
      href="#"
      aria-label={label}
      className="overflow-clip relative rounded-[400px] size-[32px] bg-white flex items-center justify-center no-underline"
    >
      {children}
    </a>
  )
}

function Footer() {
  return (
    <footer className="w-full bg-[#101438] text-white pt-14 sm:pt-18 pb-10 px-4 sm:px-6 lg:px-8 relative rounded-b-[28px] sm:rounded-b-[40px] overflow-hidden">
      <div className="max-w-[1280px] mx-auto">
        
        {/* Main Grid Content (5 Columns) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10">
          
          {/* Col 1: Brand / Logo / Bio / CTA */}
          <div className="lg:col-span-4 flex flex-col gap-4 items-start pr-0 lg:pr-4">
            <a href="/" aria-label="Darbook home" className="no-underline block h-[40px] w-[200px]">
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
            </a>
            <p className="font-['Inter_Tight:Regular',sans-serif] text-xs sm:text-sm leading-relaxed text-slate-300 max-w-xs m-0">
              Darbook is a platform for renting holiday homes in Tunisia. Book in just a few clicks and enjoy an unforgettable stay.
            </p>
            <Link href="/list-your-property" className="no-underline mt-2">
              <button className="bg-[#547fee] hover:bg-[#436cd9] transition-all text-white font-semibold text-xs sm:text-sm px-6 py-2.5 rounded-full border-none cursor-pointer shadow-md hover:shadow-lg hover:scale-102">
                List your property
              </button>
            </Link>
          </div>

          {/* Col 2: Company */}
          <div className="lg:col-span-2 flex flex-col gap-3">
            <h4 className="font-['Bricolage_Grotesk',sans-serif] font-bold text-sm sm:text-base text-white tracking-wide m-0">
              Company
            </h4>
            <ul className="list-none m-0 p-0 flex flex-col gap-2 text-xs sm:text-sm text-slate-300">
              {[
                "About us",
                "Catalog",
                "Terms & Conditions",
                "Cancelation Policy",
                "Privacy Policy",
                "FAQ",
                "Contact us",
              ].map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-slate-300 hover:text-white transition-colors no-underline font-normal"
                  >
                    {link}
                  </a>
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
                  <a
                    href="#"
                    className="text-slate-300 hover:text-white transition-colors no-underline font-normal"
                  >
                    {link}
                  </a>
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
                    aria-label={item.label}
                    className="size-8 rounded-full bg-white text-[#101438] flex items-center justify-center hover:scale-110 transition-transform shadow-xs no-underline"
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
  );
}

// ─── 12. Floating Chat Buttons ────────────────────────────────────────────────

function FloatingButtons() {
  return (
    <div className="fixed content-stretch flex flex-col gap-[16px] items-start right-[20px] bottom-[80px] w-[54px] z-50">
      <a
        href="https://wa.me/"
        aria-label="Contact us on WhatsApp"
        className="h-[53px] overflow-clip relative shrink-0 w-full block no-underline rounded-full"
      >
        <svg
          className="absolute block inset-0 size-full"
          fill="none"
          height="53"
          viewBox="0 0 54 53"
          width="54"
        >
          <path d={svgPaths.p6411880} fill="#4CAF50" />
        </svg>
        <div className="absolute inset-[23.68%_23.67%_23.68%_23.69%]">
          <svg
            className="absolute block inset-0 size-full"
            fill="none"
            height="27.8947"
            viewBox="0 0 28.4246 27.8947"
            width="28.4246"
          >
            <path d={svgPaths.pe87b240} fill="white" />
          </svg>
        </div>
      </a>
      <a
        href="https://t.me/"
        aria-label="Contact us on Telegram"
        className="relative shrink-0 size-[53px] block no-underline rounded-full"
      >
        <svg
          className="absolute block inset-0 size-full"
          fill="none"
          height="53"
          viewBox="0 0 53 53"
          width="53"
        >
          <g clipPath="url(#clip-telegram-landing)">
            <path d={svgPaths.p889600} fill="#039BE5" />
            <path d={svgPaths.p364d6b00} fill="white" />
          </g>
          <defs>
            <clipPath id="clip-telegram-landing">
              <rect fill="white" height="53" width="53" />
            </clipPath>
          </defs>
        </svg>
      </a>
    </div>
  )
}

// ─── Main Export ──────────────────────────────────────────────────────────────

export default function LandingContent() {
  return (
    <>
      <CategorySection />
      <PopularRightNow />
      <WhyDarbook />
      <HoweverYouTravel />
      <GetStartedCTA />
      <PopularDestinations />
      <AppCTA />
      <GuestHousePicks />
      <Newsletter />
      <LatestNews />
      <Footer />
      <FloatingButtons />
    </>
  )
}
