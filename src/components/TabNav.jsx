const tabs = [
  { id: 'dashboard', label: 'Home',   icon: '⬡' },
  { id: 'tasks',     label: 'Tasks',  icon: '✓' },
  { id: 'projects',  label: 'Build',  icon: '🗂️' },
  { id: 'memory',    label: 'Memory', icon: '🧠' },
  { id: 'documents', label: 'Docs',   icon: '📁' },
  { id: 'chat',      label: 'Chat',   icon: '💬' },
  { id: 'goals',     label: 'Goals',  icon: '🎯' },
]

export default function TabNav({ active, onChange }) {
  return (
    <nav className="tab-nav">
      {tabs.map(t => {
        const isActive = active === t.id
        return (
          <button
            key={t.id}
            onClick={() => onChange(t.id)}
            className="tab-btn"
            aria-label={t.label}
          >
            {isActive && (
              <div style={{
                position: 'absolute',
                top: 0, left: '10%', right: '10%',
                height: 2,
                background: 'linear-gradient(90deg, transparent, #4488ff, transparent)',
                borderRadius: 1,
              }} />
            )}
            <span className="tab-icon" style={{ fontSize: t.id === 'tasks' ? '1rem' : undefined }}>{t.icon}</span>
            <span className="tab-label" style={{ color: isActive ? '#4488ff' : '#5a6490', fontWeight: isActive ? '700' : '400' }}>
              {t.label}
            </span>
          </button>
        )
      })}
    </nav>
  )
}
