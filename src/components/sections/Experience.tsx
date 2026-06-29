'use client'
import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const NAV_H    = 72
const CARD_PAD = `${NAV_H + 16}px 32px 32px`

const CARDS = [
  {
    logo:           null,
    companyPrimary: 'Independent Consulting',
    companySub:     'Self-directed · Feb 2021 – Present',
    role:           'Independent Analyst & Consultant | Business, Data & Markets',
    tenure:         'Feb 2021 – Present',
    tags:           ['CONSULTING', 'POWER BI', 'AI-AUGMENTED'],
    summary: [
      'Built Power BI reports and dashboards for JIH Healthcare — business metrics, vendor performance, and B2B outreach reporting for management decision-making',
      'Delivered independent engagements across market research, operational analysis, and vendor evaluation — producing structured reports and recommendations',
      '10+ certifications across BA, Power BI, AI, Agile, and Strategy — applied directly to active client and portfolio work',
    ],
    groups: [
      {
        label: 'Data & Analytics',
        bullets: [
          'Built Power BI reports and dashboards for JIH Healthcare — covering business metrics tracking, vendor performance monitoring, and B2B outreach reporting for management decision-making',
          'Delivered hands-on BI work across dashboard design, data modelling, and KPI reporting for client engagements',
          'Built structured Power BI capability through a certification pathway (Desktop, Service, Advanced DAX) — applied directly to active client and portfolio work',
        ],
      },
      {
        label: 'Consulting & Research',
        bullets: [
          'Delivered independent engagements across market research, operational analysis, and vendor evaluation — producing structured reports and recommendations for client decision-making',
          'Supported B2B development activities including client research, performance reporting, and business analysis scoping',
        ],
      },
      {
        label: 'Markets',
        bullets: [
          'Applied technical analysis and price action strategies to identify trade opportunities in equities and F&O',
          'Managed risk assessment and trade execution across volatile market conditions — maintained structured performance logs for ongoing strategy review',
        ],
      },
      {
        label: 'Certifications & Portfolio',
        bullets: [
          '10+ certifications completed across BA, Power BI, AI, Agile, and Strategy (BACentric, Microsoft, Maven Analytics, Google, IBM, McKinsey)',
          'Active portfolio: FinBridge (Indian fintech BA/BI project) + BACentric capstone projects (Procurement Portal, Library Portal)',
        ],
      },
    ],
    skills: ['Power BI', 'DAX', 'Zoho CRM', 'n8n', 'AI-Augmented Delivery', 'Prompt Engineering', 'Market Research', 'Business Development'],
  },
  {
    logo:           '/Logos/sppu.png',
    companyPrimary: 'Savitribai Phule Pune University',
    companySub:     'Tribal Development Dept., Govt. of Maharashtra',
    role:           'Sr. Project Consultant',
    tenure:         'Nov 2018 – Aug 2021',
    tags:           ['GOVERNMENT', 'ANALYTICS PLATFORM', 'ARTICLE 275(1)'],
    summary: [
      '₹855.16L centrally-funded analytics initiative covering ~1 crore tribal beneficiaries across Maharashtra',
      '35+ government stakeholder touchpoints — Secretary and Commissioner level through to 29 district project offices',
      'Full BA+BI delivery for Swayam & Hostel module — successfully deployed for TDD staff',
    ],
    groups: [
      {
        label: 'Stakeholder Engagement & Requirement Gathering',
        bullets: [
          'Managed 35+ government touchpoints — Secretary and Commissioner level through to 4 Additional Tribal Commissioners and 29 district project offices across Maharashtra',
          'Facilitated structured requirement workshops, stakeholder interviews, and group sessions across TDD, TRTI, and field offices',
          'Coordinated with government IT vendors (Mahaonline, Probity Soft, NIC) on data structures, system constraints, and integration requirements',
        ],
      },
      {
        label: 'Business Analysis & Requirements',
        bullets: [
          'Mapped AS-IS workflows and data flows across 6 live TDD welfare applications — identified fragmentation points and consolidation priorities for the analytics platform',
          'Defined functional and non-functional requirements across data consolidation, fund flow tracking, beneficiary validation, and scheme reporting',
          "Built domain knowledge across Maharashtra's tribal welfare landscape — scholarship, hostel, ST certificate, DBT, and fund management schemes across 29 ITDPs",
        ],
      },
      {
        label: 'Analytics Delivery — Swayam & Hostel Module',
        bullets: [
          'Delivered full BA and BI scope — requirements, KPIs, dashboard specifications, and data visualisation covering hostel admissions, scholarships, fund allocation, and student data flows',
          'Collaborated with development teams through build; facilitated user feedback sessions and stakeholder reviews',
          'Supported testing and sign-off — Swayam & Hostel module successfully deployed for TDD staff',
        ],
      },
      {
        label: 'Project Governance',
        bullets: [
          'Maintained requirement traceability, managed budget reappropriation, and handled utilisation certificate submissions',
          'Navigated vendor delays, hardware constraints, and frequent stakeholder transitions through documentation discipline and structured follow-up',
        ],
      },
      {
        label: 'Training & Documentation',
        bullets: [
          'Developed training materials and user documentation to support platform onboarding across TDD staff',
          'Maintained stakeholder communication and requirement consistency across a multi-year, multi-agency engagement',
        ],
      },
    ],
    skills: ['Business Analysis', 'Stakeholder Management', 'Requirements Elicitation', 'BRD', 'User Stories', 'KPI Definition', 'Dashboard Design', 'AS-IS / TO-BE', 'Vendor Coordination', 'Budget Governance'],
  },
  {
    logo:           '/Logos/opine-group.png',
    companyPrimary: 'Opine Group',
    companySub:     'Deployed at Sarvatra Technologies (BFSI/Fintech)',
    role:           'Business Intelligence Analyst',
    tenure:         'May 2017 – Oct 2018',
    tags:           ['BFSI', 'BI DELIVERY', 'FULL LIFECYCLE'],
    summary: [
      'Operated as the sole on-site BA and BI resource — independently owned full delivery lifecycle from requirements through to sign-off, with no on-site team support',
      'Replaced fragmented manual reporting with a centralised SSRS dashboard — report generation reduced from hours to minutes',
      'Integrated TallyERP and Excel into a unified dimensional data model via SSIS ETL',
    ],
    groups: [
      {
        label: 'Requirement Gathering & Gap Analysis',
        bullets: [
          'Operated as the sole on-site BA and BI resource — independently owning end-to-end delivery from initial requirement workshops through to dashboard sign-off, with no on-site team support',
          'Conducted requirement workshops with Finance, Accounts, and Senior Management — defining dashboard objectives, KPIs, and reporting needs including revenue trends, settlement timelines, AR tracking, and financial reconciliation',
          'Performed gap analysis across fragmented Finance and Accounts reporting processes — identifying manual consolidation inefficiencies, reconciliation inconsistencies, and lack of real-time visibility',
          'Defined structured functional requirements, data dictionary, and ERDs — ensuring full traceability from business requirement through to dashboard output',
        ],
      },
      {
        label: 'Technical Implementation',
        bullets: [
          'Designed a dimensional data model to support financial reporting requirements — integrating TallyERP and Excel sources into a unified, consolidated reporting layer',
          'Built ETL pipelines (SSIS) and SQL queries to enable reliable, automated data flow from source systems into the reporting layer',
          'Developed a centralised finance dashboard and multiple SSRS analytics reports — covering revenue, expenses, AR, dues tracking, and monthly/quarterly management reviews',
          'Created and maintained full project documentation — BRDs, functional specifications, ERDs, data dictionaries, and process workflows — ensuring requirement traceability throughout delivery',
        ],
      },
      {
        label: 'UAT & Deployment',
        bullets: [
          'Designed test scenarios and validation criteria to ensure dashboard accuracy against TallyERP and Excel source data',
          'Executed UAT with Finance and Senior Management stakeholders — validating all dashboard outputs and SSRS report figures against source records',
          'Managed feedback cycles, implemented refinements, and obtained formal stakeholder sign-off before deployment',
        ],
      },
      {
        label: 'Outcomes',
        bullets: [
          'Eliminated manual financial report consolidation — significantly reducing time, effort, and error risk across Finance and Accounts operations',
          'Reduced financial report generation time from hours to minutes — enabling faster analysis and more timely management decision-making',
          'Finance and Accounts teams gained real-time visibility into revenue, AR, dues, and settlement KPIs — replacing fragmented and delayed manual reporting',
        ],
      },
    ],
    skills: ['Power BI', 'SQL', 'SSRS', 'SSIS', 'ETL', 'Dimensional Modelling', 'DAX', 'UAT', 'Requirements Elicitation', 'Gap Analysis'],
  },
  {
    logo:           '/Logos/texcarp.png',
    companyPrimary: 'TexCarp Consulting',
    companySub:     'Part-time · UK Engagement',
    role:           'Consultant',
    tenure:         'Jun 2015 – Jan 2016',
    tags:           ['CONSULTING', 'B2B', 'UK ENGAGEMENT'],
    summary: [
      'Conducted client calls to understand business needs — served as the primary point of contact for client-facing engagements',
      'Contributed to website redesign by gathering requirements, documenting specifications, and coordinating with development teams',
      'Supported B2B client research, database compilation, process documentation, and training delivery for a UK-based consulting engagement',
    ],
    groups: [
      {
        label: 'Client Engagement & Requirements',
        bullets: [
          'Conducted client calls to understand business needs and gather requirements — serving as the primary point of contact for client-facing engagements',
          'Contributed to website redesign by gathering requirements, documenting specifications, and coordinating with development teams through delivery',
          'Designed and implemented data collection methods tailored to specific client requirements',
          'Supported B2B client research, database compilation, process documentation, and training delivery for a UK-based consulting engagement',
        ],
      },
      {
        label: 'Analysis & Reporting',
        bullets: [
          'Gathered, analysed, and validated data — ensuring accuracy and relevance for client deliverables',
          'Assisted in digital marketing efforts — including campaign analysis and performance tracking',
          'Developed reports and insights, presenting findings to clients and management to support business decision-making',
        ],
      },
    ],
    skills: ['Requirements Gathering', 'Data Analysis', 'Client Engagement', 'Reporting', 'Digital Marketing'],
  },
  {
    logo:           '/Logos/mahalaxmi.png',
    companyPrimary: 'Mahalaxmi Co-Op Yarn Processors',
    companySub:     'Garment Division',
    role:           'Business & Operations Manager',
    tenure:         'Jun 2013 – Mar 2015',
    tags:           ['OPERATIONS', 'MANUFACTURING', 'GARMENTS'],
    summary: [
      'Led installation and commissioning of machinery for a new production unit — ensuring equipment met Fit for Use authorisation before go-live',
      'Managed garment manufacturing, quality control, HR operations, and process governance across a 50+ person unit',
      'Tracked KPIs across output, defect levels, delivery timelines, and employee performance — maintaining visibility for operational decision-making',
    ],
    groups: [
      {
        label: 'Operations Management',
        bullets: [
          "Led the installation and commissioning of machinery for a new production unit — ensuring equipment met 'Fit for Use' authorisation and operational standards before go-live",
          'Managed garment manufacturing, quality control, HR operations, and process governance across a 50+ person unit — ensuring smooth cross-functional coordination and compliance with industry standards',
          "Led new children's wear product line launch — coordinating across production, quality, and commercial functions from inception through to market-ready delivery",
        ],
      },
      {
        label: 'Process Analysis & Performance Tracking',
        bullets: [
          'Collected and analysed operational performance data to assess production efficiency, identify bottlenecks, and drive process improvements',
          'Conducted business process analysis to evaluate the effectiveness of existing systems and procedures against short-term and long-term business goals',
          'Tracked KPIs across output, defect levels, delivery timelines, and employee performance — maintaining visibility for operational decision-making',
        ],
      },
      {
        label: 'Strategic & Decision Support',
        bullets: [
          'Assisted in strategic planning and decision-making — assessing resource availability, risk factors, and operational constraints to optimise business outcomes',
          'Managed cross-functional operations spanning manufacturing, quality control, HR, and compliance — ensuring integrated delivery across the garment unit',
        ],
      },
    ],
    skills: ['Operations Management', 'Process Analysis', 'KPI Tracking', 'Manufacturing', 'Quality Control'],
  },
  {
    logo:           '/Logos/brintons.png',
    companyPrimary: 'Brintons Carpets',
    companySub:     'India Design/Service Centre',
    role:           'Process Improvement Leader',
    tenure:         'Jul 2010 – Apr 2013',
    tags:           ['PROCESS IMPROVEMENT', 'MANUFACTURING', 'GLOBAL'],
    summary: [
      'Reduced Internal Badly Defective (IBD) levels by ~70% through SOP development, quality checkpoint implementation, and change management',
      'Owned BOS KPI reporting framework — reported directly to GM and Executive Director of Group Operations',
      'Led structured RCA investigations using 8D methodology and Kaizen events across Americas, EMEA, and Asia Pacific operations',
    ],
    groups: [
      {
        label: 'KPI Reporting & Performance Framework',
        bullets: [
          'Owned the BOS (Brintons Operating System) KPI reporting framework — designing and maintaining performance dashboards tracking quality metrics and customer complaint trends across global operations',
          'Reported directly to the Service Centre General Manager and Executive Director of Group Operations — translating operational data into management-ready reporting for senior leadership',
          'Conducted end-to-end AS-IS/TO-BE process mapping and workflow analysis across Service Centre departments — identifying data and reporting gaps to support continuous improvement',
          'Developed and implemented KPIs to measure process effectiveness — enabling data-driven decision-making across Design, Production, Planning, and Quality functions',
        ],
      },
      {
        label: 'Root Cause Analysis & Process Improvement',
        bullets: [
          'Led structured RCA investigations and process improvement initiatives — using 8D methodology and SWOT analysis to identify root causes and drive corrective action',
          'Reduced Internal Badly Defective (IBD) levels by approximately 70% through SOP development, quality checkpoint implementation, and change management',
          'Managed Process Change Authorisation — ensuring modifications were backed by data, formally documented with SOPs, and aligned with business objectives before implementation',
          'Identified opportunities for data-driven process improvements by analysing operational data, business trends, and performance metrics',
          'Supported process owners in ensuring business conformance and adherence to best practices, policies, and industry standards',
        ],
      },
      {
        label: 'Stakeholder Engagement & Facilitation',
        bullets: [
          'Facilitated stakeholder meetings and workshops across Sales, Project Management, HR, Operations, Quality, Design, and Administration — driving cross-functional process alignment',
          'Conducted stakeholder analysis and gathered insights from cross-functional teams to define and prioritise process enhancements',
          'Facilitated large and small-scale improvement initiatives including Kaizen events — driving standardisation and building process capability across the Service Centre',
        ],
      },
      {
        label: 'Documentation & Standards',
        bullets: [
          'Created process documentation and reports — including business process models, requirement specifications, and SOPs to support decision-making and operational efficiency',
          'Gathered and documented business requirements by working closely with stakeholders across multiple functions — ensuring alignment with organisational goals',
          'Built and maintained a corrective action tracking system to monitor identified issues and implemented fixes through to resolution',
        ],
      },
    ],
    skills: ['RCA', 'SOP Development', 'KPI Reporting', 'Process Mapping', 'Change Management', 'Stakeholder Engagement', 'Kaizen'],
  },
]

