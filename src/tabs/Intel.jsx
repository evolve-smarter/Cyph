// Intel Tab — Workspace file browser + build summary cards

const WORKSPACE_DIRS = [
  {
    icon: '🎯',
    name: 'prospects/',
    description: 'Sales pipeline — home services & recovery leads',
    color: 'var(--green)',
    files: ['home-services-prospects.md', 'recovery-prospects.md'],
    count: '32 leads',
  },
  {
    icon: '💡',
    name: 'ideas/',
    description: 'Idea briefings from IVY + research sessions',
    color: 'var(--blue)',
    files: ['daily-brief.md', 'app-ideas.md'],
    count: 'Growing',
  },
  {
    icon: '📦',
    name: 'products/',
    description: 'Product specs, pricing, and service packages',
    color: 'var(--purple)',
    files: ['evolve-packages.md', 'gg-catalog.md'],
    count: '2 verticals',
  },
  {
    icon: '📣',
    name: 'social/',
    description: 'Social media strategy, post calendar, content bank',
    color: 'var(--pink)',
    files: ['social-strategy.md', 'content-calendar.md', 'post-bank.md'],
    count: '15 posts ready',
  },
  {
    icon: '🔬',
    name: 'research/',
    description: 'Market research, competitor intel, industry data',
    color: 'var(--cyan)',
    files: ['ghl-landscape.md', 'recovery-market.md'],
    count: 'Active',
  },
]

const BUILDS = [
  {
    icon: '⚡',
    name: 'evolvesmarter.io',
    status: 'LIVE',
    statusColor: 'var(--green)',
    description: 'Hub site — built and pushed to GitHub',
    repo: 'evolve-smarter/evolvesmarter.io',
    date: 'Mar 26, 2026',
  },
  {
    icon: '🔐',
    name: 'BEQPROD Command',
    status: 'BUILDING',
    statusColor: 'var(--purple)',
    description: 'PWA command center — this app',
    repo: 'evolve-smarter/Cyph',
    date: 'Mar 27, 2026',
  },
  {
    icon: '🤖',
    name: 'OpenClaw Integration',
    status: 'CONFIGURED',
    statusColor: 'var(--blue)',
    description: 'AI gateway — Cyph running on Claude Sonnet',
    repo: 'local',
    date: 'Mar 26, 2026',
  },
  {
    icon: '📊',
    name: 'GHL Agency',
    status: '20 ACCOUNTS',
    statusColor: 'var(--amber)',
    description: 'GoHighLevel white-label configured',
    repo: 'app.gohighlevel.com',
    date: 'Active',
  },
]

const KEY_DOCS = [
  { label: 'Home Services Prospects', path: 'prospects/home-services-prospects.md', icon: '⚙️' },
  { label: 'Recovery Prospects',      path: 'prospects/recovery-prospects.md',       icon: '💙' },
  { label: 'Social Strategy',         path: 'social/social-strategy.md',             icon: '📣' },
  { label: 'MEMORY (Cyph)',           path: 'MEMORY.md',                             icon: '🔐' },
  { label: 'USER Profile',            path: 'USER.md',                               icon: '👤' },
  { label: 'Mission Control',         path: 'mission-control.html',                  icon: '🖥️' },
]

function Card({ children, style = {} }) {
  return (
    <div style={{
      background: 'var(--glass)', backdropFilter: 'blur(24px)',
      WebkitBackdropFilter: 'blur(24px)', border: '1px solid var(--gborder)',
      borderRadius: 12, padding: '16px 18px', ...style
    }}>
      {children}
    </div>
  )
}

function SecLabel({ children }) {
  return (
    <div style={{
      fontSize: '0.58rem', letterSpacing: '0.28em', color: 'var(--dim)',
      textTransform: 'uppercase', display: 'flex', alignItems: 'center',
      gap: 10, marginBottom: 14,
    }}>
      {children}
      <div style={{ flex: 1, height: 1, background: 'linear-gradient(90deg, var(--gborder), transparent)' }} />
    </div>
  )
}

