'use client'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const ROW1 = [
  { src: '/Badges/Google Ai Professional Certificate - Static.png', label: 'Google AI' },
  { src: '/Badges/mckinsey-org-forward-program (1).png',            label: 'McKinsey Forward' },
  { src: '/Badges/Maven Analytics - Power BI Desktop.png',          label: 'Maven Power BI' },
  { src: '/Badges/Maven Analytics - Power BI Service.png',          label: 'Maven BI Service' },
  { src: '/Badges/Maven Analytics - Advanced DAX.png',              label: 'Advanced DAX' },
  { src: '/Badges/Maven Analytics - MySQL Data Analysis.png',       label: 'MySQL Analytics' },
  { src: '/Badges/diagramming-foundations (1).png',                 label: 'Diagramming' },
]

const ROW2 = [
  { src: '/Logos/ibm (1).png',           label: 'IBM' },
  { src: '/Logos/atlassian.png',         label: 'Atlassian' },
  { src: '/Logos/Microsoft PowerBI.png', label: 'Microsoft' },
  { src: '/Logos/BACentric.png',         label: 'BACentric' },
  { src: '/Logos/Maven Analytics.png',   label: 'Maven Analytics' },
  { src: '/Logos/NISM2.png',             label: 'NISM' },
  { src: '/Logos/scrum inc logo.png',    label: 'Scrum Inc' },
  { src: '/Logos/Deloitte-Logo.png',     label: 'Deloitte' },
]

function CertItem({ src, label }: { src: string; label: string }) {
  return (
    <div
      className="cert-item"
      style={{
        display:        'flex',
        flexDirection:  'column',
        alignItems:     'center',
        gap:            '10px',
        padding:        '14px 18px',
        border:         '1px solid rgba(255,255,255,0.07)',
        borderRadius:   '10px',
        flexShrink:     0,
        cursor:         'default',
        background:     'rgba(255,255,255,0.02)',
        transition:     'border-color 0.3s ease',
        width:          '110px',
      }}
      onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,90,0,0.25)' }}
      onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.07)' }}
    >
      <img
        src={src}
        alt={label}
        className="cert-img"
        style={{ width: '60px', height: '60px', objectFit: 'contain', display: 'block' }}
      />
      <span style={{
        fontFamily:  'var(--font-jetbrains)',
        fontSize:    '9px',
        letterSpacing: '0.3px',
        color:       'rgba(242,240,235,0.40)',
        textAlign:   'center',
        lineHeight:  1.3,
        whiteSpace:  'nowrap',
      }}>
        {label}
      </span>
    </div>
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

  const doubled = <T,>(arr: T[]) => [...arr, ...arr]

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

      {/* Row 1 — badges, left to right */}
      <div className="marquee-wrapper" style={{ marginBottom: '16px', overflow: 'hidden' }}>
        <div className="marquee-track-ltr" style={{ display: 'flex', gap: '12px', padding: '4px 6px' }}>
          {doubled(ROW1).map((item, i) => <CertItem key={i} src={item.src} label={item.label} />)}
        </div>
      </div>

      {/* Row 2 — logos, right to left */}
      <div className="marquee-wrapper" style={{ overflow: 'hidden' }}>
        <div className="marquee-track-rtl" style={{ display: 'flex', gap: '12px', padding: '4px 6px' }}>
          {doubled(ROW2).map((item, i) => <CertItem key={i} src={item.src} label={item.label} />)}
        </div>
      </div>

      <style>{`
        .cert-img {
          filter: grayscale(100%) brightness(1.8);
          transition: filter 300ms ease;
        }
        .cert-item:hover .cert-img {
          filter: none;
        }
      `}</style>
    </section>
  )
}
