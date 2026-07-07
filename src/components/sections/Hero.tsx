'use client'
import { useEffect, useRef, useCallback } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { usePreloader } from '@/components/PreloaderContext'

gsap.registerPlugin(ScrollTrigger)

const PC_DESKTOP = 90
const PC_MOBILE  = 55
const CD_DESKTOP = 140
const CD_MOBILE  = 110
const MAX_V      = 0.28
const REPEL_R    = 100
const REPEL_F    = 0.55

interface Particle { x: number; y: number; vx: number; vy: number; r: number }

export default function Hero() {
  const canvasRef    = useRef<HTMLCanvasElement>(null)
  const mouseRef     = useRef({ x: -9999, y: -9999 })
  const particlesRef = useRef<Particle[]>([])
  const animRef      = useRef<number>(0)
  const sectionRef   = useRef<HTMLElement>(null)
  const cardRef      = useRef<HTMLDivElement>(null)
  const { isComplete } = usePreloader()

  const initParticles = useCallback((w: number, h: number) => {
    const count = w < 768 ? PC_MOBILE : PC_DESKTOP
    const list: Particle[] = []
    for (let i = 0; i < count; i++) {
      list.push({ x: Math.random() * w, y: Math.random() * h, vx: (Math.random() - 0.5) * MAX_V * 2, vy: (Math.random() - 0.5) * MAX_V * 2, r: 0.4 + Math.random() * 1.2 })
    }
    particlesRef.current = list
  }, [])

  // ── Particle canvas ─────────────────────────────────────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; initParticles(canvas.width, canvas.height) }
    resize()
    const onMouseMove = (e: MouseEvent) => { const rect = canvas.getBoundingClientRect(); mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top } }
    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('resize', resize)
    const draw = () => {
      const w = canvas.width, h = canvas.height, ps = particlesRef.current, m = mouseRef.current, cd = w < 768 ? CD_MOBILE : CD_DESKTOP
      ctx.fillStyle = '#0A0A0A'; ctx.fillRect(0, 0, w, h)
      for (let i = 0; i < ps.length; i++) for (let j = i + 1; j < ps.length; j++) {
        const dx = ps[i].x - ps[j].x, dy = ps[i].y - ps[j].y, d = Math.sqrt(dx*dx + dy*dy)
        if (d < cd) { ctx.beginPath(); ctx.strokeStyle = `rgba(255,90,0,${(1 - d/cd)*0.13})`; ctx.lineWidth = 0.5; ctx.moveTo(ps[i].x, ps[i].y); ctx.lineTo(ps[j].x, ps[j].y); ctx.stroke() }
      }
      for (const p of ps) {
        const dx = p.x - m.x, dy = p.y - m.y, d = Math.sqrt(dx*dx + dy*dy)
        if (d < REPEL_R && d > 0) { const f = ((REPEL_R - d)/REPEL_R)*REPEL_F; p.vx += (dx/d)*f; p.vy += (dy/d)*f }
        const sp = Math.sqrt(p.vx*p.vx + p.vy*p.vy)
        if (sp > MAX_V) { p.vx = (p.vx/sp)*MAX_V; p.vy = (p.vy/sp)*MAX_V }
        p.x += p.vx; p.y += p.vy
        if (p.x < 0 || p.x > w) { p.vx *= -1; p.x = Math.max(0, Math.min(w, p.x)) }
        if (p.y < 0 || p.y > h) { p.vy *= -1; p.y = Math.max(0, Math.min(h, p.y)) }
        ctx.beginPath(); ctx.fillStyle = `rgba(255,90,0,${0.22 + p.r*0.10})`; ctx.arc(p.x, p.y, p.r, 0, Math.PI*2); ctx.fill()
      }
      animRef.current = requestAnimationFrame(draw)
    }
    draw()
    return () => { cancelAnimationFrame(animRef.current); window.removeEventListener('mousemove', onMouseMove); window.removeEventListener('resize', resize) }
  }, [initParticles])

  // ── Entrance choreography + interactions ────────────────────────────────────
  useEffect(() => {
    if (!isComplete) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const section = sectionRef.current
    if (!section) return

    const ctx = gsap.context(() => {
      if (reduce) {
        // Reduced motion: single quick fade of the final state
        gsap.set(['.hero-line span', '.hero-dot', '.card-num', '.card-bc'], { clearProps: 'all' })
        gsap.fromTo(
          ['.hero-eyebrow', '.hero-line span', '.hero-tagline', '.hero-ctas', '.hero-card', '.scroll-indicator'],
          { opacity: 0 },
          { opacity: 1, duration: 0.5, ease: 'power1.out' }
        )
        return
      }

      const tl = gsap.timeline({ delay: 0.1 })
      tl.fromTo('.hero-eyebrow',  { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.5 })
        .fromTo('.hero-line span',{ yPercent: 112 },     { yPercent: 0, duration: 0.9, stagger: 0.12, ease: 'power3.out' }, '-=0.2')
        .fromTo('.hero-dot',      { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.5, ease: 'back.out(1.7)' }, '-=0.35')
        .fromTo('.hero-tagline',  { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.5 }, '-=0.4')
        .fromTo('.hero-card',     { opacity: 0, x: 40 }, { opacity: 1, x: 0, duration: 0.9, ease: 'power3.out' }, '-=1.0')
        .fromTo('.card-dot',      { opacity: 0 },        { opacity: 1, duration: 0.3, stagger: 0.04 }, '-=0.5')
        .fromTo('.card-num',      { clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)', duration: 0.8, ease: 'power3.out' }, '-=0.3')
        .fromTo('.card-bc',       { clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)', duration: 0.7, ease: 'power2.out' }, '-=0.4')
        .fromTo('.hero-ctas',     { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.5 }, '-=0.9')
        .fromTo('.scroll-indicator', { opacity: 0 },     { opacity: 1, duration: 0.4 }, '-=0.2')

      // Idle: orange dot pulse + card float (kept visible/continuous so the section never sits static)
      gsap.to('.hero-dot', { scale: 0.78, opacity: 0.5, duration: 1.1, ease: 'sine.inOut', yoyo: true, repeat: -1, delay: 1.8 })
      gsap.to('.hero-card', { y: -10, duration: 2.6, ease: 'sine.inOut', yoyo: true, repeat: -1, delay: 1.6 })

      // Card 3D cursor-tilt
      const card = cardRef.current
      if (card) {
        const rotX = gsap.quickTo(card, 'rotationX', { duration: 0.5, ease: 'power2.out' })
        const rotY = gsap.quickTo(card, 'rotationY', { duration: 0.5, ease: 'power2.out' })
        const onMove = (e: MouseEvent) => {
          const r = section.getBoundingClientRect()
          const cx = (e.clientX - r.left) / r.width - 0.5
          const cy = (e.clientY - r.top) / r.height - 0.5
          rotY(cx * 8); rotX(-cy * 8)
        }
        const onLeave = () => { rotX(0); rotY(0) }
        section.addEventListener('mousemove', onMove)
        section.addEventListener('mouseleave', onLeave)
        gsap.set(card, { transformPerspective: 800, transformOrigin: 'center' })
      }

      // Magnetic CTA buttons
      const magnets: Array<() => void> = []
      section.querySelectorAll<HTMLElement>('.magnetic').forEach((el) => {
        const mX = gsap.quickTo(el, 'x', { duration: 0.4, ease: 'power3.out' })
        const mY = gsap.quickTo(el, 'y', { duration: 0.4, ease: 'power3.out' })
        const onMove = (e: MouseEvent) => {
          const r = el.getBoundingClientRect()
          mX((e.clientX - (r.left + r.width / 2)) * 0.35)
          mY((e.clientY - (r.top + r.height / 2)) * 0.35)
        }
        const onLeave = () => { mX(0); mY(0) }
        el.addEventListener('mousemove', onMove)
        el.addEventListener('mouseleave', onLeave)
        magnets.push(() => { el.removeEventListener('mousemove', onMove); el.removeEventListener('mouseleave', onLeave) })
      })

      // Scroll parallax — text and card drift at different rates
      gsap.to('.hero-left', { yPercent: -12, ease: 'none', scrollTrigger: { trigger: section, start: 'top top', end: 'bottom top', scrub: true } })
      gsap.to('.hero-card-wrap', { yPercent: 22, ease: 'none', scrollTrigger: { trigger: section, start: 'top top', end: 'bottom top', scrub: true } })

      return () => { magnets.forEach((fn) => fn()) }
    }, section)

    return () => ctx.revert()
  }, [isComplete])

  const mono = { fontFamily: 'var(--font-jetbrains)' } as const
  const outlineBtn: React.CSSProperties = {
    background: 'transparent', border: '1px solid rgba(255,255,255,0.14)', color: 'var(--muted)',
    padding: '11px 18px', borderRadius: 0, ...mono, fontSize: '12px', letterSpacing: '0.5px',
    textDecoration: 'none', transition: 'border-color 0.2s ease, color 0.2s ease', display: 'inline-block',
  }
  const cardLabel: React.CSSProperties = { ...mono, fontSize: '8px', letterSpacing: '1px', color: '#F2F0EB', textTransform: 'uppercase' }
  const barcodePattern = 'repeating-linear-gradient(90deg,#0A0A0A 0px 2px, transparent 2px 3px, #0A0A0A 3px 4px, transparent 4px 7px, #0A0A0A 7px 11px, transparent 11px 12px, #0A0A0A 12px 13px, transparent 13px 14px, #0A0A0A 14px 17px, transparent 17px 19px, #0A0A0A 19px 20px, transparent 20px 24px)'

  return (
    <section id="hero" ref={sectionRef} style={{ position: 'relative', width: '100%', minHeight: '100svh', overflow: 'hidden', background: 'var(--bg)' }}>
      <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, zIndex: 0 }} />

      {/* Main grid */}
      <div className="hero-grid" style={{ position: 'relative', zIndex: 1, minHeight: '100svh', maxWidth: '1280px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 420px', gap: 'clamp(24px,4vw,56px)', alignItems: 'center', padding: 'clamp(90px,12vh,120px) clamp(24px,5vw,60px)', boxSizing: 'border-box' }}>

        {/* Left column */}
        <div className="hero-left" style={{ textAlign: 'left' }}>
          <div className="hero-eyebrow" style={{ ...mono, fontSize: '10px', letterSpacing: '2.5px', color: 'rgba(255,90,0,0.65)', textTransform: 'uppercase', marginBottom: '20px', opacity: 0 }}>
            Open to Remote · Independent BA &amp; BI Consultant
          </div>

          <h1 style={{ fontFamily: 'var(--font-fraunces)', fontSize: 'clamp(44px,7vw,84px)', fontWeight: 400, letterSpacing: '-2px', color: 'var(--text)', lineHeight: 1.0, margin: 0 }}>
            <span className="hero-line" style={{ display: 'block', overflow: 'hidden' }}>
              <span style={{ display: 'block' }}>Abhishek</span>
            </span>
            <span className="hero-line" style={{ display: 'block', overflow: 'hidden' }}>
              <span style={{ display: 'block' }}>Anil Kininge<span className="hero-dot" style={{ color: 'var(--accent)', display: 'inline-block' }}>.</span></span>
            </span>
          </h1>

          <div className="hero-tagline" style={{ ...mono, fontSize: '10px', letterSpacing: '2px', color: 'rgba(255,90,0,0.5)', textTransform: 'uppercase', margin: '22px 0 32px', opacity: 0 }}>
            Structured Diagnosis for Business, Systems &amp; AI
          </div>

          <div className="hero-ctas" style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', opacity: 0 }}>
            <a
              href="#work-projects"
              data-cursor="hover"
              className="magnetic"
              onClick={(e) => { e.preventDefault(); document.getElementById('work-projects')?.scrollIntoView({ behavior: 'smooth' }) }}
              style={{ background: 'var(--accent)', color: '#fff', padding: '11px 22px', borderRadius: 0, ...mono, fontSize: '12px', letterSpacing: '0.5px', textDecoration: 'none', transition: 'background 0.2s ease', display: 'inline-block' }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = '#d44d00' }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = 'var(--accent)' }}
            >
              View Case Studies →
            </a>
            <a href="/CV/Abhishek_CV_BA.pdf" download data-cursor="hover" className="magnetic" style={outlineBtn}
              onMouseEnter={(e) => { const el = e.currentTarget as HTMLElement; el.style.borderColor = 'rgba(255,90,0,0.4)'; el.style.color = 'var(--text)' }}
              onMouseLeave={(e) => { const el = e.currentTarget as HTMLElement; el.style.borderColor = 'rgba(255,255,255,0.14)'; el.style.color = 'var(--muted)' }}>
              BA CV ↓
            </a>
            <a href="/CV/Abhishek_CV_BI.pdf" download data-cursor="hover" className="magnetic" style={outlineBtn}
              onMouseEnter={(e) => { const el = e.currentTarget as HTMLElement; el.style.borderColor = 'rgba(255,90,0,0.4)'; el.style.color = 'var(--text)' }}
              onMouseLeave={(e) => { const el = e.currentTarget as HTMLElement; el.style.borderColor = 'rgba(255,255,255,0.14)'; el.style.color = 'var(--muted)' }}>
              BI CV ↓
            </a>
            <a href="https://www.linkedin.com/in/abhishekkininge/" target="_blank" rel="noopener noreferrer" data-cursor="hover" className="magnetic" style={outlineBtn}
              onMouseEnter={(e) => { const el = e.currentTarget as HTMLElement; el.style.borderColor = 'rgba(255,90,0,0.4)'; el.style.color = 'var(--text)' }}
              onMouseLeave={(e) => { const el = e.currentTarget as HTMLElement; el.style.borderColor = 'rgba(255,255,255,0.14)'; el.style.color = 'var(--muted)' }}>
              LinkedIn ↗
            </a>
          </div>
        </div>

        {/* Right column — PROFILE card */}
        <div className="hero-card-wrap" style={{ display: 'flex', justifyContent: 'center' }}>
          <div ref={cardRef} className="hero-card" style={{ width: '100%', maxWidth: '416px', aspectRatio: '13 / 17', borderRadius: '4px', overflow: 'hidden', display: 'flex', boxShadow: '0 18px 50px rgba(0,0,0,0.45)', opacity: 0, willChange: 'transform' }}>
            {/* Gray spine */}
            <div style={{ width: '48px', background: '#4B4B4B', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <span style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)', fontFamily: 'var(--font-anton)', fontSize: '17px', letterSpacing: '3px', color: '#F2F0EB', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>
                PROFILE / BA·BI / AK-2026
              </span>
            </div>
            {/* Orange body */}
            <div style={{ flex: 1, background: 'var(--accent)', padding: '32px 29px', display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={cardLabel}>PROFILE</span>
                <span style={cardLabel}>NO. AK/01</span>
              </div>
              <div style={{ margin: '26px 0', display: 'grid', gridTemplateColumns: 'repeat(7,1fr)', gap: '6px', fontSize: '18px', lineHeight: 1 }}>
                {[1, 1, 1, 0, 0, 1, 0].map((on, i) => (
                  <span key={i} className="card-dot" style={{ color: on ? '#0A0A0A' : 'rgba(10,10,10,0.3)' }}>•</span>
                ))}
              </div>
              <div className="card-num" style={{ fontFamily: 'var(--font-anton)', fontSize: '67px', lineHeight: 0.85, color: '#F2F0EB', letterSpacing: '-1.5px', textTransform: 'uppercase' }}>
                BA·BI<br />AI
              </div>
              <div style={{ ...mono, fontSize: '13px', lineHeight: 1.55, color: 'rgba(242,240,235,0.85)', textTransform: 'uppercase', marginTop: '19px', marginBottom: 'auto' }}>
                15+ yrs · govt, BFSI &amp; manufacturing. Power BI, process, AI-augmented.
              </div>
              <div className="card-bc" style={{ height: '38px', background: barcodePattern, backgroundSize: '38px 100%' }} />
              <div style={{ ...mono, fontSize: '11px', letterSpacing: '1.5px', color: 'rgba(10,10,10,0.6)', marginTop: '8px' }}>6 02354 58190 — AK</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="scroll-indicator" style={{ position: 'absolute', bottom: '40px', left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', opacity: 0, zIndex: 2 }}>
        <div className="scroll-line" style={{ width: '2px', height: '40px', background: 'var(--accent)', transformOrigin: 'top' }} />
        <span style={{ ...mono, fontSize: '9px', letterSpacing: '1.5px', color: 'var(--subtle)', textTransform: 'uppercase' }}>SCROLL</span>
      </div>

      <style>{`
        @media (max-width: 767px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
            align-items: start !important;
          }
          .hero-card-wrap { justify-content: flex-start !important; }
          .hero-card { max-width: min(384px, 88vw) !important; }
        }
      `}</style>
    </section>
  )
}
