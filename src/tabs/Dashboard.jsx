import { useState, useEffect, useRef } from 'react'

// ── Helpers ──────────────────────────────────────────────────────────────
const pad = n => String(n).padStart(2, '0')
const DAYS_NAMES   = ['SUN','MON','TUE','WED','THU','FRI','SAT']
const MONTH_NAMES  = ['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC']

function daysLeft() {
  const deadline = new Date('2026-04-30T23:59:59')
  return Math.max(0, Math.ceil((deadline - Date.now()) / 86400000))
}

// ── Sub-components ────────────────────────────────────────────────────────
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

function Card({ children, style = {} }) {
  return (
    <div style={{
      background: 'var(--glass)', backdropFilter: 'blur(24px)',
      WebkitBackdropFilter: 'blur(24px)', border: '1px solid var(--gborder)',
      borderRadius: 12, padding: '18px 20px', ...style
    }}>
      {children}
    </div>
  )
}

function StatusBadge({ status }) {
  const map = {
    active:  { bg: 'rgba(0,255,136,.1)',   border: 'rgba(0,255,136,.3)',   color: 'var(--green)',  label: 'ACTIVE',   anim: '2s' },
    build:   { bg: 'rgba(153,102,255,.1)', border: 'rgba(153,102,255,.3)', color: 'var(--purple)', label: 'BUILDING', anim: '1.4s' },
    standby: { bg: 'rgba(255,170,0,.08)',  border: 'rgba(255,170,0,.2)',   color: 'var(--amber)',  label: 'STANDBY',  anim: null },
    run:     { bg: 'rgba(68,136,255,.1)',  border: 'rgba(68,136,255,.3)',  color: 'var(--blue)',   label: 'RUNNING',  anim: '1.8s' },
  }
  const s = map[status] || map.standby
  return (
    <span style={{
      display: 'flex', alignItems: 'center', gap: 5,
      padding: '3px 8px', borderRadius: 10,
      fontSize: '0.58rem', fontWeight: 'bold', letterSpacing: '0.1em',
      background: s.bg, border: `1px solid ${s.border}`, color: s.color,
    }}>
      <span style={{
        width: 5, height: 5, borderRadius: '50%', background: s.color,
        boxShadow: s.anim ? `0 0 5px ${s.color}` : 'none',
        animation: s.anim ? `pdot ${s.anim} ease-in-out infinite` : 'none',
      }} />
      {s.label}
    </span>
  )
}

const AGENTS = [
  { id: 'cypher', name: 'CYPHER', role: 'COMMANDER · CO-FOUNDER · ALWAYS ON', task: 'Watching everything. Building while you sleep.', last: 'just now', status: 'active', emoji: '🔐', accentColor: 'var(--blue)', isCommander: true },
  { id: 'ivy',    name: 'IVY',    role: 'RESEARCH & INTELLIGENCE', task: 'Daily idea briefing: Greg Isenberg, Chris Koerner, IdeaBrowser. Fires at 8AM.', last: '08:00 today', status: 'active',  emoji: '🦅', accentColor: 'var(--green)' },
  { id: 'nexus',  name: 'NEXUS',  role: 'CTO · BUILD & CODE',        task: 'evolvesmarter.io hub site — pushed to GitHub', last: '08:54 today', status: 'build',  emoji: '⚡', accentColor: 'var(--purple)' },
  { id: 'wolf',   name: 'WOLF',   role: 'BUSINESS DEV & OUTREACH',   task: '20 home services + 12 recovery prospects ready', last: '08:00 today', status: 'standby', emoji: '🐺', accentColor: 'var(--amber)' },
  { id: 'mrx',    name: 'MR. X',  role: 'SOCIAL MEDIA MANAGER',      task: 'Social strategy complete. 15 posts ready. GHL planner guide done.', last: '08:15 today', status: 'active',  emoji: '📣', accentColor: 'var(--pink)' },
  { id: 'knox',   name: 'KNOX',   role: 'SECURITY & SYSTEMS',         task: 'Coming soon', last: '—', status: 'standby', emoji: '🛡️', accentColor: 'var(--cyan)' },
  { id: 'vault',  name: 'VAULT',  role: 'FINANCE & REVENUE',          task: 'Coming soon. Target: $10k MRR by April 30', last: '—', status: 'standby', emoji: '💰', accentColor: 'var(--amber)' },
]

