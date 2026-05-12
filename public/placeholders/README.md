# Placeholder images

Drop production-ready images here, then reference them as `/placeholders/<filename>` from the site.

| File | Used in | Recommended size | Notes |
| --- | --- | --- | --- |
| `hero.jpg` | Hero section full-bleed background | 1920×1080 min, landscape | Bright, on-brand cleaning scene. Replaces the dark `bg-ink` placeholder in `components/sections/Hero.tsx`. |
| `about-1.jpg` | About carousel slide 1 (`Опыт работы`) | 800×600, landscape | Team / process shot. |
| `about-2.jpg` | About carousel slide 2 (`Современное оборудование`) | 800×600, landscape | Equipment / detail. |
| `about-3.jpg` | About carousel slide 3 (`Гибкий график`) | 800×600, landscape | Work in progress / time-of-day cue. |
| `about-4.jpg` | About carousel slide 4 (`Договор и отчётность`) | 800×600, landscape | Documents / handshake / office. |

Until real assets land, the components render solid coloured fallback `<div>`s with `TODO: replace with next/image` comments — grep for `TODO: replace with next/image` to find every spot that needs swapping once the JPGs exist.
