import { useState, useEffect } from 'react'

const pad = n => String(n).padStart(2, '0')

function daysLeft(deadline) {
  return Math.max(0, Math.ceil((new Date(deadline) - Date.now()) / 86400000))
}

const INITIAL_MILESTONES = [
  { id: 1,  done: false, label: 'First prospect outreach sent',              category: 'outreach' },
  { id: 2,  done: false, label: 'First sales call booked',                   category: 'outreach' },
  { id: 3,  done: false, label: 'First client closed ($500–$2k/mo)',         category: 'revenue' },
  { id: 4,  done: false, label: 'GHL sub-account live for paying client',    category: 'product' },
  { id: 5,  done: false, label: 'First $1,000 MRR',                         category: 'revenue' },
  { id: 6,  done: false, label: 'Recovery vertical — first prospect call',   category: 'recovery' },
  { id: 7,  done: false, label: 'Evolve Recovery — first paying client',     category: 'recovery' },
  { id: 8,  done: false, label: '$2,500 MRR milestone',                      category: 'revenue' },
  { id: 9,  done: false, label: 'evolvesmarter.io live on custom domain',    category: 'product' },
  { id: 10, done: false, label: 'Social media — first post goes live',       category: 'social' },
  { id: 11, done: false, label: 'Agency Vault decision made (keep/fire)',    category: 'ops' },
  { id: 12, done: false, label: '$5,000 MRR milestone — halfway',           category: 'revenue' },
  { id: 13, done: false, label: 'Original recovery client back ($4k/mo)',   category: 'recovery' },
  { id: 14, done: false, label: 'Grateful Gestures — first TikTok ad live', category: 'social' },
  { id: 15, done: false, label: '$10,000 MRR — MISSION COMPLETE 🔥',        category: 'revenue' },
]

const CATEGORY_COLORS = {
  revenue:  'var(--amber)',
  outreach: 'var(--blue)',
  product:  'var(--purple)',
  recovery: 'var(--green)',
  social:   'var(--pink)',
  ops:      'var(--cyan)',
}

function ProgressBar({ pct, color = 'var(--amber)', height = 18 }) {
  return (
    <div style={{ height, background: 'rgba(255,255,255,.04)', borderRadius: height/2, border: '1px solid rgba(255,255,255,.06)', overflow: 'hidden' }}>
      <div style={{
        height: '100%',
        width: `${Math.max(pct, pct > 0 ? 1.5 : 0)}%`,
        borderRadius: height/2,
        background: `linear-gradient(90deg, ${color}, ${color}cc)`,
        position: 'relative', overflow: 'hidden',
        transition: 'width 1.8s cubic-bezier(.4,0,.2,1)',
      }}>
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,.45) 50%, transparent 100%)',
          animation: 'shim 2.2s ease-in-out infinite',
        }} />
      </div>
    </div>
  )
}

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

