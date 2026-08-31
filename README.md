# Kunal Naskar — Portfolio

An animated, single-page portfolio built with Next.js 16, Tailwind CSS v4 and Motion.

## Requirements

Next.js 16 requires Node.js >= 20.9. The version is pinned in `.nvmrc`:

```bash
nvm use
```

## Getting started

```bash
npm install
npm run dev
```

The site runs at http://localhost:3000.

Other scripts:

```bash
npm run build   # production build (fully static)
npm run start   # serve the production build
npm run lint    # eslint
```

## What's in it

- **Single-page app** with six sections (`home`, `about`, `experience`, `work`, `skills`, `contact`) and Lenis-powered smooth scrolling.
- **Interactive background** — a canvas particle constellation that reacts to the pointer: hover to repel and link nodes, hold to attract, click to fire a shockwave ripple.
- **Animated navbar** with a shared-layout active pill, scroll-progress bar, and a full-screen animated mobile menu.
- **Slide decks** — the experience section is a tabbed slide deck; the work section is a draggable/swipeable 3D card carousel.
- **Custom cursor** on fine-pointer devices, magnetic buttons, scroll-reveal and stagger animations throughout.
- Fully responsive, and all motion is disabled under `prefers-reduced-motion`.

## Content

All portfolio content lives in `src/data/portfolio.ts` as typed data. Edit that file to update text — no component changes needed.

## Contact form

The form submits to [Web3Forms](https://web3forms.com), which delivers the enquiry to the inbox you registered when creating the key.

To switch it on:

1. Get a free access key at https://web3forms.com by entering your email — the key is emailed to you.
2. `cp .env.example .env.local` and set `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY`.
3. Restart the dev server.

Submission happens in the browser, in `sendContactMessage` (`src/lib/portfolio-service.ts`). This is required rather than preferred: Web3Forms' free plan rejects server-side requests with "Pro plan is required", so a Next.js route handler cannot proxy it. The consequence is that the access key is visible in the client bundle — by design for Web3Forms, since the key only permits sending mail to your own inbox. Rotate it in their dashboard if it is ever abused.

Before sending, the client validates that all fields are present, checks the email format, enforces length limits, and passes Web3Forms' `botcheck` honeypot. Success is reported **only** when Web3Forms confirms it; if the key is missing or the request fails, the visitor is told to email you directly instead.

If you would rather the key not be public, the alternatives are Web3Forms Pro (which allows server-side calls) or a provider such as [Resend](https://resend.com) behind a Next.js route handler.

## Adding a backend later

The UI never imports the data file directly; it goes through `src/lib/portfolio-service.ts`, which is the single seam between the UI and the content source. To switch from static data to live APIs, set:

```bash
NEXT_PUBLIC_PORTFOLIO_API_URL=https://api.example.com
```

The service then reads `GET /portfolio` and posts the contact form to `POST /contact`, falling back to the bundled static data if a request fails. Response shapes are the types exported from `src/data/portfolio.ts`.

## Colours

Built on `#000A36` (navy) and white, with cyan / electric blue / violet accents defined as Tailwind theme tokens in `src/app/globals.css`.
