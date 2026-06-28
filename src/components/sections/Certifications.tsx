'use client'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

type Cert     = { name: string; issuer: string; img: string }
type Category = {
  id:       string
  label:    string
  align:    'left' | 'right'
  glowRgba: string
  certs:    Cert[]
  skills:   string[]
  speed:    number
}

const CATEGORIES: Category[] = [
  {
    id:       'ba',
    label:    'BUSINESS ANALYSIS',
    align:    'left',
    glowRgba: 'rgba(242,193,46,0.18)',
    speed:    55,
    certs: [
      { name: 'Advanced Business Analysis',                                       issuer: 'BACentric', img: '/Logos/bacentric.png' },
      { name: 'Career Essentials in Business Analysis by Microsoft and LinkedIn', issuer: 'Microsoft', img: '/Logos/microsoft.png' },
      { name: 'Agile Project Management Professional Certificate',                issuer: 'Atlassian', img: '/Logos/atlassian.png' },
      { name: 'Registered Scrum Basics',                                          issuer: 'Scrum Inc', img: '/Logos/scrum-inc.png' },
    ],
    skills: [
      'Requirements Elicitation', 'Stakeholder Management', 'BRD', 'FRD', 'User Stories',
      'Acceptance Criteria', 'GAP Analysis', 'AS-IS / TO-BE Process Mapping',
      'Workshop Facilitation', 'UAT', 'RCA', 'Process Improvement', 'Jira', 'Figma',
    ],
  },
  {
    id:       'bi',
    label:    'BUSINESS INTELLIGENCE',
    align:    'right',
    glowRgba: 'rgba(107,68,212,0.18)',
    speed:    42,
    certs: [
      { name: 'Power BI Desktop',                    issuer: 'Maven Analytics', img: '/Badges/Maven Analytics - Power BI Desktop.png' },
      { name: 'Power BI Service',                    issuer: 'Maven Analytics', img: '/Badges/Maven Analytics - Power BI Service.png' },
      { name: 'Advanced DAX',                        issuer: 'Maven Analytics', img: '/Badges/Maven Analytics - Advanced DAX.png' },
      { name: 'MySQL Data Analysis',                 issuer: 'Maven Analytics', img: '/Badges/Maven Analytics - MySQL Data Analysis.png' },
      { name: 'Business Intelligence & Analytics',   issuer: 'Opine Group',     img: '/Logos/opine-group.png' },
    ],
    skills: [
      'Power BI', 'SQL', 'Data Modelling', 'ETL', 'DAX', 'SSRS',
      'Dashboard Design', 'KPI Reporting', 'Excel', 'Dimensional Modelling',
    ],
  },
  {
    id:       'ai',
    label:    'ARTIFICIAL INTELLIGENCE',
    align:    'left',
    glowRgba: 'rgba(138,138,138,0.15)',
    speed:    32,
    certs: [
      { name: 'Google AI Professional Certificate',                          issuer: 'Google',    img: '/Badges/Google Ai Professional Certificate - Static.png' },
      { name: 'Generative AI for Business Analysts and Product Owners',     issuer: 'IBM',       img: '/Logos/ibm.png' },
      { name: 'Create Agents in Microsoft Copilot Studio Applied Skills',   issuer: 'Microsoft', img: '/Logos/microsoft.png' },
    ],
    skills: [
      'Microsoft Copilot Studio', 'n8n Automation', 'GenAI for BA/BO',
      'AI-Augmented Delivery', 'Prompt Engineering', 'Process Automation',
    ],
  },
  {
    id:       'ls',
    label:    'LEADERSHIP & STRATEGY',
    align:    'right',
    glowRgba: 'rgba(43,127,212,0.18)',
    speed:    38,
    certs: [
      { name: 'McKinsey Forward Program',  issuer: 'McKinsey & Company',      img: '/Badges/mckinsey-org-forward-program (1).png' },
      { name: 'Diagramming Foundations',   issuer: 'Cassidy Williams / GSAP', img: '/Badges/diagramming-foundations (1).png' },
    ],
    skills: [
      'Stakeholder Management', 'Change Management', 'Kaizen', 'SWOT Analysis',
      'Cross-functional Collaboration', 'Executive Reporting',
      'Vendor Management', 'Governance & Compliance',
    ],
  },
  {
    id:       'mbf',
    label:    'MARKETS, BUSINESS & FINANCE',
    align:    'left',
    glowRgba: 'rgba(46,204,113,0.18)',
    speed:    30,
    certs: [
      { name: 'NISM-Series VIII: Equity Derivatives Certification', issuer: 'NISM',     img: '/Logos/nism.png' },
      { name: 'Data Analytics Job Simulation',                       issuer: 'Deloitte', img: '/Logos/deloitte.png' },
    ],
    skills: [
      'Equity Derivatives', 'F&O', 'Technical Analysis', 'Risk Assessment',
      'Market Trend Analysis', 'Market Research', 'Business Development',
    ],
  },
]

