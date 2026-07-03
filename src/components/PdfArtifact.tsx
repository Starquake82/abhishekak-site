'use client'
import { useState } from 'react'
import ImageLightbox from './ImageLightbox'

const mono = 'var(--font-jetbrains)'

export default function PdfArtifact({ label, path }: { label: string; path: string }) {
  const [open, setOpen] = useState(false)

  const isExternal = /^https?:\/\//i.test(path)

  const btnStyle = {
    fontFamily:    mono,
    fontSize:      '12px',
    letterSpacing: '0.5px',
    color:         'rgba(242,240,235,0.65)',
    border:        '1px solid rgba(255,255,255,0.15)',
    padding:       '12px 20px',
    background:    'transparent',
    cursor:        'pointer',
    display:       'inline-block',
    transition:    'border-color 200ms ease, color 200ms ease',
  } as const

  if (isExternal) {
    return (
      <>
        <a
          href={path}
          target="_blank"
          rel="noopener noreferrer"
          className="artifact-btn"
          style={{ ...btnStyle, textDecoration: 'none' }}
        >
          {label} ↗
        </a>
        <style>{`.artifact-btn:hover { border-color: #FF5A00 !important; color: #FF5A00 !important; }`}</style>
      </>
    )
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="artifact-btn"
        style={btnStyle}
      >
        {label} ↗
      </button>

      {open && (
        <ImageLightbox path={path} label={label} onClose={() => setOpen(false)} />
      )}

      <style>{`
        .artifact-btn:hover { border-color: #FF5A00 !important; color: #FF5A00 !important; }
      `}</style>
    </>
  )
}
