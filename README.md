# cleaning-site

Лендинг для B2B-клининговой компании в Москве. Next.js 16 + Sanity v4 + Tailwind 4, задеплоен на Vercel.

**Прод:** https://cleaning-site-wine.vercel.app  
**Sanity Studio:** https://cleaning-site-wine.vercel.app/studio

---

## Стек

| Слой | Технология |
|---|---|
| Фреймворк | Next.js 16, App Router, React Server Components |
| CMS | Sanity v4, встроена в `/studio` |
| Стили | Tailwind CSS 4 (`@theme` в `globals.css`) |
| Шрифты | Manrope (sans), `next/font/google`, кириллица |
| Форма | react-hook-form + zod + @hookform/resolvers |
| Карусель | embla-carousel-react |
| Иконки | lucide-react |
| Rich text | @portabletext/react |
| Хостинг | Vercel (auto-deploy из `main`) |

---

## Локальный запуск

```bash
git clone git@github.com:GomenAmonai/cleaningSite.git
cd cleaningSite
npm install
cp .env.example .env.local   # заполни переменные
npm run dev
```

Сайт → http://localhost:3000  
Studio → http://localhost:3000/studio

### Переменные окружения

```env
# Sanity (обязательные)
NEXT_PUBLIC_SANITY_PROJECT_ID=v4ls0ftn
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2026-05-09

# Sanity write token — нужен для серверного чтения и seed
# Получить: sanity.io/manage → проект → API → Tokens → Add token (Editor)
SANITY_API_WRITE_TOKEN=

# Telegram — уведомления о заявках (опционально)
# TELEGRAM_BOT_TOKEN и TELEGRAM_CHAT_ID: если не заданы, заявка всё равно
# сохраняется в Sanity, просто без Telegram-уведомления
TELEGRAM_BOT_TOKEN=
TELEGRAM_CHAT_ID=
```

`.env.example` закоммичен в репо — содержит все ключи без значений.

### Seed (первоначальное заполнение Sanity)

```bash
npm run seed
```

Заполняет Sanity 25 документами: siteSettings + 8 услуг + 4 слайда + 6 карточек + 6 FAQ.  
Идемпотентен — использует фиксированные `_id`, повторный запуск перезаписывает без дублей.  
Требует `SANITY_API_WRITE_TOKEN` в `.env.local`.

---

## Структура проекта

```
app/
  actions/
    submit-inquiry.ts     # Server Action: валидация → Telegram + Sanity
  services/
    [slug]/page.tsx        # SSG-страница услуги
  studio/[[...tool]]/     # Sanity Studio
  globals.css             # дизайн-токены (@theme), scroll-behavior
  layout.tsx              # шрифты, ModalProvider, метаданные
  page.tsx                # главная: 7 параллельных Sanity-запросов

components/
  layout/
    Header.tsx            # sticky, 7 пунктов навигации, мобильный бургер
    Footer.tsx            # 3 колонки, Telegram/WhatsApp из siteSettings
  providers/
    ModalProvider.tsx     # React-контекст для нативного <dialog>
  sections/
    Hero.tsx              # full-bleed, CTA → openContactModal()
    About.tsx             # Embla-карусель "О компании"
    Services.tsx          # сетка 1/2/4, карточки → /services/[slug]
    WhyUs.tsx             # 6 карточек на тёмном фоне
    Clients.tsx           # логотипы клиентов (пусто до реальных данных)
    Reviews.tsx           # отзывы (пусто до реальных данных)
    FAQ.tsx               # нативный <details> аккордеон
    Contact.tsx           # телефон/email/адрес/часы + ContactForm
    ContactForm.tsx       # react-hook-form, Server Action submit
  ui/
    ContactButton.tsx     # "use client", открывает modal (для серверных стр.)
    ContactModal.tsx      # нативный <dialog>, backdrop-click → закрыть
    PortableTextRenderer.tsx  # обёртка @portabletext/react с Tailwind-стилями
    SectionHeading.tsx    # общий заголовок секции (линия + title + subtitle)

sanity/
  schemaTypes/
    siteSettings.ts       # синглтон: все тексты, контакты, заголовки секций
    service.ts            # услуга: slug, icon, description, pricing, features...
    aboutSlide.ts         # слайд карусели "О компании"
    whyUsCard.ts          # карточка "Почему мы"
    faqItem.ts            # вопрос/ответ
    review.ts             # отзыв
    client.ts             # логотип клиента
    inquiry.ts            # заявка с формы (status: new/contacted/converted/archived)
  lib/
    queries.ts            # GROQ-запросы
    fetch.ts              # sanityFetch<T> с ISR revalidate:60, токен для чтения
    types.ts              # TypeScript-типы под каждую схему
    writeClient.ts        # server-only клиент для записи (Server Action)
  structure.ts            # кастомная структура Studio

lib/
  inquiry-schema.ts       # zod-схема заявки (shared client+server)

scripts/
  seed-sanity.mjs         # seed-скрипт (Node ESM)
```

