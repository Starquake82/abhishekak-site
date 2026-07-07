'use client'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Education() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return

    el.querySelectorAll('.edu-line').forEach((line) => {
      gsap.fromTo(line, { scaleY: 0 }, {
        scaleY: 1, duration: 0.6, ease: 'power2.out',
        scrollTrigger: { trigger: line, start: 'top 80%', once: true },
      })
    })

    el.querySelectorAll('.edu-entry').forEach((entry) => {
      gsap.fromTo(entry, { opacity: 0, y: 24 }, {
        opacity: 1, y: 0, duration: 0.6, ease: 'power2.out',
        scrollTrigger: { trigger: entry, start: 'top 80%', once: true },
      })
    })
  }, [])

  const mono = { fontFamily: 'var(--font-jetbrains)' } as const

  return (
    <section
      id="education"
      ref={sectionRef}
      style={{ background: 'var(--bg)', borderTop: '1px solid var(--border)', padding: 'clamp(80px,10vw,140px) clamp(24px,5vw,60px)' }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ ...mono, fontSize: '12px', fontWeight: 700, letterSpacing: '1.2px', color: 'var(--accent)', textTransform: 'uppercase', marginBottom: '48px' }}>
          // 05 EDUCATION
        </div>

        <div
          className="edu-entry"
          style={{
            display: 'grid',
            gridTemplateColumns: '2px 1fr',
            gap: '0 28px',
            opacity: 0,
          }}
        >
          {/* Vertical accent line */}
          <div
            className="edu-line"
            style={{ background: 'var(--accent)', width: '2px', transformOrigin: 'top', transform: 'scaleY(0)' }}
          />

          {/* Content */}
          <div style={{ paddingTop: '2px' }}>
            <h4 style={{ fontFamily: 'var(--font-fraunces)', fontSize: 'clamp(16px,2vw,22px)', fontWeight: 400, color: 'var(--text)', marginBottom: '4px' }}>
              Bachelor of Engineering — Textile Technology
            </h4>
            <div style={{ fontFamily: 'var(--font-geist)', fontSize: '11px', color: 'var(--muted)', marginBottom: '4px' }}>
              DKTE&rsquo;s Textile &amp; Engineering Institute, Ichalkaranji
            </div>
            <div style={{ fontFamily: 'var(--font-geist)', fontSize: '10px', color: 'var(--subtle)', marginBottom: '4px', fontStyle: 'italic' }}>
              Shivaji University, Kolhapur, Maharashtra
            </div>
            <div style={{ ...mono, fontSize: '11px', color: 'var(--muted)' }}>
              2006 – 2010
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
