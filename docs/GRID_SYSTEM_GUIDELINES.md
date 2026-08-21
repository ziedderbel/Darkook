# Darbook Design & Grid System Guidelines

This document defines the authoritative layout, grid, spacing, typography, component geometry, and responsive behavior standards for the Darbook application. All existing pages and newly created components or pages **MUST** strictly adhere to these rules.

---

## 1. Page Container & Layout Architecture

### 1.1 Max-Width & Center Alignment
- **Primary Page Container**: `max-w-[1280px]` centered horizontally with `mx-auto`.
- **Secondary / Focused Section Container**: `max-w-7xl` (`1280px`) or `max-w-6xl` (`1152px`).
- **Inner Content Columns**: `max-w-3xl` (`768px`) or `max-w-2xl` (`672px`) for centered headings and readable text columns.

### 1.2 Horizontal Padding Rules (Margins Alignment)
All main sections (Navbar, Hero, Landing Content sections, Footer) **MUST** align their left and right margins perfectly across every viewport breakpoint:
- **Mobile (`< 640px`)**: `px-4` (`16px`)
- **Tablet (`sm: 640px` - `768px`)**: `sm:px-6` (`24px`)
- **Desktop (`lg: 1024px+`)**: `lg:px-8` (`32px`)

> **Rule**: Never mix ad-hoc inline horizontal padding (e.g. `px-2` on one section and `px-12` on another). All main sections must align using the `px-4 sm:px-6 lg:px-8 max-w-[1280px] mx-auto` blueprint.

---

## 2. Navigation Bar (Navbar) Layout Rules

- **Positioning**: Absolute or sticky top container overlaid with `top-[16px] sm:top-[24px]` and `z-30`.
- **Width**: `w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8`.
- **Height & Touch Targets**: Interactive pills and action buttons must have `h-[40px]` (`sm:h-[44px]`).
- **Desktop Actions**: Aligned on right with `flex items-center gap-3`.
- **Mobile Navigation**:
  - Hamburger trigger on `< lg: 1024px`.
  - Slide-over drawer: `w-[300px] sm:w-[340px] z-50 p-6`.

---

## 3. Hero Section & Viewport Height Guidelines

- **Background & Curve**: Linear gradient background (`#010117` to `#465e9c`) with a rounded bottom overlay curve (`rounded-tl-[24px] sm:rounded-tl-[32px] rounded-tr-[24px] sm:rounded-tr-[32px] bg-[#f5f7fa]`).
- **Minimum Heights**:
  - `min-h-[560px]` (Mobile)
  - `sm:min-h-[620px]` (Tablet)
  - `md:min-h-[660px]` (Desktop)
- **Vertical Padding**: `pt-24 sm:pt-32 pb-10 sm:pb-14`.
- **Title Layout**: Headline title **MUST** fit on **1 single line** on desktop displays (`lg:whitespace-nowrap max-w-full`).
- **Title to Search Engine Gap**: `mt-3 sm:mt-5` with container `gap-8 sm:gap-10 lg:gap-12`.

---

## 4. Responsive Grid & Column Standards

### 4.1 Grid Breakpoints
| Viewport Size | Breakpoint | Grid Columns | Common Layout |
| :--- | :--- | :--- | :--- |
| Mobile | `< 640px` | `grid-cols-1` | Single column vertical stack |
| Tablet | `sm: 640px` | `grid-cols-2` | 2 columns side-by-side |
| Desktop | `lg: 1024px` | `grid-cols-3` | 3 columns side-by-side |
| Large Desktop | `xl: 1280px` | `grid-cols-4` | 4 columns side-by-side |

### 4.2 Grid Gaps
- **Section Cards Grid**: `gap-6 sm:gap-8`.
- **Compact Item Grid**: `gap-3 sm:gap-4`.
- **Horizontal Scroll Containers** (e.g. Category Bar): `flex gap-4 sm:gap-6 overflow-x-auto no-scrollbar`.

---

## 5. Dropdowns & Modals: Mobile Bottom Sheet Rule

