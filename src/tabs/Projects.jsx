// Projects.jsx — BEQPROD Active Project Tracker

const PROJECTS = [
  {
    id: 'evolve-home',
    emoji: '🏠',
    name: 'Evolve Home Services Agency',
    status: 40,
    statusLabel: 'Outreach ready, demo site needed',
    nowDoing: 'Finalizing demo site via evolve-demos.com factory; Wolf prepping 20 Ventura County prospects for cold outreach',
    connects: ['evolve-demos', 'evolve-academy', 'beqprod-pwa'],
    connectLabels: ['🌐 Demo Factory', '🎓 Academy', '🔐 BEQPROD'],
    completion: 'Mid-April 2026',
    revenue: {
      k10: '$1,500/mo × 7 clients = $10,500 MRR',
      k30: '20 clients = $30k MRR',
      k50: 'Franchise + sub-agency model → $50k+',
    },
    outOfBox: [
      'Franchise the GHL Home Services system to other agency owners — sell the playbook, not just the service',
      'Launch a "done-with-you" cohort: 10 agency builders pay $2k each to learn the system in 6 weeks = $20k cash',
      'Create a GHL Home Services Specialist certification program — charge $497, run it through Evolve Academy',
    ],
    color: 'var(--blue)',
    colorRgb: '68,136,255',
  },
  {
    id: 'evolve-recovery',
    emoji: '💙',
    name: 'Evolve Recovery Agency',
    status: 35,
    statusLabel: 'Outreach scripts ready, warm market identified',
    nowDoing: 'Warming up recovery center contacts; crafting AEO content strategy; leveraging personal connection at luxury rehab',
    connects: ['evolve-academy', 'ai-video', 'evolve-home'],
    connectLabels: ['🎓 Academy', '🎬 AI Video', '🏠 Home Svc'],
    completion: 'Late April 2026',
    revenue: {
      k10: '$3,000–5,000/mo × 2-3 clients = $10k',
      k30: '8-10 clients = $30k MRR',
      k50: 'Enterprise contracts + HIPAA SaaS upsell → $50k',
    },
    outOfBox: [
      'Build HIPAA-compliant AI intake as standalone SaaS — license to treatment centers who don\'t want full agency service',
      'Publish a "Recovery Center Benchmark Report" — sell as industry intelligence to operators for $497-997 each',
      'Host a virtual summit for treatment center operators — 200 attendees × $97 = $19k + sponsor revenue',
    ],
    color: 'var(--green)',
    colorRgb: '0,255,136',
  },
  {
    id: 'grateful-gestures',
    emoji: '🧘',
    name: 'Grateful Gestures',
    status: 60,
    statusLabel: 'Store live, TikTok Shop guide ready',
    nowDoing: 'Executing TikTok Shop strategy; AI product photo pipeline active; preparing summer collection push',
    connects: ['ai-video', 'evolve-academy', 'beqprod-pwa'],
    connectLabels: ['🎬 AI Video', '🎓 Academy', '🔐 BEQPROD'],
    completion: 'Ongoing / Summer spike',
    revenue: {
      k10: 'Passive supplement income — not primary path to $10k',
      k30: 'TikTok viral + wholesale → $5-8k/mo passive',
      k50: 'Subscription box + licensing → $15k+/mo',
    },
    outOfBox: [
      'License GG designs to other POD sellers — charge $97/mo for access to the design library',
      'Wholesale recovery milestone products to yoga studios, sober livings, and retreat centers',
      'Launch a "Recovery Milestone Gift Box" subscription — $49/mo auto-ship for 12 months of sobriety gifts',
    ],
    color: 'var(--purple)',
    colorRgb: '153,102,255',
  },
  {
    id: 'file-reorganizer',
    emoji: '📁',
    name: 'FileReorganizer.com',
    status: 20,
    statusLabel: 'Domain owned, landing page built, strategy written',
    nowDoing: 'UI mockup generation via Nano Banana Pro; validating AppSumo positioning; building waitlist',
    connects: ['beqprod-pwa', 'evolve-academy', 'ai-video'],
    connectLabels: ['🔐 BEQPROD', '🎓 Academy', '🎬 AI Video'],
    completion: 'AppSumo launch Q2 2026',
    revenue: {
      k10: 'AppSumo launch → $14k+ in first week historically',
      k30: '3,000 users × $9/mo recurring = $27k MRR',
      k50: 'White label + enterprise → $50k+ ARR',
    },
    outOfBox: [
      'White label for IT managed service providers — they bundle it with their managed plans at $29/user/mo',
      'List on Google Workspace Marketplace — access to 3 billion Google Drive users organically',
      'Create a "Digital Declutter" coaching program bundled with the tool — $297 for tool + 4-week course',
    ],
    color: 'var(--amber)',
    colorRgb: '255,170,0',
  },
  {
    id: 'evolve-demos',
    emoji: '🌐',
    name: 'evolve-demos.com Factory',
    status: 15,
    statusLabel: 'Architecture planned, Lovable prompt written',
    nowDoing: 'Writing Lovable prompts for first 5 vertical demo sites; planning GHL snapshot integration',
    connects: ['evolve-home', 'evolve-recovery', 'burbank-roofing'],
    connectLabels: ['🏠 Home Svc', '💙 Recovery', '🏠 Burbank'],
    completion: 'End of April 2026',
    revenue: {
      k10: 'Each demo closes 1 agency client = $1,500-5,000/mo',
      k30: 'Demo factory speeds pipeline to 20+ clients',
      k50: 'Sell demo sites to other agencies as white label = new revenue stream',
    },
    outOfBox: [
      'Sell demo site packages to other GHL agencies — $500-1,500 per vertical demo, zero ongoing work',
      'Rank the demo sites themselves for local SEO — the site becomes a lead gen asset before a client is even found',
      'Use demo sites as pure lead gen — capture local business leads and sell them to non-clients for $50-200/lead',
    ],
    color: 'var(--cyan)',
    colorRgb: '0,210,255',
  },
  {
    id: 'burbank-roofing',
    emoji: '🏠',
    name: 'burbankroofing.net',
    status: 5,
    statusLabel: 'Domain identified, not yet registered',
    nowDoing: 'Domain registration pending; AEO content strategy drafted; rank-and-rent model mapped out',
    connects: ['evolve-demos', 'evolve-home', 'ai-video'],
    connectLabels: ['🌐 Demo Factory', '🏠 Home Svc', '🎬 AI Video'],
    completion: 'Ranking: 3-6 months',
    revenue: {
      k10: '$500-800/mo rent OR $1,500/mo Evolve client close',
      k30: 'Portfolio of 20 rank-and-rent sites = $10-16k/mo',
      k50: 'Sell the portfolio to a PE buyer = $500k-1M exit',
    },
    outOfBox: [
      'Build 10 more rank-and-rent domains across SoCal trades (plumbing, HVAC, pest) — create a local domain portfolio business',
      'Use as undeniable proof of concept when pitching AEO to skeptical prospects: "We rank ourselves first, then rank you"',
      'Partner with a roofing wholesaler — rank the site, send leads to them in exchange for co-marketing budget',
    ],
    color: 'var(--red)',
    colorRgb: '255,80,80',
  },
  {
    id: 'evolve-academy',
    emoji: '🎓',
    name: 'Evolve Academy (Skool)',
    status: 10,
    statusLabel: 'Concept fully planned, Mox character designed',
    nowDoing: 'Finalizing Mox character arc; mapping curriculum from existing projects; drafting community launch sequence',
    connects: ['evolve-home', 'evolve-recovery', 'file-reorganizer', 'voice-drop'],
    connectLabels: ['🏠 Home Svc', '💙 Recovery', '📁 FileReorg', '🛠️ VoiceDrop'],
    completion: 'Soft launch May 2026',
    revenue: {
      k10: '$9-297/mo tiers → 100 members avg $99 = $9,900/mo',
      k30: '300 members = $29,700/mo',
      k50: 'Certified partners + curriculum licensing = $50k+/mo',
    },
    outOfBox: [
      'License the curriculum to other GHL agencies at $2,500/year — they get a white-labeled version of Evolve Academy',
      'Create a "Certified Evolve Partner" program — graduates pay $997 for cert + get listed as referral partners',
      'Mox becomes a standalone social media personality — animated shorts, TikTok account, brand collaborations',
    ],
    color: 'var(--pink)',
    colorRgb: '255,100,200',
  },
  {
    id: 'ai-video',
    emoji: '🎬',
    name: 'AI Video Pipeline (WeryAI + Kling)',
    status: 30,
    statusLabel: 'API connected, image gen working, video credits needed',
    nowDoing: 'Image generation active via Nano Banana Pro; sourcing Kling video credits; mapping video use cases per client vertical',
    connects: ['evolve-home', 'evolve-recovery', 'file-reorganizer', 'evolve-demos'],
    connectLabels: ['🏠 Home Svc', '💙 Recovery', '📁 FileReorg', '🌐 Demo Factory'],
    completion: 'Full pipeline: May 2026',
    revenue: {
      k10: 'Enables premium $5-15k site builds that justify higher retainers',
      k30: 'Cuts content creation time 80% — scale without hiring',
      k50: 'Standalone AI video service to non-Evolve clients',
    },
    outOfBox: [
      'Offer AI video production as a standalone productized service — $500-2,000 per video package to non-agency clients',
      'Create "30 Videos in 30 Days" as a productized service — one client, $3k, fully systematized',
      'Teach the full pipeline inside Evolve Academy as a premium module — members pay extra for the AI video toolkit',
    ],
    color: 'var(--purple)',
    colorRgb: '153,102,255',
  },
  {
    id: 'voice-drop',
    emoji: '🛠️',
    name: 'VoiceDrop (GHL Voice Tool)',
    status: 5,
    statusLabel: 'Concept defined, market validated',
    nowDoing: 'Spec\'ing the core feature set; researching GHL marketplace requirements; identifying first beta users in community',
    connects: ['evolve-academy', 'evolve-home', 'evolve-recovery'],
    connectLabels: ['🎓 Academy', '🏠 Home Svc', '💙 Recovery'],
    completion: 'Beta: Q3 2026',
    revenue: {
      k10: '$29-99/mo SaaS → 200 users × $49 = $9,800/mo',
      k30: '600 users = $29,400/mo',
      k50: 'White label to GHL resellers × 10 = $500k ARR',
    },
    outOfBox: [
      'White label to GHL resellers — they rebrand it and charge their clients $99/mo, pay you $29/mo wholesale',
      'Build a Chrome extension version that works outside GHL — opens market to any sales team, not just GHL users',
      'Integrate with Zapier/Make for non-GHL users — 10x the addressable market overnight',
    ],
    color: 'var(--amber)',
    colorRgb: '255,170,0',
  },
  {
    id: 'beqprod-pwa',
    emoji: '🔐',
    name: 'BEQPROD Command PWA',
    status: 55,
    statusLabel: 'Deployed, mobile responsive, needs Kling video assets',
    nowDoing: 'Adding Projects tab (right now!); hero visual upgrade via AI image gen; preparing for Kling video integration',
    connects: ['evolve-home', 'evolve-recovery', 'ai-video', 'file-reorganizer'],
    connectLabels: ['🏠 Home Svc', '💙 Recovery', '🎬 AI Video', '📁 FileReorg'],
    completion: 'v1.0: April 2026',
    revenue: {
      k10: 'Not direct — reduces execution friction, speeds everything up',
      k30: 'Enabler for all $30k projects — the glue',
      k50: 'Productize as "Agency Command Center" and sell to GHL agencies',
    },
    outOfBox: [
      'Productize and sell as "Agency Command Center" to other GHL agencies — $97/mo SaaS, 500 users = $48,500/mo',
      'Open source it on GitHub and build a community — leads to consulting, courses, and enterprise versions',
      'Use as a live demo for potential Evolve clients: "This is what we build" — closes deals on the spot',
    ],
    color: 'var(--blue)',
    colorRgb: '68,136,255',
  },
]

