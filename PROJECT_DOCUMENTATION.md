# Kunal Portfolio — Project Documentation

Complete reference for what was built, how the code is organized, how it runs locally, and how it is deployed.

---

## Overview

A high-end, animated, single-page portfolio for **Kunal Naskar**. Content is sourced from `cv.md` and stored as typed data in the codebase. The site is fully static at build time and hosted on **Cloudflare Workers (assets-only)** with the custom domain **kunalnaskar.com**.

| Item | Value |
|---|---|
| Live site | https://kunalnaskar.com |
| Workers preview URL | https://kunal-portfolio.naskarprsnl.workers.dev |
| GitHub repo | https://github.com/naskark/kunal_portfolio |
| Branch | `main` |

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16.3.3 (App Router) |
| UI | React 19, Tailwind CSS v4 |
| Animation | Motion (Framer Motion) |
| Smooth scroll | Lenis |
| Icons | react-icons (Simple Icons, Lucide, Font Awesome) |
| Language | TypeScript |
| Node.js | 20.20.2 (pinned in `.nvmrc`) |
| Contact form | Web3Forms (client-side) |
| Hosting (current) | Cloudflare Workers — static assets via Wrangler |
| Hosting (future) | AWS Amplify (`amplify.yml` already in repo) |
| DNS / domain | Cloudflare Registrar + DNS |

---

## Project Structure

```
Kunal_Portfolio/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout, fonts, metadata
│   │   ├── page.tsx            # Single page — assembles all sections
│   │   └── globals.css         # Theme tokens, utilities, keyframes
│   ├── components/
│   │   ├── Navbar.tsx          # Fixed nav, scroll hide/show, mobile menu
│   │   ├── Footer.tsx
│   │   ├── Preloader.tsx       # Loading screen on first visit
│   │   ├── SmoothScroll.tsx    # Lenis smooth scrolling
│   │   ├── InteractiveBackground.tsx  # Canvas particle network
│   │   ├── CustomCursor.tsx    # Custom pointer on desktop
│   │   ├── sections/
│   │   │   ├── Hero.tsx        # Headline, hanging tag, stats
│   │   │   ├── About.tsx       # Summary, principles, education, awards
│   │   │   ├── Experience.tsx  # Tabbed experience slide deck
│   │   │   ├── Work.tsx        # Draggable 3D app carousel
│   │   │   ├── Skills.tsx      # Filterable skills + marquee
│   │   │   └── Contact.tsx     # Form + icon contact channels
│   │   └── ui/
│   │       ├── Avatar.tsx      # Profile image + lightbox
│   │       ├── HangingTag.tsx  # Pendulum physics tag
│   │       ├── Reveal.tsx      # Scroll-reveal + CardReveal
│   │       ├── Magnetic.tsx    # Magnetic hover buttons
│   │       ├── SectionShell.tsx
│   │       └── skill-icons.tsx # Skill name → brand icon map
│   ├── data/
│   │   └── portfolio.ts        # All portfolio content (typed)
│   └── lib/
│       └── portfolio-service.ts # Data + contact form access layer
├── public/
│   ├── profile-avatar.jpg      # Cropped head-and-shoulders avatar
│   └── profile-full.jpg        # Full image for lightbox
├── cv.md                       # Original CV source
├── next.config.ts              # Static export config
├── wrangler.jsonc              # Cloudflare deploy config
├── amplify.yml                 # AWS Amplify build spec (future use)
├── .env.example                # Environment variable template
├── .nvmrc                      # Node 20.20.2
└── package.json
```

There are **no API route handlers** and **no server actions**. The app is 100% static after `npm run build`.

---

## Features Implemented

### Layout & navigation
- Single-page application with six sections: Home, About, Experience, Work, Skills, Contact
- Lenis-powered smooth scrolling
- Navbar with scroll progress bar, active section pill, and animated mobile menu
- Navbar **hides on scroll down**, **shows on scroll up** (after ~140px)
- Fully responsive across mobile, tablet, and desktop

### Visual design
- Color palette: `#000A36` (navy) + white, with cyan / electric blue / violet accents
- Custom theme tokens in `globals.css`
- Preloader with progress animation on first load
- Custom cursor on fine-pointer devices (disabled on touch)

### Animations & interactivity
- **Interactive background** — canvas particle constellation; pointer repels/attracts nodes, click creates ripple
- **Scroll-triggered reveals** — sections and cards animate into place on scroll (`Reveal`, `CardReveal`)
- **Magnetic buttons** — subtle pull toward cursor on hover
- **Experience section** — tabbed slide deck with animated transitions
- **Work section** — draggable/swipeable 3D card carousel for featured apps
- **Skills section** — category filter + infinite marquee with brand icons
- **Hanging tag (Hero)** — avatar, name, and title on a pendulum; idle sway, drag-to-swing physics, spring return on release
- **Avatar** — themed profile image with rotating ring, hover zoom, click-to-open lightbox
- All motion respects `prefers-reduced-motion`

