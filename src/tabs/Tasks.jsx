// Tasks.jsx — Live Task Board
import { useState } from 'react'

const INITIAL_TASKS = [
  { id: 1, title: 'Sign up for Higgsfield Pro ($29/mo)', agent: 'Bryce', priority: 'high', status: 'todo', project: 'Sites', notes: 'Unlocks Kling 3.0 + Nano Banana Pro for 3D expanding video renders' },
  { id: 2, title: 'Point burbankroofing.net DNS to GitHub Pages', agent: 'Bryce', priority: 'high', status: 'todo', project: 'Burbank Roofing', notes: 'A records: 185.199.108-111.153, CNAME www → evolve-smarter.github.io' },
  { id: 3, title: 'Monday outreach — 10 voicemail drops via Slybroadcast', agent: 'Bryce', priority: 'high', status: 'todo', project: 'Evolve Home', notes: 'Scripts in /outreach/monday-launch-kit.md. Drop at 8am.' },
  { id: 4, title: 'Load 5-email GHL campaign for home services', agent: 'Bryce', priority: 'high', status: 'todo', project: 'Evolve Home', notes: 'Campaign written in /outreach/email-campaign-home-services.md' },
  { id: 5, title: 'Generate Higgsfield 3D renders for all 3 sites', agent: 'Cyph', priority: 'high', status: 'blocked', project: 'Sites', notes: 'Blocked on Higgsfield signup. See HIGGSFIELD-WORKFLOW.md for prompts.' },
  { id: 6, title: 'Deploy evolve-recovery v2 with Imagen hero', agent: 'Cyph', priority: 'medium', status: 'done', project: 'Sites', notes: 'Live: evolve-smarter.github.io/evolve-recovery-v2/' },
  { id: 7, title: 'Build Burbank Roofing v2 GSAP scroll site', agent: 'Cyph', priority: 'medium', status: 'done', project: 'Burbank Roofing', notes: 'Live: evolve-smarter.github.io/burbank-roofing-v2/' },
  { id: 8, title: 'Build Evolve Home Services v2 GSAP site', agent: 'Cyph', priority: 'medium', status: 'done', project: 'Evolve Home', notes: 'Live: evolve-smarter.github.io/evolve-home-v2/' },
  { id: 9, title: 'Upgrade Mission Control PWA to match Alex Finn', agent: 'Cyph', priority: 'medium', status: 'in-progress', project: 'BEQPROD', notes: 'Adding Tasks, Calendar, Memory, Documents tabs' },
  { id: 10, title: 'Write Issue 1 of GHL Agency Insider newsletter', agent: 'Cyph', priority: 'medium', status: 'todo', project: 'Newsletter', notes: 'Target: Beehiiv, GHL agency owners, 1st issue = foundation' },
  { id: 11, title: 'Finish CyphWhisper app UI (Wispr Flow clone)', agent: 'Cyph', priority: 'medium', status: 'todo', project: 'CyphWhisper', notes: 'App exists at /apps/cyphwhisper — needs UI polish' },
  { id: 12, title: 'WhatsApp DM follow-ups to 10 prospects', agent: 'Bryce', priority: 'medium', status: 'todo', project: 'Evolve Home', notes: 'Scripts in monday-launch-kit.md. Send same day as voicemail drop.' },
  { id: 13, title: 'Record voicemail MP3 for Slybroadcast drop', agent: 'Bryce', priority: 'high', status: 'todo', project: 'Evolve Home', notes: 'Script in monday-launch-kit.md. Keep under 30s. Natural tone.' },
]

const PRIORITY_CONFIG = {
  high:   { color: '#ff4455', bg: 'rgba(255,68,85,.1)',   border: 'rgba(255,68,85,.3)',   label: 'HIGH' },
  medium: { color: '#ffaa00', bg: 'rgba(255,170,0,.08)',  border: 'rgba(255,170,0,.25)',  label: 'MED' },
  low:    { color: '#5a6490', bg: 'rgba(90,100,144,.08)', border: 'rgba(90,100,144,.2)',  label: 'LOW' },
}

const STATUS_CONFIG = {
  todo:        { color: '#5a6490', label: 'TO DO',       icon: '○' },
  'in-progress':{ color: '#4488ff', label: 'IN PROGRESS', icon: '◎' },
  blocked:     { color: '#ff4455', label: 'BLOCKED',     icon: '⊘' },
  done:        { color: '#00ff88', label: 'DONE',        icon: '✓' },
}

