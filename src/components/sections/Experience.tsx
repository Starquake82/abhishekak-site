'use client'
import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const CARDS = [
  {
    role:       'Process Improvement Leader',
    company:    'Brintons Carpets · India Design/Service Centre',
    tenure:     'Jul 2010 – Apr 2013',
    tags:       ['PROCESS IMPROVEMENT', 'MANUFACTURING', 'GLOBAL'],
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
  },
  {
    role:       'Business & Operations Manager',
    company:    'Mahalaxmi Co-Op Yarn Processors Ltd. · Garment Division',
    tenure:     'Jun 2013 – Mar 2015',
    tags:       ['OPERATIONS', 'MANUFACTURING', 'GARMENTS'],
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
  },
  {
    role:       'Consultant',
    company:    'TexCarp Consulting Pvt. Ltd.',
    tenure:     'Jun 2015 – Jan 2016 (Part-time)',
    tags:       ['CONSULTING', 'B2B', 'UK ENGAGEMENT'],
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
  },
  {
    role:       'Business Intelligence Analyst',
    company:    'Opine Group · Deployed at Sarvatra Technologies (BFSI/Fintech)',
    tenure:     'May 2017 – Oct 2018',
    tags:       ['BFSI', 'BI DELIVERY', 'FULL LIFECYCLE'],
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
  },
  {
    role:       'Sr. Project Consultant (Business Analyst)',
    company:    'Savitribai Phule Pune University · Tribal Development Dept., Govt. of Maharashtra',
    tenure:     'Nov 2018 – Aug 2021',
    tags:       ['GOVERNMENT', 'ANALYTICS PLATFORM', 'ARTICLE 275(1)'],
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
  },
  {
    role:       'Independent Analyst & Consultant',
    company:    'Self-Employed',
    tenure:     'Feb 2021 – Present',
    tags:       ['CONSULTING', 'POWER BI', 'AI-AUGMENTED'],
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
  },
]

