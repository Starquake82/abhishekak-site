'use client'
import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const NAV_H    = 72
const CARD_PAD = `${NAV_H + 16}px 32px 32px` // push content below nav on snap

const CARDS = [
  {
    logo:           '/Logos/brintons.png',
    companyPrimary: 'Brintons Carpets',
    companySub:     'India Design/Service Centre',
    role:           'Process Improvement Leader',
    tenure:         'Jul 2010 – Apr 2013',
    tags:           ['PROCESS IMPROVEMENT', 'MANUFACTURING', 'GLOBAL'],
    highlights: [
      'Reduced Internal Badly Defective (IBD) levels by ~70% through structured RCA and SOP implementation',
      'Owned BOS KPI reporting framework — reported to GM and Executive Director, Group Operations',
      'PACE Champion — £5K–£10K cost savings (leave encashment initiative)',
    ],
    detail: [
      'Led 8D root cause analysis across Design, Production, Planning, and Quality functions',
      'Developed Process Change Authorisation procedure — embedded as standard practice across the Service Centre',
      'Facilitated Kaizen events and cross-functional improvement workshops across Americas, EMEA, and Asia Pacific',
      'Managed corrective action tracking and QC checkpoints to prevent recurrence on high-value hospitality projects',
    ],
    skills: ['RCA', 'SOP Development', 'KPI Reporting', 'Process Mapping', 'Change Management', 'Stakeholder Engagement', 'Kaizen'],
  },
  {
    logo:           '/Logos/mahalaxmi.png',
    companyPrimary: 'Mahalaxmi Co-Op Yarn Processors',
    companySub:     'Garment Division',
    role:           'Business & Operations Manager',
    tenure:         'Jun 2013 – Mar 2015',
    tags:           ['OPERATIONS', 'MANUFACTURING', 'GARMENTS'],
    highlights: [
      'Led machinery installation and commissioning for new production unit — Fit for Use authorisation',
      'Operational data analysis across output, defects, and delivery KPIs for a 50+ person unit',
      'Managed garment manufacturing, QC, HR, and process governance across functions',
    ],
    detail: [
      'Conducted business process analysis to evaluate system effectiveness and drive strategic decisions',
      "Led new children's wear product line launch — end-to-end production setup",
      'Tracked and reported KPIs across output, defect levels, delivery, and employee performance',
    ],
    skills: ['Operations Management', 'Process Analysis', 'KPI Tracking', 'Manufacturing', 'Quality Control'],
  },
  {
    logo:           '/Logos/texcarp.png',
    companyPrimary: 'TexCarp Consulting',
    companySub:     'Part-time · UK Engagement',
    role:           'Consultant',
    tenure:         'Jun 2015 – Jan 2016',
    tags:           ['CONSULTING', 'B2B', 'UK ENGAGEMENT'],
    highlights: [
      'Data collection design and analysis for UK-based B2B client engagement',
      'Requirements gathering and coordination for website redesign',
      'Campaign analysis, performance tracking, and client reporting',
    ],
    detail: [
      'Conducted client calls to understand business needs and surface insights',
      'Developed reports and presentations translating data into actionable recommendations',
      'Supported digital marketing efforts including campaign analysis and performance tracking',
    ],
    skills: ['Requirements Gathering', 'Data Analysis', 'Client Engagement', 'Reporting', 'Digital Marketing'],
  },
  {
    logo:           '/Logos/opine-group.png',
    companyPrimary: 'Opine Group',
    companySub:     'Deployed at Sarvatra Technologies (BFSI/Fintech)',
    role:           'Business Intelligence Analyst',
    tenure:         'May 2017 – Oct 2018',
    tags:           ['BFSI', 'BI DELIVERY', 'FULL LIFECYCLE'],
    highlights: [
      'Sole on-site BA and BI resource — independently owned full delivery lifecycle from requirements to sign-off',
      'Replaced fragmented manual reporting with a centralised SSRS dashboard — report generation reduced from hours to minutes',
      'Integrated TallyERP and Excel into a unified dimensional model via SSIS ETL',
    ],
    detail: [
      'Conducted requirement workshops and gap analysis with Finance, Accounts, and Senior Management',
      'Designed dimensional data model, data dictionary, and ERD — full traceability from business requirement to dashboard output',
      'Built centralised finance dashboard covering revenue, AR, dues, and settlement KPIs',
      'Executed UAT with Finance and Senior Management — validated all outputs against source data and obtained formal sign-off',
    ],
    skills: ['Power BI', 'SQL', 'SSRS', 'SSIS', 'ETL', 'Dimensional Modelling', 'DAX', 'UAT', 'Requirements Elicitation', 'Gap Analysis'],
  },
  {
    logo:           '/Logos/sppu.png',
    companyPrimary: 'Savitribai Phule Pune University',
    companySub:     'Tribal Development Dept., Govt. of Maharashtra',
    role:           'Sr. Project Consultant (Business Analyst)',
    tenure:         'Nov 2018 – Aug 2021',
    tags:           ['GOVERNMENT', 'ANALYTICS PLATFORM', 'ARTICLE 275(1)'],
    highlights: [
      '₹855.16L centrally-funded analytics initiative covering ~1 crore tribal beneficiaries across Maharashtra',
      '35+ government stakeholder touchpoints — Secretary and Commissioner level to 29 district project offices',
      'Full BA+BI delivery for Swayam & Hostel module — successfully deployed for TDD staff',
    ],
    detail: [
      'Mapped AS-IS workflows and data flows across 6 live welfare applications (Mahaonline, Probity Soft, NIC)',
      'Defined KPIs, dashboard specifications, user stories, and acceptance criteria across multiple welfare schemes',
      'Managed budget reappropriation and utilization certificate submissions',
      'Navigated vendor delays, frequent stakeholder changes, and hardware procurement constraints',
      'Note: Broader IDDAC platform constrained by external factors; Swayam module delivered and deployed',
    ],
    skills: ['Business Analysis', 'Stakeholder Management', 'Requirements Elicitation', 'BRD', 'User Stories', 'KPI Definition', 'Dashboard Design', 'AS-IS / TO-BE', 'Vendor Coordination', 'Budget Governance'],
  },
  {
    logo:           null, // rendered as "AK." text
    companyPrimary: 'Independent Consulting',
    companySub:     'Self-directed · Feb 2021 – Present',
    role:           'Independent Analyst & Consultant',
    tenure:         'Feb 2021 – Present',
    tags:           ['CONSULTING', 'POWER BI', 'AI-AUGMENTED'],
    highlights: [
      'Power BI dashboards for JIH Healthcare — business metrics, vendor performance, and B2B outreach reporting',
      '10+ structured certifications across BA, BI, and AI — building current, market-aligned capability',
      'FinBridge portfolio project — end-to-end BA documentation for a loan origination system grounded in Indian fintech infrastructure (OCEN, Account Aggregator, UPI)',
    ],
    detail: [
      'Zoho CRM and n8n automation pipelines — JIH Healthcare and Ajinkya Technologies workflow automation',
      'Market research and vendor evaluation for B2B import of nutraceutical ingredients from Japan',
      'Developing AI-augmented delivery capability — prompt engineering, Copilot Studio, GenAI for BA workflows',
    ],
    skills: ['Power BI', 'DAX', 'Zoho CRM', 'n8n', 'AI-Augmented Delivery', 'Prompt Engineering', 'Market Research', 'Business Development'],
  },
]

