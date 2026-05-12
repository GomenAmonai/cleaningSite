#Cleaning Service Landing

Сайт-визитка клининговой компании в Москве.

## Стек

- Next.js 15 (App Router) + TypeScript
- Tailwind CSS 4
- Sanity (headless CMS)
- Vercel (хостинг)
- Cloudflare (DDoD, WAF, кэш)
- Resend (email с формы заявки)

## Цель

Акуртаная и грамтоная визитка

## Структура секций

1. Header (Логотип, навигация, телефон)
2. Hero (заголовок, подзаголовок, фото, СТА на форму)
3. Services (список услуг с иконками)
4. Pricing (диапозоны цен по услугам)
5. Advantages (почему мы)
6. Steps (как происходит заказ)
7. Reviews (заглушка)
8. Contact form + контакты
9. Footer

## Sanity 

1. Project ID - v4ls0ftn
2. Organization ID - o2GNJFowa


## Status (10 may 2026)

Done:
- Sanity Studio embedded at /studio
- Schemas: siteSettings, service
- Home page renders services from Sanity (server-side fetch)

Next:
- Hero section (заголовок, подзаголовок, CTA, фоновое фото) — schema or part of siteSettings
- Advantages schema (преимущества, как 5-я страница PDF референса)
- Stats schema (опционально)
- Image rendering through Sanity image URL builder
- Singleton fix for siteSettings (отложено)
- Header + Footer using siteSettings data

## v2 redesign (imcleaning.ru style, branch `v2-imcleaning-style`)

Work is split into blocks. All copy is placeholder until block 5 wires
Sanity — grep `TODO: final copy from client` for swap points.

### Block 1 — Foundation
- Removed all v1 components from `app/components/`.
- Palette via Tailwind 4 `@theme` in `app/globals.css`: `cyan` `#0891B2`,
  `cyan-light` `#ECFEFF`, `ink` `#1A1A1A`, white bg.
- Manrope (400/500/600/700, cyrillic+latin) via `next/font/google`,
  exposed as `--font-manrope`.
- `app/layout.tsx`: 1280px max-width centered container, `font-sans`,
  base `text-ink` on white.
- `components/layout/Header.tsx`: sticky, white, bottom border, logo /
  7-item centered nav / phone right, mobile hamburger.
- `components/layout/Footer.tsx`: 3 cols (Контакты / Услуги /
  Навигация) + copyright, `bg-ink` `text-white`.
- `public/placeholders/README.md`: image manifest with recommended sizes.

### Block 2 — Hero + About carousel
- `components/sections/Hero.tsx`: full-bleed, currently a `bg-ink`
  placeholder + `from-ink/70 to-ink/30` gradient overlay (TODO: swap
  for `next/image` of `/placeholders/hero.jpg` once asset exists).
  H1, subtitle, cyan CTA `Оставить заявку` linking `#contact`.
  `min-h-[500px] md:min-h-[600px]`.
- `components/sections/About.tsx` (`"use client"`): 4-slide embla
  carousel (`embla-carousel-react`), two-column desktop / stacked
  mobile, cyan accent line per slide, pill dots (cyan-active /
  ink/30-inactive), desktop prev/next round buttons. Section
  background `bg-cyan-light`. Image slots are coloured placeholder
  divs with TODO comments.

### Block 5 — Contact form + Sanity rewrite
- **Schemas rewritten.** Old `service` / `siteSettings` removed. New
  document types under `sanity/schemaTypes/`: `siteSettings` (singleton,
  one doc with id `siteSettings`), `service`, `aboutSlide`, `whyUsCard`,
  `faqItem`, `review`, `client`, `inquiry`.
- **Studio structure** (`sanity/structure.ts`): siteSettings pinned as
  singleton at top, content lists in the middle, `Заявки` group at the
  bottom with `Все / Новые / В работе / Закрытые` filters by
  `status`. Duplicate / delete / unpublish actions for singletons
  filtered out in `sanity.config.ts`.
- **Sanity lib** (`sanity/lib/`): `queries.ts` (one GROQ per type),
  `fetch.ts` (`sanityFetch<T>` with `next.revalidate: 60` ISR; returns
  `null` on failure so the page never crashes), `writeClient.ts`
  (server-only client using `SANITY_API_WRITE_TOKEN`, returns `null`
  if token missing), `types.ts` (TS types per schema).
