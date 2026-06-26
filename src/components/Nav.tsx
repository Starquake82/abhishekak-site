'use client'
import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'

const NAV_LINKS = [
  { label: 'WORK', href: '#work' },
  { label: 'ABOUT', href: '#about' },
  { label: 'CERTS', href: '#certs' },
  { label: 'CONTACT', href: '#contact' },
]

const SECTIONS = ['work', 'about', 'certs', 'contact']

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('')
  const [menuOpen, setMenuOpen] = useState(false)
  const overlayRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const observers: IntersectionObserver[] = []
    SECTIONS.forEach((id) => {
      const el = document.getElementById(id)
      if (!el) return
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id) },
        { threshold: 0.4 }
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
      gsap.fromTo(
        '.mobile-nav-link',
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.4, stagger: 0.07, ease: 'power2.out', delay: 0.1 }
      )
    } else {
      gsap.to(overlay, {
        opacity: 0,
        duration: 0.25,
        onComplete: () => { overlay.style.display = 'none' },
      })
    }
  }, [menuOpen])

  const scrollTo = (href: string) => {
    const id = href.replace('#', '')
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
    setMenuOpen(false)
  }

  return (
    <>
      <nav
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 clamp(24px, 4vw, 60px)',
          height: '72px',
          transition: 'background 0.3s ease, border-color 0.3s ease, backdrop-filter 0.3s ease',
          background: scrolled ? 'rgba(10,10,10,0.88)' : 'transparent',
          backdropFilter: scrolled ? 'blur(12px)' : 'none',
          borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent',
        }}
      >
        {/* Logo */}
        <a
          href="#hero"
          onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
          style={{
            fontFamily: 'var(--font-fraunces)',
            fontSize: '20px',
            fontWeight: 400,
            color: 'var(--text)',
            textDecoration: 'none',
            letterSpacing: '-0.5px',
          }}
          data-cursor="hover"
        >
          AK<span style={{ color: 'var(--accent)' }}>.</span>
        </a>

        {/* Desktop links */}
        <ul
          style={{
            display: 'flex',
            gap: '36px',
            listStyle: 'none',
          }}
          className="hidden-mobile"
        >
          {NAV_LINKS.map((link) => {
            const id = link.href.replace('#', '')
            const isActive = activeSection === id
            return (
              <li key={link.label}>
                <a
                  href={link.href}
                  onClick={(e) => { e.preventDefault(); scrollTo(link.href) }}
                  data-cursor="hover"
                  style={{
                    fontFamily: 'var(--font-jetbrains)',
                    fontSize: '10px',
                    letterSpacing: '1.2px',
                    color: isActive ? 'var(--accent)' : 'var(--muted)',
                    textDecoration: 'none',
                    transition: 'color 0.2s ease',
                  }}
                >
                  {link.label}
                </a>
              </li>
            )
          })}
        </ul>

        {/* Hamburger */}
        <button
          onClick={() => setMenuOpen(true)}
          className="show-mobile"
          style={{
            background: 'none',
            border: 'none',
            padding: '8px',
            display: 'flex',
            flexDirection: 'column',
            gap: '5px',
          }}
          aria-label="Open menu"
        >
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              style={{
                display: 'block',
                width: '22px',
                height: '1.5px',
                background: 'var(--text)',
                borderRadius: '1px',
              }}
            />
          ))}
        </button>
      </nav>

      {/* Mobile overlay */}
      <div
        ref={overlayRef}
        style={{
          position: 'fixed',
          inset: 0,
          background: 'var(--bg)',
          zIndex: 9000,
          display: 'none',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '40px',
        }}
      >
        {/* Close button */}
        <button
          onClick={() => setMenuOpen(false)}
          style={{
            position: 'absolute',
            top: '24px',
            right: '24px',
            background: 'none',
            border: 'none',
            color: 'var(--text)',
            fontSize: '24px',
            padding: '8px',
          }}
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
            style={{
              fontFamily: 'var(--font-fraunces)',
              fontSize: '40px',
              fontWeight: 400,
              color: 'var(--text)',
              textDecoration: 'none',
              opacity: 0,
            }}
          >
            {link.label}
          </a>
        ))}
      </div>

      <style>{`
        @media (min-width: 768px) {
          .hidden-mobile { display: flex !important; }
          .show-mobile { display: none !important; }
        }
        @media (max-width: 767px) {
          .hidden-mobile { display: none !important; }
          .show-mobile { display: flex !important; }
        }
      `}</style>
    </>
  )
}
