'use client'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const TIMELINE = [
  {
    role: 'Independent — Market Analyst',
    period: '2021 – present',
    desc: 'Independent research and advisory across BFSI, specialty ingredients, and B2B healthcare import.',
  },
  {
    role: 'Opine Group — BI Analyst / Consultant',
    period: '2017 – 2018',
    desc: 'SSRS dashboards and dimensional modelling for BFSI clients.',
  },
  {
    role: 'TexCarp Consulting — Consultant',
    period: '2015 – 2016',
    desc: 'Part-time consulting in textiles operations and business process documentation.',
  },
  {
    role: 'Mahalaxmi Co-Op Yarn Processors — Business & Ops Manager',
    period: '2013 – 2015',
    desc: 'End-to-end business and operations management for a cooperative yarn processing unit.',
  },
  {
    role: 'Brintons Carpets — Process Improvement Leader',
    period: '2010 – 2013',
    desc: 'Led process improvement across Americas, APAC, EU, and Australia manufacturing sites.',
  },
]

const IDDAC_TAGS = ['₹855.16L BUDGET', 'ARTICLE 275(1) FUNDING', 'GOVT. ANALYTICS', 'STATEWIDE PLATFORM']

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return

    gsap.fromTo(
      '.iddac-card',
      { opacity: 0, scale: 0.97 },
      { opacity: 1, scale: 1, duration: 0.7, ease: 'power2.out', scrollTrigger: { trigger: '.iddac-card', start: 'top 75%', once: true } }
    )

    el.querySelectorAll('.timeline-line').forEach((line) => {
      gsap.fromTo(line, { scaleY: 0 }, {
        scaleY: 1, duration: 0.6, ease: 'power2.out',
        scrollTrigger: { trigger: line, start: 'top 80%', once: true },
      })
    })

    el.querySelectorAll('.timeline-entry').forEach((entry) => {
      gsap.fromTo(entry, { opacity: 0, y: 24 }, {
        opacity: 1, y: 0, duration: 0.6, ease: 'power2.out',
        scrollTrigger: { trigger: entry, start: 'top 80%', once: true },
      })
    })
  }, [])

  const mono = { fontFamily: 'var(--font-jetbrains)' } as const

  return (
    <section
      id="work"
      ref={sectionRef}
      style={{ background: 'var(--bg)', padding: 'clamp(80px,10vw,140px) clamp(24px,5vw,60px)' }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ ...mono, fontSize: '10px', letterSpacing: '1.2px', color: 'var(--accent)', textTransform: 'uppercase', marginBottom: '48px' }}>
          // 02 EXPERIENCE
        </div>

        {/* IDDAC hero card */}
        <div
          className="iddac-card"
          style={{
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            borderRadius: '12px',
            padding: 'clamp(28px, 4vw, 48px) clamp(24px, 4vw, 48px)',
            marginBottom: '48px',
            opacity: 0,
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px', marginBottom: '20px' }}>
            <div>
              <h3 style={{ fontFamily: 'var(--font-fraunces)', fontSize: 'clamp(22px,3vw,36px)', fontWeight: 400, color: 'var(--text)', marginBottom: '6px' }}>
                IDDAC — Maharashtra Tribal Development
              </h3>
              <span style={{ ...mono, fontSize: '12px', color: 'var(--muted)' }}>
                Sr. Project Consultant &nbsp;·&nbsp; 2018 – 2021
              </span>
            </div>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '20px' }}>
            {IDDAC_TAGS.map((tag) => (
              <span
                key={tag}
                style={{ ...mono, fontSize: '10px', letterSpacing: '0.5px', color: 'var(--muted)', border: '1px solid var(--border)', padding: '4px 10px', borderRadius: '100px' }}
              >
                {tag}
              </span>
            ))}
          </div>

          <p style={{ fontFamily: 'var(--font-geist)', fontSize: '15px', color: 'var(--muted)', lineHeight: 1.8, maxWidth: '680px' }}>
            Designed and delivered statewide analytics infrastructure for Maharashtra&rsquo;s
            Tribal Development Department. Covered 15+ districts, enabled evidence-based
            fund allocation under Article 275(1) Central Funding.
          </p>
        </div>

        {/* Timeline */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
          {TIMELINE.map((item, i) => (
            <div
              key={i}
              className="timeline-entry"
              style={{
                display: 'grid',
                gridTemplateColumns: '2px 1fr',
                gap: '0 28px',
                opacity: 0,
                paddingBottom: i < TIMELINE.length - 1 ? '40px' : '0',
              }}
            >
              {/* Vertical accent line */}
              <div
                className="timeline-line"
                style={{ background: 'var(--accent)', width: '2px', transformOrigin: 'top', transform: 'scaleY(0)' }}
              />

              {/* Content */}
              <div style={{ paddingTop: '2px' }}>
                <h4 style={{ fontFamily: 'var(--font-fraunces)', fontSize: 'clamp(16px,2vw,22px)', fontWeight: 400, color: 'var(--text)', marginBottom: '6px' }}>
                  {item.role}
                </h4>
                <div style={{ ...mono, fontSize: '12px', color: 'var(--muted)', marginBottom: '10px' }}>
                  {item.period}
                </div>
                <p style={{ fontFamily: 'var(--font-geist)', fontSize: '14px', color: 'var(--muted)', lineHeight: 1.7, maxWidth: '560px' }}>
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
