# Cleaning Site

Production-style landing site for a Moscow B2B cleaning company. Built as a client-facing Next.js app with Sanity CMS for content operations.

**Live site:** https://cleaning-site-wine.vercel.app  
**CMS (Sanity Studio):** https://cleaning-site-wine.vercel.app/studio

## Why this project

This repository demonstrates a real marketing site workflow:
- fast, server-rendered landing experience with reusable sections
- content managed by non-developers in Sanity Studio
- validated lead form with server-side handling and persistence
- deployable to Vercel with CMS-driven updates

## Architecture (Next.js + Sanity)

- **Frontend:** Next.js 16 App Router + TypeScript + Tailwind CSS 4
- **CMS:** Sanity Studio embedded at `/studio`
- **Data loading:** server-side GROQ queries via `sanityFetch`, with ISR (`revalidate: 60`)
- **Content model:** `siteSettings` singleton + collections (`service`, `aboutSlide`, `whyUsCard`, `faqItem`, `review`, `client`, `inquiry`)
- **Routing:**
  - `/` landing page composed from CMS sections
  - `/services/[slug]` statically generated service detail pages
  - `/privacy` privacy policy page

## CMS publishing workflow

1. Open `/studio` and edit content types (site settings, services, FAQ, etc.).
2. Click **Publish** in Sanity Studio.
3. Site content updates via ISR (up to 60s cache window).
4. Optional webhook endpoint `/api/revalidate` can force revalidation when configured.

## Form submission and validation flow

Contact form (`components/sections/ContactForm.tsx`) uses:
- `react-hook-form` for client form state
- shared `zod` schema (`lib/inquiry-schema.ts`) for client + server validation

Server action (`app/actions/submit-inquiry.ts`) flow:
1. Re-validate payload with the same schema.
2. Normalize phone input.
3. Save inquiry to Sanity (`inquiry` document, status `new`) when write token is configured.
4. Send Telegram notification when Telegram env vars are configured.
5. Return success UX while logging delivery/write failures server-side (`Promise.allSettled`).

## Local setup

```bash
git clone https://github.com/GomenAmonai/cleaningSite.git
cd cleaningSite
npm install
cp .env.example .env.local
npm run dev
```

- App: http://localhost:3000
- Studio: http://localhost:3000/studio

### Available scripts

```bash
npm run dev      # local development
npm run build    # production build
npm run start    # run production build
npm run lint     # eslint
npm run seed     # seed Sanity content from scripts/seed-sanity.mjs
```

## Environment variables

Copy `.env.example` to `.env.local` and fill values.

| Variable | Required | Purpose |
|---|---|---|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Yes | Sanity project id (public) |
| `NEXT_PUBLIC_SANITY_DATASET` | Yes | Sanity dataset name (public) |
| `NEXT_PUBLIC_SANITY_API_VERSION` | No | API version override (defaults in `sanity/env.ts`) |
| `SANITY_API_WRITE_TOKEN` | Recommended | Server-side reads for private datasets, inquiry write, seed script |
| `TELEGRAM_BOT_TOKEN` | No | Telegram inquiry notifications |
| `TELEGRAM_CHAT_ID` | No | Target chat for Telegram notifications |
| `SANITY_WEBHOOK_SECRET` | No | Secret for `/api/revalidate` webhook protection |

> Never commit real token values. Keep secrets only in local or platform environment settings.

## Deployment

This project is deployed on Vercel.

Typical deployment steps:
1. Import repository into Vercel.
2. Add environment variables from the table above.
3. Deploy.
4. (Optional) Configure a Sanity webhook to call `/api/revalidate` with `x-sanity-webhook-secret`.

## Project structure

```text
app/
  actions/submit-inquiry.ts      # server action: validate + persist + notify
  api/revalidate/route.ts        # optional on-demand revalidation endpoint
  services/[slug]/page.tsx       # service detail pages (SSG)
  studio/[[...tool]]/page.tsx    # embedded Sanity Studio
  page.tsx                       # landing page composition from CMS data
components/
  layout/                        # header/footer
  sections/                      # landing sections, contact form
  ui/                            # shared UI primitives
lib/
  inquiry-schema.ts              # shared zod schema for inquiries
sanity/
  schemaTypes/                   # CMS schemas
  lib/                           # Sanity client, fetchers, GROQ queries, types
  structure.ts                   # Studio desk structure
scripts/
  seed-sanity.mjs                # initial content seed
```

## Current limitations / TODO

- Placeholder/demo content is still present in multiple sections and should be replaced with final client copy.
- Real production media assets (photos, logos, testimonials) are still incomplete.
- Brand/domain setup is not finalized (custom domain and final branding assets pending).
- SEO and analytics hardening is not complete (`og:image`, sitemap/robots, analytics integration).

## Recruiter quick review

- Open the live site: https://cleaning-site-wine.vercel.app
- Open CMS view: https://cleaning-site-wine.vercel.app/studio
- Review form + server flow in:
  - `/home/runner/work/cleaningSite/cleaningSite/components/sections/ContactForm.tsx`
  - `/home/runner/work/cleaningSite/cleaningSite/app/actions/submit-inquiry.ts`
