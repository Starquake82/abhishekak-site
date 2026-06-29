'use client'
import { useEffect, useRef, useState, useCallback } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import ScrollToPlugin from 'gsap/ScrollToPlugin'

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)

const PROJECTS = [
  {
    id: 0,
    domain: 'LIBRARY SYSTEMS',
    name: 'BACentric — Library Management Portal',
    desc: 'Full-cycle business analysis deliverable covering requirements elicitation, BRD, and stakeholder sign-off for a library management system.',
    tags: ['Business Analysis', 'Requirements', 'BRD'],
    link: '#',
  },
  {
    id: 1,
    domain: 'PROCUREMENT OPS',
    name: 'BACentric — Procurement Management Portal',
    desc: 'End-to-end procurement portal analysis with BPMN process maps, UAT planning, and traceability matrices.',
    tags: ['Process Design', 'UAT', 'BPMN'],
    link: '#',
  },
  {
    id: 2,
    domain: 'AVIATION ANALYTICS',
    name: 'Maven Airlines Power BI Dashboard',
    desc: 'Multi-page Power BI report with custom DAX measures, dimensional data model, and executive-level KPI views.',
    tags: ['Data Modelling', 'DAX', 'Power BI'],
    link: '#',
  },
  {
    id: 3,
    domain: 'BFSI · LENDING',
    name: 'FinBridge LOS — Credit Decision Module',
    desc: 'Phase 1 BRD and process design for a loan origination system credit decision module in a lending operations context.',
    tags: ['Lending Operations', 'BRD', 'Phase 1'],
    link: '#',
  },
]

const CARD_BG = `linear-gradient(
  135deg,
  rgba(10,8,8,0.45) 0%,
  rgba(10,8,8,0.30) 100%
), rgba(255,255,255,0.06)`

const SECTION_BG = '#0A0A0A'

const TOTAL = PROJECTS.length

