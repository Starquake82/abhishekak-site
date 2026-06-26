'use client'
import { useEffect, useRef, useCallback } from 'react'
import gsap from 'gsap'
import { usePreloader } from '@/components/PreloaderContext'

const PC_DESKTOP = 90
const PC_MOBILE  = 55
const CD_DESKTOP = 140
const CD_MOBILE  = 110
const MAX_V      = 0.28
const REPEL_R    = 100
const REPEL_F    = 0.55

interface Particle { x: number; y: number; vx: number; vy: number; r: number }

function SplitChars({ text, className }: { text: string; className?: string }) {
  return (
    <span
      className={className}
      style={{ display: 'block', overflow: 'hidden', lineHeight: 1.05 }}
    >
      {text.split('').map((char, i) => (
        <span key={i} className="char" style={{ display: 'inline-block', opacity: 0 }}>
          {char === ' ' ? ' ' : char}
        </span>
      ))}
    </span>
  )
}

export default function Hero() {
  const canvasRef    = useRef<HTMLCanvasElement>(null)
  const mouseRef     = useRef({ x: -9999, y: -9999 })
  const particlesRef = useRef<Particle[]>([])
  const animRef      = useRef<number>(0)
  const { isComplete } = usePreloader()

  const initParticles = useCallback((w: number, h: number) => {
    const count = w < 768 ? PC_MOBILE : PC_DESKTOP
    const list: Particle[] = []
    for (let i = 0; i < count; i++) {
      list.push({
        x:  Math.random() * w,
        y:  Math.random() * h,
        vx: (Math.random() - 0.5) * MAX_V * 2,
        vy: (Math.random() - 0.5) * MAX_V * 2,
        r:  0.4 + Math.random() * 1.2,
      })
    }
    particlesRef.current = list
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resize = () => {
      canvas.width  = window.innerWidth
      canvas.height = window.innerHeight
      initParticles(canvas.width, canvas.height)
    }
    resize()

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top }
    }
    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('resize', resize)

    const draw = () => {
      const w  = canvas.width
      const h  = canvas.height
      const ps = particlesRef.current
      const m  = mouseRef.current
      const cd = w < 768 ? CD_MOBILE : CD_DESKTOP

      ctx.fillStyle = '#0A0A0A'
      ctx.fillRect(0, 0, w, h)

      for (let i = 0; i < ps.length; i++) {
        for (let j = i + 1; j < ps.length; j++) {
          const dx = ps[i].x - ps[j].x
          const dy = ps[i].y - ps[j].y
          const d  = Math.sqrt(dx * dx + dy * dy)
          if (d < cd) {
            ctx.beginPath()
            ctx.strokeStyle = `rgba(255,90,0,${(1 - d / cd) * 0.13})`
            ctx.lineWidth = 0.5
            ctx.moveTo(ps[i].x, ps[i].y)
            ctx.lineTo(ps[j].x, ps[j].y)
            ctx.stroke()
          }
        }
      }

      for (const p of ps) {
        const dx = p.x - m.x
        const dy = p.y - m.y
        const d  = Math.sqrt(dx * dx + dy * dy)
        if (d < REPEL_R && d > 0) {
          const f = ((REPEL_R - d) / REPEL_R) * REPEL_F
          p.vx += (dx / d) * f
          p.vy += (dy / d) * f
        }

        const sp = Math.sqrt(p.vx * p.vx + p.vy * p.vy)
        if (sp > MAX_V) { p.vx = (p.vx / sp) * MAX_V; p.vy = (p.vy / sp) * MAX_V }

        p.x += p.vx; p.y += p.vy
        if (p.x < 0 || p.x > w) { p.vx *= -1; p.x = Math.max(0, Math.min(w, p.x)) }
        if (p.y < 0 || p.y > h) { p.vy *= -1; p.y = Math.max(0, Math.min(h, p.y)) }

        ctx.beginPath()
        ctx.fillStyle = `rgba(255,90,0,${0.22 + p.r * 0.10})`
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fill()
      }

      animRef.current = requestAnimationFrame(draw)
    }
    draw()

    return () => {
      cancelAnimationFrame(animRef.current)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('resize', resize)
    }
  }, [initParticles])

  useEffect(() => {
    if (!isComplete) return
    const tl = gsap.timeline({ delay: 0.1 })
    tl.fromTo('.hero-badge',      { opacity: 0, y: 12 },  { opacity: 1, y: 0, duration: 0.5 })
    tl.fromTo('.name-1 .char',    { opacity: 0, y: 50 },  { opacity: 1, y: 0, duration: 0.7, stagger: 0.03, ease: 'power3.out' }, '-=0.2')
    tl.fromTo('.name-2 .char',    { opacity: 0, y: 50 },  { opacity: 1, y: 0, duration: 0.7, stagger: 0.03, ease: 'power3.out' }, '-=0.5')
    tl.fromTo('.hero-dot',        { opacity: 0, scale: 0 },{ opacity: 1, scale: 1, duration: 0.3, ease: 'back.out(1.5)' }, '-=0.1')
    tl.fromTo('.hero-role',       { opacity: 0, x: -16 }, { opacity: 1, x: 0, duration: 0.5 }, '-=0.3')
    tl.fromTo('.hero-desc',       { opacity: 0, y: 12 },  { opacity: 1, y: 0, duration: 0.5 }, '-=0.2')
    tl.fromTo('.hero-ctas',       { opacity: 0, y: 12 },  { opacity: 1, y: 0, duration: 0.5 }, '-=0.2')
    tl.fromTo('.scroll-indicator',{ opacity: 0 },          { opacity: 1, duration: 0.4 }, '-=0.1')
  }, [isComplete])

  const mono = { fontFamily: 'var(--font-jetbrains)' } as const

  return (
    <section
      id="hero"
      style={{ position: 'relative', width: '100%', height: '100svh', overflow: 'hidden', background: 'var(--bg)' }}
    >
      <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, zIndex: 0 }} />

      <div
        style={{
          position: 'absolute', inset: 0, zIndex: 1,
          display: 'flex', flexDirection: 'column', justifyContent: 'center',
          padding: 'clamp(24px, 5vw, 60px)',
          paddingTop: '100px',
          paddingBottom: '100px',
        }}
      >
        {/* Badge */}
        <div className="hero-badge" style={{ opacity: 0, display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '28px', alignSelf: 'flex-start' }}>
          <span className="pulse-dot" style={{ width: '7px', height: '7px', borderRadius: '50%', background: 'var(--accent)', display: 'inline-block', flexShrink: 0 }} />
          <span style={{ ...mono, fontSize: '10px', letterSpacing: '1.2px', color: 'var(--accent)', border: '1px solid rgba(255,90,0,0.25)', padding: '5px 10px', borderRadius: '100px' }}>
            OPEN TO OPPORTUNITIES
          </span>
        </div>

        {/* Name */}
        <div style={{ fontFamily: 'var(--font-fraunces)', fontSize: 'clamp(36px, 7vw, 88px)', fontWeight: 400, letterSpacing: '-2px', color: 'var(--text)', lineHeight: 1.0, overflowWrap: 'break-word', overflow: 'visible' }}>
          <SplitChars text="Abhishek" className="name-1" />
          <span style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <SplitChars text="Anil Kininge" className="name-2" />
            <span
              className="hero-dot"
              style={{ width: 'clamp(8px,1vw,12px)', height: 'clamp(8px,1vw,12px)', borderRadius: '50%', background: 'var(--accent)', display: 'inline-block', flexShrink: 0, opacity: 0 }}
            />
          </span>
        </div>

        {/* Role */}
        <div className="hero-role" style={{ ...mono, fontSize: '11px', letterSpacing: '1px', color: 'var(--muted)', textTransform: 'uppercase', marginTop: '20px', marginBottom: '20px', opacity: 0 }}>
          SR. BA &amp; BI HYBRID &nbsp;·&nbsp; PUNE, IN
        </div>

        {/* Description */}
        <p className="hero-desc" style={{ fontFamily: 'var(--font-geist)', fontSize: '15px', color: 'var(--muted)', maxWidth: '420px', lineHeight: 1.7, marginBottom: '36px', opacity: 0 }}>
          Network of structured decisions —<br />
          diagnosing what&rsquo;s actually wrong<br />
          and building what actually works.
        </p>

        {/* CTAs */}
        <div className="hero-ctas" style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', opacity: 0 }}>
          <a
            href="#work"
            data-cursor="hover"
            onClick={(e) => { e.preventDefault(); document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' }) }}
            style={{ background: 'var(--accent)', color: '#fff', padding: '12px 24px', borderRadius: '6px', ...mono, fontSize: '12px', letterSpacing: '0.5px', textDecoration: 'none', transition: 'all 0.2s ease', display: 'inline-block' }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = '#d44d00' }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = 'var(--accent)' }}
          >
            View work →
          </a>
          <a
            href="/Abhishek_Kininge_CV.pdf"
            download
            data-cursor="hover"
            style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.12)', color: 'var(--muted)', padding: '12px 24px', borderRadius: '6px', ...mono, fontSize: '12px', letterSpacing: '0.5px', textDecoration: 'none', transition: 'all 0.2s ease', display: 'inline-block' }}
            onMouseEnter={(e) => { const el = e.currentTarget as HTMLElement; el.style.borderColor = 'rgba(255,90,0,0.4)'; el.style.color = 'var(--text)' }}
            onMouseLeave={(e) => { const el = e.currentTarget as HTMLElement; el.style.borderColor = 'rgba(255,255,255,0.12)'; el.style.color = 'var(--muted)' }}
          >
            Download CV
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="scroll-indicator" style={{ position: 'absolute', bottom: '80px', left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', opacity: 0, zIndex: 1 }}>
        <div className="scroll-line" style={{ width: '2px', height: '40px', background: 'var(--accent)', transformOrigin: 'top' }} />
        <span style={{ ...mono, fontSize: '9px', letterSpacing: '1.5px', color: 'var(--subtle)', textTransform: 'uppercase' }}>SCROLL</span>
      </div>

    </section>
  )
}
