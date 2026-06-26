'use client'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const PROJECTS = [
  {
    category: 'BA CAPSTONE',
    name: 'BACentric — Library Management Portal',
    desc: 'Full-cycle business analysis deliverable covering requirements elicitation, BRD, and stakeholder sign-off for a library management system.',
    tags: ['Business Analysis', 'Requirements', 'BRD'],
    badge: null,
    link: '#',
  },
  {
    category: 'BA CAPSTONE',
    name: 'BACentric — Procurement Management Portal',
    desc: 'End-to-end procurement portal analysis with BPMN process maps, UAT planning, and traceability matrices.',
    tags: ['Process Design', 'UAT', 'BPMN'],
    badge: null,
    link: '#',
  },
  {
    category: 'BI',
    name: 'Maven Airlines Power BI Dashboard',
    desc: 'Multi-page Power BI report with custom DAX measures, dimensional data model, and executive-level KPI views.',
    tags: ['Data Modelling', 'DAX', 'Power BI'],
    badge: 'Coming soon',
    link: '#',
  },
  {
    category: 'BA',
    name: 'FinBridge LOS — Credit Decision Module',
    desc: 'Phase 1 BRD and process design for a loan origination system credit decision module in a lending operations context.',
    tags: ['Lending Operations', 'BRD', 'Phase 1'],
    badge: 'In progress',
    link: '#',
  },
]

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    el.querySelectorAll('.project-card').forEach((card) => {
      gsap.fromTo(card, { opacity: 0, y: 32 }, {
        opacity: 1, y: 0, duration: 0.7, ease: 'power2.out',
        scrollTrigger: { trigger: card, start: 'top 78%', once: true },
      })
    })
  }, [])

  const mono = { fontFamily: 'var(--font-jetbrains)' } as const

  return (
    <section
      id="work-projects"
      ref={sectionRef}
      style={{ background: 'var(--bg)', padding: 'clamp(80px,10vw,140px) clamp(24px,5vw,60px)' }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ ...mono, fontSize: '10px', letterSpacing: '1.2px', color: 'var(--accent)', textTransform: 'uppercase', marginBottom: '48px' }}>
          // 03 WORK
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '20px',
          }}
        >
          {PROJECTS.map((p, i) => (
            <div
              key={i}
              className="project-card"
              style={{
                background: 'var(--surface)',
                border: '1px solid var(--border)',
                borderRadius: '12px',
                padding: 'clamp(24px,3vw,36px)',
                opacity: 0,
                transition: 'transform 0.25s ease, border-color 0.25s ease',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget
                el.style.transform = 'translateY(-5px)'
                el.style.borderColor = 'rgba(255,90,0,0.3)'
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget
                el.style.transform = 'translateY(0)'
                el.style.borderColor = 'var(--border)'
              }}
            >
              {/* Badge */}
              {p.badge && (
                <span
                  style={{
                    position: 'absolute', top: '16px', right: '16px',
                    ...mono, fontSize: '10px', letterSpacing: '0.5px',
                    background: 'rgba(255,90,0,0.12)', color: 'var(--accent)',
                    padding: '4px 10px', borderRadius: '100px',
                  }}
                >
                  {p.badge}
                </span>
              )}

              <div style={{ ...mono, fontSize: '10px', letterSpacing: '1px', color: 'var(--accent)', textTransform: 'uppercase' }}>
                {p.category}
              </div>

              <h3 style={{ fontFamily: 'var(--font-fraunces)', fontSize: 'clamp(18px,2vw,26px)', fontWeight: 400, color: 'var(--text)', lineHeight: 1.2 }}>
                {p.name}
              </h3>

              <p style={{ fontFamily: 'var(--font-geist)', fontSize: '14px', color: 'var(--muted)', lineHeight: 1.7 }}>
                {p.desc}
              </p>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '4px' }}>
                {p.tags.map((tag) => (
                  <span key={tag} style={{ ...mono, fontSize: '10px', color: 'var(--muted)', border: '1px solid var(--border)', padding: '4px 10px', borderRadius: '100px' }}>
                    {tag}
                  </span>
                ))}
              </div>

              <a
                href={p.link}
                data-cursor="hover"
                style={{ ...mono, fontSize: '12px', color: 'var(--accent)', textDecoration: 'none', marginTop: 'auto', paddingTop: '12px', transition: 'opacity 0.2s' }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.opacity = '0.7' }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.opacity = '1' }}
              >
                View →
              </a>
            </div>
          ))}
        </div>

        <p style={{ ...mono, fontSize: '11px', color: 'var(--subtle)', textAlign: 'center', marginTop: '40px' }}>
          More work in progress — check back.
        </p>
      </div>
    </section>
  )
}
