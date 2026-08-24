# MVP — Match Value Projection | Product Website PRD

## Original Problem Statement
Build a production-ready responsive website for MVP — Match Value Projection, a mobile Padel live match tracking app (Beta V1.2.4). Goals: introduce the product, explain the pen-and-paper tracking problem, demonstrate how it works, promote the free App Store / Google Play version, recruit Beta Testers (1-month free Pro access), show the roadmap (Live tracking → Advanced analytics → Player performance intelligence → PIMP vision), and prepare the backend for beta allowlist sync and future Midtrans payments. Brand: White/Navy/Light Blue + TikTok-style Cyan/Pink accents; premium sport-tech editorial style.

## Architecture
- Frontend: React (CRA + craco), Tailwind, framer-motion (scroll reveals, kinetic masked hero, 3D tilt device), lenis (momentum scroll), react-fast-marquee, shadcn/ui accordion, sonner toasts.
- Backend: FastAPI + MongoDB (motor). Routes under /api.
  - POST /api/beta/signup — public; stores {id, email, name, role, signupDate, betaStatus, betaStartDate, betaEndDate}; fires owner notification email (Emergent managed Resend, non-blocking).
  - POST /api/auth/login — env-based single admin, returns JWT (12h).
  - GET /api/admin/applicants?search= — Bearer-protected list + email search.
  - POST /api/admin/applicants/{id}/approve — sets approved + 1-month window.
  - POST /api/admin/applicants/{id}/status — pending/approved/rejected/expired.
- Config: store/donation URLs in frontend/src/config.js (env-overridable); Midtrans placeholders (MIDTRANS_ENVIRONMENT, MIDTRANS_CLIENT_KEY, PRO_PRODUCT_ID) in backend/.env, unused for now.

## User Personas
- Padel coaches, players, team captains, match observers (primary)
- Clubs, academies, tournament organizers (secondary)
- Site admin (product owner managing beta applicants)

## Core Requirements (static)
Landing sections: Hero (kinetic headline + device mockup) → marquee → Problem (6 cards + traditional vs MVP contrast) → Solution (WATCH/TAP/RECORD/ANALYZE) → How It Works (4 numbered steps w/ mockups) → Screenshot showcase (5 app screens) → Feature grid (8) → Free vs Pro tiers → Beta signup (email required, name/role optional, "You're on the list" confirmation) → Roadmap → FAQ (8) → Final download CTA → Footer (donation link, legal placeholders). Admin panel at /admin.

## Implemented (2026-08-24)
- Full landing page, Awwwards-style: masked line-by-line hero reveal, TikTok split-shadow brand mark, editorial marquee, numbered chapters, grain, parallax/3D phone tilt, coded app-UI device mockups (setup/live/stats/summary/history screens).
- Beta signup backend + MongoDB storage + duplicate handling + owner email notification (Emergent managed email).
- Password-protected admin page (JWT): view/search/approve/reject applicants; approval sets 1-month beta window.
- SEO meta (title, description, keywords), lazy images, mobile-first responsive layouts, data-testids throughout.
- Verified: signup (incl. duplicate), login, list/search/approve APIs, unauthorized 401, beta form e2e, admin e2e, mobile no-horizontal-scroll.

## Known Gaps / Pending
- OWNER_EMAIL in backend/.env is a placeholder (owner@example.com) — owner notification 422s until a real email is set.
- App Store / Google Play / donation URLs are placeholders in src/config.js.
- App screenshots: 10 real V1.2.4 captures render in iPhone Pro Max CSS frames (PhoneFrame component, /public/screenshots/). No coded mockups remain on the site. Available: match format, team setup, service order, live tracker, point control, statistics overview, match summary (event history), cross comparison, saved-match review, player-level stats (IMG_6445, currently unused — spare).
- DB contains 2 test applicants (coach.sofia@padelclub.com, tester.maria@padel.io) — can be wiped on request.

## Backlog
- P0: Set real OWNER_EMAIL; replace store URLs at launch.
- P1: Real app screenshots in mockups; Privacy Policy / Terms pages; beta allowlist export/sync endpoint for the mobile app.
- P2: Midtrans Pro purchase flow; beta activation/welcome email to testers; expiry job marking betaStatus=expired; social links.
