# Darbook Architecture & Technical Design

## Overview
Darbook is a modern Next.js 15 App Router web application designed for booking luxury villas, apartments, and guest houses.

## Tech Stack
- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS v4 (`@import "tailwindcss";`)
- **Internationalization**: `next-intl` (`/en`, `/fr`, `/ar`, `/ru`) with RTL support for Arabic
- **Theming**: `next-themes` (Dark & Light modes via OKLCH color tokens)
- **Motion**: `motion/react` (Framer Motion) animation floor
- **Icons**: `lucide-react`

## Directory Blueprint
- `app/` - Next.js App Router (internationalized routes under `[locale]`)
- `components/`
  - `layout/` - Header, Footer, Containers
  - `ui/` - Atomic UI components (Button, Card, Modals)
  - `theme/` - Theme Provider and Toggle
  - `motion/` - Motion Providers and Scroll Animations
  - `i18n/` - Language selector
  - `sections/` - Modular landing page sections
- `i18n/` - Routing & locale request configuration
- `lib/` - Shared utilities, site identity (`site.ts`), SEO JSON-LD helpers
- `messages/` - i18n JSON dictionaries
