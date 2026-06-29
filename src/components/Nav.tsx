'use client'
import { useEffect, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'
import gsap from 'gsap'

const NAV_LINKS = [
  { label: 'HOME',        href: '#hero' },
  { label: 'WORK',        href: '#work' },
  { label: 'PROJECTS',    href: '#work-projects' },
  { label: 'ABOUT',       href: '#about' },
  { label: 'CREDENTIALS', href: '#certs' },
  { label: 'CONTACT',     href: '#contact' },
]

const SECTIONS = ['hero', 'work', 'work-projects', 'about', 'certs', 'contact']

export default function Nav() {
  const [activeSection, setActiveSection] = useState('')
  const [menuOpen, setMenuOpen]           = useState(false)
  const overlayRef = useRef<HTMLDivElement>(null)
  const pathname   = usePathname()
  const isHome     = pathname === '/'

  useEffect(() => {
    const observers: IntersectionObserver[] = []
    SECTIONS.forEach((id) => {
      const el = document.getElementById(id)
      if (!el) return
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id) },
        { threshold: 0.35 }
      )
      obs.observe(el)
      observers.push(obs)
    })
    return () => observers.forEach((obs) => obs.disconnect())
  }, [])

  useEffect(() => {
    const overlay = overlayRef.current
    if (!overlay) return
    if (menuOpen) {
      overlay.style.display = 'flex'
      gsap.fromTo(overlay, { opacity: 0 }, { opacity: 1, duration: 0.3 })
      gsap.fromTo('.mobile-nav-link', { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.4, stagger: 0.07, ease: 'power2.out', delay: 0.1 })
    } else {
      gsap.to(overlay, { opacity: 0, duration: 0.25, onComplete: () => { overlay.style.display = 'none' } })
    }
  }, [menuOpen])

  const scrollTo = (href: string) => {
    if (!isHome) {
      window.location.href = '/' + href
      return
    }
    if (href === '#hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else {
      const id = href.replace('#', '')
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    }
    setMenuOpen(false)
  }

  return (
    <>
      <nav
        style={{
          position:     'fixed',
          top:           0,
          left:          0,
          right:         0,
          zIndex:        1000,
          display:      'flex',
          alignItems:   'center',
          justifyContent: 'space-between',
          padding:      '0 clamp(24px,4vw,60px)',
          height:       '72px',
          background:   `radial-gradient(ellipse at 50% 120%, rgba(255,248,225,0.09) 0%, transparent 100%), rgba(17,17,17,0.90)`,
          backdropFilter:       'blur(10.5px)',
          WebkitBackdropFilter: 'blur(10.5px)',
          borderBottom: '1px solid rgba(255,255,255,0.07)',
        }}
      >
        {/* Logo */}
        <a
          href={isHome ? '#hero' : '/#hero'}
          onClick={(e) => { e.preventDefault(); scrollTo('#hero') }}
          style={{ fontFamily: 'var(--font-fraunces)', fontSize: '20px', fontWeight: 400, color: 'var(--text)', textDecoration: 'none', letterSpacing: '-0.5px' }}
          data-cursor="hover"
        >
          AK<span style={{ color: 'var(--accent)' }}>.</span>
        </a>

        {/* Desktop links */}
        <ul style={{ display: 'flex', gap: '36px', listStyle: 'none' }} className="hidden-mobile">
          {NAV_LINKS.map((link) => {
            const id = link.href.replace('#', '')
            const isActive = activeSection === id
            return (
              <li key={link.label}>
                <a
                  href={link.href}
                  onClick={(e) => { e.preventDefault(); scrollTo(link.href) }}
                  data-cursor="hover"
                  style={{ fontFamily: 'var(--font-jetbrains)', fontSize: '12px', letterSpacing: '1.2px', color: isActive ? 'var(--accent)' : 'var(--muted)', textDecoration: 'none', transition: 'color 0.2s ease' }}
                >
                  {link.label}
                </a>
              </li>
            )
          })}
        </ul>

        {/* CTA + Hamburger (right side) */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <a
            href={isHome ? '#contact' : '/#contact'}
            onClick={(e) => { e.preventDefault(); scrollTo('#contact') }}
            className="nav-cta"
            data-cursor="hover"
            style={{
              fontFamily:    'var(--font-jetbrains)',
              fontSize:      '11px',
              letterSpacing: '1px',
              textTransform: 'uppercase',
              color:         '#FFFFFF',
              background:    '#FF5A00',
              borderRadius:  0,
              padding:       '8px 18px',
              textDecoration: 'none',
              border:        'none',
              transition:    'background 200ms ease',
              flexShrink:    0,
            }}
          >
            Let&apos;s Talk
          </a>

          {/* Hamburger — mobile only */}
          <button
            onClick={() => setMenuOpen(true)}
            className="show-mobile"
            style={{ background: 'none', border: 'none', padding: '8px', display: 'flex', flexDirection: 'column', gap: '5px' }}
            aria-label="Open menu"
          >
            {[0, 1, 2].map((i) => (
              <span key={i} style={{ display: 'block', width: '22px', height: '1.5px', background: 'var(--text)', borderRadius: '1px' }} />
            ))}
          </button>
        </div>
      </nav>

      {/* Mobile overlay */}
      <div
        ref={overlayRef}
        style={{ position: 'fixed', inset: 0, background: 'var(--bg)', zIndex: 9000, display: 'none', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '40px' }}
      >
        <button
          onClick={() => setMenuOpen(false)}
          style={{ position: 'absolute', top: '24px', right: '24px', background: 'none', border: 'none', color: 'var(--text)', fontSize: '24px', padding: '8px' }}
          aria-label="Close menu"
        >
          ✕
        </button>
        {NAV_LINKS.map((link) => (
          <a
            key={link.label}
            href={link.href}
            className="mobile-nav-link"
            onClick={(e) => { e.preventDefault(); scrollTo(link.href) }}
            style={{ fontFamily: 'var(--font-fraunces)', fontSize: '40px', fontWeight: 400, color: 'var(--text)', textDecoration: 'none', opacity: 0 }}
          >
            {link.label}
          </a>
        ))}
      </div>

      <style>{`
        @media (min-width: 768px) {
          .hidden-mobile { display: flex !important; }
          .show-mobile   { display: none  !important; }
        }
        @media (max-width: 767px) {
          .hidden-mobile { display: none  !important; }
          .show-mobile   { display: flex  !important; }
          .nav-cta { padding: 6px 12px !important; }
        }
        .nav-cta:hover { background: rgba(255,90,0,0.85) !important; }
      `}</style>
    </>
  )
}