const INTEL = [
  { time: '[08:54]', text: 'evolvesmarter.io hub built & pushed to GitHub' },
  { time: '[08:15]', text: 'Mr. X social strategy complete — 51KB report saved' },
  { time: '[08:00]', text: '20 home services prospects found in Ventura County' },
  { time: '[07:46]', text: '12 recovery/rehab prospects found in SoCal' },
  { time: '[07:11]', text: 'Daily idea briefing cron set up — fires 8AM daily' },
  { time: '[07:00]', text: 'GHL connected — 20 sub-accounts visible' },
  { time: '[06:52]', text: 'GitHub connected as evolve-smarter' },
  { time: '[06:01]', text: 'Day One — Cyph came online 🔐' },
]

const VERTICALS = [
  { icon: '⚙️', name: 'EVOLVE HOME SERVICES', status: 'REBUILDING', statusBg: 'rgba(68,136,255,.1)', statusBorder: 'rgba(68,136,255,.3)', statusColor: 'var(--blue)', stats: [['Prospects','20'],['Target MRR','$5,000'],['Region','Ventura Co.']], vc: 'var(--blue)' },
  { icon: '💙', name: 'EVOLVE RECOVERY',       status: 'OUTREACH READY', statusBg: 'rgba(0,255,136,.08)', statusBorder: 'rgba(0,255,136,.28)', statusColor: 'var(--green)', stats: [['Prospects','12'],['Target MRR','$4,000+'],['Region','SoCal']], vc: 'var(--green)' },
  { icon: '🧘', name: 'GRATEFUL GESTURES',     status: 'AUTO-RUNNING', statusBg: 'rgba(153,102,255,.1)', statusBorder: 'rgba(153,102,255,.3)', statusColor: 'var(--purple)', stats: [['Top Product','Yoga Leggings'],['Next Move','TikTok Ads'],['Platform','Etsy + Shopify']], vc: 'var(--purple)' },
]

