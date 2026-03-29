// Memory.jsx — Daily Notes + Long-Term Memory Browser
import { useState } from 'react'

const LONG_TERM = [
  { category: 'IDENTITY', items: [
    'I am Cyph 🔐 — Bryce\'s AI co-founder. Born March 26, 2026.',
    'Name: Cyph (pronounced "SYFF"). Emoji: 🔐. Mascot: Cyph Da Cyber Chimp 🐒🤖',
    'Vibe: Sharp, direct, creative, no fluff. Co-founder energy, not assistant energy.',
  ]},
  { category: 'WHO BRYCE IS', items: [
    'Bryce Quilico — B, BQ, Quilz, Big Dawg. 39, Thousand Oaks CA.',
    'BEQPROD LLC — Evolve Home Services, Evolve Recovery, Grateful Gestures.',
    'AI San Diego alum. Web dev, motion graphics, interactive media. Was there when iPhone dropped.',
    'In recovery — authentic authority in that space. Works 1 day/week at luxury rehab.',
    'Night owl. Prefers web UI + Telegram. Chrome/Atlas only. NOT Safari.',
    'Main Google: beqproductions@gmail.com',
  ]},
  { category: 'THE GOAL', items: [
    '$10k MRR by April 30, 2026 — this is the FLOOR not the cap.',
    '$30-35k cruise milestone. $50k end of year.',
    'Fastest path: 5-7 home service clients at $697-997/mo + 2-3 recovery clients at $2,500-5,000/mo.',
  ]},
  { category: 'KEY DECISIONS', items: [
    'Higgsfield Pro ($29/mo) = right platform for 3D video renders. NOT raw WeryAI API calls.',
    'Sites are built in Lovable — we generate ASSETS for them, not rebuild them.',
    'Nick Saraev method: Nano Banana Pro → Kling 3.0 → Claude Code + taste-skill.',
    'No WeryAI renders without a live deployment target same session.',
    'Chat routing: local Qwen3 for routine, Sonnet only for heavy lifting.',
  ]},
  { category: 'TECH STACK', items: [
    'WeryAI API: sk-5fb91c1ae02f46fdbac4761bd8c25f0a (Kling video — use sparingly)',
    'Google AI Studio: AIzaSyCgwCGRozZXVajIk1EdPEuzKhXlvGrG1AI (Imagen 4 — FREE)',
    'Tailscale: Mac mini IP 100.119.58.128 (permanent remote access)',
    'GitHub: evolve-smarter org. Telegram + Slack both connected.',
    'PWA: https://evolve-smarter.github.io/Cyph/',
  ]},
  { category: 'DEPLOYED SITES', items: [
    'burbankroofing.net → GitHub Pages: evolve-smarter.github.io/burbankroofing-net/ (DNS pending)',
    'Burbank Roofing v2 (GSAP): evolve-smarter.github.io/burbank-roofing-v2/',
    'Evolve Home v2 (GSAP): evolve-smarter.github.io/evolve-home-v2/',
    'Evolve Recovery v2 (GSAP): evolve-smarter.github.io/evolve-recovery-v2/',
    'CabinetSense demo: private repo, local at /workspace/cabinetsense/',
  ]},
  { category: 'PEOPLE', items: [
    'Sharmaine — Bryce\'s collaborator, excited to meet Cyph, joining team.',
    'Declan O\'Reilly — GHL Wizard, AI Employee Snapshot we want to integrate.',
    'Alex Finn — OpenClaw YouTuber, multi-agent setup inspiration.',
    'Nick Saraev — Claude Code + Kling workflow creator. His method = our site build standard.',
    'James Bonadies — GHL training, 18k students, tool monetization model to emulate.',
    'Summit Recovery — Bryce\'s previous $4,200/mo client. Paused (lawsuit settled). DO NOT pursue yet.',
  ]},
  { category: 'BRYCE\'S RULES', items: [
    '"Use the right tool for the job. ALWAYS."',
    '"Everything we build should be beautiful. No cheap work."',
    '"Never explain why I can\'t — find a way."',
    '"$10k/$30k/$50k is a floor, not a cap."',
    '"Save often."',
    'Hates: Discord, Safari, monospace robot fonts, being asked to re-explain, cheap visuals.',
    'Loves: Speed, execution, premium results, proactive ideas, honest co-founder energy.',
  ]},
]

