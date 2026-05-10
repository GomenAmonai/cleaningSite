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
