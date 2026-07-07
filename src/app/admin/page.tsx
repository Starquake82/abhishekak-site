export default function AdminPage() {
  const mono: React.CSSProperties = { fontFamily: 'var(--font-jetbrains)' }

  const pipelines = [
    { name: 'Pipeline A', desc: 'Lead Generation Pipeline' },
    { name: 'Pipeline B', desc: 'Business Dev Pipeline' },
  ]

  return (
    <main
      style={{
        minHeight: '100vh',
        background: 'var(--bg)',
        padding: 'clamp(80px,8vw,120px) clamp(24px,5vw,60px)',
      }}
    >
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <div style={{ ...mono, fontSize: '10px', letterSpacing: '1.2px', color: 'var(--accent)', textTransform: 'uppercase', marginBottom: '32px' }}>
          // ADMIN
        </div>
        <h1
          style={{
            fontFamily: 'var(--font-fraunces)',
            fontSize: 'clamp(28px,4vw,48px)',
            fontWeight: 400,
            color: 'var(--text)',
            letterSpacing: '-1px',
            marginBottom: '48px',
          }}
        >
          Pipeline Dashboard
        </h1>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '48px' }}>
          {pipelines.map((p) => (
            <div
              key={p.name}
              style={{
                background: 'var(--surface)',
                border: '1px solid var(--border)',
                borderRadius: '10px',
                padding: '24px 28px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '16px',
              }}
            >
              <div>
                <div style={{ fontFamily: 'var(--font-fraunces)', fontSize: '18px', fontWeight: 400, color: 'var(--text)', marginBottom: '4px' }}>
                  {p.name}
                </div>
                <div style={{ ...mono, fontSize: '11px', color: 'var(--muted)', letterSpacing: '0.3px' }}>
                  {p.desc}
                </div>
              </div>
              <button
                disabled
                style={{
                  ...mono, fontSize: '11px', letterSpacing: '0.5px',
                  background: 'transparent', border: '1px solid var(--border)',
                  color: 'var(--subtle)', padding: '8px 18px', borderRadius: '6px',
                  cursor: 'not-allowed',
                }}
              >
                Run
              </button>
            </div>
          ))}
        </div>

        <p style={{ ...mono, fontSize: '11px', color: 'var(--subtle)', letterSpacing: '0.3px' }}>
          Coming in Phase 2.
        </p>
      </div>
    </main>
  )
}
