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
`Header → Hero → About → Services → WhyUs → Footer`. Remaining
sections (Clients, Reviews, FAQ, Contact) come in later blocks.

### Dependencies added during v2
- `embla-carousel-react` — About carousel
- `lucide-react` — Services icons
