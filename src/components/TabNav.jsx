const tabs = [
  { id: 'dashboard', label: 'Dashboard', icon: '⬡' },
  { id: 'chat',      label: 'Chat',      icon: '💬' },
  { id: 'intel',     label: 'Intel',     icon: '📡' },
  { id: 'goals',     label: 'Goals',     icon: '🎯' },
]

export default function TabNav({ active, onChange }) {
  return (
    <nav style={{
      position: 'relative',
      zIndex: 100,
      display: 'flex',
      background: 'rgba(10,10,20,0.95)',
      borderTop: '1px solid rgba(68,136,255,0.15)',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      paddingBottom: 'env(safe-area-inset-bottom)',
    }}>
      {tabs.map(t => {
        const isActive = active === t.id
        return (
          <button
            key={t.id}
            onClick={() => onChange(t.id)}
            style={{
              flex: 1,
              padding: '10px 4px 8px',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 3,
              position: 'relative',
              transition: 'all 0.2s',
            }}
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
            <span style={{ fontSize: 18, lineHeight: 1 }}>{t.icon}</span>
            <span style={{
              fontSize: 9,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: isActive ? '#4488ff' : '#5a6490',
              fontFamily: 'monospace',
              fontWeight: isActive ? '700' : '400',
              transition: 'color 0.2s',
            }}>
              {t.label}
            </span>
          </button>
        )
      })}
    </nav>
  )
}