---

## Дизайн-система

Палитра через `@theme` в `globals.css`:

| Токен | Цвет | Использование |
|---|---|---|
| `--color-cyan` | `#0891B2` | акцент, кнопки, иконки, линии |
| `--color-cyan-light` | `#ECFEFF` | фон секций About / WhyUs sidebar / FAQ |
| `--color-ink` | `#1A1A1A` | основной текст, тёмный фон Hero/WhyUs |

Шрифт: **Manrope** (400/500/600/700, кириллица+латиница).

---

## Секции главной страницы

```
Header → Hero → About → Services → WhyUs → Clients → Reviews → FAQ → Contact → Footer
```

Каждая секция принимает пропсы из Sanity и имеет hardcoded-fallback —  
сайт не падает при пустой базе или отсутствии токена.

---

## Страницы услуг `/services/[slug]`

SSG через `generateStaticParams`. Структура каждой страницы:

1. **Hero** — тёмный, иконка + хлебные крошки + заголовок + описание
2. **Контент** — Portable Text (longDescription) + чеклист features
3. **Sticky sidebar** — цена, кнопка заявки (открывает modal), телефон
4. **Другие услуги** — сетка из 4 карточек

---

## Санity Studio

Доступна по `/studio`. Разделы:

- **Настройки сайта** — название, телефон, email, адрес, часы, тексты hero и заголовки всех секций
- **Услуги** — 8 документов, полностью редактируемые
- **Слайды «О компании»** — карусель
- **Карточки «Почему мы»**
- **FAQ**
- **Отзывы**
- **Клиенты** — логотипы
- **Заявки** — входящие из формы, фильтры: Новые / В работе / Закрытые

Все изменения публикуются кнопкой **Publish** и подтягиваются на сайт при следующем запросе (ISR revalidate: 60 сек).

---

## Контактная форма и заявки

Форма (`ContactForm.tsx`) валидирует: имя, телефон (RU формат), email (опц.), сообщение (опц.), чекбокс согласия.

При отправке (`submit-inquiry.ts` Server Action):
1. Повторная валидация на сервере (тот же zod)
2. Запись в Sanity (`inquiry` документ, статус `new`)
3. Уведомление в Telegram (если заданы `TELEGRAM_BOT_TOKEN` и `TELEGRAM_CHAT_ID`)

Оба канала через `Promise.allSettled` — ошибка одного не блокирует другой.

---

## Деплой

Push в `main` → Vercel автоматически собирает и деплоит.

Переменные окружения нужно добавить в Vercel Dashboard → Settings → Environment Variables:
- `NEXT_PUBLIC_SANITY_PROJECT_ID`
- `NEXT_PUBLIC_SANITY_DATASET`
- `SANITY_API_WRITE_TOKEN`
- `TELEGRAM_BOT_TOKEN` (опц.)
- `TELEGRAM_CHAT_ID` (опц.)

---

## TODO

- [ ] Реальные фото (hero, слайды О компании, услуги)
- [ ] Название компании и контакты мамы в Studio
- [ ] Логотип вместо текста в Header
- [ ] Отзывы реальных клиентов
- [ ] Логотипы клиентов
- [ ] Домен и DNS (Vercel → кастомный домен)
- [ ] SEO: og:image, sitemap.xml, robots.txt
- [ ] Яндекс.Метрика
- [ ] Реальные фото в услугах (heroImage в Studio)