- **Desktop (`≥ 768px` / `md:`)**:
  - Floating popover dropdown anchored directly below the target field (`absolute top-[calc(100%+8px)] z-50 rounded-2xl shadow-2xl`).
- **Mobile (`< 768px` / `md:hidden`)**:
  - **MANDATORY**: Every dropdown popover **MUST** open inside a native **Mobile Bottom Sheet** modal.
  - Backdrop overlay: `fixed inset-0 bg-black/60 backdrop-blur-xs z-[190]`.
  - Sheet container: `fixed inset-x-0 bottom-0 z-[200] bg-white rounded-t-[28px] p-5 shadow-2xl max-h-[85vh] overflow-y-auto`.
  - Drag handle pill: `w-12 h-1.5 bg-gray-300 rounded-full mx-auto mb-3 md:hidden`.
  - Header: Includes title and close button (`size-8 rounded-full bg-gray-100 flex items-center justify-center`).

---

## 6. Component Geometry & Border Radius Tokens

| Component Type | Border Radius Token | Tailwind Class | Usage Context |
| :--- | :--- | :--- | :--- |
| Major Cards | `24px` / `28px` | `rounded-[24px]` / `rounded-[28px]` | Property Cards, Promo Banners |
| Card Badges | `10px` | `rounded-[10px]` | Property Type Pill Badges, Amenity Icon Squares |
| Outer Containers | `32px` | `rounded-[32px]` / `rounded-b-[40px]` | Hero Curve, Footer Bottom Corners |
| Action Buttons | Full / Pill | `rounded-full` | Primary CTAs, Icon Circular Buttons |
| Small Tags | `8px` | `rounded-lg` / `rounded-md` | Feature Badges, Discount Badges |

---

## 7. Tooltip Guidelines

- **Placement**: Positioned **below** icon elements (`top-[calc(100%+8px)]`) to avoid being clipped by parent `overflow-hidden` photo containers.
- **Styling**: Translucent dark navy badge (`bg-[#101438] text-white text-[11px] font-bold px-2.5 py-1 rounded-lg shadow-2xl`).
- **Pointer Caret**: Top-pointing triangle (`border-x-4 border-x-transparent border-b-4 border-b-[#101438] -top-1`).
- **Trigger**: Activated on hover using `group-hover/tooltip:flex`.

---

## 8. Typography & Font System

- **Primary Headline Font**: `'Bricolage_Grotesk', sans-serif`
  - Hero Headline: `font-bold text-3xl sm:text-4xl md:text-5xl lg:text-[44px] xl:text-[48px] tracking-tight`
  - Section Headings: `font-bold text-2xl sm:text-3xl text-[#181743] tracking-tight`
- **Body & Subtitle Font**: `'Inter_Tight', sans-serif`
  - Subtitle: `font-medium text-slate-500 text-sm sm:text-base`
  - Captions & Meta: `font-semibold text-xs text-slate-400`

---

## 9. Icon Library Standards

- **Standard Icon Set**: All UI icons **MUST** use `@hugeicons/react` with icons from `@hugeicons-pro/core-stroke-rounded`.
- **Raw SVGs**: Do NOT write custom raw `<svg>` code when a corresponding Hugeicons icon exists (`UserIcon`, `SwimmingIcon`, `BeachIcon`, `UserGroupIcon`, `Location01Icon`, `House01Icon`, `BedDoubleIcon`, `FavouriteIcon`, `StarIcon`).

---

## 10. Checklist for Creating / Updating Pages

1. [ ] Wrap main content inside `max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8`.
2. [ ] Verify left and right horizontal margins align perfectly with the Navbar and Footer.
3. [ ] Check responsive breakpoints (`grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4`).
4. [ ] Ensure all property type pills use `rounded-[10px]` soft rounded rects.
5. [ ] Ensure mobile dropdowns render inside a **Mobile Bottom Sheet** (`fixed inset-x-0 bottom-0 z-[200] rounded-t-[28px]`).
6. [ ] Verify tooltips are placed downwards (`top-[calc(100%+8px)]`) with a top caret.
7. [ ] Run `npm run typecheck` to confirm zero TypeScript errors.
