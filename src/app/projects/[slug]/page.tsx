import Link from 'next/link'
import { notFound } from 'next/navigation'
import Nav from '@/components/Nav'
import PdfArtifact from '@/components/PdfArtifact'
import GalleryThumb from '@/components/GalleryThumb'
import { PROJECTS, type RichSection } from '@/lib/projectData'

export async function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const project  = PROJECTS.find((p) => p.slug === slug)
  if (!project) return {}
  return {
    title: `${project.name} — Abhishek Kininge`,
    description: project.brief || `${project.type} · ${project.domainTag}`,
  }
}

const mono  = 'var(--font-jetbrains)'
const serif = 'var(--font-fraunces)'
const sans  = 'var(--font-geist)'

const BACK_HREF = '/#work-projects'

function BackLink() {
  return (
    <Link
      href={BACK_HREF}
      style={{
        fontFamily:     mono,
        fontSize:       '11px',
        letterSpacing:  '0.5px',
        color:          'rgba(242,240,235,0.45)',
        textDecoration: 'none',
        display:        'inline-flex',
        alignItems:     'center',
        gap:            '6px',
        marginBottom:   '48px',
        transition:     'color 200ms ease',
      }}
      className="back-link"
    >
      ← Projects &amp; Case Studies
    </Link>
  )
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div style={{
      fontFamily:    mono,
      fontSize:      '10px',
      letterSpacing: '1.5px',
      color:         '#FF5A00',
      textTransform: 'uppercase',
      marginBottom:  '16px',
    }}>
      {children}
    </div>
  )
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
      {items.map((item, i) => (
        <li key={i} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
          <span style={{ color: '#FF5A00', flexShrink: 0, marginTop: '3px', fontSize: '11px' }}>▸</span>
          <span style={{ fontFamily: sans, fontSize: '14px', color: 'rgba(242,240,235,0.65)', lineHeight: 1.8 }}>
            {item}
          </span>
        </li>
      ))}
    </ul>
  )
}

function Divider() {
  return (
    <div style={{
      borderTop:  '1px solid rgba(255,255,255,0.07)',
      margin:     '48px 0',
      width:      '100%',
    }} />
  )
}

