'use client'
import { useState, type CSSProperties } from 'react'
import ImageLightbox from './ImageLightbox'

const mono = 'var(--font-jetbrains)'

export default function GalleryThumb({ src, alt, caption, imgStyle }: {
  src:      string
  alt:      string
  caption?: string
  imgStyle?: CSSProperties
}) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="gallery-thumb"
        style={{
          display:    'inline-block',
          padding:    0,
          background: 'transparent',
          border:     '1px solid rgba(255,255,255,0.10)',
          cursor:     'pointer',
          textAlign:  'left',
          transition: 'border-color 200ms ease',
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={alt}
          style={{ display: 'block', width: '100%', height: 'auto', ...imgStyle }}
        />
        {caption && (
          <div style={{
            fontFamily:    mono,
            fontSize:      '10px',
            letterSpacing: '0.5px',
            color:         'rgba(242,240,235,0.40)',
            padding:       '8px 10px',
            borderTop:     '1px solid rgba(255,255,255,0.07)',
          }}>
            {caption}
          </div>
        )}
      </button>

      {open && <ImageLightbox path={src} label={caption || alt} onClose={() => setOpen(false)} />}

      <style>{`.gallery-thumb:hover { border-color: #FF5A00 !important; }`}</style>
    </>
  )
}
