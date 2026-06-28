'use client'
import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

type Cert     = { name: string; issuer: string; img: string }
type Category = { id: string; label: string; align: 'left' | 'right'; certs: Cert[] }

const CATEGORIES: Category[] = [
  {
    id:    'ba',
    label: 'BUSINESS ANALYSIS',
    align: 'left',
    certs: [
      { name: 'Advanced Business Analysis', issuer: 'BACentric', img: '/Logos/bacentric.png' },
      { name: 'Career Essentials in BA',    issuer: 'Microsoft', img: '/Logos/microsoft.png' },
      { name: 'Atlassian Agile PM',         issuer: 'Atlassian', img: '/Logos/atlassian.png' },
      { name: 'Registered Scrum Basics',    issuer: 'Scrum Inc', img: '/Logos/scrum-inc.png' },
    ],
  },
  {
    id:    'bi',
    label: 'BUSINESS INTELLIGENCE',
    align: 'right',
    certs: [
      { name: 'Power BI Desktop',    issuer: 'Maven Analytics', img: '/Badges/Maven Analytics - Power BI Desktop.png' },
      { name: 'Power BI Service',    issuer: 'Maven Analytics', img: '/Badges/Maven Analytics - Power BI Service.png' },
      { name: 'Advanced DAX',        issuer: 'Maven Analytics', img: '/Badges/Maven Analytics - Advanced DAX.png' },
      { name: 'MySQL Data Analysis', issuer: 'Maven Analytics', img: '/Badges/Maven Analytics - MySQL Data Analysis.png' },
      { name: 'BI & Analytics',      issuer: 'Opine Group',     img: '/Logos/opine-group.png' },
    ],
  },
  {
    id:    'ai',
    label: 'ARTIFICIAL INTELLIGENCE',
    align: 'left',
    certs: [
      { name: 'Google AI Professional',        issuer: 'Google',    img: '/Badges/Google Ai Professional Certificate - Static.png' },
      { name: 'GenAI for Business Analysts',   issuer: 'IBM',       img: '/Logos/ibm.png' },
      { name: 'Copilot Studio Applied Skills', issuer: 'Microsoft', img: '/Logos/microsoft.png' },
    ],
  },
  {
    id:    'ls',
    label: 'LEADERSHIP & STRATEGY',
    align: 'right',
    certs: [
      { name: 'McKinsey Forward Program', issuer: 'McKinsey & Company', img: '/Badges/mckinsey-org-forward-program (1).png' },
      { name: 'Diagramming Foundations',  issuer: 'GSAP / Cassidy',     img: '/Badges/diagramming-foundations (1).png' },
    ],
  },
  {
    id:    'mbf',
    label: 'MARKETS, BUSINESS & FINANCE',
    align: 'left',
    certs: [
      { name: 'NISM Series VIII — Equity Derivatives', issuer: 'NISM',     img: '/Logos/nism.png' },
      { name: 'Data Analytics Simulation',              issuer: 'Deloitte', img: '/Logos/deloitte.png' },
    ],
  },
]

const SKILLS = [
  'Requirements Elicitation', 'Stakeholder Management', 'BRD', 'FRD', 'User Stories',
  'Acceptance Criteria', 'GAP Analysis', 'Process Mapping', 'Workshop Facilitation',
  'UAT', 'RCA', 'AS-IS / TO-BE', 'Power BI', 'SQL', 'Data Modelling', 'ETL', 'SSRS',
  'DAX', 'Dashboard Design', 'KPI Reporting', 'Excel', 'SSIS', 'Jira', 'Figma',
  'Copilot Studio', 'n8n', 'BFSI', 'Government', 'Manufacturing',
]