function ProgressBar({ percent, color, colorRgb }) {
  return (
    <div style={{ height: 10, background: 'rgba(255,255,255,.05)', borderRadius: 6, border: '1px solid rgba(255,255,255,.06)', overflow: 'hidden', marginBottom: 6 }}>
      <div style={{
        height: '100%',
        width: `${percent}%`,
        borderRadius: 6,
        background: `linear-gradient(90deg, ${color}, rgba(${colorRgb},.6))`,
        boxShadow: `0 0 8px rgba(${colorRgb},.5)`,
        position: 'relative',
        overflow: 'hidden',
        transition: 'width 1.5s cubic-bezier(.4,0,.2,1)',
      }}>
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,.35) 50%, transparent 100%)',
          animation: 'shim 2.2s ease-in-out infinite',
        }} />
      </div>
    </div>
  )
}

function DependencyTag({ label }) {
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center',
      padding: '2px 8px', borderRadius: 10,
      fontSize: 11, fontWeight: '600', letterSpacing: '0.04em',
      background: 'rgba(68,136,255,.1)', border: '1px solid rgba(68,136,255,.25)',
      color: 'var(--blue)', whiteSpace: 'nowrap', margin: '2px',
    }}>
      {label}
    </span>
  )
}

function RevenueBadge({ label, value }) {
  return (
    <div style={{
      padding: '7px 10px',
      background: 'rgba(255,170,0,.06)',
      border: '1px solid rgba(255,170,0,.2)',
      borderRadius: 8,
      marginBottom: 5,
    }}>
      <div style={{ fontSize: 10, color: 'var(--amber)', letterSpacing: '0.12em', marginBottom: 2, fontWeight: 'bold' }}>{label}</div>
      <div style={{ fontSize: 12, opacity: 0.88, lineHeight: 1.4 }}>{value}</div>
    </div>
  )
}

