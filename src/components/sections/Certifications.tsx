'use client'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const ROW1 = [
  'IBM GenAI for BA/PO',
  'Maven Power BI Desktop',
  'Google AI Essentials',
  'McKinsey Forward',
  'Microsoft Copilot Applied Skills',
  'Atlassian Agile PM',
  'Advanced BA (BACentric)',
  'Microsoft AI Skills Fest 2026',
]

const ROW2 = [
  'Registered Scrum Basics',
  'NISM-VIII',
  'Google Data Analytics Foundations',
  'Product School PAC',
  'Product School PDC',
  'Product School PPC',
  'Forage: JPMorgan',
  'Forage: BCG',
  'IBM AI Product Manager',
]

function CertPill({ name }: { name: string }) {
  return (
    <span
      style={{
        fontFamily: 'var(--font-jetbrains)',
        fontSize: '11px',
        letterSpacing: '0.3px',
        color: 'var(--muted)',
        background: 'var(--surface)',
        border: '1px solid var(--border)',
        borderRadius: '100px',
        padding: '8px 18px',
        whiteSpace: 'nowrap',
        flexShrink: 0,
        transition: 'border-color 0.2s ease, color 0.2s ease',
        cursor: 'default',
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLElement
        el.style.borderColor = 'rgba(255,90,0,0.4)'
        el.style.color = 'var(--text)'
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLElement
        el.style.borderColor = 'var(--border)'
        el.style.color = 'var(--muted)'
      }}
    >
      {name}
    </span>
  )
}

export default function Certifications() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    gsap.fromTo(el.querySelector('.certs-heading'), { opacity: 0, y: 24 }, {
      opacity: 1, y: 0, duration: 0.7, ease: 'power2.out',
      scrollTrigger: { trigger: el, start: 'top 75%', once: true },
    })
  }, [])

  const doubled = (arr: string[]) => [...arr, ...arr]

  return (
    <section
      id="certs"
      ref={sectionRef}
      style={{ background: 'var(--bg)', padding: 'clamp(80px,10vw,140px) 0', overflow: 'hidden' }}
    >
      <div style={{ padding: '0 clamp(24px,5vw,60px)', marginBottom: '48px' }}>
        <div
          className="certs-heading"
          style={{ fontFamily: 'var(--font-jetbrains)', fontSize: '10px', letterSpacing: '1.2px', color: 'var(--accent)', textTransform: 'uppercase', opacity: 0 }}
        >
          // 04 CREDENTIALS
        </div>
      </div>

      {/* Row 1 — left to right */}
      <div className="marquee-wrapper" style={{ marginBottom: '12px', overflow: 'hidden' }}>
        <div className="marquee-track-ltr" style={{ display: 'flex', gap: '12px', padding: '0 6px' }}>
          {doubled(ROW1).map((name, i) => <CertPill key={i} name={name} />)}
        </div>
      </div>

      {/* Row 2 — right to left */}
      <div className="marquee-wrapper" style={{ overflow: 'hidden' }}>
        <div className="marquee-track-rtl" style={{ display: 'flex', gap: '12px', padding: '0 6px' }}>
          {doubled(ROW2).map((name, i) => <CertPill key={i} name={name} />)}
        </div>
      </div>
    </section>
  )
}