export default function Projects() {
  const sectionRef  = useRef<HTMLElement>(null)
  const trackRef    = useRef<HTMLDivElement>(null)
  const triggerRef  = useRef<ScrollTrigger | null>(null)
  const ctxRef      = useRef<gsap.Context | null>(null)
  const isMobileRef = useRef(false)
  const [activeCard, setActiveCard] = useState(0)

  const getScrollAmount = useCallback(() => {
    const track = trackRef.current
    if (!track) return 0
    return -(track.scrollWidth - window.innerWidth)
  }, [])

  const teardown = useCallback(() => {
    if (ctxRef.current) {
      ctxRef.current.revert()
      ctxRef.current = null
    }
    triggerRef.current = null
    const track = trackRef.current
    if (track) gsap.set(track, { clearProps: 'transform' })
  }, [])

  const setupDesktop = useCallback(() => {
    const section = sectionRef.current
    const track   = trackRef.current
    if (!section || !track) return

    const ctx = gsap.context(() => {
      gsap.to(track, {
        x: getScrollAmount,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          pin: true,
          scrub: 1.2,
          start: 'top top',
          end: () => `+=${track.scrollWidth - window.innerWidth}`,
          invalidateOnRefresh: true,
          onUpdate(self) {
            triggerRef.current = self
            setActiveCard(Math.round(self.progress * (TOTAL - 1)))
          },
        },
      })
    }, section)

    ctxRef.current = ctx
  }, [getScrollAmount])

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

  // Force ScrollTrigger to recalculate after fonts/layout settle
  useEffect(() => {
    const timer = setTimeout(() => ScrollTrigger.refresh(), 100)
    return () => clearTimeout(timer)
  }, [])

  // Mobile: update dots via native scroll
  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    const onScroll = () => {
      if (!isMobileRef.current) return
      const cardW = 400 + 24
      setActiveCard(Math.min(Math.round(track.scrollLeft / cardW), TOTAL - 1))
    }
    track.addEventListener('scroll', onScroll, { passive: true })
    return () => track.removeEventListener('scroll', onScroll)
  }, [])

  const scrollToCard = (idx: number) => {
    const clamped = Math.max(0, Math.min(TOTAL - 1, idx))
    if (isMobileRef.current) {
      const track = trackRef.current
      if (!track) return
      track.scrollTo({ left: clamped * (400 + 24), behavior: 'smooth' })
      return
    }
    const trigger = triggerRef.current
    if (!trigger) return
    const progress = TOTAL > 1 ? clamped / (TOTAL - 1) : 0
    const targetY  = trigger.start + progress * (trigger.end - trigger.start)
    gsap.to(window, { scrollTo: targetY, duration: 0.8, ease: 'power2.inOut' })
  }

  const mono = { fontFamily: 'var(--font-jetbrains)' } as const

  return (
    <section
      id="work-projects"
      ref={sectionRef}
      className="projects-section"
      style={{ background: SECTION_BG, paddingTop: '100px', paddingBottom: 0, overflow: 'hidden' }}
    >
      {/* Header */}
      <div style={{ padding: '0 clamp(24px,5vw,60px)', marginBottom: '48px' }}>
        <div style={{ ...mono, fontSize: '10px', letterSpacing: '1.2px', color: 'var(--accent)', textTransform: 'uppercase', marginBottom: '16px' }}>
          // 03 WORK
        </div>
        <h2 style={{ fontFamily: 'var(--font-fraunces)', fontSize: 'clamp(28px,4vw,48px)', fontWeight: 400, color: 'var(--text)', letterSpacing: '-1px', marginBottom: '12px', lineHeight: 1.1 }}>
          Selected projects
        </h2>
        <p style={{ ...mono, fontSize: '11px', color: 'var(--subtle)', letterSpacing: '0.3px' }}>
          ↓ scroll — cards travel ←
        </p>
      </div>

      {/* Cards track */}
      <div
        ref={trackRef}
        className="cards-track"
        style={{
          display: 'flex',
          gap: '24px',
          paddingLeft: '60px',
          paddingRight: '60px',
          width: 'max-content',
          willChange: 'transform',
        }}
      >
        {PROJECTS.map((p, i) => (
          <div
            key={p.id}
            className="project-card"
            style={{
              background:          CARD_BG,
              backdropFilter:      'blur(24px) saturate(1.5)',
              WebkitBackdropFilter:'blur(24px) saturate(1.5)',
              border:              '1px solid rgba(255,255,255,0.10)',
              borderRadius:        0,
              padding:             '28px',
              width:               '400px',
              minWidth:            '400px',
              minHeight:           '320px',
              flexShrink:          0,
              position:            'relative',
              overflow:            'hidden',
              transition:          'transform 0.3s ease',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-4px)' }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)' }}
          >
            {/* Backlit glow — fades in on hover via CSS */}
            <div className="card-backlight" />

            {/* Content sits above the backlight */}
            <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', height: '100%' }}>

              {/* Domain label */}
              <div style={{ ...mono, fontSize: '11px', letterSpacing: '1.2px', color: '#FF5A00', marginBottom: '12px' }}>
                {p.domain}
              </div>

              {/* Project name */}
              <h3 style={{ fontFamily: 'var(--font-fraunces)', fontSize: '22px', fontWeight: 400, color: 'var(--text)', lineHeight: 1.25, overflowWrap: 'break-word', marginBottom: 0 }}>
                {p.name}
              </h3>

              {/* Separator */}
              <div style={{ borderTop: '1px solid rgba(255,255,255,0.14)', margin: '14px 0', width: '100%' }} />

              {/* Description */}
              <p style={{ fontFamily: 'var(--font-geist)', fontSize: '14px', color: 'var(--muted)', lineHeight: 1.7, overflowWrap: 'break-word', margin: 0 }}>
                {p.desc}
              </p>

              {/* Tags — pushed to bottom */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: 'auto', paddingTop: '18px' }}>
                {p.tags.map((tag) => (
                  <span
                    key={tag}
                    style={{
                      ...mono,
                      fontSize:        '10px',
                      letterSpacing:   '0.5px',
                      color:           'rgba(242,240,235,0.70)',
                      background:      'rgba(255,255,255,0.07)',
                      border:          '1px solid rgba(255,255,255,0.12)',
                      borderRadius:    0,
                      padding:         '4px 10px',
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* View link */}
              <a
                href={p.link}
                data-cursor="hover"
                style={{ ...mono, fontSize: '12px', color: 'var(--accent)', textDecoration: 'none', paddingTop: '16px', transition: 'opacity 0.2s', display: 'inline-block' }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.opacity = '0.7' }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.opacity = '1' }}
              >
                View →
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation — dots + arrows */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '32px clamp(24px,5vw,60px) 40px' }}>
        {/* Dots */}
        <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
          {PROJECTS.map((_, i) => (
            <button
              key={i}
              onClick={() => scrollToCard(i)}
              aria-label={`Go to project ${i + 1}`}
              style={{
                width:        activeCard === i ? '28px' : '16px',
                height:       '2px',
                borderRadius: 0,
                background:   activeCard === i ? '#FF5A00' : 'rgba(255,255,255,0.12)',
                border:       'none',
                padding:      0,
                cursor:       'pointer',
                transition:   'width 0.25s ease, background 0.25s ease',
              }}
            />
          ))}
        </div>

        {/* Arrows — hidden on mobile */}
        <div className="arrow-buttons" style={{ display: 'flex', gap: '10px' }}>
          {([{ label: '←', delta: -1 }, { label: '→', delta: 1 }] as const).map(({ label, delta }) => {
            const disabled = delta === -1 ? activeCard === 0 : activeCard === TOTAL - 1
            return (
              <button
                key={label}
                onClick={() => scrollToCard(activeCard + delta)}
                disabled={disabled}
                aria-label={delta === -1 ? 'Previous project' : 'Next project'}
                style={{
                  width:          '34px',
                  height:         '34px',
                  borderRadius:   '50%',
                  background:     'rgba(255,255,255,0.06)',
                  backdropFilter: 'blur(8px)',
                  border:         '1px solid rgba(255,255,255,0.12)',
                  color:          disabled ? 'rgba(242,240,235,0.22)' : 'rgba(242,240,235,0.55)',
                  fontSize:       '14px',
                  cursor:         disabled ? 'not-allowed' : 'pointer',
                  opacity:        disabled ? 0.22 : 1,
                  transition:     'all 0.2s ease',
                  display:        'flex',
                  alignItems:     'center',
                  justifyContent: 'center',
                  flexShrink:     0,
                }}
                onMouseEnter={(e) => {
                  if (disabled) return
                  const el = e.currentTarget
                  el.style.borderColor = 'rgba(255,90,0,0.45)'
                  el.style.color       = '#FF5A00'
                }}
                onMouseLeave={(e) => {
                  if (disabled) return
                  const el = e.currentTarget
                  el.style.borderColor = 'rgba(255,255,255,0.12)'
                  el.style.color       = 'rgba(242,240,235,0.55)'
                }}
              >
                {label}
              </button>
            )
          })}
        </div>
      </div>

      <style>{`
        /* Backlit frosted glass — warm light from behind the card surface */
        .card-backlight {
          position: absolute;
          inset: 0;
          z-index: 0;
          pointer-events: none;
          background: radial-gradient(
            ellipse 120% 120% at 50% 50%,
            rgba(255, 248, 225, 0.22) 0%,
            rgba(255, 244, 210, 0.08) 50%,
            transparent 100%
          );
          opacity: 0;
          transition: opacity 0.5s ease;
        }
        .project-card:hover .card-backlight {
          opacity: 1;
        }

        /* Mobile: native scroll snap */
        @media (max-width: 767px) {
          .cards-track {
            overflow-x: auto !important;
            -webkit-overflow-scrolling: touch;
            scroll-snap-type: x mandatory;
            width: 100vw !important;
            padding-left: 24px !important;
            padding-right: 24px !important;
            transform: none !important;
            scrollbar-width: none;
          }
          .cards-track::-webkit-scrollbar { display: none; }
          .cards-track .project-card {
            width: 80vw !important;
            min-width: 80vw !important;
            scroll-snap-align: start;
          }
          .arrow-buttons { display: none !important; }
        }
      `}</style>
    </section>
  )
}
