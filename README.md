# AI-Assisted Website Build — www.abhishekak.site  

[![Status](https://img.shields.io/badge/Status-Live%20·%20In%20Active%20Development-brightgreen)](https://abhishekak.site)
[![Live Site](https://img.shields.io/badge/Live%20Site-abhishekak.site-FF5A00)](https://abhishekak.site)
[![Next.js](https://img.shields.io/badge/Next.js-16.2.9-black)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)](https://www.typescriptlang.org)

---

## 01 / Project Thesis

**Problem Statement:** Professional BA and BI experience is difficult to convey through a CV alone. Work quality, analytical structure, and delivery approach are invisible without evidence.

This portfolio addresses that gap. It translates 15 years of structured analysis work into a navigable, evidence-led digital product — combining case studies, project artefacts, CVs, certifications, and process documentation into a single accessible reference.

The project follows the personal brand principle:

> *Structured Diagnosis for Business, Systems & AI.*

---

## 02 / Why This Project Exists

This project was initiated to meet three business objectives:

**BO-01 — Evidence-Led Portfolio**
Present BA, BI, and process improvement experience through structured case studies, documented artefacts, and navigable sections — not through claims alone.

**BO-02 — AI Delivery Demonstration**
Demonstrate that an analyst with no prior web development background can specify, direct, review, and deliver a production-quality web product using an AI-assisted coding workflow.

**BO-03 — Analyst-as-Product-Owner**
Show how a business analyst can act simultaneously as product owner, content architect, reviewer, and delivery lead — with AI as the implementation partner.

---

## 03 / Delivery Methodology

**Delivery Methodology:** AI-assisted development using Claude Code.

**AI Implementation Role:**
- Translated structured requirements into React / Next.js components
- Built and iterated layout, animation, routing, and interaction behaviour
- Structured portfolio content into typed data models
- Accelerated delivery from concept to deployed site

**Human Product Owner Role (Abhishek Kininge):**
- Defined business objectives and product scope
- Supplied domain knowledge, professional context, and case-study content
- Reviewed all outputs for accuracy, tone, and business relevance
- Validated portfolio evidence and directed final user experience
- Authored all session briefs and acceptance criteria

---

## 04 / BA & BI Skills Demonstrated

| Domain | Skills |
|---|---|
| Business Analysis | Requirements elicitation, process mapping, BRD writing, user stories, stakeholder management, gap analysis |
| Business Intelligence | Power BI (Desktop + Service + DAX), data modelling, dashboard design, KPI definition |
| Process Improvement | Root cause analysis, waste identification, process reengineering, cost optimisation |
| Documentation | Wireframes, use case documentation, validation sheets, process flow diagrams |
| Domain Knowledge | BFSI · Manufacturing · Retail Analytics · Government · Healthcare · Library Systems |

---

## 05 / AI & Technical Skills Demonstrated

| Domain | Skills |
|---|---|
| AI-Assisted Delivery | Claude Code prompt engineering, session brief authoring, AI output review and direction |
| Frontend | React 19, Next.js 16 App Router, TypeScript, Tailwind CSS v4 |
| Animation | GSAP + ScrollTrigger (horizontal pin scroll, scroll-triggered entrance), Lenis smooth scroll |
| Routing | App Router dynamic routes, static params generation, async server components |
| Data Modelling | Typed project data structures in TypeScript (`projectData.ts`) |

---

## 06 / Product Features

- **Hero** — Canvas particle mesh, animated headline with rotating text, entrance animation
- **Work / Experience** — GSAP vertical snap timeline, company logo grid (35+ logos)
- **Projects & Case Studies** — Horizontal pinned scroll track, 8 cards (4 portfolio projects + 4 case studies), individual project detail pages with PDF artefact viewer
- **Certifications** — Dual horizontal marquee of certificate cards
- **About** — Count-up stats, personal context section
- **Contact** — Styled contact form with social links
- **Admin Route** — `/admin` pipeline dashboard UI (Phase 2 placeholder; Run buttons disabled)
- **PDF Artefact Viewer** — Inline PDF popup with download option, image viewer with zoom
- **Custom Cursor** — Dot cursor with hover expand behaviour

---

## 07 / Deliverables Register

A structured inventory of project artefacts available in this repository.

| Artefact Type | Contents | Location |
|---|---|---|
| CV Documents | BA-focused CV, BI-focused CV, Cover Letter | `public/CV/` |
| Case Study PDFs | 4 BA/BI/Process case studies | `public/Projects/Case Studies/` |
| BA Portfolio — Library Portal | Wireframes, BRD, process flows, user stories, validation sheet | `public/Projects/library-portal/` |
| BA Portfolio — Procurement Portal | Wireframes, BRD, use cases, validation sheet, process flows | `public/Projects/procurement-portal/` |
| BI Portfolio — Maven AW Dashboard | Power BI project files | `public/Projects/maven-aw/` |
| BI Portfolio — FinBridge LOS | BFSI lending project documentation | `public/Projects/finbridge-los/` |
| Certificates | 12+ professional certificates (PDF and image) | `public/Certificates/` |
| Certification Badges | Digital badges from Maven Analytics, McKinsey, Google, IBM | `public/Badges/` |
| Organisation Logos | 35+ logos used in Experience and Education sections | `public/Logos/` |

---

## 08 / Technology Stack

| Category | Technology | Version |
|---|---|---|
| Framework | Next.js | 16.2.9 |
| Language | TypeScript | ^5 |
| UI Library | React | 19.2.4 |
| Styling | Tailwind CSS | ^4 |
| Animation | GSAP + ScrollTrigger | ^3.15 |
| Smooth Scroll | Lenis | ^1.3 |
| Utilities | clsx | ^2.1 |
| Utilities | tailwind-merge | ^3.6 |
| Deployment | Vercel | — |

---

## 09 / Local Setup

**Prerequisites:** Node.js 20+

```bash
# Clone
git clone https://github.com/Starquake82/abhishekak-site.git
cd abhishekak-site

# Install
npm install

# Dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

```bash
# Production build
npm run build
npm run start
```

---

## 10 / Project Structure

```
abhishekak-site/
├── src/
│   ├── app/
│   │   ├── layout.tsx              # Root layout, font setup, metadata
│   │   ├── page.tsx                # Home page (all sections)
│   │   ├── globals.css             # Design tokens, base styles
│   │   ├── admin/                  # Pipeline dashboard (Phase 2 placeholder)
│   │   │   ├── layout.tsx
│   │   │   └── page.tsx
│   │   └── projects/
│   │       └── [slug]/
│   │           └── page.tsx        # Individual project detail pages
│   ├── components/
│   │   ├── Nav.tsx                 # Fixed nav, cross-page scroll routing
│   │   ├── Preloader.tsx           # Entrance preloader animation
│   │   ├── PreloaderContext.tsx    # Shared signal between Preloader and Hero
│   │   ├── LenisProvider.tsx       # Lenis smooth scroll + GSAP ticker sync
│   │   ├── Cursor.tsx              # Custom dot cursor
│   │   ├── TextScroll.tsx          # Animated scroll text utility
│   │   ├── RotatingText.tsx        # Headline rotating words
│   │   ├── PdfArtifact.tsx         # PDF / image artefact popup viewer
│   │   └── sections/
│   │       ├── Hero.tsx            # Canvas particle mesh, animated headline
│   │       ├── Experience.tsx      # GSAP snap timeline, logo grid
│   │       ├── Projects.tsx        # Horizontal pin scroll, 8 project cards
│   │       ├── Certifications.tsx  # Dual marquee certificate strip
│   │       ├── About.tsx           # Count-up stats, personal context
│   │       ├── Education.tsx       # Education section
│   │       └── Contact.tsx         # Contact form and social links
│   └── lib/
│       ├── projectData.ts          # Typed PROJECTS array (8 entries)
│       └── utils.ts                # clsx + tailwind-merge utility
├── public/
│   ├── CV/                         # CV and cover letter PDFs
│   ├── Projects/                   # Project artefacts by folder
│   │   ├── Case Studies/           # 4 case study PDFs
│   │   ├── library-portal/
│   │   ├── procurement-portal/
│   │   ├── maven-aw/
│   │   ├── finbridge-los/
│   │   ├── ai-b2b-lead-pipeline/
│   │   ├── ai-vibe-coded-portfolio/
│   │   └── ak-brand-os/
│   ├── Certificates/               # 12+ certificate PDFs and images
│   ├── Badges/                     # Digital certification badges
│   ├── Logos/                      # Organisation logos (35+)
│   └── Images/                     # Site images and assets
├── next.config.ts                  # PDF inline headers, Next.js config
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

---

## 11 / Design Direction

**Theme:** Dark, editorial, structured.

| Token | Value | Usage |
|---|---|---|
| `--bg` | `#0A0A0A` | Page background |
| `--surface` | `#111111` | Cards, panels |
| `--text` | `#F2F0EB` | Primary text |
| `--muted` | `rgba(242,240,235,0.45)` | Secondary text |
| `--accent` | `#FF5A00` | Orange highlight, CTAs |
| `--border` | `rgba(255,255,255,0.07)` | Dividers, card borders |

**Typography:**
- `Fraunces` — Display headings (serif, optical)
- `Geist` — Body and UI text (sans-serif)
- `JetBrains Mono` — Section labels, tags, monospaced UI

**Layout:** Full-viewport sections. Horizontal pin scroll (Projects). Vertical snap (Experience). Near-black surfaces with orange accent system.

---

## 12 / Author

**Abhishek Anil Kininge** — Business Analyst & Business Intelligence Analyst

- **Website:** [abhishekak.site](https://abhishekak.site)
- **GitHub:** [github.com/Starquake82](https://github.com/Starquake82)
- **LinkedIn:** [linkedin.com/in/abhishekkininge](https://www.linkedin.com/in/abhishekkininge)
- **Email:** san.abhishek@gmail.com

*Structured Diagnosis for Business, Systems & AI.*
