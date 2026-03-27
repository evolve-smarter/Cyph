const tabs = [
  { id: 'dashboard', label: 'Dashboard', icon: '⬡' },
  { id: 'chat',      label: 'Chat',      icon: '💬' },
  { id: 'intel',     label: 'Intel',     icon: '📡' },
  { id: 'goals',     label: 'Goals',     icon: '🎯' },
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
            {/* Active top border */}
            {isActive && (
              <div style={{
                position: 'absolute',
                top: 0, left: '15%', right: '15%',
                height: 2,
                background: 'linear-gradient(90deg, transparent, #4488ff, transparent)',
                borderRadius: 1,
              }} />
            )}
            <span className="tab-icon">{t.icon}</span>
            <span className="tab-label" style={{ color: isActive ? '#4488ff' : '#5a6490', fontWeight: isActive ? '700' : '400' }}>
              {t.label}
            </span>
          </button>
        )
      })}
    </nav>
  )
}