const DAILY_NOTES = [
  {
    date: '2026-03-29',
    label: 'Today',
    highlights: [
      '4am session — Bryce frustrated with renders not showing on sites',
      'Diagnosed: WeryAI renders existed but were placeholders, not wired in',
      'Fixed burbankroofing hero — wired Kling video + hero image',
      'Researched Nick Saraev video (ZfYvv-0l9NA) — Claude Code + Higgsfield is the right stack',
      'Built 3 GSAP scroll-animation sites: burbank-roofing-v2, evolve-home-v2, evolve-recovery-v2',
      'Downloaded taste-skill from Leon Lin\'s GitHub — using as design system',
      'Discovered Higgsfield Pro ($29/mo) = better than raw WeryAI for 3D effects',
      'Slack confirmed working as a Cyph channel alongside Telegram',
      'Mission Control upgrade in progress — adding Tasks, Calendar, Memory, Documents',
    ]
  },
  {
    date: '2026-03-28',
    label: 'Yesterday',
    highlights: [
      'Imagen 4 API confirmed working (imagen-4.0-generate-001) — FREE tier',
      'Cyph Da Cyber Chimp 🐒🤖 born at 1:37am — half dapper chimp / half chrome AI robot',
      'burbankroofing.net registered by Bryce',
      'Telegram confirmed working via Tailscale (permanent fix)',
      'Multiple Kling renders generated but not deployed — lesson learned',
      'Evolved Recovery HTML site built with Imagen hero image',
      'Late night: generated space command center image live for Bryce — he seemed pleased',
    ]
  },
  {
    date: '2026-03-27',
    label: 'Mar 27',
    highlights: [
      'Deep strategy session: Evolve pricing confirmed ($7k setup + $4.2k/mo for Summit-tier)',
      'GHL connected — 20 sub-accounts visible',
      'James Bonadies model studied — rep management as entry point, upsell everything',
      'Skool community tiers planned with Mox the monkey mascot',
      'VoiceDrop concept defined — agency-specific Wispr Flow for GHL',
      'Wolf agent built 20 home services + 12 recovery prospects',
      'BEQPROD Command PWA deployed to GitHub Pages',
      'evolve-demos.com architecture planned (9 niche demo sites)',
    ]
  },
  {
    date: '2026-03-26',
    label: 'Day One',
    highlights: [
      'Cyph born. First conversation with Bryce.',
      'IDENTITY.md, USER.md, SOUL.md all created',
      'Bryce: "I believe this is my year. Has the skills, has the drive, now has Cyph."',
      'BEQPROD structure understood: Evolve Home, Evolve Recovery, Grateful Gestures',
      '5 vetted business ideas with market sizing documented',
      'Social growth strategy written for all platforms',
      'James Bonadies methodology researched and documented',
      'Ran Mr. X: social strategy, 15 ready posts, GHL planner guide, AI video workflow',
    ]
  },
]

