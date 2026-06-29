'use client'
import { useState, useEffect } from 'react'

const mono = 'var(--font-jetbrains)'
const sans = 'var(--font-geist)'

export default function PdfArtifact({ label, path }: { label: string; path: string }) {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false) }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open])

  const isImage = /\.(png|jpe?g|gif|webp|svg)$/i.test(path)

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="artifact-btn"
        style={{
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
        }}
      >
        {label} ↗
      </button>

      {open && (
        <div
          onClick={(e) => { if (e.target === e.currentTarget) setOpen(false) }}
          style={{
            position:             'fixed',
            inset:                 0,
            zIndex:                2000,
            background:           'rgba(0,0,0,0.90)',
            backdropFilter:       'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
            display:              'flex',
            alignItems:           'center',
            justifyContent:       'center',
            padding:              '24px',
            boxSizing:            'border-box',
          }}
        >
          <div style={{
            width:         '92vw',
            maxWidth:      '1200px',
            height:        '90vh',
            background:    '#0f0f0f',
            border:        '1px solid rgba(255,255,255,0.10)',
            display:       'flex',
            flexDirection: 'column',
            overflow:      'hidden',
          }}>
            {/* Header */}
            <div style={{
              display:        'flex',
              alignItems:     'center',
              justifyContent: 'space-between',
              padding:        '14px 20px',
              borderBottom:   '1px solid rgba(255,255,255,0.07)',
              flexShrink:      0,
              background:     '#111111',
            }}>
              <span style={{ fontFamily: mono, fontSize: '11px', letterSpacing: '0.5px', color: 'rgba(242,240,235,0.50)' }}>
                {label}
              </span>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                <a
                  href={path}
                  download
                  style={{
                    fontFamily:     mono,
                    fontSize:       '10px',
                    letterSpacing:  '0.5px',
                    color:          '#FF5A00',
                    border:         '1px solid #FF5A00',
                    padding:        '6px 14px',
                    textDecoration: 'none',
                    display:        'inline-block',
                    transition:     'background 200ms ease, color 200ms ease',
                    lineHeight:      1,
                  }}
                  className="modal-download"
                >
                  Download
                </a>
                <button
                  onClick={() => setOpen(false)}
                  className="modal-close"
                  style={{
                    fontFamily:  sans,
                    fontSize:    '20px',
                    color:       'rgba(242,240,235,0.40)',
                    background:  'transparent',
                    border:      'none',
                    cursor:      'pointer',
                    lineHeight:   1,
                    padding:     '0 4px',
                    transition:  'color 150ms ease',
                  }}
                >
                  ×
                </button>
              </div>
            </div>

            {/* Viewer */}
            <div style={{ flex: 1, overflow: 'auto', position: 'relative', background: '#1a1a1a' }}>
              {isImage ? (
                <ImageViewer path={path} label={label} />
              ) : (
                <embed
                  src={path}
                  type="application/pdf"
                  style={{ width: '100%', height: '100%', display: 'block', border: 'none' }}
                />
              )}
            </div>
          </div>
        </div>
      )}

      <style>{`
        .artifact-btn:hover   { border-color: #FF5A00 !important; color: #FF5A00 !important; }
        .modal-close:hover    { color: rgba(242,240,235,0.90) !important; }
        .modal-download:hover { background: #FF5A00 !important; color: #111 !important; }
      `}</style>
    </>
  )
}

function ImageViewer({ path, label }: { path: string; label: string }) {
  const [zoom, setZoom] = useState(1)
  const clamp = (v: number) => Math.min(3, Math.max(0.5, v))

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'auto' }}>
      {/* Zoom controls */}
      <div style={{
        position:   'sticky',
        top:        '12px',
        right:      '12px',
        float:      'right',
        zIndex:      10,
        display:    'flex',
        gap:        '6px',
        marginRight: '12px',
      }}>
        {[
          { label: '−', delta: -0.25 },
          { label: '+', delta:  0.25 },
        ].map(({ label: l, delta }) => (
          <button
            key={l}
            onClick={() => setZoom(z => clamp(z + delta))}
            style={{
              fontFamily:  mono,
              fontSize:    '14px',
              width:       '32px',
              height:      '32px',
              background:  'rgba(17,17,17,0.85)',
              border:      '1px solid rgba(255,255,255,0.15)',
              color:       'rgba(242,240,235,0.70)',
              cursor:      'pointer',
              display:     'flex',
              alignItems:  'center',
              justifyContent: 'center',
            }}
          >
            {l}
          </button>
        ))}
        <button
          onClick={() => setZoom(1)}
          style={{
            fontFamily:  mono,
            fontSize:    '10px',
            padding:     '0 8px',
            height:      '32px',
            background:  'rgba(17,17,17,0.85)',
            border:      '1px solid rgba(255,255,255,0.15)',
            color:       'rgba(242,240,235,0.70)',
            cursor:      'pointer',
          }}
        >
          Reset
        </button>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', padding: '24px', minHeight: '100%' }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={path}
          alt={label}
          style={{
            transform:       `scale(${zoom})`,
            transformOrigin: 'top center',
            transition:      'transform 200ms ease',
            maxWidth:        '100%',
            display:         'block',
          }}
        />
      </div>
    </div>
  )
}