### Content & data
- All text sourced from `cv.md`, structured in `src/data/portfolio.ts`
- Skills show **brand-specific icons** (TypeScript, React, Node.js, etc.) via `skill-icons.tsx`
- Recognition includes: Mobile Maverick, AI Hackathon Winner, Certified Leadership Engagement Program
- Contact channels (email, phone, LinkedIn) shown as **icon rows** with copy-to-clipboard — not cards

### Contact form
- Sends enquiries via **Web3Forms** from the browser
- Client-side validation (required fields, email format, length limits)
- Honeypot (`botcheck`) for basic bot protection
- Clear error/success messages; fallback to direct email if key is missing

---

## Architecture

```
┌─────────────────────────────────────────────────────────┐
│  Browser (kunalnaskar.com)                              │
│                                                         │
│  Next.js static export (out/index.html + assets)        │
│  ├── Sections render from portfolio data                │
│  └── Contact form → POST api.web3forms.com (client)     │
└─────────────────────────────────────────────────────────┘
         ▲                              │
         │ CDN (Cloudflare)             │ Email delivery
         │                              ▼
┌────────────────┐              ┌───────────────┐
│ Cloudflare     │              │ Web3Forms     │
│ Workers        │              │ → your inbox  │
│ (assets-only)  │              └───────────────┘
└────────────────┘
```

### Data layer (`portfolio-service.ts`)

Components never import `portfolio.ts` directly. They call:

- `getPortfolio()` — returns static data today; can fetch from `NEXT_PUBLIC_PORTFOLIO_API_URL` later
- `sendContactMessage()` — submits to Web3Forms from the browser

This seam allows swapping to a backend API without changing UI components.

---

## Environment Variables

Copy `.env.example` to `.env.local` for local development:

```bash
cp .env.example .env.local
```

| Variable | Required | Description |
|---|---|---|
| `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY` | Yes (for form) | Web3Forms access key from https://web3forms.com |
| `NEXT_PUBLIC_PORTFOLIO_API_URL` | No | Future backend API base URL |

**Important:** `.env.local` is gitignored. For Cloudflare deploys, set `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY` and `NODE_VERSION=20.20.2` in the project's environment variables in the dashboard.

Web3Forms free plan requires **client-side** submission — the key is visible in the browser bundle by design. Rotate it in the Web3Forms dashboard if abused.

---

## Local Development

```bash
# Use correct Node version
nvm use

# Install dependencies
npm install

# Start dev server
npm run dev
```

Site runs at http://localhost:3000

### Other scripts

```bash
npm run build   # Production build → outputs to out/
npm run start   # Serve production build (requires non-export mode)
npm run lint    # ESLint
```

### Static export output

Because `next.config.ts` sets `output: "export"`, `npm run build` produces a static bundle in `out/`:

```
out/
├── index.html
├── 404.html
├── profile-avatar.jpg
├── profile-full.jpg
└── _next/static/...
```

This `out/` folder is what Wrangler uploads to Cloudflare.

---

## Build Configuration

### `next.config.ts`

```typescript
output: "export"           // Static HTML export for CDN hosting
images: { unoptimized: true }  // No Next.js image optimizer at runtime
```

These settings are required for Cloudflare static hosting. When migrating to AWS Amplify later, **remove both lines** to restore SSR and image optimization.

### `wrangler.jsonc`

```jsonc
{
  "name": "kunal-portfolio",
  "assets": {
    "directory": "./out",
    "not_found_handling": "404-page"
  }
}
```

No Worker entrypoint — requests are served directly from Cloudflare's CDN (assets-only, free tier friendly).

### `amplify.yml` (future AWS deploy)

Build spec for AWS Amplify. Pins Node from `.nvmrc`, runs `npm ci` + `npm run build`, outputs from `.next`. Ready for when you migrate off Cloudflare.

---

## GitHub Repository

| Item | Detail |
|---|---|
| Remote | `git@github.com:naskark/kunal_portfolio.git` |
| Branch | `main` |
| SSH key | Repo-scoped key at `~/.ssh/naskark_portfolio` (via `core.sshCommand`) |

### Commit history

```
f595c49 Add wrangler config for assets-only Cloudflare deploy
a095f48 Export a static bundle for Cloudflare Pages
3170f89 Add Amplify build spec pinning Node from .nvmrc
5eb9480 Build animated single-page portfolio
3da79ac Initial commit from Create Next App
```

### Files intentionally not committed

- `.env.local` — secrets
- `out/` — build output
- `.next/` — Next.js cache
- `.wrangler/` — Wrangler local cache
- `node_modules/`

---

## Cloudflare Deployment (Current)

### How deploy works

1. Push to `main` on GitHub
2. Cloudflare CI clones the repo
3. Runs `npm run build` → generates `out/`
4. Runs `npx wrangler deploy` → uploads `out/` to Cloudflare CDN

### Cloudflare project settings

| Setting | Value |
|---|---|
| Build command | `npm run build` |
| Deploy command | `npx wrangler deploy` |
| Environment: `NODE_VERSION` | `20.20.2` |
| Environment: `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY` | Your Web3Forms key |

### Custom domain setup

Domains connected via **Workers → kunal-portfolio → Settings → Domains & Routes**:

- `kunalnaskar.com` (root — leave subdomain empty)
- `www.kunalnaskar.com` (subdomain: `www`)

Cloudflare auto-creates DNS records and SSL certificates.

### SSL / HTTPS

In **SSL/TLS → Edge Certificates** for `kunalnaskar.com`:

- **Always Use HTTPS** — ON (redirects HTTP → HTTPS)
- **Automatic HTTPS Rewrites** — ON
- **SSL mode** — Full (strict)

Without "Always Use HTTPS", browsers load the site over plain HTTP and show "Not secure".

### Web3Forms domain whitelist

In the Web3Forms dashboard, set the allowed domain to `kunalnaskar.com` (not `localhost`). Submissions from the live site are rejected otherwise.

---

## AWS Amplify (Future Migration)

When ready to move to AWS:

1. Remove `output: "export"` and `images: { unoptimized: true }` from `next.config.ts`
2. Create an Amplify app connected to `naskark/kunal_portfolio`
3. Amplify auto-detects `amplify.yml`
4. Add `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY` as an environment variable
5. Point Cloudflare DNS at Amplify (CNAME records, **DNS only** / grey cloud)

Amplify runs full Next.js with SSR and image optimization — no static export needed.

---

## Key Components Reference

### `HangingTag.tsx`
Pendulum physics for the hero identity block:
- Idle CSS `sway` animation
- Drag beyond threshold → pointer capture, angle + cord length follow cursor
- Release → spring animation back to rest
- Click on avatar still opens lightbox (pointer capture deferred until drag threshold)

### `Avatar.tsx`
- Displays `profile-avatar.jpg` with navy-themed filters
- Rotating conic gradient ring
- Hover: scale up, remove grayscale
- Click: full-screen lightbox with `profile-full.jpg`

### `Navbar.tsx`
- Tracks scroll direction via Framer Motion `scrollY`
- Hides when scrolling down past 140px
- Shows when scrolling up
- Stays visible during programmatic nav clicks and when mobile menu is open

### `InteractiveBackground.tsx`
- Canvas-based particle network
- Particles connect when close; pointer interaction repels/attracts
- Click creates expanding ripple effect

### `Contact.tsx`
- Form fields: name, email, message + hidden honeypot
- Icon rows for email, phone, LinkedIn with copy-to-clipboard
- Submits via `sendContactMessage()` in portfolio-service

### `skill-icons.tsx`
Maps skill names to react-icons components with brand colors. Falls back to a monogram for unmapped skills.

---

## Updating Content

Edit `src/data/portfolio.ts` to change any text, experience, skills, apps, or awards. No component changes needed.

For large rewrites, update `cv.md` first as the source of truth, then sync into `portfolio.ts`.

After editing, commit and push — Cloudflare auto-rebuilds and redeploys.

---

## Troubleshooting

| Problem | Cause | Fix |
|---|---|---|
| Contact form says "not connected" | Missing env var in Cloudflare | Add `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY` in project env vars, redeploy |
| Form submits but no email | Web3Forms domain not updated | Set allowed domain to `kunalnaskar.com` in Web3Forms dashboard |
| "Not secure" in browser | HTTP not redirecting to HTTPS | Enable **Always Use HTTPS** in Cloudflare SSL/TLS settings |
| Domain shows nothing | Custom domain not connected to Worker | Add domain in Workers → Domains & Routes |
| Build fails on Cloudflare | Wrong Node version | Set `NODE_VERSION=20.20.2` in env vars |
| `No zones match` when connecting domain | Domain in different Cloudflare account than Worker | Recreate Worker in the account that owns the domain |
| Avatar shows old image | Next.js image cache | Clear `.next/cache/images` locally; on Cloudflare, redeploy |

---

## Dependencies

```json
{
  "dependencies": {
    "lenis": "^1.3.26",
    "motion": "^13.1.1",
    "next": "16.3.3",
    "react": "19.2.8",
    "react-dom": "19.2.8",
    "react-icons": "^5.7.0"
  },
  "devDependencies": {
    "wrangler": "^4.86.0",
    "tailwindcss": "^4",
    "typescript": "^5",
    "eslint": "^9",
    "eslint-config-next": "16.3.3"
  }
}
```

---

## Summary Checklist

- [x] Animated single-page portfolio built from CV data
- [x] Interactive background, smooth scroll, custom cursor
- [x] Hanging tag pendulum, avatar lightbox, scroll-reveal cards
- [x] Contact form via Web3Forms (client-side)
- [x] Skill brand icons, icon-based contact channels
- [x] Static export for CDN hosting
- [x] Pushed to GitHub (`naskark/kunal_portfolio`)
- [x] Deployed to Cloudflare Workers (assets-only)
- [x] Custom domain `kunalnaskar.com` + `www` connected
- [ ] Enable Always Use HTTPS (if not done yet)
- [ ] Update Web3Forms allowed domain to `kunalnaskar.com`
- [ ] Optional: disable `workers.dev` URL in `wrangler.jsonc` for SEO
- [ ] Future: migrate to AWS Amplify using existing `amplify.yml`