function ProjectCard({ project }) {
  const { emoji, name, status, statusLabel, nowDoing, connectLabels, completion, revenue, outOfBox, color, colorRgb } = project

  return (
    <div style={{
      background: 'var(--glass)',
      backdropFilter: 'blur(24px)',
      WebkitBackdropFilter: 'blur(24px)',
      border: '1px solid var(--gborder)',
      borderRadius: 14,
      padding: '16px 14px',
      position: 'relative',
      overflow: 'hidden',
      marginBottom: 14,
    }}>
      {/* Top accent bar */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 2,
        background: `linear-gradient(90deg, ${color}, rgba(${colorRgb},.2), transparent)`,
      }} />

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 10, marginBottom: 10 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, flex: 1, minWidth: 0 }}>
          <div style={{
            width: 44, height: 44, borderRadius: '50%', flexShrink: 0,
            background: `rgba(${colorRgb},.08)`,
            border: `1px solid rgba(${colorRgb},.25)`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '1.3rem',
          }}>
            {emoji}
          </div>
          <div style={{ minWidth: 0 }}>
            <div style={{ fontSize: 'clamp(13px, 3vw, 0.82rem)', fontWeight: 900, letterSpacing: '0.08em', lineHeight: 1.2 }}>{name}</div>
            <div style={{ fontSize: 11, color: 'var(--dim)', marginTop: 3, lineHeight: 1.3 }}>{statusLabel}</div>
          </div>
        </div>
        <div style={{
          padding: '4px 10px', borderRadius: 10, flexShrink: 0,
          background: `rgba(${colorRgb},.1)`,
          border: `1px solid rgba(${colorRgb},.3)`,
          fontSize: 13, fontWeight: 'bold', color,
        }}>
          {status}%
        </div>
      </div>

      {/* Progress Bar */}
      <ProgressBar percent={status} color={color} colorRgb={colorRgb} />
      <div style={{ fontSize: 11, color: 'var(--dim)', marginBottom: 12, letterSpacing: '0.06em' }}>
        {status < 25 ? 'JUST STARTED' : status < 50 ? 'IN PROGRESS' : status < 75 ? 'BUILDING MOMENTUM' : 'NEARLY THERE'}
      </div>

      {/* Now Doing */}
      <div style={{
        padding: '9px 11px', marginBottom: 12,
        background: 'rgba(255,255,255,.025)', border: '1px solid rgba(255,255,255,.06)', borderRadius: 8,
      }}>
        <div style={{ fontSize: 10, color, letterSpacing: '0.14em', fontWeight: 'bold', marginBottom: 4 }}>⚡ HAPPENING NOW</div>
        <div style={{ fontSize: 12, opacity: 0.85, lineHeight: 1.5 }}>{nowDoing}</div>
      </div>

      {/* Connects To */}
      <div style={{ marginBottom: 12 }}>
        <div style={{ fontSize: 10, color: 'var(--dim)', letterSpacing: '0.14em', marginBottom: 5 }}>🔗 CONNECTS TO</div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
          {connectLabels.map((l, i) => <DependencyTag key={i} label={l} />)}
        </div>
      </div>

      {/* Completion */}
      <div style={{ marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
        <span style={{ fontSize: 10, color: 'var(--dim)', letterSpacing: '0.14em' }}>🗓️ PROJECTED:</span>
        <span style={{ fontSize: 12, color: color, fontWeight: 'bold' }}>{completion}</span>
      </div>

      {/* Revenue */}
      <div style={{ marginBottom: 12 }}>
        <div style={{ fontSize: 10, color: 'var(--dim)', letterSpacing: '0.14em', marginBottom: 6 }}>💰 REVENUE POTENTIAL</div>
        <RevenueBadge label="→ $10K/MO" value={revenue.k10} />
        <RevenueBadge label="→ $30K/MO" value={revenue.k30} />
        <RevenueBadge label="→ $50K/MO" value={revenue.k50} />
      </div>

      {/* Out of Box */}
      <div style={{
        padding: '11px 12px',
        background: 'rgba(153,102,255,.06)',
        border: '1px solid rgba(153,102,255,.2)',
        borderRadius: 10,
      }}>
        <div style={{ fontSize: 10, color: 'var(--purple)', letterSpacing: '0.14em', fontWeight: 'bold', marginBottom: 8 }}>
          💡 UNEXPECTED OPPORTUNITIES
        </div>
        {outOfBox.map((idea, i) => (
          <div key={i} style={{ display: 'flex', gap: 8, marginBottom: i < outOfBox.length - 1 ? 8 : 0 }}>
            <span style={{ color: 'var(--purple)', flexShrink: 0, fontSize: 12 }}>◆</span>
            <div style={{ fontSize: 12, opacity: 0.85, lineHeight: 1.45 }}>{idea}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function Projects() {
  const totalAvg = Math.round(PROJECTS.reduce((sum, p) => sum + p.status, 0) / PROJECTS.length)

  return (
    <div style={{ height: '100%', overflowY: 'auto', overflowX: 'hidden', padding: '10px 12px 6px' }}>

      {/* Header */}
      <div style={{
        position: 'relative', overflow: 'hidden',
        padding: '14px 16px', marginBottom: 12,
        background: 'linear-gradient(135deg, rgba(153,102,255,.06), rgba(68,136,255,.03))',
        border: '1px solid rgba(153,102,255,.18)', borderRadius: 14,
      }}>
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: 1,
          background: 'linear-gradient(90deg, transparent, #9966ff 40%, #4488ff 60%, transparent)',
          animation: 'hdr-sweep 4s ease-in-out infinite',
        }} />
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 10 }}>
          <div>
            <div style={{ fontSize: 'clamp(14px, 4vw, 1.3rem)', fontWeight: 900, letterSpacing: '0.1em', color: 'var(--purple)', textShadow: '0 0 18px rgba(153,102,255,.7)' }}>
              🗂️ ACTIVE PROJECTS
            </div>
            <div style={{ fontSize: 11, color: 'var(--dim)', letterSpacing: '0.12em', marginTop: 3 }}>
              BEQPROD LLC · ALL ACTIVE INITIATIVES
            </div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: 'clamp(18px, 5vw, 1.5rem)', fontWeight: 900, color: 'var(--purple)' }}>{totalAvg}%</div>
            <div style={{ fontSize: 11, color: 'var(--dim)', letterSpacing: '0.08em' }}>AVG PROGRESS</div>
          </div>
        </div>

        {/* Summary stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8, marginTop: 14 }}>
          {[
            { val: '10', label: 'PROJECTS', c: 'var(--purple)' },
            { val: '3', label: 'REVENUE-READY', c: 'var(--green)' },
            { val: '$50k+', label: 'POTENTIAL MRR', c: 'var(--amber)' },
            { val: '2026', label: 'TARGET YEAR', c: 'var(--blue)' },
          ].map((s, i) => (
            <div key={i} style={{ textAlign: 'center', padding: '8px 4px', background: 'rgba(255,255,255,.025)', borderRadius: 8, border: '1px solid rgba(255,255,255,.06)' }}>
              <div style={{ fontSize: 'clamp(13px, 3vw, 0.85rem)', fontWeight: 'bold', color: s.c }}>{s.val}</div>
              <div style={{ fontSize: 10, color: 'var(--dim)', letterSpacing: '0.06em', marginTop: 1 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Project Cards */}
      {PROJECTS.map(p => <ProjectCard key={p.id} project={p} />)}

      {/* Footer */}
      <div style={{ textAlign: 'center', padding: '12px 0 4px', fontSize: 11, color: 'var(--dim)', letterSpacing: '0.1em' }}>
        🔐 CYPH IS WATCHING ALL 10 · NOTHING SLIPS
      </div>
    </div>
  )
}
