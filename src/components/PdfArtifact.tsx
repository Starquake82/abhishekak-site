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

  return (
    <>
      {/* Trigger button */}
      <button
        onClick={() => setOpen(true)}
        className="artifact-btn"
        style={{
          fontFamily:      mono,
          fontSize:        '12px',
          letterSpacing:   '0.5px',
          color:           'rgba(242,240,235,0.65)',
          border:          '1px solid rgba(255,255,255,0.15)',
          padding:         '12px 20px',
          background:      'transparent',
          cursor:          'pointer',
          display:         'inline-block',
          transition:      'border-color 200ms ease, color 200ms ease',
        }}
      >
        {label} ↗
      </button>

      {/* Modal */}
      {open && (
        <div
          onClick={(e) => { if (e.target === e.currentTarget) setOpen(false) }}
          style={{
            position:             'fixed',
            inset:                 0,
            zIndex:                2000,
            background:           'rgba(0,0,0,0.88)',
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
            width:         '90vw',
            maxWidth:      '1100px',
            height:        '88vh',
            background:    '#111111',
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
            }}>
              <span style={{ fontFamily: mono, fontSize: '11px', letterSpacing: '0.5px', color: 'rgba(242,240,235,0.50)' }}>
                {label}
              </span>
              <button
                onClick={() => setOpen(false)}
                style={{
                  fontFamily:  sans,
                  fontSize:    '18px',
                  color:       'rgba(242,240,235,0.40)',
                  background:  'transparent',
                  border:      'none',
                  cursor:      'pointer',
                  lineHeight:   1,
                  padding:     '0 4px',
                  transition:  'color 150ms ease',
                }}
                className="modal-close"
              >
                ×
              </button>
            </div>

            {/* PDF iframe */}
            <iframe
              src={path}
              style={{ flex: 1, width: '100%', border: 'none', display: 'block' }}
              title={label}
            />

            {/* Footer */}
            <div style={{
              padding:        '12px 20px',
              borderTop:      '1px solid rgba(255,255,255,0.07)',
              display:        'flex',
              justifyContent: 'flex-end',
              flexShrink:      0,
            }}>
              <a
                href={path}
                download
                style={{
                  fontFamily:     mono,
                  fontSize:       '11px',
                  letterSpacing:  '0.5px',
                  color:          '#FF5A00',
                  border:         '1px solid #FF5A00',
                  padding:        '10px 20px',
                  textDecoration: 'none',
                  display:        'inline-block',
                  transition:     'background 200ms ease, color 200ms ease',
                }}
                className="modal-download"
              >
                Download PDF
              </a>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .artifact-btn:hover  { border-color: #FF5A00 !important; color: #FF5A00 !important; }
        .modal-close:hover   { color: rgba(242,240,235,0.90) !important; }
        .modal-download:hover { background: #FF5A00 !important; color: #111 !important; }
      `}</style>
    </>
  )
}