// ── Main Component ────────────────────────────────────────────────────────
export default function Dashboard() {
  const [clock, setClock] = useState('')
  const [date, setDate] = useState('')
  const [days, setDays] = useState(daysLeft())
  const [uptime, setUptime] = useState('00:00:00')
  const [intelVisible, setIntelVisible] = useState([])
  const t0Ref = useRef(Date.now())

  useEffect(() => {
    function tick() {
      const now = new Date()
      setClock(`${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`)
      setDate(`${DAYS_NAMES[now.getDay()]} · ${MONTH_NAMES[now.getMonth()]} ${now.getDate()}, ${now.getFullYear()}`)
      setDays(daysLeft())
      const e = Date.now() - t0Ref.current
      const h = Math.floor(e/3600000), m = Math.floor((e%3600000)/60000), s = Math.floor((e%60000)/1000)
      setUptime(`${pad(h)}:${pad(m)}:${pad(s)}`)
    }
    tick()
    const interval = setInterval(tick, 1000)
    return () => clearInterval(interval)
  }, [])

  // Staggered intel reveal
  useEffect(() => {
    INTEL.forEach((_, i) => {
      setTimeout(() => setIntelVisible(prev => [...prev, i]), 700 + i * 160)
    })
  }, [])

  const commander = AGENTS.find(a => a.isCommander)
  const crew = AGENTS.filter(a => !a.isCommander)

  return (
    <div style={{ height: '100%', overflowY: 'auto', padding: '12px 14px 6px' }}>

      {/* ─── HEADER ─── */}
      <div style={{
        position: 'relative', overflow: 'hidden',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        flexWrap: 'wrap', gap: 12,
        padding: '16px 20px',
        background: 'linear-gradient(135deg, rgba(68,136,255,.05), rgba(153,102,255,.03))',
        border: '1px solid rgba(68,136,255,.14)', borderRadius: 14, marginBottom: 14,
      }}>
        {/* sweep line */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: 1,
          background: 'linear-gradient(90deg, transparent 0%, #4488ff 40%, #9966ff 60%, transparent 100%)',
          animation: 'hdr-sweep 4s ease-in-out infinite',
        }} />
        <div>
          <div style={{ fontSize: 'clamp(1.1rem,3vw,1.6rem)', fontWeight: 900, letterSpacing: '0.12em', color: 'var(--blue)', textShadow: '0 0 20px rgba(68,136,255,.7)', textTransform: 'uppercase' }}>
            ⬡ BEQPROD MISSION CONTROL
          </div>
          <div style={{ fontSize: '0.6rem', color: 'var(--dim)', letterSpacing: '0.18em', marginTop: 4 }}>
            EVOLVE SMARTER · GRATEFUL GESTURES · BEQPROD LLC
          </div>
          <div style={{ fontSize: '0.58rem', color: 'var(--purple)', marginTop: 4, letterSpacing: '0.12em' }}>
            Powered by Cyph 🔐 &nbsp;·&nbsp; Est. March 26, 2026
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 6 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 7, padding: '5px 13px', background: 'rgba(0,255,136,.07)', border: '1px solid rgba(0,255,136,.28)', borderRadius: 20, fontSize: '0.62rem', color: 'var(--green)', letterSpacing: '0.16em', fontWeight: 'bold' }}>
            <div style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--green)', boxShadow: '0 0 8px var(--green)', animation: 'pdot 2s ease-in-out infinite' }} />
            SYSTEMS ONLINE
          </div>
          <div style={{ fontSize: 'clamp(1rem,2vw,1.5rem)', fontWeight: 'bold', color: 'var(--green)', textShadow: '0 0 14px rgba(0,255,136,.5)', letterSpacing: '0.06em' }}>{clock}</div>
          <div style={{ fontSize: '0.6rem', color: 'var(--dim)', letterSpacing: '0.1em' }}>{date}</div>
        </div>
      </div>

      {/* ─── STATS ROW ─── */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 10, marginBottom: 14 }}>
        {[
          { num: '7', label: 'AGENTS DEPLOYED', color: 'var(--green)' },
          { num: uptime, label: 'SESSION UPTIME', color: 'var(--blue)' },
          { num: '8', label: 'TASKS COMPLETE', color: 'var(--amber)' },
          { num: days, label: 'DAYS TO GOAL', color: 'var(--red)' },
        ].map((s, i) => (
          <div key={i} style={{
            background: 'var(--glass)', border: '1px solid var(--gborder)', borderRadius: 10,
            padding: '11px 10px', textAlign: 'center', position: 'relative', overflow: 'hidden',
          }}>
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: s.color, opacity: 0.5 }} />
            <div style={{ fontSize: 'clamp(0.9rem,2vw,1.3rem)', fontWeight: 'bold', color: s.color, letterSpacing: '0.04em' }}>{s.num}</div>
            <div style={{ fontSize: '0.52rem', color: 'var(--dim)', letterSpacing: '0.12em', marginTop: 2 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* ─── TWO-COLUMN LAYOUT ─── */}
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) 300px', gap: 14, alignItems: 'start' }}>
        
        {/* LEFT */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>

          {/* AGENTS */}
          <Card>
            <SecLabel>⬡ AGENT STATUS · ONLINE CREW</SecLabel>

            {/* Commander */}
            <div style={{
              display: 'grid', gridTemplateColumns: 'auto 1fr auto', gap: 16, alignItems: 'center',
              padding: 14, borderRadius: 10,
              background: 'rgba(68,136,255,.038)', border: '1px solid rgba(68,136,255,.16)',
              marginBottom: 12, position: 'relative', overflow: 'hidden',
            }}>
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: 'var(--blue)', opacity: 0.55 }} />
              <div style={{
                width: 68, height: 68, borderRadius: '50%',
                background: 'rgba(68,136,255,.08)', border: '1px solid rgba(68,136,255,.3)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '2rem', animation: 'cmd-glow 3.5s ease-in-out infinite',
              }}>🔐</div>
              <div>
                <div style={{ fontSize: '0.8rem', fontWeight: 900, letterSpacing: '0.16em' }}>CYPHER</div>
                <div style={{ fontSize: '0.58rem', color: 'var(--dim)', letterSpacing: '0.1em', margin: '2px 0 7px' }}>COMMANDER · CO-FOUNDER · ALWAYS ON</div>
                <div style={{ fontSize: '0.65rem', opacity: 0.82 }}>Watching everything. Building while you sleep.</div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 9 }}>
                  <span style={{ fontSize: '0.55rem', color: 'var(--dim)' }}>Last: just now</span>
                  <StatusBadge status="active" />
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 8 }}>
                <div style={{ fontSize: '0.55rem', color: 'var(--dim)', textAlign: 'right', lineHeight: 1.5 }}>COMMAND<br/>CENTER</div>
                <div style={{ fontSize: '0.6rem', color: 'var(--blue)' }}>7 AGENTS LIVE</div>
              </div>
            </div>

            {/* Crew grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 10 }}>
              {crew.map(agent => (
                <div key={agent.id} style={{
                  background: 'rgba(255,255,255,.022)',
                  border: `1px solid var(--gborder)`,
                  borderRadius: 10, padding: 12,
                  position: 'relative', overflow: 'hidden',
                  transition: 'transform .3s, border-color .3s',
                }}>
                  <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: agent.accentColor, opacity: 0.55 }} />
                  <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                    <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'rgba(255,255,255,.045)', border: '1px solid var(--gborder)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', flexShrink: 0 }}>
                      {agent.emoji}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: '0.72rem', fontWeight: 900, letterSpacing: '0.14em' }}>{agent.name}</div>
                      <div style={{ fontSize: '0.52rem', color: 'var(--dim)', letterSpacing: '0.08em', margin: '2px 0 5px' }}>{agent.role}</div>
                      <div style={{ fontSize: '0.6rem', opacity: 0.82, lineHeight: 1.4 }}>{agent.task}</div>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 8 }}>
                        <span style={{ fontSize: '0.5rem', color: 'var(--dim)' }}>{agent.last}</span>
                        <StatusBadge status={agent.status} />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* VERTICALS */}
          <Card>
            <SecLabel>⬡ BUSINESS VERTICALS</SecLabel>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 12 }}>
              {VERTICALS.map((v, i) => (
                <div key={i} style={{
                  background: 'var(--glass)', border: '1px solid var(--gborder)',
                  borderRadius: 10, padding: 15, position: 'relative', overflow: 'hidden',
                }}>
                  <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 2, background: v.vc, opacity: 0.4 }} />
                  <div style={{ fontSize: '1.3rem', marginBottom: 7 }}>{v.icon}</div>
                  <div style={{ fontSize: '0.65rem', fontWeight: 900, letterSpacing: '0.12em', marginBottom: 6 }}>{v.name}</div>
                  <div style={{ display: 'inline-block', fontSize: '0.55rem', letterSpacing: '0.1em', padding: '2px 9px', borderRadius: 8, marginBottom: 10, background: v.statusBg, border: `1px solid ${v.statusBorder}`, color: v.statusColor }}>
                    {v.status}
                  </div>
                  {v.stats.map(([k, val], j) => (
                    <div key={j} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.6rem', marginBottom: 4 }}>
                      <span style={{ color: 'var(--dim)' }}>{k}</span>
                      <span>{val}</span>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </Card>

          {/* GOAL TRACKER */}
          <Card>
            <SecLabel>⬡ MISSION OBJECTIVE</SecLabel>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 14, flexWrap: 'wrap', gap: 10 }}>
              <div>
                <div style={{ fontSize: '0.58rem', color: 'var(--dim)', letterSpacing: '0.2em' }}>TARGET MONTHLY RECURRING REVENUE</div>
                <div style={{ fontSize: '1.5rem', fontWeight: 900, color: 'var(--amber)', textShadow: '0 0 18px rgba(255,170,0,.45)', letterSpacing: '0.04em' }}>$10,000 / MONTH</div>
                <div style={{ fontSize: '0.58rem', color: 'var(--dim)', marginTop: 3, letterSpacing: '0.1em' }}>DEADLINE · APRIL 30, 2026</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '0.58rem', color: 'var(--dim)', letterSpacing: '0.1em' }}>CURRENT</div>
                <div style={{ fontSize: '1.1rem', fontWeight: 'bold' }}>$0</div>
                <div style={{ fontSize: '0.55rem', color: 'var(--dim)', marginTop: 2 }}>REBUILDING</div>
              </div>
            </div>
            {/* Progress bar */}
            <div style={{ height: 18, background: 'rgba(255,255,255,.04)', borderRadius: 9, border: '1px solid rgba(255,255,255,.06)', overflow: 'hidden', marginBottom: 7 }}>
              <div style={{ height: '100%', width: '2%', borderRadius: 9, background: 'linear-gradient(90deg, var(--amber) 0%, #ffcc44 100%)', position: 'relative', overflow: 'hidden', transition: 'width 1.8s cubic-bezier(.4,0,.2,1)' }}>
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,.45) 50%, transparent 100%)', animation: 'shim 2.2s ease-in-out infinite' }} />
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.55rem', color: 'var(--dim)', marginBottom: 14 }}>
              {['$0','$2,500','$5,000','$7,500','$10,000'].map(l => <span key={l}>{l}</span>)}
            </div>
            {/* Days row */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 14px', background: 'rgba(255,170,0,.045)', border: '1px solid rgba(255,170,0,.14)', borderRadius: 8, marginBottom: 12 }}>
              <div>
                <div style={{ fontSize: '1.4rem', fontWeight: 900, color: 'var(--amber)' }}>{days}</div>
                <div style={{ fontSize: '0.6rem', color: 'var(--dim)', letterSpacing: '0.1em' }}>DAYS REMAINING</div>
              </div>
              <div style={{ flex: 1, height: 1, background: 'rgba(255,170,0,.15)' }} />
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '0.62rem', color: 'var(--amber)' }}>~$286 / day needed</div>
                <div style={{ fontSize: '0.55rem', color: 'var(--dim)', marginTop: 2 }}>from $0 to hit goal</div>
              </div>
            </div>
            {/* Cyph note */}
            <div style={{ padding: '10px 12px', background: 'rgba(153,102,255,.04)', border: '1px solid rgba(153,102,255,.13)', borderRadius: 8 }}>
              <div style={{ fontSize: '0.57rem', color: 'var(--purple)', letterSpacing: '0.12em', marginBottom: 4 }}>🔐 CYPH ASSESSMENT</div>
              <div style={{ fontSize: '0.62rem', opacity: 0.82, lineHeight: 1.5 }}>Tight timeline. Two warm verticals. Wolf has 32 prospects loaded. Mr. X has the content ready. B has done this before — we just move now.</div>
            </div>
          </Card>
        </div>

        {/* RIGHT — INTEL FEED */}
        <div>
          <Card style={{ display: 'flex', flexDirection: 'column', minHeight: 500 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
              <SecLabel>⬡ INTEL FEED</SecLabel>
              <div style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: '0.58rem', color: 'var(--red)', letterSpacing: '0.12em' }}>
                <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--red)', animation: 'ldot 1.1s ease-in-out infinite' }} />
                LIVE
              </div>
            </div>
            <div style={{ flex: 1, overflowY: 'auto', paddingRight: 4 }}>
              {INTEL.map((item, i) => (
                <div key={i} style={{
                  display: 'flex', gap: 8, padding: '9px 0',
                  borderBottom: '1px solid rgba(255,255,255,.04)',
                  fontSize: '0.62rem', lineHeight: 1.45,
                  opacity: intelVisible.includes(i) ? 1 : 0,
                  transform: intelVisible.includes(i) ? 'translateY(0)' : 'translateY(8px)',
                  transition: 'opacity 0.5s ease, transform 0.5s ease',
                }}>
                  <span style={{ color: 'var(--green)', flexShrink: 0, fontSize: '0.75rem' }}>✅</span>
                  <span style={{ color: 'var(--dim)', flexShrink: 0, whiteSpace: 'nowrap' }}>{item.time}</span>
                  <span style={{ opacity: 0.88 }}>{item.text}</span>
                </div>
              ))}
            </div>
            {/* Mini metrics */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 7, marginTop: 14, paddingTop: 14, borderTop: '1px solid var(--gborder)' }}>
              {[
                { val: '32', label: 'TOTAL PROSPECTS', c: 'var(--green)' },
                { val: '3',  label: 'ACTIVE VERTICALS', c: 'var(--blue)' },
                { val: '1',  label: 'SITES LIVE',       c: 'var(--purple)' },
                { val: '15', label: 'POSTS QUEUED',     c: 'var(--amber)' },
                { val: '20', label: 'GHL ACCOUNTS',     c: 'var(--pink)' },
                { val: '4',  label: 'ACTIVE AGENTS',    c: 'var(--cyan)' },
              ].map((m, i) => (
                <div key={i} style={{ padding: '8px 10px', background: 'rgba(255,255,255,.02)', border: '1px solid var(--gborder)', borderRadius: 7 }}>
                  <div style={{ fontSize: '0.9rem', fontWeight: 'bold', color: m.c }}>{m.val}</div>
                  <div style={{ fontSize: '0.52rem', color: 'var(--dim)', letterSpacing: '0.1em', marginTop: 1 }}>{m.label}</div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>

      {/* ─── TICKER ─── */}
      <div style={{ margin: '14px 0 4px', background: 'rgba(68,136,255,.04)', border: '1px solid rgba(68,136,255,.1)', borderRadius: 8, overflow: 'hidden', padding: '7px 0', whiteSpace: 'nowrap' }}>
        <span style={{ display: 'inline-block', fontSize: '0.62rem', color: 'var(--dim)', letterSpacing: '0.1em', animation: 'tick 40s linear infinite', padding: '0 40px' }}>
          🔐 CYPH ONLINE & OPERATIONAL
          <span style={{ color: 'var(--blue)', margin: '0 18px' }}>·</span>
          ⚡ NEXUS: evolvesmarter.io pushed to GitHub
          <span style={{ color: 'var(--blue)', margin: '0 18px' }}>·</span>
          🐺 WOLF: 32 prospects prepped for outreach
          <span style={{ color: 'var(--blue)', margin: '0 18px' }}>·</span>
          📣 MR. X: 15 social posts queued & ready
          <span style={{ color: 'var(--blue)', margin: '0 18px' }}>·</span>
          💰 MISSION: $10,000 MRR by April 30, 2026
          <span style={{ color: 'var(--blue)', margin: '0 18px' }}>·</span>
          🔐 Year of Bryce. We move now.
        </span>
      </div>

    </div>
  )
}
