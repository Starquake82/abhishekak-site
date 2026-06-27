'use client'
import { useEffect, useRef, useState, useCallback } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import ScrollToPlugin from 'gsap/ScrollToPlugin'

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)

const PROJECTS = [
  {
    id: 0,
    category: 'BA CAPSTONE',
    name: 'BACentric — Library Management Portal',
    desc: 'Full-cycle business analysis deliverable covering requirements elicitation, BRD, and stakeholder sign-off for a library management system.',
    tags: ['Business Analysis', 'Requirements', 'BRD'],
    link: '#',
  },
  {
    id: 1,
    category: 'BA CAPSTONE',
    name: 'BACentric — Procurement Management Portal',
    desc: 'End-to-end procurement portal analysis with BPMN process maps, UAT planning, and traceability matrices.',
    tags: ['Process Design', 'UAT', 'BPMN'],
    link: '#',
  },
  {
    id: 2,
    category: 'BI',
    name: 'Maven Airlines Power BI Dashboard',
    desc: 'Multi-page Power BI report with custom DAX measures, dimensional data model, and executive-level KPI views.',
    tags: ['Data Modelling', 'DAX', 'Power BI'],
    link: '#',
  },
  {
    id: 3,
    category: 'BA',
    name: 'FinBridge LOS — Credit Decision Module',
    desc: 'Phase 1 BRD and process design for a loan origination system credit decision module in a lending operations context.',
    tags: ['Lending Operations', 'BRD', 'Phase 1'],
    link: '#',
  },
]

const FLUTED_BG = `repeating-linear-gradient(
  90deg,
  rgba(255,255,255,0.13) 0px,
  rgba(255,255,255,0.05) 5px,
  rgba(255,255,255,0.00) 10px,
  rgba(255,255,255,0.05) 15px,
  rgba(255,255,255,0.13) 20px
), rgba(22,18,18,0.72)`

const FLUTED_BG_FAINT = `repeating-linear-gradient(
  90deg,
  rgba(255,255,255,0.06) 0px,
  rgba(255,255,255,0.02) 5px,
  rgba(255,255,255,0.00) 10px,
  rgba(255,255,255,0.02) 15px,
  rgba(255,255,255,0.06) 20px
), rgba(22,18,18,0.55)`

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
    return -(track.scrollWidth - window.innerWidth + 120)
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
          end: () => `+=${Math.abs(getScrollAmount())}`,
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

  // Mobile: update dots via native scroll event
  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    const onScroll = () => {
      if (!isMobileRef.current) return
      const cardW = window.innerWidth * 0.8 + 16
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
      track.scrollTo({ left: clamped * (window.innerWidth * 0.8 + 16), behavior: 'smooth' })
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
      style={{ background: 'var(--bg)', paddingTop: '100px', paddingBottom: 0 }}
      className="projects-section"
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
        style={{ display: 'flex', gap: '24px', paddingLeft: '60px', paddingRight: '60px', willChange: 'transform' }}
      >
        {PROJECTS.map((p, i) => (
          <div
            key={p.id}
            className="project-card"
            style={{
              background: FLUTED_BG,
              backdropFilter: 'blur(18px)',
              WebkitBackdropFilter: 'blur(18px)',
              border: '1px solid rgba(255,255,255,0.11)',
              borderRadius: '14px',
              padding: '28px',
              width: '340px',
              minWidth: '340px',
              flexShrink: 0,
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
              transition: 'border-color 0.25s ease, transform 0.25s ease',
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget
              el.style.borderColor = 'rgba(255,90,0,0.40)'
              el.style.transform   = 'translateY(-3px)'
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget
              el.style.borderColor = 'rgba(255,255,255,0.11)'
              el.style.transform   = 'translateY(0)'
            }}
          >
            {/* Counter */}
            <div style={{ ...mono, fontSize: '11px', letterSpacing: '0.5px', color: 'rgba(242,240,235,0.20)' }}>
              {String(i + 1).padStart(2, '0')} / {String(TOTAL).padStart(2, '0')}
            </div>

            {/* Category */}
            <div style={{ ...mono, fontSize: '10px', letterSpacing: '1px', color: 'var(--accent)', textTransform: 'uppercase' }}>
              {p.category}
            </div>

            {/* Name */}
            <h3 style={{ fontFamily: 'var(--font-fraunces)', fontSize: 'clamp(17px,1.8vw,22px)', fontWeight: 400, color: 'var(--text)', lineHeight: 1.2, overflowWrap: 'break-word' }}>
              {p.name}
            </h3>

            {/* Divider */}
            <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', margin: '2px 0' }} />

            {/* Description */}
            <p style={{ fontFamily: 'var(--font-geist)', fontSize: '14px', color: 'var(--muted)', lineHeight: 1.7, overflowWrap: 'break-word' }}>
              {p.desc}
            </p>

            {/* Tags */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '4px' }}>
              {p.tags.map((tag) => (
                <span key={tag} style={{ ...mono, fontSize: '10px', color: 'var(--muted)', border: '1px solid rgba(255,255,255,0.08)', padding: '4px 10px', borderRadius: '100px' }}>
                  {tag}
                </span>
              ))}
            </div>

            {/* View link */}
            <a
              href={p.link}
              data-cursor="hover"
              style={{ ...mono, fontSize: '12px', color: 'var(--accent)', textDecoration: 'none', marginTop: 'auto', paddingTop: '14px', transition: 'opacity 0.2s', display: 'inline-block' }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.opacity = '0.7' }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.opacity = '1' }}
            >
              View →
            </a>
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
                borderRadius: '2px',
                background:   activeCard === i ? '#FF5A00' : 'rgba(255,255,255,0.12)',
                border:       'none',
                padding:      0,
                cursor:       'pointer',
                transition:   'width 0.25s ease, background 0.25s ease',
              }}
            />
          ))}
        </div>

        {/* Arrows — hidden on mobile via CSS */}
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
                  width:         '34px',
                  height:        '34px',
                  borderRadius:  '50%',
                  background:    FLUTED_BG_FAINT,
                  backdropFilter:'blur(8px)',
                  border:        '1px solid rgba(255,255,255,0.12)',
                  color:         disabled ? 'rgba(242,240,235,0.22)' : 'rgba(242,240,235,0.55)',
                  fontSize:      '14px',
                  cursor:        disabled ? 'not-allowed' : 'pointer',
                  opacity:       disabled ? 0.22 : 1,
                  transition:    'all 0.2s ease',
                  display:       'flex',
                  alignItems:    'center',
                  justifyContent:'center',
                  flexShrink:    0,
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
        /* Desktop: clip overflow so off-screen cards stay hidden */
        @media (min-width: 768px) {
          .projects-section { overflow: hidden; }
        }
        /* Mobile: native horizontal scroll snap */
        @media (max-width: 767px) {
          .cards-track {
            overflow-x: auto !important;
            -webkit-overflow-scrolling: touch;
            scroll-snap-type: x mandatory;
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
