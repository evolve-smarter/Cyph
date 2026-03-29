// Vault.jsx — Memory + Documents + Goals in one clean hub
import { useState } from 'react'
import Memory from './Memory'
import Documents from './Documents'
import Goals from './Goals'

export default function Vault() {
  const [section, setSection] = useState('docs')

  const sections = [
    { id: 'docs',   label: 'Docs',   icon: '📁' },
    { id: 'memory', label: 'Memory', icon: '🧠' },
    { id: 'goals',  label: 'Goals',  icon: '🎯' },
  ]

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      {/* Sub-nav */}
      <div style={{ display: 'flex', gap: 4, padding: '10px 14px 0', background: 'var(--bg)', borderBottom: '1px solid rgba(255,255,255,0.05)', flexShrink: 0 }}>
        {sections.map(s => (
          <button key={s.id} onClick={() => setSection(s.id)} style={{
            flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
            padding: '8px 4px 10px',
            background: 'none', border: 'none', cursor: 'pointer',
            fontSize: '12px', fontWeight: section === s.id ? 700 : 500,
            color: section === s.id ? 'var(--blue)' : 'var(--text3)',
            borderBottom: section === s.id ? '2px solid var(--blue)' : '2px solid transparent',
            transition: 'all 0.15s',
          }}>
            <span>{s.icon}</span>
            <span style={{ letterSpacing: '0.05em', textTransform: 'uppercase', fontSize: '10px' }}>{s.label}</span>
          </button>
        ))}
      </div>

      {/* Content */}
      <div style={{ flex: 1, overflow: 'hidden' }}>
        {section === 'docs'   && <Documents />}
        {section === 'memory' && <Memory />}
        {section === 'goals'  && <Goals />}
      </div>
    </div>
  )
}
