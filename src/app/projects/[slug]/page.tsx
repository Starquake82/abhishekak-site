import Link from 'next/link'
import { notFound } from 'next/navigation'
import Nav from '@/components/Nav'
import PdfArtifact from '@/components/PdfArtifact'
import { PROJECTS } from '@/lib/projectData'

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

        <Divider />

        <BackLink />
      </div>

      <style>{`
        .back-link:hover { color: rgba(242,240,235,0.75) !important; }
      `}</style>
    </main>
  )
}