function CardContent({ card, onNextCard }: { card: typeof CARDS[number]; onNextCard?: () => void }) {
  const [expanded, setExpanded] = useState(false)
  const [hovered,  setHovered]  = useState(false)
  const mono = { fontFamily: 'var(--font-jetbrains)' } as const

  const handleNextRole = () => {
    setExpanded(false)
    onNextCard?.()
  }

  return (
    <div className="exp-card-inner" style={{ height: '100%' }}>
      <div
        className="exp-card-wrapper"
        style={{
          position:      'relative',
          width:         '100%',
          height:        '100%',
          padding:       '32px',
          boxSizing:     'border-box',
          display:       'flex',
          flexDirection: 'column',
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Hover glow — constrained to content wrapper */}
        <div style={{
          position:      'absolute',
          inset:          0,
          zIndex:         0,
          pointerEvents: 'none',
          background:    'radial-gradient(ellipse 200% 200% at 50% 30%, rgba(255,248,225,0.07) 0%, rgba(255,248,225,0.03) 40%, transparent 70%)',
          opacity:        hovered ? 1 : 0,
          transition:    'opacity 500ms ease',
        }} />

        <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', height: '100%' }}>

          {/* ── Fixed header block ───────────────────────────── */}
          <div style={{ flexShrink: 0 }}>
            <div style={{ fontFamily: 'var(--font-geist)', fontSize: '24px', fontWeight: 500, color: '#F2F0EB', lineHeight: 1.2, marginBottom: '4px' }}>
              {card.companyPrimary}
            </div>
            <div style={{ fontFamily: 'var(--font-geist)', fontSize: '22px', fontWeight: 400, color: 'rgba(242,240,235,0.50)', marginTop: '4px', marginBottom: '4px' }}>
              {card.companySub}
            </div>
            <div style={{ ...mono, fontSize: '11px', color: 'rgba(242,240,235,0.30)', marginBottom: '12px' }}>
              {card.tenure}
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '14px' }}>
              {card.tags.map((tag) => (
                <span key={tag} style={{ ...mono, fontSize: '11px', letterSpacing: '0.8px', color: '#FF5A00', border: '1px solid rgba(255,90,0,0.25)', padding: '3px 8px', borderRadius: 0 }}>
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* ── Scrollable content area ──────────────────────── */}
          <div
            className="exp-card-scroll"
            style={{
              flex:               1,
              overflowY:          expanded ? 'auto' : 'hidden',
              overscrollBehavior: 'contain',
              paddingRight:       expanded ? '6px' : 0,
              minHeight:          0,
            }}
          >
            {expanded ? (
              /* Full grouped content */
              <div>
                {card.groups.map((group, gi) => (
                  <div key={gi} style={{ marginBottom: '20px' }}>
                    <div style={{ ...mono, fontSize: '10px', letterSpacing: '1.2px', color: 'rgba(255,90,0,0.65)', textTransform: 'uppercase', marginBottom: '8px' }}>
                      {group.label}
                    </div>
                    <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      {group.bullets.map((b, bi) => (
                        <li key={bi} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                          <span style={{ color: 'var(--accent)', flexShrink: 0, marginTop: '3px', fontSize: '11px' }}>▸</span>
                          <span style={{ fontFamily: 'var(--font-geist)', fontSize: '13px', color: 'rgba(242,240,235,0.65)', lineHeight: 1.6 }}>{b}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
                {/* Skills line — at bottom of scrollable content */}
                <div style={{ ...mono, fontSize: '11px', color: 'rgba(242,240,235,0.35)', lineHeight: 1.6, paddingTop: '12px', marginTop: '4px', borderTop: '1px solid rgba(255,255,255,0.07)' }}>
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
            ) : (
              /* Summary view */
              <div>
                <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '14px' }}>
                  {card.summary.map((s, i) => (
                    <li key={i} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                      <span style={{ color: 'var(--accent)', flexShrink: 0, marginTop: '3px', fontSize: '11px' }}>▸</span>
                      <span style={{ fontFamily: 'var(--font-geist)', fontSize: '14px', color: 'rgba(242,240,235,0.65)', lineHeight: 1.7 }}>{s}</span>
                    </li>
                  ))}
                </ul>
                <div style={{ height: '8px' }} />
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
            )}
          </div>

          {/* ── Bottom bar — always visible ──────────────────── */}
          <div
            className="exp-card-bar"
            style={{
              flexShrink:     0,
              paddingTop:    '12px',
              marginTop:     '12px',
              borderTop:     '1px solid rgba(255,255,255,0.07)',
              display:       'flex',
              justifyContent: expanded ? 'space-between' : 'flex-start',
              alignItems:    'center',
            }}
          >
            {expanded ? (
              <>
                <button
                  onClick={() => setExpanded(false)}
                  style={{ ...mono, fontSize: '11px', letterSpacing: '0.5px', color: 'rgba(242,240,235,0.40)', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
                >
                  ↑ Collapse
                </button>
                {onNextCard && (
                  <button
                    onClick={handleNextRole}
                    style={{ ...mono, fontSize: '11px', letterSpacing: '0.5px', color: 'var(--accent)', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
                  >
                    Next role →
                  </button>
                )}
              </>
            ) : (
              <button
                onClick={() => setExpanded(true)}
                style={{ ...mono, fontSize: '11px', letterSpacing: '0.5px', color: 'rgba(242,240,235,0.35)', background: 'none', border: 'none', cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center', gap: '5px' }}
              >
                <span>↓ View full detail</span>
              </button>
            )}
          </div>

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
          style={{ display: 'none', padding: 'clamp(60px,8vw,100px) clamp(24px,5vw,48px) 32px', ...mono, fontSize: '12px', fontWeight: 700, letterSpacing: '1.2px', color: 'var(--accent)', textTransform: 'uppercase' }}
        >
          // 02 EXPERIENCE
        </div>

        <div style={{ display: 'flex' }}>

          {/* ── LEFT PANEL ───────────────────────────────────── */}
          <div
            className="exp-left"
            style={{
              width:         '32%',
              position:      'sticky',
              top:            0,
              height:        '100vh',
              borderRight:   '1px solid rgba(255,255,255,0.07)',
              background:    'var(--bg)',
              display:       'flex',
              flexDirection: 'column',
              padding:       'clamp(40px,5vw,72px) clamp(20px,2.5vw,40px)',
              flexShrink:     0,
              boxSizing:     'border-box',
              overflow:      'hidden',
            }}
          >
            <div style={{ ...mono, fontSize: '12px', fontWeight: 700, letterSpacing: '1.2px', color: 'var(--accent)', textTransform: 'uppercase', marginBottom: '48px' }}>
              // 02 EXPERIENCE
            </div>

            {/* Fading content block */}
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
                    style={{ width: '96px', height: '96px', objectFit: 'contain', display: 'block' }}
                  />
                ) : (
                  <span style={{ fontFamily: 'var(--font-fraunces)', fontSize: '24px', fontWeight: 400, color: '#FF5A00', lineHeight: 1 }}>
                    AK<span style={{ color: '#FF5A00' }}>.</span>
                  </span>
                )}
              </div>

              {/* Role title */}
              <div style={{ fontFamily: 'var(--font-fraunces)', fontSize: '26px', fontWeight: 400, color: '#F2F0EB', lineHeight: 1.25, marginBottom: '10px' }}>
                {displayData.role}
              </div>
              <div style={{ ...mono, fontSize: '11px', color: 'rgba(242,240,235,0.35)' }}>
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
                  padding:               0,
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
                <CardContent
                  card={card}
                  onNextCard={i < CARDS.length - 1 ? () => goToCard(i + 1) : undefined}
                />
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

        /* Thin orange scrollbar for expanded cards */
        .exp-card-scroll::-webkit-scrollbar { width: 3px; }
        .exp-card-scroll::-webkit-scrollbar-track { background: transparent; }
        .exp-card-scroll::-webkit-scrollbar-thumb { background: rgba(255,90,0,0.35); border-radius: 2px; }
        .exp-card-scroll { scrollbar-width: thin; scrollbar-color: rgba(255,90,0,0.35) transparent; }

        @media (max-width: 767px) {
          .exp-left         { display: none !important; }
          .exp-right        { width: 100% !important; }
          .exp-mobile-label { display: block !important; }
          .exp-card         { height: auto !important; padding: 28px 20px !important; border-bottom: 1px solid rgba(255,255,255,0.07) !important; scroll-margin-top: 0 !important; overflow: visible !important; }
          .exp-arrows       { display: none !important; }
          /* On mobile, card wrapper fills height naturally */
          .exp-card-wrapper { height: auto !important; }
          /* Show all content on mobile — no expand needed */
          .exp-card-scroll  { overflow: visible !important; height: auto !important; }
          .exp-card-bar     { display: none !important; }
        }
      `}</style>
    </>
  )
}