export default function Tasks() {
  const [tasks, setTasks] = useState(INITIAL_TASKS)
  const [filter, setFilter] = useState('all')
  const [showAdd, setShowAdd] = useState(false)
  const [newTask, setNewTask] = useState({ title: '', agent: 'Cyph', priority: 'medium', project: '', notes: '' })
  const [expanded, setExpanded] = useState(null)

  const filtered = filter === 'all' ? tasks
    : filter === 'mine' ? tasks.filter(t => t.agent === 'Bryce')
    : filter === 'cyph' ? tasks.filter(t => t.agent === 'Cyph')
    : tasks.filter(t => t.status === filter)

  const counts = {
    todo: tasks.filter(t => t.status === 'todo').length,
    'in-progress': tasks.filter(t => t.status === 'in-progress').length,
    blocked: tasks.filter(t => t.status === 'blocked').length,
    done: tasks.filter(t => t.status === 'done').length,
  }

  function cycleStatus(id) {
    const order = ['todo', 'in-progress', 'done']
    setTasks(ts => ts.map(t => {
      if (t.id !== id) return t
      const i = order.indexOf(t.status)
      return { ...t, status: order[(i + 1) % order.length] }
    }))
  }

  function addTask() {
    if (!newTask.title.trim()) return
    setTasks(ts => [...ts, { ...newTask, id: Date.now(), status: 'todo' }])
    setNewTask({ title: '', agent: 'Cyph', priority: 'medium', project: '', notes: '' })
    setShowAdd(false)
  }

  const g = { glass: 'rgba(255,255,255,0.028)', gborder: 'rgba(255,255,255,0.07)' }

  return (
    <div style={{ height: '100%', overflow: 'auto', padding: '16px 14px', display: 'flex', flexDirection: 'column', gap: 14 }}>

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8 }}>
        <div>
          <div style={{ fontSize: '0.6rem', letterSpacing: '0.2em', color: '#5a6490', textTransform: 'uppercase', marginBottom: 4 }}>BEQPROD MISSION CONTROL</div>
          <div style={{ fontSize: 'clamp(1rem,4vw,1.3rem)', fontWeight: 800, color: '#dde8ff', letterSpacing: '-0.02em' }}>Task Board</div>
        </div>
        <button onClick={() => setShowAdd(s => !s)} style={{
          background: 'rgba(68,136,255,.15)', border: '1px solid rgba(68,136,255,.3)',
          color: '#4488ff', padding: '7px 16px', borderRadius: 8, fontSize: '0.72rem',
          fontWeight: 700, cursor: 'pointer', letterSpacing: '0.06em',
        }}>+ NEW TASK</button>
      </div>

      {/* Status counts */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 8 }}>
        {Object.entries(counts).map(([st, count]) => (
          <button key={st} onClick={() => setFilter(f => f === st ? 'all' : st)}
            style={{
              background: filter === st ? `rgba(${st === 'done' ? '0,255,136' : st === 'blocked' ? '255,68,85' : st === 'in-progress' ? '68,136,255' : '90,100,144'},.12)` : g.glass,
              border: `1px solid ${filter === st ? STATUS_CONFIG[st].color : g.gborder}`,
              borderRadius: 8, padding: '10px 6px', cursor: 'pointer', textAlign: 'center',
            }}>
            <div style={{ fontSize: 'clamp(1.1rem,4vw,1.5rem)', fontWeight: 900, color: STATUS_CONFIG[st].color }}>{count}</div>
            <div style={{ fontSize: '0.58rem', letterSpacing: '0.12em', color: '#5a6490', marginTop: 2 }}>{STATUS_CONFIG[st].label}</div>
          </button>
        ))}
      </div>

      {/* Filter pills */}
      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
        {['all','mine','cyph'].map(f => (
          <button key={f} onClick={() => setFilter(f)} style={{
            background: filter === f ? 'rgba(68,136,255,.15)' : g.glass,
            border: `1px solid ${filter === f ? 'rgba(68,136,255,.4)' : g.gborder}`,
            color: filter === f ? '#4488ff' : '#5a6490',
            padding: '4px 12px', borderRadius: 20, fontSize: '0.66rem',
            fontWeight: 600, cursor: 'pointer', letterSpacing: '0.08em', textTransform: 'uppercase',
          }}>{f === 'all' ? 'All Tasks' : f === 'mine' ? "Bryce's" : "Cyph's"}</button>
        ))}
      </div>

      {/* Add task form */}
      {showAdd && (
        <div style={{ background: g.glass, border: `1px solid rgba(68,136,255,.25)`, borderRadius: 10, padding: 14, display: 'flex', flexDirection: 'column', gap: 8 }}>
          <input value={newTask.title} onChange={e => setNewTask(n => ({ ...n, title: e.target.value }))}
            placeholder="Task title..." style={{ background: 'rgba(255,255,255,.05)', border: '1px solid rgba(255,255,255,.1)', color: '#dde8ff', padding: '8px 12px', borderRadius: 6, fontSize: '0.85rem', outline: 'none', fontFamily: 'inherit' }} />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8 }}>
            <select value={newTask.agent} onChange={e => setNewTask(n => ({ ...n, agent: e.target.value }))}
              style={{ background: '#0d0d20', border: '1px solid rgba(255,255,255,.1)', color: '#dde8ff', padding: '7px 10px', borderRadius: 6, fontSize: '0.78rem', outline: 'none' }}>
              <option>Cyph</option><option>Bryce</option><option>Both</option>
            </select>
            <select value={newTask.priority} onChange={e => setNewTask(n => ({ ...n, priority: e.target.value }))}
              style={{ background: '#0d0d20', border: '1px solid rgba(255,255,255,.1)', color: '#dde8ff', padding: '7px 10px', borderRadius: 6, fontSize: '0.78rem', outline: 'none' }}>
              <option value="high">High</option><option value="medium">Medium</option><option value="low">Low</option>
            </select>
            <input value={newTask.project} onChange={e => setNewTask(n => ({ ...n, project: e.target.value }))}
              placeholder="Project" style={{ background: 'rgba(255,255,255,.05)', border: '1px solid rgba(255,255,255,.1)', color: '#dde8ff', padding: '7px 10px', borderRadius: 6, fontSize: '0.78rem', outline: 'none', fontFamily: 'inherit' }} />
          </div>
          <textarea value={newTask.notes} onChange={e => setNewTask(n => ({ ...n, notes: e.target.value }))}
            placeholder="Notes (optional)" rows={2} style={{ background: 'rgba(255,255,255,.05)', border: '1px solid rgba(255,255,255,.1)', color: '#dde8ff', padding: '8px 12px', borderRadius: 6, fontSize: '0.78rem', outline: 'none', fontFamily: 'inherit', resize: 'vertical' }} />
          <div style={{ display: 'flex', gap: 8 }}>
            <button onClick={addTask} style={{ flex: 1, background: '#4488ff', border: 'none', color: '#fff', padding: '9px', borderRadius: 6, fontWeight: 700, fontSize: '0.78rem', cursor: 'pointer' }}>ADD TASK</button>
            <button onClick={() => setShowAdd(false)} style={{ background: g.glass, border: `1px solid ${g.gborder}`, color: '#5a6490', padding: '9px 16px', borderRadius: 6, fontSize: '0.78rem', cursor: 'pointer' }}>CANCEL</button>
          </div>
        </div>
      )}

      {/* Task list */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        {filtered.map(task => {
          const sc = STATUS_CONFIG[task.status]
          const pc = PRIORITY_CONFIG[task.priority]
          const isExp = expanded === task.id
          return (
            <div key={task.id} style={{ background: g.glass, border: `1px solid ${task.status === 'done' ? 'rgba(0,255,136,.1)' : g.gborder}`, borderRadius: 8, overflow: 'hidden', opacity: task.status === 'done' ? 0.6 : 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px', cursor: 'pointer' }} onClick={() => setExpanded(isExp ? null : task.id)}>
                <button onClick={e => { e.stopPropagation(); cycleStatus(task.id) }}
                  style={{ background: 'none', border: `1.5px solid ${sc.color}`, color: sc.color, width: 22, height: 22, borderRadius: '50%', fontSize: '0.7rem', cursor: 'pointer', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {sc.icon}
                </button>
                <span style={{ flex: 1, fontSize: '0.82rem', fontWeight: 600, color: task.status === 'done' ? '#5a6490' : '#dde8ff', textDecoration: task.status === 'done' ? 'line-through' : 'none' }}>{task.title}</span>
                <span style={{ fontSize: '0.62rem', padding: '2px 7px', borderRadius: 10, background: pc.bg, border: `1px solid ${pc.border}`, color: pc.color, fontWeight: 700, flexShrink: 0 }}>{pc.label}</span>
                <span style={{ fontSize: '0.62rem', color: '#5a6490', flexShrink: 0 }}>{task.agent}</span>
              </div>
              {isExp && (
                <div style={{ padding: '0 12px 12px 44px', display: 'flex', flexDirection: 'column', gap: 4 }}>
                  {task.project && <span style={{ fontSize: '0.68rem', color: '#4488ff', letterSpacing: '0.1em', textTransform: 'uppercase' }}>📁 {task.project}</span>}
                  {task.notes && <span style={{ fontSize: '0.78rem', color: '#8899bb', lineHeight: 1.6 }}>{task.notes}</span>}
                  <div style={{ display: 'flex', gap: 6, marginTop: 4 }}>
                    {['todo','in-progress','blocked','done'].map(s => (
                      <button key={s} onClick={() => setTasks(ts => ts.map(t => t.id === task.id ? { ...t, status: s } : t))}
                        style={{ fontSize: '0.62rem', padding: '3px 8px', borderRadius: 4, cursor: 'pointer', background: task.status === s ? `rgba(${s === 'done' ? '0,255,136' : s === 'blocked' ? '255,68,85' : '68,136,255'},.15)` : 'rgba(255,255,255,.04)', border: `1px solid ${task.status === s ? STATUS_CONFIG[s].color : 'rgba(255,255,255,.08)'}`, color: task.status === s ? STATUS_CONFIG[s].color : '#5a6490' }}>
                        {STATUS_CONFIG[s].label}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>

      {filtered.length === 0 && (
        <div style={{ textAlign: 'center', color: '#5a6490', padding: '40px 20px', fontSize: '0.85rem' }}>No tasks in this view</div>
      )}
    </div>
  )
}
