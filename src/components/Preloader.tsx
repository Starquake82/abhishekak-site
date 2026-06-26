'use client'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { usePreloader } from './PreloaderContext'

export default function Preloader() {
  const ref = useRef<HTMLDivElement>(null)
  const { setComplete } = usePreloader()

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const timer = setTimeout(() => {
      gsap.to(el, {
        opacity: 0,
        duration: 0.6,
        onComplete: () => {
          setComplete()
          el.style.display = 'none'
        },
      })
    }, 900)
    return () => clearTimeout(timer)
  }, [setComplete])

  return (
    <div
      ref={ref}
      style={{
        position: 'fixed',
        inset: 0,
        background: 'var(--bg)',
        zIndex: 10000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <span
        style={{
          fontFamily: 'var(--font-fraunces)',
          fontSize: '48px',
          fontWeight: 400,
          color: 'var(--text)',
          letterSpacing: '-1px',
        }}
      >
        AK<span style={{ color: 'var(--accent)' }}>.</span>
      </span>
    </div>
  )
}
