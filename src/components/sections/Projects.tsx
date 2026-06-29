'use client'
import { useEffect, useRef, useState, useCallback } from 'react'
import Link from 'next/link'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const CARDS = [
  { num: '01', slug: 'library-management-portal',  type: 'PORTFOLIO PROJECT', domain: 'LIBRARY SYSTEMS',          name: 'Library Management Portal',                       descriptor: 'BA'           },
  { num: '02', slug: 'procurement-management-portal', type: 'PORTFOLIO PROJECT', domain: 'PROCUREMENT OPS',        name: 'Procurement Management Portal',                   descriptor: 'BA'           },
  { num: '03', slug: 'maven-aw-dashboard',          type: 'PORTFOLIO PROJECT', domain: 'SALES & RETAIL ANALYTICS',  name: 'Maven AW Power BI Dashboard',                     descriptor: 'BI'           },
  { num: '04', slug: 'finbridge-los',               type: 'PORTFOLIO PROJECT', domain: 'BFSI · LENDING',            name: 'FinBridge LOS',                                   descriptor: 'BA · BFSI'    },
  { num: '05', slug: 'brintons-runner-carpet',      type: 'CASE STUDY',        domain: 'MANUFACTURING · QA',        name: 'Brintons — Process Failure & Improvement',        descriptor: 'BA · PROCESS' },
  { num: '06', slug: 'brintons-leave-encashment',   type: 'CASE STUDY',        domain: 'MANUFACTURING · COST',      name: 'Brintons — Leave Encashment & Cost Optimisation', descriptor: 'BA · PROCESS' },
  { num: '07', slug: 'finance-analytics-dashboard', type: 'CASE STUDY',        domain: 'BFSI · FINTECH',            name: 'Finance Analytics & Dashboard',                   descriptor: 'BA · BI'      },
  { num: '08', slug: 'iddac',                       type: 'CASE STUDY',        domain: 'GOVERNMENT · ANALYTICS',    name: 'IDDAC — Govt. Analytics Platform',                descriptor: 'BA · BI'      },
]

const TOTAL = CARDS.length

