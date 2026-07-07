import { ImageResponse } from 'next/og'
import { readFile } from 'node:fs/promises'
import path from 'node:path'

export const alt         = 'Abhishek Kininge — Independent BA & BI Consultant'
export const size        = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image() {
  const [fraunces, jetbrains] = await Promise.all([
    readFile(path.join(process.cwd(), 'public/fonts/Fraunces-Regular.ttf')),
    readFile(path.join(process.cwd(), 'public/fonts/JetBrainsMono-Regular.ttf')),
  ])

  type FontEntry = { name: string; data: Buffer; weight: 400; style: 'normal' }
  const fonts: FontEntry[] = [
    { name: 'Fraunces',       data: fraunces,  weight: 400, style: 'normal' },
    { name: 'JetBrains Mono', data: jetbrains, weight: 400, style: 'normal' },
  ]

  return new ImageResponse(
    (
      <div
        style={{
          width:           '100%',
          height:          '100%',
          background:      '#0A0A0A',
          display:         'flex',
          flexDirection:   'column',
          padding:         '64px 80px 56px',
          position:        'relative',
          overflow:        'hidden',
        }}
      >
        {/* Subtle radial glow top-right */}
        <div style={{
          position:     'absolute',
          top:          '-120px',
          right:        '-120px',
          width:        '600px',
          height:       '600px',
          borderRadius: '50%',
          background:   'radial-gradient(circle, rgba(255,90,0,0.08) 0%, transparent 70%)',
          display:      'flex',
        }} />

        {/* Site URL — top right */}
        <div style={{
          position:      'absolute',
          top:           '40px',
          right:         '80px',
          fontFamily:    'JetBrains Mono',
          fontSize:      13,
          letterSpacing: 2,
          color:         '#FF5A00',
          textTransform: 'uppercase',
          display:       'flex',
        }}>
          abhishekak.site
        </div>

        {/* Name */}
        <div style={{
          fontFamily:    'Fraunces',
          fontSize:      76,
          fontWeight:    400,
          color:         '#F2F0EB',
          lineHeight:    1.0,
          letterSpacing: '-2px',
          marginTop:     'auto',
          marginBottom:  '20px',
          display:       'flex',
        }}>
          Abhishek Anil Kininge
        </div>

        {/* Role line */}
        <div style={{
          display:       'flex',
          alignItems:    'center',
          gap:           '14px',
          marginBottom:  '28px',
        }}>
          <div style={{
            width:        10,
            height:       10,
            borderRadius: '50%',
            background:   '#FF5A00',
            flexShrink:   0,
          }} />
          <div style={{
            fontFamily:    'JetBrains Mono',
            fontSize:      16,
            color:         'rgba(242,240,235,0.55)',
            letterSpacing: 1,
            textTransform: 'uppercase',
            display:       'flex',
          }}>
            Independent BA &amp; BI Consultant · Pune, India · Open to Remote
          </div>
        </div>

        {/* Domain pills */}
        <div style={{
          display:       'flex',
          alignItems:    'center',
          gap:           '14px',
          marginBottom:  '16px',
        }}>
          {['Business Analysis', 'Business Intelligence', 'Process Improvement'].map((pill, i) => (
            <div key={pill} style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              {i > 0 && (
                <div style={{ color: '#FF5A00', fontSize: 10, display: 'flex' }}>•</div>
              )}
              <div style={{
                fontFamily:    'JetBrains Mono',
                fontSize:      11,
                letterSpacing: 1.5,
                color:         'rgba(242,240,235,0.35)',
                textTransform: 'uppercase',
                display:       'flex',
              }}>
                {pill}
              </div>
            </div>
          ))}
          <div style={{ color: '#FF5A00', fontSize: 10, display: 'flex' }}>•</div>
          <div style={{
            fontFamily:    'JetBrains Mono',
            fontSize:      11,
            letterSpacing: 1.5,
            color:         'rgba(255,90,0,0.55)',
            textTransform: 'uppercase',
            display:       'flex',
          }}>
            AI-Augmented Delivery
          </div>
        </div>

        {/* Tagline */}
        <div style={{
          fontFamily:    'JetBrains Mono',
          fontSize:      11,
          letterSpacing: 2.5,
          color:         'rgba(255,90,0,0.45)',
          textTransform: 'uppercase',
          marginBottom:  '40px',
          display:       'flex',
        }}>
          Structured Diagnosis for Business, Systems &amp; AI
        </div>

        {/* Stats bar */}
        <div style={{
          display:    'flex',
          borderTop:  '1px solid rgba(255,255,255,0.07)',
          paddingTop: '28px',
        }}>
          {[
            { value: '15+',             label: 'Years' },
            { value: '₹855L',           label: 'Govt. Project' },
            { value: '3',               label: 'Domains' },
            { value: 'Power BI · SQL · AI', label: 'Core Tools' },
          ].map((stat, i) => (
            <div key={stat.value} style={{
              display:       'flex',
              flexDirection: 'column',
              gap:           '4px',
              flex:          i === 3 ? 2 : 1,
            }}>
              <div style={{
                fontFamily: 'Fraunces',
                fontSize:   32,
                fontWeight: 400,
                color:      '#F2F0EB',
                lineHeight: 1,
                display:    'flex',
              }}>
                {stat.value}
              </div>
              <div style={{
                fontFamily:    'JetBrains Mono',
                fontSize:      11,
                color:         'rgba(242,240,235,0.30)',
                letterSpacing: 0.5,
                display:       'flex',
              }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size, fonts }
  )
}
