'use client'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const TIMELINE = [
  {
    role: 'Independent — Market Analyst',
    period: '2021 – present',
    tags: [] as string[],
    desc: 'Independent research and advisory across BFSI, specialty ingredients, and B2B healthcare import.',
  },
  {
    role: 'IDDAC — Maharashtra Tribal Development',
    period: '2018 – 2021',
    tags: ['₹855.16L BUDGET', 'ARTICLE 275(1)', 'GOVT. ANALYTICS', 'STATEWIDE PLATFORM'],
    desc: 'Sr. Project Consultant. Designed and delivered statewide analytics infrastructure for Maharashtra\'s Tribal Development Department. Covered 15+ districts, enabled evidence-based fund allocation under Article 275(1) Central Funding.',
  },
  {
    role: 'Opine Group — BI Analyst / Consultant',
    period: '2017 – 2018',
    tags: [] as string[],
    desc: 'SSRS dashboards and dimensional modelling for BFSI clients.',
  },
  {
    role: 'TexCarp Consulting — Consultant',
    period: '2015 – 2016',
    tags: [] as string[],
    desc: 'Part-time consulting in textiles operations and business process documentation.',
  },
  {
    role: 'Mahalaxmi Co-Op Yarn Processors — Business & Ops Manager',
    period: '2013 – 2015',
    tags: [] as string[],
    desc: 'End-to-end business and operations management for a cooperative yarn processing unit.',
  },
  {
    role: 'Brintons Carpets — Process Improvement Leader',
    period: '2010 – 2013',
    tags: [] as string[],
    desc: 'Led process improvement across Americas, APAC, EU, and Australia manufacturing sites.',
  },
]

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return

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

        <div style={{ display: 'flex', flexDirection: 'column' }}>
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
                <h4 style={{ fontFamily: 'var(--font-fraunces)', fontSize: 'clamp(16px,2vw,22px)', fontWeight: 400, color: 'var(--text)', marginBottom: '6px', overflowWrap: 'break-word' }}>
                  {item.role}
                </h4>
                <div style={{ ...mono, fontSize: '12px', color: 'var(--muted)', marginBottom: item.tags.length ? '12px' : '10px' }}>
                  {item.period}
                </div>
                {item.tags.length > 0 && (
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '10px' }}>
                    {item.tags.map((tag) => (
                      <span key={tag} style={{ ...mono, fontSize: '10px', letterSpacing: '0.5px', color: 'var(--muted)', border: '1px solid var(--border)', padding: '3px 8px', borderRadius: '100px' }}>
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
                <p style={{ fontFamily: 'var(--font-geist)', fontSize: '14px', color: 'var(--muted)', lineHeight: 1.7, maxWidth: '560px', overflowWrap: 'break-word' }}>
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
