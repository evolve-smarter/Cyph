// Office.jsx — Live Cyph Star Office pixel art workspace
import { useState, useEffect } from 'react'

const OFFICE_URL = 'http://100.119.58.128:19000'
const STATES = ['idle', 'writing', 'researching', 'executing', 'syncing', 'error']
const STATE_LABELS = {
  idle: { label: 'Standing By', color: '#9299b8', icon: '😴' },
  writing: { label: 'Writing', color: '#4d8eff', icon: '✍️' },
  researching: { label: 'Researching', color: '#38d9f5', icon: '🔍' },
  executing: { label: 'Executing', color: '#22d68a', icon: '⚡' },
  syncing: { label: 'Syncing', color: '#f5a623', icon: '🔄' },
  error: { label: 'Error', color: '#ff4d6a', icon: '🚨' },
}

export default function Office() {
  const [status, setStatus] = useState(null)
  const [error, setError] = useState(null)
  const [showFrame, setShowFrame] = useState(false)

  useEffect(() => {
    fetchStatus()
    const iv = setInterval(fetchStatus, 5000)
    return () => clearInterval(iv)
  }, [])

  async function fetchStatus() {
    try {
      const res = await fetch(`${OFFICE_URL}/status`, { signal: AbortSignal.timeout(4000) })
      if (!res.ok) throw new Error(`${res.status}`)
      const data = await res.json()
      setStatus(data)
      setError(null)
    } catch (e) {
      setError('Office unreachable — start Star Office backend on Mac mini')
    }
  }

  async function setState(state) {
    try {
      await fetch(`${OFFICE_URL}/set_state`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ state, detail: STATE_LABELS[state]?.label }),
      })
      setTimeout(fetchStatus, 500)
    } catch {}
  }

  const sc = status ? (STATE_LABELS[status.state] || STATE_LABELS.idle) : null
  const g = { glass: 'rgba(255,255,255,0.028)', gborder: 'rgba(255,255,255,0.07)' }

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>

      {/* Header */}
      <div style={{ padding: '14px 14px 0', flexShrink: 0 }}>
        <div style={{ fontSize: '0.6rem', letterSpacing: '0.2em', color: 'var(--text3)', textTransform: 'uppercase', marginBottom: 6 }}>LIVE WORKSPACE</div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
          <div style={{ fontSize: 'clamp(1rem,4vw,1.3rem)', fontWeight: 800, color: 'var(--text)', letterSpacing: '-0.02em' }}>Cyph's Office</div>
          {status && (
            <span style={{
              display: 'inline-flex', alignItems: 'center', gap: 5,
              padding: '4px 10px', borderRadius: 20, fontSize: '11px', fontWeight: 700,
              background: `${sc.color}18`, border: `1px solid ${sc.color}44`, color: sc.color,
            }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: sc.color, boxShadow: `0 0 6px ${sc.color}`, animation: 'pdot 2s ease-in-out infinite' }} />
              {sc.icon} {sc.label.toUpperCase()}
            </span>
          )}
        </div>
      </div>

      {/* Error state */}
      {error && (
        <div style={{ margin: '0 14px 12px', padding: '12px 14px', background: 'rgba(255,77,106,0.08)', border: '1px solid rgba(255,77,106,0.2)', borderRadius: 8, fontSize: '0.78rem', color: '#ff4d6a' }}>
          ⚠️ {error}
        </div>
      )}

      {/* State detail */}
      {status && !error && (
        <div style={{ margin: '0 14px 12px', padding: '10px 14px', background: g.glass, border: `1px solid ${g.gborder}`, borderRadius: 8 }}>
          <div style={{ fontSize: '0.68rem', color: 'var(--text3)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 4 }}>Current Activity</div>
          <div style={{ fontSize: '0.88rem', color: 'var(--text)', fontWeight: 500 }}>{status.detail || 'Standing by...'}</div>
          <div style={{ fontSize: '0.65rem', color: 'var(--text3)', marginTop: 4 }}>
            Updated {new Date(status.updated_at).toLocaleTimeString()}
          </div>
        </div>
      )}

      {/* State controls */}
      <div style={{ padding: '0 14px 12px', flexShrink: 0 }}>
        <div style={{ fontSize: '0.6rem', letterSpacing: '0.16em', color: 'var(--text3)', textTransform: 'uppercase', marginBottom: 8 }}>Set State</div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
          {STATES.map(s => {
            const cfg = STATE_LABELS[s]
            const isActive = status?.state === s
            return (
              <button key={s} onClick={() => setState(s)} style={{
                padding: '5px 12px', borderRadius: 20, fontSize: '11px', fontWeight: 600,
                cursor: 'pointer', letterSpacing: '0.05em', textTransform: 'uppercase',
                background: isActive ? `${cfg.color}20` : g.glass,
                border: `1px solid ${isActive ? cfg.color : g.gborder}`,
                color: isActive ? cfg.color : 'var(--text3)',
                transition: 'all 0.15s',
              }}>{cfg.icon} {s}</button>
            )
          })}
        </div>
      </div>

      {/* Office iframe / view toggle */}
      <div style={{ flex: 1, padding: '0 14px 14px', display: 'flex', flexDirection: 'column', minHeight: 0 }}>
        <div style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
          <button onClick={() => setShowFrame(f => !f)} style={{
            padding: '6px 14px', borderRadius: 6, fontSize: '11px', fontWeight: 700,
            cursor: 'pointer', letterSpacing: '0.06em', textTransform: 'uppercase',
            background: showFrame ? 'rgba(77,142,255,0.15)' : g.glass,
            border: `1px solid ${showFrame ? 'rgba(77,142,255,0.4)' : g.gborder}`,
            color: showFrame ? 'var(--blue)' : 'var(--text3)',
          }}>
            {showFrame ? '📷 Live View' : '🖥️ Open Live View'}
          </button>
          <a href={`${OFFICE_URL}`} target="_blank" rel="noreferrer" style={{
            padding: '6px 14px', borderRadius: 6, fontSize: '11px', fontWeight: 700,
            letterSpacing: '0.06em', textTransform: 'uppercase', textDecoration: 'none',
            background: g.glass, border: `1px solid ${g.gborder}`, color: 'var(--text3)',
            display: 'inline-flex', alignItems: 'center',
          }}>↗ Full Screen</a>
        </div>

        {showFrame ? (
          <div style={{ flex: 1, borderRadius: 10, overflow: 'hidden', border: `1px solid ${g.gborder}`, background: '#000' }}>
            <iframe
              src={OFFICE_URL}
              style={{ width: '100%', height: '100%', border: 'none' }}
              title="Cyph's Office"
            />
          </div>
        ) : (
          <div style={{ flex: 1, background: g.glass, border: `1px solid ${g.gborder}`, borderRadius: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 12, cursor: 'pointer' }}
            onClick={() => setShowFrame(true)}>
            <div style={{ fontSize: '3rem' }}>🐱</div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text2)', fontWeight: 600 }}>Tap to open live office view</div>
            <div style={{ fontSize: '0.72rem', color: 'var(--text3)' }}>Pixel art workspace · Cyph is {status?.state || 'loading'}...</div>
          </div>
        )}
      </div>
    </div>
  )
}