function ProjectCard({ card, hovered, onEnter, onLeave }: {
  card: typeof CARDS[number]
  hovered: boolean
  onEnter: () => void
  onLeave: () => void
}) {
  const mono = { fontFamily: 'var(--font-jetbrains)' } as const

  return (
    <div
      className="proj-card"
      style={{
        position:    'relative',
        width:       '360px',
        flexShrink:   0,
        height:      '100%',
        background:  '#111111',
        border:      '1px solid rgba(255,255,255,0.07)',
        borderRadius: 0,
        overflow:    'hidden',
        boxSizing:   'border-box',
      }}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
      {/* Hover backlit glow */}
      <div style={{
        position:      'absolute',
        inset:          0,
        zIndex:         0,
        pointerEvents: 'none',
        background:    'radial-gradient(ellipse 150% 150% at 50% 30%, rgba(255,248,235,0.08) 0%, transparent 70%)',
        opacity:        hovered ? 1 : 0.5,
        transition:    'opacity 500ms ease',
      }} />

      {/* Large background number */}
      <div style={{
        position:      'absolute',
        bottom:        '-10px',
        right:         '10px',
        fontFamily:    'var(--font-fraunces)',
        fontSize:      '140px',
        fontWeight:     400,
        color:         'rgba(242,240,235,0.04)',
        lineHeight:     1,
        zIndex:         0,
        userSelect:    'none',
        pointerEvents: 'none',
        letterSpacing: '-4px',
      }}>
        {card.num}
      </div>

      {/* Card content */}
      <div style={{
        position:      'relative',
        zIndex:         1,
        height:        '100%',
        display:       'flex',
        flexDirection: 'column',
        padding:       '88px 28px 28px',
        boxSizing:     'border-box',
      }}>
        {/* Top: type label + domain tag */}
        <div style={{ flexShrink: 0 }}>
          <div style={{ ...mono, fontSize: '9px', letterSpacing: '1.2px', color: 'rgba(242,240,235,0.35)', textTransform: 'uppercase', marginBottom: '6px' }}>
            {card.type}
          </div>
          <div style={{ ...mono, fontSize: '9px', letterSpacing: '1.2px', color: '#FF5A00', textTransform: 'uppercase' }}>
            {card.domain}
          </div>
        </div>

        <div style={{ flex: 1 }} />

        {/* Bottom: project name + descriptor + divider + view link */}
        <div style={{ flexShrink: 0 }}>
          <div style={{
            fontFamily:   'var(--font-fraunces)',
            fontSize:     'clamp(20px, 2vw, 26px)',
            fontWeight:    400,
            color:        '#F2F0EB',
            lineHeight:    1.2,
            marginBottom: '8px',
          }}>
            {card.name}
          </div>
          <div style={{
            fontFamily:   'var(--font-geist)',
            fontSize:     '12px',
            color:        'rgba(242,240,235,0.40)',
            marginBottom: '20px',
          }}>
            {card.descriptor}
          </div>
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)', paddingTop: '14px' }}>
            <span
              data-cursor="hover"
              style={{
                ...mono,
                fontSize:    '11px',
                color:        hovered ? '#FF5A00' : 'rgba(242,240,235,0.30)',
                transition:  'color 300ms ease',
                display:     'inline-block',
              }}
            >
              View →
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Projects() {
  const sectionRef    = useRef<HTMLElement>(null)
  const trackRef      = useRef<HTMLDivElement>(null)
  const ctxRef        = useRef<gsap.Context | null>(null)
  const isMobileRef   = useRef(false)
  const [activeCard,  setActiveCard]  = useState(0)
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)

  const teardown = useCallback(() => {
    if (ctxRef.current) {
      ctxRef.current.revert()
      ctxRef.current = null
    }
    const track = trackRef.current
    if (track) gsap.set(track, { clearProps: 'transform' })
  }, [])

  const setupDesktop = useCallback(() => {
    const section = sectionRef.current
    const track   = trackRef.current
    if (!section || !track) return

    const ctx = gsap.context(() => {
      const rightW    = () => section.getBoundingClientRect().width * 0.7
      const scrollAmt = () => track.scrollWidth - rightW()

      gsap.to(track, {
        x:    () => -scrollAmt(),
        ease: 'none',
        scrollTrigger: {
          trigger:             section,
          pin:                 true,
          scrub:               1.2,
          start:               'top top',
          end:                 () => `+=${scrollAmt()}`,
          invalidateOnRefresh: true,
          onUpdate(self) {
            const idx = Math.round(self.progress * (TOTAL - 1))
            setActiveCard(idx)
          },
        },
      })
    }, section)

    ctxRef.current = ctx
  }, [])

  useEffect(() => {
    let resizeTimer: ReturnType<typeof setTimeout>

    const init = () => {
      const mobile = window.innerWidth < 768
      isMobileRef.current = mobile
      teardown()
      if (!mobile) setupDesktop()
    }

    init()

    const onResize = () => {
      clearTimeout(resizeTimer)
      resizeTimer = setTimeout(init, 200)
    }

    window.addEventListener('resize', onResize)
    return () => {
      window.removeEventListener('resize', onResize)
      clearTimeout(resizeTimer)
      teardown()
    }
  }, [setupDesktop, teardown])

  useEffect(() => {
    const timer = setTimeout(() => ScrollTrigger.refresh(), 100)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    const onScroll = () => {
      if (!isMobileRef.current) return
      const cardW = 360 + 24
      setActiveCard(Math.min(Math.round(track.scrollLeft / cardW), TOTAL - 1))
    }
    track.addEventListener('scroll', onScroll, { passive: true })
    return () => track.removeEventListener('scroll', onScroll)
  }, [])

  const mono    = { fontFamily: 'var(--font-jetbrains)' } as const
  const counter = `${String(activeCard + 1).padStart(2, '0')} / ${String(TOTAL).padStart(2, '0')}`

  return (
    <section
      id="work-projects"
      ref={sectionRef}
      className="projects-section"
      style={{
        height:     '100vh',
        overflow:   'hidden',
        background: 'var(--bg)',
        display:    'flex',
        position:   'relative',
      }}
    >
      {/* ── Left panel ─────────────────────────────────── */}
      <div
        className="proj-left"
        style={{
          width:                '30%',
          flexShrink:            0,
          height:               '100%',
          background:           'rgba(17,17,17,0.6)',
          backdropFilter:       'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          borderRight:          '1px solid rgba(255,255,255,0.07)',
          display:              'flex',
          flexDirection:        'column',
          padding:              'clamp(80px,8vw,100px) clamp(24px,3vw,48px) clamp(40px,5vw,60px)',
          boxSizing:            'border-box',
          zIndex:                10,
        }}
      >
        <div style={{ flex: 1 }} />

        <div style={{ ...mono, fontSize: '11px', letterSpacing: '1.2px', color: '#FF5A00', textTransform: 'uppercase', marginBottom: '20px' }}>
          // 03 PROJECTS &amp; CASE STUDIES
        </div>

        <h2 style={{
          fontFamily:    'var(--font-fraunces)',
          fontSize:      'clamp(36px, 4vw, 52px)',
          fontWeight:     400,
          color:         '#F2F0EB',
          lineHeight:     1.05,
          letterSpacing: '-1.5px',
          marginBottom:  '16px',
        }}>
          Selected Work.
        </h2>

        <p style={{
          fontFamily:   'var(--font-geist)',
          fontSize:     '14px',
          color:        'rgba(242,240,235,0.45)',
          lineHeight:    1.6,
          marginBottom: '40px',
        }}>
          Portfolio projects and real-world case studies across BA, BI, and process improvement.
        </p>

        <div style={{ ...mono, fontSize: '12px', color: 'rgba(242,240,235,0.25)', letterSpacing: '0.5px' }}>
          {counter}
        </div>
      </div>

      {/* ── Right panel — horizontal track ─────────────── */}
      <div
        className="proj-right"
        style={{
          width:    '70%',
          height:   '100%',
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        <div
          ref={trackRef}
          className="proj-track"
          style={{
            display:      'flex',
            height:       '100%',
            gap:          '24px',
            paddingLeft:  '40px',
            paddingRight: '40px',
            width:        'max-content',
            willChange:   'transform',
            alignItems:   'stretch',
          }}
        >
          {CARDS.map((card, i) => (
            <Link
              key={card.num}
              href={`/projects/${card.slug}`}
              style={{ display: 'contents', textDecoration: 'none' }}
            >
              <ProjectCard
                card={card}
                hovered={hoveredCard === i}
                onEnter={() => setHoveredCard(i)}
                onLeave={() => setHoveredCard(null)}
              />
            </Link>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 767px) {
          .projects-section {
            height: auto !important;
            flex-direction: column !important;
          }
          .proj-left {
            width: 100% !important;
            height: auto !important;
            padding: 80px 24px 32px !important;
            border-right: none !important;
            border-bottom: 1px solid rgba(255,255,255,0.07) !important;
          }
          .proj-right {
            width: 100% !important;
            height: 380px !important;
            overflow: visible !important;
          }
          .proj-track {
            overflow-x: auto !important;
            -webkit-overflow-scrolling: touch;
            scroll-snap-type: x mandatory;
            width: 100vw !important;
            padding: 16px 24px !important;
            transform: none !important;
            scrollbar-width: none;
            height: 100% !important;
          }
          .proj-track::-webkit-scrollbar { display: none; }
          .proj-card {
            width: 80vw !important;
            scroll-snap-align: start;
          }
        }
      `}</style>
    </section>
  )
}