export default function Goals() {
  const [milestones, setMilestones] = useState(() => {
    try {
      const saved = localStorage.getItem('beqprod-milestones')
      if (saved) return JSON.parse(saved)
    } catch {}
    return INITIAL_MILESTONES
  })

  const [mrr, setMrr] = useState(() => {
    try { return parseFloat(localStorage.getItem('beqprod-mrr') || '0') } catch { return 0 }
  })
  const [mrrInput, setMrrInput] = useState('')
  const [editingMrr, setEditingMrr] = useState(false)

  const daysApril = daysLeft('2026-04-30T23:59:59')
  const daysYear  = daysLeft('2026-12-31T23:59:59')

  // Persist milestones
  useEffect(() => {
    try { localStorage.setItem('beqprod-milestones', JSON.stringify(milestones)) } catch {}
  }, [milestones])

  useEffect(() => {
    try { localStorage.setItem('beqprod-mrr', String(mrr)) } catch {}
  }, [mrr])

  function toggleMilestone(id) {
    setMilestones(prev => prev.map(m => m.id === id ? { ...m, done: !m.done } : m))
  }

  function saveMrr() {
    const val = parseFloat(mrrInput)
    if (!isNaN(val) && val >= 0) setMrr(val)
    setEditingMrr(false)
    setMrrInput('')
  }

  const doneMilestones = milestones.filter(m => m.done).length
  const milestoneProgress = (doneMilestones / milestones.length) * 100
  const aprilProgress = Math.min((mrr / 10000) * 100, 100)
  const yearProgress = Math.min((mrr / 50000) * 100, 100)
  const neededPerDay = daysApril > 0 ? ((10000 - mrr) / daysApril).toFixed(0) : 0

  return (
    <div style={{ height: '100%', overflowY: 'auto', padding: '14px' }}>

      {/* Header */}
      <div style={{ marginBottom: 16 }}>
        <div style={{ fontSize: '1.1rem', fontWeight: 900, color: 'var(--amber)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
          🎯 GOALS & MILESTONES
        </div>
        <div style={{ fontSize: '0.6rem', color: 'var(--dim)', letterSpacing: '0.14em', marginTop: 4 }}>
          TRACK YOUR WINS · UPDATE AS YOU GO
        </div>
      </div>

      {/* MRR Editor */}
      <Card style={{ marginBottom: 14, borderColor: 'rgba(255,170,0,.15)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
          <div style={{ fontSize: '0.58rem', color: 'var(--dim)', letterSpacing: '0.2em' }}>CURRENT MRR</div>
          <button
            onClick={() => { setEditingMrr(!editingMrr); setMrrInput(String(mrr)) }}
            style={{ background: 'none', border: 'none', color: 'var(--blue)', fontSize: '0.62rem', cursor: 'pointer', letterSpacing: '0.1em' }}
          >
            {editingMrr ? 'CANCEL' : 'UPDATE'}
          </button>
        </div>
        {editingMrr ? (
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <span style={{ color: 'var(--amber)', fontSize: '1.3rem', fontWeight: 700 }}>$</span>
            <input
              value={mrrInput}
              onChange={e => setMrrInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && saveMrr()}
              placeholder="0"
              type="number"
              min="0"
              style={{
                flex: 1, background: 'rgba(255,255,255,.06)', border: '1px solid rgba(255,170,0,.3)',
                borderRadius: 8, color: 'var(--text)', fontSize: '1.3rem', fontWeight: 700,
                padding: '6px 12px', outline: 'none', fontFamily: 'inherit',
              }}
              autoFocus
            />
            <button
              onClick={saveMrr}
              style={{ padding: '8px 16px', background: 'rgba(255,170,0,.15)', border: '1px solid rgba(255,170,0,.3)', borderRadius: 8, color: 'var(--amber)', fontSize: '0.72rem', cursor: 'pointer', fontFamily: 'inherit', letterSpacing: '0.1em' }}
            >
              SAVE
            </button>
          </div>
        ) : (
          <div style={{ fontSize: '2rem', fontWeight: 900, color: 'var(--amber)', textShadow: '0 0 20px rgba(255,170,0,.4)' }}>
            ${mrr.toLocaleString()}
            <span style={{ fontSize: '0.8rem', color: 'var(--dim)', marginLeft: 8 }}>/mo</span>
          </div>
        )}
      </Card>

      {/* April Target */}
      <Card style={{ marginBottom: 14 }}>
        <SecLabel>⬡ APRIL TARGET — $10K MRR</SecLabel>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
          <div>
            <div style={{ fontSize: '0.7rem', color: 'var(--dim)' }}>Progress</div>
            <div style={{ fontSize: '1.4rem', fontWeight: 900, color: 'var(--amber)' }}>{aprilProgress.toFixed(1)}%</div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '0.7rem', color: 'var(--dim)' }}>Remaining</div>
            <div style={{ fontSize: '1.4rem', fontWeight: 900, color: aprilProgress >= 100 ? 'var(--green)' : 'var(--text)' }}>
              ${Math.max(0, 10000 - mrr).toLocaleString()}
            </div>
          </div>
        </div>
        <ProgressBar pct={aprilProgress} color="var(--amber)" />
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.55rem', color: 'var(--dim)', margin: '6px 0 12px' }}>
          <span>$0</span><span>$2,500</span><span>$5,000</span><span>$7,500</span><span>$10,000</span>
        </div>

        <div style={{ display: 'flex', gap: 10 }}>
          <div style={{ flex: 1, padding: '10px 12px', background: 'rgba(255,170,0,.05)', border: '1px solid rgba(255,170,0,.15)', borderRadius: 8, textAlign: 'center' }}>
            <div style={{ fontSize: '1.3rem', fontWeight: 900, color: 'var(--amber)' }}>{daysApril}</div>
            <div style={{ fontSize: '0.55rem', color: 'var(--dim)', marginTop: 2 }}>DAYS LEFT</div>
          </div>
          <div style={{ flex: 1, padding: '10px 12px', background: 'rgba(68,136,255,.05)', border: '1px solid rgba(68,136,255,.15)', borderRadius: 8, textAlign: 'center' }}>
            <div style={{ fontSize: '1.3rem', fontWeight: 900, color: 'var(--blue)' }}>${neededPerDay}</div>
            <div style={{ fontSize: '0.55rem', color: 'var(--dim)', marginTop: 2 }}>$/DAY NEEDED</div>
          </div>
          <div style={{ flex: 1, padding: '10px 12px', background: 'rgba(0,255,136,.05)', border: '1px solid rgba(0,255,136,.15)', borderRadius: 8, textAlign: 'center' }}>
            <div style={{ fontSize: '1.3rem', fontWeight: 900, color: 'var(--green)' }}>
              {Math.ceil((10000 - mrr) / 2000)}
            </div>
            <div style={{ fontSize: '0.55rem', color: 'var(--dim)', marginTop: 2 }}>CLIENTS NEEDED</div>
          </div>
        </div>
      </Card>

      {/* Year-end Target */}
      <Card style={{ marginBottom: 14 }}>
        <SecLabel>⬡ YEAR-END TARGET — $50K MRR</SecLabel>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
          <div>
            <div style={{ fontSize: '0.7rem', color: 'var(--dim)' }}>Progress</div>
            <div style={{ fontSize: '1.2rem', fontWeight: 900, color: 'var(--purple)' }}>{yearProgress.toFixed(1)}%</div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '0.7rem', color: 'var(--dim)' }}>{daysYear} days left</div>
            <div style={{ fontSize: '0.8rem', color: 'var(--dim)' }}>Dec 31, 2026</div>
          </div>
        </div>
        <ProgressBar pct={yearProgress} color="var(--purple)" height={14} />
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.52rem', color: 'var(--dim)', marginTop: 6 }}>
          <span>$0</span><span>$12.5k</span><span>$25k</span><span>$37.5k</span><span>$50k</span>
        </div>
      </Card>

      {/* Milestones */}
      <Card>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
          <SecLabel>⬡ MILESTONE CHECKLIST</SecLabel>
        </div>
        <div style={{ marginBottom: 12 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.6rem', color: 'var(--dim)', marginBottom: 6 }}>
            <span>{doneMilestones} / {milestones.length} complete</span>
            <span>{milestoneProgress.toFixed(0)}%</span>
          </div>
          <ProgressBar pct={milestoneProgress} color="var(--green)" height={10} />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          {milestones.map((m) => {
            const catColor = CATEGORY_COLORS[m.category] || 'var(--blue)'
            return (
              <button
                key={m.id}
                onClick={() => toggleMilestone(m.id)}
                style={{
                  display: 'flex', gap: 10, alignItems: 'center',
                  padding: '10px 12px',
                  background: m.done ? 'rgba(0,255,136,.05)' : 'rgba(255,255,255,.02)',
                  border: `1px solid ${m.done ? 'rgba(0,255,136,.2)' : 'rgba(255,255,255,.06)'}`,
                  borderRadius: 8,
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'all 0.2s',
                  borderLeft: `3px solid ${m.done ? 'var(--green)' : catColor}`,
                }}
              >
                {/* Checkbox */}
                <div style={{
                  width: 20, height: 20, borderRadius: 5, flexShrink: 0,
                  background: m.done ? 'rgba(0,255,136,.2)' : 'rgba(255,255,255,.04)',
                  border: `1px solid ${m.done ? 'rgba(0,255,136,.5)' : 'rgba(255,255,255,.15)'}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '0.8rem', transition: 'all 0.2s',
                }}>
                  {m.done ? '✓' : ''}
                </div>
                <span style={{
                  flex: 1, fontSize: '0.72rem', lineHeight: 1.4,
                  color: m.done ? 'var(--green)' : 'var(--text)',
                  opacity: m.done ? 0.8 : 1,
                  textDecoration: m.done ? 'line-through' : 'none',
                  transition: 'all 0.2s',
                }}>
                  {m.label}
                </span>
                <span style={{ fontSize: '0.5rem', padding: '1px 5px', borderRadius: 4, background: `${catColor}18`, color: catColor, flexShrink: 0, letterSpacing: '0.06em' }}>
                  {m.category}
                </span>
              </button>
            )
          })}
        </div>

        <div style={{ marginTop: 12, padding: '8px 12px', background: 'rgba(153,102,255,.04)', border: '1px solid rgba(153,102,255,.12)', borderRadius: 8, fontSize: '0.6rem', color: 'var(--dim)', lineHeight: 1.5 }}>
          🔐 Tap any milestone to mark it done. Progress saves automatically.
        </div>
      </Card>

    </div>
  )
}
