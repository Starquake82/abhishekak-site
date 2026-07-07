'use client'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function About() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    gsap.fromTo(
      el.querySelectorAll('.about-content'),
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out', stagger: 0.1, scrollTrigger: { trigger: el, start: 'top 72%', once: true } }
    )
  }, [])

  return (
    <section
      id="about"
      ref={sectionRef}
      style={{ background: 'var(--bg)', borderTop: '1px solid var(--border)', padding: 'clamp(80px,10vw,140px) clamp(24px,5vw,60px)' }}
    >
      <div className="about-grid" style={{ display: 'grid', gridTemplateColumns: '3fr 2fr', gap: 'clamp(40px,6vw,80px)', maxWidth: '1200px', margin: '0 auto' }}>

        {/* Left — text */}
        <div className="about-content" style={{ opacity: 0 }}>
          <div style={{ fontFamily: 'var(--font-jetbrains)', fontSize: '12px', fontWeight: 700, letterSpacing: '1.2px', color: 'var(--accent)', textTransform: 'uppercase', marginBottom: '32px' }}>
            // 01 ABOUT
          </div>
          <h2 style={{ fontFamily: 'var(--font-fraunces)', fontSize: 'clamp(32px,4vw,52px)', fontWeight: 400, color: 'var(--text)', letterSpacing: '-1.5px', lineHeight: 1.1, marginBottom: '32px' }}>
            The discipline of<br />structured diagnosis.
          </h2>
          <p style={{ fontFamily: 'var(--font-geist)', fontSize: '15px', color: 'var(--muted)', lineHeight: 1.8, maxWidth: '560px', marginBottom: '20px' }}>
            Most organisations are drowning in data — but starving for decisions. That&rsquo;s the gap I&rsquo;ve spent 15+ years closing.
          </p>
          <p style={{ fontFamily: 'var(--font-geist)', fontSize: '15px', color: 'var(--muted)', lineHeight: 1.8, maxWidth: '560px', marginBottom: '20px' }}>
            I&rsquo;m an Independent Consultant working across Business Analysis, Business Intelligence, and AI-augmented delivery — translating complex, messy business realities into structured requirements, clean data flows, and analytics that people actually use to make decisions.
          </p>
          <p style={{ fontFamily: 'var(--font-geist)', fontSize: '15px', color: 'var(--muted)', lineHeight: 1.8, maxWidth: '560px', marginBottom: '20px' }}>
            At SPPU, I led the BA workstream for IDDAC — a ₹855L government analytics platform for Maharashtra&rsquo;s Tribal Development Department, engaging 35+ stakeholders from Secretary level to district offices. At Opine Group, I owned a Finance Dashboard end-to-end as the sole on-site BA and BI resource at Sarvatra Technologies. At Brintons Carpets, I owned the KPI reporting framework and led RCA investigations reporting directly to the Executive Director of Group Operations. Currently applying AI tooling to accelerate BA and BI delivery cycles — including directing the delivery of a production portfolio website and personal design system using Claude Code, with zero prior coding experience.
          </p>
          <p style={{ fontFamily: 'var(--font-geist)', fontSize: '15px', color: 'var(--muted)', lineHeight: 1.8, maxWidth: '560px' }}>
            The throughline across 15+ years: structured diagnosis. Understanding what&rsquo;s actually wrong before prescribing any solution.
          </p>
        </div>

        {/* Right — headshot */}
        <div className="about-content" style={{ opacity: 0 }}>
          <div style={{ position: 'relative', borderRadius: '12px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.07)', aspectRatio: '4/5', width: '100%', boxShadow: '0 0 40px 0 rgba(255,200,120,0.07), 0 0 80px 0 rgba(255,140,60,0.04)' }}>
            <img
              src="/Images/Abhi%20Formal%20corporate%20headshot%20-%20AI.png"
              alt="Abhishek Anil Kininge"
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            />
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 767px) {
          .about-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}
