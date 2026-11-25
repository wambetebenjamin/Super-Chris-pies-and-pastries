# SUPER Chris Pies and Pastries

Production website for **SUPER Chris Pies and Pastries**, a Kenyan bakery specialising in pies, pastries, custom cakes, and hands-on baking classes.

## Brand

- **Name:** SUPER Chris Pies and Pastries
- **Tagline:** Super fresh pies. Pastries made with love.
- **WhatsApp:** +254 710 832 150 (`254710832150`)
- **Email:** superchrispiesandpastries@gmail.com
- **Location:** Nairobi, Kenya

## Stack

- Next.js 16.4.6
- React 19.2.0
- React DOM 19.2.0
- next-auth 5.0.0-beta.32
- Tailwind CSS 4.1.10
- Lenis 1.3.17
- js-cookie 3.0.8
- Node >= 24

## Setup

```bash
nvm use
npm ci
cp .env.example .env.local
npm run dev
```

## Scripts

- `npm run dev` - start development server
- `npm run build` - production build
- `npm run start` - start production server
- `npm run lint` - lint
- `npm run typecheck` - TypeScript check

## Environment Variables

See `.env.example`.

Key values:
- `NEXT_PUBLIC_WHATSAPP_NUMBER=254710832150`
- `NEXT_PUBLIC_CONTACT_EMAIL=superchrispiesandpastries@gmail.com`
- `NEXT_PUBLIC_DRIVE_MENU_URL` - Google Drive full menu link
- `NEXT_PUBLIC_DRIVE_CLASSES_URL` - Google Drive class schedule/details link
- `NEXT_PUBLIC_DRIVE_GALLERY_URL` - Google Drive gallery link
- `NEXTAUTH_URL`, `NEXTAUTH_SECRET`, `AUTH_SECRET`
- `NEXT_PUBLIC_RECAPTCHA_SITE_KEY`, `RECAPTCHA_SECRET_KEY`

## Repository Photos

Real repository photos are the first priority and are stored in `public/images/repo/`. To replace or add photos:

1. Add image files to `public/images/repo/`.
2. Update the relevant page/component image references.
3. Update `image-credits.md`.

## Google Drive Links

Update Drive folder URLs in `.env.local`:
- `NEXT_PUBLIC_DRIVE_MENU_URL`
- `NEXT_PUBLIC_DRIVE_CLASSES_URL`
- `NEXT_PUBLIC_DRIVE_GALLERY_URL`

These appear on Menu, Classes, Gallery, and Contact pages.

## Design

The site preserves the uploaded Food Funday template design system from `food-funday-master (1).zip`: fonts, colors, CSS variables, layout components, spacing scale, and animation utilities. Content, branding, and images were adapted for SUPER Chris Pies and Pastries.

## Deployment

Configured for Vercel with `cdg1` region and security headers in `vercel.json`.

```bash
npm ci && npx tsc --noEmit && npm run build && npm audit --audit-level=high
```
