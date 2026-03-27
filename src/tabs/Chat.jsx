import { useState, useRef, useEffect } from 'react'

// ─────────────────────────────────────────────────────────────────────────────
// OpenClaw Gateway Chat Integration
//
// TODO: The OpenClaw gateway at http://127.0.0.1:18789 requires authentication.
// The /health endpoint returns {"ok":true,"status":"live"} but chat endpoints
// return 401 Unauthorized without credentials.
//
// To complete integration:
// 1. Find your API token in: openclaw config show (or ~/.openclaw/config.yaml)
// 2. Set VITE_OPENCLAW_TOKEN in .env.local
// 3. Uncomment the real sendMessage implementation below
//
// REST API pattern (to verify with `openclaw gateway --help` or API docs):
//   POST http://127.0.0.1:18789/api/chat
//   Authorization: Bearer <token>
//   Content-Type: application/json
//   { "message": "...", "channel": "webchat" }
// ─────────────────────────────────────────────────────────────────────────────

const GATEWAY = 'http://127.0.0.1:18789'
const TOKEN = import.meta.env.VITE_OPENCLAW_TOKEN || ''

async function sendToOpenClaw(message) {
  if (!TOKEN) {
    throw new Error('VITE_OPENCLAW_TOKEN not set — see TODO in Chat.jsx')
  }
  // Try REST endpoint
  const res = await fetch(`${GATEWAY}/api/chat`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${TOKEN}`,
    },
    body: JSON.stringify({ message, channel: 'webchat' }),
  })
  if (!res.ok) {
    throw new Error(`Gateway returned ${res.status}: ${await res.text()}`)
  }
  const data = await res.json()
  return data.response || data.message || data.text || JSON.stringify(data)
}

// Mock responses for when gateway isn't connected
const MOCK_RESPONSES = [
  "Gateway not connected yet — drop your VITE_OPENCLAW_TOKEN in .env.local and I'll be live. 🔐",
  "I'm here, but the bridge isn't wired up yet. Add the token and we're good.",
  "Standing by. Connect the gateway token and this chat goes live.",
  "Copy that. Route the OpenClaw token through .env.local and we're operational.",
]
let mockIdx = 0

function Message({ msg }) {
  const isUser = msg.role === 'user'
  const isSystem = msg.role === 'system'

  if (isSystem) {
    return (
      <div style={{ textAlign: 'center', padding: '6px 0' }}>
        <span style={{ fontSize: '0.6rem', color: 'var(--dim)', background: 'rgba(255,255,255,.04)', padding: '3px 12px', borderRadius: 20 }}>
          {msg.content}
        </span>
      </div>
    )
  }

  return (
    <div style={{
      display: 'flex',
      gap: 10,
      alignItems: 'flex-end',
      flexDirection: isUser ? 'row-reverse' : 'row',
      marginBottom: 12,
      animation: 'fadeInUp 0.3s ease forwards',
    }}>
      {/* Avatar */}
      <div style={{
        width: 34, height: 34, borderRadius: '50%', flexShrink: 0,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: isUser ? '0.9rem' : '1.1rem',
        background: isUser ? 'rgba(68,136,255,.12)' : 'rgba(153,102,255,.12)',
        border: `1px solid ${isUser ? 'rgba(68,136,255,.3)' : 'rgba(153,102,255,.3)'}`,
        fontWeight: 'bold', color: isUser ? 'var(--blue)' : 'var(--purple)',
      }}>
        {isUser ? 'B' : '🔐'}
      </div>

      {/* Bubble */}
      <div style={{
        maxWidth: '72%',
        padding: '10px 14px',
        borderRadius: isUser ? '14px 14px 4px 14px' : '14px 14px 14px 4px',
        background: isUser
          ? 'linear-gradient(135deg, rgba(68,136,255,.18), rgba(68,136,255,.1))'
          : 'rgba(255,255,255,.04)',
        border: `1px solid ${isUser ? 'rgba(68,136,255,.25)' : 'rgba(255,255,255,.08)'}`,
        fontSize: '0.82rem',
        lineHeight: 1.55,
        color: 'var(--text)',
        whiteSpace: 'pre-wrap',
        wordBreak: 'break-word',
      }}>
        {msg.content}
        <div style={{ fontSize: '0.52rem', color: 'var(--dim)', marginTop: 4, textAlign: isUser ? 'right' : 'left' }}>
          {msg.time}
        </div>
      </div>
    </div>
  )
}

function TypingIndicator() {
  return (
    <div style={{ display: 'flex', gap: 10, alignItems: 'flex-end', marginBottom: 12 }}>
      <div style={{
        width: 34, height: 34, borderRadius: '50%',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: '1.1rem', background: 'rgba(153,102,255,.12)',
        border: '1px solid rgba(153,102,255,.3)',
      }}>🔐</div>
      <div style={{
        padding: '12px 16px', borderRadius: '14px 14px 14px 4px',
        background: 'rgba(255,255,255,.04)', border: '1px solid rgba(255,255,255,.08)',
        display: 'flex', gap: 5, alignItems: 'center',
      }}>
        {[0, 0.2, 0.4].map((delay, i) => (
          <div key={i} style={{
            width: 6, height: 6, borderRadius: '50%',
            background: 'var(--purple)', opacity: 0.7,
            animation: `pdot 1.2s ease-in-out ${delay}s infinite`,
          }} />
        ))}
      </div>
    </div>
  )
}

export default function Chat() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      role: 'system',
      content: 'Cyph 🔐 — BEQPROD Command Center',
      time: '',
    },
    {
      id: 2,
      role: 'assistant',
      content: "Command center online. What do you need, B?\n\n*(Gateway token required to activate live AI responses — see .env.local)*",
      time: nowTime(),
    },
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const bottomRef = useRef(null)
  const inputRef = useRef(null)

  function nowTime() {
    const n = new Date()
    return `${String(n.getHours()).padStart(2,'0')}:${String(n.getMinutes()).padStart(2,'0')}`
  }

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  async function handleSend() {
    const text = input.trim()
    if (!text || loading) return
    setInput('')

    const userMsg = { id: Date.now(), role: 'user', content: text, time: nowTime() }
    setMessages(prev => [...prev, userMsg])
    setLoading(true)

    try {
      let reply
      try {
        reply = await sendToOpenClaw(text)
      } catch (err) {
        // Fallback to mock when gateway not available
        console.warn('Gateway error:', err.message)
        await new Promise(r => setTimeout(r, 800 + Math.random() * 600))
        reply = MOCK_RESPONSES[mockIdx % MOCK_RESPONSES.length]
        mockIdx++
      }

      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        role: 'assistant',
        content: reply,
        time: nowTime(),
      }])
    } finally {
      setLoading(false)
    }
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>

      {/* Header */}
      <div style={{
        padding: '12px 16px',
        background: 'rgba(10,10,20,0.8)',
        borderBottom: '1px solid rgba(68,136,255,.12)',
        display: 'flex', alignItems: 'center', gap: 12,
        backdropFilter: 'blur(20px)',
        zIndex: 10,
      }}>
        <div style={{
          width: 40, height: 40, borderRadius: '50%',
          background: 'rgba(68,136,255,.1)', border: '1px solid rgba(68,136,255,.3)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '1.3rem', animation: 'cmd-glow 3.5s ease-in-out infinite',
        }}>🔐</div>
        <div>
          <div style={{ fontWeight: 900, fontSize: '0.85rem', letterSpacing: '0.12em', color: 'var(--blue)' }}>CYPH</div>
          <div style={{ fontSize: '0.58rem', color: 'var(--dim)', letterSpacing: '0.1em' }}>
            {TOKEN ? 'GATEWAY CONNECTED' : 'AWAITING TOKEN — see .env.local'}
          </div>
        </div>
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.58rem', color: TOKEN ? 'var(--green)' : 'var(--amber)', letterSpacing: '0.12em' }}>
          <div style={{ width: 6, height: 6, borderRadius: '50%', background: TOKEN ? 'var(--green)' : 'var(--amber)', animation: 'pdot 2s ease-in-out infinite' }} />
          {TOKEN ? 'LIVE' : 'MOCK'}
        </div>
      </div>

      {/* Messages */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '16px 14px', scrollbarWidth: 'thin' }}>
        {messages.map(msg => (
          <Message key={msg.id} msg={msg} />
        ))}
        {loading && <TypingIndicator />}
        <div ref={bottomRef} />
      </div>

      {/* Input bar */}
      <div style={{
        padding: '10px 12px',
        paddingBottom: 'max(10px, env(safe-area-inset-bottom))',
        background: 'rgba(10,10,20,0.9)',
        borderTop: '1px solid rgba(68,136,255,.12)',
        backdropFilter: 'blur(20px)',
        display: 'flex', gap: 10, alignItems: 'flex-end',
      }}>
        <textarea
          ref={inputRef}
          value={input}
          onChange={e => {
            setInput(e.target.value)
            // Auto-resize
            e.target.style.height = 'auto'
            e.target.style.height = Math.min(e.target.scrollHeight, 120) + 'px'
          }}
          onKeyDown={handleKeyDown}
          placeholder="Message Cyph..."
          disabled={loading}
          rows={1}
          style={{
            flex: 1,
            background: 'rgba(255,255,255,.05)',
            border: '1px solid rgba(68,136,255,.2)',
            borderRadius: 12,
            color: 'var(--text)',
            fontSize: '0.88rem',
            padding: '10px 14px',
            resize: 'none',
            outline: 'none',
            fontFamily: 'inherit',
            lineHeight: 1.5,
            maxHeight: 120,
            overflowY: 'auto',
            transition: 'border-color 0.2s',
          }}
          onFocus={e => e.target.style.borderColor = 'rgba(68,136,255,.5)'}
          onBlur={e => e.target.style.borderColor = 'rgba(68,136,255,.2)'}
        />
        <button
          onClick={handleSend}
          disabled={loading || !input.trim()}
          style={{
            width: 44, height: 44, borderRadius: '50%', flexShrink: 0,
            background: input.trim() && !loading
              ? 'linear-gradient(135deg, #4488ff, #9966ff)'
              : 'rgba(255,255,255,.06)',
            border: 'none', cursor: input.trim() && !loading ? 'pointer' : 'default',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '1.1rem', transition: 'all 0.2s',
            boxShadow: input.trim() && !loading ? '0 0 16px rgba(68,136,255,.4)' : 'none',
          }}
        >
          {loading ? '⏳' : '➤'}
        </button>
      </div>
    </div>
  )
}
