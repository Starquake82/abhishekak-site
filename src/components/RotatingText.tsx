'use client'
import { useState, useEffect } from 'react'

const PHRASES = [
  'BUSINESS ANALYSIS · 15+ YEARS',
  'BUSINESS INTELLIGENCE · BA + BI',
  'PROCESS IMPROVEMENT · GLOBAL SCALE',
  'AI-AUGMENTED DELIVERY · PUNE, IN',
]

export default function RotatingText({ style }: { style?: React.CSSProperties }) {
  const [index, setIndex]     = useState(0)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false)
      setTimeout(() => {
        setIndex((i) => (i + 1) % PHRASES.length)
        setVisible(true)
      }, 400)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <span
      style={{
        ...style,
        opacity:    visible ? 1 : 0,
        transition: 'opacity 0.4s ease',
        display:    'inline-block',
      }}
    >
      {PHRASES[index]}
    </span>
  )
}
