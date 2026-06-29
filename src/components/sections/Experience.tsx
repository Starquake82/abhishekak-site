'use client'
import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const CARD_BG = 'linear-gradient(135deg, rgba(10,8,8,0.45) 0%, rgba(10,8,8,0.30) 100%), rgba(255,255,255,0.06)'

const TIER_A = [
  {
    id:       'iddac',
    role:     'Sr. Project Consultant (Business Analyst)',
    company:  'Savitribai Phule Pune University · Tribal Development Dept., Govt. of Maharashtra',
    tenure:   'Nov 2018 – Aug 2021',
    tags:     ['GOVERNMENT', 'ANALYTICS PLATFORM', 'ARTICLE 275(1)'],
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
    id:       'opine',
    role:     'Business Intelligence Analyst',
    company:  'Opine Group · Deployed at Sarvatra Technologies (BFSI/Fintech)',
    tenure:   'May 2017 – Oct 2018',
    tags:     ['BFSI', 'BI DELIVERY', 'FULL LIFECYCLE'],
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
    id:       'brintons',
    role:     'Process Improvement Leader',
    company:  'Brintons Carpets · India Design/Service Centre',
    tenure:   'Jul 2010 – Apr 2013',
    tags:     ['PROCESS IMPROVEMENT', 'MANUFACTURING', 'GLOBAL'],
    highlights: [
      'Reduced Internal Badly Defective (IBD) levels by ~70% through structured RCA and SOP implementation',
      'Owned BOS KPI reporting framework — reported to GM and Executive Director, Group Operations',
      'PACE Champion — £5K–£10K cost savings (leave encashment initiative)',
    ],
    detail: [
      'Led 8D root cause analysis investigations across Design, Production, Planning, and Quality functions',
      'Developed Process Change Authorisation procedure — embedded as standard practice across the Service Centre',
      'Facilitated Kaizen events and cross-functional improvement workshops across Americas, EMEA, and Asia Pacific',
      'Managed corrective action tracking and QC checkpoints to prevent recurrence on high-value hospitality projects',
    ],
  },
]

const TIER_B = [
  { role: 'Independent Analyst & Consultant', company: 'Self-Employed',                         tenure: 'Feb 2021 – Present' },
  { role: 'Consultant',                        company: 'TexCarp Consulting Pvt. Ltd.',           tenure: 'Jun 2015 – Jan 2016 (Part-time)' },
  { role: 'Business & Operations Manager',     company: 'Mahalaxmi Co-Op Yarn Processors',       tenure: 'Jun 2013 – Mar 2015' },
]