export default function Intel() {
  return (
    <div style={{ height: '100%', overflowY: 'auto', padding: '14px' }}>

      {/* Header */}
      <div style={{ marginBottom: 16 }}>
        <div style={{ fontSize: '1.1rem', fontWeight: 900, color: 'var(--blue)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
          📡 INTEL CENTER
        </div>
        <div style={{ fontSize: '0.6rem', color: 'var(--dim)', letterSpacing: '0.14em', marginTop: 4 }}>
          WORKSPACE FILES · BUILDS · KNOWLEDGE BASE
        </div>
      </div>

      {/* Build Summary */}
      <Card style={{ marginBottom: 14 }}>
        <SecLabel>⬡ WHAT'S BEEN BUILT</SecLabel>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 10 }}>
          {BUILDS.map((b, i) => (
            <div key={i} style={{
              padding: '12px 14px',
              background: 'rgba(255,255,255,.02)',
              border: '1px solid var(--gborder)',
              borderRadius: 10,
              position: 'relative',
              overflow: 'hidden',
            }}>
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: b.statusColor, opacity: 0.4 }} />
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 6 }}>
                <span style={{ fontSize: '1.2rem' }}>{b.icon}</span>
                <span style={{
                  fontSize: '0.52rem', padding: '2px 7px', borderRadius: 8,
                  background: `${b.statusColor}18`, border: `1px solid ${b.statusColor}40`,
                  color: b.statusColor, letterSpacing: '0.08em',
                }}>{b.status}</span>
              </div>
              <div style={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.08em', marginBottom: 3 }}>{b.name}</div>
              <div style={{ fontSize: '0.6rem', color: 'var(--dim)', lineHeight: 1.4, marginBottom: 5 }}>{b.description}</div>
              <div style={{ fontSize: '0.55rem', color: 'var(--blue)', opacity: 0.7 }}>{b.repo}</div>
              <div style={{ fontSize: '0.52rem', color: 'var(--dim)', marginTop: 2 }}>{b.date}</div>
            </div>
          ))}
        </div>
      </Card>

      {/* Workspace Directories */}
      <Card style={{ marginBottom: 14 }}>
        <SecLabel>⬡ WORKSPACE DIRECTORIES</SecLabel>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {WORKSPACE_DIRS.map((dir, i) => (
            <div key={i} style={{
              display: 'flex', gap: 12, alignItems: 'flex-start',
              padding: '10px 12px',
              background: 'rgba(255,255,255,.02)',
              border: `1px solid rgba(255,255,255,.06)`,
              borderRadius: 10,
              borderLeft: `2px solid ${dir.color}`,
            }}>
              <div style={{ fontSize: '1.4rem', flexShrink: 0, lineHeight: 1 }}>{dir.icon}</div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 3 }}>
                  <span style={{ fontSize: '0.72rem', fontWeight: 700, color: dir.color, fontFamily: "'JetBrains Mono', monospace" }}>{dir.name}</span>
                  <span style={{ fontSize: '0.52rem', color: 'var(--dim)', padding: '1px 7px', borderRadius: 6, background: 'rgba(255,255,255,.04)', border: '1px solid rgba(255,255,255,.07)' }}>{dir.count}</span>
                </div>
                <div style={{ fontSize: '0.6rem', color: 'var(--dim)', marginBottom: 5 }}>{dir.description}</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                  {dir.files.map((f, j) => (
                    <span key={j} style={{ fontSize: '0.55rem', color: 'var(--text)', opacity: 0.6, background: 'rgba(255,255,255,.03)', border: '1px solid rgba(255,255,255,.06)', padding: '1px 7px', borderRadius: 4, fontFamily: "'JetBrains Mono', monospace" }}>
                      {f}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Key Docs */}
      <Card>
        <SecLabel>⬡ KEY DOCUMENTS</SecLabel>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          {KEY_DOCS.map((doc, i) => (
            <div key={i} style={{
              display: 'flex', alignItems: 'center', gap: 10,
              padding: '9px 12px',
              background: 'rgba(255,255,255,.02)',
              border: '1px solid rgba(255,255,255,.05)',
              borderRadius: 8,
            }}>
              <span style={{ fontSize: '1rem', flexShrink: 0 }}>{doc.icon}</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '0.72rem', fontWeight: 600, marginBottom: 1 }}>{doc.label}</div>
                <div style={{ fontSize: '0.55rem', color: 'var(--dim)', fontFamily: "'JetBrains Mono', monospace" }}>{doc.path}</div>
              </div>
              <span style={{ fontSize: '0.6rem', color: 'var(--blue)', opacity: 0.7 }}>→</span>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 12, padding: '8px 12px', background: 'rgba(68,136,255,.04)', borderRadius: 8, fontSize: '0.6rem', color: 'var(--dim)', lineHeight: 1.5 }}>
          📂 Workspace: <span style={{ color: 'var(--blue)', fontFamily: "'JetBrains Mono', monospace" }}>/Users/aimoneymachine/.openclaw/workspace</span>
        </div>
      </Card>

    </div>
  )
}
