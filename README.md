# cleaning-site

Лендинг для B2B-клининговой компании. Next.js 16 + Sanity v4 + Tailwind 4.

## Стек

- **Next.js 16** (App Router, React Server Components)
- **Sanity v4** — headless CMS, встроена в Next через `/studio`
- **Tailwind 4** — стили через `@theme` и `@utility` в `globals.css`
- **TypeScript**
- **next/font** — Manrope (sans), Lora (serif), оба с поддержкой кириллицы

## Структура
app/
components/      # Hero, Header, WhyUs, Faq, Contact, Footer
studio/          # Sanity Studio (доступна по /studio)
globals.css      # дизайн-токены, утилиты
layout.tsx       # шрифты, метаданные
page.tsx         # главная — собирает все секции
sanity/
lib/             # клиент, image helper
schemaTypes/
siteSettings.ts  # синглтон со всеми текстами/настройками
service.ts       # услуги

## Дизайн-система

Палитра (в `globals.css` как CSS-переменные):

- `--background` `#FAFAF7` — основной фон (off-white)
- `--foreground` `#1A1A1A` — текст (графит)
- `--accent` `#1E2A3A` — акцент, CTA-кнопки (чернильный синий)
- `--gold` `#C9A961` — вторичный акцент (охра, цифры/детали)
- `--muted` `#6B6B6B` — приглушённый текст
- `--border` `#E8E6DE` — рамки
- `--surface` `#FFFFFF` — карточки, шапка

Шрифты:

- **Manrope** — основной текст, кнопки, навигация
- **Lora** — заголовки секций, цифры в WhyUs, телефон в контактах

Принцип: 75% фон + текст, 20% чернильный синий, 5% охра.

## Локальный запуск

```bash
npm install
npm run dev
```

Сайт — http://localhost:3000
Sanity Studio — http://localhost:3000/studio

## Переменные окружения

В `.env.local`:
NEXT_PUBLIC_SANITY_PROJECT_ID=<id из sanity.io/manage>
NEXT_PUBLIC_SANITY_DATASET=production

## Контент

Весь редактируемый контент — в Sanity Studio (`/studio`):

- **Настройки сайта** (синглтон): название компании, телефон, адрес, часы, мессенджеры, тексты Hero/WhyUs/FAQ
- **Услуги**: карточки с фото, заголовком, описанием, порядком сортировки

Изменения публикуются мгновенно — Next.js перевалидирует кэш на каждый запрос (RSC + fetch).

## Деплой

Проект задеплоен на Vercel. Push в `main` → автоматическая сборка.

## TODO

- [ ] Форма заявки (сейчас только звонок/мессенджеры)
- [ ] Логотип
- [ ] Реальные фото команды
- [ ] SEO: og:image, sitemap, robots.txt
- [ ] Аналитика (Я.Метрика)