function TierACard({ item, index }: { item: typeof TIER_A[number]; index: number }) {
  const [open, setOpen]       = useState(false)
  const [hovered, setHovered] = useState(false)

  const mono = { fontFamily: 'var(--font-jetbrains)' } as const

  return (
    <div
      className="exp-tier-a"
      style={{ opacity: 0, display: 'grid', gridTemplateColumns: '24px 1fr', gap: '0 20px', alignItems: 'start' }}
    >
      {/* Dot node */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: '18px' }}>
        <div style={{ width: '9px', height: '9px', borderRadius: '50%', background: 'var(--accent)', flexShrink: 0, boxShadow: '0 0 8px rgba(255,90,0,0.5)' }} />
      </div>

      {/* Card */}
      <div
        style={{
          position:            'relative',
          overflow:            'hidden',
          background:          CARD_BG,
          backdropFilter:      'blur(20px) saturate(1.5)',
          WebkitBackdropFilter:'blur(20px) saturate(1.5)',
          border:              '1px solid rgba(255,255,255,0.10)',
          borderRadius:        0,
          padding:             '24px',
          marginBottom:        '0',
          transition:          'border-color 0.3s ease',
          borderColor:         hovered ? 'rgba(255,255,255,0.18)' : 'rgba(255,255,255,0.10)',
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Backlight */}
        <div style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none', background: 'radial-gradient(ellipse 120% 120% at 50% 50%, rgba(255,248,225,0.10) 0%, rgba(255,248,225,0.04) 50%, transparent 100%)', opacity: hovered ? 1 : 0, transition: 'opacity 0.5s ease' }} />

        <div style={{ position: 'relative', zIndex: 1 }}>
          {/* Header */}
          <h4 style={{ fontFamily: 'var(--font-fraunces)', fontSize: 'clamp(16px,2vw,20px)', fontWeight: 400, color: 'var(--text)', marginBottom: '4px', overflowWrap: 'break-word' }}>
            {item.role}
          </h4>
          <div style={{ ...mono, fontSize: '11px', color: 'var(--muted)', marginBottom: '2px' }}>{item.company}</div>
          <div style={{ ...mono, fontSize: '10px', color: 'var(--subtle)', marginBottom: '16px' }}>{item.tenure}</div>

          {/* Tags */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '16px' }}>
            {item.tags.map((tag) => (
              <span key={tag} style={{ ...mono, fontSize: '9px', letterSpacing: '0.8px', color: '#FF5A00', border: '1px solid rgba(255,90,0,0.25)', padding: '3px 8px', borderRadius: 0 }}>
                {tag}
              </span>
            ))}
          </div>

          {/* Highlights */}
          <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '16px' }}>
            {item.highlights.map((h, i) => (
              <li key={i} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                <span style={{ color: 'var(--accent)', flexShrink: 0, marginTop: '2px', fontSize: '10px' }}>▸</span>
                <span style={{ fontFamily: 'var(--font-geist)', fontSize: '13px', color: 'var(--muted)', lineHeight: 1.6 }}>{h}</span>
              </li>
            ))}
          </ul>

          {/* Expandable detail */}
          <div className={`exp-detail${open ? ' open' : ''}`}>
            <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '14px', marginBottom: '14px' }} />
            <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {item.detail.map((d, i) => (
                <li key={i} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                  <span style={{ color: 'rgba(255,90,0,0.5)', flexShrink: 0, marginTop: '2px', fontSize: '10px' }}>›</span>
                  <span style={{ fontFamily: 'var(--font-geist)', fontSize: '13px', color: 'rgba(242,240,235,0.45)', lineHeight: 1.6 }}>{d}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Toggle */}
          <button
            onClick={() => setOpen(!open)}
            style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', ...mono, fontSize: '11px', color: 'var(--accent)', letterSpacing: '0.5px', marginTop: '4px', transition: 'opacity 0.2s' }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.opacity = '0.7' }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.opacity = '1' }}
          >
            {open ? '– View less' : '+ View more'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return

    el.querySelectorAll('.exp-tier-a').forEach((entry) => {
      gsap.fromTo(entry, { opacity: 0, y: 28 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out', scrollTrigger: { trigger: entry, start: 'top 82%', once: true } })
    })
    el.querySelectorAll('.exp-tier-b').forEach((entry) => {
      gsap.fromTo(entry, { opacity: 0, x: -12 }, { opacity: 1, x: 0, duration: 0.5, ease: 'power2.out', scrollTrigger: { trigger: entry, start: 'top 85%', once: true } })
    })
  }, [])

  const mono = { fontFamily: 'var(--font-jetbrains)' } as const

  return (
    <section
      id="work"
      ref={sectionRef}
      style={{ background: 'var(--bg)', padding: 'clamp(80px,10vw,140px) clamp(24px,5vw,60px)' }}
    >
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        <div style={{ ...mono, fontSize: '10px', letterSpacing: '1.2px', color: 'var(--accent)', textTransform: 'uppercase', marginBottom: '48px' }}>
          // 02 EXPERIENCE
        </div>

        {/* Timeline container */}
        <div style={{ position: 'relative' }}>
          {/* Vertical line */}
          <div style={{ position: 'absolute', left: '11px', top: 0, bottom: 0, width: '1px', background: 'linear-gradient(to bottom, var(--accent), rgba(255,90,0,0.15))' }} />

          {/* Tier A cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '40px' }}>
            {TIER_A.map((item, i) => (
              <TierACard key={item.id} item={item} index={i} />
            ))}
          </div>

          {/* Tier B compact entries */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {TIER_B.map((item, i) => (
              <div
                key={i}
                className="exp-tier-b"
                style={{ opacity: 0, display: 'grid', gridTemplateColumns: '24px 1fr', gap: '0 20px', alignItems: 'center' }}
              >
                {/* Small dot */}
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: 'rgba(255,90,0,0.45)', flexShrink: 0 }} />
                </div>
                {/* Compact line */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', alignItems: 'center', padding: '10px 0' }}>
                  <span style={{ ...mono, fontSize: '12px', color: 'var(--muted)' }}>{item.role}</span>
                  <span style={{ color: 'rgba(255,90,0,0.4)', fontSize: '10px' }}>·</span>
                  <span style={{ ...mono, fontSize: '12px', color: 'var(--subtle)' }}>{item.company}</span>
                  <span style={{ color: 'rgba(255,90,0,0.4)', fontSize: '10px' }}>·</span>
                  <span style={{ ...mono, fontSize: '11px', color: 'rgba(242,240,235,0.30)' }}>{item.tenure}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .exp-detail {
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.45s ease;
        }
        .exp-detail.open {
          max-height: 600px;
        }
      `}</style>
    </section>
  )
}
