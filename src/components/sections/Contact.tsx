'use client'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const SOCIAL_LINKS = [
  { label: 'LinkedIn ↗', href: 'https://www.linkedin.com/in/abhishekkininge/' },
  { label: 'GitHub ↗',   href: 'https://github.com/Starquake82' },
]

function SplitWords({ text, className }: { text: string; className?: string }) {
  return (
    <span className={className} style={{ display: 'block' }}>
      {text.split(' ').map((word, i) => (
        <span key={i} style={{ display: 'inline-block', overflow: 'hidden', marginRight: '0.25em' }}>
          <span className="contact-word" style={{ display: 'inline-block', opacity: 0 }}>{word}</span>
        </span>
      ))}
    </span>
  )
}

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    gsap.fromTo(
      '.contact-word',
      { opacity: 0, y: 30 },
      {
        opacity: 1, y: 0, duration: 0.7, stagger: 0.08, ease: 'power2.out',
        scrollTrigger: { trigger: el, start: 'top 72%', once: true },
      }
    )
    gsap.fromTo(
      '.contact-body',
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out', delay: 0.3, scrollTrigger: { trigger: el, start: 'top 72%', once: true } }
    )
  }, [])

  const mono = { fontFamily: 'var(--font-jetbrains)' } as const

  return (
    <>
      <section
        id="contact"
        ref={sectionRef}
        style={{ background: 'var(--bg)', borderTop: '1px solid var(--border)', padding: 'clamp(80px,10vw,140px) clamp(24px,5vw,60px)' }}
      >
        <div style={{ maxWidth: '900px' }}>
          <div style={{ fontFamily: 'var(--font-fraunces)', fontSize: 'clamp(44px,8vw,80px)', fontWeight: 400, letterSpacing: '-2px', color: 'var(--text)', lineHeight: 1.05, marginBottom: '16px' }}>
            <SplitWords text="Start a" />
            <SplitWords text="Conversation." />
          </div>

          <p className="contact-body" style={{ fontFamily: 'var(--font-geist)', fontSize: '15px', color: 'var(--muted)', lineHeight: 1.7, maxWidth: '480px', marginBottom: '40px', opacity: 0 }}>
            Open to consulting engagements, senior BA/BI roles, and strategic collaborations.
          </p>

          <div className="contact-body" style={{ opacity: 0 }}>
            <a
              href="mailto:san.abhishek@gmail.com"
              data-cursor="hover"
              style={{ ...mono, fontSize: '14px', color: 'var(--accent)', textDecoration: 'none', display: 'inline-block', marginBottom: '8px', transition: 'opacity 0.2s' }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.textDecoration = 'underline' }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.textDecoration = 'none' }}
            >
              san.abhishek@gmail.com
            </a>
            <p style={{ ...mono, fontSize: '14px', color: 'var(--muted)', marginBottom: '16px' }}>
              +91 85520 31448
            </p>
            <p style={{ ...mono, fontSize: '11px', letterSpacing: '0.5px', color: 'var(--muted)', marginBottom: '40px' }}>
              Pune, India · Open to remote
            </p>

            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              {SOCIAL_LINKS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="hover"
                  style={{
                    ...mono, fontSize: '11px', letterSpacing: '0.5px', color: 'var(--muted)',
                    textDecoration: 'none', border: '1px solid var(--border)',
                    padding: '10px 18px', borderRadius: 0, transition: 'all 0.2s ease',
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
                  {s.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ borderTop: '1px solid var(--border)', padding: '20px clamp(24px,5vw,60px)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
        <span style={{ ...mono, fontSize: '10px', letterSpacing: '0.3px', color: 'var(--subtle)' }}>
          © 2026 Abhishek Anil Kininge
        </span>
        <span style={{ ...mono, fontSize: '10px', letterSpacing: '0.3px', color: 'var(--subtle)' }}>
          Built with Claude Code · abhishekak.site
        </span>
      </footer>
    </>
  )
}