function CertCard({ cert }: { cert: Cert }) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      className="cert-card"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position:             'relative',
        overflow:             'hidden',
        width:                '160px',
        flexShrink:           0,
        background:           'rgba(17,17,17,0.6)',
        backdropFilter:       'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        border:               '1px solid',
        borderColor:          hovered ? 'rgba(255,255,255,0.14)' : 'rgba(255,255,255,0.07)',
        borderRadius:         '12px',
        padding:              '20px 16px',
        display:              'flex',
        flexDirection:        'column',
        alignItems:           'center',
        gap:                  '12px',
        cursor:               'default',
        transition:           'border-color 0.3s ease',
      }}
    >
      {/* Backlit glow */}
      <div style={{
        position:     'absolute',
        inset:         0,
        zIndex:        0,
        pointerEvents: 'none',
        background:   'radial-gradient(ellipse 120% 120% at 50% 50%, rgba(255,248,225,0.12) 0%, rgba(255,244,210,0.05) 40%, transparent 70%)',
        opacity:      hovered ? 1 : 0,
        transition:   'opacity 0.5s ease',
      }} />

      <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', width: '100%' }}>
        <img
          src={cert.img}
          alt={cert.name}
          className="cert-img"
          style={{ width: '64px', height: '64px', objectFit: 'contain', display: 'block' }}
        />
        <div style={{ textAlign: 'center', width: '100%' }}>
          <div style={{ fontFamily: 'var(--font-geist)', fontSize: '13px', color: 'var(--text)', lineHeight: 1.4, marginBottom: '4px' }}>
            {cert.name}
          </div>
          <div style={{ fontFamily: 'var(--font-jetbrains)', fontSize: '11px', color: 'var(--muted)', letterSpacing: '0.2px' }}>
            {cert.issuer}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Certifications() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return

    const ctx = gsap.context(() => {
      // Section headings
      gsap.fromTo(
        el.querySelectorAll('.certs-heading'),
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out', stagger: 0.15,
          scrollTrigger: { trigger: el, start: 'top 75%', once: true } }
      )

      // Initialise all cards hidden so there is no flash before ScrollTrigger fires
      gsap.set(el.querySelectorAll('.cert-card'), { opacity: 0, y: 28 })

      // Per-category reveals
      CATEGORIES.forEach((cat) => {
        const catEl = el.querySelector(`.cat-${cat.id}`)
        if (!catEl) return

        const labelEl = catEl.querySelector('.cat-label')
        const cards   = catEl.querySelectorAll('.cert-card')
        const xFrom   = cat.align === 'left' ? -60 : 60

        gsap.fromTo(
          labelEl,
          { opacity: 0, x: xFrom },
          { opacity: 0.20, x: 0, duration: 0.9, ease: 'power2.out',
            scrollTrigger: { trigger: catEl, start: 'top 82%', once: true } }
        )

        gsap.fromTo(
          cards,
          { opacity: 0, y: 28 },
          { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out', stagger: 0.08, delay: 0.2,
            scrollTrigger: { trigger: catEl, start: 'top 82%', once: true } }
        )
      })
    }, el)

    return () => ctx.revert()
  }, [])

  const doubled = [...SKILLS, ...SKILLS]

  return (
    <section
      id="certs"
      ref={sectionRef}
      style={{ background: 'var(--bg)', padding: 'clamp(80px,10vw,140px) 0', overflow: 'hidden' }}
    >
      {/* ── Header ───────────────────────────────────────────── */}
      <div style={{ padding: '0 clamp(24px,5vw,60px)', maxWidth: '1200px', margin: '0 auto', marginBottom: '72px' }}>
        <div
          className="certs-heading"
          style={{ fontFamily: 'var(--font-jetbrains)', fontSize: '10px', letterSpacing: '1.2px', color: 'var(--accent)', textTransform: 'uppercase', marginBottom: '16px', opacity: 0 }}
        >
          // 04 CREDENTIALS
        </div>
        <h2
          className="certs-heading"
          style={{ fontFamily: 'var(--font-fraunces)', fontSize: 'clamp(24px,3vw,32px)', fontWeight: 400, color: 'var(--text)', letterSpacing: '-0.5px', lineHeight: 1.2, margin: 0, opacity: 0 }}
        >
          Structured capability. Verified.
        </h2>
      </div>

      {/* ── Categories ───────────────────────────────────────── */}
      <div style={{ padding: '0 clamp(24px,5vw,60px)', maxWidth: '1200px', margin: '0 auto' }}>
        {CATEGORIES.map((cat) => (
          <div key={cat.id} className={`cat-${cat.id}`} style={{ marginBottom: '72px' }}>

            {/* Oversized category label — typographic texture */}
            <div
              className="cat-label"
              style={{
                fontFamily:    'var(--font-fraunces)',
                fontSize:      'clamp(40px,7vw,96px)',
                fontWeight:     400,
                color:         '#F2F0EB',
                lineHeight:     0.9,
                letterSpacing: '-2px',
                textAlign:      cat.align,
                marginBottom:  '28px',
                userSelect:    'none',
                pointerEvents: 'none',
                opacity:        0,
              }}
            >
              {cat.label}
            </div>

            {/* Cards */}
            <div style={{
              display:        'flex',
              flexWrap:       'wrap',
              gap:            '12px',
              justifyContent: cat.align === 'right' ? 'flex-end' : 'flex-start',
            }}>
              {cat.certs.map((cert, i) => (
                <CertCard key={i} cert={cert} />
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* ── Skills strip ─────────────────────────────────────── */}
      <div style={{ overflow: 'hidden', marginTop: '16px', padding: '16px 0' }}>
        <div style={{
          display:   'flex',
          alignItems: 'center',
          width:     'max-content',
          animation: 'marquee-ltr 60s linear infinite',
        }}>
          {doubled.map((skill, i) => (
            <span key={i} style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>
              <span style={{
                fontFamily:    'var(--font-jetbrains)',
                fontSize:      '12px',
                color:         'rgba(242,240,235,0.40)',
                padding:       '0 14px',
                whiteSpace:    'nowrap',
              }}>
                {skill}
              </span>
              <span style={{ color: '#FF5A00', fontSize: '5px', lineHeight: 1, flexShrink: 0 }}>●</span>
            </span>
          ))}
        </div>
      </div>

      <style>{`
        .cert-img {
          filter: grayscale(100%) brightness(1.8);
          transition: filter 300ms ease;
        }
        .cert-card:hover .cert-img {
          filter: none;
        }
        @media (max-width: 767px) {
          .cert-card { width: 140px !important; }
        }
      `}</style>
    </section>
  )
}
