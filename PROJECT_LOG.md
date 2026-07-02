# Project Log — abhishekak.site

A running record of significant development sessions and deliverables.

---

## SESSION 001 — Foundation & Core Build

**Date:** Pre-launch  
**Status:** Complete

**Deliverables:**
- Next.js 16 project scaffolded with TypeScript and Tailwind CSS v4
- All core sections built: Hero, Experience, Projects, Certifications, About, Contact
- Custom cursor, preloader, and LenisProvider set up
- GSAP ScrollTrigger horizontal pin scroll (Projects section)
- GSAP vertical snap scroll (Experience section)
- Canvas particle mesh (Hero)
- Design token system established (CSS variables)
- Three fonts loaded via next/font/google: Fraunces, Geist, JetBrains Mono
- Deployed to Vercel at abhishekak.site

---

## SESSION 002 — Project Detail Pages & PDF Artefact Viewer

**Date:** June 2026  
**Status:** Complete

**Deliverables:**
- `src/lib/projectData.ts` — typed PROJECTS array with 8 entries (4 case studies, 4 portfolio projects)
- `src/app/projects/[slug]/page.tsx` — individual project detail pages with async server components and `generateStaticParams`
- `src/components/PdfArtifact.tsx` — inline PDF popup viewer with download button; image viewer with zoom support
- `next.config.ts` updated — `Content-Disposition: inline` header for PDFs to prevent auto-download
- `Projects.tsx` updated — each card wrapped in `<Link>` with `display: contents`
- Nav cross-page routing fixed — uses `document.getElementById()` DOM check instead of `usePathname()` (avoids Next.js 16 Suspense issues)
- Library portal artefact wired up with wireframes PDF

**Issues Resolved:**
- Vercel build failures: `RotatingText.tsx` was missing from git. Committed with `layout.tsx`.
- PDF auto-downloading: Fixed with `Content-Disposition: inline` header + `<embed>` tag (not `<iframe>`)
- Nav links broken on project sub-pages: Resolved with DOM element existence check

---

## SESSION 003 — Card Design, Backlights & Visual Polish

**Date:** June–July 2026  
**Status:** Complete

**Deliverables:**
- Nav hover and active states: hover → `#F2F0EB`; active → `#FF5A00`; active on project subpages → PROJECTS link highlighted
- Section gap: `marginTop: 120px` on Projects section (60px mobile)
- Project card height: fixed at 460px
- Per-card coloured backlit glow: radial-gradient with per-type RGBA, opacity 0→1 on hover (500ms)
  - Yellow: BA cards (`rgba(242,193,46,0.13)`)
  - Purple: BI cards (`rgba(107,68,212,0.13)`)
  - Blue: Process cards (`rgba(56,189,248,0.13)`)
- Card artwork images added, then removed (clean minimal style confirmed)
- Large decorative card number (140px Fraunces, near-invisible)
- Three new project folders created: `ai-b2b-lead-pipeline/`, `ai-vibe-coded-portfolio/`, `ak-brand-os/`

---

## SESSION 004 — Project Folder Move & README Audit

**Date:** 2026-07-02  
**Status:** Complete

**Deliverables:**
- Project folder moved: `F:\My Folder\Learning Hub\Other\Website abhishekak-site` → `F:\My Folder\Learning Hub\Artificial Intelligence (AI)\Projects\Website abhishekak-site`
- Memory files updated to new path in Claude Code project memory
- `settings.local.json` cleaned: 8 stale permission entries removed
- `README.md` — full rewrite from default boilerplate to BA-style documentation:
  - Section 01: Problem Statement framing added
  - Section 02: Business Objectives (BO-01, BO-02, BO-03) numbered format
  - Section 03: Delivery Methodology with AI Role / Human PO Role distinction
  - Sections 04–05: BA & BI skills tables; AI & technical skills table
  - Section 06: Product Features with admin route and PDF viewer noted
  - Section 07: Deliverables Register — structured artefact inventory table (NEW)
  - Section 08: Technology Stack with correct versions (Next.js 16.2.9, React 19.2.4, GSAP ^3.15, Lenis ^1.3, TypeScript ^5, clsx ^2.1, tailwind-merge ^3.6)
  - Section 09: Local Setup with clone + install + dev commands
  - Section 10: Project Structure — full annotated tree including all public folders and new components
  - Section 11: Design Direction — token table + typography system
  - Section 12: Author with GitHub URL
  - Live deployment badge + status badge added at top
- `PROJECT_LOG.md` created (this file)
- `SESSION_TEMPLATE.md` created — standard session brief template for future work

---
