export type ProjectArtifact = {
  label: string
  path:  string
}

export type GalleryImage = {
  src:      string
  alt:      string
  caption?: string
}

export type ProjectGallery = {
  tokens?:     GalleryImage[]
  components?: GalleryImage[]
  kits?:       GalleryImage[]
}

export type Project = {
  slug:         string
  type:         'CASE STUDY' | 'PORTFOLIO PROJECT'
  domainTag:    string
  name:         string
  org:          string
  year:         string
  brief:        string
  role:         string
  approach:     string[]
  deliverables: string[]
  takeaways:    string[]
  artifacts:    ProjectArtifact[]
  comingSoon:   boolean
  gallery?:     ProjectGallery
}

export const PROJECTS: Project[] = [
  // ─── CASE STUDIES ───────────────────────────────────────────────────────────
  {
    slug:       'brintons-runner-carpet',
    type:       'CASE STUDY',
    domainTag:  'MANUFACTURING · QA',
    name:       'Brintons — Process Failure & Improvement',
    org:        'Brintons Carpets · India Design/Service Centre',
    year:       '2010 – 2013',
    brief:      'A critical process failure occurred when an incorrect carpet design was manufactured and supplied for a large-scale luxury hotel corridor project in the USA. The error — originating at the design stage — passed through every subsequent checkpoint undetected, resulting in the wrong product being delivered, urgent re-manufacturing, and significant reputational risk with a key hospitality client.',
    role:       'As Process Improvement Leader and PACE Champion for the Service Centre, I led the root cause analysis, identified process gaps, implemented corrective measures, and monitored their effectiveness.',
    approach: [
      'Conducted structured stakeholder interviews across Senior & Junior Designers, Project Managers, Planning, Production Design, and Design Support teams',
      'Built end-to-end business process maps to visualise the full workflow and identify key failure points',
      'Identified primary root cause: designer selected an incorrect pattern, colour, and dimension variant — not caught at any subsequent checkpoint',
      'Documented key failure points: no independent secondary validation before production approval; no QC checkpoint to match manufactured product against approved specification; no pre-shipment verification; communication gaps across Design, Production, and Logistics',
      'Developed detailed process flowcharts covering design validation, approval, and production QC',
      'Introduced mandatory two-level design validation and peer review before client approval submission',
      'Implemented formal digital approval process ensuring client sign-off before production',
      'Established QC checkpoints to verify manufactured carpets against approved designs',
      'Introduced pre-shipment verification and material traceability — linking each production batch to its approved specification',
      'Conducted cross-departmental training and introduced regular alignment meetings across Design, Production, and Logistics',
      'Implemented a Process Change Authorisation Procedure requiring documentation and sign-off for any deviation',
    ],
    deliverables: [
      'End-to-end business process maps covering design validation, approval, and production QC',
      'Process Change Authorisation Procedure — embedded as standard practice across the Service Centre',
      'SOPs for design validation, QC checkpoints, and pre-shipment verification',
      'Cross-functional training programme across Design, Production, and Logistics',
      'Corrective action tracking system for identified issues and implemented fixes',
      'Error rates reduced by over 50% following implementation of structured QC checkpoints and process controls',
      'Improved cross-functional alignment between Design, Production, and Logistics',
      'Strengthened quality governance framework reducing risk of recurrence on future high-value projects',
    ],
    takeaways: [
      'Process failures in complex supply chains often stem from small overlooked errors — preventative controls at multiple checkpoints are critical',
      'Structured RCA and stakeholder interviews surface the real root cause — not just the symptoms',
      'Cross-functional process mapping is essential for identifying where accountability and communication gaps exist',
      'Embedding quality controls and tracking mechanisms creates sustainable improvement — not just one-time fixes',
    ],
    artifacts: [
      { label: 'Case Study PDF', path: '/Projects/Case%20Studies/AK_CS_02_Brintons_Runner_Carpet.pdf' },
    ],
    comingSoon: false,
  },
  {
    slug:       'brintons-leave-encashment',
    type:       'CASE STUDY',
    domainTag:  'MANUFACTURING · COST',
    name:       'Brintons — Leave Encashment & Cost Optimisation',
    org:        'Brintons Carpets · India Design/Service Centre',
    year:       '2012',
    brief:      'January was consistently one of the costliest months at the Brintons India Service Centre due to accumulated leave encashment payouts. As PACE Champion, I led an initiative to encourage employees to avail balance leave rather than opt for encashment — reducing payout costs and enabling a single-shift model that generated additional savings across food, electricity, and transportation.',
    role:       'As PACE Champion for the Service Centre, I led the initiative from identification through to implementation and outcome tracking — coordinating across HR, Finance, Operations, and Planning.',
    approach: [
      'Engaged HR, Payroll, Finance, and Operations teams to understand the financial and operational impact of the existing leave encashment pattern',
      'Facilitated cross-functional discussions to define initiative scope, implementation approach, and communication plan',
      'Mapped the existing leave encashment process — identifying key trigger points driving January cost spikes',
      'Analysed operational impact of shifting from two-shift to single-shift model during the leave utilisation period',
      'Worked with Finance to validate projected savings across all cost heads',
      'Coordinated employee awareness sessions — communicating the initiative rationale and encouraging participation',
      'Developed SOPs for structured leave planning and encashment processes',
      'Established tracking mechanisms to monitor leave utilisation, shift patterns, and cost outcomes',
      'Conducted regular review meetings to address employee concerns and refine the approach',
    ],
    deliverables: [
      'SOPs for structured leave planning and encashment processes',
      'Cross-functional tracking mechanism covering leave utilisation, shift patterns, and cost outcomes',
      'Employee awareness sessions across the Service Centre',
      'Successful transition to single-shift operations during the leave utilisation period',
      'Cost savings in the range of £5K–£10K — recognised internally as a successful PACE outcome',
      'Savings achieved across food arrangements, electricity, and transportation',
      'Reduced sudden financial burden from bulk leave encashment payouts',
    ],
    takeaways: [
      'Small behavioural shifts — when properly analysed and communicated — can generate measurable financial impact',
      'Cross-functional stakeholder engagement is critical to successful policy implementation',
      'Tracking and quantifying outcomes builds credibility and supports a continuous improvement culture',
      'PACE-style initiatives demonstrate that process improvement extends beyond operations into HR and financial planning',
    ],
    artifacts: [
      { label: 'Case Study PDF', path: '/Projects/Case%20Studies/AK_CS_01_Brintons_Leave_Encashment.pdf' },
    ],
    comingSoon: false,
  },
  {
    slug:       'finance-analytics-dashboard',
    type:       'CASE STUDY',
    domainTag:  'BFSI · FINTECH',
    name:       'Finance Analytics & Dashboard',
    org:        'Opine Group · Deployed at Sarvatra Technologies Pvt. Ltd.',
    year:       '2017 – 2018',
    brief:      'Sarvatra Technologies, a BFSI/Fintech company providing Switch services to banks across India, relied on manual processes and fragmented Excel-based reporting to track revenue, expenses, transaction volumes, and settlement timelines. I was deployed as the sole on-site BA and BI resource to replace this with a centralised, automated analytics solution.',
    role:       'Sole on-site BA and BI resource — independently owning end-to-end delivery from initial requirements through to dashboard sign-off, with no on-site team support.',
    approach: [
      'Conducted requirement workshops with Finance, Accounts, and Senior Management to define dashboard objectives and reporting needs',
      'Identified key KPIs including revenue trends, settlement timelines, accounts receivable tracking, and financial reconciliation metrics',
      'Evaluated current reporting inefficiencies — including manual data consolidation, reconciliation inconsistencies, and lack of real-time visibility',
      'Performed gap analysis between existing processes and desired outcomes',
      'Created and maintained full project documentation — BRDs, functional specifications, ERDs, data dictionaries, and process workflows',
      'Designed the dimensional data model to support financial reporting — incorporating revenue, expenses, debtor tracking, and settlement timelines',
      'Integrated data from TallyERP and Excel sources into a unified dimensional data model',
      'Designed and implemented ETL packages (SSIS) and SQL queries for reliable, automated data flow',
      'Built a centralised finance dashboard and multiple SSRS analytics reports for Finance, Accounts, and Senior Management',
      'Designed test scenarios and validation criteria; conducted UAT with Finance users verifying dashboard outputs against TallyERP and Excel source records',
      'Managed feedback cycles, implemented refinements, and obtained formal stakeholder sign-off before deployment',
    ],
    deliverables: [
      'BRDs, functional specifications, ERDs, data dictionaries, and process workflows',
      'Dimensional data model integrating TallyERP and Excel sources',
      'ETL pipelines (SSIS) and SQL queries for automated data flow',
      'Centralised finance dashboard covering revenue, AR, dues, and settlement KPIs',
      'Multiple SSRS analytics reports for Finance, Accounts, and Senior Management',
      'UAT sign-off achieved with Finance and Senior Management stakeholders',
      'Report generation time reduced from hours to minutes',
      'Finance and Accounts teams gained real-time visibility into key financial metrics',
      'Foundation established for scalable, data-driven financial reporting across the organisation',
    ],
    takeaways: [
      'Aligning stakeholder expectations early — across Finance, Accounts, and Senior Management — ensures a clear, shared project direction',
      'Gap analysis is critical for identifying reporting inefficiencies before jumping to technical solutions',
      'Sole on-site delivery demands strong self-management, clear communication, and end-to-end ownership across both BA and BI tracks',
      'User involvement in UAT improves adoption and ensures the final solution genuinely addresses business needs',
      'Consolidating fragmented data sources into a single dimensional model is the foundation of reliable BI delivery',
    ],
    artifacts: [
      { label: 'Case Study PDF', path: '/Projects/Case%20Studies/AK_CS_03_Opine_Sarvatra.pdf' },
    ],
    comingSoon: false,
  },
  {
    slug:       'iddac',
    type:       'CASE STUDY',
    domainTag:  'GOVERNMENT · ANALYTICS',
    name:       'IDDAC — Govt. Analytics Platform',
    org:        'Savitribai Phule Pune University · Tribal Development Dept., Govt. of Maharashtra',
    year:       '2018 – 2021',
    brief:      'The Intelligent Dashboard & Data Analytics Centre (IDDAC) was a centrally-funded government analytics initiative under Article 275(1) of the Indian Constitution — mandated to unify fragmented data across 6 live welfare applications serving approximately 1 crore tribal beneficiaries across Maharashtra. I served as Sr. Project Consultant across BA, BI, and project management tracks.',
    role:       'Sr. Project Consultant at the Department of Technology, SPPU — with primary responsibility across both the BA and BI tracks, working alongside the Project Manager. Role evolved to include project management activities. Full BA+BI delivery for the Swayam & Hostel module; partial BI work across other TDD applications subject to project stage and resource availability.',
    approach: [
      'Engaged senior government stakeholders across TDD (Secretary level) and TRTI (Commissioner level), and coordinated with field offices spanning 4 Additional Tribal Commissioners and 29 Project Offices across Maharashtra',
      'Conducted stakeholder interviews, one-on-one and group meetings, and facilitated formal requirement workshops',
      'Mapped AS-IS workflows and data flows across 6 live TDD applications — identifying fragmentation points, data ownership gaps, and consolidation priorities',
      'Coordinated with multiple government IT vendors (Mahaonline, Probity Soft, NIC) to understand existing data structures and integration constraints',
      'Defined high-level functional and non-functional requirements for the analytics platform',
      'Contributed to data governance framework discussions covering data accuracy, integrity, and access controls',
      'For the Swayam & Hostel module: gathered end-to-end requirements covering hostel admissions, scholarship management, fund allocation, and student data flows',
      'Defined KPIs and reporting logic for fund allocation tracking, hostel occupancy, and student admissions data',
      'Developed dashboard specifications and data visualisation requirements for the Swayam module',
      'Navigated vendor delays through persistent follow-up, escalation, and clear requirement documentation',
      'Maintained detailed documentation across frequent government stakeholder changes to ensure continuity',
      'Managed budget reappropriation and utilization certificate submissions',
    ],
    deliverables: [
      'Full BA+BI delivery for the Swayam & Hostel module — successfully deployed for TDD staff',
      'AS-IS workflow and data flow mapping across 6 live TDD applications',
      'Requirements documentation, process maps, and data governance contributions',
      'KPI frameworks and dashboard specifications for the Swayam & Hostel module',
      'Training materials and user documentation for platform onboarding',
      'Stakeholder engagement across TDD (Secretary level), TRTI (Commissioner level), 4 ATCs, and 29 Project Offices',
      'Project governance — requirement tracking, budget reappropriation, and utilization certificate submissions',
      'Note: The broader IDDAC platform did not reach full deployment due to vendor, hardware, and stakeholder constraints. The Swayam module was the primary functional output of the engagement.',
    ],
    takeaways: [
      'Government-scale BA engagements require deep stakeholder management skills — navigating seniority, institutional complexity, and frequent personnel changes',
      'Mapping data flows across fragmented, multi-vendor government systems demands structured analytical thinking and persistent stakeholder coordination',
      'External constraints — vendor delays, trade restrictions, bureaucratic processes — are real delivery risks in large public sector initiatives. Documenting them professionally and maintaining delivery continuity is a core BA competency',
      'Delivering a working module under constraints demonstrates problem-solving and ownership beyond standard BA scope',
      'Operating across BA, BI, and PM tracks simultaneously builds a well-rounded delivery capability valuable in resource-constrained environments',
    ],
    artifacts: [
      { label: 'Case Study PDF', path: '/Projects/Case%20Studies/AK_CS_04_IDDAC.pdf' },
    ],
    comingSoon: false,
  },
  {
    slug:       'ak-brand-os',
    type:       'CASE STUDY',
    domainTag:  'DESIGN SYSTEMS · AI ENGINEERING',
    name:       'AK Brand OS — Design System',
    org:        'Independent · Built with Claude Design & Claude Code',
    year:       'Ongoing (V4)',
    brief:      'AK Brand OS is my personal design system — one token set and one component language applied across every artefact I produce, from BRDs and strategy memos to my resume, slide decks, dashboard, and this portfolio site. Built with Claude Design and Claude Code, it extracts a shared visual language from documents I already use in practice, rather than starting from a mood board.',
    role:       'I defined the brand premise and the five governing principles behind the system, sourced from my own Artefact Standards spec sheet, and supplied every source document the tokens were extracted from. Claude Design and Claude Code handled extraction, token generation, and the applied UI kits; I reviewed every token, component, and substitution against the original spec and directed scope — what shipped in V4, what stayed flagged open, and what comes next.',
    approach: [
      'Supplied real working documents — a BRD template, strategy memo, research report, presentation deck, and learning-notes system — as raw material, rather than designing tokens from a blank slate',
      'Used Claude Design to extract a shared token and component language from those documents, cross-checked against a pre-existing "Artefact Standards" spec sheet',
      'Defined five governing principles — Structured Diagnosis, Show Thinking, One Insight Per Block, Metadata Always Visible, Consistency in Elements — as the design intent behind every token decision',
      'Constrained the palette deliberately: one signal colour (orange), one serif (Fraunces), one sans (Geist), one mono (JetBrains Mono), a warm paper canvas, and a 4px spacing grid',
      'Packaged the system as a portable Claude Code Skill (SKILL.md), kept in sync via a custom /design-sync workflow — incremental updates, never a wholesale replace',
      'Generated an oxlint adherence config that blocks raw hex/px values and unauthorized fonts in downstream code, enforcing the tokens at the linting level',
      'Reviewed every extracted token, component, and substitution — including catching an IBM Plex Mono → Serif swap — against the original spec sheet before sign-off',
    ],
    deliverables: [
      'Full design token reference — colour, type, spacing, radii, shadows, and motion — documented in the system\'s design-tokens spec',
      'Six applied UI kits built on the same token set: resume, BRD/strategy-memo ("Universal Document"), dashboard, portfolio, social carousel, and slides',
      'A portable Claude Code Skill (SKILL.md) plus a /design-sync workflow for keeping downstream implementations incrementally aligned with the source system',
      'An auto-generated oxlint adherence config enforcing token usage in code',
      'This portfolio site itself runs on AK Brand OS as its applied production example',
      'V4 shipped as the current version, with open items logged rather than silently resolved',
    ],
    takeaways: [
      'A design system is more credible when extracted from real working documents than invented from a moodboard — it starts already proven in practice',
      'Narrow, disciplined constraints (one accent colour, three type families, one spacing unit) produce more consistency than an open palette ever would',
      'Flagging open issues explicitly — like this live site\'s theme not yet reconciled with the V4 paper-canvas spec, or the icon library being a best-guess substitution — is more useful than quietly shipping unresolved decisions',
      'Versioning discipline matters: informal labels ("V4" externally, "alpha" internally) create confusion a single consistent identifier would avoid',
      'Directing an AI collaborator still requires the human to own the spec, review every substitution, and decide scope — the system reflects editorial judgement, not automation alone',
    ],
    artifacts: [
      { label: 'Source Repo (GitHub)', path: 'https://github.com/Starquake82/ak-brand-os' },
      { label: 'Notion Doc', path: 'https://app.notion.com/p/3910adb7af6081a68ddaf75b23621619' },
    ],
    comingSoon: false,
    gallery: {
      tokens: [
        { src: '/Projects/ak-brand-os/tokens/colors-paper.png', alt: 'Paper canvas colour palette', caption: 'Paper Canvas' },
        { src: '/Projects/ak-brand-os/tokens/colors-signal.png', alt: 'Signal orange colour palette', caption: 'Signal Colour' },
        { src: '/Projects/ak-brand-os/tokens/type-families.png', alt: 'Type family specimens — Fraunces, Geist, JetBrains Mono', caption: 'Type Families' },
        { src: '/Projects/ak-brand-os/tokens/spacing-scale.png', alt: '4px-based spacing scale', caption: 'Spacing Scale' },
      ],
      components: [
        { src: '/Projects/ak-brand-os/components/01-logo-lockups.png', alt: 'AK logo lockup variants', caption: 'Logo Lockups' },
        { src: '/Projects/ak-brand-os/components/11-colors-ink.png', alt: 'Ink colour tokens in context', caption: 'Ink Colours' },
        { src: '/Projects/ak-brand-os/components/20-type-serif-display.png', alt: 'Fraunces serif display type in use', caption: 'Serif Display' },
        { src: '/Projects/ak-brand-os/components/40-buttons.png', alt: 'Button component variants', caption: 'Buttons' },
        { src: '/Projects/ak-brand-os/components/44-stats.png', alt: 'Stat component variants', caption: 'Stats' },
        { src: '/Projects/ak-brand-os/components/45-bar-chart.png', alt: 'Bar chart component', caption: 'Bar Chart' },
        { src: '/Projects/ak-brand-os/components/46-process-ribbon.png', alt: 'Process ribbon component', caption: 'Process Ribbon' },
        { src: '/Projects/ak-brand-os/components/50-table-document.png', alt: 'Document table component', caption: 'Document Table' },
      ],
      kits: [
        { src: '/Projects/ak-brand-os/kits/resume-ui-kit.png', alt: 'Resume UI kit applying the design system', caption: 'Resume' },
        { src: '/Projects/ak-brand-os/kits/brd-ui-kit.png', alt: 'BRD / strategy memo UI kit', caption: 'BRD / Document' },
        { src: '/Projects/ak-brand-os/kits/kit-dashboard.png', alt: 'Dashboard UI kit', caption: 'Dashboard' },
        { src: '/Projects/ak-brand-os/kits/kit-portfolio.png', alt: 'Portfolio site UI kit', caption: 'Portfolio Site' },
        { src: '/Projects/ak-brand-os/kits/kit-social.png', alt: 'Social carousel UI kit', caption: 'Social Carousel' },
        { src: '/Projects/ak-brand-os/kits/kit-slides.png', alt: 'Slides / presentation UI kit', caption: 'Slides Deck' },
      ],
    },
  },
  // ─── PORTFOLIO PROJECTS (comingSoon) ────────────────────────────────────────
  {
    slug:         'library-management-portal',
    type:         'PORTFOLIO PROJECT',
    domainTag:    'LIBRARY SYSTEMS',
    name:         'Library Management Portal',
    org:          'BACentric Capstone Project',
    year:         'Independent',
    brief:        '',
    role:         '',
    approach:     [],
    deliverables: [],
    takeaways:    [],
    artifacts:    [
      { label: 'Wireframes PDF', path: '/Projects/library-portal/BAC%20-%20Library%20Management%20Portal-Wireframes.pdf' },
    ],
    comingSoon:   true,
  },
  {
    slug:         'procurement-management-portal',
    type:         'PORTFOLIO PROJECT',
    domainTag:    'PROCUREMENT OPS',
    name:         'Procurement Management Portal',
    org:          'BACentric Capstone Project',
    year:         'Independent',
    brief:        '',
    role:         '',
    approach:     [],
    deliverables: [],
    takeaways:    [],
    artifacts:    [],
    comingSoon:   true,
  },
  {
    slug:         'maven-aw-dashboard',
    type:         'PORTFOLIO PROJECT',
    domainTag:    'SALES & RETAIL ANALYTICS',
    name:         'Maven AW Power BI Dashboard',
    org:          'Maven Analytics',
    year:         'Independent',
    brief:        '',
    role:         '',
    approach:     [],
    deliverables: [],
    takeaways:    [],
    artifacts:    [],
    comingSoon:   true,
  },
  {
    slug:         'finbridge-los',
    type:         'PORTFOLIO PROJECT',
    domainTag:    'BFSI · LENDING',
    name:         'FinBridge LOS',
    org:          'Independent Portfolio Project',
    year:         'In Progress',
    brief:        '',
    role:         '',
    approach:     [],
    deliverables: [],
    takeaways:    [],
    artifacts:    [],
    comingSoon:   true,
  },
  // ─── AI-ASSISTED BUILD ──────────────────────────────────────────────────────
  {
    slug:       'abhishekak-site',
    type:       'CASE STUDY',
    domainTag:  'AI · WEB DELIVERY',
    name:       'abhishekak.site — AI-Assisted Portfolio Build',
    org:        'Independent · Built with Claude Code',
    year:       '2026',
    comingSoon: false,

    brief: 'Professional BA and BI experience is difficult to convey through a CV alone — analytical structure, delivery approach, and quality of thinking are invisible without evidence. This portfolio is the answer: a production-quality website built by an analyst with zero coding background, using a structured AI-assisted workflow, and documented here not just as a product but as a delivery case study in its own right. Three Business Objectives were defined before a single line of code was written — BO-01: present BA, BI, and process improvement work through structured artefacts and navigable case studies, not claims alone; BO-02: demonstrate that an analyst can specify, direct, review, and ship a web product using AI as the implementation partner; BO-03: show how a business analyst can act simultaneously as product owner, content architect, reviewer, and delivery lead. The site itself is the artefact. The way it was built is the case study.',

    role: 'Human Product Owner — Abhishek Kininge: Defined three business objectives before implementation began and used them as the scope boundary throughout. Authored a structured session brief before every delivery session — each brief included problem context, session scope, an explicit deliverables list, acceptance criteria with pass/fail conditions, and an out-of-scope guard list. Reviewed and accepted or rejected all AI-generated outputs against those criteria. Supplied all professional domain knowledge, case study content, and analytical framing. Made all scope calls at every iteration: what shipped in Phase 1, what was deferred to Phase 2, and why. Maintained cross-session continuity through living project documentation — not through AI memory alone.\n\nAI Implementation Partner — Claude Code: Translated structured session briefs into React / Next.js components. Built and iterated layout, GSAP animation, routing, and interaction behaviour across four delivery sessions. Structured all portfolio content into TypeScript data models. Diagnosed and resolved technical delivery issues. Accelerated the full delivery cycle from zero-to-deployed.',

    approach: [
      'Defined three Business Objectives before any implementation began: BO-01 (Evidence-Led Portfolio), BO-02 (AI Delivery Demonstration), and BO-03 (Analyst-as-Product-Owner). Framing the build as a BA project — not a coding exercise — shaped every scope decision that followed',
      'Authored a structured session brief before every implementation session. Each brief covered: problem context, session scope, explicit deliverables list, acceptance criteria with clear pass/fail conditions, and an out-of-scope guard list. Four briefs authored across the full project lifecycle',
      'Session 1 — Foundation: Next.js 16 App Router project setup, TypeScript data models (projectData.ts typed PROJECTS array), AK Brand OS design token system applied as the visual constraint, Vercel deployment pipeline established, and Hero section with Canvas particle mesh and GSAP entrance animation',
      'Session 2 — Core Sections: Experience section with GSAP vertical snap scroll timeline and 35+ organisation logo grid; Projects section with horizontal GSAP pin-scroll track, per-card backlit glow animation in domain colour (yellow BA, purple BI, blue Process, orange AI), and full project detail page routing via generateStaticParams',
      'Session 3 — Artefacts and Content: PDF artefact viewer with inline popup and download option; image gallery with lightbox and pinch-zoom; dual horizontal marquee certificate strip; About section with count-up stats; Contact form; custom dot cursor with hover-expand behaviour',
      'Session 4 — Documentation: BA-style README.md (12 sections — Problem Statement, Business Objectives, Delivery Methodology, Skills tables, Deliverables Register, Tech Stack, Project Structure, Design Direction), PROJECT_LOG.md with four sessions backfilled, SESSION_TEMPLATE.md as a reusable brief format, and Notion project page with session log, decision log, AI impact log, and standing rules',
      'Applied AK Brand OS as the single visual constraint throughout: #0A0A0A background, #FF5A00 orange accent, Fraunces (display) / Geist (body) / JetBrains Mono (labels) type system — ensuring consistency between the site and all other portfolio artefacts',
      'Maintained cross-session continuity through PROJECT_LOG.md (session scope, deliverables shipped, issues resolved, decisions logged per session) and SESSION_TEMPLATE.md (reusable brief structure). Solved the hardest problem in AI-assisted delivery — continuity across context resets — through documentation discipline, not AI memory',
      'Diagnosed and resolved three delivery issues without developer support: (1) Vercel build failure — identified a component file added to the codebase but not committed; (2) PDF auto-download bug — traced to a Content-Disposition header conflict in next.config.ts and resolved by switching from embed to iframe rendering; (3) Nav routing failure on project subpages — traced to usePathname() being called outside a Suspense boundary in Next.js 16 and fixed with a client boundary wrapper',
    ],

    deliverables: [
      'Live production site at abhishekak.site — deployed to Vercel on Next.js 16 App Router / React 19, statically generated across 15 routes, responsive on desktop and mobile',
      '10 project cards in a GSAP horizontal pin-scroll gallery — 4 portfolio projects and 6 case studies, each with per-card backlit glow in domain colour and individual detail pages',
      'Typed TypeScript data model (projectData.ts) — a single source of truth for all 10 project entries, driving card rendering, static route generation, and detail page content without duplication',
      'PDF artefact viewer — inline popup with download option for local PDF files; external URL detection for live site, GitHub, and Notion links (all rendered as direct anchor links, not popups)',
      'Image gallery component — GalleryThumb with ImageLightbox, pinch-zoom support, and caption display, available on any project entry via optional gallery field',
      'BA-style README.md — 12 sections: Project Thesis, Business Objectives (BO-01/02/03), Delivery Methodology with AI vs Human PO role split, BA & BI Skills table, AI & Technical Skills table, Product Features, Deliverables Register, Tech Stack with versions, Local Setup, Project Structure, Design Direction with token table, and Author',
      'PROJECT_LOG.md — four sessions backfilled with scope, deliverables shipped, issues resolved, and decisions logged; linked to Notion project page at the top',
      'SESSION_TEMPLATE.md — reusable session brief template covering Context, Session Scope, Deliverables, Acceptance Criteria, Out of Scope, and Standard Close sections',
      'Notion project page — session log (4 sessions), decision log (8 entries), AI impact log (~57–77 hrs of work estimated against unassisted baseline), and 10 standing project rules',
    ],

    takeaways: [
      'A business analyst can deliver a production web product with zero prior coding knowledge — the transfer mechanism is the BA skill set itself. Requirements framing, scope definition, acceptance criteria, and iterative review are the same disciplines whether the deliverable is a BRD or a deployed website. The medium changes; the methodology does not',
      'Session brief quality is the single highest-leverage input in AI-assisted delivery. Vague prompts produce vague outputs — every time. A brief with explicit scope boundaries, a numbered deliverables list, and pass/fail acceptance criteria produces a shippable component on first review with minimal rework',
      'Cross-session continuity is the hardest unsolved problem in AI-assisted project delivery. AI context resets between sessions. The solution is not better AI memory — it is documentation discipline. PROJECT_LOG.md and SESSION_TEMPLATE.md gave every new session the full picture within the first prompt',
      'Scope control is the highest-leverage skill in AI-assisted delivery. The AI will implement whatever is specified. The discipline of writing an explicit out-of-scope guard list in every session brief is what prevents feature creep, bloated sessions, and accumulated rework across a multi-session project',
      'Technical issues are diagnosable without prior development experience when approached analytically. All three delivery issues on this project were resolved by reasoning through the problem — what changed, what broke, what the error message implied — not by drawing on pre-existing technical knowledge. The BA problem-solving pattern transfers directly',
      'The Human-AI skill split should be designed before work begins, not discovered mid-delivery. Human: direction, judgement, domain knowledge, scope, and acceptance criteria. AI: implementation velocity, technical execution, iteration speed. Designing this split explicitly at the start prevents role confusion, wasted sessions, and the common failure mode of letting AI make scope decisions it should not be making',
    ],

    artifacts: [
      { label: 'Live Site',           path: 'https://abhishekak.site' },
      { label: 'GitHub Repo',         path: 'https://github.com/Starquake82/abhishekak-site' },
      { label: 'Notion Project Page', path: 'https://app.notion.com/p/3910adb7af6081f69cc6cea17771a60a' },
    ],
  },
]
