// Documents.jsx — Searchable doc repository
import { useState } from 'react'

const DOCS = [
  { id: 1, title: 'Monday Launch Kit', category: 'Outreach', emoji: '🚀', date: '2026-03-28', path: '/outreach/monday-launch-kit.md', preview: '10 prospects, voicemail scripts, DM templates, GHL checklist. Execute Monday 8am.', tags: ['outreach', 'home services', 'voicemail', 'GHL'] },
  { id: 2, title: 'Email Campaign — Home Services', category: 'Outreach', emoji: '📧', date: '2026-03-28', path: '/outreach/email-campaign-home-services.md', preview: '5-email GHL sequence for Ventura County home service contractors. Ready to load.', tags: ['email', 'GHL', 'home services'] },
  { id: 3, title: 'Recovery Outreach Scripts', category: 'Outreach', emoji: '💙', date: '2026-03-28', path: '/outreach/recovery-outreach.md', preview: 'Scripts for luxury rehabs, IOPs, sober livings. HIPAA-aware messaging.', tags: ['recovery', 'outreach', 'scripts'] },
  { id: 4, title: 'Higgsfield Workflow', category: 'Sites', emoji: '🎬', date: '2026-03-29', path: '/HIGGSFIELD-WORKFLOW.md', preview: 'Nick Saraev method: Nano Banana Pro → Kling 3.0 → Claude Code. Prompts for all 4 sites.', tags: ['higgsfield', 'kling', 'video', '3D'] },
  { id: 5, title: 'Evolve Demos Architecture', category: 'Sites', emoji: '🌐', date: '2026-03-28', path: '/builds/evolve-demos-architecture.md', preview: '9 niche demo sites plan: roofing, plumbing, pest control, HVAC, landscaping...', tags: ['demos', 'evolve', 'sites'] },
  { id: 6, title: 'James Bonadies — Rep Management', category: 'Research', emoji: '📊', date: '2026-03-26', path: '/research/james-bonadies-rep-management.md', preview: 'Full methodology, GHL workflows, pricing tiers, sales scripts for home services AND recovery.', tags: ['reputation', 'GHL', 'strategy', 'research'] },
  { id: 7, title: 'Jasper AI Video Playbook', category: 'Research', emoji: '🎥', date: '2026-03-26', path: '/research/jasper-video-breakdown.md', preview: 'Veo 3 clip workflow, Claude scripting, faceless brand strategy, content calendar.', tags: ['video', 'AI', 'content', 'strategy'] },
  { id: 8, title: 'Social Growth Strategy 2026', category: 'Marketing', emoji: '📱', date: '2026-03-26', path: '/social/growth-strategy-2026.md', preview: 'Platform-by-platform tactics for Evolve, personal brand, Grateful Gestures. TikTok Shop.', tags: ['social', 'TikTok', 'LinkedIn', 'growth'] },
  { id: 9, title: 'Evolve Recovery Social Reels', category: 'Marketing', emoji: '🎞️', date: '2026-03-28', path: '/social/evolve-recovery-reels.md', preview: 'Reel scripts for recovery vertical. Hope, education, authority, outcomes.', tags: ['recovery', 'reels', 'social', 'content'] },
  { id: 10, title: 'Digital Products Strategy', category: 'Products', emoji: '💿', date: '2026-03-28', path: '/products/digital-products.md', preview: 'Digital product ideas: GHL snapshots, templates, Skool community tiers.', tags: ['products', 'GHL', 'Skool', 'revenue'] },
  { id: 11, title: 'VoiceDrop Business Plan', category: 'Products', emoji: '🎙️', date: '2026-03-26', path: '/research/jasper-video-breakdown.md#voicedrop', preview: 'Agency-specific Wispr Flow for GHL. Pricing, tech stack, GTM plan. $15k ARR potential.', tags: ['VoiceDrop', 'SaaS', 'GHL', 'product'] },
  { id: 12, title: 'Evolve Academy (Skool) Plan', category: 'Products', emoji: '🎓', date: '2026-03-27', path: '/ideas/', preview: 'Tiered Skool community: Free → $9 → $17 → DFY. Mox the monkey mascot. 4 tiers.', tags: ['Skool', 'academy', 'community', 'Mox'] },
  { id: 13, title: 'Home Services Prospects', category: 'Outreach', emoji: '🏠', date: '2026-03-27', path: '/outreach/home-services-outreach.md', preview: '20 Ventura County contractors: pest control, plumbing, roofing, HVAC. Ranked by priority.', tags: ['prospects', 'home services', 'Ventura County'] },
  { id: 14, title: 'Recovery Center Prospects', category: 'Outreach', emoji: '💙', date: '2026-03-27', path: '/prospects/recovery.md', preview: '12 SoCal luxury rehabs, IOPs, sober livings. High-ticket vertical.', tags: ['prospects', 'recovery', 'SoCal'] },
  { id: 15, title: 'FileReorganizer.com Landing Page', category: 'Sites', emoji: '📁', date: '2026-03-28', path: '/builds/filereorganizer-landing.html', preview: '3D spatial AI file organizer. Landing page built. AppSumo target. HUGE opportunity.', tags: ['FileReorganizer', 'SaaS', 'AppSumo'] },
  { id: 16, title: 'Grateful Gestures TikTok Shop', category: 'Marketing', emoji: '🛍️', date: '2026-03-28', path: '/products/grateful-gestures-tiktok-shop.md', preview: 'TikTok Shop setup, affiliate marketplace, 20-50 micro-influencers at 20-30% commission.', tags: ['TikTok Shop', 'Grateful Gestures', 'Etsy', 'POD'] },
]

