'use client'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const STATS = [
  { value: 15, suffix: '+', label: 'Years' },
  { value: 855, prefix: '₹', suffix: 'L', label: 'Govt. project managed' },
  { value: 15, suffix: '+', label: 'Countries served' },
  { value: 3,  suffix: '',  label: 'Active ventures' },
]

function StatItem({ value, prefix = '', suffix = '', label }: { value: number; prefix?: string; suffix?: string; label: string }) {
  const numRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const el = numRef.current
    if (!el) return
    const obj = { val: 0 }
    gsap.to(obj, {
      val: value,
      duration: 1.5,
      ease: 'power2.out',
      scrollTrigger: { trigger: el, start: 'top 80%', once: true },
      onUpdate: () => { el.textContent = `${prefix}${Math.round(obj.val)}${suffix}` },
    })
  }, [value, prefix, suffix])

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
      <span
        ref={numRef}
        style={{ fontFamily: 'var(--font-fraunces)', fontSize: 'clamp(36px,4vw,48px)', fontWeight: 400, color: 'var(--text)', lineHeight: 1 }}
      >
        {prefix}0{suffix}
      </span>
      <span style={{ fontFamily: 'var(--font-jetbrains)', fontSize: '11px', letterSpacing: '0.5px', color: 'var(--muted)' }}>
        {label}
      </span>
    </div>
  )
}

export default function About() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    gsap.fromTo(
      el.querySelectorAll('.about-content'),
      { opacity: 0, y: 40 },
      {
        opacity: 1, y: 0, duration: 0.8, ease: 'power2.out', stagger: 0.1,
        scrollTrigger: { trigger: el, start: 'top 72%', once: true },
      }
    )
  }, [])

  const mono = { fontFamily: 'var(--font-jetbrains)' } as const

  return (
    <section
      id="about"
      ref={sectionRef}
      style={{ background: 'var(--bg)', padding: 'clamp(80px,10vw,140px) clamp(24px,5vw,60px)' }}
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'clamp(1fr, 7fr, 7fr) clamp(1fr, 3fr, 3fr)',
          gap: 'clamp(40px, 6vw, 80px)',
          maxWidth: '1200px',
          margin: '0 auto',
        }}
      >
        {/* Left */}
        <div className="about-content" style={{ opacity: 0 }}>
          <div style={{ ...mono, fontSize: '10px', letterSpacing: '1.2px', color: 'var(--accent)', textTransform: 'uppercase', marginBottom: '32px' }}>
            // 01 ABOUT
          </div>
          <h2 style={{ fontFamily: 'var(--font-fraunces)', fontSize: 'clamp(32px,4vw,52px)', fontWeight: 400, color: 'var(--text)', letterSpacing: '-1.5px', lineHeight: 1.1, marginBottom: '32px' }}>
            The discipline of<br />structured diagnosis.
          </h2>
          <p style={{ fontFamily: 'var(--font-geist)', fontSize: '15px', color: 'var(--muted)', lineHeight: 1.8, maxWidth: '560px', marginBottom: '20px' }}>
            Senior BA/BI professional with 15 years across government analytics, BFSI,
            textiles, and specialty ingredients. Currently building JIH Healthcare —
            a B2B import venture for L-Ergothioneine and Matcha from Japan.
          </p>
          <p style={{ fontFamily: 'var(--font-geist)', fontSize: '15px', color: 'var(--muted)', lineHeight: 1.8, maxWidth: '560px' }}>
            The throughline: diagnosing what&rsquo;s actually wrong before prescribing solutions.
          </p>
        </div>

        {/* Right — Stats */}
        <div
          className="about-content"
          style={{
            opacity: 0,
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '40px 24px',
            alignContent: 'start',
            paddingTop: '64px',
          }}
        >
          {STATS.map((s) => (
            <StatItem key={s.label} value={s.value} prefix={s.prefix} suffix={s.suffix} label={s.label} />
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 767px) {
          #about > div { grid-template-columns: 1fr !important; }
          #about > div > div:last-child { padding-top: 0 !important; }
        }
      `}</style>
    </section>
  )
}
