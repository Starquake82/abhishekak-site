'use client'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'

const ITEMS = [
  'Business Analysis',
  'Business Intelligence',
  'Process Improvement',
  'Artificial Intelligence',
]

// 4 copies so the strip never shows a gap while scrolling
const COPIES = 4

export default function TextScroll() {
  const trackRef = useRef<HTMLDivElement>(null)
  const xRef = useRef(0)
  const copyWidthRef = useRef(0)

  useEffect(() => {
    const track = trackRef.current
    if (!track) return

    // Measure single-copy width after fonts have rendered
    const measure = () => {
      copyWidthRef.current = track.scrollWidth / COPIES
    }
    // Re-measure if fonts load late
    measure()
    document.fonts.ready.then(measure)

    const speed = 1 // px per tick at 60 fps

    const tick = () => {
      xRef.current -= speed
      if (copyWidthRef.current > 0 && xRef.current <= -copyWidthRef.current) {
        xRef.current += copyWidthRef.current
      }
      gsap.set(track, { x: xRef.current })
    }

    gsap.ticker.add(tick)
    return () => gsap.ticker.remove(tick)
  }, [])

  const allItems = Array.from({ length: COPIES }).flatMap(() => ITEMS)

  return (
    <div
      aria-hidden="true"
      style={{
        width: '100%',
        overflow: 'hidden',
        background: '#0A0A0A',
        padding: '32px 0',
      }}
    >
      <div
        ref={trackRef}
        style={{
          display: 'flex',
          alignItems: 'center',
          whiteSpace: 'nowrap',
          willChange: 'transform',
        }}
      >
        {allItems.map((item, i) => (
          <span
            key={i}
            style={{ display: 'inline-flex', alignItems: 'center', flexShrink: 0 }}
          >
            <span
              className="text-scroll-item"
              style={{
                fontFamily:      'var(--font-jetbrains)',
                fontWeight:       400,
                color:           'rgba(242,240,235,0.35)',
                textTransform:   'uppercase',
                letterSpacing:   '-1px',
                lineHeight:       1,
                whiteSpace:      'nowrap',
              }}
            >
              {item}
            </span>
            <span
              className="text-scroll-sep"
              style={{
                fontFamily:    'var(--font-jetbrains)',
                fontWeight:     100,
                color:         'rgba(242,240,235,0.30)',
                lineHeight:     1,
                padding:       '0 24px',
                flexShrink:    0,
              }}
            >
              +
            </span>
          </span>
        ))}
      </div>

      <style>{`
        .text-scroll-item,
        .text-scroll-sep {
          font-size: clamp(64px, 10vw, 120px);
        }
        @media (max-width: 767px) {
          .text-scroll-item,
          .text-scroll-sep {
            font-size: clamp(40px, 12vw, 64px);
          }
        }
      `}</style>
    </div>
  )
}