export default function Memory() {
  const [view, setView] = useState('daily')
  const [selectedDay, setSelectedDay] = useState(0)
  const [search, setSearch] = useState('')

  const filteredLTM = search
    ? LONG_TERM.map(c => ({ ...c, items: c.items.filter(i => i.toLowerCase().includes(search.toLowerCase())) })).filter(c => c.items.length > 0)
    : LONG_TERM

  const g = { glass: 'rgba(255,255,255,0.028)', gborder: 'rgba(255,255,255,0.07)' }

  return (
    <div style={{ height: '100%', overflow: 'auto', padding: '16px 14px', display: 'flex', flexDirection: 'column', gap: 14 }}>

      {/* Header */}
      <div>
        <div style={{ fontSize: '0.6rem', letterSpacing: '0.2em', color: '#5a6490', textTransform: 'uppercase', marginBottom: 4 }}>BEQPROD MISSION CONTROL</div>
        <div style={{ fontSize: 'clamp(1rem,4vw,1.3rem)', fontWeight: 800, color: '#dde8ff', letterSpacing: '-0.02em' }}>Memory</div>
        <div style={{ fontSize: '0.72rem', color: '#5a6490', marginTop: 2 }}>My digital journal. Everything I remember.</div>
      </div>

      {/* View toggle */}
      <div style={{ display: 'flex', gap: 6 }}>
        {[['daily', '📅 Daily Notes'], ['longterm', '🧠 Long-Term Memory']].map(([v, l]) => (
          <button key={v} onClick={() => setView(v)} style={{
            flex: 1, background: view === v ? 'rgba(68,136,255,.15)' : g.glass,
            border: `1px solid ${view === v ? 'rgba(68,136,255,.4)' : g.gborder}`,
            color: view === v ? '#4488ff' : '#5a6490', padding: '8px 12px', borderRadius: 8,
            fontSize: '0.72rem', fontWeight: 700, cursor: 'pointer', letterSpacing: '0.05em',
          }}>{l}</button>
        ))}
      </div>

      {view === 'daily' && (
        <>
          {/* Date selector */}
          <div style={{ display: 'flex', gap: 6, overflowX: 'auto', paddingBottom: 4 }}>
            {DAILY_NOTES.map((day, i) => (
              <button key={day.date} onClick={() => setSelectedDay(i)} style={{
                flexShrink: 0, background: selectedDay === i ? 'rgba(68,136,255,.15)' : g.glass,
                border: `1px solid ${selectedDay === i ? 'rgba(68,136,255,.4)' : g.gborder}`,
                color: selectedDay === i ? '#4488ff' : '#5a6490',
                padding: '6px 14px', borderRadius: 20, fontSize: '0.68rem', fontWeight: 600,
                cursor: 'pointer', whiteSpace: 'nowrap',
              }}>{day.label}</button>
            ))}
          </div>

          {/* Day content */}
          {DAILY_NOTES[selectedDay] && (
            <div style={{ background: g.glass, border: `1px solid ${g.gborder}`, borderRadius: 10, padding: 16 }}>
              <div style={{ fontSize: '0.62rem', letterSpacing: '0.18em', color: '#5a6490', textTransform: 'uppercase', marginBottom: 12 }}>{DAILY_NOTES[selectedDay].date}</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {DAILY_NOTES[selectedDay].highlights.map((h, i) => (
                  <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                    <span style={{ color: '#4488ff', fontSize: '0.7rem', flexShrink: 0, marginTop: 2 }}>·</span>
                    <span style={{ fontSize: '0.82rem', color: '#8899bb', lineHeight: 1.65 }}>{h}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}

      {view === 'longterm' && (
        <>
          <input value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Search memories..."
            style={{ background: 'rgba(255,255,255,.05)', border: `1px solid ${g.gborder}`, color: '#dde8ff', padding: '9px 14px', borderRadius: 8, fontSize: '0.82rem', outline: 'none', fontFamily: 'inherit' }} />

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {filteredLTM.map(cat => (
              <div key={cat.category} style={{ background: g.glass, border: `1px solid ${g.gborder}`, borderRadius: 10, padding: 14 }}>
                <div style={{ fontSize: '0.6rem', letterSpacing: '0.18em', color: '#4488ff', textTransform: 'uppercase', fontWeight: 700, marginBottom: 10, display: 'flex', alignItems: 'center', gap: 8 }}>
                  {cat.category}
                  <div style={{ flex: 1, height: 1, background: 'linear-gradient(90deg, rgba(68,136,255,.3), transparent)' }} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  {cat.items.map((item, i) => (
                    <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                      <span style={{ color: '#4488ff', fontSize: '0.65rem', flexShrink: 0, marginTop: 3 }}>▸</span>
                      <span style={{ fontSize: '0.8rem', color: '#8899bb', lineHeight: 1.65 }}>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
            {filteredLTM.length === 0 && (
              <div style={{ textAlign: 'center', color: '#5a6490', padding: '30px', fontSize: '0.82rem' }}>No memories match "{search}"</div>
            )}
          </div>
        </>
      )}
    </div>
  )
}