function CertCard({ cert, glowRgba }: { cert: Cert; glowRgba: string }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const imgRef  = useRef<HTMLImageElement>(null)

  useEffect(() => {
    const card = cardRef.current
    const img  = imgRef.current
    if (!card || !img) return

    const enter = () => { img.style.filter = 'none' }
    const leave = () => { img.style.filter = 'grayscale(100%) brightness(1.8)' }

    card.addEventListener('mouseenter', enter)
    card.addEventListener('mouseleave', leave)
    return () => {
      card.removeEventListener('mouseenter', enter)
      card.removeEventListener('mouseleave', leave)
    }
  }, [])

  return (
    <div
      ref={cardRef}
      className="cert-card"
      style={{
        position:             'relative',
        overflow:             'hidden',
        width:                '200px',
        flexShrink:           0,
        background:           'rgba(17,17,17,0.6)',
        backdropFilter:       'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        border:               '1px solid rgba(255,255,255,0.07)',
        borderRadius:         '12px',
        padding:              '20px 16px',
        display:              'flex',
        flexDirection:        'column',
        cursor:               'default',
        transition:           'border-color 0.3s ease, box-shadow 0.3s ease',
      }}
    >
      {/* Per-category ambient glow */}
      <div style={{
        position:     'absolute',
        inset:         0,
        zIndex:        0,
        pointerEvents: 'none',
        background:   `radial-gradient(ellipse 120% 120% at 50% 50%, ${glowRgba} 0%, transparent 70%)`,
        opacity:      1,
      }} />

      <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', height: '100%' }}>
        {/* Image */}
        <div style={{ display: 'flex', justifyContent: 'flex-start', marginBottom: '14px' }}>
          <img
            ref={imgRef}
            src={cert.img}
            alt={cert.name}
            className="cert-img"
            style={{
              width:      '64px',
              height:     '64px',
              objectFit:  'contain',
              display:    'block',
              filter:     'grayscale(100%) brightness(1.8)',
              transition: 'filter 300ms ease',
            }}
          />
        </div>

        {/* Cert name — fixed min-height so names align across a row */}
        <div style={{
          fontFamily: 'var(--font-geist)',
          fontSize:   '15px',
          color:      '#F2F0EB',
          lineHeight:  1.4,
          minHeight:  '80px',
          alignItems: 'flex-start',
        }}>
          {cert.name}
        </div>

        {/* Issuer — fixed min-height so issuers align across a row */}
        <div style={{
          fontFamily:    'var(--font-jetbrains)',
          fontSize:      '13px',
          color:         'rgba(242,240,235,0.40)',
          letterSpacing: '0.2px',
          minHeight:     '40px',
          display:       'flex',
          alignItems:    'flex-start',
          paddingTop:    '6px',
        }}>
          {cert.issuer}
        </div>
      </div>
    </div>
  )
}

function SkillsMarquee({ skills, speed }: { skills: string[]; speed: number }) {
  const doubled = [...skills, ...skills]
  return (
    <div style={{ overflow: 'hidden', padding: '14px 0 0' }}>
      <div style={{
        display:   'flex',
        alignItems: 'center',
        width:     'max-content',
        animation: `marquee-ltr ${speed}s linear infinite`,
      }}>
        {doubled.map((skill, i) => (
          <span key={i} style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>
            <span style={{
              fontFamily:    'var(--font-jetbrains)',
              fontSize:      '12px',
              color:         'rgba(242,240,235,0.40)',
              padding:       '0 13px',
              whiteSpace:    'nowrap',
            }}>
              {skill}
            </span>
            <span style={{ color: '#FF5A00', fontSize: '5px', lineHeight: 1, flexShrink: 0 }}>●</span>
          </span>
        ))}
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

      // Initialise all card wrappers invisible before their trigger fires
      gsap.set(el.querySelectorAll('.cert-card-anim'), { opacity: 0, y: 28 })

      CATEGORIES.forEach((cat) => {
        const catEl = el.querySelector(`.cat-${cat.id}`)
        if (!catEl) return

        const labelEl = catEl.querySelector('.cat-label')
        const cards   = catEl.querySelectorAll('.cert-card-anim')
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

  return (
    <section
      id="certs"
      ref={sectionRef}
      style={{ background: 'var(--bg)', padding: 'clamp(80px,10vw,140px) 0', overflow: 'hidden' }}
    >
      {/* ── Section header ──────────────────────────────────── */}
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

      {/* ── Category blocks ─────────────────────────────────── */}
      {CATEGORIES.map((cat) => (
        <div key={cat.id} className={`cat-${cat.id}`} style={{ marginBottom: '80px' }}>
          <div style={{ padding: '0 clamp(24px,5vw,60px)', maxWidth: '1200px', margin: '0 auto', position: 'relative' }}>

            {/* Per-category ambient glow */}
            <div style={{
              position:     'absolute',
              inset:         0,
              zIndex:        0,
              pointerEvents: 'none',
              background:   `radial-gradient(ellipse 80% 70% at ${cat.align === 'left' ? '25%' : '75%'} 65%, ${cat.glowRgba} 0%, transparent 70%)`,
            }} />

            <div style={{ position: 'relative', zIndex: 1 }}>
              {/* Oversized label */}
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

              {/* Cert cards */}
              <div style={{
                display:        'flex',
                flexWrap:       'wrap',
                gap:            '12px',
                alignItems:     'stretch',
                justifyContent: cat.align === 'right' ? 'flex-end' : 'flex-start',
                marginBottom:   '4px',
              }}>
                {cat.certs.map((cert, i) => (
                  <div key={i} className="cert-card-anim">
                    <CertCard cert={cert} glowRgba={cat.glowRgba} />
                  </div>
                ))}
              </div>

              {/* Per-category skills marquee — contained to card row width */}
              <SkillsMarquee skills={cat.skills} speed={cat.speed} />
            </div>
          </div>
        </div>
      ))}

      <style>{`
        .cert-card-anim { opacity: 0; }

        #certs .cert-card:hover {
          border-color: rgba(255,255,255,0.18) !important;
          box-shadow: 0 0 32px rgba(255,90,0,0.10);
          transition: border-color 300ms ease, box-shadow 300ms ease;
        }

        @media (max-width: 767px) {
          .cert-card { width: 140px !important; }
        }
      `}</style>
    </section>
  )
}