- **Section wiring.** Every section accepts props and falls back to
  hardcoded TODO copy when Sanity returns null/empty. `app/page.tsx`
  is the single server component fetching all 7 queries in parallel
  and passing the data down.
  - Hero: `heroTitle`, `heroSubtitle`, `heroCtaLabel` from siteSettings.
  - About: `aboutTitle` + `aboutSlide` documents; renders Sanity image
    when present, falls back to coloured placeholder div otherwise.
  - Services: `servicesTitle` + `service` docs; `icon` string is mapped
    to a lucide component via `ICON_MAP` (10 supported names — list is
    duplicated in the schema's `options.list`).
  - WhyUs: `whyUsTitle` + `whyUsCard` docs.
  - Clients: empty state if no docs; otherwise a 2/3/4/5-col logo grid
    (`next/image` with `cdn.sanity.io` whitelisted in `next.config.ts`).
  - Reviews: empty state if no docs; otherwise white card grid with
    optional star rating and author/company.
  - FAQ: `faqTitle` + `faqItem` docs; markup unchanged from block 4.
  - Contact: phone / email / address / hours from siteSettings.
  - Header / Footer: `companyName`, `phone`, plus footer service list
    from `services` (first 6).
- **Contact form** (`components/sections/ContactForm.tsx`, client):
  `react-hook-form` + `zod` (`@hookform/resolvers`). Validates name,
  Russian phone, optional email, optional message, required consent
  checkbox. Submits via the `submitInquiry` server action. UI states:
  idle → submitting → success (success card with reset) / error
  (inline message with phone fallback).
- **Server action** (`app/actions/submit-inquiry.ts`): re-validates
  with the same zod schema (`lib/inquiry-schema.ts`, shared
  client/server), formats a Telegram HTML message, fires Telegram +
  Sanity writes via `Promise.allSettled` so neither blocks the other.
  Telegram delivery and Sanity write are both non-fatal: missing env
  vars / network errors are logged and the user still sees success.
  This avoids a misleading error when the primary channel is up.
- **Env** (`.env.example` committed): `NEXT_PUBLIC_SANITY_PROJECT_ID`,
  `NEXT_PUBLIC_SANITY_DATASET`, optional `_API_VERSION`,
  `SANITY_API_WRITE_TOKEN`, `TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_ID`.
  `.gitignore` updated with `!.env.example` exception.
- **Seed** (`scripts/seed-sanity.mjs`, plain Node ESM, no extra deps):
  pre-populates Sanity with the current placeholder copy. Idempotent —
  uses deterministic `_id`s (`seed.service.offices`, etc.) and
  `createOrReplace` inside a single transaction. Run via:

      npm run seed

  Requires `NEXT_PUBLIC_SANITY_PROJECT_ID` / `_DATASET` and a write
  token in `.env.local`. Uses Node's built-in `--env-file` (Node 20+).

Dependencies added: `react-hook-form`, `zod`, `@hookform/resolvers`.

### Block 4 — Clients + Reviews + FAQ + nav anchors
- `components/sections/Clients.tsx`: empty-state placeholder on white,
  dashed border container, lucide `Users` icon. Real logos arrive via
  Sanity in block 5.
- `components/sections/Reviews.tsx`: empty-state placeholder on
  `bg-cyan-light`, dashed border + `MessageSquareQuote` icon. Real
  reviews arrive via Sanity in block 5.
- `components/sections/FAQ.tsx`: native `<details>/<summary>`
  accordion, 6 hard-coded items, rotating cyan `+` button via
  `group-open:rotate-45`. No JS, no extra deps.
- `app/globals.css`: `html { scroll-behavior: smooth }` and
  `section[id] { scroll-margin-top: 80px }` so Header anchor links
  land below the sticky bar.
- `components/layout/Header.tsx`: only change is `Контакты` href —
  `#contacts` → `#contact` to match Hero CTA / future contact section.
  Other hrefs were already aligned with existing section IDs.

Section IDs in use: `hero`, `about`, `services`, `why-us`, `clients`,
`reviews`, `faq`. (Spec called for `home` / `why` — kept existing
`hero` / `why-us` IDs because Hero and WhyUs markup is frozen; Header
hrefs point at the real IDs.)

### Block 3 — Services + WhyUs
- `components/ui/SectionHeading.tsx`: shared heading (cyan accent line
  + title + optional subtitle), `tone="dark"` variant for use on
  dark backgrounds.
- `components/sections/Services.tsx`: 8-card grid (1 / 2 / 4 cols)
  on white. Icons from `lucide-react` (`Building2`, `Sparkles`,
  `HardHat`, `Wind`, `Sofa`, `Trash2`, `Snowflake`, `ShieldCheck`),
  cyan stroke 1.5, hover border becomes `border-cyan`.
- `components/sections/WhyUs.tsx`: 6-card grid (1 / 2 / 3 cols) on
  `bg-ink`. Large cyan numerals 01–06, white titles, `text-white/70`
  bodies, semi-transparent `bg-white/5` cards.

### Current page order
`Header → Hero → About → Services → WhyUs → Clients → Reviews → FAQ → Contact → Footer`.
All sections are wired to Sanity with hardcoded fallbacks for empty
dataset.

### Dependencies added during v2
- `embla-carousel-react` — About carousel
- `lucide-react` — section icons
- `react-hook-form`, `zod`, `@hookform/resolvers` — Contact form