function CardContent({ card }: { card: typeof CARDS[number] }) {
  const [open, setOpen] = useState(false)
  const mono = { fontFamily: 'var(--font-jetbrains)' } as const

  return (
    <div className="exp-card-inner" style={{ display: 'flex', flexDirection: 'column' }}>
      <h4 style={{ fontFamily: 'var(--font-fraunces)', fontSize: 'clamp(22px,2.5vw,30px)', fontWeight: 400, color: '#F2F0EB', marginBottom: '8px', lineHeight: 1.2 }}>
        {card.role}
      </h4>
      <div style={{ ...mono, fontSize: '12px', color: 'rgba(242,240,235,0.50)', marginBottom: '4px' }}>{card.company}</div>
      <div style={{ ...mono, fontSize: '10px', color: 'rgba(242,240,235,0.30)', marginBottom: '20px' }}>{card.tenure}</div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '20px' }}>
        {card.tags.map((tag) => (
          <span key={tag} style={{ ...mono, fontSize: '9px', letterSpacing: '0.8px', color: '#FF5A00', border: '1px solid rgba(255,90,0,0.25)', padding: '3px 8px', borderRadius: 0 }}>
            {tag}
          </span>
        ))}
      </div>

      <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '24px' }}>
        {card.highlights.map((h, i) => (
          <li key={i} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
            <span style={{ color: 'var(--accent)', flexShrink: 0, marginTop: '3px', fontSize: '10px' }}>▸</span>
            <span style={{ fontFamily: 'var(--font-geist)', fontSize: '14px', color: 'rgba(242,240,235,0.65)', lineHeight: 1.7 }}>{h}</span>
          </li>
        ))}
      </ul>

      <div className={`exp-detail${open ? ' open' : ''}`}>
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '14px', marginBottom: '14px' }} />
        <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {card.detail.map((d, i) => (
            <li key={i} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
              <span style={{ color: 'rgba(255,90,0,0.5)', flexShrink: 0, marginTop: '2px', fontSize: '10px' }}>›</span>
              <span style={{ fontFamily: 'var(--font-geist)', fontSize: '13px', color: 'rgba(242,240,235,0.45)', lineHeight: 1.6 }}>{d}</span>
            </li>
          ))}
        </ul>
      </div>

      <button
        onClick={() => setOpen(!open)}
        style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', ...mono, fontSize: '11px', color: 'var(--accent)', letterSpacing: '0.5px', marginTop: '4px', transition: 'opacity 0.2s', alignSelf: 'flex-start' }}
        onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.opacity = '0.7' }}
        onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.opacity = '1' }}
      >
        {open ? '– View less' : '+ View more'}
      </button>
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

  // Fade left-panel text out → swap content → fade in
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
      gsap.fromTo(
        Array.from(inner.children),
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.08, ease: 'power2.out' }
      )
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

        // First card is already in view on section entry — animate immediately
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

      // Cards 1–5 (desktop) and all cards (mobile) animate on scroll
      cardRefs.current.forEach((cardEl, i) => {
        if (!cardEl || (i === 0 && isDesktop)) return
        const inner = cardEl.querySelector('.exp-card-inner')
        if (!inner) return

        ScrollTrigger.create({
          trigger: cardEl,
          start:   isDesktop ? 'top 40%' : 'top 80%',
          onEnter: () => animateCardIn(inner),
          ...(isDesktop ? { onEnterBack: () => animateCardIn(inner) } : {}),
        })
      })
    }, section)

    return () => ctx.revert()
  }, [])

  const goToCard = (index: number) => {
    const el = cardRefs.current[index]
    if (!el) return
    window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY, behavior: 'smooth' })
  }

  const mono        = { fontFamily: 'var(--font-jetbrains)' } as const
  const displayData = CARDS[shownCard]
  const counter     = `${String(shownCard + 1).padStart(2, '0')} / ${String(CARDS.length).padStart(2, '0')}`

  return (
    <>
      <section id="work" ref={sectionRef} style={{ background: 'var(--bg)', position: 'relative' }}>

        {/* Mobile-only section label */}
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
              width:          '32%',
              position:       'sticky',
              top:             0,
              height:         '100vh',
              borderRight:    '1px solid rgba(255,255,255,0.07)',
              background:     'var(--bg)',
              display:        'flex',
              flexDirection:  'column',
              padding:        'clamp(40px,5vw,72px) clamp(20px,2.5vw,40px)',
              flexShrink:      0,
              boxSizing:      'border-box',
            }}
          >
            <div style={{ ...mono, fontSize: '10px', letterSpacing: '1.2px', color: 'var(--accent)', textTransform: 'uppercase', marginBottom: '48px' }}>
              // 02 EXPERIENCE
            </div>

            <div ref={leftInfoRef} style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
              <div style={{ fontFamily: 'var(--font-fraunces)', fontSize: '48px', fontWeight: 400, color: 'rgba(242,240,235,0.15)', lineHeight: 1, marginBottom: '32px' }}>
                {counter}
              </div>
              <div style={{ fontFamily: 'var(--font-fraunces)', fontSize: '18px', fontWeight: 400, color: '#F2F0EB', lineHeight: 1.3, maxWidth: '200px', marginBottom: '12px' }}>
                {displayData.company}
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
                    width:      '5px',
                    height:     '5px',
                    borderRadius: '50%',
                    background: i === activeCard ? '#FF5A00' : 'rgba(255,90,0,0.25)',
                    border:     'none',
                    padding:     0,
                    cursor:     'pointer',
                    flexShrink:  0,
                    transition: 'background 0.3s ease',
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
                  padding:              '48px 40px',
                  background:           'rgba(17,17,17,0.5)',
                  backdropFilter:       'blur(8px)',
                  WebkitBackdropFilter: 'blur(8px)',
                  borderLeft:           '1px solid rgba(255,255,255,0.07)',
                  borderBottom:          i < CARDS.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none',
                  overflow:             'hidden',
                  boxSizing:            'border-box',
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
              ...mono,
              fontSize:    '14px',
              border:      '1px solid rgba(255,255,255,0.15)',
              padding:     '6px 14px',
              background:  'transparent',
              color:       'rgba(242,240,235,0.6)',
              cursor:       activeCard === 0 ? 'default' : 'pointer',
              opacity:      activeCard === 0 ? 0.3 : 1,
              borderRadius: 0,
              transition:  'border-color 0.2s, opacity 0.2s',
            }}
            onMouseEnter={(e) => { if (activeCard > 0) (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.35)' }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.15)' }}
          >
            ←
          </button>
          <button
            onClick={() => activeCard < CARDS.length - 1 && goToCard(activeCard + 1)}
            style={{
              ...mono,
              fontSize:    '14px',
              border:      '1px solid rgba(255,255,255,0.15)',
              padding:     '6px 14px',
              background:  'transparent',
              color:       'rgba(242,240,235,0.6)',
              cursor:       activeCard === CARDS.length - 1 ? 'default' : 'pointer',
              opacity:      activeCard === CARDS.length - 1 ? 0.3 : 1,
              borderRadius: 0,
              transition:  'border-color 0.2s, opacity 0.2s',
            }}
            onMouseEnter={(e) => { if (activeCard < CARDS.length - 1) (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.35)' }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.15)' }}
          >
            →
          </button>
        </div>
      )}

      <style>{`
        .exp-detail { max-height: 0; overflow: hidden; transition: max-height 0.45s ease; }
        .exp-detail.open { max-height: 600px; }
        @media (max-width: 767px) {
          .exp-left         { display: none !important; }
          .exp-right        { width: 100% !important; }
          .exp-mobile-label { display: block !important; }
          .exp-card         { height: auto !important; padding: 32px 24px !important; border-bottom: 1px solid rgba(255,255,255,0.07) !important; }
          .exp-arrows       { display: none !important; }
        }
      `}</style>
    </>
  )
}