function RichTable({ headers, rows }: { headers: string[]; rows: string[][] }) {
  return (
    <div style={{ overflowX: 'auto' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            {headers.map((h, i) => (
              <th key={i} style={{
                fontFamily:    mono,
                fontSize:      '10px',
                letterSpacing: '1px',
                color:         'rgba(242,240,235,0.30)',
                fontWeight:    400,
                textAlign:     'left',
                textTransform: 'uppercase',
                paddingBottom: '12px',
                paddingRight:  '32px',
                borderBottom:  '1px solid rgba(255,255,255,0.07)',
                whiteSpace:    'nowrap',
              }}>
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i}>
              {row.map((cell, j) => (
                <td key={j} style={{
                  fontFamily:  j === 0 ? mono : sans,
                  fontSize:    j === 0 ? '12px' : '13px',
                  color:       j === 0 ? 'rgba(242,240,235,0.70)' : 'rgba(242,240,235,0.50)',
                  padding:     '11px 32px 11px 0',
                  borderBottom:'1px solid rgba(255,255,255,0.04)',
                  verticalAlign:'top',
                  lineHeight:  1.6,
                  whiteSpace:  j === 0 ? 'nowrap' : 'normal',
                }}>
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function RichContent({ sections }: { sections: RichSection[] }) {
  return (
    <>
      {sections.map((s, i) => (
        <div key={i} style={{ marginBottom: '48px' }}>
          {s.label && <SectionLabel>{s.label}</SectionLabel>}
          {s.type === 'text' && (
            <p style={{ fontFamily: sans, fontSize: '15px', color: 'rgba(242,240,235,0.65)', lineHeight: 1.75, margin: 0 }}>
              {s.body}
            </p>
          )}
          {s.type === 'bullets' && <BulletList items={s.items} />}
          {s.type === 'table'   && <RichTable headers={s.headers} rows={s.rows} />}
        </div>
      ))}
    </>
  )
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const project  = PROJECTS.find((p) => p.slug === slug)
  if (!project) notFound()

  const headerBlock = (
    <>
      <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap' }}>
        <span style={{ fontFamily: mono, fontSize: '11px', letterSpacing: '0.15em', color: '#FF5A00', textTransform: 'uppercase' }}>
          {project.type}
        </span>
        <span style={{ color: 'rgba(255,255,255,0.15)', fontSize: '11px' }}>·</span>
        <span style={{ fontFamily: mono, fontSize: '11px', letterSpacing: '0.15em', color: 'rgba(242,240,235,0.35)', textTransform: 'uppercase' }}>
          {project.domainTag}
        </span>
      </div>

      <h1 style={{
        fontFamily:    serif,
        fontSize:      'clamp(40px, 6vw, 80px)',
        fontWeight:     400,
        color:         '#F2F0EB',
        lineHeight:     1.0,
        letterSpacing: '-2px',
        marginBottom:  '20px',
      }}>
        {project.name}
      </h1>

      <div style={{ fontFamily: sans, fontSize: '14px', color: 'rgba(242,240,235,0.40)' }}>
        {project.org} · {project.year}
      </div>
    </>
  )

  // ── comingSoon state ────────────────────────────────────────────────────────
  if (project.comingSoon) {
    return (
      <main style={{ background: '#0A0A0A', minHeight: '100vh' }}>
        <Nav />
        <div style={{ maxWidth: '900px', margin: '0 auto', padding: '120px 40px 80px', boxSizing: 'border-box' }}>
          <BackLink />
          {headerBlock}
          <Divider />
          <p style={{
            fontFamily:  sans,
            fontSize:    '16px',
            fontStyle:   'italic',
            color:       'rgba(242,240,235,0.45)',
            textAlign:   'center',
            padding:     '48px 0',
          }}>
            This project is currently being documented. Check back soon.
          </p>
          {project.artifacts.length > 0 && (
            <>
              <Divider />
              <div style={{ marginBottom: '56px' }}>
                <SectionLabel>Artifacts</SectionLabel>
                <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                  {project.artifacts.map((a, i) => (
                    <PdfArtifact key={i} label={a.label} path={a.path} />
                  ))}
                </div>
              </div>
            </>
          )}
          <BackLink />
        </div>

        <style>{`
          .back-link:hover { color: rgba(242,240,235,0.75) !important; }
        `}</style>
      </main>
    )
  }

  // ── Full page ───────────────────────────────────────────────────────────────
  return (
    <main style={{ background: '#0A0A0A', minHeight: '100vh' }}>
      <Nav />
      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '120px 40px 80px', boxSizing: 'border-box' }}>

        <BackLink />

        {/* Header */}
        {headerBlock}

        <Divider />

        {/* Brief */}
        <p style={{
          fontFamily:  sans,
          fontSize:    '18px',
          color:       'rgba(242,240,235,0.75)',
          lineHeight:   1.75,
          maxWidth:    '720px',
          marginBottom: 0,
        }}>
          {project.brief}
        </p>

        <Divider />

        {project.richContent ? (
          <RichContent sections={project.richContent} />
        ) : (
          <>
            {/* My Role */}
            <div style={{ marginBottom: '56px' }}>
              <SectionLabel>My Role</SectionLabel>
              <p style={{ fontFamily: sans, fontSize: '15px', color: 'rgba(242,240,235,0.65)', lineHeight: 1.75, margin: 0 }}>
                {project.role}
              </p>
            </div>

            {/* Approach */}
            <div style={{ marginBottom: '56px' }}>
              <SectionLabel>Approach</SectionLabel>
              <BulletList items={project.approach} />
            </div>

            {/* System Gallery */}
            {project.gallery && (
              <>
                {project.gallery.tokens && project.gallery.tokens.length > 0 && (
                  <div style={{ marginBottom: '56px' }}>
                    <SectionLabel>Design Tokens</SectionLabel>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
                      {project.gallery.tokens.map((img, i) => (
                        <GalleryThumb
                          key={i}
                          src={img.src}
                          alt={img.alt}
                          caption={img.caption}
                          imgStyle={{ height: '140px', width: 'auto' }}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {project.gallery.components && project.gallery.components.length > 0 && (
                  <div style={{ marginBottom: '56px' }}>
                    <SectionLabel>Component Library</SectionLabel>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '16px' }}>
                      {project.gallery.components.map((img, i) => (
                        <GalleryThumb key={i} src={img.src} alt={img.alt} caption={img.caption} />
                      ))}
                    </div>
                  </div>
                )}

                {project.gallery.kits && project.gallery.kits.length > 0 && (
                  <div style={{ marginBottom: '56px' }}>
                    <SectionLabel>Applied Kits</SectionLabel>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
                      {project.gallery.kits.map((img, i) => (
                        <GalleryThumb key={i} src={img.src} alt={img.alt} caption={img.caption} />
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}

            {/* Deliverables & Outcomes */}
            <div style={{ marginBottom: '56px' }}>
              <SectionLabel>Deliverables &amp; Outcomes</SectionLabel>
              <BulletList items={project.deliverables} />
            </div>

            {/* Key Takeaways */}
            <div style={{ marginBottom: '56px' }}>
              <SectionLabel>Key Takeaways</SectionLabel>
              <BulletList items={project.takeaways} />
            </div>
          </>
        )}

        {/* Artifacts */}
        {project.artifacts.length > 0 && (
          <div style={{ marginBottom: '56px' }}>
            <SectionLabel>Artifacts</SectionLabel>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              {project.artifacts.map((a, i) => (
                <PdfArtifact key={i} label={a.label} path={a.path} />
              ))}
            </div>
          </div>
        )}

        {/* Reference Materials */}
        {project.referenceArtifacts && project.referenceArtifacts.length > 0 && (
          <div style={{ marginBottom: '56px' }}>
            <SectionLabel>Reference Materials</SectionLabel>
            <p style={{ fontFamily: sans, fontSize: '13px', color: 'rgba(242,240,235,0.45)', marginBottom: '16px', fontStyle: 'italic' }}>
              Sample documents and templates referenced during requirements research — not authored as part of this project.
            </p>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              {project.referenceArtifacts.map((a, i) => (
                <PdfArtifact key={i} label={a.label} path={a.path} />
              ))}
            </div>
          </div>
        )}

        <Divider />

        <BackLink />
      </div>

      <style>{`
        .back-link:hover { color: rgba(242,240,235,0.75) !important; }
      `}</style>
    </main>
  )
}