function CardContent({ card }: { card: typeof CARDS[number] }) {
  const [hovered, setHovered] = useState(false)
  const mono = { fontFamily: 'var(--font-jetbrains)' } as const

  return (
    <div
      className="exp-card-inner"
      style={{ display: 'flex', flexDirection: 'column', height: '100%', position: 'relative' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Hover backlit glow */}
      <div style={{
        position:     'absolute',
        inset:         0,
        zIndex:        0,
        pointerEvents: 'none',
        background:   'radial-gradient(ellipse 120% 120% at 50% 50%, rgba(255,248,225,0.10) 0%, rgba(255,248,225,0.04) 50%, transparent 100%)',
        opacity:       hovered ? 1 : 0,
        transition:   'opacity 400ms ease',
      }} />

      <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Company — primary line */}
        <div style={{ fontFamily: 'var(--font-fraunces)', fontSize: 'clamp(22px,2.5vw,30px)', fontWeight: 400, color: '#F2F0EB', lineHeight: 1.2, marginBottom: '4px' }}>
          {card.companyPrimary}
        </div>
        {/* Company — secondary line */}
        <div style={{ ...mono, fontSize: 'clamp(11px,1.2vw,13px)', color: 'rgba(242,240,235,0.45)', marginTop: '4px', marginBottom: '4px' }}>
          {card.companySub}
        </div>
        <div style={{ ...mono, fontSize: '10px', color: 'rgba(242,240,235,0.30)', marginBottom: '12px' }}>{card.tenure}</div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '14px' }}>
          {card.tags.map((tag) => (
            <span key={tag} style={{ ...mono, fontSize: '9px', letterSpacing: '0.8px', color: '#FF5A00', border: '1px solid rgba(255,90,0,0.25)', padding: '3px 8px', borderRadius: 0 }}>
              {tag}
            </span>
          ))}
        </div>

        {/* All bullets flat */}
        <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '14px' }}>
          {card.highlights.map((h, i) => (
            <li key={`h-${i}`} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
              <span style={{ color: 'var(--accent)', flexShrink: 0, marginTop: '3px', fontSize: '10px' }}>▸</span>
              <span style={{ fontFamily: 'var(--font-geist)', fontSize: '14px', color: 'rgba(242,240,235,0.65)', lineHeight: 1.7 }}>{h}</span>
            </li>
          ))}
          {card.detail.map((d, i) => (
            <li key={`d-${i}`} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
              <span style={{ color: 'rgba(255,90,0,0.5)', flexShrink: 0, marginTop: '2px', fontSize: '10px' }}>›</span>
              <span style={{ fontFamily: 'var(--font-geist)', fontSize: '13px', color: 'rgba(242,240,235,0.45)', lineHeight: 1.6 }}>{d}</span>
            </li>
          ))}
        </ul>

        {/* Skills line */}
        <div style={{ ...mono, fontSize: '11px', color: 'rgba(242,240,235,0.35)', lineHeight: 1.6 }}>
          <span style={{ color: 'var(--accent)' }}>SKILLS</span>
          <span style={{ marginLeft: '8px' }}>
            {card.skills.map((s, i) => (
              <span key={i}>
                {s}
                {i < card.skills.length - 1 && <span style={{ color: '#FF5A00', margin: '0 6px' }}>·</span>}
              </span>
            ))}
          </span>
        </div>
      </div>
    </div>
  )
}

