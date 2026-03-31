# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Titan Observatory is a **Next.js 16 (App Router)** website for a community radio telescope observatory. It features donation integration (Givebutter), newsletter signup (Brevo), real-time Discord presence, blog posts backed by PostgreSQL/Prisma, and accessibility controls (animation toggle, text size).

## Commands

```bash
npm run dev          # Start dev server (Turbopack enabled)
npm run build        # Production build
npm run start        # Start production server
npm run lint         # ESLint via Next.js
npm run prisma:studio # Open Prisma Studio for DB inspection
npx prisma migrate dev --name <name>  # Run DB migrations
```

No test framework is configured.

## Architecture

### Routing (App Router)

Pages live in `src/app/`. Key routes: `/`, `/about`, `/team`, `/donate`, `/blog`, `/faq`, `/telescope-overview`, `/site-overview`, `/system-architecture`, `/concept-dashboard`, `/project-updates`, `/thanks`.

API routes in `src/app/api/`:
- `GET /api/posts` — blog posts from Prisma/PostgreSQL
- `POST /api/brevo` — newsletter signup (honeypot field `company`, double-opt-in)
- `GET /api/discord-widget` — Discord guild stats (public widget + bot token fallback)
- `GET /api/givebutter-messages` — paginated donor messages (up to 3 pages, max 20)

### Custom Color System

All colors use CSS variables defined in `src/app/globals.css` under `:root` (dark theme default) and `[data-theme="sunrise"]`. Tailwind maps these via a `withOpacityValue` helper in `tailwind.config.js`. Always use `titan-*` color tokens (e.g., `bg-titan-bg`, `text-titan-text-primary`, `border-titan-border`). Semantic colors: `titan-red`, `titan-green`, `titan-blue`, `titan-yellow`, `titan-purple`, `titan-orange`, `titan-aqua`.

Component-level utility classes are defined in `globals.css` component layer: `.titan-card`, `.titan-surface`, `.titan-input`, `.titan-button`, `.titan-section`.

### Accessibility System

- **Animation toggle:** localStorage key `titan:animations-disabled`, custom event `titan-animations-toggle`, CSS class `.animations-disabled`. Managed via `src/lib/animations.ts`.
- **Text size toggle:** localStorage key `titan:text-size`, custom event `titan-text-size-toggle`, CSS class `.text-size-large` (112.5% base font). Managed via `src/lib/text-size.ts`.
- Floating controls rendered in root layout via `FloatingAccessibilityControls`.

### Server vs Client Components

- Root layout and data-fetching pages are Server Components (async)
- Interactive components (`"use client"`): forms, carousels, animation toggles, navbar, accessibility controls
- Framer Motion used for animations (respects the global animation toggle)

### Key Shared Utilities

- `src/lib/utils.ts` — `cn()` function (clsx + tailwind-merge) for safe class merging
- `src/lib/prisma.ts` — singleton Prisma client (dev logging enabled)
- `src/components/AnimatedSection.tsx` — wrapper for scroll-triggered section animations
- `src/components/ui/` — custom UI primitives (background-gradient, shooting-stars, stars-background, timeline, tracing-beam, concept-glow-panel, resizable-navbar)

### Path Alias

`@/*` maps to `./src/*` (configured in tsconfig.json).

## Environment Variables

```
DATABASE_URL=postgresql://...
DISCORD_GUILD_ID=
DISCORD_BOT_TOKEN=
GIVEBUTTER_API_KEY=
BREVO_API_KEY=
BREVO_LIST_ID=
BREVO_DOI_TEMPLATE_ID=
BREVO_DOI_REDIRECT_URL=https://yourdomain.org/thanks
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-...
```

## External Integrations

- **Givebutter:** Donation widget (custom element from CDN script) + REST API for donor messages
- **Brevo (Sendinblue):** Double-opt-in newsletter flow
- **Discord:** Public widget API with bot token fallback for member/presence counts
- **Google Analytics:** Route-based tracking via `src/components/GoogleAnalytics.tsx`

## Prisma Schema

Two models in `prisma/schema.prisma`: `User` (email, password) and `Post` (title, slug, content, author relation). PostgreSQL backend.