const CATEGORIES = ['All', 'Outreach', 'Sites', 'Research', 'Marketing', 'Products']

export default function Documents() {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All')
  const [expanded, setExpanded] = useState(null)

  const filtered = DOCS.filter(d => {
    const matchCat = category === 'All' || d.category === category
    const matchSearch = !search || d.title.toLowerCase().includes(search.toLowerCase()) || d.preview.toLowerCase().includes(search.toLowerCase()) || d.tags.some(t => t.toLowerCase().includes(search.toLowerCase()))
    return matchCat && matchSearch
  })

  const g = { glass: 'rgba(255,255,255,0.028)', gborder: 'rgba(255,255,255,0.07)' }

  const CAT_COLORS = { Outreach: '#4488ff', Sites: '#00ff88', Research: '#9966ff', Marketing: '#ff4488', Products: '#ffaa00' }

  return (
    <div style={{ height: '100%', overflow: 'auto', padding: '16px 14px', display: 'flex', flexDirection: 'column', gap: 14 }}>

      {/* Header */}
      <div>
        <div style={{ fontSize: '0.6rem', letterSpacing: '0.2em', color: '#5a6490', textTransform: 'uppercase', marginBottom: 4 }}>BEQPROD MISSION CONTROL</div>
        <div style={{ fontSize: 'clamp(1rem,4vw,1.3rem)', fontWeight: 800, color: '#dde8ff', letterSpacing: '-0.02em' }}>Documents</div>
        <div style={{ fontSize: '0.72rem', color: '#5a6490', marginTop: 2 }}>{DOCS.length} files indexed — search anything</div>
      </div>

      {/* Search */}
      <input value={search} onChange={e => setSearch(e.target.value)}
        placeholder="Search docs, strategies, plans..."
        style={{ background: 'rgba(255,255,255,.05)', border: `1px solid ${g.gborder}`, color: '#dde8ff', padding: '10px 14px', borderRadius: 8, fontSize: '0.85rem', outline: 'none', fontFamily: 'inherit' }} />

      {/* Category filter */}
      <div style={{ display: 'flex', gap: 6, overflowX: 'auto', paddingBottom: 2 }}>
        {CATEGORIES.map(c => (
          <button key={c} onClick={() => setCategory(c)} style={{
            flexShrink: 0, background: category === c ? `rgba(${c === 'All' ? '68,136,255' : '68,136,255'},.15)` : g.glass,
            border: `1px solid ${category === c ? (CAT_COLORS[c] || 'rgba(68,136,255,.4)') : g.gborder}`,
            color: category === c ? (CAT_COLORS[c] || '#4488ff') : '#5a6490',
            padding: '5px 12px', borderRadius: 20, fontSize: '0.66rem', fontWeight: 600,
            cursor: 'pointer', whiteSpace: 'nowrap',
          }}>{c}</button>
        ))}
      </div>

      {/* Doc list */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        {filtered.map(doc => {
          const isExp = expanded === doc.id
          const catColor = CAT_COLORS[doc.category] || '#5a6490'
          return (
            <div key={doc.id} style={{ background: g.glass, border: `1px solid ${g.gborder}`, borderRadius: 8, overflow: 'hidden', cursor: 'pointer' }} onClick={() => setExpanded(isExp ? null : doc.id)}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px' }}>
                <span style={{ fontSize: '1.1rem', flexShrink: 0 }}>{doc.emoji}</span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: '0.84rem', fontWeight: 700, color: '#dde8ff', marginBottom: 2 }}>{doc.title}</div>
                  {!isExp && <div style={{ fontSize: '0.72rem', color: '#5a6490', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{doc.preview}</div>}
                </div>
                <span style={{ fontSize: '0.6rem', padding: '2px 8px', borderRadius: 10, background: `${catColor}18`, border: `1px solid ${catColor}44`, color: catColor, flexShrink: 0, fontWeight: 600, letterSpacing: '0.08em' }}>{doc.category}</span>
              </div>
              {isExp && (
                <div style={{ padding: '0 12px 12px 12px', display: 'flex', flexDirection: 'column', gap: 8 }}>
                  <div style={{ fontSize: '0.8rem', color: '#8899bb', lineHeight: 1.7 }}>{doc.preview}</div>
                  <div style={{ fontSize: '0.62rem', color: '#5a6490', fontFamily: 'Courier New, monospace' }}>{doc.path}</div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                    {doc.tags.map(tag => (
                      <span key={tag} onClick={e => { e.stopPropagation(); setSearch(tag) }}
                        style={{ fontSize: '0.62rem', padding: '2px 8px', borderRadius: 10, background: 'rgba(255,255,255,.04)', border: '1px solid rgba(255,255,255,.08)', color: '#5a6490', cursor: 'pointer' }}>
                        #{tag}
                      </span>
                    ))}
                  </div>
                  <div style={{ fontSize: '0.62rem', color: '#5a6490' }}>Last updated: {doc.date}</div>
                </div>
              )}
            </div>
          )
        })}
        {filtered.length === 0 && (
          <div style={{ textAlign: 'center', color: '#5a6490', padding: '40px 20px', fontSize: '0.85rem' }}>No documents match "{search}"</div>
        )}
      </div>
    </div>
  )
}