export default function Experience() {
  const sectionRef    = useRef<HTMLElement>(null)
  const leftInfoRef   = useRef<HTMLDivElement>(null)
  const cardRefs      = useRef<(HTMLDivElement | null)[]>([])
  const activeCardRef = useRef(0)

  const [activeCard, setActiveCard] = useState(0)
  const [shownCard,  setShownCard]  = useState(0)
  const [showArrows, setShowArrows] = useState(false)

  // Fade left-panel content out → swap → fade in
  useEffect(() => {
    const el = leftInfoRef.current
    if (!el) { setShownCard(activeCard); return }
    gsap.killTweensOf(el)
    gsap.to(el, {
      opacity: 0,
      duration: 0.2,
      onComplete: () => {
        setShownCard(activeCard)
        requestAnimationFrame(() => gsap.to(el, { opacity: 1, duration: 0.2 }))
      },
    })
  }, [activeCard])

  useEffect(() => {
    const section   = sectionRef.current
    if (!section) return
    const isDesktop = window.innerWidth >= 768

    const animateCardIn = (inner: Element) => {
      const content = inner.querySelector('[data-card-content]')
      const target  = content ? Array.from(content.children) : Array.from(inner.children)
      gsap.fromTo(target, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, stagger: 0.08, ease: 'power2.out' })
    }

    const ctx = gsap.context(() => {
      if (isDesktop) {
        ScrollTrigger.create({
          trigger: section,
          start:   'top top',
          end:     'bottom bottom',
          snap: {
            snapTo:   1 / (CARDS.length - 1),
            duration: { min: 0.3, max: 0.5 },
            ease:     'power1.inOut',
          },
          onUpdate: (self) => {
            const idx = Math.round(self.progress * (CARDS.length - 1))
            if (idx !== activeCardRef.current) {
              activeCardRef.current = idx
              setActiveCard(idx)
            }
          },
          onToggle: (self) => setShowArrows(self.isActive),
        })

        const firstInner = cardRefs.current[0]?.querySelector('.exp-card-inner')
        if (firstInner) {
          ScrollTrigger.create({
            trigger: section,
            start:   'top 80%',
            once:    true,
            onEnter: () => animateCardIn(firstInner),
          })
        }
      }

      cardRefs.current.forEach((cardEl, i) => {
        if (!cardEl || (i === 0 && isDesktop)) return
        const inner = cardEl.querySelector('.exp-card-inner')
        if (!inner) return
        ScrollTrigger.create({
          trigger: cardEl,
          start:   isDesktop ? 'top 40%' : 'top 80%',
          onEnter:    () => animateCardIn(inner),
          ...(isDesktop ? { onEnterBack: () => animateCardIn(inner) } : {}),
        })
      })
    }, section)

    return () => ctx.revert()
  }, [])

  const goToCard = (index: number) => {
    const el = cardRefs.current[index]
    if (!el) return
    window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - NAV_H, behavior: 'smooth' })
  }

  const mono        = { fontFamily: 'var(--font-jetbrains)' } as const
  const displayData = CARDS[shownCard]
  const counter     = `${String(shownCard + 1).padStart(2, '0')} / ${String(CARDS.length).padStart(2, '0')}`

  return (
    <>
      <section id="work" ref={sectionRef} style={{ background: 'var(--bg)', position: 'relative' }}>

        {/* Mobile-only label */}
        <div
          className="exp-mobile-label"
          style={{ display: 'none', padding: 'clamp(60px,8vw,100px) clamp(24px,5vw,48px) 32px', ...mono, fontSize: '10px', letterSpacing: '1.2px', color: 'var(--accent)', textTransform: 'uppercase' }}
        >
          // 02 EXPERIENCE
        </div>

        <div style={{ display: 'flex' }}>

          {/* ── LEFT PANEL ───────────────────────────────────── */}
          <div
            className="exp-left"
            style={{
              width:                '32%',
              position:             'sticky',
              top:                   0,
              height:               '100vh',
              borderRight:          '1px solid rgba(255,255,255,0.07)',
              background:           'rgba(17,17,17,0.6)',
              backdropFilter:       'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              display:              'flex',
              flexDirection:        'column',
              padding:              'clamp(40px,5vw,72px) clamp(20px,2.5vw,40px)',
              flexShrink:            0,
              boxSizing:            'border-box',
              overflow:             'hidden',
            }}
          >
            <div style={{ ...mono, fontSize: '10px', letterSpacing: '1.2px', color: 'var(--accent)', textTransform: 'uppercase', marginBottom: '48px' }}>
              // 02 EXPERIENCE
            </div>

            {/* Fading content block — logo, role, tenure */}
            <div ref={leftInfoRef} style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
              <div style={{ fontFamily: 'var(--font-fraunces)', fontSize: '48px', fontWeight: 400, color: 'rgba(242,240,235,0.15)', lineHeight: 1, marginBottom: '32px' }}>
                {counter}
              </div>

              {/* Logo or AK. wordmark */}
              <div style={{ marginBottom: '12px' }}>
                {displayData.logo ? (
                  <img
                    src={displayData.logo}
                    alt={displayData.companyPrimary}
                    style={{ width: '48px', height: '48px', objectFit: 'contain', display: 'block' }}
                  />
                ) : (
                  <span style={{ fontFamily: 'var(--font-fraunces)', fontSize: '24px', fontWeight: 400, color: '#FF5A00', lineHeight: 1 }}>
                    AK<span style={{ color: '#FF5A00' }}>.</span>
                  </span>
                )}
              </div>

              {/* Role title */}
              <div style={{ fontFamily: 'var(--font-fraunces)', fontSize: 'clamp(18px,2vw,24px)', fontWeight: 400, color: '#F2F0EB', lineHeight: 1.25, marginBottom: '10px' }}>
                {displayData.role}
              </div>
              <div style={{ ...mono, fontSize: '10px', color: 'rgba(242,240,235,0.35)' }}>
                {displayData.tenure}
              </div>
            </div>

            {/* Dot indicators */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {CARDS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goToCard(i)}
                  aria-label={`Go to experience ${i + 1}`}
                  style={{
                    width:        '5px',
                    height:       '5px',
                    borderRadius: '50%',
                    background:    i === activeCard ? '#FF5A00' : 'rgba(255,90,0,0.25)',
                    border:       'none',
                    padding:       0,
                    cursor:       'pointer',
                    flexShrink:    0,
                    transition:   'background 0.3s ease',
                  }}
                />
              ))}
            </div>
          </div>

          {/* ── RIGHT PANEL ──────────────────────────────────── */}
          <div className="exp-right" style={{ width: '68%' }}>
            {CARDS.map((card, i) => (
              <div
                key={i}
                ref={(el) => { cardRefs.current[i] = el }}
                className="exp-card"
                style={{
                  height:               '100vh',
                  padding:               CARD_PAD,
                  background:           'rgba(17,17,17,0.5)',
                  backdropFilter:       'blur(8px)',
                  WebkitBackdropFilter: 'blur(8px)',
                  borderLeft:           '1px solid rgba(255,255,255,0.07)',
                  borderBottom:          i < CARDS.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none',
                  overflow:             'hidden',
                  boxSizing:            'border-box',
                  scrollMarginTop:      `${NAV_H}px`,
                  position:             'relative',
                }}
              >
                <CardContent card={card} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Navigation arrows (fixed, desktop only) ──────── */}
      {showArrows && (
        <div
          className="exp-arrows"
          style={{ position: 'fixed', bottom: '40px', left: '32%', width: '68%', display: 'flex', justifyContent: 'center', gap: '8px', zIndex: 100 }}
        >
          <button
            onClick={() => activeCard > 0 && goToCard(activeCard - 1)}
            style={{
              ...mono, fontSize: '14px',
              border: '1px solid rgba(255,255,255,0.15)', padding: '6px 14px',
              background: 'transparent', color: 'rgba(242,240,235,0.6)',
              cursor: activeCard === 0 ? 'default' : 'pointer',
              opacity: activeCard === 0 ? 0.3 : 1,
              borderRadius: 0, transition: 'border-color 0.2s, opacity 0.2s',
            }}
            onMouseEnter={(e) => { if (activeCard > 0) (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.35)' }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.15)' }}
          >←</button>
          <button
            onClick={() => activeCard < CARDS.length - 1 && goToCard(activeCard + 1)}
            style={{
              ...mono, fontSize: '14px',
              border: '1px solid rgba(255,255,255,0.15)', padding: '6px 14px',
              background: 'transparent', color: 'rgba(242,240,235,0.6)',
              cursor: activeCard === CARDS.length - 1 ? 'default' : 'pointer',
              opacity: activeCard === CARDS.length - 1 ? 0.3 : 1,
              borderRadius: 0, transition: 'border-color 0.2s, opacity 0.2s',
            }}
            onMouseEnter={(e) => { if (activeCard < CARDS.length - 1) (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.35)' }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.15)' }}
          >→</button>
        </div>
      )}

      <style>{`
        html { scroll-padding-top: ${NAV_H}px; }
        @media (max-width: 767px) {
          .exp-left         { display: none !important; }
          .exp-right        { width: 100% !important; }
          .exp-mobile-label { display: block !important; }
          .exp-card         { height: auto !important; padding: 28px 20px !important; border-bottom: 1px solid rgba(255,255,255,0.07) !important; scroll-margin-top: 0 !important; }
          .exp-arrows       { display: none !important; }
        }
      `}</style>
    </>
  )
}
